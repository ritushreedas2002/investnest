import React from 'react';

const TransactionCard = ({ name, amount}) => {
    return (
        <div className="bg-gray-200 py-2 px-4 rounded-lg">
            <h5 className="text-sm font-semibold ">{name}</h5>
            <p className="text-lg font-bold">{amount}</p>
        </div>
    );
};

export default TransactionCard;
