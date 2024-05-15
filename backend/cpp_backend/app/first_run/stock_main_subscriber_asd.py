import zmq

context = zmq.Context()

subcriber = context.socket(zmq.SUB)
topicfilter = "asd"
subcriber.setsockopt_string(zmq.SUBSCRIBE, topicfilter)
subcriber.connect("tcp://localhost:98765")

for i in range(50):
    string = subcriber.recv()
    # topic, messagedata = string.split()
    # print(f"Topic: {topic}\nMessage: {message}")
    print(f"Message: {string}")
    print("#############################################################")



