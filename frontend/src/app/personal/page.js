"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed or use fetch API
import TransactionCard from "./TransactionCard";
import CredCard from "./CredCard";
import BarGraphComponent from "@/components/PersonalDashboard/ChartDashboard";
import Planning from "./Planning";
import TransactionComponent from "@/components/PersonalDashboard/TransactionComponent";
import PieChart from "@/components/PersonalDashboard/WeeklySpendingPieChart";
import LearningDetails from "@/components/PersonalDashboard/LearningDetails";

const Dashboard = () => {
  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });
  const [showChat, setShowChat] = useState(false);
  const [showLearning, setLearning] = useState(false);

  const toggleChat = () => setShowChat(!showChat);
  const toggleLearning = () => setLearning(!showLearning);

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
    <div className="ml-20 px-5 py-2">
      <div className="h-12">dfg</div>
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
            <div className="shadow rounded-lg p-2 mb-4 bg-gray-700">
              <h4 className="text-lg text-white font-semibold ">Analytics</h4>
              <PieChart />
            </div>
          </div>
          <div className="mb-2">
            <TransactionComponent />
          </div>
        </div>

        <div className="w-[40%] ml-2 -mr-3 ">
          <div className="bg-gray-500 h-[97%] rounded-xl overflow-hidden ">
            {/* Chat Window */}
            <div
              className={` transition-all bg-gray-200 rounded-xl duration-300 ease-in-out ${
                showChat ? "h-[100%]" : "h-0"
              } overflow-hidden w-full`}
            >
              <div className=" text-black p-4">
                <button
                  onClick={toggleChat}
                  className="text-black bg-gray-300 rounded-full text-sm p-1 float-right"
                >
                  X
                </button>
                Chat window content...
              </div>
            </div>
            {/* Learning Window */}
            <div
              className={` transition-all bg-gray-200 rounded-xl duration-300 ease-in-out ${
                showLearning ? "h-[100%]" : "h-0"
              } overflow-hidden w-full`}
            >
              <div className=" text-black p-4">
                <button
                  onClick={toggleLearning}
                  className="text-black bg-gray-300 rounded-full text-sm p-1 float-right"
                >
                  X
                </button>
                {/* <div> */}
                  <LearningDetails />
                {/* </div> */}
              </div>
            </div>
            <div className=" w-96 p-2 mb-2">
              <video
                src={require("../../../public/personalFin.mp4")}
                autoPlay
                loop
                muted
                className="  rounded-xl"
              />
            </div>
            <div className="mx-2 p-2 mb-2 h-[44%] rounded-xl text-white bg-gray-400">
              <h1 className="text-2xl underline font-semibold text-center underline-offset-4">
                Finance Insight
              </h1>
              <div className="m-3 flex justify-stretch ">
                Stay informed and empowered with Finance Insight. Explore the
                latest articles and videos on personal finance to enhance your
                knowledge. Get personalized advice and suggestions from our AI
                chatbot to make smarter financial decisions based on your unique
                finance data. Start your journey to financial wellness today!
              </div>
            </div>
            <div className="mx-2 text-white font-semibold mb-2 h-[7%] rounded-3xl flex items-center justify-center bg-red-500">
              <button onClick={toggleLearning} className=" w-full h-full">Start Learning</button>
            </div>
            <div className="mx-2 text-white font-semibold h-[7%] rounded-3xl flex items-center justify-center bg-red-500">
              <button onClick={toggleChat} className=" w-full h-full">Ask AI</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
