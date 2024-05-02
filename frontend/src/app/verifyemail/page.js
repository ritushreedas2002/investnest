"use client";

// import axios from 'axios';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';

// export default function VerifyEmailPage() {
//     const [token, setToken] = useState("");
//     const [verified, setVerified] = useState(false);
//     const [error, setError] = useState(false);
//     const [emailType, setEmailType] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     const verifyUserEmail = async () => {
//         try {
//             const response = await axios.post('/api/users/verifyemail', { token, emailType: "VERIFY",newPassword});
//             setVerified(true);
//             console.log(response.data.message);
//         } catch (error) {
//             setError(error.response?.data?.error || "An error occurred");
//             console.log(error);
//         }
//     };

//     const resetUserPassword = async () => {
//         if (newPassword !== confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//         }
//         try {
//             console.log(newPassword)
//             const response = await axios.post('/api/users/verifyemail', { token, emailType: "RESET", newPassword });
//             setVerified(true);
//             console.log(response.data.message);
//         } catch (error) {
//             setError(error.response?.error || "An error occurred");
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         const queryParams = new URLSearchParams(window.location.search);
//         setToken(queryParams.get('token') || "");
//         setEmailType(queryParams.get('type') || "");
//     }, []);

//     useEffect(() => {
//         if (token && emailType === "VERIFY") {
//             verifyUserEmail();
//         }
//     }, [token, emailType]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1 className="text-4xl">Verify Email</h1>
//             {emailType === "RESET" && (
//                 <>
//                     <input
//                         type="password"
//                         placeholder="New Password"
//                         value={newPassword}
//                         onChange={e => setNewPassword(e.target.value)}
//                         className="m-2"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Confirm Password"
//                         value={confirmPassword}
//                         onChange={e => setConfirmPassword(e.target.value)}
//                         className="m-2"
//                     />
//                     <button onClick={resetUserPassword} className="bg-blue-500 text-white p-2 rounded">Reset Password</button>
//                 </>
//             )}

//             {verified && (
//                 <div>
//                     <h2 className="text-2xl">{emailType === "VERIFY" ? "Email Verified" : "Password Reset Successfully"}</h2>
//                     <Link href="/login" passHref>Login</Link>
//                 </div>
//             )}
//             {error && (
//                 <div>
//                     <h2 className="text-2xl bg-red-500 text-black">{error}</h2>
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";


export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [emailType, setEmailType] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  

  useEffect(() => {
    
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window?.location?.search);
      setToken(queryParams.get("token") || "");
      setEmailType(queryParams.get("type") || "");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Please enter the password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please enter the confirm password"),
    }),
    onSubmit: (values) => {
      resetUserPassword(values.newPassword);
    },
  });

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token,
        emailType: "VERIFY",
      });
      setVerified(true);
      toast.success(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      toast.error("Verification failed");
    }
  };

  const resetUserPassword = async (newPassword) => {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token,
        emailType: "RESET",
        newPassword,
      });
      setVerified(true);
      toast.success("Password reset successfully");
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      toast.error("Password reset failed");
    }
  };

  useEffect(() => {
    if (token && emailType === "VERIFY") {
      verifyUserEmail();
    }
  }, [token, emailType]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Toaster />
      <h1 className="text-4xl font-bold mb-6">
        {verified ? "Success" : "Verify Email"}
      </h1>
      {emailType === "RESET" && !verified && (
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6 w-full max-w-xs"
        >
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              {...formik.getFieldProps("newPassword")}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.newPassword}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...formik.getFieldProps("confirmPassword")}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset Password
          </button>
        </form>
      )}
      {verified && (
        <div className="text-lg text-green-500">
          <p>
            {emailType === "VERIFY"
              ? "Email Verified"
              : "Password Reset Successfully"}
          </p>
          <Link
            href="/login"
            passHref
            className="text-indigo-600 hover:text-indigo-900"
          >
            Login
          </Link>
        </div>
      )}
      {error && <div className="text-lg text-red-500">{error}</div>}
    </div>
  );
}
