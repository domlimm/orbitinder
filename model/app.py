from model.process import update_reco_field
import os, sys, json
from flask import Flask, request, jsonify,Response
from flask_cors import CORS
from nltk import data
import numpy as np
import pandas as pd
from gensim.models.doc2vec import Doc2Vec
import requests


from process import get_users_df, tokenise, preprocess_corpus, validate_token
from model import init_model, train_model
#init Flask App
app=Flask(__name__)
CORS(app)

@app.route('/')
def home():
  return "Welcome to OrbiTinder's Recommendation System"

@app.route('/test')
def test():
  return "endpoint unavail"
# @app.route('/train_model')
@app.route('/train_model', methods=['POST'])
def save_model():
  if (request.json) :
    return Response(status=403, mimetype='application/json')
  users_df = get_users_df() #fetches all user data from firestore

  # corpus of user background tags
  user_tags_corpus = preprocess_corpus(users_df.tags.values)
  model = init_model(user_tags_corpus)
  
  model=train_model(model,user_tags_corpus)
  model.save('doc2vec') # use gensim's save method instead of pickle
  return "success"

@app.route('/get_recommendations', methods=['POST'])
# @app.route('/get_recommendations')
def get_recommendations():
  json_dict = request.get_json(force=True)
  if (not request.json) :
    return Response(status=400, mimetype='application/json')
  elif ('dislikes' not in json_dict or 'likes' not in json_dict):
    return Response(status=400, mimetype='application/json')
  elif (not request.json['dislikes'] and not request.json['likes']): # no likes and no dislikes
    return Response(status=400, mimetype='application/json')
  elif (not request.json['likes']) : #no likes
    return Response(status=400, mimetype='application/json')
  
  auth = request.headers.get("Authorization", None)
  if not auth:
    return Response(status=401, mimetype='application/json')
  parts = auth.split()
  if parts[0].lower() != "bearer":
      return Response(status=401, mimetype='application/json')
  elif len(parts) == 1:
    return Response(status=401, mimetype='application/json')
  elif len(parts) > 2:
    return Response(status=401, mimetype='application/json')
    
  auth_token_dict = validate_token(parts[1])
  if (not auth_token_dict):
    return Response(status=401, mimetype='application/json')
  
  auth_token_uid = auth_token_dict['uid']
  print(auth_token_uid)
  users_df = get_users_df()
  # print(users_df)
  final_reco_id = []
  model = Doc2Vec.load("doc2vec")
  # listing space embeddings
  mv_tags_vectors = model.dv.vectors
  dislikesArr = request.json['dislikes']
  likesArr = request.json['likes']

  user_likes_vector = np.zeros(shape = mv_tags_vectors.shape[1])
  for mv in likesArr:
    likes_index = users_df[users_df["uid"] == mv].index.values[0]
    user_likes_vector += mv_tags_vectors[likes_index]

  user_likes_vector/=len(likesArr)

  print("User Recommendations")
  sims = model.dv.most_similar(positive = [user_likes_vector])
  filtered_sims=list(filter(lambda x: (x[1] > 0.7), sims)) #get reco > 0.7
  for i, j in filtered_sims:
    reco_uid = users_df.loc[int(i), "uid"]
    if reco_uid not in likesArr and reco_uid not in dislikesArr:
      final_reco_id.append(reco_uid)
      print(i+" " +reco_uid.strip() + " "+ str(j))
  # Check if element exist in List, before removing
  if auth_token_uid in final_reco_id:
    final_reco_id.remove(auth_token_uid) #filter out current user from recommended users
    print("Given uid Found and removed in List")
    print(final_reco_id)
    update_reco_field(auth_token_uid, final_reco_id)
  else:
    print("Given uid Not Found in List")
    update_reco_field(auth_token_uid, final_reco_id)
    print(final_reco_id)

  return jsonify(final_reco_id)
  # return json.loads(users_df.to_json())

if __name__ == '__main__':
  app.run(debug=True)
  # get_users_df()