import GoogleLogin from "react-google-login";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SignContext,LoginContext } from "../context/AuthContext";

export function GoogleBtn() {
  const { setUserInfo } = useContext(UserContext);
  const { setLoginPopup } = useContext(LoginContext);
  const { setSignPopup } = useContext(SignContext);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "640073429874-epl99t3gduflpar3k731fvust733puot.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const login = async (code) => {
    try {
      fetch("http://localhost:4000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Assuming the response is JSON
        })
        .then((data) => {
          setUserInfo(data);
          setLoginPopup(false);
          setSignPopup(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } catch (error) {
      console.log("Error:" + error);
    }
  };
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        await login(authResult["code"]);
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onFailure = async () => {
    console.log("failure");
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <button
          className="bg-transparent flex items-center justify-center font-semibold  py-2 px-3 text-black  rounded-lg dark:text-white border-2  hover:text-white hover:bg-black border-black dark:hover:text-black dark:hover:bg-white  dark:border-white  cursor-none"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Login with google
        </button>
      )}
      buttonText="Login with google"
      responseType="code"
      redirectUri="postmessage"
      onSuccess={responseGoogle}
      onFailure={() => onFailure()}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
}
