// "use client"
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { CryptoContext } from "@/Context/Cyrpto"; // Correct path as needed
// import Link from "next/link";
// import data from "../../../top_300_coins_reduced.json";

// const Carousal = () => {
//   const { carouselData ,currency} = useContext(CryptoContext);
//   const carouselRef = useRef(null);
//   const requestAnimationRef = useRef();
//   const [prices, setPrices] = useState({});
//   const [change24, setChange24] = useState({});

//   const doubledCarouselData = [...carouselData, ...carouselData];
//   const wsUrl = "wss://push.coinmarketcap.com/ws?device=web&client_source=home_page";
//   console.log(doubledCarouselData);
//   // Smooth continuous scroll effect
//   //Map symbols from carouselData to IDs in staticData
//   const symbolToIdMap = data.reduce((acc, item) => {
//     acc[item.symbol.toLowerCase()] = item.id;
//     return acc;
//   }, {});
//   console.log(symbolToIdMap);

//   useEffect(() => {
//         const ids = carouselData.map(coin => symbolToIdMap[coin.symbol.toLowerCase()]).filter(id => id).join(",");
//         console.log(ids);

//         if (ids) {
//           const payload = {
//             method: "RSUBSCRIPTION",
//             params: ["main-site@crypto_price_5s@{}@normal", ids],
//           };

//           const cryptoWebSocket = new WebSocket(wsUrl);
//           cryptoWebSocket.onopen = () => {
//             console.log("WebSocket connection established.");
//             cryptoWebSocket.send(JSON.stringify(payload));
//           };

//           cryptoWebSocket.onmessage = event => {
//             const message = JSON.parse(event.data);
//             if (message && message.d) {
//               const { id, p, p24h } = message.d;
//               setPrices(prevPrices => ({
//                 ...prevPrices,
//                 [id]: {
//                   previous: prevPrices[id] ? prevPrices[id].current : p,
//                   current: p,
//                 }
//               }));
//               setChange24(prev => ({ ...prev, [id]: p24h }));
//             }
//           };

//           return () => cryptoWebSocket.close();
//         }
//       }, []);

//     console.log(prices);
//   useEffect(() => {
//     const speed = 1; // Adjust speed as necessary
//     let isHovering = false;
//     let isDragging = false;

//     const scroll = () => {
//       if (carouselRef.current && !isHovering && !isDragging) {
//         carouselRef.current.scrollLeft += speed;

//         // Reset scroll position to start before it visibly reaches the end of duplicated content
//         if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
//           carouselRef.current.scrollLeft = 0;
//         }
//       }

//       requestAnimationRef.current = requestAnimationFrame(scroll);
//     };

//     const onMouseEnter = () => { isHovering = true; };
//     const onMouseLeave = () => { isHovering = false; };
//     const onMouseDown = () => { isDragging = true; };
//     const onMouseUpOutside = () => { isDragging = false; };

//     if (carouselRef.current) {
//       carouselRef.current.addEventListener('mouseenter', onMouseEnter);
//       carouselRef.current.addEventListener('mouseleave', onMouseLeave);
//       carouselRef.current.addEventListener('mousedown', onMouseDown);
//       document.addEventListener('mouseup', onMouseUpOutside);
//     }

//     requestAnimationRef.current = requestAnimationFrame(scroll);

//     return () => {
//       if (carouselRef.current) {
//         carouselRef.current.removeEventListener('mouseenter', onMouseEnter);
//         carouselRef.current.removeEventListener('mouseleave', onMouseLeave);
//         carouselRef.current.removeEventListener('mousedown', onMouseDown);
//       }
//       document.removeEventListener('mouseup', onMouseUpOutside);
//       cancelAnimationFrame(requestAnimationRef.current);
//     };
//   }, []);

//   return (
//     <div className="flex justify-center items-center">
//       <div
//         ref={carouselRef}
//         className="flex gap-4 overflow-x-auto scrollbar-hide no-scrollbar p-4 mt-48 scroll-smooth"
//         style={{ scrollBehavior: "auto" }} // Disable smooth scroll CSS to avoid jittering on reset
//       >
//         {doubledCarouselData.map((coin, index) => (

//           <div
//             key={index} // Index as key due to duplicated items; ensure uniqueness if possible
//             className="min-w-max h-full rounded-lg shadow-lg flex flex-col items-center justify-around p-4 backdrop-blur-lg bg-white/20 m-7"
//           >
//             <div className="flex">
//               <img
//                 src={coin.image}
//                 alt={coin.name}
//                 className="w-16 h-16 rounded-full mr-3 shadow-sm"
//               />
//               <div>
//                 <div className="text-lg font-bold text-yellow-500">
//                   {coin.symbol.toUpperCase()}
//                 </div>
//                 <div
//                   className={`text-sm ${
//                     coin.price_change_percentage_24h >= 0
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {coin.price_change_percentage_24h?.toFixed(2)}%
//                 </div>
//                 <div className="text-sm text-slate-300">
//                 {new Intl.NumberFormat("en-IN", {
//                       style: 'currency',
//                       currency: currency,
//                     }).format(coin.current_price)}
//                 </div>
//               </div>
//             </div>
//           </div>

//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousal;

"use client"
import React, { useContext, useEffect, useRef, useState } from "react";
import { CryptoContext } from "@/Context/Cyrpto"; // Ensure the path is correct
import data from "../../../top_300_coins_reduced.json";

const Carousal = () => {
  const { carouselData, currency } = useContext(CryptoContext);
  const carouselRef = useRef(null);
  const requestAnimationRef = useRef();
  const [prices, setPrices] = useState({});
  const [change24, setChange24] = useState({});

  const wsUrl = "wss://push.coinmarketcap.com/ws?device=web&client_source=home_page";
  const doubledCarouselData = [...carouselData, ...carouselData];

  const symbolToIdMap = data.reduce((map, coin) => {
    map[coin.symbol.toLowerCase()] = coin.id;
    return map;
  }, {});

  useEffect(() => {
    const ids = carouselData
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
        const { id, p, p24h } = message.d;
        setPrices((prev) => ({
          ...prev,
          [id]: {
            previous: prev[id] ? prev[id].current : p,
            current: p,
          },
        }));
        setChange24((prev) => ({
          ...prev,
          [id]: p24h,
        }));
      }
    };

    return () => cryptoWebSocket.close();
  }, [carouselData]);

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
    
        const onMouseEnter = () => { isHovering = true; };
        const onMouseLeave = () => { isHovering = false; };
        const onMouseDown = () => { isDragging = true; };
        const onMouseUpOutside = () => { isDragging = false; };
    
        if (carouselRef.current) {
          carouselRef.current.addEventListener('mouseenter', onMouseEnter);
          carouselRef.current.addEventListener('mouseleave', onMouseLeave);
          carouselRef.current.addEventListener('mousedown', onMouseDown);
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
    <div className="flex justify-center items-center">
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide no-scrollbar p-4 mt-20 scroll-smooth ml-10"
        style={{ scrollBehavior: "auto" }}
      >
        {doubledCarouselData.map((coin, index) => {
          const id = symbolToIdMap[coin.symbol.toLowerCase()];
          const livePriceData = prices[id];
          const livePrice = livePriceData?.current;
          const previousPrice = livePriceData?.previous;
          const liveChange24 = change24[id];

          const priceChangeClass =
            livePrice > previousPrice
              ? "text-green-300"
              : livePrice < previousPrice
              ? "text-red-400"
              : "text-gray-200"; // Default color if no change

          return (
            <div
              key={index}
              className="min-w-max h-full rounded-lg shadow-lg flex flex-col items-center justify-around p-4 backdrop-blur-lg bg-white/20 m-7"
            >
              <div className="flex">
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
                    className={`text-sm ${liveChange24 >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {liveChange24 !== undefined ? `${liveChange24.toFixed(2)}%` : `${coin.price_change_percentage_24h.toFixed(2)}%`}
                  </div>
                  <div className={`text-sm ${priceChangeClass}`}>
                    {livePrice !== undefined ? new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                    }).format(livePrice) : new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                    }).format(coin.current_price)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousal;


