#This csv file is from https://github.com/metmuseum/openaccess
import numpy as np
import pandas as pd
import re
from metmuseum import getImageURL

pd.set_option('display.max_colwidth', None)

data = pd.read_csv("Database/MetObjects.csv",sep=",")
paintings = data[data["Object Name"] == "Painting"] 
public_domain_paintings =  paintings[paintings["Is Public Domain"]==True]

def isCorrectAspectRatio(row):
    dimensions = re.findall(r'\((\d+(?:\.\d+)?) x (\d+(?:\.\d+)?) cm\)', str(row["Dimensions"]))
    if(len(dimensions) ==0):
        return 0
    dimensions = [(float(dim1), float(dim2)) for dim1, dim2 in dimensions]
    dimensions = dimensions[0]
    width = dimensions[1]
    height = dimensions[0]
    
    return width/height
        
public_domain_paintings["ratio"] = public_domain_paintings.apply(isCorrectAspectRatio,axis=1)
public_domain_paintings = public_domain_paintings[abs(public_domain_paintings["ratio"] - (9/16)) < 0.2]
example = public_domain_paintings.iloc[2]
print(getImageURL(example["Resource Link"]))
