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

COLUMNS = ["Object Number", "Is Highlight", "Is Timeline Work", "Is Public Domain", "Object ID", "Gallery Number", "Department", "AccessionYear", "Object Name", "Title", "Culture", "Period", "Dynasty", "Reign", "Portfolio", "Constituent ID", "Artist Role", "Artist Prefix", "Artist Display Name", "Artist Display Bio", "Artist Suffix", "Artist Alpha Sort", "Artist Nationality", "Artist Begin Date", "Artist End Date", "Artist Gender",
           "Artist ULAN URL", "Artist Wikidata URL", "Object Date", "Object Begin Date", "Object End Date", "Medium", "Dimensions", "Credit Line", "Geography Type", "City", "State", "County", "Country", "Region", "Subregion", "Locale", "Locus", "Excavation", "River", "Classification", "Rights and Reproduction", "Link Resource", "Object Wikidata URL", "Metadata Date", "Repository", "Tags", "Tags AAT URL", "Tags Wikidata URL"]


def calculateAspectRatio(row):
    dimensions = re.findall(
        r'\((\d+(?:\.\d+)?) x (\d+(?:\.\d+)?) cm\)', str(row["Dimensions"]))
    if (len(dimensions) == 0):
        return 0
    dimensions = [(float(dim1), float(dim2)) for dim1, dim2 in dimensions]
    dimensions = dimensions[0]
    width = dimensions[1]
    height = dimensions[0]
    return width/height


def filter():
    ASPECT_RATIOS = [9/16, 9/18,9/19,9/19.5]
    data = pd.read_csv("Database/metmuseum.csv", sep=",", low_memory=False)
    paintings = data[data["Object Name"] == "Painting"]
    public_domain_paintings = paintings[paintings["Is Public Domain"] == True]
    public_domain_paintings["ratio"] = public_domain_paintings.apply(
        calculateAspectRatio, axis=1)
    FILTERED_ASPECT_RATIO = [False] * len(public_domain_paintings)
    THRESHOLD = 0.2
    for a in ASPECT_RATIOS:
        FILTERED_ASPECT_RATIO += abs(
            public_domain_paintings["ratio"] - a) < THRESHOLD
    FILTERED_ASPECT_RATIO = [i > 0 for i in FILTERED_ASPECT_RATIO]
    public_domain_paintings = public_domain_paintings[FILTERED_ASPECT_RATIO]
    print(len(public_domain_paintings))

    public_domain_paintings.to_csv(
        "Database/metmuseum_filtered.csv", encoding='utf-8', index=False)
    print("filtered csv file ! ")


def getImageURL(soup):
    URLS = []
    for a in soup.find_all('a', {'class': 'gtm__download__image'}, href=True):
        URLS.append(a['href'])
    if (len(URLS) == 0):
        print(f"Could not get image URL from : {soup}")
        return None
    return URLS[0]

def getDescription(soup):
    DESC = []
    for p in soup.find_all('div',{'class':'artwork__intro__desc'}):
        DESC.append(p.text)
    if (len(DESC) == 0):
        print(f"Could not get DESC : {soup}")
        return None
    return DESC[0]

    


def main():
    csv_file = Path("Database/metmuseum_filtered.csv")
    if csv_file.is_file():
        paintings = pd.read_csv("Database/metmuseum_filtered.csv")
        paintings = paintings.reset_index(drop=True)
        for i in tqdm(range(len(paintings))):
            url = paintings.iloc[i]["Link Resource"]
            if not validators.url(url):
                print(f"url is not valid , {url}")
                continue
            try:
                r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
                html_page = html.unescape(r.text)
                soup = BeautifulSoup(html_page, features="lxml")
            except Exception as err:
                print("ERR OCCURED : \n ")
                print(err)
                continue
            image_url = getImageURL(soup)
            description = getDescription(soup)
            if (image_url is not None):
                paintings.at[i, "image_url"] = image_url
            if(description is not None):
                paintings.at[i, "description"] = description
            if (i % 10 == 0 and i > 0):
                paintings.to_csv(
                    "Database/metmuseum_filtered.csv", encoding='utf-8', index=False)
        paintings = paintings[paintings['Title'].notna()]
        paintings = paintings[paintings['Artist Display Name'].notna()]
        paintings.to_csv("Database/metmuseum_filtered.csv",encoding='utf-8', index=False)
    else:
        print("filtering csv file")
        filter()


if __name__ == "__main__":
    main()
