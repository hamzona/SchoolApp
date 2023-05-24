import React, { useEffect, useRef, useState } from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import useCommentContext from "../hooks/useCommentContext";
import InputCommentCss from "../styles/inputComment.module.css";
//import InputRateStars from "./InputRateStars";
import { useNavigate } from "react-router-dom";
//import Loading from "./animation/Loading";
function InputComment() {
  const text = useRef("");
  const { singlePost, dispatch: updateSinglePost } = useSinglePostContext();
  const { state } = useAuthContext();
  const userName = !state.user ? null : state.user.name;
  const [rate, setRate] = useState(0);

  /*IMAGES */

  const [images, setImages] = useState([]);
  const [readableImages, setReadableImages] = useState([]);

  const {
    dispatch: upadateComment,
    loadingComments,
    setLoadingComments,
  } = useCommentContext();
  const navigate = useNavigate();

  /*POST COMMENT*/
  async function postComment(e) {
    e.preventDefault();
    if (text.current.value === "" && images.length === 0) return;
    if (!state.user) {
      return navigate("/login");
    }
    setLoadingComments(true);

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
        imagesNames: images,
      }),
    });

    const json = await res.json();
    if (res.ok) {
      const formData = new FormData();
      const fileList = Array.from(images);
      fileList.forEach((image) => {
        formData.append("imgs", image);
      });
      const resWithImgs = await fetch(
        `http://localhost:4000/api/img/postMultipleCommentImgs/${json._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Berar ${state.user.token}`,
          },
          body: formData,
        }
      );
      var jsonWithImgs = await resWithImgs.json();
    }

    /*FETCHING PROFIL IMAGE */
    if (!jsonWithImgs.imgName) return jsonWithImgs;

    const img = await fetch(
      `http://localhost:4000/api/img/getImgPublic/${jsonWithImgs.imgName}`
    );

    const blob = await img.blob();
    const imgURL = URL.createObjectURL(blob);

    jsonWithImgs.imgURL = imgURL;

    /*FETCHING CONTENT IMAGES */
    if (jsonWithImgs.commentImgsNames.lenght === 0) {
      jsonWithImgs.imgContentURLS = [];
    } else {
      const images = await Promise.all(
        jsonWithImgs.commentImgsNames.map(async (imgName) => {
          const img = await fetch(
            `http://localhost:4000/api/img/getImgPublic/${imgName}`
          );

          const blob = await img.blob();
          const imgURL = URL.createObjectURL(blob);
          return imgURL;
        })
      );

      jsonWithImgs.imgContentURLS = images;
    }

    if (res.ok) {
      setLoadingComments(false);
      upadateComment({ type: "add", payload: jsonWithImgs });
      setRate(0);
      // window.scrollTo({ top: 400, behavior: "smooth" });
    }
    setImages([]);
    setReadableImages([]);
    text.current.value = "";
  }

  function imageChange(e) {
    setImages(e.target.files);

    const selectedFilesCopy = [];
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        selectedFilesCopy.push(reader.result);
        if (selectedFilesCopy.length === files.length) {
          setReadableImages(selectedFilesCopy);
        }
      };
    }
  }

  return (
    <div className={InputCommentCss.container}>
      <form
        onSubmit={(e) => postComment(e)}
        className={InputCommentCss.formCont}
      >
        <div className={InputCommentCss.titleInput}>Upload comment</div>
        <textarea
          // onInput={`${this.style.height} = "" ;${this.style.height} =${this.scrollHeight} + "px"`}
          className={InputCommentCss.input}
          type="text"
          ref={text}
          placeholder="type..."
        />

        <div className={InputCommentCss.inputFiles}>
          <input
            type="file"
            multiple={true}
            onChange={(e) => {
              imageChange(e);
            }}
          />
          <div className={InputCommentCss.readableImagesContainer}>
            {readableImages.map((image, index) => {
              return (
                <div
                  key={index}
                  className={InputCommentCss.readableImg}
                  style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: `contain`,
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              );
            })}
          </div>
        </div>

        <button className={InputCommentCss.submit} type="submit">
          {"-->"}
        </button>
        {loadingComments ? <div>Posting...</div> : null}
      </form>
    </div>
  );
}

export default InputComment;
