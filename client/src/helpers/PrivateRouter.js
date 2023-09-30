import { Navigate } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { UserContext } from "../context/UserContext";

export function PrivateRoute({ element }) {
  // const { setUserInfo, userInfo } = useContext(UserContext);
  // Check if the token exists in cookies
  const token = Cookies.get("token");
  return !token ? element : <Navigate to="/" />;
}
