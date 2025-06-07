import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService"; // create this next

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const role = await AuthService.login(username, password);
    if (role === "ADMIN") navigate("/admin");
    else if (role === "USER") navigate("/user");
    else alert("Invalid credentials");
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
