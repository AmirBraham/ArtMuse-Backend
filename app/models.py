from database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean,Integer
from sqlalchemy.sql import func
from fastapi_utils.guid_type import GUID, GUID_SERVER_DEFAULT_POSTGRESQL


class Painting(Base):
    __tablename__ = 'paintings'
    id = Column(GUID, primary_key=True,
                server_default=GUID_SERVER_DEFAULT_POSTGRESQL)
    title = Column(String, nullable=False)
    artistDisplayName = Column(String, nullable=False)
    objectBeginDate = Column(Integer, nullable=True)
    objectEndDate = Column(Integer, nullable=False)
    collection = Column(String,nullable=False)
    resourceLink = Column(String,nullable=False)
    imageLink = Column(String,nullable=False)
