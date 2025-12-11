import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const Signup = ({ initialMode = 'signup' }) => {
    const [linkState, setLinkState] = useState(initialMode)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigateTo = useNavigate();
    const isSignup = linkState === 'signup'
    const renderUserAPI = "http://localhost:4000/user";


    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${renderUserAPI}/signup`,
                {
                    username,
                    email,
                    password
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            toast.success(data.message || "User registered successfully");

            localStorage.setItem("jwt", data.token);

            navigateTo("/login");
            setLinkState('login');

            setUsername("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.errors || "User registration failed!");
            } else {
                toast.error("Unexpected error occurred");
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${renderUserAPI}/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            localStorage.setItem("jwt", data.token);
            navigateTo("/todo");

            toast.success(data.message || "User logged in successfully");

            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.errors || "User login failed!");
            } else {
                toast.error("Unexpected error occurred");
            }
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-[#FEFDFC] p-6">
            <div className="flex flex-col gap-8 w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-3xl font-bold text-[#26221E]">TodoList</h1>
                    <h2 className="text-xl text-gray-700">
                        {isSignup ? 'Sign Up' : 'Login'}
                    </h2>
                </div>

                <div className="flex flex-col gap-4">
                    <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-500 ${isSignup ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <label htmlFor="username" className="text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#CF3620]"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#CF3620]"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#CF3620]"
                        />
                    </div>
                </div>

                <button
                    className="bg-[#CF3620] text-white w-full py-2 rounded hover:bg-[#e94a36] transition-colors"
                    onClick={isSignup ? handleRegister : handleLogin}
                >
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>

                <div className="text-center text-gray-600 mt-4 flex flex-col gap-2">
                    {isSignup ? (
                        <p>
                            Already signed up?{' '}
                            <span
                                className="text-[#CF3620] hover:underline cursor-pointer"
                                onClick={() => {
                                    setEmail('');
                                    setUsername('');
                                    setPassword('');
                                    setLinkState('login');
                                    navigateTo('/login');
                                }}
                            >
                                Go To Login
                            </span>
                        </p>
                    ) : (
                        <>
                            <p>
                                Don’t have an account?{' '}
                                <span
                                    className="text-[#CF3620] hover:underline cursor-pointer"
                                    onClick={() => {
                                        setEmail('');
                                        setPassword('');
                                        setLinkState('signup');
                                        navigateTo('/signup');
                                    }}
                                >
                                    Sign Up
                                </span>
                            </p>
                            <hr className="my-2 border-gray-300" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
