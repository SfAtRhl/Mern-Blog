import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found">
      <h2 className="font-semibold text-xl">Sorry :)</h2>
      <p>That page cannot be found</p>
      <Link to="/" className="hover:underline">
        Back to the homepage...
      </Link>
    </div>
  );
};

export default NotFound;
