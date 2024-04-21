"use client";

// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";


// export default function VerifyEmailPage() {

//     const [token, setToken] = useState("");
//     const [verified, setVerified] = useState(false);
//     const [error, setError] = useState(false);
//     const [emailType, setEmailType] = useState("");
//     const verifyUserEmail = async () => {
//         try {
//             await axios.post('/api/users/verifyemail', {token,emailType})
//             setVerified(true);
//         } catch (error) {
//             setError(true);
//             console.log(error);
            
//         }

//     }

//     useEffect(() => {
//         const queryParams = new URLSearchParams(window.location.search);
//         const url=queryParams.get('token') || "";
//         setToken(url);
//         const type=queryParams.get('type') || "";
//         console.log(type);
//         setEmailType(type);
//     }, []);


//     useEffect(() => {
//         if(token.length > 0) {
//             verifyUserEmail();
//         }
//     }, [token]);

//     return(
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">

//             <h1 className="text-4xl">Verify Email</h1>
//             <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

//             {verified && (
//                 <div>
//                     <h2 className="text-2xl">Email Verified</h2>
//                     <Link href="/login">
//                         Login
//                     </Link>
//                 </div>
//             )}
//             {error && (
//                 <div>
//                     <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
//                 </div>
//             )}
//         </div>
//     )

// }


import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [emailType, setEmailType] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post('/api/users/verifyemail', { token, emailType: "VERIFY",newPassword});
            setVerified(true);
            console.log(response.data.message);
        } catch (error) {
            setError(error.response?.data?.error || "An error occurred");
            console.log(error);
        }
    };

    const resetUserPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            console.log(newPassword)
            const response = await axios.post('/api/users/verifyemail', { token, emailType: "RESET", newPassword });
            setVerified(true);
            console.log(response.data.message);
        } catch (error) {
            setError(error.response?.data?.error || "An error occurred");
            console.log(error);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setToken(queryParams.get('token') || "");
        setEmailType(queryParams.get('type') || "");
    }, []);

    useEffect(() => {
        if (token && emailType === "VERIFY") {
            verifyUserEmail();
        }
    }, [token, emailType]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            {emailType === "RESET" && (
                <>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="m-2"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="m-2"
                    />
                    <button onClick={resetUserPassword} className="bg-blue-500 text-white p-2 rounded">Reset Password</button>
                </>
            )}

            {verified && (
                <div>
                    <h2 className="text-2xl">{emailType === "VERIFY" ? "Email Verified" : "Password Reset Successfully"}</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">{error}</h2>
                </div>
            )}
        </div>
    );
}
