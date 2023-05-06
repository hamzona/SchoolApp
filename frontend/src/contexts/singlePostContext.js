import { createContext, useReducer, useState } from "react";

export const SinglePost = createContext();
function updateReducer(state, action) {
  switch (action.type) {
    case "setSinglePost":
      return action.payload;
    default:
      return state;
  }
}
export function SinglePostProvider({ children }) {
  const [singlePost, dispatch] = useReducer(updateReducer, null);
  const [loadingPost, setLoadingPost] = useState(false);
  return (
    <SinglePost.Provider
      value={{ singlePost, dispatch, setLoadingPost, loadingPost }}
    >
      {children}
    </SinglePost.Provider>
  );
}
