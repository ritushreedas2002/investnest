#include <order_match/me_order_match_service.hpp>

using namespace exchange_protocol::me;

int main()
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

    std::cout << hdfc_bank_order_match_service.get_stock_price() << "\n";

    return 0;
}