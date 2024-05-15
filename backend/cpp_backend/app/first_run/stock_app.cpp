#include <stock_service/stock_service.hpp>

int main()
{
    /* Start the Stock Service */
    investnest::StockService ss;

    ss.process_start();

    ss.run(); // blocking
}