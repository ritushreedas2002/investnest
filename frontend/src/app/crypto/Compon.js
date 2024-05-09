import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const ShimmerRow = () => {
  return (
    <tr>
      <td className="px-2 py-3 border-b border-gray-800">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-700 h-10 w-10"></div>  
          <div className="flex-1 space-y-4 py-1">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>  
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((response) => {
        setCoins(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        
      });
  }, []);

  return (
    <div className=" relative">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-2 py-3 border-b-2 border-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Name
            </th>
            <th className="px-2 py-3 border-b-2 border-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Price
            </th>
            <th className="px-2 py-3 border-b-2 border-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Market Cap
            </th>
          </tr>
        </thead>
        {/* <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td className="px-2 py-3 border-b border-gray-800 text-sm">
                <div className="flex items-center">
                  <div className=" flex items-center">
                    <img
                      src={coin.image}
                      alt={`${coin.name} logo`}
                      className="mr-2 w-8 h-8 rounded-full shadow-sm"
                    />
                    <p className="text-white whitespace-no-wrap">{coin.name}</p>
                  </div>
                </div>
              </td>
              <td className="px-2 py-3 border-b border-gray-800 text-sm">
                $
                {parseFloat(coin.current_price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-2 py-3 border-b border-gray-800 text-sm">
                ${coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody> */}
        <tbody>
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => <ShimmerRow key={index} />)
          ) : (
            coins.map((coin) => (
              <tr key={coin.id}>
                <td className="px-2 py-3 border-b border-gray-800 text-sm">
                  <div className="flex items-center">
                    <img src={coin.image} alt={`${coin.name} logo`} className="mr-2 w-8 h-8 rounded-full shadow-sm" />
                    <p className="text-white whitespace-no-wrap">{coin.name}</p>
                  </div>
                </td>
                <td className="px-2 py-3 border-b border-gray-800 text-sm">
                  ${parseFloat(coin.current_price).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-2 py-3 border-b border-gray-800 text-sm">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
