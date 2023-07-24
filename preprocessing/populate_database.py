#After scraping paintings DATABASES , this script will populate our postgres DB with paintings
import pandas as pd
import json 


import requests

headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
}




API_URL = "http://127.0.0.1:8000/api/"


def populate_db_metmuseum():
    print("populating db with metmuseum")
    df = pd.read_csv("../Database/metmuseum_filtered.csv")
    df['Collection']='The Metropolitan Museum of Art'
    df = df[['Title','Artist Display Name','Object Begin Date','Object End Date','image_url','Link Resource','Collection']]
    rename_columns = {
        'Title':'title',
        'Artist Display Name':'artistDisplayName',
        'Object Begin Date':'objectBeginDate',
        'Object End Date':'objectEndDate',
        'image_url':'imageLink',
        'Link Resource':'resourceLink',
        'Collection':'collection'
    }
    df.rename(columns=rename_columns,inplace=True)
    paintings =df.to_dict('records')
    with open("a.txt","w") as f:
        f.write(str(paintings))
    response = requests.post(API_URL+'paintings/paintings', headers=headers, json=paintings)
    
    print(response)

populate_db_metmuseum()