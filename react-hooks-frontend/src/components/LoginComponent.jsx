import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const role = await AuthService.login(username, password);
      if (role === "ADMIN" || role === "USER") {
        navigate("/members"); // ✅ redirects to member list
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input className="form-control" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input className="form-control mt-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary mt-3" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
