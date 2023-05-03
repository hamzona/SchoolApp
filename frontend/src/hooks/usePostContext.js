import { useContext } from "react";
import { PostContext } from "../contexts/postContext";

export function usePostContext() {
  const context = useContext(PostContext);

  if (!context) {
    throw Error("context is null");
  }
  return context;
}
