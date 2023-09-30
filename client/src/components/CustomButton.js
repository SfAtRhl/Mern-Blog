import { Link } from "react-router-dom";

export function CustomButton(props) {
  return (
    <Link
      to={props.path}
      className={`bg-transparent hidden md:flex items-center justify-center font-semibold  py-1 px-3    rounded-lg dark:text-white hover:text-white hover:bg-black border-black dark:hover:text-black dark:hover:bg-white dark:border-white border-2  cursor-none ${props.className}`}
      onClick={props.onclick}
    >
      {props.name}
    </Link>
  );
}
