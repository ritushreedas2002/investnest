"use client"
import React from "react";
import TransactionCard from "./TransactionCard";
import CredCard from "./CredCard";
import BarGraphComponent from "@/components/PersonalDashboard/ChartDashboard";
import Planning from "./Planning";
import TransactionComponent from "@/components/PersonalDashboard/TransactionComponent";
import PieChart from "@/components/PersonalDashboard/WeeklySpendingPieChart";

const Dashboard = () => {
  return (
    <div className=" ml-20 p-5">
      <div className="h-14 ">dfg</div>
      <div className=" flex">
        <div>
          <div className="grid grid-cols-4 gap-4 mb-2">
            <CredCard />
          </div>
          <div className=" w-[99%] h-[400px]  p-4 mb-4  bg-gray-600 rounded-2xl">
            <div className="ml-2 text-xl font-bold text-white">My Finances</div>
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-1.5 py-1.5">
                <TransactionCard name="Total Income" amount="- $138.56" />
              </div>
              <div className="w-1/2 py-1.5">
                <TransactionCard name="Total Expense" amount="- $530.37" />
              </div>
            </div>
            <BarGraphComponent />
          </div>
        </div>
        <div className=" w-[44%] pr-2">
          <div className=" w-full mr-2 mb-2">
            <Planning />
          </div>
          <div className=" bg-gray-500 h-[405px]  rounded-xl"></div>
        </div>

        <div>
          <div className="">
            <div className=" shadow rounded-lg p-2 mb-2 bg-gray-700">
              <h4 className="text-lg font-semibold mb-2">Analytics</h4>
              <PieChart />
            </div>
          </div>
          <div className=" mb-2">
            <TransactionComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
