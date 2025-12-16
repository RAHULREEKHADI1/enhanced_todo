import React, { useState } from "react";
import { FaPlus, FaCheckCircle, FaRegCircle } from "react-icons/fa";

const TodoSidebar = ({ onSearch, onAddTodo, filterCompleted, filterUncompleted }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <aside className="w-full sm:w-64 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search todos..."
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <button
        onClick={onAddTodo}
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded shadow transition-all"
      >
        <FaPlus /> Add Todo
      </button>

      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={filterCompleted}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded transition-all"
        >
          <FaCheckCircle /> Completed
        </button>
        <button
          onClick={filterUncompleted}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded transition-all"
        >
          <FaRegCircle /> Uncompleted
        </button>
      </div>
    </aside>
  );
};

export default TodoSidebar;
