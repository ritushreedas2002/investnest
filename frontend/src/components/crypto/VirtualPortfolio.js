"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const VirtualPortfolio = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);

  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  useEffect(() => {
    fetchPortfolioData();
    fetchTotalProfitLoss();
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

  const fetchTotalProfitLoss = async () => {
    try {
      const response = await fetch(`/api/profitnloss?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setTotalProfitLoss(data.totalProfit);
      } else {
        console.error("Error fetching total profit/loss:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching total profit/loss:", error);
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
          Since you bought your assets, your total profit/loss is
        </p>
        <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          ${totalProfitLoss.toFixed(2)}
        </p>
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
          email={email}
        />
      )}
    </div>
  );
};

export default VirtualPortfolio;
