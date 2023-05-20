import React from "react";
import CommentsCss from "../styles/comments2.module.css";
import noUserImg from "../img/user-icon-linear-user-icon-gray-background-106603311.jpg";

export default function Comment({ comment }) {
  const url = !comment.imgURL ? noUserImg : comment.imgURL;
  const imgProfilStyles = {
    backgroundImage: "url(" + url + ")",
    backgroundPosition: "center",
    backgroundSize: `contain`,
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className={CommentsCss.container}>
      <div className={CommentsCss.userContainer}>
        <div className={CommentsCss.userImage} style={imgProfilStyles}></div>

        <div className={CommentsCss.userName}>{comment.name}</div>
      </div>
      {comment.content !== "" ? (
        <div className={CommentsCss.content}>{comment.content}</div>
      ) : null}

      <div className={CommentsCss.imgsContainer}>
        {comment.imgContentURLS &&
          comment.imgContentURLS.map((imgURL, index) => {
            const imgContentStyles = {
              backgroundImage: "url(" + imgURL + ")",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            };
            return (
              <div
                key={index}
                className={CommentsCss.contentImg}
                style={imgContentStyles}
              ></div>
            );
          })}
      </div>
    </div>
  );
}
