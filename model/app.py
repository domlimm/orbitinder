import os, sys, json
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import numpy as np
import pandas as pd
from gensim.models.doc2vec import Doc2Vec

from process import get_reco_objs, get_users_df, tokenise, preprocess_corpus
from model import init_model, train_model
#init Flask App
app=Flask(__name__)
CORS(app)

@app.route('/')
def home():
  return "hi"
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
  users_df = get_users_df()
  final_reco_id = []
  model = Doc2Vec.load("doc2vec")
  # listing space embeddings
  mv_tags_vectors = model.dv.vectors

  # likesArr= ['nZP5NZdkP6QNItNUU8K7IO86dcY2','rDUMUtqVMKdC2AiQ8QEQO8pbLkM2','OMxShDQF4xaSatbUkgontnR03Tk1']
  # dislikesArr= ['HIX1Dbf1g2Y5dApp2IOZaY8E1it1','xkEv26Z4KhY0xBSomiIfM2PxFH52']
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
  # print((get_reco_objs(final_reco_id)))
  return jsonify(get_reco_objs(final_reco_id))
  # return json.loads(users_df.to_json())

if __name__ == '__main__':
  app.run(debug=True)
  # get_users_df()