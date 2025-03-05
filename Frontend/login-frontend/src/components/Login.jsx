import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import InputField from "../layout/InputField";
import Button from "../layout/Button";

export default function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    const result = await login(credentials);

    if (result.error) {
      setError(result.error);
    } else {
      localStorage.setItem("token", result.token); 
      setIsAuthenticated(true); 
      navigate("/welcome");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <InputField label="Email" type="email" name="email" value={credentials.email} onChange={(e) => handleChange(e)} />
      <InputField label="Password" type="password" name="password" value={credentials.password} onChange={(e) => handleChange(e)}  />
      <Button text="Login" onClick={handleSubmit} />
    </div>
  );
}
