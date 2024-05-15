import zmq

context = zmq.Context()

socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:98766")

order_list = [
    "101::buy::1008::897.8::72",
    "101::sell::1009::897.8::72"
]

for order in order_list:
    socket.send_string(order)

    message = socket.recv()
    
    print("Received reply from server:", message)



