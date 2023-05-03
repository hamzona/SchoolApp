import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("context is null");
  }
  return context;
}
