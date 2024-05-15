"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Datepicker from "tailwind-datepicker-react";

const people = [
  {
    id: 1,
    name: "Bills",
    avatar: "/bills.png",
  },
  {
    id: 2,
    name: "Grocery",
    avatar: "/grocery.png",
  },
  {
    id: 3,
    name: "Entertainment",
    avatar: "/music.png",
  },
  {
    id: 4,
    name: "Clothing",
    avatar: "/clothing.png",
  },
  {
    id: 5,
    name: "Others",
    avatar: "/others.png",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const options = {
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

const BillsForm = ({ close }) => {
  const [billname, setBillname] = useState("");
  const [amount, setAmount] = useState("");
  const [duedate, setDuedate] = useState("");
  const [selected, setSelected] = useState(people[0]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    billname: false,
    amount: false,
    duedate: false,
    category: false,
  });
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  const validate = () => {
    let tempErrors = {};
    if (!billname) tempErrors.billname = "Title is required.";
    if (!amount) tempErrors.amount = "Amount is required.";
    if (!duedate) tempErrors.duedate = "Date is required.";
    if (!selected.name) tempErrors.category = "Category is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (!validate()) return;
    const dateObj = new Date(duedate);
    const timeZoneOffset = dateObj.getTimezoneOffset() * 60000; // convert offset to milliseconds
    const localDate = new Date(dateObj.getTime() - timeZoneOffset);
    console.log(dateObj);
    const formData = {
      billname,
      amount: Number(amount),
      duedate: localDate.toISOString().split("T")[0],
      category: selected.name,
      email,
    };
    console.log(formData);
    try {
      // Use Axios to post the data
      const response = await axios.post("/api/targets/bills", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data); // Process or log the result from the server
      setBillname("");
      setAmount("");
      setDuedate("");
      setSelected(people[0]);
      close(); // Close the modal on successful submission
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    if (selectedDate) {
      // Ensure the date from the datepicker is a valid Date object
      setDuedate(selectedDate);
    } else {
      console.error("Selected date is invalid:", selectedDate);
      setDuedate(new Date().toISOString().split("T")[0]); // Fallback to today's date if error
    }
  };
  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed -top-14 inset-10  flex items-center justify-center z-50">
        <div className="mx-auto w-[40%] space-y-6 p-8 rounded-3xl bg-blue-200">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-black">Add your Bills</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Add your monthly bills to never miss out any payment.
            </p>
          </div>
          <form className="space-y-4" onSubmit={(e) => preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bill Name
                </label>
                <input
                  type="text"
                  id="title"
                  value={billname}
                  onChange={(e) => setBillname(e.target.value)}
                  onBlur={() => handleBlur("title")}
                  placeholder="Enter the bill name"
                  required
                  className="mt-1 block w-full text-black p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {touched.billname && errors.billname && (
                  <div style={{ color: "red" }}>{errors.billname}</div>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <Datepicker
                  value={duedate}
                  options={options}
                  onChange={handleChange}
                  show={show}
                  setShow={handleClose}
                />
                {touched.duedate && errors.duedate && (
                  <div style={{ color: "red" }}>{errors.duedate}</div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onBlur={() => handleBlur("amount")}
                  placeholder="Enter the bill amount"
                  required
                  className="mt-1 block p-2 w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {touched.amount && errors.amount && (
                  <div style={{ color: "red" }}>{errors.amount}</div>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <Listbox
                  value={selected}
                  onChange={setSelected}
                  onBlur={() => handleBlur("selected")}
                >
                  {({ open }) => (
                    <>
                      <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <img
                              src={selected.avatar}
                              alt=""
                              className="h-5 w-5 flex-shrink-0 rounded-full"
                            />
                            <span className="ml-3 block truncate">
                              {selected.name}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto no-scrollbar rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person) => (
                              <Listbox.Option
                                key={person.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-indigo-600 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={person}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <img
                                        src={person.avatar}
                                        alt=""
                                        className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                                      />
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {person.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
                {touched.category && errors.category && (
                  <div style={{ color: "red" }}>{errors.category}</div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={close}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillsForm;
