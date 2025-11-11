import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

function LoginPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/login`, {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        setUser({ token: res.data.token, name: res.data.name });
      } else {
        const res = await axios.post(`${API_URL}/register`, form);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        setUser({ token: res.data.token, name: res.data.name });
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  }

  return (
    <div style={{
      maxWidth: 400,
      margin: "80px auto",
      padding: "30px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}>

      <h2 style={{ marginBottom: "20px", color: "#222" }}>
        {isLogin ? "Welcome Back! 🔐" : "Create Account ✨"}
      </h2>

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
        {!isLogin && (
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={onChange}
            required
            style={inputStyle}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={onChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            marginTop: "15px",
            padding: "12px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <p style={{ marginTop: "15px" }}>
        {isLogin ? "Don’t have an account?" : "Already registered?"}
      </p>

      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{
          border: "none",
          background: "transparent",
          color: "#007bff",
          cursor: "pointer",
          fontSize: "15px",
          textDecoration: "underline",
          marginTop: "4px"
        }}
      >
        {isLogin ? "Sign Up" : "Login"}
      </button>

    </div>
  );
}

const inputStyle = {
  marginBottom: "12px",
  padding: "12px",
  fontSize: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  outline: "none",
};

export default LoginPage;
