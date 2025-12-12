import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Todo = () => {
  const navigateTo = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState(null);
  const numTodo = todos.filter(todo => !todo.completed).length;


  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      console.log(jwt);

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/todo/fetch`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setTodos(response.data.todos || []);
    } catch (err) {
      setError(err.message || "Failed to fetch todos");
    }
  };



  const createTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/todo/create`,
        { title: newTodo, completed: false },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (err) {
      setError(err.message || "Failed to create todo");
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/todo/update/${id}`,
        { ...todo, completed: !todo.completed },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (err) {
      setError(err.message || "Failed to update todo status");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createTodo();
    }
  }

  const deleteTodo = async (id) => {
    try {
      console.log(id);

      const jwt = localStorage.getItem("jwt");
      await axios.delete(`${import.meta.env.VITE_API_URL}/todo/delete/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete todo");
    }
  };

  return (
    <div
      className='flex justify-center p-8 min-h-screen relative bg-cover bg-center' 
      style={{ backgroundImage: "url('/bg_image_login_new.png')" }}
    >
      <div className="p-8 mt-8 flex flex-col gap-8 w-[550px] min-h-fit bg-[#becae7] border border-green-700 rounded-lg shadow-xl bg-cover bg-center"
        style={{ backgroundImage: "url('/bg_image_login_page.jpg')" }}
      >
        <div className="flex justify-center items-center gap-5 my-4">
          <div className='h-15 w-15 rounded-full relative bg-cover bg-center'
            style={{ backgroundImage: "url('/my_todo_image.png')" }}
          ></div>
          <h2 className="text-2xl md:text-4xl text-[#b1f392]  font-semibold">Todo Application</h2>
        </div>

        <div className="flex border border-[#E0E0E1] bg-gray-100 rounded-lg hover:border-2 hover:border-[#a6e789]   ">
          <div className="flex gap-4 items-center  w-full">
            <input
              className="py-3 px-4 flex-1  focus:outline-none placeholder-gray-500 placeholder:text-xl placeholder:font-semibold"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new Todo"
              onKeyDown={handleKeyDown}
            />
          </div>
          <FaPlus onClick={createTodo} className="bg-gray-400 text-white m-2 p-2 rounded-sm h-10 w-10 hover:-translate-y-1 transition-all duration-400" />
        </div>
        <hr className="my-2 text-white" />

        <div className="flex flex-col gap-4 ">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex justify-between items-center border rounded-xl p-3 bg-gray-200 hover:border-2 hover:border-[#a6e789] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-6 items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo._id)}
                  className="scale-150 ml-2 accent-blue-500"
                />
                <span
                  className={`text-lg ${todo.completed
                    ? "line-through text-gray-500"
                    : "text-[#4b4b4e]"
                    }`}
                >
                  {todo.title}
                </span>
              </div>

              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-600 hover:text-red-800 rounded-md hover:scale-125 transition-all duration-300"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center text-white">
          <div>Your remaining todos: {numTodo}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Todo;
