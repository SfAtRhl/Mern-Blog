// import "./index.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/UserContext";
import {
  SignContextProvider,
  LoginContextProvider,
} from "./context/AuthContext";

import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "./helpers/PrivateRouter";
import UserPosts from "./pages/UserPosts";
import CustomCursor from "./components/CustomCursor";
import "./App.css";
import { PostContextProvider } from "./context/PostContext";

function App() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
    },
  };

  return (
    <UserContextProvider>
      <PostContextProvider>
        <LoginContextProvider>
          <SignContextProvider>
            <CustomCursor variants={variants} animate={"default"} />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route
                  path="/login"
                  element={<PrivateRoute element={<LoginPage />} />}
                />
                <Route
                  path="/register"
                  element={<PrivateRoute element={<RegisterPage />} />}
                />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/edit/:id" element={<EditPost />} />
                <Route path="/post/user/:username" element={<UserPosts />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </SignContextProvider>
        </LoginContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  );
}

export default App;
