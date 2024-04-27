import React, { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import axios from "axios";

const options = {
  inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
};

const IncomeForm = ({close}) => {
  const [title1, setTitle1] = useState('');
  const [date1, setDate1] = useState('');
  const [amount1, setAmount1] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Title: ${title1}, Date: ${date1}, Amount: ${amount1}`);
    const dateObject = new Date(date1);
    if (!isNaN(dateObject)) {
      const timeZoneOffset = dateObject.getTimezoneOffset() * 60000; // convert offset to milliseconds
    const localDate = new Date(dateObject.getTime() - timeZoneOffset);
    console.log(`Title: ${title1}, Date: ${localDate.toISOString().split('T')[0]}, Amount: ${amount1}`);
    }
    else {
      console.log("Invalid date");
    }
    // Add additional logic for what to do after form submission if needed
    close();
  };

  const [show, setShow] = useState(false);
	const handleChange = (selectedDate) => {
    setDate1(selectedDate);
		console.log(selectedDate)
	}
	const handleClose = (state) => {
		setShow(state)
	}

  return <div>
    <div className="fixed -top-10  inset-20 flex items-center justify-center z-50">
        <div className="mx-auto w-[30%] space-y-6 bg-white p-8 rounded-3xl">
          <div className="text-center space-y-1 -mb-10">
            <h1 className="text-3xl font-bold">Income Tracker</h1>
            <p className="text-gray-500">
              Add your income details to keep track of your finances.
            </p>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title1}
                onChange={(e) => setTitle1(e.target.value)}
                placeholder="Enter the income title"
                required
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <Datepicker 
                value={date1}
                onSelectedDateChanged={(date) => setDate1(date)}
                //format="DD MMM YYYY"
                options={options}
                onChange={handleChange} show={show} setShow={handleClose} 
                //datepicker-format="mm/dd/YYYY"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount1}
              onChange={(e) => setAmount1(e.target.value)}
                placeholder="Enter the income amount"
                required
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
  </div>;
};

export default IncomeForm;
