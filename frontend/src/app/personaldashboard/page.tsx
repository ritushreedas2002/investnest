"use client";
import React from "react";
import BarGraphComponent from "@/components/PersonalDashboard/ChartDashboard";
import PieChart from "@/components/PersonalDashboard/WeeklySpendingPieChart";
import DashboardBox from "@/components/PersonalDashboard/DashboardBox";
import Sidebar from "@/components/PersonalDashboard/Sidebar";
import TransactionComponent from "@/components/PersonalDashboard/TransactionComponent";
import LearningDetails from "@/components/PersonalDashboard/LearningDetails";
import YouTubeVideos from "@/components/PersonalDashboard/YouTubeVideos";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



const Dashboard = () => {
  return (
    <div className="bg-blue-200 w-full min-h-screen">
      <div className="flex bg-slate-500">
        <Sidebar />
        <div className="flex-col w-full  mt-10">
          {/* <div className="w-96 h-96 bg-yellow-700"> */}
            <DashboardBox />
          {/* </div> */}
          <div className=" ml-20  p-6">
            <BarGraphComponent />
          </div>
          <div className="  ml-20  p-6">
          <LearningDetails/>
          </div>
          <div className="  ml-20  p-6">
            <YouTubeVideos/>
          </div>
          
        </div>
        <div className="flex-col w-1/4 mr-10 mt-24 ml-20">
          <TransactionComponent/>
          <div className="mb-7">
            
          </div>
          <div className="w-[400px]  h-[300px] rounded-lg  mb-7">
            {/* <p className="text-white p-4 text-center">Weekly Basis Analysis </p> */}
            <PieChart />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
