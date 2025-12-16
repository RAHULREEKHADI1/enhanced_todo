import React, { useState } from "react";
import toast from "react-hot-toast";
import Header from "./Header";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-linear-to-r from-[#E8E4FF] via-[#6C5CE7] to-[#231670]">
      <Header/>

      <main className="flex-1 px-4 md:px-16 py-8 flex flex-col md:flex-row gap-8 ">
        <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-6 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#4a7c2b]">
            Get in Touch
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            Have questions, feedback, or want to collaborate? Fill out the form, and 
            our team will get back to you as soon as possible.
          </p>

          <div className="mt-6 text-gray-700 text-sm md:text-base">
            <p><strong>Email:</strong> support@todolist.com</p>
            <p><strong>Phone:</strong> +91 123 456 7890</p>
            <p><strong>Address:</strong> 123 Todo Street, Productivity City, IN</p>
          </div>
        </div>

        <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-6 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#4a7c2b]">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#89DA63]"
              required
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#89DA63]"
              required
            />
            <textarea 
              placeholder="Your Message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#89DA63] resize-none h-32"
              required
            />
            <button 
              type="submit"
              className="bg-[#89DA63] text-white py-2 rounded-xl hover:bg-[#7cb347] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      <footer className="text-white text-center py-6 mt-auto bg-center bg-cover border-t border-t-[#b1f392]"
      style={{ backgroundImage: "url('/bg_image_login_new.png')" }}>
        © 2025 TodoList. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
