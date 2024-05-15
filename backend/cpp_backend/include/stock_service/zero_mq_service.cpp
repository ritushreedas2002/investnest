#include <stock_service/zero_mq_service.hpp>
#include <iostream>

namespace investnest
{
    ZeroMQService::ZeroMQService()
    {

        ctx = std::make_unique<zmq::context_t>(2);
        socket_pub = std::make_unique<zmq::socket_t>(*ctx, zmq::socket_type::pub);
        socket_rep = std::make_unique<zmq::socket_t>(*ctx, zmq::socket_type::rep);

        socket_pub->bind("tcp://localhost:98765");
        socket_rep->bind("tcp://localhost:98766");


        /*
            This is not configured incase of PUBLISHER.
            This is configured incase of SUBSCRIBER

            https://learning-0mq-with-pyzmq.readthedocs.io/en/latest/pyzmq/patterns/pubsub.html
            try
            {
                for(const auto& topic: topics)
                {
                    // zmq::sockopt::subscribe represents ZMQ_SUBSCRIBE
                    socket_pub->set(zmq::sockopt::subscribe, topic.c_str());
                }
            }
            catch(const std::exception& e)
            {
                std::cerr << e.what() << '\n';
            }
        */
        
    }

    ZeroMQService::~ZeroMQService(){}
    
    ZeroMQService& ZeroMQService::get()
    {
        static ZeroMQService zeroMQService{};
        return zeroMQService;
    }

    void ZeroMQService::publish_data_to_socket_pub(const std::string& data, TOPIC tp)
    {
        zmq::message_t reply(data.c_str(), data.size());

        if(tp == TOPIC::ASD)
        {
            /* send the all stock data */

            /* First sending the topic and then the message */
            zmq::message_t topic(topics.at(0).c_str(), topics.at(0).size());

            socket_pub->send(std::move(topic), zmq::send_flags::sndmore);
            socket_pub->send(std::move(reply), zmq::send_flags::none);

        }
        else
        {
            /* send completed order notification */

            /* First sending the topic and then the message */
            zmq::message_t topic(topics.at(1).c_str(), topics.at(1).size());

            socket_pub->send(std::move(topic), zmq::send_flags::sndmore);
            socket_pub->send(std::move(reply), zmq::send_flags::none);

        }
    }

    void ZeroMQService::send_info_to_socket_rep(const std::string& data)
    {
        zmq::message_t reply(data.c_str(), data.size());
        socket_rep->send(std::move(reply), zmq::send_flags::none);
    }

    std::string ZeroMQService::recv_order_socket_rep()
    {
        auto res = socket_rep->recv(request_data, zmq::recv_flags::none); //  Blocking
        std::string recv_order_string = std::string(static_cast<char *>(request_data.data()), request_data.size());

        return recv_order_string; // RVO
    }
}