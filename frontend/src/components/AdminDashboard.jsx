import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/admin/user`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                }
            );
            setUsers(data);
        } catch (err) {
            toast.error("Failed to load users");
        }
    };

    const deleteUser = async (id) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/admin/user/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                }
            );
            toast.success("User deleted successfully!");
            fetchUsers();
        } catch {
            toast.error("Failed to delete user. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-12 bg-cover bg-center "
            style={{ backgroundImage: "url('/bg_image_login_new.png')" }}>
            <div className="flex justify-between mb-12 p-4 border-b-4 border-[#b1f392] items-center ">
                <h1 className="text-lg md:text-4xl font-semibold md:font-extrabold text-white">
                    👤 Admin Dashboard
                </h1>
                <button onClick={() => navigate('/login')} className="bg-red-600 text-sm sm:text-xl hover:bg-red-700 text-white font-medium sm:font-semibold py-1 px-2 sm:py-3 sm:px-5 rounded-lg transition duration-150 ease-in-out shadow-md">
                    Logout
                </button>

            </div>

            {users.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-xl shadow-lg">
                    <p className="text-xl text-gray-500">No users found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {users.map((u) => (
                        <div
                            key={u._id}
                            className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 ease-in-out border-t-4 border-[#b1f392]"
                        >
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-gray-900 truncate mb-1">
                                    {u.username}
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    <span className="font-semibold text-gray-600">Email:</span> {u.email}
                                </p>

                                <div className="mb-4">
                                    <span
                                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${u.role === "admin"
                                            ? "bg-purple-100 text-purple-800"
                                            : "bg-green-100 text-green-800"
                                            }`}
                                    >
                                        {u.role}
                                    </span>
                                </div>

                                <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
                                    <button
                                        onClick={() => navigate(`/admin/todos?user=${u._id}`)}
                                        className="w-full text-center bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                                    >
                                        View Todos
                                    </button>

                                    <button
                                        onClick={() => deleteUser(u._id)}
                                        className="w-full text-center bg-red-500 text-white font-medium py-2 rounded-lg hover:bg-red-600 transition duration-150 shadow-md"
                                    >
                                        Delete User
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}