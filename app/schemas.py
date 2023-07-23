from typing import List
from pydantic import BaseModel


class PaintingBaseSchema(BaseModel):
    id: str | None = None
    title: str
    artistDisplayName = str
    objectBeginDate = int
    objectEndDate = int
    collection = str
    resourceLink = str
    imageLink = str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True


class ListPaintingResponse(BaseModel):
    status: str
    results: int
    paintings: List[PaintingBaseSchema]
