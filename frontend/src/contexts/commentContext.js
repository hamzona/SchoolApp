import { createContext, useEffect, useReducer, useState } from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
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
  const [loadingComments, setLoadingComments] = useState(false);
  useEffect(() => {
    if (singlePost === null) return;
    async function getData() {
      setLoadingComments(true);
      const res = await fetch(" http://localhost:4000/api/comments/all    ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: singlePost._id }),
      });
      const json = await res.json();
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
      if (res.ok) {
        dispatch({ type: "setComments", payload: commentsWithImg });
        setLoadingComments(false);
      }
    }
    getData();
  }, [singlePost]);

  useEffect(() => {}, []);
  return (
    <CommentContext.Provider
      value={{ comments, dispatch, loadingComments, setLoadingComments }}
    >
      {children}
    </CommentContext.Provider>
  );
}
