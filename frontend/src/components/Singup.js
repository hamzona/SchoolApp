import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSingup } from "../hooks/useSingup";
import SingupCSS from "../styles/singup.module.css";

export function Singup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [singup, error] = useSingup();

  function hendleSubmit(e) {
    e.preventDefault();
    singup(email, password, name);
  }

  return (
    <div className={SingupCSS.container}>
      <Link className={SingupCSS.back} to="/">
        BACK
      </Link>
      <div className={SingupCSS["children-container"]}>
        <div className={SingupCSS.title}>Singup</div>
        <form
          className={SingupCSS.form}
          onSubmit={(e) => {
            hendleSubmit(e);
          }}
        >
          <div className={SingupCSS["input-container"]}>
            <label className={SingupCSS.label} htmlFor="name">
              Name:{" "}
            </label>
            <input
              id="name"
              className={SingupCSS.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
          </div>
          <div className={SingupCSS["input-container"]}>
            <label className={SingupCSS.label} htmlFor="email">
              Email:{" "}
            </label>
            <input
              id="email"
              className={SingupCSS.input}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
          <div className={SingupCSS["input-container"]}>
            <label className={SingupCSS.label} htmlFor="password">
              Password:{" "}
            </label>
            <input
              id="password"
              className={SingupCSS.input}
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <button className={SingupCSS.button} type="submit">
            submit
          </button>
        </form>

        {error && <div className={SingupCSS.error}>{error}</div>}
        <Link to="/login" className={SingupCSS.loginLink}>
          Login
        </Link>
      </div>
    </div>
  );
}
