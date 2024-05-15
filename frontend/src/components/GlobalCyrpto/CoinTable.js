import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "@/Context/Cyrpto"; // Ensure correct import path
import Link from "next/link";
import Chart from "@/components/GlobalCyrpto/Chart"; // Ensure correct import path
import ModalComponent from "@/components/GlobalCyrpto/CoinDetails/ModalComponent"
import { MdStarBorder, MdStar } from "react-icons/md";
import data from "../../../top_300_coins_reduced.json"
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const CoinTable = () => {
  const { cryptoData, currency, error } = useContext(CryptoContext);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [watchlist, setWatchlist] = useState([]);  // Tracks starred coins
  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;
  console.log(cryptoData);

  console.log(cryptoData)
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (email) {
        try {
          const response = await axios.get(`/api/crypto/watchlist?userId=${email}`);
          // Ensure that you're accessing the correct data property
          
          if (response.data && Array.isArray(response.data.data)) {
            const watchlistIds = response.data.data.map(item => item.coinId);
            setWatchlist(watchlistIds);
          } else {
            console.error('Watchlist data is missing or incorrect format from the response');
            setWatchlist([]);
          }
        } catch (error) {
          console.error('Failed to fetch watchlist:', error);
        }
      }
    };

    fetchWatchlist();
  }, [email]);

  const handleStarClick = async (coin) => {
    const isInWatchlist = watchlist.includes(coin.id);
    try {
      if (isInWatchlist) {
        await axios.delete(`/api/crypto/watchlist?userId=${email}&coinId=${coin.id}`);
      } else {
        await axios.post('/api/crypto/watchlist', {
          userId: email,
          coinId: coin.id,
          coinName: coin.name,
          coinSymbol: coin.symbol,
          coinImage:coin.image,
          coinPrice:coin.current_price,
          coinPrice24Change:coin.price_change_percentage_24h_in_currency
        });
      }
      // Refresh the watchlist
      const response = await axios.get(`/api/crypto/watchlist?userId=${email}`);
      
      const updatedWatchlist = response.data.data.map(item => item.coinId);
      
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error('Failed to update watchlist:', error);
    }
  };



  if (error && (error.data || error.coinData || error.search)) {
    const errorMessage = error.data || error.coinData || error.search;
    return <div>Error loading data: {errorMessage}</div>;
  }

  if (!cryptoData || cryptoData.length === 0) {
    return <div>No data available</div>;
  }

  

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };

  const handleCloseModal = () => {
    setSelectedCoin(null);
  };

  return (
    <div className="p-5 relative">
      
      <div className="overflow-x-auto">
        <div className="mx-[5%] overflow-y-auto">
          <table className="table-auto w-full backdrop-blur-md bg-white/20 text-white">
            <thead className="sticky top-0 z-0 border-b-2 text-black bg-yellow-100">
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
              {cryptoData.map((coin, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 w-12 text-center text-white cursor-pointer text-lg">
                  {watchlist.includes(coin.id) ?  
                      <MdStar onClick={() => handleStarClick(coin)} color="yellow" size="1.5em" /> :
                      <MdStarBorder onClick={() => handleStarClick(coin)} size="1.5em" />}
                  </td>
                  <td className="px-4 py-2 flex items-center cursor-pointer" onClick={() => handleCoinClick(coin.id)}>
                    <img
                      src={coin.image}
                      alt={`${coin.name} logo`}
                      className="mr-2 w-16 h-16 rounded-full shadow-sm"
                    />
                    {coin.name}
                  </td>
                  <td className="px-4 py-2 w-1/4 text-right">
                    {new Intl.NumberFormat("en-IN", {
                      style: 'currency',
                      currency: currency,
                    }).format(coin.market_cap)}
                  </td>
                  <td className="px-4 py-2 w-1/6 text-right">
                    {new Intl.NumberFormat("en-IN", {
                      style: 'currency',
                      currency: currency,
                    }).format(coin.current_price)}
                  </td>
                  <td className="px-4 py-2 w-1/6 text-center">
                    <span className={`${coin.price_change_percentage_1h_in_currency >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {coin.price_change_percentage_1h_in_currency >= 0 ? `▲ ${Math.abs(coin.price_change_percentage_1h_in_currency).toFixed(2)}%` : `▼ ${Math.abs(coin.price_change_percentage_1h_in_currency).toFixed(2)}%`}
                    </span>
                  </td>
                  <td className="px-4 py-2 w-1/6 text-center">
                    <span className={`${coin.price_change_percentage_24h_in_currency >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {coin.price_change_percentage_24h_in_currency >= 0 ? `▲ ${Math.abs(coin.price_change_percentage_24h_in_currency).toFixed(2)}%` : `▼ ${Math.abs(coin.price_change_percentage_24h_in_currency).toFixed(2)}%`}
                    </span>
                  </td>
                  <td className="px-9 py-2 w-1/5 text-center">
                    <div className="overflow-hidden">
                      <Chart sparkline={coin.sparkline_in_7d} priceChange={coin.price_change_percentage_7d_in_currency} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedCoin && <ModalComponent coin={selectedCoin} onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default CoinTable;
