import Header from "./Header";
import { Outlet } from "react-router-dom";
import Popup from "./components/Popup";
import { useState, useContext } from "react";
import { GoogleBtn } from "./components/GoogleBtn";
import { SignContext, LoginContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";
import { Input } from "./components/Input";

export default function Layout() {
  const { loginPopup, setLoginPopup } = useContext(LoginContext);
  const { signPopup, setSignPopup } = useContext(SignContext);
  const { setUserInfo } = useContext(UserContext);

  const closeLoginPopup = () => {
    setLoginPopup(false);
  };
  const closeSignPopup = () => {
    setSignPopup(false);
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setLoginPopup(false);
      });
    } else {
      alert("wrong credentials");
    }
  }

  return (
    <main>
      <Header />
      <section className="md:p-3 md:px-32 lg:px-40  xl:px-62  px-4 md:mx-auto dark:bg-black z-50">
        {/* login PopUp */}
        <Popup show={loginPopup} onClose={closeLoginPopup}>
          <form className="" onSubmit={login}>
            <h1 className="text-lg font-medium my-2">Login</h1>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            ></Input>
            <button className="bg-black dark:bg-white  cursor-none md:flex items-center justify-center font-semibold  py-2 px-3  border  rounded-lg dark:text-black text-white ">
              Login
            </button>
          </form>
          <span className="text-md flex justify-center my-2 text-lg capitalize">
            or
          </span>

          <GoogleBtn></GoogleBtn>
        </Popup>
        {/* Sign up PopUP */}
        <Popup show={signPopup} onClose={closeSignPopup}>
          <form className="" onSubmit={login}>
            <h1 className="text-lg font-medium my-2">Sign Up</h1>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className="bg-black dark:bg-white cursor-none  md:flex items-center justify-center font-semibold  py-2 px-3  border  rounded-lg dark:text-black text-white ">
              Sign UP
            </button>
          </form>

          <span className="text-md flex justify-center my-2 text-lg capitalize">
            or
          </span>

          <GoogleBtn></GoogleBtn>
        </Popup>
        <Outlet />
      </section>
    </main>
  );
}
