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
      const res = await fetch(" http://localhost:4000/api/comments/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: singlePost._id }),
      });
      const json = await res.json();
      const commentsWithProfilImg = await Promise.all(
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

      const commentsWithContentImages = await Promise.all(
        commentsWithProfilImg.map(async (comment) => {
          if (comment.commentImgsNames.lenght === 0) {
            const imageObj = { imgContentURLS: [], ...comment };
            return imageObj;
          }
          const images = await Promise.all(
            comment.commentImgsNames.map(async (imgName) => {
              const img = await fetch(
                `http://localhost:4000/api/img/getImgPublic/${imgName}`
              );

              const blob = await img.blob();
              const imgURL = URL.createObjectURL(blob);
              return imgURL;
            })
          );

          return { ...comment, imgContentURLS: images };
        })
      );

      if (res.ok) {
        dispatch({ type: "setComments", payload: commentsWithContentImages });
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
