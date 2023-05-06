import { useContext } from "react";
import { ProfilPostsContext } from "../contexts/profilPostsContext";

export function useProfilPostsContext() {
  const context = useContext(ProfilPostsContext);

  if (!context) {
    throw Error("context is null");
  }
  return context;
}
