"use client";
import React from "react";
// pages/index.js or components/Dashboard.js
import GlassyCard from './GlassyCard';

const Dashboard = () => {
  return (
    <div className="bg-gray-900  flex justify-around items-center p-4">
      <GlassyCard icon="👤" title="Balance" amount="$4156.45" />
      <GlassyCard icon="💵" title="Income" amount="$3145.62" />
      <GlassyCard icon="📉" title="Expenses" amount="$1556.25" />
      <GlassyCard icon="💰" title="Savings" amount="$1589.17" />
    </div>
  );
};

export default Dashboard;
