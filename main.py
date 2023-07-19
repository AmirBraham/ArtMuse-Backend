from fastapi import FastAPI

app = FastAPI()
PAINTINGS_COLLECTIONS = {
    "metmuseum":"The Metropolitan Museum of Art"
}


@app.get("/")
async def root():
    return {"message": "Hello World"}
@app.get("/paintings_collections")
async def paintings_collections():
    return list(PAINTINGS_COLLECTIONS.values())

@app.get("/{collection}/info")
async def collection_info(collection):
    if(collection in list(PAINTINGS_COLLECTIONS.keys())):
        return {
            "name":PAINTINGS_COLLECTIONS[f"{collection}"],
            "paintings":100
        }
    return None

@app.get("/{collection}/random")
async def random(collection):
    return None

