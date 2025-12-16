import React, { useState, useEffect, useMemo } from "react";
import { FaTrash, FaPlus, FaSignOutAlt, FaCheckCircle, FaRegCircle, FaListUl, FaSearch, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SidebarButton = ({ onClick, icon: Icon, children, isActive, colorClass, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between py-2 px-4 rounded-lg font-medium transition-all text-left w-full
      ${isActive
        ? `bg-${colorClass}-500 text-white shadow-lg shadow-${colorClass}-200`
        : `text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700`
      }`}
  >
    <span className="flex items-center gap-3">
        <Icon className="shrink-0" />
        {children}
    </span>
    {typeof count === 'number' && (
        <span className={`py-0.5 px-2 text-xs rounded-full font-bold ${isActive ? 'bg-white text-gray-800' : 'bg-gray-300 text-gray-700'}`}>
            {count}
        </span>
    )}
  </button>
);

const TodoSidebar = ({ onSearch, onAddTodo, filterCompleted, filterUncompleted, showAll, activeFilter, searchTerm, onClearSearch, onClearCompleted, counts }) => {

  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
    <aside className="sticky top-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col gap-6 h-fit border border-gray-100">
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Quick Search</label>
        <div className="relative flex items-center">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search tasks..."
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <FaSearch className="absolute left-3 text-gray-400" />
            {searchTerm && (
                <FaTimes 
                    className="absolute right-3 text-gray-500 hover:text-red-500 cursor-pointer" 
                    onClick={onClearSearch}
                />
            )}
        </div>
      </div>

      <button
        onClick={onAddTodo}
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98] font-bold"
      >
        <FaPlus /> New Task
      </button>

      <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Filter Tasks</h3>
        
        <SidebarButton
          onClick={showAll}
          icon={FaListUl}
          isActive={activeFilter === "all"}
          colorClass="gray"
          count={counts.all}
        >
          All Tasks
        </SidebarButton>

        <SidebarButton
          onClick={filterUncompleted}
          icon={FaRegCircle}
          isActive={activeFilter === "uncompleted"}
          colorClass="blue"
          count={counts.uncompleted}
        >
          Pending
        </SidebarButton>

        <SidebarButton
          onClick={filterCompleted}
          icon={FaCheckCircle}
          isActive={activeFilter === "completed"}
          colorClass="green"
          count={counts.completed}
        >
          Completed
        </SidebarButton>
      </div>

      {counts.completed > 0 && (
          <button 
              onClick={onClearCompleted}
              className="flex items-center justify-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow transition-colors"
          >
              <FaTrash /> Clear {counts.completed} Completed
          </button>
      )}
    </aside>
  );
};

const Todo = () => {
  const navigateTo = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterTerm, setFilterTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  const taskCounts = useMemo(() => ({
    all: todos.length,
    completed: todos.filter(t => t.completed).length,
    uncompleted: todos.filter(t => !t.completed).length,
  }), [todos]);

  const toggleTodoOptimistic = async (id) => {
    setError(null);

    const originalTodo = todos.find((t) => t._id === id);
    if (!originalTodo) return;
    
    const newCompletedStatus = !originalTodo.completed; 
    
    setTodos((prevTodos) =>
      prevTodos.map((t) => 
        t._id === id ? { ...t, completed: newCompletedStatus } : t
      )
    );
    
    try {
      const jwt = localStorage.getItem("jwt");
      
      await axios.put(
        `${import.meta.env.VITE_API_URL}/todo/update/${id}`,
        { completed: newCompletedStatus },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update todo status (Reverting change)");
      
      setTodos((prevTodos) => 
        prevTodos.map((t) => 
          t._id === id ? { ...t, completed: originalTodo.completed } : t
        )
      );
    }
  };
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        navigateTo("/login");
        return;
      }
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/todo/fetch`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setTodos(response.data.todos || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async () => {
    if (!newTodo.trim()) return;
    setError(null);

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/todo/create`,
        { title: newTodo, completed: false },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      setTodos((prevTodos) => [...prevTodos, response.data.newTodo]);
      setNewTodo("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create todo");
    }
  };

  const deleteTodo = async (id) => {
    setError(null);
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.delete(`${import.meta.env.VITE_API_URL}/todo/delete/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      setTodos((prevTodos) => prevTodos.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete todo");
    }
  };
  
  // FIXED: Iterate and call the working single-delete endpoint for each completed task
  const clearCompletedTodos = async () => {
      setError(null);
      const completedTasks = todos.filter(t => t.completed);
      if (completedTasks.length === 0) return;

      const userConfirmed = window.confirm(`Are you sure you want to delete ${completedTasks.length} completed task(s)?`);
      if (!userConfirmed) return;
      
      // Optimistic state update: Filter out completed tasks immediately
      setTodos((prevTodos) => prevTodos.filter(t => !t.completed));
      
      const jwt = localStorage.getItem("jwt");
      let deletionFailed = false;

      for (const task of completedTasks) {
          try {
              await axios.delete(`${import.meta.env.VITE_API_URL}/todo/delete/${task._id}`, {
                  headers: { Authorization: `Bearer ${jwt}` },
              });
          } catch (err) {
              console.error(`Failed to delete task ${task._id}:`, err);
              deletionFailed = true;
          }
      }

      if (deletionFailed) {
          setError("One or more completed tasks failed to delete. Please refresh to sync.");
          fetchTodos(); // Re-fetch to synchronize state
      } else {
          // If the filter was on 'completed', switch to 'all' or 'uncompleted'
          if (filterType === 'completed') {
              showAll();
          }
      }
  };

  const handleSearch = (term) => {
    setFilterTerm(term);
  };
  
  const handleClearSearch = () => {
    setFilterTerm("");
  };

  const showCompleted = () => {
    setFilterTerm("");
    setFilterType("completed");
  };

  const showUncompleted = () => {
    setFilterTerm("");
    setFilterType("uncompleted");
  };

  const showAll = () => {
    setFilterType("all");
  };

  const handleAddTodo = () => createTodo();

  const filteredTodos = useMemo(() => {
    let result = todos;

    if (filterType === "completed") {
      result = result.filter((t) => t.completed);
    } else if (filterType === "uncompleted") {
      result = result.filter((t) => !t.completed);
    }

    if (filterTerm) {
      const lowerCaseTerm = filterTerm.toLowerCase();
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(lowerCaseTerm)
      );
    }

    return result;
  }, [todos, filterType, filterTerm]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createTodo();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigateTo("/login");
  };

  const backgroundStyle = {
    backgroundImage: "url('/bg_image_login_new.png')",
    backgroundAttachment: 'fixed',
  };

  return (
    <div
      className='min-h-screen p-4 md:p-8 bg-gray-50'
      style={backgroundStyle}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        <div className="w-full md:w-[300px] shrink-0">
          <TodoSidebar
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}
            onAddTodo={handleAddTodo}
            filterCompleted={showCompleted}
            filterUncompleted={showUncompleted}
            showAll={showAll}
            activeFilter={filterType}
            searchTerm={filterTerm}
            onClearCompleted={clearCompletedTodos}
            counts={taskCounts}
          />
        </div>

        <div className="flex-1 p-6 md:p-8 bg-white border border-gray-200 rounded-xl shadow-2xl backdrop-blur-sm bg-opacity-90">

          <header className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-3xl font-extrabold text-gray-800">
              <span className="text-green-600">My</span> Tasks
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition-colors"
              title="Logout"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </header>

          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex mb-8 rounded-lg shadow-md overflow-hidden bg-gray-100 border border-gray-300">
            <input
              className="py-3 px-4 flex-1 text-lg focus:outline-none placeholder-gray-500 bg-transparent"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              onClick={createTodo}
              className="p-3 bg-green-500 text-white hover:bg-green-600 transition-colors disabled:opacity-50"
              title="Add Todo"
              disabled={!newTodo.trim() || loading}
            >
              <FaPlus size={20} />
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading todos...</p>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredTodos.length === 0 ? (
                <p className="text-center text-gray-500 p-8 border border-dashed rounded-lg">
                  {todos.length === 0 
                    ? "Start by adding your first task!" 
                    : "No tasks match your current filter."}
                </p>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo._id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-green-400"
                  >
                    <div className="flex gap-4 items-center flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodoOptimistic(todo._id)}
                        className="h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-green-500 cursor-pointer accent-green-500"
                      />
                      <span
                        className={`text-lg font-medium truncate ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }`}
                        title={todo.title}
                      >
                        {todo.title}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-400 hover:text-red-600 p-1 rounded-full transition-colors ml-4 shrink-0"
                      title="Delete Todo"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm font-semibold">
            You have <span className="text-green-600 font-bold">{taskCounts.uncompleted}</span> pending {taskCounts.uncompleted === 1 ? 'task' : 'tasks'} remaining.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;