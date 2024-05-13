// import React, { useState, useEffect } from 'react';

// const Planning = () => {
//   const [plans, setPlans] = useState([]);
//   const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing,setisEditing]=useState(false);
//   const [formData, setFormData] = useState({
//     email: email,
//     title: '',
//     currentamt: '',
//     goal: '',
//     date: new Date(),
//     color: '' // Initialize color in formData
//   });
//   const [editData, setEditData] = useState({
//     email:email,
//     id: '',
//     currentamt: '',
//     color: ''
//   });

//   const colorOptions = [
//     { label: 'Green', value: 'bg-green-500' },
//     { label: 'Red', value: 'bg-red-500' },
//     { label: 'Blue', value: 'bg-blue-500' },
//     { label: 'Yellow', value: 'bg-yellow-500' }
//   ];

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await fetch(`/api/targets/plans?email=${email}`);
//         if (!response.ok) throw new Error('Failed to fetch plans');
//         const data = await response.json();
//         console.log(data);
//         setPlans(data.plans);
//       } catch (error) {
//         console.error('Error fetching plans:', error);
//       }
//     };
//     fetchPlans();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData(prevFormData => ({
//       ...prevFormData,
//       [name]: value
//     }));
//     console.log(name, value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       const response = await fetch('/api/targets/plans', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });
//       console.log(formData);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Something went wrong');
//       }
//       const newPlan = await response.json();
//       setPlans([...plans, newPlan.plans]);
//       setShowModal(false);
//       setFormData({ email: email, title: '', currentamt: '', goal: '', date: new Date().toISOString(), color: '' });
//     } catch (error) {
//       console.error('Failed to submit new plan:', error.message);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   const openFormToEdit = (plan) => {
//     setEditData({
//       email:email,
//       id: plan._id,
//       currentamt: plan.CurrentAmount,
//       color: plan.Color
//     });
//     setisEditing(true);

//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;

//     setEditData(prevFormData => ({
//       ...prevFormData,
//       [name]: value
//     }));
//     console.log(name, value);
//     console.log(editData)

//   };

//   const handleEditSubmit=()=>{
//     e.preventDefault();
//     console.log(editData);
//   }

//   return (
//     <div className="p-6 bg-gray-400 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Planning</h2>
//         <button onClick={() => setShowModal(true)} className="text-sm text-blue-500">View All</button>
//       </div>
//       {plans?.map((plan,key) => (
//         <div key={plan.id} className="mb-4 last:mb-0" onClick={() => openFormToEdit(plan)}>
//           <div className="flex justify-between items-center mb-1">
//             <h3 className="font-medium">{plan.Title}</h3>
//             <span className="text-sm text-gray-600">{`$${plan.CurrentAmount} / $${plan.GoalTarget}`}</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
//             <div className={`h-2.5 rounded-full ${plan.Color}`} style={{ width: `${(plan.CurrentAmount / plan.GoalTarget) * 100}%` }}></div>
//           </div>
//         </div>
//       ))}

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-5 rounded-lg">
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="title">Title</label>
//                 <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <label htmlFor="goal">Goal Amount</label>
//                 <input type="number" id="goal" name="goal" value={formData.goal} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <label htmlFor="currentamt">Current Amount</label>
//                 <input type="number" id="currentamt" name="currentamt" value={formData.currentamt} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <label htmlFor="color">Color</label>
//                 <select id="color" name="color" value={formData.color} onChange={handleInputChange} required>
//                   {colorOptions.map(option => (
//                     <option key={option.value} value={option.value}>{option.label}</option>
//                   ))}
//                 </select>
//               </div>
//               <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-3 rounded">Submit</button>
//               <button type="button" onClick={() => setShowModal(false)} className="ml-2 bg-red-500 text-white px-4 py-2 mt-3 rounded">Cancel</button>
//             </form>
//           </div>
//         </div>
//       )}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-5 rounded-lg">
//             <form onSubmit={handleEditSubmit}>
//               <div>
//                 <label htmlFor="currentamt">Current Amount</label>
//                 <input type="number" id="currentamt" name="currentamt" value={editData.currentamt} onChange={handleEditChange} required />
//               </div>
//               <div>
//                 <label htmlFor="color">Color</label>
//                 <select id="color" name="color" value={editData.color} onChange={handleEditChange} required>
//                   {colorOptions.map(option => (
//                     <option key={option.value} value={option.value}>{option.label}</option>
//                   ))}
//                 </select>
//               </div>
//               <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-3 rounded">Edit</button>
//               <button type="button" onClick={() => setisEditing(false)} className="ml-2 bg-red-500 text-white px-4 py-2 mt-3 rounded">Cancel</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Planning;

import React, { useState, useEffect } from "react";

const Planning = () => {
  const [plans, setPlans] = useState([]);
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    currentamt: "",
    color: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    goal: "",
    color: "bg-green-500",
    currentamt: "",
    date: new Date().toISOString(),
  });

  const colorOptions = [
    { label: "Green", value: "bg-green-500" },
    { label: "Red", value: "bg-red-500" },
    { label: "Blue", value: "bg-blue-500" },
    { label: "Yellow", value: "bg-yellow-500" },
  ];

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`/api/targets/plans?email=${email}`);
      if (!response.ok) throw new Error("Failed to fetch plans");
      const data = await response.json();
      setPlans(data.plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const openFormToAdd = () => {
    setIsEditing(false);
    setFormData({
      title: "",
      goal: "",
      currentamt: "",
      color: "bg-green-500",
      date: new Date().toISOString(),
    });
    setShowModal(true);
  };

  const openFormToEdit = (plan) => {
    setIsEditing(true);
    setEditData({
      id: plan._id,
      currentamt: plan.CurrentAmount,
      color: plan.Color,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditData({ ...editData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = isEditing ? { email, ...editData } : { ...formData, email };
    const url = isEditing ? `/api/targets/plans` : "/api/targets/plans";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const updatedPlan = await response.json();
      fetchPlans();
      setShowModal(false);
      setFormData({
        title: "",
        goal: "",
        currentamt: "",
        color: "",
        date: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to submit plan:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  //   return (
  //     <div className="p-6 bg-gray-400 rounded-lg shadow">
  //       <div className="flex justify-between items-center mb-4">
  //         <h2 className="text-lg font-semibold">Planning</h2>
  //         <button onClick={openFormToAdd} className="text-sm text-blue-500">
  //           Add New Plan
  //         </button>
  //       </div>
  //       {plans.map((plan) => (
  //         <div
  //           key={plan._id}
  //           onClick={() => openFormToEdit(plan)}
  //           className="mb-4 last:mb-0"
  //         >
  //           <div className="flex justify-between items-center mb-1">
  //             <h3 className="font-medium">{plan.Title}</h3>
  //             <span className="text-sm text-gray-600">{`$${plan.CurrentAmount} / $${plan.GoalTarget}`}</span>
  //           </div>
  //           <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
  //             <div
  //               className={`h-2.5 rounded-full ${plan.Color}`}
  //               style={{
  //                 width: `${(plan.CurrentAmount / plan.GoalTarget) * 100}%`,
  //               }}
  //             ></div>
  //           </div>
  //         </div>
  //       ))}

  //       {showModal && (
  //         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
  //           <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-4">
  //             <form onSubmit={handleSubmit} className="space-y-6">
  //               {!isEditing ? (
  //                 <>
  //                   <div>
  //                     <label
  //                       htmlFor="title"
  //                       className="block text-sm font-medium text-gray-700"
  //                     >
  //                       Title:
  //                     </label>
  //                     <input
  //                       type="text"
  //                       name="title"
  //                       id="title"
  //                       value={formData.title}
  //                       onChange={handleInputChange}
  //                       required
  //                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //                     />
  //                   </div>
  //                   <div>
  //                     <label
  //                       htmlFor="goal"
  //                       className="block text-sm font-medium text-gray-700"
  //                     >
  //                       Goal Amount:
  //                     </label>
  //                     <input
  //                       type="number"
  //                       name="goal"
  //                       id="goal"
  //                       value={formData.goal}
  //                       onChange={handleInputChange}
  //                       required
  //                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //                     />
  //                   </div>
  //                   <div>
  //                     <label
  //                       htmlFor="currentamt"
  //                       className="block text-sm font-medium text-gray-700"
  //                     >
  //                       Current Amount:
  //                     </label>
  //                     <input
  //                       type="number"
  //                       name="currentamt"
  //                       id="currentamt"
  //                       value={formData.currentamt}
  //                       onChange={handleInputChange}
  //                       required
  //                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //                     />
  //                   </div>
  //                 </>
  //               ) : (
  //                 <>
  //                   <div>
  //                     <label
  //                       htmlFor="currentamt"
  //                       className="block text-sm font-medium text-gray-700"
  //                     >
  //                       Edit Current Amount:
  //                     </label>
  //                     <input
  //                       type="number"
  //                       name="currentamt"
  //                       id="currentamt"
  //                       value={editData.currentamt}
  //                       onChange={handleInputChange}
  //                       required
  //                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //                     />
  //                   </div>
  //                 </>
  //               )}
  //               <div>
  //                 <label
  //                   htmlFor="color"
  //                   className="block text-sm font-medium text-gray-700"
  //                 >
  //                   Color:
  //                 </label>
  //                 <select
  //                   name="color"
  //                   id="color"
  //                   value={isEditing ? editData.color : formData.color}
  //                   onChange={handleInputChange}
  //                   required
  //                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
  //                 >
  //                   {colorOptions.map((option) => (
  //                     <option key={option.value} value={option.value}>
  //                       {option.label}
  //                     </option>
  //                   ))}
  //                 </select>
  //               </div>
  //               <div className="flex justify-end space-x-4">
  //                 <button
  //                   type="button"
  //                   onClick={() => setShowModal(false)}
  //                   className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
  //                 >
  //                   Cancel
  //                 </button>
  //                 <button
  //                   type="submit"
  //                   className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
  //                 >
  //                   {isEditing ? "Edit" : "Submit"}
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };
  return (
    <div className="p-6 bg-gray-400 rounded-lg shadow h-48 w-[365px]">
      <div className="sticky top-0 bg-gray-400 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Planning</h2>
          <button
            onClick={openFormToAdd}
            className="bg-black hover:bg-blue-700 text-white p-1 rounded-full shadow-lg flex items-center justify-center w-10 h-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="overflow-auto no-scrollbar h-24">
        {plans.length > 0 ? (
          plans.map((plan) => (
            <div
              key={plan._id}
              onClick={() => openFormToEdit(plan)}
              className="mb-4 last:mb-0"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{plan.Title}</h3>
                <span className="text-sm text-gray-600">{`$${plan.CurrentAmount} / $${plan.GoalTarget}`}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`h-2.5 rounded-full ${plan.Color}`}
                  style={{
                    width: `${(plan.CurrentAmount / plan.GoalTarget) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <div className="animate pulse">
          <div className="flex justify-between items-center mb-1">
                <div className="h-3 bg-gray-300 rounded w-14"></div>
                <div className="h-3 bg-gray-300 rounded w-12 ml-36"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className={`h-2.5 rounded-full bg-red-500`}
                style={{
                  width: `${(100 / 1000) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-white font-bold text-center mt-5">Add plans</p>
            </div>
          
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isEditing ? (
                <>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title:
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="goal"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Goal Amount:
                    </label>
                    <input
                      type="number"
                      name="goal"
                      id="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="currentamt"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Amount:
                    </label>
                    <input
                      type="number"
                      name="currentamt"
                      id="currentamt"
                      value={formData.currentamt}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="currentamt"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Edit Current Amount:
                    </label>
                    <input
                      type="number"
                      name="currentamt"
                      id="currentamt"
                      value={editData.currentamt}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </>
              )}
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color:
                </label>
                <select
                  name="color"
                  id="color"
                  value={isEditing ? editData.color : formData.color}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {colorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                >
                  {isEditing ? "Edit" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planning;
