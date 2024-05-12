import React from 'react';

const Planning = () => {
  const plans = [
    { id: 1, name: 'Buy a Mackbook', current: 1500, goal: 2000, color: 'bg-green-500' },
    { id: 2, name: 'Rent a new home', current: 1000, goal: 1200, color: 'bg-red-500' }
  ];

  return (
    <div className="p-6 bg-gray-400 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Planning</h2>
        <button className="text-sm text-blue-500">View All</button>
      </div>
      {plans.map(plan => (
        <div key={plan.id} className="mb-4 last:mb-0">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium">{plan.name}</h3>
            <span className="text-sm text-gray-600">{`$${plan.current} / $${plan.goal}`}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className={`h-2.5 rounded-full ${plan.color}`} style={{ width: `${(plan.current / plan.goal) * 100}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Planning;
