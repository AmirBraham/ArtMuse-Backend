from metmuseum import getDescription
import requests
from bs4 import BeautifulSoup
import validators
import html



url = "http://www.metmuseum.org/art/collection/search/436571"
if not validators.url(url):
    print(f"url is not valid , {url}")

r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
html_page = html.unescape(r.text)
soup = BeautifulSoup(html_page, features="lxml")
     
description = getDescription(soup)
print(description)