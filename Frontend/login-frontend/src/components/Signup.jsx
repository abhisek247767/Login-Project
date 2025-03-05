import React, { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import InputField from "../layout/InputField";
import Button from "../layout/Button";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError(""); // Clear previous errors
    const result = await signup(formData);

    if (result.error) {
      setError(result.error);
    } else {
      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <InputField label="Username" type="text" value={formData.username} onChange={(e) => handleChange(e)} name="username" />
      <InputField label="Email" type="email" value={formData.email} onChange={(e) => handleChange(e)} name="email" />
      <InputField label="Password" type="password" value={formData.password} onChange={(e) => handleChange(e)} name="password" />
      <Button text="Register" onClick={handleSubmit} />
    </div>
  );
}
