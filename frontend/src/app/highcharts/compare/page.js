"use client";


import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CryptoCompareChart = () => {
  const [coins, setCoins] = useState({ coin1: "bitcoin", coin2: null });
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  // List of available coins for selection
  const availableCoins = ["bitcoin", "ethereum", "ripple", "litecoin"];

  useEffect(() => {
    if (coins.coin2 && !cooldown) {
      setLoading(true);
      const fetchCryptoData = async () => {
        try {
          const headers = {
            "x-cg-demo-api-key": "CG-YkDCZeia3Rt81Xesk36q17Mq", // Substitute with your actual API key
          };
          const responses = await Promise.all([
            fetch(
              `https://api.coingecko.com/api/v3/coins/${coins.coin1}/market_chart?vs_currency=usd&days=365&interval=daily`,
              { headers }
            ),
            fetch(
              `https://api.coingecko.com/api/v3/coins/${coins.coin2}/market_chart?vs_currency=usd&days=365&interval=daily`,
              { headers }
            ),
          ]);
          const data = await Promise.all(responses.map((res) => res.json()));

          const newSeriesData = data.map((d, index) => {
            const initialPrice = d.prices[0][1]; // The first price in the dataset
            return {
              name: index === 0 ? coins.coin1 : coins.coin2,
              data: d.prices.map((price) => [
                price[0],
                ((price[1] - initialPrice) / initialPrice) * 100,
              ]),
            };
          });

          setSeriesData(newSeriesData);
          setLoading(false);
          setCooldown(true);
          setTimeout(() => setCooldown(false), 30000); // Cooldown for 60 seconds
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        }
      };

      fetchCryptoData();
    }
  }, [coins]);

  const handleChange = (coinKey, value) => {
    setCoins((prevCoins) => ({
      ...prevCoins,
      [coinKey]: value,
    }));
  };

  const options = {
    chart: {
      type: "line",
      backgroundColor: "#1E2634",
    },
    title: {
      text: "Cryptocurrency Growth Percentage Comparison",
      style: {
        color: "#ffffff",
      },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        
        month: "%b '%y",          // e.g., Jul '20
        
      },
      title: {
        text: "Time",
        style: {
          color: "#ffffff",
        },
      },
      labels: {
        style: {
          color: "#ffffff", // Set the x-axis labels to white
        },
      },
    },
    yAxis: {
      title: {
        text: "Growth Percentage (%)",
        style: {
          color: "#ffffff",
        },
      },
      labels: {
        format: "{value} %",
        style: {
          color: "#ffffff",
        },
      },
    },
    tooltip: {
      headerFormat: "<b>{series.name}</b><br>",
      pointFormat: "{point.x:%e. %b}: {point.y:.2f}%",
    },
    legend: {
      itemStyle: {
        color: "#ffffff", // Set the legend text color to white
      },
    },
    credits: {
      enabled: false,
    },
    series: seriesData,
  };

  return (
    <div className="flex flex-col h-full bg-[#1E2634] text-white">
      <div className=" flex items-center ml-4">
        <div className=" mr-4">
          <label>Select Coin 1: </label>
          <select
            disabled={cooldown}
            onChange={(e) => handleChange("coin1", e.target.value)}
            value={coins.coin1}
            className=" text-black rounded-xl"
          >
            {availableCoins.map((coin) => (
              <option key={coin} value={coin}>
                {coin.charAt(0).toUpperCase() + coin.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mr-4">
          <label>Select Coin 2: </label>
          <select
            disabled={cooldown}
            onChange={(e) => handleChange("coin2", e.target.value)}
            value={coins.coin2 || ""}
            className="text-black rounded-xl"
          >
            {/* Show "Select a coin..." only if coin2 has not been selected yet */}
            {!coins.coin2 && (
              <option value="" disabled>
                Select a coin...
              </option>
            )}

            {/* List of available coins, excluding coin1 */}
            {availableCoins
              .filter((coin) => coin !== coins.coin1)
              .map((coin) => (
                <option key={coin} value={coin}>
                  {coin.charAt(0).toUpperCase() + coin.slice(1)}
                </option>
              ))}
          </select>
        </div>
        {cooldown && (
          <p>Please wait for 30 seconds to make another comparison.</p>
        )}
      </div>

      <div className="mt-3 flex-grow flex items-center justify-center w-full -mb-3">
        {!coins.coin2 ? (
          <p>
            Please select coin 2 to start viewing comparisons, coin 1 is
            selected as Bitcoin by default.
          </p>
        ) : loading ? (
          <div
            className="w-full min-h-[60vh] h-full flex justify-center items-center
             "
          >
            <div
              className="w-8 h-8 border-4 border-cyan-700 rounded-full
             border-b-gray-200 animate-spin 
             "
              role="status"
            />
            <span className="ml-2">please wait...</span>
          </div>
        ) : (
          <div className="w-full">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoCompareChart;

