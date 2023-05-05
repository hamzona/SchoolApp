import React, { useState } from "react";
import { usePostContext } from "../../../hooks/usePostContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

import NavBarCss from "../../../styles/Home/Header/navBar.module.css";

import Filter from "./Filter";
import Search from "./Search";
import noUserImg from "../../../img/user-icon-linear-user-icon-gray-background-106603311.jpg";
import Sort from "./Sort";
export default function NavBar() {
  const {
    setPage,
    setSubjects,
    setMinPrice,
    setMaxPrice,
    setJobType,
    jobType,
    subjects,
    minPrice,
    maxPrice,
  } = usePostContext();
  const { state: stateUser, imgUrl } = useAuthContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* filter job type */

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

  function isFiltered() {
    if (subjects.length !== 0 || minPrice !== null || maxPrice !== null) {
      return true;
    }
    return false;
  }

  const dataTypes = ["", "homework", "instruction"];

  return (
    <div className={NavBarCss.container}>
      <div className={NavBarCss.filter_search_profil_container}>
        <div className={`${NavBarCss.child} ${NavBarCss.Fbuttons}`}>
          <button
            className={`${NavBarCss.child} ${NavBarCss.filterBtn} `}
            onClick={() =>
              setIsFilterOpen((prev) => {
                return !prev;
              })
            }
          >
            Filter
          </button>
          {isFiltered() ? (
            <button
              className={`${NavBarCss.resetFilterBtn} `}
              onClick={() => {
                resetFilter();
              }}
            >
              X
            </button>
          ) : null}
        </div>

        {isFilterOpen ? <Filter setIsFilterOpen={setIsFilterOpen} /> : null}

        <Sort />
        <Search />

        {stateUser.user !== null ? (
          <Link
            className={`${NavBarCss.child} ${NavBarCss.profilContainer}`}
            to="/profil"
          >
            {stateUser.user.name}
            <div style={imgStyles} className={NavBarCss.profilImg}></div>
          </Link>
        ) : (
          <div className={NavBarCss.loginSingupCont}>
            <Link className={NavBarCss.loginLink} to="/login">
              login
            </Link>
            {"  "}
            <Link className={NavBarCss.singupLink} to="/singup">
              singup
            </Link>
          </div>
        )}
      </div>

      <div className={NavBarCss.dataTypeContainer}>
        {dataTypes.map((type, index) => {
          const typeStyle = { background: type === jobType ? "red" : "" };
          return (
            <div
              key={index}
              className={NavBarCss.dataTypeOption}
              style={typeStyle}
              onClick={() => {
                if (type === "all") {
                  return setJobType("");
                }

                setJobType(type);
              }}
            >
              {type === "" ? "all" : type}
            </div>
          );
        })}
      </div>
    </div>
  );
}
