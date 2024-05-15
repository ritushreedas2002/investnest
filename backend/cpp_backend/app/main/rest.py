from fastapi import FastAPI, WebSocket
from pydantic import BaseModel
from enum import Enum

"""
import zmq

context = zmq.Context()
subcriber_for_asd = context.socket(zmq.SUB)
subcriber_for_con = context.socket(zmq.SUB)

topicfilter_asd = "asd"
topicfilter_con = "con"

socket = context.socket(zmq.REQ)
subcriber_for_asd.setsockopt_string(zmq.SUBSCRIBE, topicfilter_asd)
subcriber_for_con.setsockopt_string(zmq.SUBSCRIBE, topicfilter_con)

socket.connect("tcp://localhost:98766")
subcriber_for_asd.connect("tcp://localhost:98765")
subcriber_for_con.connect("tcp://localhost:98765")

"""

app = FastAPI()

class OrderType(str, Enum):
    buy = "buy"
    sell = "sell"

class OrderDetails(BaseModel):
    stock_id: int
    order_type: OrderType
    user_id : int
    price: float
    quantity: int
    

@app.get("/place-order")
async def placeOrder(order: OrderDetails):
    order_string = f"{order.stock_id}::{order.order_type}::{order.user_id}::{order.price}::{order.quantity}"
    socket.send_string(order_string)

    message = socket.recv()

    return {
        "message" : message
    }

@app.websocket("/ws")
async def sendAllStockData(websocket: WebSocket):
    while True:
        string = subcriber_for_asd.recv()
        await websocket.send_text(string)


        
    