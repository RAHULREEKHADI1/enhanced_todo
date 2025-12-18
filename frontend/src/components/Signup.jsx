import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from 'framer-motion';


const Signup = ({ initialMode = 'signup' }) => {
    const [linkState, setLinkState] = useState(initialMode)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigateTo = useNavigate();
    const isSignup = linkState === 'signup'
    const [role, setRole] = useState('user');
    const [startParagraph, setStartParagraph] = useState(false);

    const headingText = "Welcome back";
    const paragraphText = "Access your tasks. Stay consistent. Continue your productivity journey. You're almost there.";
    const paragraphText2 = "Stay organized. Track your daily tasks. Build better habits. Everything in one place.";
    const headingText2 = "Create your space";

    const h1Letters = headingText.split(' ');
    const h1Letter = headingText2.split(' ');
    const pWords = paragraphText.split(' ');
    const pWord = paragraphText2.split(' ');

    const child = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const h1Container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const pContainer = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
            },
        },
    };
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/signup`,
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
            localStorage.setItem("role", role);

            navigateTo("/login");
            setLinkState('login');

            setUsername("");
            setEmail("");
            setPassword("");
            setRole('user')
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
                `${import.meta.env.VITE_API_URL}/user/login`,
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
            const userData = data.user || data.admin; 
        const role = userData?.role;
            

            localStorage.setItem("jwt", data.token);
            console.log("role", role);
            localStorage.setItem("role",role);
            

            console.log(data.token, 'data.token');

            navigateTo(role === 'admin' ? '/admin/dashboard' : '/welcome');
            console.log(role);

            toast.success(
                role === "admin"
                    ? "Admin logged in successfully"
                    : data.message || "User logged in successfully"
            );
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
        <div
            className='flex justify-center items-center p-6 min-h-screen relative bg-cover bg-center'
            style={{ backgroundImage: "url('/bg-image_login.avif')" }}
        >
            <div className='flex justify-between'>
                {isSignup ? <div className='flex flex-col justify-center'>
                    <div className="hidden lg:flex flex-col justify-center w-1/2 p-12  text-white rounded-l-2xl  transition-all duration-1200ms ease-out opacity-0 translate-y-4 animate-slowFadeSlide">

                        <motion.h1
                            key={`signup-heading`}
                            initial="hidden"
                            animate="visible"
                            variants={h1Container}
                            className="text-4xl font-bold leading-tight mb-4"
                            onAnimationComplete={() => setStartParagraph(true)}

                        >
                            {h1Letter.map((word, wIndex) => (
                                <span key={wIndex} className="inline-block mr-2">
                                    {Array.from(word).map((letter, lIndex) => (
                                        <motion.span
                                            key={lIndex}
                                            variants={child}
                                            style={{ display: "inline-block" }}
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </motion.h1>
                        <motion.p
                            className="text-lg opacity-90"
                            variants={pContainer}
                            initial="hidden"
                            animate={startParagraph ? "visible" : "hidden"}
                        >
                            {pWord.map((word, wordIndex) => (
                                <span key={wordIndex} className="inline-block mr-2">
                                    {Array.from(word).map((letter, letterIndex) => (
                                        <motion.span
                                            key={letterIndex}
                                            variants={child}
                                            style={{ display: "inline-block" }}
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </motion.p>

                    </div>
                </div> :
                    <div className='flex flex-col justify-center'>
                        <div className="hidden lg:flex flex-col justify-center w-1/2 p-12 text-white rounded-l-2xl transition-all duration-1200ms ease-out opacity-0 translate-y-4 animate-slowFadeSlide">
                            <motion.h1
                                key={`login-heading`}
                                initial="hidden"
                                animate="visible"
                                variants={h1Container}
                                className="text-4xl font-bold leading-tight mb-4"
                                onAnimationComplete={() => setStartParagraph(true)}

                            >
                                {h1Letters.map((word, wIndex) => (
                                    <span key={wIndex} className="inline-block mr-2">
                                        {Array.from(word).map((letter, lIndex) => (
                                            <motion.span
                                                key={lIndex}
                                                variants={child}
                                                style={{ display: "inline-block" }}
                                            >
                                                {letter}
                                            </motion.span>
                                        ))}
                                    </span>
                                ))}
                            </motion.h1>
                            <motion.p
                                className="text-lg opacity-90"
                                variants={pContainer}
                                initial="hidden"
                                animate={startParagraph ? "visible" : "hidden"}
                            >
                                {pWords.map((word, wordIndex) => (
                                    <span key={wordIndex} className="inline-block mr-2">
                                        {Array.from(word).map((letter, letterIndex) => (
                                            <motion.span
                                                key={letterIndex}
                                                variants={child}
                                                style={{ display: "inline-block" }}
                                            >
                                                {letter}
                                            </motion.span>
                                        ))}
                                    </span>
                                ))}
                            </motion.p>

                        </div>
                    </div>}
                <div className="flex flex-col gap-6 w-full max-w-md bg-linear-to-r from-[#38434b] via-[#151A1E] to-[#151A1E] p-8 rounded-xl border border-gray-100 shadow-lg bg-cover bg-center"
                    // style={{ backgroundImage: "url('/bg_image_login_page.jpg')" }}
                >
                    <div className="flex justify-center gap-4 text-center items-center">
                        <div className='h-8 w-8 lg:h-12 lg:w-12 rounded-full relative bg-cover bg-center'
                            style={{ backgroundImage: "url('/my_todo_image.png')" }}
                        ></div>
                        <h2 className="text-2xl text-[#b1f392] font-semibold">
                            {isSignup ? 'Sign Up' : 'Login'}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className={`flex flex-col gap-1 transition-all duration-500 ${isSignup ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <label htmlFor="username" className="text-[#b1f392] font-medium px-2 ">Username</label>
                            <div className='relative'>
                                {username === "" ? <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> : ''}
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border text-white border-gray-300 rounded-xl p-2 focus:outline-none placeholder:px-8 placeholder:text-white focus:ring-2 focus:ring-[#b1f392]  w-full"
                                />
                            </div>

                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-[#b1f392] font-medium px-2 ">Email</label>
                            <div className='relative'>
                                {email === "" ? <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " /> : ''}
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border text-white border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2  placeholder:px-8 placeholder:text-white focus:ring-[#b1f392]  w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-[#b1f392] font-medium px-2 ">Password</label>
                            <div className='relative'>
                                {password === "" ? <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> : ''}
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border text-white border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2  placeholder:px-8 placeholder:text-white focus:ring-[#b1f392]  w-full"
                                />

                            </div>
                        </div>
                    </div>

                    <button
                        className="bg-[#89da63] text-white w-full py-2 rounded-xl hover:bg-[#84a077] transition-colors"
                        onClick={isSignup ? handleRegister : handleLogin}
                    >
                        {isSignup ? 'Sign Up' : 'Login'}
                    </button>
                    <hr className="my-2 border-gray-300" />
                    {isSignup ?
                        <div className='flex flex-col gap-4 items-center justify-center'>
                            <div className='text-[#b1f392]'>
                                <p>Or sign in with</p>
                            </div>
                            <div className='flex gap-8'>
                                <a href={`${import.meta.env.VITE_API_URL}/auth/google`}>
                                    <FaGoogle className="text-red-500 w-10 h-10 cursor-pointer" />
                                </a>
                            </div>

                        </div>
                        :
                        <p className='hidden'></p>
                    }
                    <div className="text-center text-white flex flex-col gap-2">
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
                                        setStartParagraph(false);
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
                                            setStartParagraph(false);
                                        }}
                                    >
                                        Sign Up
                                    </span>
                                </p>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Signup;

