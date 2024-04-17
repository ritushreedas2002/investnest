#pragma once

#include <common/common.hpp>
#include <net/net_tsqueue.hpp>
#include <net/net_message.hpp>
#include <net/net_client.hpp>
#include <net/net_server.hpp>
#include <net/net_connection.hpp>

enum class CustomMsgTypes : uint32_t
{
    ServerAccept,
    ServerDeny,
    ServerPing,
    MessageAll,
    ServerMessage
};
