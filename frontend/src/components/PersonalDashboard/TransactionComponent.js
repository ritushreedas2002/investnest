






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";

// const ShimmerRow = ({ index }) => {
//   return (
//     <div
//       key={index}
//       className=" animate-pulse flex justify-between items-center p-2 border-b"
//     >
//       <div className="flex  items-center ml-3">

//           <div className="h-3 bg-gray-300 rounded w-14"></div>
//           <div className="h-3 bg-gray-300 rounded w-12 ml-36"></div>
//       </div>
//     </div>
//   );
// };

// const TransactionComponent = () => {
//   const [activeTab, setActiveTab] = useState("income");
//   const [transactions, setTransactions] = useState({
//     income: [],
//     expenses: [],
//     bills: [], // Assuming there's a bills category as well
//   });
//   const [isLoading, setIsLoading] = useState(true); // Initial loading state
//   const email =
//     typeof window !== "undefined" ? localStorage.getItem("email") : null;

//   const fetchData = async (tab) => {
//     setIsLoading(true);
//     const endpoint =
//       tab === "expenses"
//         ? "transaction/expense/oneweek"
//         : "transaction/income/onemonth";
//     const url = `/api/${endpoint}?email=${email}`;

//     try {
//       const response = await axios.get(url);
//       setTransactions((prev) => ({
//         ...prev,
//         [tab]: response.data,
//       }));
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching transaction data:", error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (email) {
//       fetchData(activeTab);
//       const intervalId = setInterval(() => {
//         fetchData(activeTab);
//       }, 10000); // Fetch every 10 seconds

//       return () => clearInterval(intervalId);
//     }
//   }, [activeTab, email]);

//   const renderTransactions = (type) => {
//     if (isLoading || transactions[type].length === 0) {
//       // Render Shimmer effect if loading or no data
//       return [...Array(5)].map((_, index) => <ShimmerRow index={index} />);
//     }
//     return transactions[type].map((transaction, index) => (
//       <div
//         key={index}
//         className="flex justify-between items-center p-2 border-b"
//       >
//         <div className="flex items-center ml-3">
//           <span className="p-1 rounded-full bg-gray-200 mr-6">
//             {/* Icon placeholder */}
//           </span>
//           <div>
//             <div className="font-bold">
//               {type === "income" ? transaction.source : transaction.title}
//             </div>
//             <div className="text-sm text-gray-200">{transaction.category}</div>
//           </div>
//         </div>
//         <div
//           className={`font-bold  mr-7 ${
//             type === "expenses" ? "text-red-500" : "text-[#57E8B6]"
//           }`}
//         >
//           ₹{transaction.amount.toFixed(2)}
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <div className="min-w-[300px] mx-auto bg-[#2f2828] rounded-lg shadow-md overflow-hidden text-white">
//       <div className="py-2 px-4 flex justify-between items-center">
//         <div className="text-lg font-semibold">Transactions</div>
//         <div className="text-right text-sm text-blue-500 cursor-pointer">
//           <Link href="/personaldashboard/transactions">View all</Link>
//         </div>
//       </div>
//       <div className="flex justify-around font-semibold p-1 bg-gray-300/10 backdrop-filter backdrop-blur-lg">
//         <span
//           className={`cursor-pointer ${
//             activeTab === "income" ? "text-green-300" : ""
//           }`}
//           onClick={() => setActiveTab("income")}
//         >
//           Income
//         </span>
//         <span
//           className={`cursor-pointer ${
//             activeTab === "expenses" ? "text-red-400" : ""
//           }`}
//           onClick={() => setActiveTab("expenses")}
//         >
//           Expenses
//         </span>
//         <span
//           className={`cursor-pointer ${
//             activeTab === "bills" ? "text-yellow-100" : ""
//           }`}
//           onClick={() => setActiveTab("bills")}
//         >
//           Bills
//         </span>
//       </div>
//       <div className="h-[192px] overflow-y-auto no-scrollbar">
//         {renderTransactions(activeTab)}
//       </div>
//     </div>
//   );
// };

// export default TransactionComponent;





import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import IncomeForm  from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";

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

const TransactionComponent = () => {
  const [activeTab, setActiveTab] = useState("income");
  const [transactions, setTransactions] = useState({
    income: [],
    expenses: [],
    bills: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  const fetchData = async (tab) => {
    setIsLoading(true);
    const endpoint =
      tab === "expenses"
        ? "transaction/expense/oneweek"
        : "transaction/income/onemonth";
    const url = `/api/${endpoint}?email=${email}`;

    try {
      const response = await axios.get(url);
      setTransactions((prev) => ({
        ...prev,
        [tab]: response.data,
      }));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchData(activeTab);
      const intervalId = setInterval(() => {
        fetchData(activeTab);
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [activeTab, email]);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderTransactions = (type) => {
    if (isLoading || transactions[type].length === 0) {
      return [...Array(5)].map((_, index) => <ShimmerRow index={index} />);
    }
    return transactions[type].map((transaction, index) => (
      <div
        key={index}
        className="flex justify-between items-center p-2 border-b"
      >
        <div className="flex items-center ml-3">
          <span className="p-1 rounded-full bg-gray-200 mr-6"></span>
          <div>
            <div className="font-bold">
              {type === "income" ? transaction.source : transaction.title}
            </div>
            <div className="text-sm text-gray-200">{transaction.category}</div>
          </div>
        </div>
        <div
          className={`font-bold  mr-7 ${
            type === "expenses" ? "text-red-500" : "text-[#57E8B6]"
          }`}
        >
          ₹{transaction.amount.toFixed(2)}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-w-[300px] mx-auto bg-[#2f2828] rounded-lg shadow-md overflow-hidden text-white relative ">
      <div className="py-2 px-4 flex justify-between items-center ">
        <div className="text-lg font-semibold">Transactions</div>
        <div className="text-right text-sm text-blue-500 cursor-pointer">
          <Link href="/personal/transactions">View all</Link>
        </div>
      </div>
      <div className="flex justify-around font-semibold p-1 bg-gray-300/10 backdrop-blur-lg">
        <span
          className={`cursor-pointer ${
            activeTab === "income" ? "text-green-300" : ""
          }`}
          onClick={() => setActiveTab("income")}
        >
          Income
        </span>
        <span
          className={`cursor-pointer ${
            activeTab === "expenses" ? "text-red-400" : ""
          }`}
          onClick={() => setActiveTab("expenses")}
        >
          Expenses
        </span>
        <span
          className={`cursor-pointer ${
            activeTab === "bills" ? "text-yellow-100" : ""
          }`}
          onClick={() => setActiveTab("bills")}
        >
          Bills
        </span>
      </div>
      <div className="h-[200px] overflow-y-auto no-scrollbar">
        {renderTransactions(activeTab)}
      </div>
      <button
        className="absolute bottom-3 right-4 w-14 rounded-lg text-center p-2 bg-blue-500 hover:bg-blue-600 text-white text-sm cursor-pointer"
        onClick={openModal}
      >
        Add
      </button>
      {showModal && (activeTab === "income" ? <IncomeForm close={closeModal} /> : <ExpenseForm close={closeModal} />)}
    
    </div>
  );
};

export default TransactionComponent;
