import React, { useEffect, useState, useRef } from "react";
import {getCarousalData} from "@/hooks/getCarousalData";
import axios from "axios";

const Carousal = ({ currency = "inr" }) => {
  const [coins, setCoins] = useState([]);
  const carouselRef = useRef(null);
  const requestAnimationRef = useRef();

  // Fetch coins data from the API
  // useEffect(() => {
    // const fetchCoins = async () => {
      // const options = {
      //   method: "GET",
      //   url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
      //   headers: { "x-cg-demo-api-key": "CG-5VXoHhbKyGG1GHXDjQLDa13p" },
      // };
      // axios
      //   .request(options)
      //   .then(function (response) {
      //     setCoins([...response.data, ...response.data]);
      //     console.log(response.data);
      //   })
      //   .catch(function (error) {
      //     console.error(error);
      //   });
      // const response = await axios.get(
      //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      // );
      // setCoins([...response.data, ...response.data]); // Duplicate data for seamless looping
    // };
    

    // fetchCoins();
  // }, [currency]);

  useEffect(() => {
    const fetchData = async () => {
      const coinData = await getCarousalData(currency); // Pass currency to your fetching function if needed
      setCoins([...coinData, ...coinData]); // Duplicate data for seamless looping
    };

    fetchData();
    // const intervalId = setInterval(() => {
    //   fetchData();
    // }, 60000); // 60000 ms = 1 minute

    // Cleanup on component unmount
    // return () => clearInterval(/*intervalId*/);
  }, [currency]);

  // Smooth continuous scroll effect
  // useEffect(() => {
  //   const speed = 1; // Adjust speed as necessary
  //   const scroll = () => {
  //     if (carouselRef.current) {
  //       carouselRef.current.scrollLeft += speed;

  //       // Reset scroll position to start before it visibly reaches the end of duplicated content
  //       if (
  //         carouselRef.current.scrollLeft >=
  //         carouselRef.current.scrollWidth / 2
  //       ) {
  //         carouselRef.current.scrollLeft = 0;
  //       }
  //     }

  //     requestAnimationRef.current = requestAnimationFrame(scroll);
  //   };

  //   requestAnimationRef.current = requestAnimationFrame(scroll);

  //   return () => cancelAnimationFrame(requestAnimationRef.current);
  // }, []);
  useEffect(() => {
    const speed = 1; // Adjust speed as necessary
    let isHovering = false;
    let isDragging = false;
  
    const scroll = () => {
      if (carouselRef.current && !isHovering && !isDragging) {
        carouselRef.current.scrollLeft += speed;
  
        // Reset scroll position to start before it visibly reaches the end of duplicated content
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
  
      requestAnimationRef.current = requestAnimationFrame(scroll);
    };
  
    const onMouseEnter = () => {
      isHovering = true;
    };
  
    const onMouseLeave = () => {
      isHovering = false;
    };
  
    const onMouseDown = () => {
      isDragging = true;
    };
  
    const onMouseUpOutside = () => {
      isDragging = false;
    };
  
    if (carouselRef.current) {
      carouselRef.current.addEventListener('mouseenter', onMouseEnter);
      carouselRef.current.addEventListener('mouseleave', onMouseLeave);
      carouselRef.current.addEventListener('mousedown', onMouseDown);
  
      // Listen for mouseup on the document to catch when the user releases the mouse button
      // outside of the carousel after starting a drag
      document.addEventListener('mouseup', onMouseUpOutside);
    }
  
    requestAnimationRef.current = requestAnimationFrame(scroll);
  
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('mouseenter', onMouseEnter);
        carouselRef.current.removeEventListener('mouseleave', onMouseLeave);
        carouselRef.current.removeEventListener('mousedown', onMouseDown);
      }
      document.removeEventListener('mouseup', onMouseUpOutside);
      cancelAnimationFrame(requestAnimationRef.current);
    };
  }, []);
  

  return (
    <div className=" flex justify-center items-center">
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide no-scrollbar p-4 mt-48  scroll-smooth"
        style={{ scrollBehavior: "auto" }} // Disable smooth scroll CSS to avoid jittering on reset
      >
        {coins.map((coin, index) => (
          <div
            key={index} // Index used as key because of duplicated items
            className="min-w-max h-full  rounded-lg shadow-lg flex flex-col items-center justify-around p-4 backdrop-blur-lg bg-white/20 m-7"
          >
            <div className=" flex">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-16 h-16 rounded-full mr-3 shadow-sm"
              />
              <div>
                <div className="text-lg font-bold text-yellow-500">
                  {coin.symbol.toUpperCase()}
                </div>
                <div
                  className={`text-sm ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </div>
                <div className="text-sm text-slate-300">
                  {`₹${coin.current_price.toLocaleString()}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousal;
