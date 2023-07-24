from fastapi import FastAPI
import models
import painting

from fastapi.middleware.cors import CORSMiddleware
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
PAINTINGS_COLLECTIONS = {
    "metmuseum":"The Metropolitan Museum of Art"
}
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(painting.router, tags=['Paintings'], prefix='/api/paintings')


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

