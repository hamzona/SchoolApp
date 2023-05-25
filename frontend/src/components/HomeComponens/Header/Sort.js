import React from "react";
import { usePostContext } from "../../../hooks/usePostContext";
import SortCss from "../../../styles/Home/Header/sort.module.css";

export default function Sort() {
  const { setSortBy, setPage, sortBy } = usePostContext();

  return (
    <div className={`${SortCss.container}  `}>
      <label className={SortCss.label} htmlFor="sort">
        SORT BY:
      </label>

      <select
        id="sort"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          setPage(1);
        }}
      >
        <option value={undefined}>unchecked</option>
        <option value={"likes"}>likes</option>
        <option value={"date"}>newest</option>
      </select>
    </div>
  );
}
