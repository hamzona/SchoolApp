import React, { useState } from "react";
import useSinglePostContext from "../../hooks/useSinglePostContext";
//import SinglePostCss from "../styles/singlePost.module.css";
import SinglePostCss from "../../styles/singlePostStil.module.css";
import InputCommnet from "../InputComment";
import useCommentContext from "../../hooks/useCommentContext";
import Comment from "../Comment";
import DatePost from "../HomeComponens/DatePost";
import noUserImg from "../../img/user-icon-linear-user-icon-gray-background-106603311.jpg";
import Like from "./Like";
//import noPostImg from "../img/no-image.jpg";

export default function SinglePost() {
  const { singlePost, dispatch } = useSinglePostContext();
  // const [imgIndex, setImgIndex] = useState(0);
  const { comments } = useCommentContext();
  function hendleClick() {
    dispatch({ type: "setSinglePost", payload: null });
  }
  const url = !singlePost.profilImg ? noUserImg : singlePost.profilImg;
  const imgStyles = {
    backgroundImage: "url(" + url + ")",
    backgroundPosition: "center",
    backgroundSize: `cover`,
    backgroundRepeat: "no-repeat",
  };
  /* const PostImgURL =
    Array.from(singlePost.postUrls).length === 0
      ? noPostImg
      : singlePost.postUrls[imgIndex];
  const imgPostStyles = {
    backgroundImage: "url(" + PostImgURL + ")",
    // backgroundPosition: "center",
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
  }*/
  return (
    <div className={SinglePostCss.container}>
      <button
        className={SinglePostCss.back}
        onClick={() => {
          hendleClick();
        }}
      >
        {"<--"}
      </button>

      <div className={SinglePostCss.postContainer}>
        <div className={SinglePostCss.header}>
          <div className={SinglePostCss.userImage} style={imgStyles}></div>
          {singlePost.userName && (
            <div className={SinglePostCss.userName}>{singlePost.userName}</div>
          )}
        </div>
        {singlePost && (
          <div className={SinglePostCss.title}>{singlePost.title}</div>
        )}

        <div className={SinglePostCss.allInfos}>
          {singlePost.subject && (
            <div className={SinglePostCss.info}>{singlePost.subject}</div>
          )}
          {singlePost.jobType && (
            <div className={SinglePostCss.info}>{singlePost.jobType}</div>
          )}

          {singlePost.price && (
            <div className={SinglePostCss.info}>{singlePost.price} KM</div>
          )}
        </div>
        {singlePost.description && (
          <div className={SinglePostCss.description}>
            {/* <p>DESCRIPTION</p> */}
            {singlePost.description}
          </div>
        )}
        <div className={SinglePostCss.postImgContainer}>
          {/* {!singlePost ? null : Array.from(singlePost.postImgs).length ===
            0 ? null : (
            <button
              className={SinglePostCss.postImgButton}
              onClick={() => {
                listImgs("prev");
              }}
            >
              &#8810;
            </button>
          )} */}
          {/* listanje slika */}
          {!singlePost
            ? null
            : Array.from(singlePost.postImgs).length === 0
            ? null
            : singlePost.postUrls.map((postUrl, index) => {
                const imgStyle = {
                  backgroundImage: "url(" + postUrl + ")",
                  // backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                };

                return (
                  <div
                    className={SinglePostCss.postImgs}
                    style={imgStyle}
                    key={index}
                  />
                );
              })}

          {/* ************** */}
          {/* <div className={SinglePostCss.postImgs} style={imgPostStyles}></div> */}
          {/* 
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
          )} */}
        </div>

        {/* Rate */}
        {singlePost.rate && (
          <div className={SinglePostCss.rateContainer}>
            {parseInt(singlePost.rate)}{" "}
            <div className={SinglePostCss.rateIndex}>
              {singlePost.rate - parseInt(singlePost.rate) === 0
                ? null
                : (singlePost.rate - parseInt(singlePost.rate))
                    .toFixed(2)
                    .toString()
                    .slice(2)}
            </div>
          </div>
        )}
        <Like />
        {/* <DatePost date={singlePost.date} /> */}
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
