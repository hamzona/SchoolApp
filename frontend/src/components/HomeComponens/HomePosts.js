import React from "react";
import HomePostsCss from "../../styles/Home/homePosts.module.css";
//import useSinglePostContext from "../../hooks/useSinglePostContext";
import DatePost from "./DatePost";
import noUserImg from "../../img/user-icon-linear-user-icon-gray-background-106603311.jpg";
import noPostImg from "../../img/no-image.jpg";

import { useFetchSinglePost } from "../../hooks/useFetchSinglePost";
import { useNavigate } from "react-router-dom";
export default function HomePosts({ item }) {
  // const { dispatch } = useSinglePostContext();
  const [fetchPostData] = useFetchSinglePost();
  const navigate = useNavigate();

  //const { dispatch } = useSinglePostContext();
  /*function hendleClick() {
    dispatch({ type: "setSinglePost", payload: item });
  }*/

  const url = !item.imgURL ? noUserImg : item.imgURL;
  const imgStyles = {
    backgroundImage: "url(" + url + ")",
    backgroundPosition: "center",
    backgroundSize: `cover`,
    backgroundRepeat: "no-repeat",
  };
  const urlPost = !item.postUrls
    ? null
    : Array.from(item.postUrls).length === 0
    ? noPostImg
    : item.postUrls[0];

  const imgPostStyles = {
    backgroundImage: "url(" + urlPost + ")",
    backgroundPosition: "center",
    backgroundSize: `cover`,
    backgroundRepeat: "no-repeat",
  };
  console.log(item);
  return (
    <div
      className={HomePostsCss.container}
      onClick={() => {
        navigate("/singlePost");
        fetchPostData(item);
      }}
    >
      <div className={HomePostsCss.postImg} style={imgPostStyles}></div>

      <div className={HomePostsCss.title}>{item.title}</div>

      <div className={HomePostsCss.userPostContainer}>
        <div className={HomePostsCss.userPostImg} style={imgStyles}></div>
        <div className={HomePostsCss.userName}>{item.userName}</div>
      </div>
      {!item.date ? null : <DatePost date={item.date} />}
      <div className={HomePostsCss.likes}>Likes {item.likes.length}</div>
    </div>
  );
}
