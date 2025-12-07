import React, { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.user);
      setLoading(false);
      // redirect based on role
      if (res.data.user.role === "user") navigate("/user/dashboard");
      else navigate("/recruiter/dashboard");
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form className="w-full max-w-md bg-white p-6 rounded shadow" onSubmit={submit}>
        <h2 className="text-2xl mb-4">Login</h2>
        <input className="w-full p-2 border rounded mb-3" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="w-full p-2 border rounded mb-3" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button className="w-full py-2 bg-blue-600 text-white rounded">{loading ? "Logging..." : "Login"}</button>
      </form>
    </div>
  );
}
