import React from "react";
import { usePostContext } from "../../hooks/usePostContext";

import HomePosts from "./HomePosts";
import HomeCss from "../../styles/Home/home.module.css";
import Pagination from "./Pagination";

import Loading from "../animation/Loading.js";
import NavBar from "./Header/NavBar";
function Home() {
  const { state, error, isLoadingPosts } = usePostContext();

  return (
    <div className={HomeCss.container}>
      <NavBar />
      {isLoadingPosts ? (
        <Loading />
      ) : (
        <div className={HomeCss.posts}>
          {error ? (
            <div>Error:{error}</div>
          ) : (
            state &&
            state.map((item) => {
              return <HomePosts key={item._id} item={item} />;
            })
          )}
        </div>
      )}

      <Pagination />
    </div>
  );
}

export default Home;
