import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/jobs").then(res => setJobs(res.data)).catch(()=>{});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <div className="space-y-3">
        {jobs.map(j => (
          <div key={j._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{j.title}</p>
                <p className="text-sm">{j.location}</p>
              </div>
              <div>
                <a className="text-blue-600" href={`/company/${j.company?._id}`}>Company</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
