import { createContext, useState } from "react";
// login Context
export const PostContext = createContext({});

export function PostContextProvider({ children }) {
  const [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
}
