import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProfilCss from "../../styles/profil.module.css";
import { usePostContext } from "../../hooks/usePostContext";
import { useProfilPostsContext } from "../../hooks/useProfilPostsContext";
import useCommentContext from "../../hooks/useCommentContext";
export default function DeleteButton({ ID, setIsShowDeleteButton, imgNames }) {
  console.log(ID);
  const { state } = useAuthContext();

  const { dispatch } = usePostContext();
  const { dispatch: setProfilPosts } = useProfilPostsContext();
  const { comments } = useCommentContext();
  async function hendleClick() {
    const res = await fetch("http://localhost:4000/api/posts/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Berar ${state.user.token}`,
      },
      body: JSON.stringify({ _id: ID }),
    });
    const json = await res.json();

    console.log(json);

    /*DELETE IMGS */

    const resImg = await Promise.all(
      imgNames.map(async (name) => {
        const res = await fetch(
          `http://localhost:4000/api/img/deleteImg/${name}`
        );
        const js = await res.json();
        console.log(js);
        return js;
      })
    );
    /*GET IMG FROM COMMENTS */
    const resImgNames = await fetch(
      `http://localhost:4000/api/comments/getAllCommentImgNamesFromPost/${ID}`
    );
    /*DELETE IMG FROM COMMENTS */
    //console.log(resImgNames);

    const jsonImgNames = await resImgNames.json();
    console.log(jsonImgNames);
    const resResImgNames = await Promise.all(
      jsonImgNames.map(async (imgName, index) => {
        console.log(imgName, index);
        const res = await fetch(
          `http://localhost:4000/api/img/deleteImg/${imgName}`
        );
        // return res;
        console.log(res);
        const js = await res.json();
        console.log(js);
        return js;
      })
    );

    console.log(resResImgNames);
    /*DELETE COMMENTS */
    const resComment = await fetch(
      `http://localhost:4000/api/comments/deleteAllCommentsFromPost/${ID}`,
      { "Content-Type": "application/json" }
    );
    console.log(resComment);
    const jsonA = await resComment.json();
    console.log(jsonA);
    console.log(resImg);

    if (res.ok) {
      setIsShowDeleteButton(false);
      // dispatch({ type: "deletePost", payload: { _id: ID } });
      setProfilPosts({ type: "deleteMyPost", payload: { _id: ID } });
    }
  }
  return (
    <div
      className={ProfilCss.deleteButton}
      onClick={() => {
        hendleClick();
      }}
    >
      X
    </div>
  );
}
