import { useContext } from "react";
import { MyPostsContext } from "../contexts/myPostsContext";

export function useMyPostsContext() {
  const context = useContext(MyPostsContext);

  if (!context) {
    throw Error("context is null");
  }
  return context;
}
