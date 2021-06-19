import os, sys, json
from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app
import numpy as np
import pandas as pd
from process import get_reco_objs, get_users_df
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
import nltk
# nltk.download('punkt')
# nltk.download('stopwords')
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

#init Flask App
app=Flask(__name__)
CORS(app)
# tokenize doc & remove stop words
def tokenise(doc):
  # split into lower case word tokens
  tokens = word_tokenize(doc.lower())
  # remove tokens that are not alphabetic (including punctuation) and not a stop word
  tokens = [word for word in tokens if word.isalpha()]
  return tokens

def preprocess_corpus(mv_tags_corpus):
  return [TaggedDocument(words=tokenise(D), tags=[str(i)]) for i, D in enumerate(mv_tags_corpus)]

def init_model(corpus):
  # max_epochs = 50
  vec_size = 60 #init was 10 (but gave lower similarities)
  alpha = 0.025

  model = Doc2Vec(vector_size=vec_size,
                  alpha=alpha,
                  min_alpha=0.00025,
                  min_count=1,
                  dm=0) # paragraph vector distributed bag-of-words (PV-DBOW)
  model.build_vocab(corpus)
  return model

def train_model(model, corpus):
  # max_epochs =10
  print('Epoch', end = ': ')
  for epoch in range(50): #my init was 10
    # print(epoch, end = ' ')
    model.train(corpus,
                total_examples=model.corpus_count,
                epochs=model.epochs)
    # decrease the learning rate
    model.alpha -= 0.0002
    # fix the learning rate, no decay
    model.min_alpha = model.alpha
  return model

@app.route('/')
def home():
  return "hi"

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
  final_reco_id = []
  users_df = get_users_df() #fetches all user data from firestore

  # corpus of user background tags
  user_tags_corpus = preprocess_corpus(users_df.tags.values)
  model = init_model(user_tags_corpus)
  model=train_model(model,user_tags_corpus)
  # listing space embeddings
  mv_tags_vectors = model.docvecs.vectors

  # dislikesArr= ['nZP5NZdkP6QNItNUU8K7IO86dcY2','rDUMUtqVMKdC2AiQ8QEQO8pbLkM2']
  # likesArr= ['UXBxSVvhbyf6bhnz5wmZunFgO733','xkEv26Z4KhY0xBSomiIfM2PxFH52']
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
  return jsonify(get_reco_objs(final_reco_id))
  # return json.loads(users_df.to_json())

  






if __name__ == '__main__':
  app.run(debug=True)
  # get_users_df()