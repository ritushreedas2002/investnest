from pydantic import BaseModel
from fastapi import FastAPI

user = FastAPI()

class User(BaseModel):
    user_id: int
    name: str

@user.get("/user_info")
async def get_user(user: User):
    return user