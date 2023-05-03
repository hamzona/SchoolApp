import React, { useState } from "react";
import { usePostContext } from "../../hooks/usePostContext";
import FilterCss from "../../styles/Home/filter.module.css";
export default function Filter({ setIsFilter }) {
  const { setSubjects, setMinPrice, setMaxPrice, setJobType, setPage } =
    usePostContext();
  const [filterSubject, setFilterSubject] = useState([]);
  const [minPriceF, setMinPriceF] = useState("");
  const [maxPriceF, setMaxPriceF] = useState("");
  const [jobTypeF, setJobTypeF] = useState("");
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
  function hendldeChange(e) {
    let copy = filterSubject;
    const checked = e.target.checked;
    const value = e.target.value;
    if (checked) {
      copy = [...filterSubject, value];
    } else {
      copy = copy.filter((item) => item !== value);
    }
    setFilterSubject(copy);
  }
  function hendleClick() {
    setSubjects(filterSubject);
    setMinPrice(minPriceF);
    setMaxPrice(maxPriceF);
    setJobType(jobTypeF);
    setPage(1);
    setIsFilter(false);
  }

  function resetAll() {
    setFilterSubject([]);
    setMinPriceF("");
    setMaxPriceF("");
    setJobTypeF("");
  }

  return (
    <div className={FilterCss.shadowSpace}>
      <div
        className={FilterCss.cancle}
        onClick={() => {
          setIsFilter(false);
        }}
      >
        X
      </div>
      <div className={FilterCss.container}>
        {
          <div>
            <div className={FilterCss.titles}> Subjects: </div>
            {subjectsConst.map((subject, index) => {
              return (
                <div className={FilterCss.subject} key={index}>
                  {subject}
                  <input
                    className={FilterCss.checkboxSubject}
                    type="checkbox"
                    value={subject}
                    checked={filterSubject.includes(subject)}
                    onChange={(e) => {
                      hendldeChange(e);
                    }}
                  />
                </div>
              );
            })}
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
        <div>
          <div className={FilterCss.titles}>Type of work</div>
          <select
            value={jobTypeF}
            onChange={(e) => {
              setJobTypeF(e.target.value);
            }}
          >
            <option value="">unchecked</option>
            <option value="homework">homework</option>
            <option value="instruction">instruction</option>
            unchecked
          </select>
        </div>
        <div className={FilterCss.buttonsContainer}>
          <button className={FilterCss.apply} onClick={() => hendleClick()}>
            Apply
          </button>
          <button className={FilterCss.reset} onClick={() => resetAll()}>
            Reset
          </button>
        </div>
      </div>{" "}
    </div>
  );
}
