import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.company?.name || "Company"}</p>
      <p className="mt-2 text-sm">{job.location} • {job.jobType}</p>
      <div className="mt-3 flex justify-between items-center">
        <Link to={`/jobs/${job._id}`} className="text-blue-600">View</Link>
        <span className="text-sm text-gray-500">{job.applicationsCount || 0} apps</span>
      </div>
    </div>
  );
}
