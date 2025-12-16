import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const userId = params.get("user");

  useEffect(() => {
    if (!userId) return;

    const fetchTodos = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/user/${userId}/todo`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        setTodos(res.data);
      } catch (error) {
        toast.error("Failed to load user todos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [userId]);

  const deleteTodo = async (todoId) => {
    if (!confirm("Are you sure you want to delete this To-Do item?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/user/${userId}/todo/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      toast.success("Todo deleted successfully!");
      setTodos((prev) => prev.filter((t) => t._id !== todoId));
    } catch {
      toast.error("Failed to delete todo. Please try again.");
    }
  };

  const getStatusBadge = (completed) => {
    const status = completed ? "Completed" : "Pending";
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
    const colorClasses = completed
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
    return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 User To-Dos</h1>
      <p className="text-sm text-indigo-600 font-medium mb-6">
        Viewing Todos for User ID: **{userId}**
      </p>

      {loading && (
        <div className="p-10 text-center text-xl text-gray-500 bg-white shadow-md rounded-lg">
          Loading To-Dos...
        </div>
      )}

      {!loading && todos.length === 0 && (
        <div className="p-10 text-center bg-white shadow-md rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-xl text-gray-600">
            ✅ This user currently has no To-Dos.
          </p>
        </div>
      )}

      {!loading && todos.length > 0 && (
        <div className="grid gap-6">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-indigo-500 flex justify-between items-start transition duration-300 hover:shadow-xl"
            >
              <div className="grow pr-4">
                <div className="flex items-center mb-2">
                  <p className="font-bold text-lg text-gray-900 mr-3">
                    {todo.title}
                  </p>
                  {getStatusBadge(todo.completed)}
                </div>
                <p className="text-gray-600 text-sm">{todo.description || "No description provided."}</p>
              </div>

              <button
                className="shrink-0 bg-red-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}