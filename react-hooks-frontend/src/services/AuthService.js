import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // This must match your backend

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
    }
    return response.data.role;
  } catch (error) {
    console.error("Login API failed:", error.response?.data || error.message);
    return null; // this triggers "Login failed" alert in LoginComponent
  }
};


const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export default { login, logout };
