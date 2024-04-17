// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import CoinChart from "@/app/coin/Coinchart";

// interface Params {
//   name: any;
// }
// const Coin = ({ params }: { params: Params }) => {
//   const name: any = params.name; // Assuming your page is [id].js under /pages/coins/
//   const [coinData, setCoinData]: [any, (coinData: any) => void] =
//     useState(null);
//   const [chartData, setChartData]: [any, (chartData: any) => void] =
//     useState(null);
//   const [currency, setCurrency]: [any, (currency: any) => void] =
//     useState("inr");
//   const [days, setDays]: [any, (days: any) => void] = useState("7");

//   useEffect(() => {
//     if (!name) return; // Check if id is available
//     // Fetch coin data
//     const fetchCoinData = async () => {
//       const response = await axios.get(
//         `https://api.coingecko.com/api/v3/coins/${name}`,
//         {
//           headers: {
//             "x-cg-demo-api-key": "CG-5VXoHhbKyGG1GHXDjQLDa13p",
//           },
//         }
//       );
//       setCoinData(response.data);
//     };

//     // Fetch chart data
//     const fetchChartData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=${currency}&days=${days}`,
//           {
//             params: { precision: '2' },
//             headers: {
//               "x-cg-demo-api-key": "CG-5VXoHhbKyGG1GHXDjQLDa13p",
//             },
//           }
//         );
//         setChartData(response.data);
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };

//     fetchCoinData();
//     fetchChartData();
//   }, [name, currency, days]);

//   // Handlers for changing the chart data based on selected time range
//   const handleDaysChange = (selectedDays: any) => {
//     setDays(selectedDays);
//   };

//   return (
//     <div className="p-4 min-h-screen bg-black">
//       <div className="flex flex-col md:flex-row">
//         <div className="md:w-1/4">
//           {coinData && (
//             <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg  text-white mt-16">
//               <div className="flex justify-between">
//                 <img
//                   src={coinData.image.large}
//                   alt={coinData.name}
//                   className="w-32 h-32 -ml-10"
//                 />
//                 <h1 className="mt-11 ml-10 text-4xl font-bold">
//                   {coinData.name}
//                 </h1>
//               </div>

//               <p className=" text-white mt-4">
//                 {coinData.description.en.split(". ")[0]}
//               </p>
//               <h1 className="font-semibold text-lg mt-6">Market Cap</h1>
//               <h1 className=" text-md ">{`₹${coinData.market_data.market_cap[
//                 currency
//               ].toLocaleString()}`}</h1>
//               <h1 className="font-semibold text-lg  mt-3">Price</h1>
//               <h1 className=" text-md">{`₹${coinData.market_data.current_price[
//                 currency
//               ].toLocaleString()}`}</h1>
//             </div>
//           )}
//         </div>
//         <div className="md:w-3/4 mt-11">
//           {/* Chart will be rendered here */}
//           {chartData && <CoinChart chartData={chartData} />}

//           {/* Buttons to select time range */}
//           <div className="flex justify-center gap-2 my-4 mt-5">
//             <button
//               onClick={() => handleDaysChange("7")}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//             >
//               7 Days
//             </button>
//             <button
//               onClick={() => handleDaysChange("30")}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//             >
//               30 Days
//             </button>
//             <button
//               onClick={() => handleDaysChange("365")}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//             >
//               365 Days
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Coin;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import CoinChart from "@/app/coin/Coinchart";

interface Params {
  name: any;
}

const Coin = ({ params }: { params: Params }) => {
  const name: any = params.name; // Assuming your page is [id].js under /pages/coins/
  const [coinData, setCoinData]: [any, (coinData: any) => void] =
    useState(null);
  const [chartData, setChartData]: [any, (chartData: any) => void] =
    useState(null);
  const [chartData7, setChartData7]: [any, (chartData: any) => void] =
    useState(null);
  const [chartData30, setChartData30]: [any, (chartData: any) => void] =
    useState(null);
  const [chartData365, setChartData365]: [any, (chartData: any) => void] =
    useState(null);
  const [currency, setCurrency]: [any, (currency: any) => void] =
    useState("inr");
  const [days, setDays]: [any, (days: any) => void] = useState("7");

  useEffect(() => {
    if (!name) return; // Check if id is available
    // Fetch coin data
    const fetchCoinData = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${name}`,
        {
          headers: {
            "x-cg-demo-api-key": "CG-YkDCZeia3Rt81Xesk36q17Mq",
          },
        }
      );
      setCoinData(response.data);
    };

    // Fetch chart data for all ranges
    const fetchAllChartData = async () => {
      try {
        const response7 = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=${currency}&days=7`,
          {
            params: { precision: '2' },
            headers: {
              "x-cg-demo-api-key": "CG-YkDCZeia3Rt81Xesk36q17Mq",
            },
          }
        );
        setChartData7(response7.data);
        setChartData(response7.data);
    
        // Delay the next API call by 1000 milliseconds (1 second)
        setTimeout(async () => {
          const response30 = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=${currency}&days=30`,
            {
              params: { precision: '2' },
              headers: {
                "x-cg-demo-api-key": "CG-YkDCZeia3Rt81Xesk36q17Mq",
              },
            }
          );
          setChartData30(response30.data);
    
          // Delay the next API call by another 1000 milliseconds
          setTimeout(async () => {
            const response365 = await axios.get(
              `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=${currency}&days=365`,
              {
                params: { precision: '2' },
                headers: {
                  "x-cg-demo-api-key": "CG-YkDCZeia3Rt81Xesk36q17Mq",
                },
              }
            );
            setChartData365(response365.data);
          }, 1000);
    
        }, 1000);
        
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchCoinData();
    fetchAllChartData();
  }, [name, currency]);

  // Handler for changing the chart data based on selected time range
  const handleDaysChange = (selectedDays: any) => {
    setDays(selectedDays);
    switch (selectedDays) {
      case '7':
        setChartData(chartData7);
        break;
      case '30':
        setChartData(chartData30);
        break;
      case '365':
        setChartData(chartData365);
        break;
      default:
        setChartData(chartData7);
        break;
    }
  };

  return (
    <div className="p-4 min-h-screen bg-black">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4">
          {coinData && (
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg  text-white mt-16">
              <div className="flex justify-between">
                <img
                  src={coinData.image.large}
                  alt={coinData.name}
                  className="w-32 h-32 -ml-10"
                />
                <h1 className="mt-11 ml-10 text-4xl font-bold">
                  {coinData.name}
                </h1>
              </div>

              <p className=" text-white mt-4">
                {coinData.description.en.split(". ")[0]}
              </p>
              <h1 className="font-semibold text-lg mt-6">Market Cap</h1>
              <h1 className=" text-md ">{`₹${coinData.market_data.market_cap[
                currency
              ].toLocaleString()}`}</h1>
              <h1 className="font-semibold text-lg  mt-3">Price</h1>
              <h1 className=" text-md">{`₹${coinData.market_data.current_price[
                currency
              ].toLocaleString()}`}</h1>
            </div>
          )}
        </div>
        <div className="md:w-3/4 mt-11">
          {/* Chart will be rendered here */}
          {chartData && <CoinChart chartData={chartData} />}

          {/* Buttons to select time range */}
          <div className="flex justify-center gap-2 my-4 mt-5">
            <button
              onClick={() => handleDaysChange("7")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              7 Days
            </button>
            <button
              onClick={() => handleDaysChange("30")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              30 Days
            </button>
            <button
              onClick={() => handleDaysChange("365")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              365 Days
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Coin;

