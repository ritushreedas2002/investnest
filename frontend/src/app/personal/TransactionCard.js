import React from 'react';

const TransactionCard = ({ name, amount }) => {
  return (
    <div className="bg-gray-200 py-2 px-4 rounded-lg w-80 h-14 ">
        <div className='flex justify-between'>
          <h5 className="text-sm font-semibold flex justify-between">{name}</h5>
          {amount === "$0.00" && (
            <p className="text-sm ml-2 text-red-600">Add data</p>
          )}
        </div>
        <p className="text-sm font-bold">{amount}</p>
        
    </div>

  );
};

export default TransactionCard;
