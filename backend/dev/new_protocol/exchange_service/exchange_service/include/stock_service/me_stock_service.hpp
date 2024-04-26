#pragma once

#include <common/common.hpp>

#define THREAD_POOL_SIZE 3

namespace exchange_protocol
{
    namespace me
    {
        class StockService
        {
            public:
                StockService();

                // blocking function
                void run();

            private:
                std::unordered_map<std::string, std::unique_ptr<OrderMatchService>> stocks_map;
                boost::asio::thread_pool pool(THREAD_POOL_SIZE);
        };
    }
}