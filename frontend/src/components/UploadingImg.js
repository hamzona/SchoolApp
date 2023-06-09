import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import InputImageCss from "../styles/inputImage.module.css";
export default function UploadingImg({ img }) {
  const [imageFile, setimageFile] = useState(null);
  const [readableImg, setReadableImg] = useState(img);
  const { dispatch, state } = useAuthContext();
  const navigate = useNavigate();
  console.log(readableImg);
  async function hendleSubmit(e) {
    e.preventDefault();
    // Create a FormData object
    const formData = new FormData();
    formData.append("img", imageFile);

    const res = await fetch(
      `http://localhost:4000/api/img/post/${state.user.imgName}`,
      {
        method: "POST",
        headers: {
          Authorization: `Berar ${state.user.token}`,
        },
        body: formData,
      }
    );

    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "singup-login", payload: json });
      navigate("/profil");
    }
  }

  function hendleFileChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setReadableImg(reader.result);
    };
    setimageFile(e.target.files[0]);
  }
  return (
    <div className={InputImageCss.container}>
      <Link className={InputImageCss.exit} to="/profil">
        X
      </Link>
      <div className={InputImageCss.containerInput}>
        <div className={InputImageCss.profilImage}>PROFIL IMAGE</div>
        <div
          className={InputImageCss.image}
          style={{
            backgroundImage: "url(" + readableImg + ")",
            backgroundSize: `contain`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <form
          onSubmit={(e) => {
            hendleSubmit(e);
          }}
        >
          <input type="file" onChange={(e) => hendleFileChange(e)} />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}
