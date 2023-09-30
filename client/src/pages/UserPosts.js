import Post from "../Post";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";

export default function UserPosts() {
  const { username } = useParams();
  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    fetch("http://localhost:4000/post/").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  const filteredPosts = posts.filter(
    (post) => post.author.username === username
  );
  return (
    <>
      {filteredPosts.length > 0 &&
        filteredPosts.map((post) => <Post {...post} />)}
    </>
  );
}
