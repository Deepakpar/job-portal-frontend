import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get(`/jobs/${id}`).then(res => setJob(res.data)).catch(()=>{});
  }, [id]);

  const apply = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login as user to apply");
    const fd = new FormData();
    if (file) fd.append("resume", file);
    try {
      const res = await API.post(`/applications/apply/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("Application submitted");
    } catch (err) {
      setMessage(err.response?.data?.message || "Apply failed");
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.company?.name}</p>
      <p className="mt-4">{job.description}</p>

      <form className="mt-6" onSubmit={apply}>
        <label className="block mb-2">Upload Resume (optional)</label>
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <div className="mt-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>
        </div>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
