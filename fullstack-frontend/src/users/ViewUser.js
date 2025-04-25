import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    userName: "",
    email: "",
  });

  useEffect(() => {
    const getUser = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/user/${id}`);
          setUser(res.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
    getUser();
  }, [id]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">User Details</h2>

      <div className="space-y-4">
        <div>
          <p className="text-gray-700 font-medium">Name:</p>
          <p className="text-gray-900">{user.name}</p>
        </div>

        <div>
          <p className="text-gray-700 font-medium">Username:</p>
          <p className="text-gray-900">{user.userName}</p>
        </div>

        <div>
          <p className="text-gray-700 font-medium">Email:</p>
          <p className="text-gray-900">{user.email}</p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
