#include <iostream>
#include <exchange_protocol/exchange_protocol_net.hpp>

class ExchangeServer: public exchange_protocol::net::server_interface<CustomMsgTypes>
{
private:
    std::thread m_thread;

public:
    ExchangeServer(uint16_t port): exchange_protocol::net::server_interface<CustomMsgTypes>(port)
    {
    }

protected:
    // Called when a client connects, you can veto the connection by returning false
    virtual bool onClientConnect(std::shared_ptr<exchange_protocol::net::connection<CustomMsgTypes>> client)
    {
        exchange_protocol::net::message<CustomMsgTypes> msg;
        msg.header.id = CustomMsgTypes::ServerAccept;
        client->send(msg);

        return true;
    }

    // Called when a client appears to have disconnected
    virtual void onClientDisconnect(std::shared_ptr<exchange_protocol::net::connection<CustomMsgTypes>> client)
    {
        std::cout << "Removing client [" << client->getID() << "]\n";
    }

    // Called when message arrives
    virtual void onMessageArrival(std::shared_ptr<exchange_protocol::net::connection<CustomMsgTypes>> client,
                                  const exchange_protocol::net::message<CustomMsgTypes>& msg)
    {
        switch(msg.header.id)
        {
        case CustomMsgTypes::ServerPing:
            {
                std::cout << "[" << client->getID() << "] ServerPing\n";

                // Simply bounce message back to client
                client->send(msg);
            }
            break;
        case CustomMsgTypes::MessageAll:
            {
                std::cout << "[" << client->getID() << "]: Message All\n";
                exchange_protocol::net::message<CustomMsgTypes> msg;
                msg.header.id = CustomMsgTypes::ServerMessage;
                msg << client->getID();
                messageAllClients(msg,client);
            }
            break;
        }
    }
};

int main()
{
    ExchangeServer server(60000);
    server.start();

    while(1)
    {
        server.update();
    }


    return 0;
}
