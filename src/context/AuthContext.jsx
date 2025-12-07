import React, { createContext, useEffect, useState } from "react";

import API from "../services/api";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      API.get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {});
    } catch {
      localStorage.removeItem("token");
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    try { setUser(userData || jwtDecode(token)); } catch { setUser(null); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
