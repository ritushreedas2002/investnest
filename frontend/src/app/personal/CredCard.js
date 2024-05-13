"use client";

import React, { useState, useEffect } from "react";

const CredCard = () => {
  const [transactionData, setTransactionData] = useState({
    totalIncome: "0.00",
    totalExpense: "0.00",
    totalSavings: "0.00"
  });
  const [selectedOption, setSelectedOption] = useState('Savings');
  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  // Fetch all transaction data once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/transaction/savings?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include other headers such as Authorization if needed
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTransactionData(data);
        } else {
          console.error('Failed to fetch data:', data.message);
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const displayContent = () => {
    switch (selectedOption) {
      case 'Income':
        return (
          <div>
            <p className="text-sm opacity-70 mb-1">Your income for this month (till date) is</p>
            <p className="text-2xl font-bold">${transactionData.totalIncome}</p>
          </div>
        );
      case 'Savings':
        return (
          <div>
            <p className="text-sm opacity-70">Since last month, your savings have grown by</p>
            <p className="text-2xl font-bold">${transactionData.totalSavings}</p>
          </div>
        );
      case 'Expense':
        return (
          <div>
            <p className="text-sm opacity-70">In the past week, your expenses amounted to</p>
            <p className="text-2xl font-bold">${transactionData.totalExpense}</p>
          </div>
        );
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-800 to-pink-600 rounded-lg px-6 py-6 h-48 shadow-lg w-80">
      <div className="flex justify-between items-center">
        <select
          className="bg-transparent text-white border-none outline-none cursor-pointer"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="Income" className="text-black">Income</option>
          <option value="Savings"  className="text-black">Savings</option>
          <option value="Expense"  className="text-black">Expense</option>
        </select>
      </div>
      <div className="text-white mt-4">
        {displayContent()}
      </div>
    </div>
  );
};

export default CredCard;

