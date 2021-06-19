import os, sys
from firebase_admin import credentials, firestore, initialize_app
import pandas as pd

#init FirestoreDB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db=firestore.client()
users_ref = db.collection('users')

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

def get_reco_objs(id_array):
    list_dicts = []
    try:
        for doc in users_ref.stream():
            if doc.id in id_array:
                doc_dict = doc.to_dict()
                doc_dict["id"] = doc.id
                list_dicts.append(doc_dict)
        return list_dicts
    except Exception as e:
        print(f"An Error Occured: {e}")
        return []