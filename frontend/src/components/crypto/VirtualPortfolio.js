"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import coin from "../../../top_300_coins_reduced.json";

const VirtualPortfolio = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const [prices, setPrices] = useState({});
  const [dailyprices, setDailyprices] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Total Profit/Loss");

  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  const wsUrl =
    "wss://push.coinmarketcap.com/ws?device=web&client_source=home_page";

  useEffect(() => {
    fetchPortfolioData();
    fetchDailyData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch(`/api/crypto?email=${email}`); // Assuming you have an API route to fetch portfolio data
      const data = await response.json();
      console.log(data);
      setPortfolioData(data.data);
      // console.log(portfolioData);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  const fetchDailyData = async () => {
    try {
      const response = await fetch(`/api/crypto/profitloss?email=${email}`); // Assuming you have an API route to fetch portfolio data
      const data = await response.json();
      console.log(data);
      setDailyprices(data.daily);
      // setPortfolioData(data.data);
      // console.log(portfolioData);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  const symbolToIdMap = coin.reduce((map, coin) => {
    map[coin.symbol.toLowerCase()] = coin.id;
    return map;
  }, {});

  console.log(symbolToIdMap);

  useEffect(() => {
    if (portfolioData?.length === 0) return;
    const ids = portfolioData
      ?.map((coin) => symbolToIdMap[coin.coinSymbol.toLowerCase()])
      .join(",");

    console.log(ids);

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
  }, [portfolioData]);

  const calculateTotalProfitLoss = () => {
    let totalInvestment = 0;
    let totalCurrentValue = 0;
    portfolioData?.forEach((item) => {
      const coinId = symbolToIdMap[item.coinSymbol.toLowerCase()];
      const currentPrice = prices[coinId]?.current || item.purchasePrice;
      const investment = item.purchasePrice * item.quantity;
      const currentValue = currentPrice * item.quantity;
      totalInvestment += investment;
      totalCurrentValue += currentValue;
    });
    const totalProfitLoss = totalCurrentValue - totalInvestment;
    const totalProfitLossPercentage = totalInvestment
      ? (totalProfitLoss / totalInvestment) * 100
      : 0;
    return { totalProfitLoss, totalProfitLossPercentage };
  };

  const { totalProfitLoss, totalProfitLossPercentage } =
    calculateTotalProfitLoss();

  const calculateOneDayProfitLoss = () => {
    let totalYesterdayValue = 0;
    let totalCurrentValue = 0;
    portfolioData?.forEach((item) => {
      const coinId = item.coinId.toLowerCase();
      const dailyPrice =
        dailyprices.find((price) => price.coinId === coinId)?.price ||
        item.purchasePrice;
      const currentPrice =
        prices[symbolToIdMap[item.coinSymbol.toLowerCase()]]?.current || item.purchasePrice;
      const yesterdayValue = dailyPrice * item.quantity;
      const currentValue = currentPrice * item.quantity;
      totalYesterdayValue += yesterdayValue;
      totalCurrentValue += currentValue;
    });

    const oneDayProfitLoss = totalCurrentValue - totalYesterdayValue;
    const oneDayProfitLossPercentage = totalYesterdayValue
      ? (oneDayProfitLoss / totalYesterdayValue) * 100
      : 0;

    return { oneDayProfitLoss, oneDayProfitLossPercentage };
  };

  const { oneDayProfitLoss, oneDayProfitLossPercentage } =
    calculateOneDayProfitLoss();

  return (
    <div className="bg-gradient-to-br from-purple-800 to-pink-600 rounded-lg px-6 py-6 shadow-lg w-80">
      <div className="flex justify-between items-center">
        <select
          className="bg-transparent  border-none outline-none cursor-pointer"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option>Total Profit/Loss</option>
          <option className=" text-black">Total Profit/Loss%</option>
          <option className=" text-black">Profit/Loss(1 day)</option>
        </select>
      </div>
      <div className="text-white mt-4">
        <p className="text-sm opacity-70">
          Since you bought your assets, your total profit/loss is
        </p>
        {selectedOption === "Total Profit/Loss" && (
          <p
            className={`text-2xl font-bold ${
              totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${totalProfitLoss.toFixed(2)}
          </p>
        )}
        {selectedOption === "Total Profit/Loss%" && (
          <p
            className={`text-2xl font-bold ${
              totalProfitLossPercentage >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {totalProfitLossPercentage.toFixed(2)}%
          </p>
        )}
        {selectedOption === "Profit/Loss(1 day)" && (
          <p
            className={`text-2xl font-bold ${
              oneDayProfitLoss >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${oneDayProfitLoss.toFixed(2)} (
            {oneDayProfitLossPercentage.toFixed(2)}%)
          </p>
        )}
      </div>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 py-2 px-4 bg-black bg-opacity-20 rounded-full text-white flex items-center justify-center"
      >
        Insights - Get details <span className="ml-2">➔</span>
      </button>
      {/* <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={portfolioData} /> */}
      {modalOpen && portfolioData && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={portfolioData}
          email={email}
        />
      )}
    </div>
  );
};

export default VirtualPortfolio;
