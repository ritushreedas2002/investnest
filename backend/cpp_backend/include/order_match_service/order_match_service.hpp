#pragma once

#include <common/common.hpp>
#include <stock_service/zero_mq_service.hpp>

namespace investnest
{

    /*  OrderBook and OrderMatchService will be unique for every stock 
        While a thread is sleeping or waiting, the thread pool manager is responsible for 
        monitoring the state of the threads and managing their availability. When new tasks 
        are scheduled or existing tasks complete, the thread pool manager wakes up sleeping 
        threads or assigns new tasks to available threads as needed
    */
    enum class OrderType
    {
        BUY,
        SELL
    };

    class Trade
    {
        public:
            Trade(int seller_user_ID, int buyer_user_ID, double price, int quantity)
                : seller_user_ID(seller_user_ID), buyer_user_ID(buyer_user_ID), price(price), quantity(quantity)
            {}
        private:
            int seller_user_ID{};
            int buyer_user_ID{};
            double price{};
            int quantity{};
    };

    struct Order
    {
        OrderType type{};
        double price{};
        int quantity{};
        int user_ID{};
        std::chrono::high_resolution_clock::time_point timestamp;  // High-resolution timestamp

        std::pair<int, double> price_and_quantity;

        Order(OrderType type, double price, int quantity, int user_ID,const std::chrono::high_resolution_clock::time_point& timestamp)
            : type(type), price(price), quantity(quantity), user_ID(user_ID), timestamp(timestamp)
        {
            price_and_quantity = {quantity, price};
        }

        /* friend is IMP :- why IDK*/
        friend std::ostream& operator<<(std::ostream& out, const Order& order);
            
    };

    class OrderMatchService
    {

        /* Every stock is related to a OrderBook and OrderMatchService */

    public:

        OrderMatchService(const std::string& name);

        OrderMatchService(const OrderMatchService&) = delete;
        OrderMatchService& operator=(const OrderMatchService&) = delete;

        int get_number_of_matches();

        double get_stock_price();
        size_t orders_present();

        void add_to_incoming_order(const Order& order);

        void process();

    private:

        void pop_from_incoming_order();

        static std::string formatTime(const std::chrono::high_resolution_clock::time_point& time_point);

        void match(Order&& order);

        private:
            std::mutex mux{};
            std::condition_variable cv{};

            // std::vector<Trade> trades_happened{};
            int trade_count{0};

            double stock_price{};
            std::string name;

            std::stringstream msg;

            std::queue<Order> incoming_orders{};
            std::deque<Order> bids{};
            std::deque<Order> asks{};

            std::stringstream buffer;
    };
    
}
