import React, { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/jobs").then(res => setJobs(res.data)).catch(()=>{});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map(j => <JobCard key={j._id} job={j} />)}
      </div>
    </div>
  );
}
