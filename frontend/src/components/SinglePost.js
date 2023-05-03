import React, { useState } from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import SinglePostCss from "../styles/singlePost.module.css";
import InputCommnet from "./InputComment";
import useCommentContext from "../hooks/useCommentContext";
import Comment from "./Comment";
import DatePost from "./HomeComponens/DatePost";
import noUserImg from "../img/user-icon-linear-user-icon-gray-background-106603311.jpg";
import noPostImg from "../img/no-image.jpg";

export default function SinglePost() {
  const { singlePost, dispatch, imgUrl } = useSinglePostContext();
  const [imgIndex, setImgIndex] = useState(0);
  const { comments } = useCommentContext();
  function hendleClick() {
    dispatch({ type: "setSinglePost", payload: null });
  }
  const url = !imgUrl ? noUserImg : imgUrl;
  const imgStyles = {
    backgroundImage: "url(" + url + ")",
    backgroundPosition: "center",
    backgroundSize: `cover`,
    backgroundRepeat: "no-repeat",
  };
  console.log(singlePost);
  const PostImgURL =
    Array.from(singlePost.postUrls).length === 0
      ? noPostImg
      : singlePost.postUrls[imgIndex];
  const imgPostStyles = {
    backgroundImage: "url(" + PostImgURL + ")",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };
  function listImgs(action) {
    if (action === "prev") {
      if (imgIndex === 0) {
        return setImgIndex(Array.from(singlePost.postUrls).length - 1);
      }
      setImgIndex((prev) => --prev);
    } else if (action === "next") {
      if (imgIndex === Array.from(singlePost.postUrls).length - 1) {
        return setImgIndex(0);
      }
      setImgIndex((prev) => ++prev);
    }
  }
  return (
    <div className={SinglePostCss.container}>
      <button
        className={SinglePostCss.back}
        onClick={() => {
          hendleClick();
        }}
      >
        CANCEL
      </button>

      <div className={SinglePostCss.postContainer}>
        <div className={SinglePostCss.header}>
          <div className={SinglePostCss.userImage} style={imgStyles}></div>
          {singlePost.userName && (
            <div className={SinglePostCss.userName}>{singlePost.userName}</div>
          )}
          {singlePost && (
            <div className={SinglePostCss.title}>{singlePost.title}</div>
          )}
        </div>
        <div className={SinglePostCss.postImgContainer}>
          {!singlePost ? null : (Array.from(singlePost.postImgs).length ===
              0) ===
            0 ? null : (
            <button
              className={SinglePostCss.postImgButton}
              onClick={() => {
                listImgs("prev");
              }}
            >
              &#8810;
            </button>
          )}
          <div className={SinglePostCss.postImgs} style={imgPostStyles}></div>

          {!singlePost ? null : Array.from(singlePost.postImgs).length ===
            0 ? null : (
            <button
              className={SinglePostCss.postImgButton}
              onClick={() => {
                listImgs("next");
              }}
            >
              &#8811;
            </button>
          )}
        </div>
        {singlePost.subject && (
          <div className={SinglePostCss.subject}>
            Subject: {singlePost.subject}
          </div>
        )}
        {singlePost.jobType && (
          <div className={SinglePostCss.jobType}>
            Job-Type: {singlePost.jobType}
          </div>
        )}
        {singlePost.description && (
          <div className={SinglePostCss.description}>
            <p>DESCRIPTION</p>
            {singlePost.description}
          </div>
        )}
        {singlePost.price && (
          <div className={SinglePostCss.price}>
            Price: {singlePost.price} KM
          </div>
        )}
        {singlePost.rate && <div>{singlePost.rate}</div>}
        <DatePost date={singlePost.date} />
      </div>
      <InputCommnet />
      <div className={SinglePostCss.commentsCont}>
        {comments &&
          comments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
      </div>
    </div>
  );
}
