from bs4 import BeautifulSoup
import requests
import validators
import re
import html
import numpy as np
import pandas as pd
from pathlib import Path
from tqdm import tqdm

pd.set_option('display.max_colwidth', None)

COLUMNS = ["Object Number","Is Highlight","Is Timeline Work","Is Public Domain","Object ID","Gallery Number","Department","AccessionYear","Object Name","Title","Culture","Period","Dynasty","Reign","Portfolio","Constituent ID","Artist Role","Artist Prefix","Artist Display Name","Artist Display Bio","Artist Suffix","Artist Alpha Sort","Artist Nationality","Artist Begin Date","Artist End Date","Artist Gender","Artist ULAN URL","Artist Wikidata URL","Object Date","Object Begin Date","Object End Date","Medium","Dimensions","Credit Line","Geography Type","City","State","County","Country","Region","Subregion","Locale","Locus","Excavation","River","Classification","Rights and Reproduction","Link Resource","Object Wikidata URL","Metadata Date","Repository","Tags","Tags AAT URL","Tags Wikidata URL"]



def calculateAspectRatio(row):
    dimensions = re.findall(r'\((\d+(?:\.\d+)?) x (\d+(?:\.\d+)?) cm\)', str(row["Dimensions"]))
    if(len(dimensions) ==0):
        return 0
    dimensions = [(float(dim1), float(dim2)) for dim1, dim2 in dimensions]
    dimensions = dimensions[0]
    width = dimensions[1]
    height = dimensions[0]
    return width/height

def filter():
    PHONE_ASPECT_RATIO = 9/16
    data = pd.read_csv("../Database/metmuseum.csv",sep=",",low_memory=False)
    paintings = data[data["Object Name"] == "Painting"] 
    public_domain_paintings = paintings[paintings["Is Public Domain"]==True]
    public_domain_paintings["ratio"] = public_domain_paintings.apply(calculateAspectRatio,axis=1)
    public_domain_paintings = public_domain_paintings[abs(public_domain_paintings["ratio"] - PHONE_ASPECT_RATIO) < 0.1]
    public_domain_paintings.to_csv("../Database/metmuseum_filtered.csv",encoding='utf-8', index=False)
    print("filtered csv file ! ")
def getImageURL(url):
    if not validators.url(url):
        print(f"url is not valid , {url}")
        return None
    try:
        r = requests.get(url , headers={'User-Agent': 'Mozilla/5.0'})
        html_page = html.unescape(r.text)
        soup = BeautifulSoup(html_page,features="lxml")
    except Exception as err:
        print("ERR OCCURED : \n ")
        print(err)
        return None
    URLS = []
    for a in soup.find_all('a',{'class':'gtm__download__image'}, href=True):
        URLS.append(a['href'])
    if(len(URLS) == 0):
        print(f"Could not get image URL from : {url}")
        return None
    return URLS[0]


def main():
    csv_file = Path("../Database/metmuseum_filtered.csv")
    if csv_file.is_file():
        paintings = pd.read_csv("../Database/metmuseum_filtered.csv")
        for i in tqdm(range(len(paintings))):
            url = paintings.iloc[i]["Link Resource"]
            print(paintings.iloc[i]["Link Resource"])
            image_url = getImageURL(url)
            if(image_url is not None):
                paintings.insert(i,"image_url",image_url)
        paintings.to_csv("../Database/metmuseum_filtered.csv",encoding='utf-8', index=False)
    else:
        print("filtering csv file")
        filter()



if __name__ == "__main__":
    main()