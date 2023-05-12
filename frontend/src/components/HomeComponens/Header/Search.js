import React, { useRef } from "react";
import SearchCss from "../../../styles/Home/Header/search.module.css";
import { usePostContext } from "../../../hooks/usePostContext";
import NavBarCss from "../../../styles/Home/Header/navBar.module.css";

export default function Search() {
  const search = useRef("");
  const {
    setSearch,
    setPage,
    setSubjects,
    setMinPrice,
    setMaxPrice,
    setJobType,
  } = usePostContext();
  function hendleSubmit(e) {
    e.preventDefault();
    setSearch(search.current.value);
    setPage(1);
    setSubjects([]);
    setMinPrice(null);
    setMaxPrice(null);
    setJobType(null);
  }
  return (
    <form
      className={`${SearchCss.container} ${NavBarCss.child}`}
      onSubmit={(e) => {
        hendleSubmit(e);
      }}
    >
      <input className={SearchCss.inputTag} ref={search} type="text" />
      <button className={SearchCss.buttonTag} type="submit">
        Search
      </button>
    </form>
  );
}
