import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <div className="text-xl font-bold text-blue-600">MyLogo</div>

      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
          Home
        </Link>

        <Link to="/adduser" className="text-gray-700 hover:text-blue-600 font-medium">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add User
        </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
