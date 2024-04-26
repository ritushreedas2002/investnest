"use client";
import React from "react";
import StatisticsChart from "@/components/PersonalDashboard/ChartDashboard";
import PieChart from "@/components/PersonalDashboard/WeeklySpendingPieChart";
import DashboardBox from "@/components/PersonalDashboard/DashboardBox";
import Sidebar from "@/components/PersonalDashboard/Sidebar";

const PerformanceCard = () => {
  return (
    <div className="bg-yellow-300 p-4 rounded-lg shadow-lg w-64 h-44">
      <h2 className="text-xl font-semibold mb-4 text-center">Performance</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="text-left border-r-2 p-5 border-black">
          <p className="text-3xl font-bold text-green-600">82%</p>
          <p className="text-sm text-gray-700">income</p>
        </div>
        <div className="text-right p-5">
          <p className="text-3xl font-bold text-red-600">46%</p>
          <p className="text-sm text-gray-700">spendings</p>
        </div>
      </div>
      {/* <ul className="list-disc pl-5 space-y-2">
        <li>Deposit programs was setup</li>
        
      </ul> */}
    </div>
  );
};

const IncomeGoalTracker = () => {
  const goalAmount = 26344; // Total goal amount
  const currentAmount = 18850; // Current progress amount
  const progressPercentage = Math.round((currentAmount / goalAmount) * 100);

  return (
    <div className="bg-indigo-900 text-white p-4 rounded-lg shadow-lg max-w-xs mx-auto">
      <div className="flex justify-between mb-2">
        <span className="text-lg font-bold">{progressPercentage}%</span>
        <span>Income Goal</span>
      </div>
      <div className="text-xs">Progress to month</div>
      <div className="w-full bg-indigo-800 rounded-full h-2.5 dark:bg-gray-700 mt-2">
        <div
          className="bg-purple-600 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="mt-2 text-sm">
        <span>${currentAmount.toLocaleString()}</span> / $
        {goalAmount.toLocaleString()}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="bg-black w-full min-h-screen">
      
      <div className="flex bg-black">
      <Sidebar />
        <div className="flex-col w-5/6 ml-40 mt-10">
          <div className="w-96 h-96 bg-yellow-700">
            <DashboardBox />
          </div>
          <div className="">
            <StatisticsChart />
          </div>
        </div>
        <div className="flex-col w-1/4 mr-20 mt-10 ml-20">
          <div className="w-[400px] h-[300px] rounded-lg bg-orange-800 mb-7">
            <p className="text-white p-4 text-center">Weekly Basis Analysis </p>
            <PieChart />
          </div>
          <div className="mb-7">
            <IncomeGoalTracker />
          </div>
          <div>
            <PerformanceCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
