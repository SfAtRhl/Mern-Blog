import React from "react";
import { motion } from "framer-motion";

const CustomCursor = (props) => {
  return (
    <motion.div
      className="md:block hidden h-5 w-5 dark:bg-white bg-black fixed rounded-full z-50 border-1 ring-[0.25px] dark:ring-white ring-black  border-4 border-solid 
      border-transparent bg-clip-padding -indent-[999px]"
      variants={props.variants}
      animate={props.animate}
    />
  );
};

export default CustomCursor;
