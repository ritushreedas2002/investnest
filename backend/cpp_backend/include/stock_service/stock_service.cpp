#include <stock_service/stock_service.hpp>
#include <boost/lexical_cast.hpp>
#include <boost/thread/thread.hpp>
#include <boost/algorithm/string.hpp>
#include <algorithm>

namespace investnest
{
   
    StockService::StockService()
    {
        auto hdfc_bank_match_service = std::make_unique<OrderMatchService>("HDFC_BANK");
        auto reliance_match_service = std::make_unique<OrderMatchService>("RELIANCE");
        auto airtel_match_service = std::make_unique<OrderMatchService>("AIRTEL");
        auto tata_match_service = std::make_unique<OrderMatchService>("TATA");

        stocks_name_id = 
            {
                {101, "hdfc"},
                {102, "reliance"},
                {103, "airtel"},
                {104, "tata"},
            };

        stocks_service_map[stocks_name_id[101]] = std::move(hdfc_bank_match_service);
        stocks_service_map[stocks_name_id[102]] = std::move(reliance_match_service);
        stocks_service_map[stocks_name_id[103]] = std::move(airtel_match_service);
        stocks_service_map[stocks_name_id[104]] = std::move(tata_match_service);

        size_of_stock_name_id = stocks_name_id.size();

        ios_to_handle_process_function = std::make_unique<boost::asio::io_service>();
        ios_to_handle_request_function = std::make_unique<boost::asio::io_service>();
        timer = std::make_unique<boost::asio::deadline_timer>(*ios_to_handle_process_function, boost::posix_time::seconds(2));
    }

    void StockService::process_start()
    {
        for(const auto& item: stocks_service_map)
        {
            ios_to_handle_process_function->post(std::bind(&OrderMatchService::process, item.second.get()));
        }

        ios_to_handle_request_function->post(std::bind(&StockService::recv_order_request, this));

        timer->async_wait(boost::bind(&StockService::send_all_stock_data, this));
    }

    void StockService::recv_order_request()
    {
        /*
            "101::buy::1008::897.8::172"

            "stock_id::order_type::user_id::price::quantity"

            Order order1(OrderType::BUY, 43.34, 4, 1, g_base_time + std::chrono::milliseconds(1));
        */
        while(true)
        {
            std::string order_info = ZeroMQService::get().recv_order_socket_rep();

            std::vector<std::string> tokens;
            std::vector<std::string> string_list;

            boost::split(tokens, order_info ,boost::is_any_of("::"));
            std::copy_if(tokens.begin(), tokens.end(), std::back_inserter(string_list), [](const std::string& item){
                return !item.empty();
            });
            

            int stock_id;
            investnest::OrderType order_type;
            int user_ID;
            auto time_stamp = base_time + std::chrono::milliseconds(time_idx++);
            double price;
            int quantity;

            if(string_list.at(1) == "buy")
            {
                order_type = investnest::OrderType::BUY;
            }
            else if(string_list.at(1) == "sell")
            {
                order_type = investnest::OrderType::SELL;
            }
            else
            {
                ZeroMQService::get().send_info_to_socket_rep("Invalid OrderType");
                continue;
            }

            try
            {
                stock_id = boost::lexical_cast<int>(string_list.at(0));
                user_ID = boost::lexical_cast<int>(string_list.at(2));
                price = boost::lexical_cast<double>(string_list.at(3));
                quantity = boost::lexical_cast<int>(string_list.at(4));

            } catch (const boost::bad_lexical_cast& e)
            {
                std::cerr << "Conversion error: " << e.what() << std::endl;
                ZeroMQService::get().send_info_to_socket_rep("Invalid Order Data");
                continue;
            }

            auto it = stocks_name_id.find(stock_id);
            if(it == stocks_name_id.end())
            {
                ZeroMQService::get().send_info_to_socket_rep("Stock ID Provided not found");
                continue;
            }

            Order order{order_type, price, quantity, user_ID, time_stamp};
            stocks_service_map[it->second]->add_to_incoming_order(std::move(order));
            ZeroMQService::get().send_info_to_socket_rep("Your Order is Successfully Added");
        }
    }

    void StockService::create_order_from_tokens(const std::vector<std::string>& tokens)
    {
        
    }

    void StockService::send_all_stock_data()
    {
        std::lock_guard<std::mutex> lock(mutex);
        buffer.str("");

        auto idx = 1;
        for(const auto& stock: stocks_name_id)
        {
            buffer << stock.first << ":" << stocks_service_map[stock.second]->get_stock_price();
            // buffer << stock.first << ":" << stocks_service_map[stock.second]->orders_present();
            if(idx != size_of_stock_name_id)
            {
                buffer << "&";
            }
            idx++;
        }
        std::cout << buffer.str() << "\n";
        // "101:78.8&102:76.6&103:887.8"

        ZeroMQService::get().publish_data_to_socket_pub(buffer.str(), ZeroMQService::TOPIC::ASD); /* Publishing the stock data */

        timer->expires_from_now(boost::posix_time::seconds(2));
        timer->async_wait(boost::bind(&StockService::send_all_stock_data, this));
    }

    // blocking function
    void StockService::run()
    {
        auto threads = boost::thread::hardware_concurrency();

        /* subtract the thread count by 1 corresponding to the current thread */
        --threads;

        boost::thread_group tg;
        for(auto i = 0 ; i < threads ; ++i)
        {
            tg.create_thread(boost::bind(&boost::asio::io_service::run, boost::ref(ios_to_handle_process_function)));
        }

        /* Dedicate a thread to handle incoming order request */
        std::thread thread_dedicated_to_ios_to_handle_request_function([this]{
            ios_to_handle_request_function->run();
        });

        ios_to_handle_process_function->run(); /* This is the reason why we subtracted "threads" by 1*/
        tg.join_all();
    }
}