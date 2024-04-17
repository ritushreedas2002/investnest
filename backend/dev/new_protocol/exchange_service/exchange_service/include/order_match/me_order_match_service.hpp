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

            OrderBookItem(double price, uint16_t quantity, uint16_t user_ID)
                : price(price), quantity(quantity), user_ID(user_ID)
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

            public:
                void add_order(const OrderInfo& order_info)
                {
                    if(order_info.type == OrderType::BUY)
                    {
                        bids.emplace_back(OrderBookItem{order_info.price, order_info.quantity, order_info.user_ID});
                        /* Sort bids in descending order_info */
                        std::sort(bids.begin(), bids.end(),[](const OrderBookItem& item1, const OrderBookItem& item2){
                            return item1.price > item2.price;
                        });
                    }
                    else
                    {
                        asks.emplace_back(OrderBookItem{order_info.price, order_info.quantity, order_info.user_ID});
                        /* Sorts asks in ascending order */
                        std::sort(asks.begin(), asks.end(),[](const OrderBookItem& item1, const OrderBookItem& item2){
                            return item1.price < item2.price;
                        });
                    }
                }

                void remove_order(OrderType order_type, const OrderBookItem& order_book_item)
                {
                    if(order_type == OrderType::BUY)
                    {
                        bids.erase(std::remove(bids.begin(), bids.end(), order_book_item), bids.end());/* It does not changes the order */
                    }
                    else
                    {
                        asks.erase(std::remove(asks.begin(), asks.end(), order_book_item), asks.end());/* It does not changes the order */
                    }
                }    

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
            //std::unordered_map<int, int> unmatched_orders;

            double stock_price{};

            const double EPSILON = 0.0000001;

        private:

            bool isEqual(double a, double b)
            {
                return std::abs(a - b) < EPSILON;
            }

            bool isLessThanOrEqual(double a, double b)
            {
                return a < b || isEqual(a, b);
            }

            bool isMoreThanOrEqual(double a, double b)
            {
                return a > b || isEqual(a, b);
            }

        public:
            //OrderMatchService()
            //{
            //    orderbook = std::make_unique<OrderBook>();
            //}

            OrderMatchService(): orderbook(std::make_unique<OrderBook>()), match_count(0) {}

            OrderMatchService(const OrderMatchService&) = delete;

            int get_number_of_matches()
    {
        std::scoped_lock lock(mux);
        return match_count;
    }

            double get_stock_price()
            {
                std::scoped_lock ul(mux);

                return stock_price;
            }

            void add_to_incoming_order(const OrderInfo& order_info)
            {
                std::scoped_lock ul(mux);

                incoming_orders.push(order_info);
            }

            void process()
            {
                //while(true)
                //{
                //    this->pop_from_incoming_order();
                //}

                 while(!incoming_orders.empty())
                 {
                     this->pop_from_incoming_order();
                 }
            }

        private:

            void pop_from_incoming_order()
            {
                std::unique_lock<std::mutex> gaurd{mux};

                cv.wait(gaurd, [&]()
                {
                    return !incoming_orders.empty();
                }); /* wait till incoming_orders is not empty */

                // Mutex lock acquired here, just before accessing the deque
                auto t = std::move(incoming_orders.front());
                incoming_orders.pop();

                this->match(std::move(t));
                
            }// mutex will be unlocked

            void match(OrderInfo&& order_info)
            {
                if(order_info.type == OrderType::BUY)
                {
                    if(orderbook->asks.empty())
                    {
                        orderbook->add_order(order_info);
                        return;
                    }
                    while(order_info.quantity > 0 && this->isLessThanOrEqual(orderbook->asks.front().price, order_info.price))
                    {
                        OrderBookItem ask_order = orderbook->asks.front();
                        orderbook->asks.pop_front();
                        auto fill_quantity = std::min(order_info.quantity, ask_order.quantity);
                        order_info.quantity -= fill_quantity;
                        ask_order.quantity -= fill_quantity;
                        /* seller , buyer */
                        //trades_happened.emplace_back(TradeInfo{ask_order.user_ID, order_info.user_ID, order_info.price, fill_quantity});
                        if(fill_quantity > 0)
            {
                trades_happened.emplace_back(TradeInfo{ask_order.user_ID, order_info.user_ID, order_info.price, fill_quantity});
                match_count++; // Increment match count for each successful trade
            }
                        
                        stock_price = order_info.price;
                        if(ask_order.quantity == 0)
                        {
                            orderbook->remove_order(OrderType::SELL, ask_order); /* ask_order is of type OrderBookItem */
                            /** Send HTTP call */
                        }
                    }
                    if(order_info.quantity > 0)
                    {
                        orderbook->add_order(order_info);
                        /* Send HTTP call */
                    }
                }
                else
                {
                    if(orderbook->bids.empty())
                    {
                        orderbook->add_order(order_info);
                        return;
                    }
                    while(order_info.quantity > 0 && this->isMoreThanOrEqual(orderbook->bids.front().price, order_info.price))
                    {
                        OrderBookItem bid_order = orderbook->bids.front();
                        orderbook->bids.pop_front();
                        auto fill_quantity = std::min(order_info.quantity, bid_order.quantity);
                        order_info.quantity -= fill_quantity;
                        bid_order.quantity -= fill_quantity;
                        /* seller , buyer */
                        //trades_happened.emplace_back(TradeInfo{order_info.user_ID, bid_order.user_ID, order_info.price, fill_quantity});
                        if(fill_quantity > 0)
            {
                trades_happened.emplace_back(TradeInfo{order_info.user_ID, bid_order.user_ID, order_info.price, fill_quantity});
                match_count++; // Increment match count for each successful trade
            }
                        
                        stock_price = order_info.price;
                        if(bid_order.quantity == 0)
                        {
                            orderbook->remove_order(OrderType::BUY, bid_order);/* bid_order is of type OrderBookItem */
                            /** Send HTTP call */
                        }
                    }
                    if(order_info.quantity > 0)
                    {
                        orderbook->add_order(order_info);
                        /** Send HTTP call */
                    }
                }
            }
        };
    }
}
