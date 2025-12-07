import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function CompanyProfile() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    API.get(`/company/${id}`).then(res => setCompany(res.data)).catch(()=>{});
  }, [id]);

  if (!company) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold">{company.name}</h2>
      <p className="mt-2">{company.description}</p>
    </div>
  );
}
