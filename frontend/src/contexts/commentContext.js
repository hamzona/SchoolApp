import { createContext, useEffect, useReducer } from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
export const CommentContext = createContext();
function updateReducer(state, action) {
  switch (action.type) {
    case "setComments":
      return action.payload;
    case "add":
      return [action.payload, ...state];
    case "delete":
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
}

export function CommentContextProvider({ children }) {
  const [comments, dispatch] = useReducer(updateReducer, []);
  const { singlePost } = useSinglePostContext();
  const { state } = useAuthContext();
  useEffect(() => {
    if (singlePost === null) return;
    async function getData() {
      const res = await fetch(" http://localhost:4000/api/comments/all    ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: singlePost._id }),
      });
      const json = await res.json();
      console.log(json);
      const commentsWithImg = await Promise.all(
        json.map(async (comment) => {
          if (!comment.imgName) return comment;

          const img = await fetch(
            `http://localhost:4000/api/img/getImgPublic/${comment.imgName}`
          );

          const blob = await img.blob();
          const imgURL = URL.createObjectURL(blob);

          const imageObj = { imgURL: imgURL, ...comment };
          return imageObj;
        })
      );
      console.log(commentsWithImg);
      if (res.ok) {
        dispatch({ type: "setComments", payload: commentsWithImg });
      }
    }
    getData();
  }, [singlePost]);

  useEffect(() => {}, []);
  return (
    <CommentContext.Provider value={{ comments, dispatch }}>
      {children}
    </CommentContext.Provider>
  );
}
