import React, { useState } from "react";
import { usePostContext } from "../../../hooks/usePostContext";
import FilterCss from "../../../styles/Home/Header/filter2.module.css";
export default function Filter({ setIsFilterOpen }) {
  const { setSubjects, setMinPrice, setMaxPrice, setPage } = usePostContext();
  const [filterSubject, setFilterSubject] = useState([]);
  const [minPriceF, setMinPriceF] = useState("");
  const [maxPriceF, setMaxPriceF] = useState("");
  const subjectsConst = [
    "matematika",
    "biologija",
    "fizika",
    "hemija",
    "bosanski",
    "programiranje",
    "muzicki",
    "informatika",
  ];
  // function hendldeChange(e) {
  //   let copy = filterSubject;
  //   const checked = e.target.checked;
  //   const value = e.target.value;
  //   if (checked) {
  //     copy = [...filterSubject, value];
  //   } else {
  //     copy = copy.filter((item) => item !== value);
  //   }
  //   setFilterSubject(copy);
  // }
  function hendleClick() {
    setSubjects(filterSubject);
    setMinPrice(minPriceF);
    setMaxPrice(maxPriceF);
    setPage(1);
    setIsFilterOpen(false);
  }

  // function resetAll() {
  //   setFilterSubject([]);
  //   setMinPriceF("");
  //   setMaxPriceF("");
  // }
  return (
    <div className={FilterCss.container}>
      {
        <div>
          <div className={FilterCss.titles}> Subjects: </div>
          <select
            onChange={(e) => {
              setFilterSubject(e.target.value);
            }}
          >
            <option className={FilterCss.subject} value={null}>
              unchecked
            </option>
            ;
            {subjectsConst.map((subject, index) => {
              return (
                <option className={FilterCss.subject} key={index}>
                  {subject}
                  {/* <input
                      className={FilterCss.checkboxSubject}
                      type="checkbox"
                      value={subject}
                      //checked={filterSubject.includes(subject)}
                      onChange={(e) => {
                        hendldeChange(e);
                      }}
                    /> */}
                </option>
              );
            })}
          </select>
        </div>
      }
      <div>
        <div className={FilterCss.titles}>Price:</div>
        <div className={FilterCss.PriceInputCont}>
          <label className={FilterCss.labelPrice} htmlFor="min">
            MIN:{" "}
          </label>
          <input
            className={FilterCss.inputPrice}
            type="number"
            id="min"
            value={minPriceF}
            onChange={(e) => {
              setMinPriceF(e.target.value);
            }}
          />
        </div>
        <div className={FilterCss.PriceInputCont}>
          <label className={FilterCss.labelPrice} htmlFor="max">
            MAX:{" "}
          </label>
          <input
            className={FilterCss.inputPrice}
            type="number"
            id="max"
            value={maxPriceF}
            onChange={(e) => {
              setMaxPriceF(e.target.value);
            }}
          />
        </div>
      </div>

      <div className={FilterCss.buttonsContainer}>
        <button className={FilterCss.apply} onClick={() => hendleClick()}>
          Apply
        </button>
      </div>
    </div>
  );
}
