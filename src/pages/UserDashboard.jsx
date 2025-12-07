import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function UserDashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get("/applications/my").then(res => setApps(res.data)).catch(()=>{});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <div className="space-y-3">
        {apps.map(a => (
          <div key={a._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{a.job?.title}</p>
            <p className="text-sm">Status: {a.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
