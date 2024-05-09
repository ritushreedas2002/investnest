// components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  console.log(data);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
        <button onClick={onClose} className="float-right font-bold text-black">
          X
        </button>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bought Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Current Price
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((item, index) => (
                <tr key={index} className="text-black">
                  <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm">
                    {item.coinName}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {item.quantity}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {item.purchaseDate}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    ${item.purchasePrice.toFixed(2)}
                  </td>
                  {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    ${item.currentPrice.toFixed(2)}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
