import React, { useState } from "react";
import { usePostContext } from "../../hooks/usePostContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import HomePosts from "./HomePosts";
import HomeCss from "../../styles/Home/home.module.css";
import Pagination from "./Pagination";
import Filter from "./Filter";
import Search from "./Search";
import SortMenu from "./SortMenu";
import noUserImg from "../../img/user-icon-linear-user-icon-gray-background-106603311.jpg";
import Loading from "../animation/Loading.js";

function Home() {
  const {
    state,
    error,
    isLoadingPosts,
    setPage,
    setSubjects,
    setMinPrice,
    setMaxPrice,
    setJobType,
  } = usePostContext();
  const { state: stateUser, imgUrl } = useAuthContext();
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const url = !imgUrl ? noUserImg : imgUrl;
  const imgStyles = {
    backgroundImage: "url(" + url + ")",
    backgroundPosition: "center",
    backgroundSize: `cover`,
    backgroundRepeat: "no-repeat",
  };

  function resetFilter() {
    setPage(1);
    setSubjects([]);
    setMinPrice(null);
    setMaxPrice(null);
    setJobType(null);
  }
  return (
    <div className={HomeCss.container}>
      <div className={HomeCss.homeNav}>
        {stateUser.user !== null ? (
          <Link className={HomeCss.profilLink} to="/profil">
            <div className={HomeCss.profilContainer}>
              {" "}
              <div style={imgStyles} className={HomeCss.profilImg}></div>
              {stateUser.user.name}
            </div>
          </Link>
        ) : (
          <div className={HomeCss.loginSingupCont}>
            <Link className={HomeCss.loginLink} to="/login">
              login
            </Link>
            {"  "}
            <Link className={HomeCss.singupLink} to="/singup">
              singup
            </Link>
          </div>
        )}
      </div>
      <Search />

      <button
        className={HomeCss.filterBtn}
        onClick={() =>
          setIsFilter((prev) => {
            return !prev;
          })
        }
      >
        Filter
      </button>

      <button
        className={HomeCss.resetFilterBtn}
        onClick={() => {
          resetFilter();
        }}
      >
        RESET FILTER
      </button>

      {isFilter ? <Filter setIsFilter={setIsFilter} /> : null}

      <button
        className={HomeCss.sortBtn}
        onClick={() => setIsSort((prev) => !prev)}
      >
        SORT
      </button>
      {isSort ? <SortMenu /> : null}

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
