"use client"
import React, { useState } from 'react';

const TableComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Your data array can be dynamic, fetched from an API, etc.
  const products = [
    { id: 1, name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: 2999 },
    // ... Add more products here
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center"
          >
            Last 30 days
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
            <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
              <li className="px-4 py-2 hover:bg-gray-100">Last day</li>
              <li className="px-4 py-2 hover:bg-gray-100">Last 7 days</li>
              <li className="px-4 py-2 hover:bg-gray-100">Last 30 days</li>
              <li className="px-4 py-2 hover:bg-gray-100">Last month</li>
              <li className="px-4 py-2 hover:bg-gray-100">Last year</li>
            </ul>
          )}
        </div>
        <input
          type="text"
          placeholder="Search for items"
          className="p-2 pl-10 border rounded-md"
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="p-4 w-4">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.color}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4 text-blue-600 hover:text-blue-700">
                  <a href="#" className="hover:underline">
                    Edit
                  </a>
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
