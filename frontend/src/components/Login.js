import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import LoginCSS from "../styles/login.module.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, error] = useLogin();
  function hendleSubmit(e) {
    e.preventDefault();

    login(email, password);
  }

  return (
    <div className={LoginCSS.container}>
      <Link className={LoginCSS.back} to="/">
        BACK
      </Link>

      <div className={LoginCSS["children-container"]}>
        <div className={LoginCSS.title}>Login</div>

        <form
          className={LoginCSS.form}
          onSubmit={(e) => {
            hendleSubmit(e);
          }}
        >
          <div className={LoginCSS["input-container"]}>
            <label className={LoginCSS.label} htmlFor="email">
              Email:{" "}
            </label>
            <input
              id="email"
              className={LoginCSS.loginInput}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
          <div className={LoginCSS["input-container"]}>
            <label className={LoginCSS.label} htmlFor="password">
              Password:{" "}
            </label>
            <input
              id="password"
              className={LoginCSS.loginInput}
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>

          <button className={LoginCSS.button} type="submit">
            submit
          </button>
        </form>
        {error && <div className={LoginCSS.error}>{error}</div>}
        <Link className={LoginCSS.singupLink} to="/singup">
          Singup
        </Link>
      </div>
    </div>
  );
}
