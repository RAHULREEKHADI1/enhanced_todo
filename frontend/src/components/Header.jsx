import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";


export default function Header() {
  const navigateTo = useNavigate();
  const role = localStorage.getItem('role');

  const [token, setToken] = useState(localStorage.getItem('jwt'))
  console.log(token, 'dfghjk');

  const location = useLocation();

  const logout = async () => {
    try {
      console.log("am i coming here");

      await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`);
      console.log('is this good');

      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
      localStorage.removeItem('role')
      setToken(null)
    } catch (err) {
      toast.error("Error logging out");
      console.log(err);

    }
  };

  const isTodoPage = location.pathname === "/todo";
  let headingText = "TodoList";
  
  if (location.pathname.startsWith("/admin/dashboard")) {
      headingText = "👤 Admin Dashboard";
  } else if (location.pathname.startsWith("/about")) {
      headingText = "About Us";
  } else if (location.pathname.startsWith("/contact")) {
      headingText = "Contact Us";
  } else if (location.pathname === "/") {
      headingText = "Home";
  }


  return (
    <header className={`px-4 md:px-8 lg:px-16 border-b border-b-[#b1f392] text-white py-6 bg-cover bg-center`}
      style={{ backgroundImage: "url('/bg_image_login_new.png')" }}
    >
      <div className=" sm:mx-4 flex justify-between  items-center">
        <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4">
          {headingText!=="👤 Admin Dashboard" ?<div className='h-10 w-10 lg:h-15 lg:w-15 rounded-full relative bg-cover bg-center'
            style={{ backgroundImage: "url('/my_todo_image.png')" }}
          ></div>:""}
          <div className="py-2 font-semibold text-sm sm:text-2xl tracking-wide text-[#b1f392] hidden sm:block ">
             {headingText}
          </div>
        </div>

        <div className="flex items-center lg:gap-16 md:gap-8 sm:gap-6 gap-4 text-sm sm:text-lg">
          {role==="admin" ? 
          (headingText !== "👤 Admin Dashboard" && <button onClick={() => navigateTo("/admin/dashboard")} className="hover:underline">Admin Dashboard</button>)
           :
          (headingText !== "TodoList" &&  <button onClick={() => navigateTo("/todo")} className="hover:underline">Your Todos</button>)}  
          {headingText!=="Home" && <button onClick={() => navigateTo("/")} className="hover:underline">
            Home
          </button>}
          {headingText!=="About Us" &&<button onClick={() => navigateTo("/about")} className="hover:underline">
            About
          </button>}
          {headingText!=="Contact Us" &&<button onClick={() => navigateTo("/contact")} className="hover:underline">
            Contact
          </button>}

          {(token || (isTodoPage || headingText==="👤 Admin Dashboard" ))&& (
            <button
              className="bg-[#CF3620] py-1 lg:py-2 text-white rounded-lg px-2 lg:px-6 cursor-pointer shadow-[0_8px_15px_rgba(207,54,32,0.4)]"
              onClick={logout}
            >
              Logout
            </button>
          )}

          {!token && (
            <button
              className="bg-[#CF3620] py-1 lg:py-3 text-white px-2 lg:px-4 cursor-pointer rounded-lg shadow-[0_8px_15px_rgba(207,54,32,0.4)]"
              onClick={() => navigateTo("/signup")}
            >
              Start for free
            </button>
          )}

        </div>
      </div>
    </header>
  );
}