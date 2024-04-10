from pydantic import BaseModel
from enum import Enum

class OrderType(str, Enum):
    buy = "buy"
    sell = "sell"

class Order(BaseModel):
    order_type: OrderType
    user_id: 
    price: float
    quantity: int


    