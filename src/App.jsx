import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import UserDashboard from "./pages/UserDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CompanyProfile from "./pages/CompanyProfile";
import MyApplications from "./pages/MyApplications";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container py-8">
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/dashboard"
            element={
              <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications/my"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <MyApplications />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
