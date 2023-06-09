import React, { useState } from "react";
import { usePostContext } from "../../../hooks/usePostContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useProfilPostsContext } from "../../../hooks/useProfilPostsContext";
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
    setDataType,
    dataType,
    subjects,
    minPrice,
    maxPrice,
  } = usePostContext();
  const { state: stateUser, imgUrl } = useAuthContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { setUser } = useProfilPostsContext();
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
    setSubjects(null);
    setMinPrice(null);
    setMaxPrice(null);
    //setDataType(null);
  }

  function isFiltered() {
    if (subjects !== null || minPrice !== null || maxPrice !== null) {
      return true;
    }
    return false;
  }

  const dataTypes = [
    "Questions",
    "Finished tasks",
    "Instruction offers",
    "Instruction needs",
  ];

  return (
    <div className={NavBarCss.container}>
      <div className={NavBarCss.profilContainerContainer}>
        {stateUser.user !== null ? (
          <Link
            onClick={() => {
              setUser(stateUser.user.name);
            }}
            className={`${NavBarCss.child} ${NavBarCss.profilContainer}`}
            to="/profil"
          >
            <div style={imgStyles} className={NavBarCss.profilImg}></div>
            {stateUser.user.name}
          </Link>
        ) : (
          <div className={NavBarCss.loginSingupCont}>
            <Link className={NavBarCss.Link} to="/login">
              login
            </Link>
            {"|"}
            <Link className={NavBarCss.Link} to="/singup">
              singup
            </Link>
          </div>
        )}
      </div>

      <div className={NavBarCss.filter_search_profil_container}>
        <div className={` ${NavBarCss.Fbuttons}`}>
          <button
            className={` ${NavBarCss.filterBtn} `}
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
      </div>

      <div className={NavBarCss.dataTypeContainer}>
        {dataTypes.map((type, index) => {
          const typeStyle = { background: type === dataType ? " #C89000" : "" };
          return (
            <div
              key={index}
              className={NavBarCss.dataTypeOption}
              style={typeStyle}
              onClick={() => {
                if (type === dataType) {
                  return setDataType(null);
                }
                setDataType(type);
              }}
            >
              {type}
            </div>
          );
        })}
      </div>
    </div>
  );
}
