import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


export default function Header() {
  const navigateTo = useNavigate();

  const location = useLocation();

  const logout = async () => {
    try {
      console.log("am i coming here");
      
      await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`);
      console.log('is this good');
      
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (err) {
      toast.error("Error logging out");
      console.log(err);
      
    }
  };

  const isTodoPage = location.pathname === "/todo";


  return (
    <header className=" bg-[#231670] py-3 sm:px-16 text-white border-b border-b-white">
      <div className=" sm:mx-4 flex justify-around items-center">

        <div className="py-2 font-semibold text-sm sm:text-2xl tracking-wide">
          TodoList
        </div>
        <div className="flex items-center lg:gap-16 gap-4 text-sm sm:text-lg">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          {isTodoPage ? <button
            className="bg-[#CF3620] py-3 text-white rounded-sm sm:w-30 w-full px-2"
            onClick={logout}
          >
            Logout
          </button> :''
          }
        </div>
      </div>
    </header>
  );
}
