import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import { CustomButton } from "./components/CustomButton";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Logo from "./components/Logo";
import { LoginContext, SignContext } from "./context/AuthContext";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const { setLoginPopup } = useContext(LoginContext);
  const { setSignPopup } = useContext(SignContext);

  const { setUserInfo, userInfo } = useContext(UserContext);

  const btn = document.getElementById("menu-btn");
  const nav = document.getElementById("menu");


  const handleHumbergerBtn = () => {
    btn.classList.toggle("open");
    nav.classList.toggle("flex");
    nav.classList.toggle("hidden");
  };
  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    // select html element
    const html = document.querySelector("html");
    const menuBtn = document.getElementById("menu-btn");
    const spanElements = menuBtn.querySelectorAll("span");

    //add or remove class dark in html elem according to theme in localstorage.
    if (localStorage.getItem("theme") === "dark") {
      html.classList.add("dark");
      document.body.classList.add("dark");
      spanElements.forEach((span) => {
        span.classList.add("dark");
      });

      setTheme("dark");
    } else {
      html.classList.remove("dark");
      document.body.classList.remove("dark");
      spanElements.forEach((span) => {
        span.classList.remove("dark");
      });
      setTheme("light");
    }
  }, [theme]);

  // handle switch theme
  const handleThemeSwitch = () => {
    if (localStorage.getItem("theme") === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo("");
  }

  const username = userInfo?.username;

  const openLoginPopup = () => {
    setLoginPopup(true);
  };
  const openSignPopup = () => {
    setSignPopup(true);
  };
  return (
    <header className="m-0 md:p-3 md:px-32 lg:px-40  xl:px-62 p-4 md:mx-auto sticky top-0 z-10 bg-white dark:bg-black shadow-sm flex flex-row justify-between items-center">
      <Logo />
      {/* <Input
        className=" border-black border-[2px] dark:border-white "
        placeholder="Search for"
        onChange={(ev) => {
          const defaultsPosts = posts;
          const filteredPosts = posts.filter((post) =>
            post.title.includes(ev.target.value)
          );
          // setPosts(filteredPosts);
        }}
      ></Input> */}
      <nav>
        {username && (
          <>
            <CustomButton
              name="Create new post"
              path="/create"
              className="hover:text-white hover:bg-black border-black"
            />
            <CustomButton name="Logout" onclick={logout} />

            {/* <a onClick={logout}>Logout ({username})</a> */}
          </>
        )}
        {!username && (
          <>
            <CustomButton name="Login" onclick={openLoginPopup} />
            <CustomButton name="Register" onclick={openSignPopup} />
          </>
        )}
        <button
          className={`px-4 bg-black dark:bg-white w-10 h-10 items-center justify-center flex  cursor-none`}
          onClick={handleThemeSwitch}
        >
          <FontAwesomeIcon
            icon={theme === "light" ? faMoon : faSun}
            className="dark:text-black"
          />
        </button>

        <button
          id="menu-btn"
          onClick={handleHumbergerBtn}
          className="flex md:hidden focus:outline-none w-10 h-10 dark:bg-white bg-black relative"
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>

        <div className="md:hidden">
          <div
            id="menu"
            className="absolute flex-col items-center hidden self-end py-4 mt-12 space-y-4 font-bold bg-white sm:w-max sm:self-center left-6 right-6 drop-shadow-md rounded-md "
          >
            {username && (
              <>
                <Link
                  to={"/create"}
                  onClick={handleHumbergerBtn}
                  className=" text-black"
                >
                  Create new post
                </Link>
                <a onClick={logout} className=" text-black">
                  Logout
                </a>
              </>
            )}
            {!username && (
              <>
                <a onClick={openLoginPopup} className=" text-black">
                  Login
                </a>
                <a onClick={openSignPopup} className=" text-black">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
