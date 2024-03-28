import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Define your chart data here
const doughnutData = {/* ... */};
const barData = {/* ... */};

const Dashboard = () => {
  return (
    <div className="bg-gray-100 p-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* Card 1: Available Balance */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Available balance</h3>
          <p className="text-2xl font-bold">$1530.25</p>
          {/* ... other card contents */}
        </div>
        
        {/* Card 2: Cashback Earned */}
        <div className="bg-green-400 p-4 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Cashback earned</h3>
          <p className="text-2xl font-bold">$220.73</p>
          {/* ... other card contents */}
        </div>
        
        {/* Card 3: Statistics */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Statistics</h3>
          {/* Replace with actual Bar chart */}
          {/* <Bar data={barData} /> */}
        </div>
        
        {/* Card 4: Spending Spots */}
        <div className="bg-blue-400 p-4 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Spending Spots</h3>
          {/* Replace with actual Doughnut chart */}
          {/* <Doughnut data={doughnutData} /> */}
        </div>

        {/* ... additional cards */}
        
      </div>
    </div>
  );
};

export default Dashboard;
