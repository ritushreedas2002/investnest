"use client";
import React, { useState, useEffect } from "react";
import Modal from "../../app/crypto/Modal";

const VirtualPortfolio = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  // const sampleData = [
  //   { name: "Bitcoin", unit: "1 BTC", date: "2021-01-01", boughtPrice: 30000, currentPrice: 42000 },
  //   { name: "Ethereum", unit: "2 ETH", date: "2021-02-01", boughtPrice: 1500, currentPrice: 3200 },
  //   // Add more data as needed
  // ];
  useEffect(() => {
    fetchPortfolioData();
  }, []);
  const fetchPortfolioData = async () => {
    try {
      const response = await fetch(`/api/crypto?email=${email}`); // Assuming you have an API route to fetch portfolio data
      const data = await response.json();
      setPortfolioData(data);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-800 to-pink-600 rounded-lg px-6 py-6 shadow-lg w-80">
      <div className="flex justify-between items-center">
        <select className="bg-transparent text-white border-none outline-none cursor-pointer">
          <option>Wallet</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
      <div className="text-white mt-4">
        <p className="text-sm opacity-70">
          Since yesterday, your assets have grown by
        </p>
        <p className="text-2xl font-bold">$755.47</p>
      </div>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 py-2 px-4 bg-black bg-opacity-20 rounded-full text-white flex items-center justify-center"
      >
        Insights - Get details <span className="ml-2">➔</span>
      </button>
      {/* <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={portfolioData} /> */}
      {modalOpen && portfolioData && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={portfolioData}
        />
      )}
    </div>
  );
};

export default VirtualPortfolio;
