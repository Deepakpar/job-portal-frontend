import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="font-bold text-xl">JobPortal</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-sm">Jobs</Link>
          {user ? (
            <>
              {user.role === "user" && <Link to="/user/dashboard" className="text-sm">Dashboard</Link>}
              {(user.role === "recruiter" || user.role === "admin") && <Link to="/recruiter/dashboard" className="text-sm">Recruiter</Link>}
              <button onClick={handleLogout} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm bg-blue-600 text-white px-3 py-1 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
