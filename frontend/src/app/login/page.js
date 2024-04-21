"use client"
// import Link from "next/link";
// import React, {useEffect} from "react";
// import {useRouter} from "next/navigation";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// const Login=()=>{
//     const router = useRouter();
//     const [user, setUser] = React.useState({
//         email: "",
//         password: "",
       
//     })
//     const [buttonDisabled, setButtonDisabled] = React.useState(false);
//     const [loading, setLoading] = React.useState(false);


//     const onLogin = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.post("/api/users/login", user);
//             console.log("Login success", response.data);
//             toast.success("Login success");
//             router.push("/profile");
//         } catch (error) {
//             console.log("Login failed", error.message);
//             toast.error(error.message);
//         } finally{
//         setLoading(false);
//         }
//     }

//     useEffect(() => {
//         if(user.email.length > 0 && user.password.length > 0) {
//             setButtonDisabled(false);
//         } else{
//             setButtonDisabled(true);
//         }
//     }, [user]);

//     return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//         <h1>{loading ? "Processing" : "Login"}</h1>
//         <hr />
        
//         <label htmlFor="email">email</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="email"
//             type="text"
//             value={user.email}
//             onChange={(e) => setUser({...user, email: e.target.value})}
//             placeholder="email"
//             />
//         <label htmlFor="password">password</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="password"
//             type="password"
//             value={user.password}
//             onChange={(e) => setUser({...user, password: e.target.value})}
//             placeholder="password"
//             />
//             <button
//             onClick={onLogin}
//             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
//             <Link href="/signup">Visit Signup page</Link>
//         </div>
//     )

// }

//     export default Login;


import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showResetForm, setShowResetForm] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error) {
            console.log("Login failed", error.message);
            toast.error("Login failed: " + error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        setShowResetForm(true);
    };

    const resetPassword = async () => {
        try {
            const response = await axios.post("/api/users/passwordreset",{email:user.email});
            console.log("Reset password link sent", response.data);
            toast.success("Reset password link sent to your email");
        } catch (error) {
            console.log("Reset password failed", error.message);
            toast.error("Reset password failed: " + error.response?.data?.error || error.message);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            
            <label htmlFor="email">Email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
            />
            <button
                onClick={onLogin}
                disabled={buttonDisabled}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Login Here
            </button>
            <button onClick={handleForgotPassword} className="p-2 border border-gray-300 rounded-lg mb-2 text-blue-700">Forgot Password?</button>
            {showResetForm && (
                <div>
                    <button
                        onClick={resetPassword}
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    >
                        Reset Password
                    </button>
                </div>
            )}
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    );
};

export default Login;
