// import axios from "axios";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// const ShimmerRow = () => {
//   return (
//     <tr>
//       <td className="pl-6 px-2 py-3 border-b border-gray-800">
//         <div className="animate-pulse flex items-center space-x-4">
//           <div className="rounded-full bg-gray-700 h-10 w-10"></div>
//           <div className="flex-1 space-y-4 py-1">
//             <div className="h-6 bg-gray-700 rounded w-20"></div>
//           </div>
//         </div>
//       </td>
//       <td className="px-2 py-3 border-b border-gray-800">
//         <div className="h-6 bg-gray-700 rounded w-32 animate-pulse"></div>
//       </td>
//       <td className="px-2 py-3 border-b border-gray-800">
//         <div className="h-6 bg-gray-700 rounded w-32 animate-pulse"></div>
//       </td>
//     </tr>
//   );
// };

// const CryptoTable = () => {
//   const [coins, setCoins] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(
//         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
//       )
//       .then((response) => {
//         setCoins(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   }, []);

//   return (
//     <div className=" ">
//       <div className="bg-gray-800 sticky top-0 z-10 ">
//         <table className="min-w-full leading-normal ">
//           <thead>
//             <tr>
//               <th className="px-2 py-3 pl-10 pr-16 text-sm border-b-2 border-gray-800 text-left font-bold text-white uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-3  py-3 border-b-2 border-gray-800 text-left text-sm font-bold text-white uppercase tracking-wider">
//                 Price
//               </th>
//               <th className="px-2 pr-10 py-3 border-b-2 border-gray-800 text-right text-sm font-bold text-white uppercase tracking-wider">
//                 Market Cap
//               </th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <table className="min-w-full leading-normal">
//         <tbody>
//           {loading
//             ? Array.from({ length: 10 }).map((_, index) => (
//                 <ShimmerRow key={index} />
//               ))
//             : coins.map((coin) => (
//                 <tr key={coin.id}>
//                   <td className="pl-6 py-3 font-semibold border-b border-gray-800 text-sm">
//                     <div className="flex items-center">
//                       <img
//                         src={coin.image}
//                         alt={`${coin.name} logo`}
//                         className="mr-2 w-8 h-8 rounded-full shadow-sm"
//                       />
//                       <p className="text-white whitespace-nowrap">
//                         {coin.name}
//                       </p>
//                     </div>
//                   </td>
//                   <td className="pr-20 py-3 text-right font-semibold border-b border-gray-800 text-sm">
//                     $
//                     {parseFloat(coin.current_price).toLocaleString(undefined, {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })}
//                   </td>
//                   <td className="px-6 py-3 text-right font-semibold border-b border-gray-800 text-sm">
//                     ${coin.market_cap.toLocaleString()}
//                   </td>
//                   <td>
                    
//                   </td>
//                 </tr>
//               ))}
//         </tbody>
//       </table>
//     </div>
  
//   );
// };

// export default CryptoTable;


import { useEffect, useState } from "react";
import axios from "axios";
import data from "../../../top_300_coins_reduced.json";
import { getCachedData, setCachedData } from "@/utils/localStorageCache";

const ShimmerRow = () => {
    return (
      <tr>
        <td className="pl-6 px-2 py-3 border-b border-gray-800">
          <div className="animate-pulse flex items-center space-x-4">
            <div className="rounded-full bg-gray-700 h-10 w-10"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-6 bg-gray-700 rounded w-20"></div>
            </div>
          </div>
        </td>
        <td className="px-2 py-3 border-b border-gray-800">
          <div className="h-6 bg-gray-700 rounded w-32 animate-pulse"></div>
        </td>
        <td className="px-2 py-3 border-b border-gray-800">
          <div className="h-6 bg-gray-700 rounded w-32 animate-pulse"></div>
        </td>
      </tr>
    );
  };

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState({});
  const wsUrl = "wss://push.coinmarketcap.com/ws?device=web&client_source=home_page";

  const symbolToIdMap = data.reduce((map, coin) => {
    map[coin.symbol.toLowerCase()] = coin.id;
    return map;
  }, {});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const cacheKey = "cryptoData";
      const cachedData = getCachedData(cacheKey);
      
      if (cachedData) {
        setCoins(cachedData);
        setLoading(false);
        return;
      }
      
      try {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false",
          {
            headers: {
              "x-cg-demo-api-key": "CG-YkDCZeia3Rt81Xesk36q17Mq",
            },
          }
        );
        setCoins(data);
        setCachedData(cacheKey, data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (coins.length === 0) return;
    const ids = coins
      .map((coin) => symbolToIdMap[coin.symbol.toLowerCase()])
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
        const { id, p } = message.d;
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
  }, [coins]);
return (
  <div className=" ">
    <div className="bg-gray-800 sticky top-0 z-10 ">
      <table className="min-w-full leading-normal ">
        <thead>
          <tr>
            <th className="px-2 py-3 pl-10 pr-16 text-sm border-b-2 border-gray-800 text-left font-bold text-white uppercase tracking-wider">
              Name
            </th>
            <th className="px-3 py-3 border-b-2 border-gray-800 text-left text-sm font-bold text-white uppercase tracking-wider">
              Price
            </th>
            <th className="px-2 pr-10 py-3 border-b-2 border-gray-800 text-right text-sm font-bold text-white uppercase tracking-wider">
              Market Cap
            </th>
          </tr>
        </thead>
      </table>
    </div>

    <table className="min-w-full leading-normal">
      <tbody>
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ShimmerRow key={index} />
            ))
          : coins.map((coin) => {
              const id = symbolToIdMap[coin.symbol.toLowerCase()];
              const livePriceData = prices[id];
              const livePrice = livePriceData?.current;
              const previousPrice = livePriceData?.previous;

              const priceChangeClass =
                livePrice > previousPrice
                  ? "text-green-300"
                  : livePrice < previousPrice
                  ? "text-red-400"
                  : "text-gray-200"; // Default color if no change

              return (
                <tr key={coin.id}>
                  <td className="pl-6 py-3 font-semibold border-b border-gray-800 text-sm">
                    <div className="flex items-center">
                      <img
                        src={coin.image}
                        alt={`${coin.name} logo`}
                        className="mr-2 w-8 h-8 rounded-full shadow-sm"
                      />
                      <p className="text-white whitespace-nowrap">
                        {coin.name}
                      </p>
                    </div>
                  </td>
                  <td className={`pr-20 py-3 text-right font-semibold border-b border-gray-800 text-sm ${priceChangeClass}`}>
                    $
                    {livePrice !== undefined
                      ? livePrice.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : parseFloat(coin.current_price).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </td>
                  <td className="px-6 py-3 text-right font-semibold border-b border-gray-800 text-sm">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                </tr>
              );
            })}
      </tbody>
    </table>
  </div>
);
};

export default CryptoTable;

