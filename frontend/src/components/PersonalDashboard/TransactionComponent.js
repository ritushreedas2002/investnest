
"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const TransactionComponent = () => {
  const [activeTab, setActiveTab] = useState("income"); // Set default active tab to 'income'
  const [transactions, setTransactions] = useState({
    income: [],
    expenses: [],
  });
  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  const fetchData = async (tab) => {
    const endpoint =
      tab === "expenses"
        ? "transaction/expense/oneweek"
        : "transaction/income/onemonth";
    const url = `/api/${endpoint}?email=${email}`;

    try {
      const response = await axios.get(url);
      setTransactions((prevTransactions) => ({
        ...prevTransactions,
        [tab]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
    const intervalId = setInterval(() => {
      fetchData(activeTab);
    }, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Fetch data on mount for the initial tab
  }, [activeTab]);

  const renderTransactions = (type) => {
    return transactions[type].map((transaction, index) => (
      <div
        key={index}
        className="flex justify-between items-center p-2 border-b"
      >
        <div className="flex items-center ml-3">
          <span className="p-1 rounded-full bg-gray-200 mr-6">
            {/* Icon placeholder */}
          </span>
          <div>
            <div className="font-bold">
              {type === "income" ? transaction.source : transaction.title}
            </div>
            <div className="text-sm text-gray-200">{transaction.category}</div>
          </div>
        </div>
        <div
          className={`font-bold  mr-7 ${
            type === "expenses" ? "text-red-500" : "text-[#57E8B6]"
          }`}
        >
          ₹{transaction.amount.toFixed(2)}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-w-[300px] mx-auto bg-[#2f2828]  rounded-lg shadow-md overflow-hidden text-white">
      <div className="py-2 px-4 flex justify-between items-center">
        <div className="text-lg font-semibold">Transactions</div>
        <div className="text-right text-sm text-blue-500 cursor-pointer">
          <Link href="/personaldashboard/transactions">View all</Link>
        </div>
      </div>
      <div className="flex justify-around font-semibold p-1 bg-gray-300/10 backdrop-filter backdrop-blur-lg">
        <span
          className={`cursor-pointer ${
            activeTab === "income" ? "text-green-300" : ""
          }`}
          onClick={() => setActiveTab("income")}
        >
          Income
        </span>
        <span
          className={`cursor-pointer ${
            activeTab === "expenses" ? "text-red-400" : ""
          }`}
          onClick={() => setActiveTab("expenses")}
        >
          Expenses
        </span>
      </div>
      <div className="h-[192px] overflow-y-auto no-scrollbar">
        {renderTransactions(activeTab)}
      </div>
    </div>
  );
};
export default TransactionComponent;
