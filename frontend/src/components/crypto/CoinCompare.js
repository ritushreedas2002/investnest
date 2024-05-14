import React, { useState } from "react";
import CryptoCompareChart from "@/app/highcharts/compare/page";

const CoinCompare = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-[#4B5563] w-full h-[360px] mt-4 rounded-xl">
      <div className=" w-80 p-2 ">
        <video
          src={require("../../../public/spinningBTC.mp4")}
          autoPlay
          loop
          muted
          className="  rounded-xl"
        />
      </div>
      <div className=" -mt-2 ">
        <h1 className="text-2xl underline font-semibold text-center underline-offset-4">
          Trend Check
        </h1>
      </div>
      <div className=" text-wrap w-[305px] text-center text-sm  font-medium  bg-[#1F2937] p-1 m-2 rounded-xl">
        Compare the price trends of two cryptocurrencies over time. Analyze
        their performance to make informed investment decisions.
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-3 py-1.5 rounded font-semibold"
        >
          Compare Coins
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 z-40 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1E2634] text-black h-[76%] p-4 w-[80%] rounded-xl flex flex-col justify-between">
            <CryptoCompareChart />
            <div></div> {/* this is to permanently put the close button at the bottom */}
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 self-end"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinCompare;
