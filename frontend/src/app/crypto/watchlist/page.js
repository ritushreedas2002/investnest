"use client";

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import data from '../../../../top_300_coins_reduced.json';

// const WatchList = () => {
//     const [watchlistSymbols, setWatchlistSymbols] = useState([]);
//     const [matchedCoins, setMatchedCoins] = useState([]);
//     const [cryptoData, setCryptoData] = useState({});
//     const wsUrl = 'wss://push.coinmarketcap.com/ws?device=web&client_source=home_page';
//     const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

//     useEffect(() => {
//         const fetchWatchlist = async () => {
//             if (email) {
//                 try {
//                     const response = await axios.get(`/api/crypto/watchlist?userId=${email}`);
//                     const symbols = response.data.data.map(item => item.coinSymbol.toLowerCase());
//                     setWatchlistSymbols(symbols);
//                 } catch (error) {
//                     console.error("Failed to fetch watchlist:", error);
//                     setWatchlistSymbols([]);
//                 }
//             }
//         };

//         fetchWatchlist();
//     }, [email]);

//     useEffect(() => {
//         const matched = data.filter(coin => watchlistSymbols.includes(coin.symbol.toLowerCase()));
//         setMatchedCoins(matched);
//     }, [watchlistSymbols]);

//     useEffect(() => {
//         const ids = matchedCoins.map(coin => coin.id.toString());
//         if (ids.length > 0) {
//             const payload = {
//                 "method": "RSUBSCRIPTION",
//                 "params": ["main-site@crypto_price_5s@{}@normal", ids.join(',')]
//             };

//             const cryptoWebSocket = new WebSocket(wsUrl);

//             cryptoWebSocket.onopen = () => {
//                 console.log('WebSocket connection established.');
//                 cryptoWebSocket.send(JSON.stringify(payload));
//             };

//             cryptoWebSocket.onmessage = (event) => {
//                 const message = JSON.parse(event.data);
//                 if (message && message.d) {
//                     const cryptoUpdate = message.d;
//                     //console.log(cryptoUpdate);
//                     setCryptoData(prevData => ({
//                         ...prevData,
//                         [cryptoUpdate.id]: { ...prevData[cryptoUpdate.id], ...cryptoUpdate }
//                     }));
//                 } else {
//                     console.error('Unexpected message format:', message);
//                 }
//             };

//             return () => cryptoWebSocket.close();
//         }
//     }, [matchedCoins]);

//     return (
//         <div>
//             <h1>Watchlist Crypto Prices</h1>
//             {Object.values(cryptoData).map((data, index) => (
//                 <div key={index}>
//                     <h2>{data.id}</h2>
//                     <p>Current Price: ${data.p}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default WatchList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import data from '../../../../top_300_coins_reduced.json';

// const WatchList = () => {
//     const [watchlist, setWatchlist] = useState([]); // This will hold the combined data from the backend and WebSocket
//     const wsUrl = 'wss://push.coinmarketcap.com/ws?device=web&client_source=home_page';
//     const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

//     useEffect(() => {
//         const fetchWatchlist = async () => {
//             if (email) {
//                 try {
//                     const response = await axios.get(`/api/crypto/watchlist?userId=${email}`);
//                     const symbolsFromBackend = response.data.data.map(item => item.coinSymbol.toLowerCase());

//                     // Match these symbols with the static data to find corresponding IDs
//                     const matchedData = data.filter(coin => symbolsFromBackend.includes(coin.symbol.toLowerCase()))
//                                             .map(coin => ({
//                                                 ...coin,
//                                                 coinName: response.data.data.find(item => item.coinSymbol.toLowerCase() === coin.symbol.toLowerCase()).coinName
//                                             }));

//                     setWatchlist(matchedData);
//                 } catch (error) {
//                     console.error("Failed to fetch watchlist:", error);
//                 }
//             }
//         };

//         fetchWatchlist();
//     }, [email]);

//     useEffect(() => {
//         let cryptoWebSocket;
//         if (watchlist.length > 0) {
//             const ids = watchlist.map(coin => coin.id.toString()).join(',');
//             const payload = {
//                 "method": "RSUBSCRIPTION",
//                 "params": ["main-site@crypto_price_5s@{}@normal", ids]
//             };

//             cryptoWebSocket = new WebSocket(wsUrl);

//             cryptoWebSocket.onopen = () => {
//                 console.log('WebSocket connection established.');
//                 cryptoWebSocket.send(JSON.stringify(payload));
//             };

//             cryptoWebSocket.onmessage = (event) => {
//                 const message = JSON.parse(event.data);
//                 if (message && message.d) {
//                     const updates = message.d;
//                     setWatchlist(prevList => prevList.map(coin => ({
//                         ...coin,
//                         price: updates.id === coin.id ? updates.p : coin.price
//                     })));
//                 } else {
//                     console.error('Unexpected message format:', message);
//                 }
//             };
//         }

//         return () => {
//             if (cryptoWebSocket) {
//                 cryptoWebSocket.close();
//             }
//         };
//     }, [watchlist]);

//     return (
//         <div>
//             <h1>Watchlist Crypto Prices</h1>
//             {watchlist.map((coin, index) => (
//                 <div key={index}>
//                     <h2>{coin.coinName} ({coin.symbol})</h2>
//                     <p>Current Price: ${coin.price || 'Loading...'}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default WatchList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../../../../top_300_coins_reduced.json";
import { MdDeleteForever } from "react-icons/md";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]); // Static data from the backend
  const [prices, setPrices] = useState({}); // Dynamic price data from WebSocket
  const [change24, setChange24] = useState({}); // Dynamic 24h change data from WebSocket
  const [change1m, setChange1m] = useState({}); // Dynamic 24h change data from WebSocket
  const [lastPrices, setLastPrices] = useState({}); // Keep track of last prices

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
          .map((coin) => ({
            ...coin,
            coinId: response.data.data.find(
              (item) =>
                item.coinSymbol.toLowerCase() === coin.symbol.toLowerCase()
            ).coinId,
            coinName: response.data.data.find(
              (item) =>
                item.coinSymbol.toLowerCase() === coin.symbol.toLowerCase()
            ).coinName,
            coinImage: response.data.data.find(
              (item) =>
                item.coinSymbol.toLowerCase() === coin.symbol.toLowerCase()
            ).coinImage,
            coinPrice: response.data.data.find(
              (item) =>
                item.coinSymbol.toLowerCase() === coin.symbol.toLowerCase()
            ).coinPrice,
          }));

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

      // cryptoWebSocket.onmessage = (event) => {
      //   const message = JSON.parse(event.data);
      //   if (message && message.d) {
      //     const updates = message.d;
      //     console.log(message.d);
      //     setPrices((prev) => ({ ...prev, [updates.id]: updates.p }));
      //     setChange24((prev) => ({ ...prev, [updates.id]: updates.p24h }));
      //     setChange1m((prev) => ({ ...prev, [updates.id]: updates.p30d }));
      //   } else {
      //     console.error("Unexpected message format:", message);
      //   }
      // };
      cryptoWebSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message && message.d) {
          const updates = message.d;
          console.log(message.d);

          // First update lastPrices with the current prices before updating prices
          setLastPrices((prevLastPrices) => ({
            ...prevLastPrices,
            [updates.id]: prevLastPrices[updates.id] || prices[updates.id], // this ensures to keep previous last price if exists, else use current price
          }));
          console.log(lastPrices);
          // Then update prices with new incoming data
          setPrices((prevPrices) => ({
            ...prevPrices,
            [updates.id]: updates.p,
          }));
          console.log(prices);
          setChange24((prev) => ({ ...prev, [updates.id]: updates.p24h }));
          setChange1m((prev) => ({ ...prev, [updates.id]: updates.p30d }));
        } else {
          console.error("Unexpected message format:", message);
        }
      };
    }

    return () => {
      if (cryptoWebSocket) {
        cryptoWebSocket.close();
      }
    };
  }, [watchlist]); // Only re-run this effect if watchlist changes, which should be infrequently

  // const getPriceChangeColor = (coinId) => {
  //   if (lastPrices[coinId] && prices[coinId]) {
  //     return prices[coinId] > lastPrices[coinId]
  //       ? "text-green-500"
  //       : "text-red-500";
  //   }
  //   return "";
  // };

  // useEffect(() => {
  //   // Update last prices when prices change
  //   for (const coinId in prices) {
  //     setLastPrices((prev) => ({ ...prev, [coinId]: prices[coinId] }));
  //   }
  // }, [prices]);

  // useEffect(() => {
  //   const newLastPrices = {};
  //   for (const coinId in prices) {
  //     newLastPrices[coinId] = lastPrices[coinId] || prices[coinId];
  //   }
  //   setLastPrices(newLastPrices);
  // }, [prices]);

  const getPriceChangeColor = (coinId) => {
    // Ensure both values are defined and then compare
    if (lastPrices[coinId] !== undefined && prices[coinId] !== undefined) {
      if (prices[coinId] > lastPrices[coinId]) {
        console.log("price increase");
        return "text-green-500";
      } else if (prices[coinId] < lastPrices[coinId]) {
        console.log("price decrease");
        return "text-red-500";
      }
    }
    console.log("price same");
    return "text-black"; // Default color if the price remains the same or insufficient data
  };

  return (
    <div className="container  p-6 max-w-sm">
      <h1 className="text-xl font-semibold text-white mb-4">Your WatchList</h1>
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm ">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left whitespace-nowrap">
              Live Price
            </th>
            <th className="py-3 px-6 text-left whitespace-nowrap">
              24h Change
            </th>
            <th className="py-3 px-6 text-left whitespace-nowrap">
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
                  className={`font-semibold ${getPriceChangeColor(coin.id)}`}
                >
                  $
                  {prices[coin.id]
                    ? prices[coin.id].toFixed(2)
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
