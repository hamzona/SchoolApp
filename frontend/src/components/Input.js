import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import { useMyPostsContext } from "../hooks/useMyPostsContext";
import { Link, useNavigate } from "react-router-dom";
import InputCss from "../styles/input.module.css";

export default function Input() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const { state } = useAuthContext();
  const { dispatch: updatePosts } = usePostContext();
  const { dispatch: updateMyPosts } = useMyPostsContext();

  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  const subjectsConst = [
    "matematika",
    "biologija",
    "fizika",
    "hemija",
    "bosanski",
    "programiranje",
    "muzicki",
    "informatika",
  ];

  //POST DATA
  async function hendleSubmit(e) {
    e.preventDefault();
    if (!state.user) {
      return;
    }

    const res = await fetch("http://localhost:4000/api/posts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Berar ${state.user.token}`,
      },
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        description: data.description,
        subject: data.subject,
        jobType: data.jobType,
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
        `http://localhost:4000/api/img/postMultiple/${json._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Berar ${state.user.token}`,
          },
          body: formData,
        }
      );
      var jsonWithImgs = await resWithImgs.json();
      console.log(jsonWithImgs);
    }

    if (res.ok) {
      updateMyPosts({ type: "addMyPost", payload: jsonWithImgs });
      setData("");
      navigate("/profil");
    } else {
      setError(json.error);
    }
  }

  /*********/
  function hendleChange(e) {
    let copy = data;
    copy[e.target.id] = e.target.value;
    setData(copy);
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
          setSelectedImages(selectedFilesCopy);
        }
      };
    }
  }
  console.log(Array.from(images));
  return (
    <div className={InputCss.container}>
      <Link className={InputCss.back} to="/profil">
        Cancle
      </Link>
      <div className={InputCss.title}>Upload post</div>

      <form
        className={InputCss.form}
        onSubmit={(e) => {
          hendleSubmit(e);
        }}
      >
        <div className={InputCss.inputContainer}>
          <label className={InputCss.label} htmlFor="title">
            Title:*{" "}
          </label>
          <input
            max={20}
            className={InputCss.input}
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => {
              hendleChange(e);
            }}
          />
        </div>
        <div className={InputCss.inputContainer}>
          <label className={InputCss.label} htmlFor="description">
            Description:
          </label>
          <textarea
            className={InputCss.inputDescription}
            type="text"
            id="description"
            value={data.description}
            onChange={(e) => {
              hendleChange(e);
            }}
          />
        </div>
        <div className={InputCss.inputContainer}>
          <label className={InputCss.label} htmlFor="price">
            Price:{" "}
          </label>
          <div className={InputCss.priceValuteCont}>
            <input
              className={InputCss.inputPrice}
              type="number"
              id="price"
              min={0}
              max={1000}
              value={data.price}
              onChange={(e) => {
                hendleChange(e);
              }}
            />
            KM
          </div>
        </div>

        <div className={InputCss.subjectCont}>
          <label htmlFor="subject" className={InputCss.label}>
            Subject:{" "}
          </label>
          <select
            className={InputCss.select}
            id="subject"
            value={data.subject}
            onChange={(e) => {
              hendleChange(e);
            }}
          >
            <option value={undefined}>unchecked</option>
            {subjectsConst.map((subject, index) => {
              return (
                <option value={subject} key={index}>
                  {subject}
                </option>
              );
            })}
          </select>
        </div>

        <div className={InputCss.jobTypeCont}>
          <label htmlFor="jobType" className={InputCss.label}>
            Job-type:{" "}
          </label>
          <select
            className={InputCss.select}
            id="jobType"
            value={data.jobType}
            onChange={(e) => hendleChange(e)}
            defaultValue={undefined}
          >
            <option value={undefined}>unchecked</option>
            <option value="homework">homework</option>
            <option value="instruction">instruction</option>
          </select>
        </div>

        <div>
          <label htmlFor="images" className={InputCss.label}>
            Images:
          </label>
          <input
            multiple={true}
            type="file"
            onChange={(e) => {
              imageChange(e);
            }}
          />
        </div>

        <div className={InputCss.selectedImagesContainer}>
          {selectedImages.map((image) => {
            return (
              <div
                className={InputCss.selectedImage}
                style={{
                  backgroundImage: "url(" + image + ")",
                  backgroundPosition: "center",
                  backgroundSize: `contain`,
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            );
          })}
        </div>
        <button className={InputCss.button} type="submit">
          submit
        </button>
        {error && <div className={InputCss.error}>{error}</div>}
      </form>
    </div>
  );
}
