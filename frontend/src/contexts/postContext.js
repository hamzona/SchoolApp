import { createContext, useEffect, useReducer, useState } from "react";

export const PostContext = createContext();

function updateReducer(state, action) {
  switch (action.type) {
    case "setPosts":
      return action.payload;
    case "addPost":
      return [action.payload, ...state];
    case "deletePost":
      return state.filter((item) => item._id !== action.payload._id);
    case "like":
      return state.map((item) => {
        if (item._id === action.payload._id) {
          item.likes = action.payload.likes;
          return item;
        }
        return item;
      });
    default:
      return state;
  }
}
export function PostContextProvider({ children }) {
  const [state, dispatch] = useReducer(updateReducer, null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  /*search */
  const [search, setSearch] = useState(null);
  /*filters */
  const [subjects, setSubjects] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [error, setError] = useState(null);

  /*sort */
  const [sortBy, setSortBy] = useState("");
  /*posts from user */
  // const [user, setUser] = useState(null);
  // console.log(user);
  /*Loading */
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  useEffect(() => {
    let params = new URLSearchParams(
      `page=${page}&limit=20&search=${search}&min=${minPrice}&max=${maxPrice}&dataType=${dataType}&sortBy=${sortBy}&subjects=${subjects}`
    );
    if (!dataType) {
      params.delete("dataType");
    }
    if (!search) {
      params.delete("search");
    }
    if (!minPrice) {
      params.delete("min");
    }
    if (!maxPrice) {
      params.delete("max");
    }
    if (!subjects) {
      params.delete("subjects");
    }
    // subjects.forEach((subject) => {
    //   params.append("subject", subject);
    // });

    const getAllPosts = async () => {
      setIsLoadingPosts(true);
      const res = await fetch(
        `http://localhost:4000/api/posts/allPosts?${params.toString()}`
      );
      const json = await res.json();

      let finalResponse;
      if (res.ok) {
        finalResponse = await Promise.all(
          json.data.map(async (post) => {
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
        setPages(json.pages);
        dispatch({ type: "setPosts", payload: finalResponse });
        setError(null);
      } else {
        setError(json.error);
        setPages(0);
      }

      setIsLoadingPosts(false);
    };
    getAllPosts();
  }, [page, search, subjects, minPrice, maxPrice, dataType, sortBy]);
  return (
    <PostContext.Provider
      value={{
        state,
        dispatch,
        page,
        setPage,
        pages,
        setSubjects,
        setSearch,
        setMaxPrice,
        setMinPrice,
        setDataType,
        setSortBy,
        sortBy,
        dataType,
        error,
        isLoadingPosts,
        subjects,
        minPrice,
        maxPrice,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
