import { useEffect, useState } from "react";
import axios from "axios";
import { CiStar } from "react-icons/ci";
import Chart from "@/components/GlobalCyrpto/Chart";
import Link from "next/link"
import {getCoinTableData} from "@/hooks/getCoinTableData"
const CoinTable = ({ currency = "inr" }) => {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //   const fetchCoins = async () => {
  //     const currency = "inr"; // You can make this dynamic as needed
      // try {
      // const options = {
      //   method: "GET",
      //   url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
      //   headers: { "x-cg-demo-api-key": "CG-5VXoHhbKyGG1GHXDjQLDa13p" },
      // };
      // axios
      //   .request(options)
      //   .then(function (response) {
  //         setCoins(
  //           response.data.map((coin, index) => ({
  //             id: coin.id,
  //             rank: index + 1 + 100 * (currentPage - 1),
  //             name: coin.name,
  //             logo: coin.image,
  //             marketCap: `₹${coin.market_cap.toLocaleString()}`,
  //             price: `₹${coin.current_price.toLocaleString()}`,
  //             // todayChange: `${
  //             //   coin.price_change_percentage_24h >= 0 ? "▲" : "▼"
  //             // } ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%`,
  //             sparkline_in_7d: coin.sparkline_in_7d,
  //             price_change_percentage_1h_in_currency: `${
  //               coin.price_change_percentage_1h_in_currency >= 0 ? "▲" : "▼"
  //             } ${Math.abs(coin.price_change_percentage_1h_in_currency).toFixed(
  //               2
  //             )}%`,
  //             price_change_percentage_24h_in_currency: `${
  //               coin.price_change_percentage_24h_in_currency >= 0 ? "▲" : "▼"
  //             } ${Math.abs(
  //               coin.price_change_percentage_24h_in_currency
  //             ).toFixed(2)}%`,
  //             price_change_percentage_7d_in_currency:
  //               coin.price_change_percentage_7d_in_currency,
  //           }))
  //         );
  //         setTotalPages(2);
  //         // console.log(response.data);
  //       })
  //       .catch(function (error) {
  //         console.error(error);
  //       });
    
  //   };

  //   fetchCoins();
  // }, [currency, currentPage]);


  useEffect(() => {
    const fetchCoins = async () => {
      try {
        // Assuming getCoinTableData expects currency and page number as arguments
        const data = await getCoinTableData(currency, currentPage);
        
        const updatedCoins = data.map((coin, index) => ({
          // Map your data as needed; this structure depends on your actual data shape
          id: coin.id,
               rank: index + 1 + 100 * (currentPage - 1),
               name: coin.name,
               logo: coin.image,
               marketCap: `₹${coin.market_cap.toLocaleString()}`,
               price: `₹${coin.current_price.toLocaleString()}`,
  //             // todayChange: `${
  //             //   coin.price_change_percentage_24h >= 0 ? "▲" : "▼"
  //             // } ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%`,
               sparkline_in_7d: coin.sparkline_in_7d,
              price_change_percentage_1h_in_currency: `${
                 coin.price_change_percentage_1h_in_currency >= 0 ? "▲" : "▼"
               } ${Math.abs(coin.price_change_percentage_1h_in_currency).toFixed(2)}%`,
               price_change_percentage_24h_in_currency: `${
                 coin.price_change_percentage_24h_in_currency >= 0 ? "▲" : "▼"
             } ${Math.abs(coin.price_change_percentage_24h_in_currency).toFixed(2)}%`,
              // price_change_percentage_7d_in_currency:coin.price_change_percentage_7d_in_currency,ixed(2)}%`,
          price_change_percentage_7d_in_currency: coin.price_change_percentage_7d_in_currency,
        }));

        setCoins(updatedCoins);
        setTotalPages(2);
        // setTotalPages based on response if applicable
        // For demonstration, assuming totalPages can be derived from response
        // setTotalPages(data.totalPages); // Adjust according to actual response structure
      } catch (error) {
        console.error("Failed to fetch coins data:", error);
        // Handle error, maybe set state to show an error message
      }
    };

    fetchCoins();
    const intervalId = setInterval(() => {
      fetchCoins();
    }, 60000); // 60000 ms = 1 minute

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
}, [currency, currentPage]); // Dependency array includes currency and currentPage to refetch when they change


  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-2 py-1 m-1 ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  return (
   

    <div className="p-5 relative">
      <div className="overflow-x-auto">
        <div className="mx-[5%] overflow-y-auto">
          <table className="table-auto w-full backdrop-blur-md bg-white/20 text-white">
            <thead className="sticky top-0 z-10 border-b-2 text-black bg-yellow-100">
              <tr>
                <th className="px-4 py-2 w-12 text-center">Rank</th>
                <th className="px-4 py-2 w-1/8 text-center">Name</th>
                <th className="px-4 py-2 w-1/8 text-right">Market Cap</th>
                <th className="px-4 py-2 w-1/7 text-right">Price</th>
                <th className="px-4 py-2 w-1/8 text-center">1h</th>
                <th className="px-4 py-2 w-1/8 text-center">24h</th>
                <th className="px-4 py-2 w-1/5 text-center">Price (7 days)</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 w-12 text-center">
                    {/* Left align and fixed width */}
                    {/* <span><CiStar /></span> */}
                    {coin.rank}
                  </td>
                  <Link href={`/coin/${coin.id}`} passHref>
                    <td className="px-4 py-2 flex items-center">
                      <img
                        src={coin.logo}
                        alt={`${coin.name} logo`}
                        className="mr-2 w-16 h-16 rounded-full shadow-sm"
                      />
                      {coin.name}
                    </td>
                  </Link>
                  <td className="px-4 py-2 w-1/4 text-right">
                    {/* Right align and fixed width */}
                    {coin.marketCap}
                  </td>
                  <td className="px-4 py-2 w-1/6 text-right">
                    {/* Right align and fixed width */}
                    {coin.price}
                  </td>
                  <td className="px-4 py-2 w-1/6 text-center">
                    {/* Right align and conditional color */}
                    <span
                      className={`${
                        coin.price_change_percentage_1h_in_currency.startsWith(
                          "▼"
                        )
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {coin.price_change_percentage_1h_in_currency}
                    </span>
                  </td>
                  <td className="px-4 py-2 w-1/6 text-center">
                    {/* Right align and conditional color */}
                    <span
                      className={`${
                        coin.price_change_percentage_24h_in_currency.startsWith(
                          "▼"
                        )
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h_in_currency}
                    </span>
                  </td>
                  <td className="px-9 py-2 w-1/5 text-center">
                    {/* Right align and fixed width for chart */}
                    <div className="overflow-hidden">
                      {" "}
                      {/* Ensure the chart doesn't overflow */}
                      <Chart
                        sparkline={coin.sparkline_in_7d}
                        priceChange={
                          coin.price_change_percentage_7d_in_currency
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sticky bottom-0 bg-yellow-100 py-3 text-center">
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinTable;
