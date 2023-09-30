import Post from "../Post";
import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";

export default function IndexPage() {
  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post._id}>
            <Post {...post} />
          </div>
        ))}
    </>
  );
}
