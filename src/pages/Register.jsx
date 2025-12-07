import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form className="w-full max-w-md bg-white p-6 rounded shadow" onSubmit={submit}>
        <h2 className="text-2xl mb-4">Register</h2>
        <input className="w-full p-2 border rounded mb-3" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="w-full p-2 border rounded mb-3" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="w-full p-2 border rounded mb-3" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="mb-3 w-full p-2 border rounded">
          <option value="user">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button className="w-full py-2 bg-green-600 text-white rounded">Register</button>
      </form>
    </div>
  );
}
