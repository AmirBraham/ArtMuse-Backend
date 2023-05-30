from bs4 import BeautifulSoup
import requests
import validators
import re
import html

def getImageURL(url):
    if not validators.url(url):
        print(f"url is not valid , {url}")
        return ""
    try:
        r = requests.get(url , headers={'User-Agent': 'Mozilla/5.0'})
        html_page = html.unescape(r.text)
        soup = BeautifulSoup(html_page)
    except Exception as err:
        print("ERR OCCURED : \n ")
        print(err)
        return ""
    URLS = []
    for a in soup.find_all('a',{'class':'gtm__download__image'}, href=True):
        URLS.append(a['href'])
    if(len(URLS) == 0):
        print(f"Could not get image URL from : {url}")
        return ""
    return URLS[0]



if __name__ == "__main__":
    getImageURL("http://www.metmuseum.org/art/collection/search/483")