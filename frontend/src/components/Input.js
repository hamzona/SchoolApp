import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
//import { usePostContext } from "../hooks/usePostContext";
import { useProfilPostsContext } from "../hooks/useProfilPostsContext";
import { Link, useNavigate } from "react-router-dom";
import InputCss from "../styles/inputStyle.module.css";

export default function Input() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const { state } = useAuthContext();
  console.log(state);
  //  const { dispatch: updatePosts } = usePostContext();
  const { dispatch: updateMyPosts } = useProfilPostsContext();

  const [images, setImages] = useState([]);
  const [readableImages, setReadableImages] = useState([]);
  console.log(readableImages);
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
        dataType: data.dataType,
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
    }
    if (readableImages.length !== 0) {
      console.log(readableImages[0]);
      jsonWithImgs.postUrls = [readableImages[0]];
    }

    if (res.ok) {
      const img = await fetch(
        `http://localhost:4000/api/img/getImgPublic/${state.user.imgName}`
      );

      const blob = await img.blob();
      const imgURL = URL.createObjectURL(blob);
      jsonWithImgs.imgURL = imgURL;
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
    setData({ ...copy });
  }

  function hendleJobTypeChange(e) {
    let copy = data;
    copy[e.target.id] = e.target.checked ? e.target.value : undefined;
    setData({ ...copy });
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

  /*DATA TYPES */

  const dataTypes = [
    "Questions",
    "Finished tasks",
    "Instruction offers",
    "Instruction needs",
  ];
  return (
    <div className={InputCss.container}>
      <Link className={InputCss.back} to="/profil">
        {"<--"}
      </Link>

      <div className={InputCss.form}>
        <div className={InputCss.title}>Upload post</div>
        {/* TITLE */}
        <div className={InputCss.inputContainerTitle}>
          <label className={InputCss.label} htmlFor="title">
            Title
          </label>
          <input
            max={20}
            className={InputCss.inputTitle}
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => {
              hendleChange(e);
            }}
          />
        </div>
        {/* JOB TYPE */}
        <div className={InputCss.dataTypeCont}>
          <label htmlFor="dataType" className={InputCss.label}>
            Data-type
          </label>
          {dataTypes.map((type, index) => {
            return (
              <div key={index} className={InputCss.dataTypeHelpCont}>
                <input
                  type="checkbox"
                  id="dataType"
                  checked={type === data.dataType}
                  className={InputCss.dataTypeOption}
                  onChange={(e) => {
                    hendleJobTypeChange(e);
                  }}
                  value={type}
                />
                <label>{type}</label>
              </div>
            );
          })}
        </div>
        {/* IMAGES */}
        <div className={InputCss.inputImageContainer}>
          <label htmlFor="images" className={InputCss.label}>
            Import image
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
          {readableImages.map((image, index) => {
            return (
              <div
                key={index}
                className={InputCss.selectedImage}
                style={{
                  backgroundImage: "url(" + image + ")",
                  backgroundSize: `contain`,
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            );
          })}
        </div>
        {/* DESCRIPTION */}
        <div className={InputCss.inputContainerDescription}>
          <label className={InputCss.label} htmlFor="description">
            Description
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
        </div>{" "}
        {/* SUBJECTS */}
        <div className={InputCss.subjectCont}>
          <label htmlFor="subject" className={InputCss.label}>
            Subject
          </label>
          <select
            className={InputCss.selectSubject}
            id="subject"
            value={data.subject}
            onChange={(e) => {
              hendleChange(e);
            }}
          >
            <option className={InputCss.optionSubject} value={undefined}>
              unchecked
            </option>
            {subjectsConst.map((subject, index) => {
              return (
                <option
                  className={InputCss.optionSubject}
                  value={subject}
                  key={index}
                >
                  {subject}
                </option>
              );
            })}
          </select>
        </div>
        {/* PRICE */}
        {data.dataType === "Finished tasks" ? null : (
          <div className={InputCss.inputContainerPrice}>
            <label className={InputCss.label} htmlFor="price">
              Price
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
        )}
        <div className={InputCss.buttonSubmitContainer}>
          <button
            onClick={(e) => {
              hendleSubmit(e);
            }}
            className={InputCss.buttonSubmit}
            type="submit"
          >
            submit
          </button>
        </div>
        {error && <div className={InputCss.error}>{error}</div>}
      </div>
    </div>
  );
}
