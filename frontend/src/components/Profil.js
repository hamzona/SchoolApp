import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import ProfilCss from "../styles/profil.module.css";
import noUserImg from "../img/user-icon-linear-user-icon-gray-background-106603311.jpg";
import HomePosts from "./HomeComponens/HomePosts";
import Loading from "./animation/Loading";
import { useProfilPostsContext } from "../hooks/useProfilPostsContext";
import DeleteButton from "./HomeComponens/DeleteButton";
export default function Profil() {
  const { state, dispatch, imgUrl } = useAuthContext();

  /*DELETE BUTTONS SHOW */
  const [isShowDeleteButton, setIsShowDeleteButton] = useState(false);
  //  const { state: postsState, isLoadingPosts } = usePostContext();
  const {
    state: profilPosts,
    setUser,
    isLoadingProfilPosts,
  } = useProfilPostsContext();
  const navigate = useNavigate();
  function hendleClick() {
    localStorage.removeItem("user");
    dispatch({ type: "logout" });
    navigate("/");
  }

  const url = !imgUrl ? noUserImg : imgUrl;
  const imgStyles = {
    backgroundImage: "url(" + url + ")",
    backgroundPosition: "center",
    backgroundSize: `cover`,
    backgroundRepeat: "no-repeat",
  };
  //console.log(profilPosts);
  return (
    <div className={ProfilCss.container}>
      {}
      <Link
        onClick={() => {
          setUser(null);
        }}
        className={ProfilCss.back}
        to="/"
      >
        {"<--"}
      </Link>
      <div className={ProfilCss.profilContainer}>
        <div className={ProfilCss.imgContainer}>
          <div className={ProfilCss.profilImg} style={imgStyles} />
          <Link to="/imgUpload" className={ProfilCss.imgUploadLink}>
            Change
          </Link>
        </div>
        <div className={ProfilCss.leftProfilInfoContainer}>
          {state.user && (
            <div className={ProfilCss.name}> {state.user.name}</div>
          )}
          {state.user && (
            <div className={ProfilCss.email}>email: {state.user.email}</div>
          )}

          <button
            className={ProfilCss.logout}
            onClick={() => {
              hendleClick();
            }}
          >
            Log out
          </button>
        </div>
        <Link className={ProfilCss.inputLink} to="/input">
          Upload new post
        </Link>

        {!profilPosts ? null : profilPosts.length !== 0 ? (
          <div
            className={ProfilCss.deletePostButtonShow}
            onClick={() => setIsShowDeleteButton((prev) => !prev)}
          >
            Delete post
          </div>
        ) : null}
      </div>

      {/* <div className={ProfilCss.titleMyPosts}>My posts:</div> */}
      <div className={ProfilCss.postsContainer}>
        {isLoadingProfilPosts ? (
          <Loading />
        ) : (
          profilPosts &&
          profilPosts.map((item, index) => {
            //console.log(item);
            return (
              <div key={index}>
                {isShowDeleteButton ? (
                  <DeleteButton
                    ID={item._id}
                    imgNames={item.postImgs}
                    setIsShowDeleteButton={setIsShowDeleteButton}
                  />
                ) : null}
                <HomePosts key={item._id} item={item} />;
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
