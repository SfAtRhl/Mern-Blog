import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import { ImageConfig } from "../config/ImageConfig";
import uploadImg from "../assets/cloud-upload-regular-240.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input relative  border-2 dark:border-white my-2 rounded-md border-dashed"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className=" flex items-center  justify-center flex-col  cursor-none opacity-100   m-4">
          <img src={uploadImg} className="md:w-[100px] w-[50px] " alt="" />
          <p className="text-md font-medium">Drag & Drop your file here</p>
        </div>
        <input
          type="file"
          value=""
          className="opacity-0 absolute top-0 right-0 h-full w-full"
          onChange={onFileDrop}
        />
      </div>
      {fileList.length > 0 ? (
        <div className="mt-4 md:mx-4 mx-1">
          <p className="text-sm font-medium">Ready to upload</p>
          {fileList.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center my-4 md:mx-6"
            >
              <div className="flex flex-row items-center">
                <img
                  src={
                    ImageConfig[item.type.split("/")[1]] ||
                    ImageConfig["default"]
                  }
                  alt=""
                  className="md:w-[45px] w-[30px] mx-2"
                />
                <div className="text-sm md:text-md">
                  <p>{item.name}</p>
                  <p>{item.size}B</p>
                </div>
              </div>
              <span onClick={() => fileRemove(item)}>
                <FontAwesomeIcon icon={faX} className=" p-2" />
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
