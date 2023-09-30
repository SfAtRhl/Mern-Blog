import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./Input";

export default function CommentForm({
  onSubmit,
  initialContent,
  isUpdate = false,
  onchange,
}) {
  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row justify-center items-center my-4"
    >
      <Input
        type="content"
        placeholder={isUpdate ? "Update your comment" : "Share a comment"}
        value={initialContent}
        className="items-center align-middle"
        onChange={onchange}
      />
      <button type="submit" className="w-10 h-10 mx-2 dark:bg-white bg-black ">
        <FontAwesomeIcon
          icon={isUpdate ? faEdit : faPaperPlane}
          className="dark:text-black px-2 "
        />
      </button>
    </form>
  );
}
