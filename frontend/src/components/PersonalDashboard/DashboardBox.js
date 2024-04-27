
import { useState } from "react";

import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";

const DashboardCard = ({
  title,
  amount,
  percentage,
  color,
  icon,
  children,
}) => {
  return (
    <div className={`bg-${color}-200 p-4 rounded-lg shadow-md max-w-sm`}>
      <div className="flex items-center justify-between">
        <span className={`text-${color}-600 text-sm font-semibold`}>
          {title}
        </span>
        <span
          className={`text-${color}-600 text-sm font-semibold flex items-center`}
        >
          <i className={icon}></i>
          {percentage}%
        </span>
      </div>
      <div className={`text-${color}-800 text-2xl font-bold my-2`}>
        {amount}
      </div>
      <div>{children}</div>
    </div>
  );
};

const DashboardBox = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Payments Updates</p>
      <div className="space-x-4 flex">
        {/* Balance Card */}
        <DashboardCard
          title="Balance"
          amount="$56,874"
          percentage="+17"
          color="green"
          icon="fas fa-wallet"
        >
          {/* Insert graph or any other content here */}
        </DashboardCard>

        {/* Sales Card */}
        <DashboardCard
          title="Sales"
          amount="$24,575"
          percentage="+23"
          color="yellow"
          icon="fas fa-tag"
        >
          {/* Insert graph or any other content here */}
        </DashboardCard>

        {/* Upgrade Card */}
        <div className="bg-purple-200 p-4 rounded-lg shadow-md max-w-sm flex flex-col justify-between">
          <h3 className="text-purple-600 text-lg font-semibold">Upgrade</h3>
          <p className="text-purple-600">
            Get more information and opportunities
          </p>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded-lg mt-4"
            onClick={openModal}
          >
            Go Pro
          </button>
        </div>
      </div>
      {showModal && <IncomeForm close={closeModal}  />/*<ExpenseForm close={closeModal} />*/}
    </div>
  );
};

export default DashboardBox;
