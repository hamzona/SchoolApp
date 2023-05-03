import React from "react";
import StarsCss from "../styles/stars.module.css";
export default function InputRate({ rateValue, onChange }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={StarsCss.container}>
      {stars.map((starValue, index) => {
        return (
          <div
            className={StarsCss.star}
            value={starValue}
            key={index}
            style={{ color: starValue > rateValue ? "gray" : "gold" }}
            onClick={() => onChange(starValue)}
          >
            &#9733;
          </div>
        );
      })}
    </div>
  );
}
