import { createContext, useEffect, useState, useReducer } from "react";

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

  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (singlePost !== null) {
      if (!singlePost.imgName) return;
    } else {
      return;
    }
    async function getImg() {
      const res = await fetch(
        `http://localhost:4000/api/img/getImgPublic/${singlePost.imgName}`
      );
      const blob = await res.blob();
      const imgURL = URL.createObjectURL(blob);
      setImgUrl(imgURL);
    }
    getImg();
  }, [singlePost]);
  return (
    <SinglePost.Provider value={{ singlePost, dispatch, imgUrl }}>
      {children}
    </SinglePost.Provider>
  );
}
