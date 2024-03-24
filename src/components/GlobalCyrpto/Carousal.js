
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";


const Carousal = ({ currency = "inr" }) => {
  const [coins, setCoins] = useState([]);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      setCoins(response.data);
    };

    fetchCoins();
  }, [currency]);
  
    useEffect(() => {
        // Function to handle auto-scroll
        const autoScroll = () => {
            if (carouselRef.current) {
                const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
                if (carouselRef.current.scrollLeft < maxScrollLeft - 100) { // Check if near the end
                    scrollRight();
                } else {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' }); // Reset to start
                }
            }
        };

        intervalRef.current = setInterval(autoScroll, 2000); // Change auto-scroll interval as needed

        return () => clearInterval(intervalRef.current); // Clear interval on component unmount
    }, [coins]); // Dependency on coins ensures interval resets when coins data updates

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    


  return (
    <div className="mt-32 flex justify-center items-center m-9">
      <div
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide p-4"
        
        ref={carouselRef}
      >
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="min-w-max h-full rounded-lg shadow-lg flex flex-col items-center justify-around p-4 backdrop-blur-lg m-7"
           
          >
            <img
              src={coin.image}
              alt={coin.name}
              className="w-20 h-20 rounded-full shadow-sm"
            />
            <div className="text-md font-bold text-yellow-500">{coin.symbol.toUpperCase()}</div>
            <div
              className={`text-lg ${
                coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </div>
            <div className="text-md text-slate-400">
              {`₹${coin.current_price.toLocaleString()}`}
            </div>
          </div>
        ))}
      </div>
    </div>
    

  );
};

export default Carousal;



