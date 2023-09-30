import React, { useContext, useState } from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CommentForm from "../components/CommentForm";
import { UserContext } from "../context/UserContext";

export default function Comment({
  _id,
  updatedAt,
  content,
  authorInfo,
  onDelete,
  onUpdate,
}) {
  const { userInfo } = useContext(UserContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [text, setText] = useState(content);

  return !isUpdate ? (
    <div className="flex flex-col my-1 py-2 border-[2px] border-black dark:border-white rounded-md p-1  w-full">
      <h2 className=" text-md flex md:justify-start justify-center font-medium capitalize px-2">
        {content}
      </h2>
      <p className="flex justify-between  px-2">
        <Link to={`/post/user/${authorInfo.username}`}>
          <a className="text-xs hover:underline font-medium">
            @{authorInfo.username}
          </a>
        </Link>
        <div className=" text-black dark:text-white flex  items-end ">
          <time className="text-xs">{formatISO9075(new Date(updatedAt))}</time>

          {userInfo.id === authorInfo.id && (
            <div className="flex items-center px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={(ev) => {
                  ev.preventDefault();
                  setIsUpdate(true);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <FontAwesomeIcon
                icon={faTrash}
                className="dark:text-white p-1 "
                onClick={(ev) => {
                  ev.preventDefault();
                  onDelete(_id);
                }}
              />
            </div>
          )}
        </div>
      </p>
    </div>
  ) : (
    <CommentForm
      onSubmit={() => {
        if (text.trim() !== "") {
          onUpdate(_id, text);
          setIsUpdate(false);
        }
      }}
      onchange={(ev) => {
        ev.preventDefault();
        setText(ev.target.value);
      }}
      initialContent={text}
      isUpdate
    />
  );
}
