import React, { useContext } from "react";
import { CommentContext } from "../contexts/commentContext";

export default function useCommentContext() {
  const context = useContext(CommentContext);
  if (!context) {
    throw Error("context is null");
  }
  return context;
}
