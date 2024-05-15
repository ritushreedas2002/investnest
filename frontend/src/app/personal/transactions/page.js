// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const TableComponent = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isTypeOpen, setIsTypeOpen] = useState(false);
//   const [expenses, setExpenses] = useState([]);
//   const [timeRange, setTimeRange] = useState("onemonth");
//   const [dataType, setDataType] = useState("expense");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     const userEmail = localStorage.getItem("email");
//     setEmail(userEmail); // Set email in state for potential later use
//     if (!userEmail) return;

//     const fetchExpenses = async () => {
//       try {
//         const response = await axios.get(
//           `/api/transaction/${dataType}/${timeRange}`,
//           { params: { email: userEmail } }
//         );
//         setExpenses(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };

//     fetchExpenses();
//   }, [timeRange, dataType]);

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const toggleTypeDropdown = () => setIsTypeOpen(!isTypeOpen);

//   const handleTimeRangeChange = (range) => {
//     setTimeRange(range);
//     toggleDropdown();
//   };

//   const handleTypeChange = (type) => {
//     setDataType(type);
//     toggleTypeDropdown();
//   };

//   const formatTimeRange = (timeRange) => {
//     const timeRangeMap = {
//       oneweek: "Last 7 days",
//       onemonth: "Last 30 days",
//       oneyear: "Last 1 year",
//     };
//     return timeRangeMap[timeRange] || timeRange;
//   };
//   const handleDelete = async (item) => {
//     const year = new Date(item.date).getFullYear().toString();
//     let month = (new Date(item.date).getMonth() + 1).toString(); // JS months are zero-indexed
//     month = month.padStart(2, '0');
  
//     const idKey = dataType === 'expense' ? 'expenseId' : 'incomeId';
//     const body = {
//       email: localStorage.getItem("email"),
//       year,
//       month,
//       [idKey]: item.id,
//       ...(dataType === 'expense' && { category: item.category })
//     };
  
//     console.log("Attempting to delete with body:", body);
  
//     try {
//       const response = await axios.delete(`/api/transaction/${dataType}`, {
//         data: body // Correct way to send body with axios.delete
//       });
  
//       console.log("Delete response:", response.data);
  
//       setExpenses(currentExpenses => currentExpenses.filter(expense => expense.id !== item.id));
//     } catch (error) {
//       console.error('Failed to delete:', error);
//       toast.error((error.response?.data.msg || error.message));

//     }
//   };
  

//   return (
//     <div className=" mx-auto p-4 ml-24">
//       <div className="flex items-center mb-4">
//         <div className="relative">
//           <button
//             onClick={toggleDropdown}
//             className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center"
//           >
//             {formatTimeRange(timeRange)}
//             <svg
//               className="ml-2 w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               ></path>
//             </svg>
//           </button>
//           {isOpen && (
//             <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
//               <li
//                 className="px-4 py-2 hover:bg-gray-100"
//                 onClick={() => handleTimeRangeChange("oneweek")}
//               >
//                 Last 7 days
//               </li>
//               <li
//                 className="px-4 py-2 hover:bg-gray-100"
//                 onClick={() => handleTimeRangeChange("onemonth")}
//               >
//                 Last 30 days
//               </li>
//               <li
//                 className="px-4 py-2 hover:bg-gray-100"
//                 onClick={() => handleTimeRangeChange("oneyear")}
//               >
//                 Last year
//               </li>
//             </ul>
//           )}
//         </div>
//         <div className="relative">
//           <button
//             onClick={toggleTypeDropdown}
//             className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center ml-80"
//           >
//             {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
//             <svg
//               className="ml-2 w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               ></path>
//             </svg>
//           </button>
//           {isTypeOpen && (
//             <ul className="absolute left-0 mt-2 w-48 rounded-md z-10">
//               <li
//                 className="px-4 py-2 hover:bg-gray-100"
//                 onClick={() => handleTypeChange("expense")}
//               >
//                 Expenses
//               </li>
//               <li
//                 className="px-4 py-2 hover:bg-gray-100"
//                 onClick={() => handleTypeChange("income")}
//               >
//                 Incomes
//               </li>
//             </ul>
//           )}
//         </div>
//       </div>
//       <div className="relative overflow-x-auto sm:rounded-lg max-w-[700px] ">
//         <table className=" text-sm text-left text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="p-4">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 text-blue-600 rounded"
//                   />
//                 </div>
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 {dataType === "expense" ? "Title" : "Source"}
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Amount
//               </th>
//               {dataType === "expense" && (
//                 <th scope="col" className="px-6 py-3">
//                   Category
//                 </th>
//               )}
//               <th scope="col" className="px-6 py-3">
//                 Date
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((item) => (
//               <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
//                 <td className="p-4 w-4">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 text-blue-600 rounded"
//                   />
//                 </td>
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
//                 >
//                   {item.title || item.source}
//                 </th>
//                 <td className="px-6 py-4">{item.amount}</td>
//                 {dataType === "expense" && (
//                   <td className="px-6 py-4">{item.category}</td>
//                 )}
//                 <td className="px-6 py-4">{item.date}</td>
//                 <td className="px-6 py-4 text-blue-600 hover:text-blue-700">
//                   <button onClick={() => handleDelete(item)}>Delete</button>
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




"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdAdd } from "react-icons/md";

const ShimmerRow = ({ index }) => {
  return (
    <div
      key={index}
      className="animate-pulse flex justify-between items-center p-2 border-b"
    >
      <div className="flex items-center ml-3">
        <div className="h-3 bg-gray-300 rounded w-14"></div>
        <div className="h-3 bg-gray-300 rounded w-12 ml-36"></div>
      </div>
    </div>
  );
};

const TableComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [bills, setBills] = useState([]);
  const [timeRange, setTimeRange] = useState("onemonth");
  const [dataType, setDataType] = useState("expense");
 
  const userEmail =typeof window !== "undefined" ? localStorage.getItem("email") : null;
  useEffect(() => {
    
 
    if (!userEmail) return;

    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `/api/transaction/${dataType}/${timeRange}`,
          { params: { email: userEmail } }
        );
        setExpenses(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchExpenses();
  }, [timeRange, dataType]);

  useEffect(() => {
   
    if (!userEmail) return;

    const fetchBills = async () => {
      try {
        const response = await axios.get(`/api/targets/bills?email=${userEmail}`);
        setBills(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Failed to fetch bills:", error);
      }
    };

    fetchBills();
  }, []);

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
      oneweek: "Last 7 days",
      onemonth: "Last 30 days",
      oneyear: "Last 1 year",
    };
    return timeRangeMap[timeRange] || timeRange;
  };

  const handleDeleteExpense = async (item) => {
    const year = new Date(item.date).getFullYear().toString();
    let month = (new Date(item.date).getMonth() + 1).toString();
    month = month.padStart(2, "0");

    const idKey = dataType === "expense" ? "expenseId" : "incomeId";
    const body = {
      email: localStorage.getItem("email"),
      year,
      month,
      [idKey]: item.id,
      ...(dataType === "expense" && { category: item.category }),
    };

    try {
      await axios.delete(`/api/transaction/${dataType}`, {
        data: body,
      });

      setExpenses((currentExpenses) =>
        currentExpenses.filter((expense) => expense.id !== item.id)
      );
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleDeleteBill = async (id) => {
    try {
      await axios.delete(`/api/targets/bills`, {
        data: { email, id }
      });
  
      setBills((currentBills) => currentBills.filter((bill) => bill._id !== id));
    } catch (error) {
      console.error("Failed to delete bill:", error);
    }
  };
  

  return (
    <div className="flex space-x-4 mx-auto p-4 text-white bg-[#2f2828] ml-20">
      {/* First Table */}
      <div className="w-4/5">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md flex items-center"
            >
              {formatTimeRange(timeRange)}
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {isOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-gray-200 shadow-lg rounded-md z-10">
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={() => handleTimeRangeChange("oneweek")}
                >
                  Last 7 days
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={() => handleTimeRangeChange("onemonth")}
                >
                  Last 30 days
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={() => handleTimeRangeChange("oneyear")}
                >
                  Last year
                </li>
              </ul>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleTypeDropdown}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md flex items-center"
            >
              {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {isTypeOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-200 shadow-lg rounded-md z-10">
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={() => handleTypeChange("expense")}
                >
                  Expenses
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={() => handleTypeChange("income")}
                >
                  Incomes
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg max-h-[400px] border border-gray-700">
          <table className="min-w-full text-sm text-left text-gray-200 bg-gray-900">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {dataType === "expense" ? "Title" : "Source"}
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                {dataType === "expense" && (
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                )}
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <button
                      onClick={() => alert("Add new item")}
                      className="flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      <MdAdd className="mr-1" /> Add
                    </button>
                  </td>
                </tr>
              ) : (
                expenses.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-gray-900 border-b border-gray-700 hover:bg-gray-800"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap"
                    >
                      {item.title || item.source}
                    </th>
                    <td className="px-6 py-4">{item.amount}</td>
                    {dataType === "expense" && (
                      <td className="px-6 py-4">{item.category}</td>
                    )}
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4 text-blue-600 hover:text-blue-700">
                      <button onClick={() => handleDeleteExpense(item)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Second Table */}
      <div className="w-3/5">
        <div className="flex justify-between items-center mb-4">
          {/*  */}
         
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg max-h-[400px] border border-gray-700">
          <table className="min-w-full text-sm text-left text-gray-200 bg-gray-900">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Bill Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bills?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <button
                      onClick={() => alert("Add new bill")}
                      className="flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      <MdAdd className="mr-1" /> Add
                    </button>
                  </td>
                </tr>
              ) : (
                bills?.map((bill) => (
                  <tr
                    key={bill._id}
                    className="bg-gray-900 border-b border-gray-700 hover:bg-gray-800"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap"
                    >
                      {bill.billName}
                    </th>
                    <td className="px-6 py-4">{bill.amount}</td>
                    <td className="px-6 py-4">{bill.category}</td>
                    <td className="px-6 py-4">{bill.dueDate}</td>
                    <td className="px-6 py-4 text-blue-600 hover:text-blue-700">
                      <button onClick={() => handleDeleteBill(bill._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;




