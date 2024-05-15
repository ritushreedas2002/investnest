#include <order_match_service/order_match_service.hpp>
// #include <stock_service/zero_mq_service.hpp>

namespace investnest
{
    std::ostream& operator<<(std::ostream& out, const Order& order)
    {
        /*
            "1008::72::879.8"
        */
        return out << order.user_ID << "::" << order.price_and_quantity.first << "::" << order.price_and_quantity.second;
    }

    OrderMatchService::OrderMatchService(const std::string& name)
        : trade_count(0), name(name) {}

    int OrderMatchService::get_number_of_matches()
    {
        std::scoped_lock lock(mux);
        return trade_count;
    }

    double OrderMatchService::get_stock_price()
    {
        std::scoped_lock ul(mux);
        return stock_price;
    }

    void OrderMatchService::add_to_incoming_order(const Order& order)
    {
        {
            std::unique_lock<std::mutex> ul(mux);
            incoming_orders.push(order);
        }
        cv.notify_one();
    }

    size_t OrderMatchService::orders_present()
    {
        std::scoped_lock ul(mux);
        return incoming_orders.size();
    }

    void OrderMatchService::process()
    {
        
        while(true)
        {
            this->pop_from_incoming_order();
        }

        /*
        while(!incoming_orders.empty())
        {
            this->pop_from_incoming_order();
        }
        */
    }

    void OrderMatchService::pop_from_incoming_order()
    {
        std::unique_lock<std::mutex> gaurd{mux};

        cv.wait(gaurd, [&]()
        {
            return !incoming_orders.empty();
        }); /* wait till incoming_orders is not empty */

        /* Mutex lock acquired here, just before accessing the deque*/
        auto t = std::move(incoming_orders.front());
        incoming_orders.pop();

        gaurd.unlock(); /* mutex will be unlocked */

        this->match(std::move(t));   
    }

    std::string OrderMatchService::formatTime(const std::chrono::high_resolution_clock::time_point& time_point)
    {
        auto timeT = std::chrono::system_clock::to_time_t(std::chrono::time_point_cast<std::chrono::system_clock::duration>(time_point));
        long long int millis = std::chrono::duration_cast<std::chrono::milliseconds>(time_point.time_since_epoch()).count() % 1000;

        struct tm * dt; char buffer[30];

        dt = localtime(&timeT);
        strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", dt);

        char currentTime[84] = "";
        sprintf(currentTime, "%s.%03lld", buffer, millis);

        return std::string(currentTime);
    }

    void OrderMatchService::match(Order&& order)
    {
        std::scoped_lock lock(mux);

        if(order.type == OrderType::BUY)
        {
            while(
                    !asks.empty() && 
                    order.quantity > 0 && 
                    order.price >= asks.front().price && 
                    order.user_ID != asks.front().user_ID
            )
            {

                Order& ask_order = asks.front();
                auto fill_quantity = std::min(order.quantity, ask_order.quantity);
                
                /* seller , buyer */

                /*
                msg << name << " Trade Executed at: " << OrderMatchService::formatTime(ask_order.timestamp)  << ": Buy User " << order.user_ID
                    << " buys " << fill_quantity << " shares from Sell User " << ask_order.user_ID
                    << " at $" << ask_order.price << "\n";
                std::cout << msg.str();
                */
                
                order.quantity -= fill_quantity;
                ask_order.quantity -= fill_quantity;

                // trades_happened.emplace_back(Trade{ask_order.user_ID, order.user_ID, order.price, fill_quantity});
                trade_count++;
                stock_price = order.price;

                if(ask_order.quantity == 0)
                {
                    asks.pop_front();
                    /* NO NEED TO SORT HERE */
                    /** Send HTTP call */

                    buffer.str("");
                    buffer << ask_order;

                    ZeroMQService::get().publish_data_to_socket_pub(buffer.str(), ZeroMQService::TOPIC::CON);
                }
            }
            if(order.quantity > 0)
            {
                bids.push_back(order);
                std::sort(bids.begin(), bids.end(), [](const Order& a, const Order& b){
                    // Function to compare for sorting bids: descending price, then ascending time
                    if (a.price == b.price) return a.timestamp < b.timestamp;
                    return a.price > b.price;
                });
            }
        }
        else
        {
            
            while(
                    !bids.empty() && 
                    order.quantity > 0 && 
                    order.price <= bids.front().price &&
                    order.user_ID != bids.front().user_ID
            )
            {

                Order& bid_order = bids.front();
                auto fill_quantity = std::min(order.quantity, bid_order.quantity);

                /*
                msg << name << " Trade Executed at : " << OrderMatchService::formatTime(bid_order.timestamp)  << " Sell User " << order.user_ID
                    << " sells " << fill_quantity << " shares to Buy User " << bid_order.user_ID
                    << " at $" << bid_order.price << "\n";
                std::cout << msg.str();
                */

                order.quantity -= fill_quantity;
                bid_order.quantity -= fill_quantity;

                // trades_happened.emplace_back(Trade{order.user_ID, bid_order.user_ID, order.price, fill_quantity});
                trade_count++;
                stock_price = order.price;

                if(bid_order.quantity == 0)
                {
                    bids.pop_front();
                    /* NO NEED TO SORT HERE */

                    /** Send HTTP call */
                    buffer.str("");
                    buffer << bid_order;
                    ZeroMQService::get().publish_data_to_socket_pub(buffer.str(), ZeroMQService::TOPIC::CON);
                }
            }
            if(order.quantity > 0)
            {
                asks.push_back(order);
                std::sort(asks.begin(), asks.end(), [](const Order& a, const Order& b){
                    // Function to compare for sorting asks: ascending price, then ascending time
                    if (a.price == b.price) return a.timestamp < b.timestamp;
                    return a.price < b.price;
                });
            }
        }
    }
    
}
