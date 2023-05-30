this is the preprocessing part
from the database csv files and for every painting db , generate an object with the image url , painting title , date , and description and link to original post on the painting db website . 
These info should be stored in a Painting Object and uploaded to a mongodb database
The preprocessing is responsible for processing csv files and generating Painting Objects , these objects will be stored as pickle files 
the next step would be to upload these objects on mongodb , that's not a part of the preprocessing phase
