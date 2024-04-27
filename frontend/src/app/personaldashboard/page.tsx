"use client";
import React from "react";
import BarGraphComponent from "@/components/PersonalDashboard/ChartDashboard";
import PieChart from "@/components/PersonalDashboard/WeeklySpendingPieChart";
import DashboardBox from "@/components/PersonalDashboard/DashboardBox";
import Sidebar from "@/components/PersonalDashboard/Sidebar";





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
            <BarGraphComponent />
          </div>
        </div>
        <div className="flex-col w-1/4 mr-20 mt-10 ml-20">
          
          <div className="mb-7">
            
          </div>
          <div className="w-[400px] mt-96 h-[300px] rounded-lg  mb-7">
            {/* <p className="text-white p-4 text-center">Weekly Basis Analysis </p> */}
            <PieChart />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
