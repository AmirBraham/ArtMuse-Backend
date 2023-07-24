from pydantic import BaseSettings
import os


class Settings(BaseSettings):
    ON_HEROKU: str | None
    DATABASE_PORT: int
    POSTGRES_PASSWORD: str
    POSTGRES_USER: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_HOSTNAME: str
    SSL_MODE: str
    DATABASE_URL: str

    class Config:
        env_file = '.env'


on_heroku = False
if 'ON_HEROKU' in os.environ:
    on_heroku = True
print(f"on heroku : {on_heroku}")
if (on_heroku):
    settings = Settings(
        ON_HEROKU="1",
        DATABASE_URL=os.getenv("DATABASE_URL")
    )
else:
    settings = Settings()
