
set(MY_VALUE FALSE)

if(Boost_FOUND)

    # Your project setup
    # add_executable(main main.cpp)

    add_executable(simple_client app/simple_client.cpp)
    add_executable(simple_server app/simple_server.cpp)

    # https://www.boost.org/doc/libs/1_84_0/doc/html/boost_asio/using.html
    # Link against the Boost.System library
    target_link_libraries(simple_client 
        PRIVATE ${Boost_SYSTEM_LIBRARY}
    )

    target_include_directories(simple_client
        PRIVATE ${Boost_INCLUDE_DIRS}
        PRIVATE include
    )

    target_link_libraries(simple_server 
        PRIVATE ${Boost_SYSTEM_LIBRARY}
    )

    target_include_directories(simple_server
        PRIVATE ${Boost_INCLUDE_DIRS}
        PRIVATE include
    )
else()
    message(FATAL_ERROR "Boost not found. Please set Boost_ROOT to the correct path.")
endif()

add_executable(order_match_service_test
    
    app/order_match_service_test.cpp
    src/me_order_match_service.cpp
)

target_include_directories(order_match_service_test
    PRIVATE ${Boost_INCLUDE_DIRS}
    PRIVATE include
)

include(FetchContent)
FetchContent_Declare(
  cli
  GIT_REPOSITORY https://github.com/daniele77/cli.git
  GIT_TAG v2.1.0
)
FetchContent_MakeAvailable(cli)

add_executable(stock_client
    
    app/stock_client.cpp
)

target_include_directories(stock_client
    PRIVATE ${Boost_INCLUDE_DIRS}
    PRIVATE include
)

target_link_libraries(stock_client
    PRIVATE cli::cli
)
