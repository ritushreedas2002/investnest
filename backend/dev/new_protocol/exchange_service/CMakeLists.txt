cmake_minimum_required(VERSION 3.22.1)

project(mmo_project)

set(CMAKE_BUILD_TYPE Debug)

set(Boost_ROOT "/home/neodeus/my_opt/boost_libs")
find_package(Boost 1.84 REQUIRED COMPONENTS)

add_subdirectory(exchange_service)
