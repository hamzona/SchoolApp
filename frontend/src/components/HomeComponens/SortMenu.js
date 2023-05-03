import React, { useState } from "react";
import { usePostContext } from "../../hooks/usePostContext";
import SortManuCss from "../../styles/Home/sortManu.module.css";
export default function SortMenu() {
  const { setSortBy, setPage } = usePostContext();
  const [localRate, setLocalRate] = useState(undefined);
  return (
    <div className={SortManuCss.container}>
      <div className={SortManuCss.title}>SORT</div>
      <select
        className={SortManuCss.selectSort}
        value={localRate}
        onChange={(e) => setLocalRate(e.target.value)}
      >
        <option value={undefined}>unchecked</option>
        <option value={"rate"}>best rate</option>
        <option value={"date"}>newest</option>
      </select>
      <button
        className={SortManuCss.submitButton}
        onClick={() => {
          setSortBy(localRate);
          setPage(1);
        }}
      >
        submit
      </button>
    </div>
  );
}
