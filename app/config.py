from pydantic import BaseSettings
import os


class Settings(BaseSettings):
    ON_HEROKU:str | None
    DATABASE_PORT: int
    POSTGRES_PASSWORD: str
    POSTGRES_USER: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_HOSTNAME: str
    SSL_MODE:str

    class Config:
        env_file = '.env'


on_heroku = False
if 'ON_HEROKU' in os.environ:
    on_heroku = True
print(f"on heroku : {on_heroku}")
if (on_heroku):
    settings = Settings(POSTGRES_PASSWORD=os.getenv("POSTGRES_PASSWORD"),
                        POSTGRES_USER=os.getenv("POSTGRES_USER"),
                        POSTGRES_DB=os.getenv("POSTGRES_DB"),
                        POSTGRES_HOST=os.getenv("POSTGRES_HOST"),
                        POSTGRES_HOSTNAME=os.getenv("POSTGRES_HOSTNAME"),
                        SSL_MODE=os.getenv("SSL_MODE"),
                        ON_HEROKU="1"
                        )
else:
    settings = Settings()

