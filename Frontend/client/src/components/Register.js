import React, { useState } from "react";
import axios from "axios";

// Register component for new user registration
const Register = () => {
  const [username, setUsername] = useState(""); // State to manage the username input
  const [password, setPassword] = useState(""); // State to manage the password input
  const [loading, setLoading] = useState(false); // State to manage the loading state (e.g., while registering)
  const [error, setError] = useState(""); // State to manage and display error messages
  const [success, setSuccess] = useState(""); // Error handling

  // Handle user registration
  const handleRegister = async () => {
    // Validate that both username and password are provided
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    // Clear previous error message and set loading state to true
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Send a POST request to the registration endpoint
      await axios.post(
        "http://localhost:5000/api/register",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      // Display a success message
      setSuccess("Registration successful. You can now login.");
      setUsername("");
      setPassword("");
    } catch (err) {
      // Handle errors and display an error message
      setError("Error: Must include gmail.com in your input. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        disabled={loading}
        className="btn btn-primary btn-block"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default Register;
