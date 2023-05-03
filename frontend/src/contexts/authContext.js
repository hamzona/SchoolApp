import { createContext, useState, useEffect, useReducer } from "react";

export const AuthContext = createContext();
function updateReducer(state, action) {
  switch (action.type) {
    case "singup-login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
}
export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(updateReducer, { user: null });
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    const setting = async () => {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return;
      }
      console.log("now time" + new Date().getTime());
      console.log(user.expDate);
      if (new Date().getTime() > user.expDate) {
        localStorage.removeItem("user");
        return;
      }
      const res = await fetch(
        `http://localhost:4000/api/users/getUsr/${user.name}`
      );
      const json = await res.json();

      const final = { ...json, token: user.token };
      dispatch({ type: "singup-login", payload: final });
    };
    setting();
  }, []);

  useEffect(() => {
    if (state.user !== null) {
      if (!state.user.imgName) return;
    } else {
      return;
    }
    async function getImg() {
      const res = await fetch(
        `http://localhost:4000/api/img/getImg/${state.user.imgName}`,
        {
          headers: {
            Authorization: `Berar ${state.user.token}`,
          },
        }
      );
      const blob = await res.blob();
      const imgURL = URL.createObjectURL(blob);
      setImgUrl(imgURL);
    }
    getImg();
  }, [state]);
  return (
    <AuthContext.Provider value={{ state, dispatch, setImgUrl, imgUrl }}>
      {children}
    </AuthContext.Provider>
  );
}
