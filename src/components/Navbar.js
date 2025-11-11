import React from "react";

function Navbar({ user, setUser }) {
  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <nav
      style={{
        padding: "12px 24px",
        backgroundColor: "#0a66c2",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <span style={{ fontSize: "18px", fontWeight: "600" }}>
        👋 Welcome, {user.name}
      </span>

      <button
        onClick={logout}
        style={{
          padding: "8px 14px",
          fontSize: "14px",
          backgroundColor: "#ffffff",
          color: "#0a66c2",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#e3eeff")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ffffff")}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
