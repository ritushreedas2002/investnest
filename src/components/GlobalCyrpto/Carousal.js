
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Carousal = ({ currency = 'inr' }) => {
  const [coins, setCoins] = useState([]);
  const carouselRef = useRef(null);
  const requestAnimationRef = useRef();

  // Fetch coins data from the API
  useEffect(() => {
    const fetchCoins = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
      setCoins([...response.data, ...response.data]); // Duplicate data for seamless looping
    };

    fetchCoins();
  }, [currency]);

  // Smooth continuous scroll effect
  useEffect(() => {
    const speed = 1; // Adjust speed as necessary
    const scroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += speed;

        // Reset scroll position to start before it visibly reaches the end of duplicated content
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }

      requestAnimationRef.current = requestAnimationFrame(scroll);
    };

    requestAnimationRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(requestAnimationRef.current);
  }, []);

  return (
    <div className="mt-32 flex justify-center items-center m-9">
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide p-4 scroll-smooth"
        style={{ scrollBehavior: 'auto' }} // Disable smooth scroll CSS to avoid jittering on reset
      >
        {coins.map((coin, index) => (
          <div
            key={index} // Index used as key because of duplicated items
            className="min-w-max h-full rounded-lg shadow-lg flex flex-col items-center justify-around p-4 backdrop-blur-lg m-7"
          >
            <img src={coin.image} alt={coin.name} className="w-20 h-20 rounded-full shadow-sm" />
            <div className="text-md font-bold text-yellow-500">
              {coin.symbol.toUpperCase()}
            </div>
            <div
              className={`text-lg ${
                coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
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

