import React, { useEffect, useRef, useState } from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import useCommentContext from "../hooks/useCommentContext";
import InputCommentCss from "../styles/inputComment.module.css";
import InputRateStars from "./InputRateStars";
import { useNavigate } from "react-router-dom";
import Loading from "./animation/Loading";
function InputComment() {
  const text = useRef("");
  const { singlePost, dispatch: updateSinglePost } = useSinglePostContext();
  const { state } = useAuthContext();
  const userName = !state.user ? null : state.user.name;
  const [rate, setRate] = useState(0);
  const {
    comments,
    dispatch: upadateComment,
    loading,
    setLoading,
  } = useCommentContext();
  const navigate = useNavigate();
  useEffect(() => {
    setRate(0);
  }, [singlePost]);
  async function postComment(e) {
    e.preventDefault();
    if (text.current.value === "" && rate === 0) return;
    if (!state.user) {
      return navigate("/login");
    }
    setLoading(true);
    const res = await fetch("http://localhost:4000/api/comments/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Berar ${state.user.token}`,
      },
      body: JSON.stringify({
        content: text.current.value,
        postId: singlePost._id,
        userName: userName,
        rate: rate,
      }),
    });
    const json = await res.json();

    let postWithComment = json.postRate;

    if (res.ok) {
      if (!postWithComment.postImgs || postWithComment.postImgs.length === 0)
        return;

      const images = await Promise.all(
        postWithComment.postImgs.map(async (postImg) => {
          const img = await fetch(
            `http://localhost:4000/api/img/getImgPublic/${postImg}`
          );

          const blob = await img.blob();
          const imgURL = URL.createObjectURL(blob);
          return imgURL;
        })
      );
      postWithComment.postUrls = images;
    }

    if (res.ok) {
      setLoading(false);
      upadateComment({ type: "add", payload: json.newComment });
      updateSinglePost({ type: "setSinglePost", payload: postWithComment });
      setRate(0);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
    text.current.value = "";
  }

  function isRated() {
    let copy = comments;

    copy = copy.filter((comment) => {
      if (!state.user !== true) {
        if (comment.rate !== 0 && comment.name === state.user.name) {
          return comment;
        }
      }
    });

    return copy.length > 0;
  }
  return (
    <div className={InputCommentCss.container}>
      <form
        onSubmit={(e) => postComment(e)}
        className={InputCommentCss.formCont}
      >
        {isRated() ? null : (
          <InputRateStars rateValue={rate} onChange={setRate} />
        )}
        <div>
          <input
            className={InputCommentCss.input}
            type="text"
            ref={text}
            placeholder="Comment"
          />
          <button className={InputCommentCss.submit} type="submit">
            Submit
          </button>
          {loading ? <div>Posting...</div> : null}
        </div>
      </form>
    </div>
  );
}

export default InputComment;
