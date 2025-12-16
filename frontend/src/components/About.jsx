import React from "react";
import Header from "./Header";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header/>

      <main className="flex-1 px-4 md:px-16 py-8 bg-linear-to-r from-[#E8E4FF] via-[#6C5CE7] to-[#231670] "
      >
        <section className="max-w-5xl mx-auto rounded-xl shadow-lg p-6 md:p-12 bg-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#b1f392]">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-6 text-sm md:text-base leading-relaxed">
            TodoList is designed to help you organize your daily tasks efficiently. 
            Our mission is to make productivity simple, enjoyable, and accessible 
            for everyone. Whether you are managing personal tasks or working in a team, 
            TodoList ensures you stay on top of your priorities.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#b1f392]">
            Our Vision
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            We envision a world where people can focus on what truly matters by managing 
            their tasks effortlessly. TodoList aims to reduce stress and increase 
            productivity by keeping your tasks organized and actionable.
          </p>
        </section>

        <section className="mt-10 max-w-5xl mx-auto text-center ">
          <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#b1f392]">
            Why Choose Us?
          </h3>
          <p className="text-white text-sm md:text-base">
            Simple interface, intuitive design, and cross-device sync for all your todos.
          </p>
        </section>
      </main>

      <footer className="text-white text-center py-6 mt-auto bg-center bg-cover border-t border-t-[#b1f392]"
      style={{ backgroundImage: "url('/bg_image_login_new.png')" }}>
        © 2025 TodoList. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
