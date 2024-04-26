#pragma once

#include <common/common.hpp>

namespace exchange_protocol
{
    /*  OrderBook and OrderMatchService will be unique for every stock 
        While a thread is sleeping or waiting, the thread pool manager is responsible for 
        monitoring the state of the threads and managing their availability. When new tasks 
        are scheduled or existing tasks complete, the thread pool manager wakes up sleeping 
        threads or assigns new tasks to available threads as needed
    */
    namespace me
    {
        enum class OrderType
        {
            BUY,
            SELL
        };

        class TradeInfo
        {
            public:
                TradeInfo(uint16_t seller_user_ID, uint16_t buyer_user_ID, double price, uint16_t quantity)
                    : seller_user_ID(seller_user_ID), buyer_user_ID(buyer_user_ID), price(price), quantity(quantity)
                {}
            private:
                uint16_t seller_user_ID{};
                uint16_t buyer_user_ID{};
                double price{};
                uint16_t quantity{};
        };

        class OrderInfo
        {
            public:
                OrderInfo(OrderType type, double price, uint16_t quantity, uint16_t user_ID)
                    : type(type), price(price), quantity(quantity), user_ID(user_ID)
                {}
            private:
                OrderType type{};
                double price{};
                uint16_t quantity{};
                uint16_t user_ID{};

            friend class OrderBook;
            friend class OrderMatchService;
        };

        struct OrderBookItem
        {
            uint64_t unique_ID{};
            double price{};
            uint16_t quantity{};
            uint16_t user_ID{};
            std::chrono::high_resolution_clock::time_point timestamp;  // High-resolution timestamp

            OrderBookItem(const OrderBookItem& other)
            {
                price = other.price;
                quantity = other.quantity;
                user_ID = other.user_ID;

                unique_ID = other.unique_ID;
            }
            OrderBookItem& operator=(const OrderBookItem& other)
            {
                if(this != &other)
                {
                    price = other.price;
                    quantity = other.quantity;
                    user_ID = other.user_ID;

                    unique_ID = other.unique_ID;
                }

                return *this;
            }

            OrderBookItem(double price, uint16_t quantity, uint16_t user_ID, const std::chrono::high_resolution_clock::time_point& time_point)
                : price(price), quantity(quantity), user_ID(user_ID), timestamp(time_point)
            {
                unique_ID++;
            }

            /* Used for std::find */
            bool operator==(const OrderBookItem& item) const
            {
                return unique_ID == item.unique_ID;
            }
        };

        class OrderBook
        {
            private:
                std::deque<OrderBookItem> bids{};
                std::deque<OrderBookItem> asks{};

                std::chrono::time_point<std::chrono::high_resolution_clock> base_time = std::chrono::high_resolution_clock::now();

            public:
                void add_order(const OrderInfo& order_info);

                void remove_order(OrderType order_type, const OrderBookItem& order_book_item);   

            friend class OrderMatchService;  
        };

        class OrderMatchService
        {

            /* Every stock is related to a OrderBook and OrderMatchService */
        private:
            std::queue<OrderInfo> incoming_orders{};
            std::unique_ptr<OrderBook> orderbook = nullptr;
            std::mutex mux{};
            std::condition_variable cv{};
            std::vector<TradeInfo> trades_happened{};
            int match_count{};
            double stock_price{};

        public:

            OrderMatchService(): orderbook(std::make_unique<OrderBook>()), match_count(0) {}

            OrderMatchService(const OrderMatchService&) = delete;

            int get_number_of_matches();

            double get_stock_price();

            void add_to_incoming_order(const OrderInfo& order_info);

            void process();

        private:

            void pop_from_incoming_order();

            void match(OrderInfo&& order_info);
        };
    }
}
