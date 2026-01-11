import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "60px", color: "#1d4ed8" }}>404</h1>
      <p style={{ fontSize: "20px" }}>Page Not Found</p>
      <Link to="/" style={{ fontSize: "18px", color: "#2563eb" }}>
        Go Back Home
      </Link>
    </div>
  );
}
