import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useLogin() {
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setError(null);
    const res = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      const date = new Date().setDate(new Date().getDate() + 1);

      localStorage.setItem("user", JSON.stringify({ ...json, expDate: date }));
      dispatch({ type: "singup-login", payload: json });
    }
  };
  return [login, error];
}
