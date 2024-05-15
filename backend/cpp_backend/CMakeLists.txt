cmake_minimum_required(VERSION 3.22.1)

project(investnest)

set(CMAKE_BUILD_TYPE Debug)

set(Boost_ROOT "/home/nbaskey/my_opt/boost_libs")
find_package(Boost 1.84 REQUIRED COMPONENTS system thread)

set(cppzmq_DIR "/home/nbaskey/my_opt/cppzmq_libs/share/cmake/cppzmq")
find_package(cppzmq REQUIRED)

include_directories("/home/nbaskey/my_opt/cppzmq_libs/include")

# add_executable(stock_client app/stock_client.cpp)
# add_executable(stock_server app/stock_server.cpp)
# add_executable(stock_server_pub app/stock_server_pub.cpp)

# add_executable(order_match_service_test tests/order_match_service_test.cpp)

if(0)
    add_executable(stock_service_test
        tests/stock_service_test.cpp

        include/order_match_service/order_match_service.cpp
        include/stock_service/stock_service.cpp
        include/stock_service/zero_mq_service.cpp
    )
endif()

if(1)
    add_executable(stock_app 
        
        app/stock_app.cpp

        include/order_match_service/order_match_service.cpp
        include/stock_service/stock_service.cpp
        include/stock_service/zero_mq_service.cpp
    )
endif()

# https://www.boost.org/doc/libs/1_84_0/doc/html/boost_asio/using.html
# Link against the Boost.System library
if(0)
    target_link_libraries(stock_client 
        PRIVATE ${Boost_SYSTEM_LIBRARY}
    )

    target_link_libraries(stock_server 
        PRIVATE ${Boost_SYSTEM_LIBRARY}
        PRIVATE cppzmq
    )

    target_link_libraries(stock_server_pub
        PRIVATE ${Boost_SYSTEM_LIBRARY}
        PRIVATE cppzmq
    )
endif()

if(1)

    target_link_libraries(stock_app
        PRIVATE ${Boost_SYSTEM_LIBRARY}
        PRIVATE ${Boost_THREAD_LIBRARY}
        PRIVATE cppzmq
    )

    target_include_directories(stock_app
        PRIVATE ${Boost_INCLUDE_DIRS}
        PRIVATE include
    )

endif()

if(0)
    target_include_directories(stock_client
        PRIVATE ${Boost_INCLUDE_DIRS}
        PRIVATE include
    )

    target_include_directories(stock_server
        PRIVATE ${Boost_INCLUDE_DIRS}
        PRIVATE include
    )
endif()

if(0)

    target_link_libraries(stock_service_test
        PRIVATE ${Boost_SYSTEM_LIBRARY}
        PRIVATE ${Boost_THREAD_LIBRARY}
        PRIVATE cppzmq
    )

    target_include_directories(stock_service_test
        PRIVATE ${Boost_INCLUDE_DIRS}
        PRIVATE include
    )

endif()

if(0)

    target_include_directories(order_match_service_test
        PRIVATE ${Boost_INCLUDE_DIRS}
        PRIVATE include
    )

endif()
