import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProfilCss from "../../styles/profil.module.css";
import { usePostContext } from "../../hooks/usePostContext";
import { useProfilPostsContext } from "../../hooks/useProfilPostsContext";
export default function DeleteButton({ ID, setIsShowDeleteButton }) {
  const { state } = useAuthContext();

  const { dispatch } = usePostContext();
  const { dispatch: setProfilPosts } = useProfilPostsContext();
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
