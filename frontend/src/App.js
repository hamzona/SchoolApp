import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/HomeComponens/Home";
import Input from "./components/Input";
import { Login } from "./components/Login";
import NoUser from "./components/NoUser";
import Profil from "./components/Profil";
import { Singup } from "./components/Singup/Singup";
import { useAuthContext } from "./hooks/useAuthContext";
import useSinglePostContext from "./hooks/useSinglePostContext";
import SinglePost from "./components/SinglePost";
import UploadingImg from "./components/Singup/UploadingImg";
function App() {
  const { state } = useAuthContext();
  const { singlePost } = useSinglePostContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/profil"
          element={!state.user ? <Navigate to="/" /> : <Profil />}
        />
        <Route
          path="/"
          element={
            singlePost === null ? <Home /> : <Navigate to="/singlePost" />
          }
        />
        <Route path="/input" element={<Input />} />
        <Route
          path="/login"
          element={state.user !== null ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/singlePost"
          element={singlePost === null ? <Navigate to="/" /> : <SinglePost />}
        />

        <Route path="noUser" element={<NoUser />} />
        <Route
          path="/singup"
          element={state.user !== null ? <Navigate to="/" /> : <Singup />}
        />
        <Route path="/imgUpload" element={<UploadingImg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
