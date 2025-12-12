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
    <header className={`px-4 md:px-8 lg:px-16 border-b border-b-[#b1f392] text-white py-6 bg-cover bg-center`}
    style={{ backgroundImage: "url('/bg_image_login_new.png')" }}
    >
      <div className=" sm:mx-4 flex justify-between  items-center">
        <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4">
          <div className='h-10 w-10 lg:h-15 lg:w-15 rounded-full relative bg-cover bg-center'
            style={{ backgroundImage: "url('/my_todo_image.png')" }}
          ></div>
          <div className="py-2 font-semibold text-sm sm:text-2xl tracking-wide text-[#b1f392] hidden sm:block ">
            TodoList
          </div>
        </div>

        <div className="flex items-center lg:gap-16 md:gap-8 sm:gap-6 gap-4 text-sm sm:text-lg">
          <a href="/">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          {isTodoPage ? <button
            className="bg-[#CF3620] py-1 lg:py-3 text-white rounded-lg px-2 lg:px-4 cursor-pointer shadow-[0_8px_15px_rgba(207,54,32,0.4)]"
            onClick={logout}
          >
            Logout
          </button> :
            <button
              className="bg-[#CF3620] py-1 lg:py-3 text-white px-2 lg:px-4 cursor-pointer rounded-lg shadow-[0_8px_15px_rgba(207,54,32,0.4)]"
              onClick={() => navigateTo("/signup")}
            >
              Start for free
            </button>
          }
        </div>
      </div>
    </header>
  );
}
