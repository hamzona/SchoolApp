import { useContext } from "react";
import { SinglePost } from "../contexts/singlePostContext";
export default function useSinglePostContext() {
  const context = useContext(SinglePost);
  if (!context) {
    throw Error("context is null");
  }

  return context;
}
