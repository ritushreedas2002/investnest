import React, { useState, useEffect } from "react";
import coin from "../../../top_300_coins_reduced.json";

const Modal = ({ isOpen, onClose, data, email }) => {
  const [prices, setPrices] = useState({});
  const wsUrl =
    "wss://push.coinmarketcap.com/ws?device=web&client_source=home_page";

  const symbolToIdMap = coin.reduce((map, coin) => {
    map[coin.symbol.toLowerCase()] = coin.id;
    return map;
  }, {});

  console.log(data);

  useEffect(() => {
    const ids = data?.map((coin) => symbolToIdMap[coin.coinSymbol.toLowerCase()])
      .filter((id) => id)
      .join(",");

    const cryptoWebSocket = new WebSocket(wsUrl);
    cryptoWebSocket.onopen = () => {
      console.log("WebSocket connection established.");
      const payload = {
        method: "RSUBSCRIPTION",
        params: ["main-site@crypto_price_5s@{}@normal", ids],
      };
      cryptoWebSocket.send(JSON.stringify(payload));
    };

    cryptoWebSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message && message.d) {
        const { id, p, p24h } = message.d;
        setPrices((prev) => ({
          ...prev,
          [id]: {
            previous: prev[id] ? prev[id].current : p,
            current: p,
          },
        }));
      }
    };

    return () => cryptoWebSocket.close();
  }, []);

  useEffect(() => {
    if (prices && data) {
      const totalProfitLoss = data?.reduce((acc, item) => {
        const coinId = symbolToIdMap[item.coinSymbol.toLowerCase()];
        const currentPrice = prices[coinId];
        if (currentPrice) {
          const profitLoss = (currentPrice - item.purchasePrice) * item.quantity;
          return acc + profitLoss;
        }
        return acc;
      }, 0);

      // Send the calculated total profit/loss to the backend
      
    }
  }, [prices, data, symbolToIdMap, email]);

  if (!isOpen) return null;
  console.log(data);

  const calculateProfitLoss = (quantity, purchasePrice, currentPrice) => {
    if (currentPrice) {
      const purchaseValue = quantity * purchasePrice;
      const currentValue = quantity * currentPrice;
      return currentValue - purchaseValue;
    }
    return 0;
  };

  const calculateProfitLossPercentage = (purchasePrice, currentPrice) => {
    if (currentPrice) {
      return ((currentPrice - purchasePrice) / purchasePrice) * 100;
    }
    return 0;
  };

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg  w-2/3 max-h-2/3">
        <button onClick={onClose} className="float-right font-bold text-black">
          X
        </button>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Purchased Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Profit/Loss
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Profit/Loss %
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                const coinId = symbolToIdMap[item.coinSymbol.toLowerCase()];
                const currentPrice = prices[coinId]?.current;
                console.log(currentPrice);
                const profitLoss = calculateProfitLoss(
                  item.quantity,
                  item.purchasePrice,
                  currentPrice
                );
                const profitLossPercentage = calculateProfitLossPercentage(
                  item.purchasePrice,
                  currentPrice
                );

                return (
                  <tr key={index} className="text-black">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {item.coinName}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {item.quantity}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {item.purchaseDate}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      ${item.purchasePrice.toFixed(2)}
                    </td>
                    <td
                      className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                        currentPrice > item.purchasePrice
                          ? "text-green-500"
                          : currentPrice < item.purchasePrice
                          ? "text-red-500"
                          : "text-black"
                      }`}
                    >
                      {currentPrice
                        ? `$${currentPrice.toFixed(2)}`
                        : `$${item.purchasePrice.toFixed(2)}`}
                    </td>
                    <td
                      className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                        profitLoss >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {currentPrice
                        ? `$${profitLoss.toFixed(2)}`
                        : "Loading..."}
                    </td>
                    <td
                      className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                        profitLossPercentage >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {currentPrice
                        ? `${profitLossPercentage.toFixed(2)}%`
                        : "Loading..."}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
