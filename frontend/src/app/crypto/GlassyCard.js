"use client";
import React from "react";
// components/GlassyCard.js
/*bg-gradient-radial from-transparent to-green-400 h-16 w-16 transform rotate-45 translate-x-6 -translate-y-6 */
const GlassyCard = ({ icon, title, amount }) => {
  return (
    <div className="bg-black bg-opacity-20 rounded-xl p-4 w-64 backdrop-filter backdrop-blur-lg border border-gray-700 relative overflow-hidden  " style={{ backgroundColor: '#000000', backgroundImage: 'linear-gradient(43deg, #000000 0%, rgba(33, 33, 33, 0.5) 72%, #FFCC70 100%)' }}>
      <div className="absolute top-0 right-0 "></div>
      <div className="flex items-center space-x-3 ">
        <span className="text-lg">{icon}</span> {/* Placeholder for icons */}
        <h3 className="text-white text-lg">{title}</h3>
      </div>
      <p className="text-white text-2xl mt-2">{amount}</p>
      <div className="text-white opacity-50 text-xs mt-2">➚</div> {/* Placeholder for arrow icon */}
    </div>
  );
};

export default GlassyCard;
