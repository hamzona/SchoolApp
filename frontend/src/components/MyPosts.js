import React from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useMyPostsContext } from "../hooks/useMyPostsContext";
import { usePostContext } from "../hooks/usePostContext";
//import { useNavigate } from "react-router-dom";
import PostsCss from "../styles/posts.module.css";
export default function MyPosts({ item }) {
  const { state } = useAuthContext();
  const { dispatch: updateMyPosts } = useMyPostsContext();
  const { dispatch: updatePosts } = usePostContext();

  //const navigate = useNavigate();

  async function hendleDeleteClick() {
    if (!state.user) {
      return;
    }
    const res = await fetch("http://localhost:4000/api/posts/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Berar ${state.user.token}`,
      },
      body: JSON.stringify({ _id: item._id }),
    });

    const json = await res.json();

    if (res.ok) {
      updateMyPosts({ type: "deleteMyPost", payload: json });
      updatePosts({ type: "deletePost", payload: json });
    }
  }

  // async function handleUpdateClick() {
  //   navigate("/input");
  // }

  return (
    <div className={PostsCss.container}>
      <div className={PostsCss.postContainer}>
        <div className={PostsCss.postData}>
          {item.title && <div> Title: {item.title}</div>}
          {item.description && <div>Description: {item.description}</div>}
          {item.subject && <div>Subject: {item.subject}</div>}
          {item.jobType && <div>{item.jobType}</div>}
          {item.price && <div>Price: {item.price}KM</div>}
        </div>

        <button className={PostsCss.button} onClick={() => hendleDeleteClick()}>
          DELETE
        </button>
      </div>
      {/* <button onClick={() => handleUpdateClick()}>UPDATE</button> */}
    </div>
  );
}
