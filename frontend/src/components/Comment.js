import React from "react";
import CommentsCss from "../styles/comments.module.css";
import noUserImg from "../img/user-icon-linear-user-icon-gray-background-106603311.jpg";

export default function Comment({ comment }) {
  const url = !comment.imgURL ? noUserImg : comment.imgURL;
  const imgStyles = {
    backgroundImage: "url(" + url + ")",
    backgroundPosition: "center",
    backgroundSize: `cover`,
    backgroundRepeat: "no-repeat",
  };
  return (

  
                  <div className={CommentsCss.container}>
                              <div className={CommentsCss.userContainer}>
        <div className={CommentsCss.userImage} style={imgStyles}></div>
        
        <div className={CommentsCss.userName}>{comment.name}</div>
        {comment.rate && (
        <div className={CommentsCss.starsCont}>
          {Array(comment.rate)
            .fill(0)
            .map((_, index) => {
              return (
                <div key={index} className={CommentsCss.star}>
                  {" "}
                  &#9733;
                </div>
              );
            })}
        </div>
      )}
      </div>

      {comment.content !== "" ? (
        <div className={CommentsCss.content}>{comment.content}</div>
      ) : null}

    </div>
  );
}
