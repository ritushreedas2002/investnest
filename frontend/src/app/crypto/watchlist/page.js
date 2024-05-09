"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../../../../top_300_coins_reduced.json";
import { MdDeleteForever } from "react-icons/md";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  // Combining prices and previous prices in a single state to manage them atomically
  const [prices, setPrices] = useState({});
  const [change24, setChange24] = useState({});
  const [change1m, setChange1m] = useState({});

  const wsUrl =
    "wss://push.coinmarketcap.com/ws?device=web&client_source=home_page";
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  useEffect(() => {
    fetchWatchlist();
  }, [email]);

  const fetchWatchlist = async () => {
    if (email) {
      try {
        const response = await axios.get(
          `/api/crypto/watchlist?userId=${email}`
        );
        const symbolsFromBackend = response.data.data.map((item) =>
          item.coinSymbol.toLowerCase()
        );
        const matchedData = data
          .filter((coin) =>
            symbolsFromBackend.includes(coin.symbol.toLowerCase())
          )
          .map((coin) => {
            const details = response.data.data.find(
              (item) =>
                item.coinSymbol.toLowerCase() === coin.symbol.toLowerCase()
            );
            return { ...coin, ...details };
          });

        setWatchlist(matchedData);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
      }
    }
  };

  const handleRemoveFromWatchlist = async (coinId) => {
    try {
      await axios.delete(
        `/api/crypto/watchlist?userId=${email}&coinId=${coinId}`
      );
      fetchWatchlist(); // Refresh the watchlist after deletion
    } catch (error) {
      console.error("Failed to delete coin from watchlist:", error);
    }
  };

  useEffect(() => {
    let cryptoWebSocket;
    const ids = watchlist.map((coin) => coin.id.toString()).join(",");

    if (ids) {
      const payload = {
        method: "RSUBSCRIPTION",
        params: ["main-site@crypto_price_5s@{}@normal", ids],
      };

      cryptoWebSocket = new WebSocket(wsUrl);
      cryptoWebSocket.onopen = () => {
        console.log("WebSocket connection established.");
        cryptoWebSocket.send(JSON.stringify(payload));
      };

      cryptoWebSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message && message.d) {
          const { id, p, p24h, p30d } = message.d;
          // Use a function within setPrices to access the most current state
          setPrices((prevPrices) => ({
            ...prevPrices,
            [id]: {
              previous: prevPrices[id] ? prevPrices[id].current : p,
              current: p,
            },
          }));
          setChange24((prev) => ({ ...prev, [id]: p24h }));
          setChange1m((prev) => ({ ...prev, [id]: p30d }));
        } else {
          console.error("Unexpected message format:", message);
        }
      };

      return () => {
        if (cryptoWebSocket) {
          cryptoWebSocket.close();
        }
      };
    }
  }, [watchlist]);

  return (
    <div>
      <table className="min-w-full  bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="py-3 px-5 text-left">Name</th>
            <th className="py-3 px-5 text-left whitespace-nowrap">
              Live Price
            </th>
            <th className="py-3 px-5 text-left whitespace-nowrap">
              24h Change
            </th>
            <th className="py-3 px-5 text-left whitespace-nowrap">
              30d Change
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {watchlist.map((coin, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={coin.coinImage}
                    alt={`${coin.coinName} logo`}
                    className="mr-2 w-8 h-8 rounded-full shadow-sm"
                  />
                  <span className="font-medium">
                    {coin.coinName} ({coin.symbol})
                  </span>
                </div>
              </td>
              <td className="py-3 px-6 text-right">
                <span
                  className={`font-semibold ${
                    prices[coin.id] &&
                    prices[coin.id].current > prices[coin.id].previous
                      ? "text-green-500"
                      : prices[coin.id] &&
                        prices[coin.id].current < prices[coin.id].previous
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  $
                  {prices[coin.id]
                    ? prices[coin.id].current.toFixed(2)
                    : coin.coinPrice.toFixed(2)}
                </span>
              </td>
              <td className="py-3 px-6 text-right font-semibold">
                <span
                  className={
                    change24[coin.id] >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {change24[coin.id]
                    ? `${change24[coin.id].toFixed(2)}%`
                    : "N/A"}
                </span>
              </td>
              <td className="py-3 px-6 text-right font-semibold">
                <span
                  className={
                    change1m[coin.id] >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {change1m[coin.id]
                    ? `${change1m[coin.id].toFixed(2)}%`
                    : "N/A"}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleRemoveFromWatchlist(coin.coinId)}
                  className="text-red-500 text-2xl hover:text-red-700 transition duration-300"
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchList;
