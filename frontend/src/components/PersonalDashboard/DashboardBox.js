// import { useState } from "react";
"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
// import { Datepicker } from "flowbite-react";
import Datepicker from "tailwind-datepicker-react";
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

const people = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 7,
    name: "Caroline Schultz",
    avatar:
      "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 8,
    name: "Mason Heaney",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 9,
    name: "Claudie Smitham",
    avatar:
      "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 10,
    name: "Emil Schaefer",
    avatar:
      "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



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

/*
  <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="bg-white p-8 rounded-lg shadow-md z-50">
            <h2 className="text-2xl font-bold">Upgrade to Pro</h2>
            // Add your form or content for the modal here 
            <button onClick={closeModal} className="bg-purple-500 text-white py-2 px-4 rounded-lg mt-4">Close</button>
          </div>*/
