"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import IncomeForm from "../../../components/PersonalDashboard/IncomeForm";
import ExpenseForm from "../../../components/PersonalDashboard/ExpenseForm";
import BillsForm from "../../../components/PersonalDashboard/BillsForm";
import BillEditForm from "./BillEditForm";

const ShimmerRow = () => (
  <tr className="bg-gray-900 border-b border-gray-700">
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
  </tr>
);
const ShimmerRow1 = () => (
  <tr className="bg-gray-900 border-b border-gray-700">
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
    </td>
  </tr>
);

const ShimmerTable = () => {
  const shimmerRows = Array.from({ length: 9 }, (_, index) => (
    <ShimmerRow key={index} />
  ));
  return <>{shimmerRows}</>;
};
const ShimmerTable1 = () => {
  const shimmerRows = Array.from({ length: 9 }, (_, index) => (
    <ShimmerRow1 key={index} />
  ));
  return <>{shimmerRows}</>;
};

const TableComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [bills, setBills] = useState([]);
  const [timeRange, setTimeRange] = useState("onemonth");
  const [dataType, setDataType] = useState("expense");
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [editingBill, setEditingBill] = useState(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal1 = () => {
    setShowModal1(true);
  };

  const closeModal1 = () => {
    setShowModal1(false);
  };

  const openModal2 = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
    setEditingBill(null);
  };

  const userEmail =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  useEffect(() => {
    if (!userEmail) return;
    const fetchTransactions = async () => {
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
    // Fetch transactions immediately on mount and whenever dependencies change
    fetchTransactions();
    // Set up interval to fetch transactions every 10 seconds
    const intervalId = setInterval(fetchTransactions, 10000);
    // Clean up interval on unmount or when dependencies change
    return () => clearInterval(intervalId);
  }, [timeRange, dataType]);

  useEffect(() => {
    if (!userEmail) return;
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          `/api/targets/bills?email=${userEmail}`
        );
        setBills(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch bills:", error);
      }
    };
    // Fetch bills immediately on mount
    fetchBills();
    // Set up interval to fetch bills every 10 seconds
    const intervalId = setInterval(fetchBills, 10000);
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
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

  const handleDeleteBill = async (bill) => {
    try {
      await axios.delete(`/api/targets/bills`, {
        data: { email: userEmail, id: bill.id },
      });

      setBills((currentBills) =>
        currentBills.filter((bill1) => bill1.id !== bill.id)
      );
    } catch (error) {
      console.error("Failed to delete bill:", error);
    }
  };

  // const handleEditBill = async (bill) => {
  //   try {
  //     await axios.put(`/api/targets/bills`, {
  //       data: {
  //         email: userEmail,
  //         id: bill.id,
  //         amount: bill.amount,
  //         duedate: bill.dueDate,
  //         paid: bill.paid,
  //       },
  //     });

  //     setBills((currentBills) =>
  //       currentBills.filter((bill1) => bill.id !== bill.id)
  //     );
  //   } catch (error) {
  //     console.error("Failed to delete bill:", error);
  //   }
  // };

  const handleEditBill = (bill) => {
    setEditingBill(bill);
    setShowModal2(true);
  };

  const handleSaveBill = (updatedBill) => {
    setBills((currentBills) =>
      currentBills.map((bill) =>
        bill.id === updatedBill.id ? { ...bill, ...updatedBill } : bill
      )
    );
  };

  return (
    <div className="flex space-x-4 mx-auto p-6 text-white bg-[#413838] min-h-screen ml-20">
      {/* First Table */}
      <div className="w-[50%] mr-4">
        <div className="text-xl font-semibold text-white mb-4">
          My Transactions
        </div>
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
              <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-gray-200 shadow-lg rounded-xl z-10">
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
        <div className="relative overflow-x-auto rounded-xl no-scrollbar bg-gray-900 h-[520px] border border-gray-700">
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
                <ShimmerTable />
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
                      <button onClick={() => handleDeleteExpense(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="absolute bottom-0 right-0 mb-4 mr-4">
            <button
              onClick={openModal}
              className="flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              <MdAdd className="mr-1" /> Add Transaction
            </button>
          </div>
          {showModal &&
            (dataType === "income" ? (
              <IncomeForm close={closeModal} />
            ) : (
              <ExpenseForm close={closeModal} />
            ))}
        </div>
      </div>

      {/* Second Table */}
      <div className="w-[50%]">
        <div className="text-xl font-semibold text-white mb-4">My Bills</div>
        <div className="relative overflow-x-auto rounded-xl bg-gray-900 h-[575px] border border-gray-700">
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
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {bills?.length === 0 ? (
                <ShimmerTable1 />
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
                      <button onClick={() => handleEditBill(bill)}>Edit</button>
                    </td>
                    <td className="px-6 py-4 text-blue-600 hover:text-blue-700">
                      <button onClick={() => handleDeleteBill(bill)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="absolute bottom-0 right-0 mb-4 mr-4">
            <button
              onClick={openModal1}
              className="flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              <MdAdd className="mr-1" /> Add Bill
            </button>
          </div>
          {showModal1 && <BillsForm close={closeModal1} />}
          {showModal2 && (
            <BillEditForm
              close={closeModal2}
              billData={editingBill}
              handleSave={handleSaveBill}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
