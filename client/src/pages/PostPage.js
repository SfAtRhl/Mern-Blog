import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";
import Ads from "../components/Ads";
import { PostContext } from "../context/PostContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState("");

  const { userInfo } = useContext(UserContext);
  const { posts } = useContext(PostContext);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
    fetch(`http://localhost:4000/comment/${id}`).then((response) => {
      response.json().then((comment) => {
        setComment(comment);
      });
    });
  }, [id, comment]);

  async function deletePost(ev, id) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/post/" + id, {
      method: "Delete",
      credentials: "include",
    });
    if (response.ok) {
      navigate("/");
    }
  }

  async function createNewComment(content) {
    await fetch("http://localhost:4000/comment", {
      method: "POST",
      body: JSON.stringify({
        content,
        postId: id,
        authorInfo: userInfo,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  }
  async function updateComment(_id, content) {
    try {
      await fetch("http://localhost:4000/comment", {
        method: "PUT",
        body: JSON.stringify({
          id: _id,
          content,
          postId: id,
          authorInfo: userInfo,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteComment(id) {
    await fetch("http://localhost:4000/comment/" + id, {
      method: "Delete",
      credentials: "include",
    });
  }

  if (!postInfo) return "";

  return (
    <div className="dark:text-gray-100 flex flex-row relative">
      <div className={` w-full ${posts.length > 3 ? "lg:w-2/3" : ""}`}>
        <div className="items-center flex justify-center flex-col ">
          <h1 className="text-3xl font-semibold capitalize">
            {postInfo.title}
          </h1>
          <Link to={`/post/user/${postInfo.author.username}`}>
            <div className="text-sm font-semibold  hover:underline pb-2">
              by @{postInfo.author.username}
            </div>
          </Link>

          {userInfo.id === postInfo.author._id && (
            <div className="flex items-center justify-between pb-2 md:px-4 w-full">
              <time className="text-xs">
                {formatISO9075(new Date(postInfo.createdAt))}
              </time>

              <div className="flex items-center">
                <Link className="" to={`/edit/${postInfo._id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </Link>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="dark:text-white p-2"
                  onClick={(ev) => {
                    ev.preventDefault();
                    deletePost(ev, postInfo._id);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="">
          <img
            src={`http://localhost:4000/${postInfo.cover}`}
            alt=""
            className="h-80 w-full object-cover rounded-lg"
          />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
        {/* Comments Section */}
        <>
          {comment.length > 0 && (
            <div className="">
              <h2 className="text-md capitalize font-medium  underline">
                Comments
              </h2>
              {comment.map((comment) => (
                <div key={comment._id}>
                  <Comment
                    {...comment}
                    onDelete={deleteComment}
                    onUpdate={updateComment}
                  />
                </div>
              ))}
            </div>
          )}
        </>
        {userInfo.id !== postInfo.author._id && userInfo?.username && (
          <CommentForm
            initialContent={content}
            onSubmit={() => {
              if (content.trim() !== "") {
                createNewComment(content);
                setContent("");
              }
            }}
            onchange={(ev) => {
              ev.preventDefault();
              setContent(ev.target.value);
            }}
          />
        )}
      </div>

      {/* ads */}
      <>
        {posts.length > 3 && (
          <div className=" lg:w-1/3 lg:block top-0 right-0  hidden">
            <h2 className="text-md capitalize font-medium px-4 pt-8 underline">
              Checkout More Blogs
            </h2>
            {posts
              .filter((item) => item._id !== postInfo._id)
              .map(
                (post, index) =>
                  index < 2 && (
                    <div key={post._id}>
                      <Ads {...post} />
                    </div>
                  )
              )}
          </div>
        )}
      </>
    </div>
  );
}
