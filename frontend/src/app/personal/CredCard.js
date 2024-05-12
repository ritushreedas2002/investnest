"use client";
import React, { useState, useEffect } from "react";

const CredCard = () => {
  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;
  
  // State to hold the selected option
  const [selectedOption, setSelectedOption] = useState('Income');

  // Function to handle the change of the select option
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to determine what to display based on the selected option
  const displayContent = () => {
    switch (selectedOption) {
      case 'Income':
        return (
          <div>
            <p className="text-sm opacity-70 mb-1">Your income for this month(till date) is</p>
            <p className="text-2xl font-bold">$300.00</p>
          </div>
        );
      case 'Savings':
        return (
          <div>
            <p className="text-sm opacity-70">Since last month, your savings have grown by</p>
            <p className="text-2xl font-bold">$1,200.00</p>
          </div>
        );
      case 'Expense':
        return (
          <div>
            <p className="text-sm opacity-70">In the past week, your expenses amounted to</p>
            <p className="text-2xl font-bold">$500.00</p>
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
          <option value="Income">Income</option>
          <option value="Savings">Savings</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div className="text-white mt-4">
        {displayContent()}
      </div>
    </div>
  );
};

export default CredCard;
