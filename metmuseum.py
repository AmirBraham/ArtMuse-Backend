from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import validators
import re



def getImageURL(url):
    if not validators.url(url):
        print(f"url is not valid , {url}")
        return ""
    try:
        req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urlopen(req).read()
        soup = BeautifulSoup(html)
    except Exception as err:
        print("ERR OCCURED : \n ")
        print(err)
        return ""
    URLS = []
    for a in soup.find_all('a',{'class':'gtm__download__image'}, href=True):
        print("Found the URL:", a['href'])
        URLS.append(a)
    if(len(URLS) == 0):
        print(f"Could not get image URL from : {url}")
        return ""
    return URLS[0]

