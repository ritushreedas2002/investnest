"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed or use fetch API
import TransactionCard from "./TransactionCard";
import CredCard from "./CredCard";
import BarGraphComponent from "@/components/PersonalDashboard/ChartDashboard";
import Planning from "./Planning";
import TransactionComponent from "@/components/PersonalDashboard/TransactionComponent";
import PieChart from "@/components/PersonalDashboard/WeeklySpendingPieChart";

const Dashboard = () => {
  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/analysis/yearly/total?email=${email}`
        );
        setFinancialData({
          totalIncome: response.data.totalIncome,
          totalExpense: response.data.totalExpense,
        });
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="ml-20 p-5">
      <div className="h-14 ">dfg</div>
      <div className="flex">
        <div className=" w-[75%] mr-2">
          <div className=" flex mb-4">
            <div className="grid grid-cols-3 gap-4 ">
              <CredCard />
            </div> 
            <div className="w-full mr-2 ">
              <Planning />
            </div>
          </div>
          <div className="w-[99%] h-[400px] p-4 mb-4 bg-gray-600 rounded-2xl">
            <div className="ml-2 text-xl font-bold text-white">My Finances</div>
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-1.5 py-1.5">
                <TransactionCard
                  name="Total Income"
                  amount={`$${financialData.totalIncome.toFixed(2)}`}
                />
              </div>
              <div className="w-1/2 py-1.5">
                <TransactionCard
                  name="Total Expense"
                  amount={`$${financialData.totalExpense.toFixed(2)}`}
                />
              </div>
            </div>
            <BarGraphComponent />
          </div>
        </div>

        <div className=" mr-2">
          <div className="">
            <div className="shadow rounded-lg p-2 mb-2 bg-gray-700">
              <h4 className="text-lg font-semibold mb-2">Analytics</h4>
              <PieChart />
            </div>
          </div>
          <div className="mb-2">
            <TransactionComponent />
          </div>
        </div>

        <div className="w-[40%] ml-2 -mr-3">
          <div className="bg-gray-500 h-[97%] rounded-xl"></div>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
