#pragma once

#include <common/common.hpp>
#include <order_match_service/order_match_service.hpp>

namespace investnest
{
    struct StockService
    {

        std::unordered_map<std::string, std::unique_ptr<OrderMatchService>> stocks_service_map;
        std::unordered_map<int, std::string> stocks_name_id;
        std::size_t size_of_stock_name_id;

        std::unique_ptr<boost::asio::io_service> ios_to_handle_process_function;
        std::unique_ptr<boost::asio::io_service> ios_to_handle_request_function;
        // boost::asio::io_service::work work; /* No need for this becoz the OrderMatchService::process will be running infinitely */

        std::unique_ptr<boost::asio::deadline_timer> timer;

        std::mutex mutex;
        std::stringstream buffer;

        std::chrono::time_point<std::chrono::high_resolution_clock> base_time = std::chrono::high_resolution_clock::now();
        uint32_t time_idx = 1;

        StockService();

        StockService(const StockService&) = delete;
        StockService& operator=(const StockService&) = delete;

        void process_start();

        void recv_order_request();

        void create_order_from_tokens(const std::vector<std::string>& tokens);
        void send_all_stock_data();

        // blocking function
        void run();
    };

}