import { createContext, useEffect, useReducer, useState } from "react";
export const ProfilPostsContext = createContext();
function updateReducer(state, action) {
  switch (action.type) {
    case "setMyPosts":
      return action.payload;
    case "addMyPost":
      return [action.payload, ...state];
    case "deleteMyPost":
      return state.filter((item) => item._id !== action.payload._id);
    case "reload":
    default:
      return state;
  }
}

export function ProfilPostsContextProvider({ children }) {
  const [state, dispatch] = useReducer(updateReducer, null);
  const [user, setUser] = useState(null);
  console.log(state);
  const [isLoadingProfilPosts, setLoadingProfilPosts] = useState(false);
  useEffect(() => {
    if (!user) {
      return dispatch({ type: "setMyPosts", payload: null });
    }
    const setMyPosts = async () => {
      setLoadingProfilPosts(true);
      let params = new URLSearchParams(`user=${user}`);
      if (!user) {
        params.delete("user");
      }
      const res = await fetch(
        `http://localhost:4000/api/posts/allMy?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await res.json();
      let finalResponse;

      if (res.ok) {
        finalResponse = await Promise.all(
          json.map(async (post) => {
            if (!post.imgName) return post;

            const img = await fetch(
              `http://localhost:4000/api/img/getImgPublic/${post.imgName}`
            );

            const blob = await img.blob();
            const imgURL = URL.createObjectURL(blob);

            const imageObj = { imgURL: imgURL, ...post };
            return imageObj;
          })
        );

        finalResponse = await Promise.all(
          finalResponse.map(async (post) => {
            post.postUrls = [];

            if (!post.postImgs || post.postImgs.length === 0) return post;
            let copyPost = post;
            const img = await fetch(
              `http://localhost:4000/api/img/getImgPublic/${copyPost.postImgs[0]}`
            );
            const blob = await img.blob();
            const imgURL = URL.createObjectURL(blob);
            copyPost.postUrls.push(imgURL);
            return copyPost;
          })
        );
      }

      if (res.ok) {
        dispatch({ type: "setMyPosts", payload: finalResponse });
      }
      setLoadingProfilPosts(false);
    };
    setMyPosts();
  }, [user]);

  return (
    <ProfilPostsContext.Provider
      value={{ state, dispatch, setUser, isLoadingProfilPosts }}
    >
      {children}
    </ProfilPostsContext.Provider>
  );
}
