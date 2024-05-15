#pragma once

#include <memory>
#include <zmq.hpp>

namespace investnest
{
    class ZeroMQService
    {  
        private:
            std::unique_ptr<zmq::context_t> ctx;
            std::unique_ptr<zmq::socket_t> socket_pub;
            std::unique_ptr<zmq::socket_t> socket_rep;

            /*
                "asd" :- means all stock data
                "con" :- means completed order notification
            */
            std::vector<std::string> topics = {"asd", "con"};

            zmq::message_t request_data;
        
        private:

            ZeroMQService();

            ~ZeroMQService();

        public:
            enum class TOPIC
            {
                /*
                    "asd" :- means all stock data
                    "con" :- means completed order notification
                */

                ASD,
                CON
            };

            static ZeroMQService& get();

            void publish_data_to_socket_pub(const std::string& data, TOPIC tp);

            void send_info_to_socket_rep(const std::string& data);

            std::string recv_order_socket_rep();
            
    };
}