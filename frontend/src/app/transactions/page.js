"use client"
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TableComponent = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [expenses, setExpenses] = useState([]);
//   const [timeRange, setTimeRange] = useState('onemonth');  // Default to 'onemonth'
//   const [email, setEmail] = useState('');
//   const [dataType, setDataType] = useState('expense');

//   useEffect(() => {
//     const userEmail = localStorage.getItem("email");
//     setEmail(userEmail);  // Set email in state for potential later use
//     if (!userEmail) return;

//     const fetchExpenses = async () => {
//       try {
//         const response = await axios.get(`/api/transaction/expense/${timeRange}`, { params: { email: userEmail } });
//         setExpenses(response.data);
//       } catch (error) {
//         console.error('Failed to fetch expenses:', error);
//       }
//     };

//     fetchExpenses();
//   }, [timeRange]);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleTimeRangeChange = (range) => {
//     setTimeRange(range);
//     toggleDropdown();
//   };

//   const formatTimeRange = (timeRange) => {
//     const timeRangeMap = {
//       oneday: 'Last 1 day',
//       oneweek: 'Last 7 days',
//       onemonth: 'Last 30 days',
//       oneyear: 'Last 1 year'
//     };
//     return timeRangeMap[timeRange] || timeRange; // Fallback to raw timeRange if no match
//   };
  
//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <div className="relative">
//           <button onClick={toggleDropdown} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center">
//           {formatTimeRange(timeRange)} {/* Show selected time range in button text */}
//             <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
//             </svg>
//           </button>
//           {isOpen && (
//             <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
//               <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleTimeRangeChange('oneday')}>Last day</li>
//               <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleTimeRangeChange('oneweek')}>Last 7 days</li>
//               <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleTimeRangeChange('onemonth')}>Last 30 days</li>
//               <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleTimeRangeChange('oneyear')}>Last year</li>
//             </ul>
//           )}
//         </div>
//         <input type="text" placeholder="Search for items" className="p-2 pl-10 border rounded-md" />
//       </div>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="p-4">
//                 <div className="flex items-center">
//                   <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
//                 </div>
//               </th>
//               <th scope="col" className="px-6 py-3">Title</th>
//               <th scope="col" className="px-6 py-3">Amount</th>
//               <th scope="col" className="px-6 py-3">Category</th>
//               <th scope="col" className="px-6 py-3">Date</th>
//               <th scope="col" className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((expense) => (
//               <tr key={expense.id} className="bg-white border-b hover:bg-gray-50">
//                 <td className="p-4 w-4">
//                   <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
//                 </td>
//                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//                   {expense.title}
//                 </th>
//                 <td className="px-6 py-4">₹{expense.amount}</td>
//                 <td className="px-6 py-4">{expense.category}</td>
//                 <td className="px-6 py-4">{expense.date}</td>
//                 <td className="px-6 py-4 text-blue-600 hover:text-blue-700">
//                   <a href="#" className="hover:underline">Edit</a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [timeRange, setTimeRange] = useState('onemonth');
  const [dataType, setDataType] = useState('expense');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setEmail(userEmail);  // Set email in state for potential later use
    if (!userEmail) return;

    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`/api/transaction/${dataType}/${timeRange}`, { params: { email: userEmail } });
        setExpenses(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchExpenses();
  }, [timeRange, dataType]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleTypeDropdown = () => setIsTypeOpen(!isTypeOpen);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    toggleDropdown();
  };

  const handleTypeChange = (type) => {
    setDataType(type);
    toggleTypeDropdown();
  };

  const formatTimeRange = (timeRange) => {
    const timeRangeMap = {
      oneday: 'Last 1 day',
      oneweek: 'Last 7 days',
      onemonth: 'Last 30 days',
      oneyear: 'Last 1 year'
    };
    return timeRangeMap[timeRange] || timeRange;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button onClick={toggleDropdown} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center">
            {formatTimeRange(timeRange)}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
              <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleTimeRangeChange('oneday')}>Last day</li>
              <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleTimeRangeChange('oneweek')}>Last 7 days</li>
              <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleTimeRangeChange('onemonth')}>Last 30 days</li>
              <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleTimeRangeChange('oneyear')}>Last year</li>
            </ul>
          )}
        </div>
        <div className="relative">
          <button onClick={toggleTypeDropdown} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center">
            {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isTypeOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
              <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleTypeChange('expense')}>Expenses</li>
              <li className="px-4 py-2 hover:bg-gray-100" onClick={() => handleTypeChange('income')}>Incomes</li>
            </ul>
          )}
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">{dataType === 'expense' ? 'Title' : 'Source'}</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              {dataType === 'expense' && <th scope="col" className="px-6 py-3">Category</th>}
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4 w-4">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.title || item.source}
                </th>
                <td className="px-6 py-4">{item.amount}</td>
                {dataType === 'expense' && <td className="px-6 py-4">{item.category}</td>}
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4 text-blue-600 hover:text-blue-700">
                  <a href="#" className="hover:underline">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
