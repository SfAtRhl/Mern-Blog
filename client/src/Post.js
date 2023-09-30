import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="flex md:flex-row flex-col m-2">
      <div className="md:w-1/2">
        <Link to={`/post/${_id}`}>
          <img
            src={"http://localhost:4000/" + cover}
            alt=""
            className=" object-cover rounded-md h-56 w-full "
          />
        </Link>
      </div>
      <div className=" text-black dark:text-white p-2 md:w-1/2 ">
        <Link to={`/post/${_id}`}>
          <h2 className="md:text-4xl text-2xl  flex md:justify-start justify-center font-medium capitalize">{title}</h2>
        </Link>
        <p className="flex justify-between items-center ">
          <Link to={`/post/user/${author.username}`}>
            <a className="text-sm hover:underline font-medium">
              @{author.username}
            </a>
          </Link>

          <time className="text-xs  ">
            {formatISO9075(new Date(createdAt))}
          </time>
        </p>
        <p className="indent-6 mt-">{summary}</p>
      </div>
    </div>
  );
}
