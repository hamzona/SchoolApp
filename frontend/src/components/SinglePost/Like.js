import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostContext } from "../../hooks/usePostContext";
import useSinglePostContext from "../../hooks/useSinglePostContext";
export default function Like() {
  const { state } = useAuthContext();
  const { singlePost } = useSinglePostContext();
  const { state: posts, dispatch } = usePostContext();
  console.log(singlePost.likes);

  const [liked, setLiked] = useState(
    singlePost.likes.includes(state.user.name)
  );
  console.log(liked);
  async function hendleLike() {
    const res = await fetch(
      `http://localhost:4000/api/posts/like/${singlePost._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Berar ${state.user.token}`,
        },
        body: JSON.stringify({ userName: state.user.name }),
      }
    );
    const json = await res.json();
    if (res.ok) {
      setLiked((prev) => !prev);
      dispatch({ type: "like", payload: json });
    }
  }
  return (
    <div>
      <button
        style={{ backgroundColor: liked ? "red" : "gray" }}
        onClick={() => hendleLike()}
      >
        Like
      </button>
    </div>
  );
}
