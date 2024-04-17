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
                StockService()
                {
                    auto hdfc_bank_match_service = std::make_unique<OrderMatchService>();
                    auto reliance_match_service = std::make_unique<OrderMatchService>();
                    auto airtel_match_service = std::make_unique<OrderMatchService>();
                    auto tata_match_service = std::make_unique<OrderMatchService>();

                    stocks_map['hdfc'] = hdfc_bank_match_service;
                    stocks_map['reliance'] = reliance_match_service;
                    stocks_map['airtel'] = airtel_match_service;
                    stocks_map['tata'] = tata_match_service;

                    for(const auto& item: stocks_map)
                    {
                        boost::asio::post(pool, item->second.process);
                    }
                }

                // blocking function
                void run()
                {
                    pool.join(); // blocking function
                }

            private:
                std::unordered_map<std::string, std::unique_ptr<OrderMatchService>> stocks_map;
                boost::asio::thread_pool pool(THREAD_POOL_SIZE);
        };
    }
}