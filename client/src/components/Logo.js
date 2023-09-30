import { Link } from "react-router-dom";

const Logo = (props) => {
  return (
    <Link
      to="/"
      className={`text-2xl font-bold dark:text-white   cursor-none ${props.className}`}
    >
      Mern Blog
    </Link>
  );
};

export default Logo;
