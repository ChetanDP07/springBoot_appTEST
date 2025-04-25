import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  


  const getUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };
  const handleView = (id) => {
    navigate(`/viewuser/${id}`);
  };
  const confirmDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/${selectedUserId}`);
      setShowConfirm(false);
      setSelectedUserId(null);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedUserId(null);
  };
  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };

  if (loading) {
    return <p className="p-4 text-gray-600">Loading users...</p>;
  }


  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
              Username
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
              Reg Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-3 text-center text-sm text-gray-500"
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b text-sm text-gray-800">
                  {user.id}
                </td>
                <td className="px-6 py-3 border-b text-sm text-gray-800">
                  {user.userName}
                </td>
                <td className="px-6 py-3 border-b text-sm text-gray-800">
                  {user.name}
                </td>
                <td className="px-6 py-3 border-b text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="px-6 py-3 border-b text-sm text-gray-800">
                  {user.regDate}
                </td>
                <td className="px-6 py-3 border-b text-sm text-gray-800 space-x-2">
                  <button
                    onClick={() => handleView(user.id)}
                    className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    view
                  </button>
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <p className="text-lg mb-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

{/* <div>
 <Table columns={columns} />
</div> */}
    </div>
  );
};

export default Home;
