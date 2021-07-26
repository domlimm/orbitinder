import os, sys
from firebase_admin import credentials, firestore, initialize_app, auth
import pandas as pd
from gensim.models.doc2vec import TaggedDocument
import nltk
# nltk.download('punkt')
# nltk.download('stopwords')
from nltk.tokenize import word_tokenize

#init FirestoreDB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db=firestore.client()
users_ref = db.collection('users')

def validate_token(id_token):
    try:
        return auth.verify_id_token(id_token)
    except Exception as e:
        print(f"An Error Occured: {e}")
        return {}

# def verify_token(id_token):
#     try:
#         decoded_token = auth.verify_id_token(id_token)
#         uid = decoded_token['uid']
#         return uid
#     except Exception as e:
#         print(f"An Error Occured: {e}")
#         return ''

def get_users_df():
    """
        get_users_df() : Fetches documents from Firestore collection and returns a dataframe containing uid, tags_list and tags.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        list_dicts = []
        for doc in users_ref.stream():
          doc_dict = doc.to_dict()
          bg_dict = doc_dict["background"]
          tech_dict = bg_dict["technologyExperience"]
          temp_dict = {"uid": doc.id, "tags_list": [], "tags": ""}
          temp_dict["tags_list"] += doc_dict["gender"], bg_dict["sweExperience"],bg_dict["achievement"],bg_dict["commitment"],bg_dict["year"], bg_dict["idea"]
          temp_dict["tags_list"].extend(bg_dict["interests"] + tech_dict["mobile"] + tech_dict["game"] + tech_dict["web"] + tech_dict["machineLearning"] + tech_dict["database"])
          temp_dict["tags_list"]= [x.replace(" ", "") for x in temp_dict["tags_list"]] #removing spaces
          list_dicts.append(temp_dict)
        tags_df = pd.DataFrame(list_dicts)
        tags_df["tags"] = [','.join(map(str, l)) for l in tags_df['tags_list']]
        return tags_df
    except Exception as e:
        print(f"An Error Occured: {e}")
        return pd.DataFrame()

def tokenise(doc):
  # split into lower case word tokens
  tokens = word_tokenize(doc.lower())
  # remove tokens that are not alphabetic (including punctuation) and not a stop word
  tokens = [word for word in tokens if word.isalpha()]
  return tokens

def preprocess_corpus(mv_tags_corpus):
  return [TaggedDocument(words=tokenise(D), tags=[str(i)]) for i, D in enumerate(mv_tags_corpus)]

def update_reco_field(uid, recoIDArray):
    print("uid: ", uid)
    print("recoIDaRRAY: ", recoIDArray)
    uRef = users_ref.document(uid)
    uRef.update({'recommended_users':firestore.ArrayUnion(recoIDArray)})