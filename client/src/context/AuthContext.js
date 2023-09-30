import { createContext, useState } from "react";
// login Context
export const LoginContext = createContext({});

export function LoginContextProvider({ children }) {
  const [loginPopup, setLoginPopup] = useState(false);
  const [redirect, setRedirect] = useState(false);

  return (
    <LoginContext.Provider value={{ loginPopup, setLoginPopup }}>
      {children}
    </LoginContext.Provider>
  );
}
// Sign Up context
export const SignContext = createContext({});

export function SignContextProvider({ children }) {
  const [signPopup, setSignPopup] = useState(false);
  return (
    <SignContext.Provider value={{ signPopup, setSignPopup }}>
      {children}
    </SignContext.Provider>
  );
}
