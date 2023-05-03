import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
export default function UploadingImg() {
  const [imageFile, setimageFile] = useState(null);
  const { dispatch, state } = useAuthContext();

  const navigate = useNavigate();

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
    setimageFile(e.target.files[0]);
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          hendleSubmit(e);
        }}
      >
        <input type="file" onChange={(e) => hendleFileChange(e)} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
