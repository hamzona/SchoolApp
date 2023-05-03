import { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const MyPostsContext = createContext();
function updateReducer(state, action) {
  switch (action.type) {
    case "setMyPosts":
      return action.payload;
    case "addMyPost":
      return [action.payload, ...state];
    case "deleteMyPost":
      return state.filter((item) => item._id !== action.payload._id);
    case "updateMyPost":
    default:
      return state;
  }
}

export function MyPostsContextProvider({ children }) {
  const [state, dispatch] = useReducer(updateReducer, null);
  const { state: stateUsers } = useAuthContext();
  useEffect(() => {
    if (!stateUsers.user) {
      return;
    }
    const setMyPosts = async () => {
      const res = await fetch("http://localhost:4000/api/posts/allMy", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Berar ${stateUsers.user.token}`,
        },
      });

      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "setMyPosts", payload: json });
      }
    };
    setMyPosts();
  }, [stateUsers]);
  return (
    <MyPostsContext.Provider value={{ state, dispatch }}>
      {children}
    </MyPostsContext.Provider>
  );
}
