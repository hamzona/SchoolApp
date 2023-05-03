import React from "react";
import { Link } from "react-router-dom";

export default function NoUser() {
  return (
    <div>
      <Link to="/">Home</Link>
      You are not logged in
      <Link to="/singup">Singup</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}
