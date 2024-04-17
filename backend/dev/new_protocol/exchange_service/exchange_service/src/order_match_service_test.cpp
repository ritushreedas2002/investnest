#include <order_match/me_order_match_service.hpp>

using namespace exchange_protocol::me;

int f1()
{
    OrderMatchService hdfc_bank_order_match_service;

    OrderInfo order1(OrderType::BUY, 43.34, 4, 1);
    OrderInfo order2(OrderType::BUY, 56.55, 6, 2);

    OrderInfo order3(OrderType::SELL, 89.78, 2, 3);
    OrderInfo order4(OrderType::SELL, 563.78, 8, 4);

    hdfc_bank_order_match_service.add_to_incoming_order(std::move(order1));
    hdfc_bank_order_match_service.add_to_incoming_order(std::move(order3));
    hdfc_bank_order_match_service.add_to_incoming_order(std::move(order4));
    hdfc_bank_order_match_service.add_to_incoming_order(std::move(order2));

    OrderInfo order5(OrderType::BUY, 89.78, 2, 5);
    hdfc_bank_order_match_service.add_to_incoming_order(std::move(order5));

    hdfc_bank_order_match_service.process();

    //std::cout << hdfc_bank_order_match_service.get_stock_price() << "\n";

    if(hdfc_bank_order_match_service.get_stock_price()==89.78){
        return 1;
    }
    else{
        return 0;
    }  
}

int multiple_matches_test() {
    OrderMatchService order_service;

    OrderInfo buy_order1(OrderType::BUY, 20.00, 10, 1);
    OrderInfo buy_order2(OrderType::BUY, 20.00, 10, 2);
    OrderInfo sell_order(OrderType::SELL, 20.00, 20, 3);

    order_service.add_to_incoming_order(std::move(buy_order1));
    order_service.add_to_incoming_order(std::move(buy_order2));
    order_service.add_to_incoming_order(std::move(sell_order));

    order_service.process();

    return order_service.get_stock_price() == 20.00 ? 1 : 0;
}

int multiple_buyers_sellers_test() {
    OrderMatchService order_service;

    OrderInfo buy_order1(OrderType::BUY, 35.00, 10, 1);
    OrderInfo buy_order2(OrderType::BUY, 35.50, 10, 2);
    OrderInfo sell_order1(OrderType::SELL, 35.00, 15, 3);
    OrderInfo sell_order2(OrderType::SELL, 34.75, 5, 4);

    order_service.add_to_incoming_order(std::move(buy_order1));
    order_service.add_to_incoming_order(std::move(buy_order2));
    order_service.add_to_incoming_order(std::move(sell_order1));
    order_service.add_to_incoming_order(std::move(sell_order2));

    order_service.process();

    int a=order_service.get_number_of_matches();
    std::cout<<a<<std::endl;

    return order_service.get_number_of_matches() == 2 ? 1 : 0;
}

int high_frequency_orders_test() {
    OrderMatchService order_service;

    for (int i = 1; i <= 100; ++i) {
        OrderInfo buy_order(OrderType::BUY, 55.00, 1, i);
        order_service.add_to_incoming_order(std::move(buy_order));
    }

    for (int i = 101; i <= 200; ++i) {
        OrderInfo sell_order(OrderType::SELL, 55.00, 1, i);
        order_service.add_to_incoming_order(std::move(sell_order));
    }

    order_service.process();

    int a = order_service.get_number_of_matches();
    std::cout << a << std::endl;

    return order_service.get_number_of_matches() == 100? 1 : 0;
}

int price_overlaps_test() {
    OrderMatchService order_service;

    OrderInfo buy_order(OrderType::BUY, 75.00, 5, 1);
    OrderInfo sell_order1(OrderType::SELL, 70.00, 5, 2);
    OrderInfo sell_order2(OrderType::SELL, 76.00, 5, 3);

    order_service.add_to_incoming_order(std::move(buy_order));
    order_service.add_to_incoming_order(std::move(sell_order2));
    order_service.add_to_incoming_order(std::move(sell_order1));

    order_service.process();

    // Check if lower price sell order matches first
    return order_service.get_stock_price() == 70.00 ? 1 : 0;
}



int main(){
    if(price_overlaps_test()==0){
        std::cout<<"function9 failed\n";
    }
    else{
        std::cout<<"function9 passed\n";
    }

    return 0;
}