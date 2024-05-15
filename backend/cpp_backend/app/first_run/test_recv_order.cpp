#include <boost/lexical_cast.hpp>
#include <string>
#include <vector>
#include <iostream>
#include <boost/algorithm/string.hpp>
#include <unordered_map>
#include <algorithm>

std::unordered_map<int, std::string> stocks_name_id = 
{
    {101, "hdfc"},
    {102, "reliance"},
    {103, "airtel"},
    {104, "tata"},
};

void recv_order_request(std::string order_info)
{
    // "101::buy::1008::897.8::172"
    // std::string order_info = ZeroMQService::get().recv_order_socket_rep();
    std::vector<std::string> tokens;
    std::vector<std::string> string_list;
    /* stock_id::order_type::user_id::price::quantity */
    boost::split(tokens, order_info ,boost::is_any_of("::"));
    std::copy_if(tokens.begin(), tokens.end(), std::back_inserter(string_list), [](const std::string& item)
    {
        return !item.empty();
    });

    /* Order order1(OrderType::BUY, 43.34, 4, 1, g_base_time + std::chrono::milliseconds(1)); */
    int stock_id;

    std::string order_type;

    int user_ID;
    // auto time_stamp = base_time + std::chrono::milliseconds(time_idx++);
    double price;
    int quantity;

    if(string_list.at(1) == "buy")
    {
        order_type = "BUY";
    }
    else if(string_list.at(1) == "sell")
    {
        order_type = "SELL";
    }
    else
    {

        // for(const auto& item: tokens)
        // {
        //     std::cout << item << "\n";
        // }

        std::cout << string_list.at(0) << "\n";
        std::cout << string_list.at(1) << "\n";
        std::cout << string_list.at(2) << "\n";
        std::cout << string_list.at(3) << "\n";
        std::cout << string_list.at(4) << "\n";

        // ZeroMQService::get().send_info_to_socket_rep("Invalid OrderType");
        std::cout << "Invalid OrderType\n";
        return;
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
        // ZeroMQService::get().send_info_to_socket_rep("Invalid Order Data");
        std::cout << "Invalid Order Data\n";
        return;
    }

    auto it = stocks_name_id.find(stock_id);
    if(it == stocks_name_id.end())
    {
        // ZeroMQService::get().send_info_to_socket_rep("Stock ID Provided not found");
        std::cout << "Stock ID Provided not found\n";
        return;
    }

    // Order order{order_type, price, quantity, user_ID, time_stamp};
    // stocks_service_map[it->second]->add_to_incoming_order(std::move(order));
    // ZeroMQService::get().send_info_to_socket_rep("Your Order is Successfully Added");
}

int main()
{
    recv_order_request("101::buy::1008::897.8::172");
    return 0;
}