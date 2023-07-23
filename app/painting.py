from . import schemas, models
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status, APIRouter, Response
from .database import get_db

router = APIRouter()

@router.get('/')
def get_paintings(db: Session = Depends(get_db), limit: int = 10, page: int = 1, search: str = ''):
    print("hello")
    skip = (page - 1) * limit

    paintings = db.query(models.Painting).filter(
        models.Painting.title.contains(search)).limit(limit).offset(skip).all()
    return {'status': 'success', 'results': len(paintings), 'paintings': paintings}

@router.post('/painting', status_code=status.HTTP_201_CREATED)
def create_painting(payload: schemas.PaintingBaseSchema, db: Session = Depends(get_db)):
    new_painting = models.Painting(**payload.dict())
    db.add(new_painting)
    db.commit()
    db.refresh(new_painting)
    return {"status": "success", "painting": new_painting}

@router.post('/paintings', status_code=status.HTTP_201_CREATED)
def create_paintings(payload: list[schemas.PaintingBaseSchema], db: Session = Depends(get_db)):
    new_paintings = [models.Painting(**p.dict()) for p in payload]
    db.bulk_save_objects(new_paintings)
    db.commit()
    return {"status": "success", "paintings": new_paintings}
@router.patch('/{paintingId}')
def update_painting(paintingId: str, payload: schemas.PaintingBaseSchema, db: Session = Depends(get_db)):
    painting_query = db.query(models.Painting).filter(models.Painting.id == paintingId)
    db_painting= painting_query.first()

    if not  db_painting:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'No Painting with this id: {paintingId} found')
    update_data = payload.dict(exclude_unset=True)
    painting_query.filter(models.Painting.id == paintingId).update(update_data,
                                                       synchronize_session=False)
    db.commit()
    db.refresh(db_painting)
    return {"status": "success", "painting":  db_painting}

@router.get('/{paintingId}')
def get_post(paintingId: str, db: Session = Depends(get_db)):
    painting = db.query(models.Painting).filter(models.Painting.id == paintingId).first()
    if not painting:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"No painting with this id: {id} found")
    return {"status": "success", "painting": painting}

@router.delete('/{paintingId}')
def delete_post(paintingId: str, db: Session = Depends(get_db)):
    painting_query = db.query(models.Painting).filter(models.Painting.id == paintingId)
    painting = painting_query.first()
    if not painting:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'No painting with this id: {id} found')
    painting_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)