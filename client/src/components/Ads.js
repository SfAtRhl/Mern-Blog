import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Ads({ _id, title, cover, createdAt, author }) {
  return (
    <div className="flex flex-col m-4 border-[2px] border-black dark:border-white rounded-md p-2">
      <div className="">
        <Link to={`/post/${_id}`}>
          <img
            src={"http://localhost:4000/" + cover}
            alt=""
            className=" object-cover rounded-md h-56 w-full "
          />
        </Link>
      </div>
      <div className=" text-black dark:text-white p-2  ">
        <Link to={`/post/${_id}`}>
          <h2 className=" text-md flex md:justify-start justify-center font-medium capitalize">
            {title}
          </h2>
        </Link>
        <p className="flex justify-between items-center">
          <Link to={`/post/user/${author.username}`}>
            <a className="text-xs hover:underline font-medium">
              @{author.username}
            </a>
          </Link>

          <time className="text-xs  ">
            {formatISO9075(new Date(createdAt))}
          </time>
        </p>
      </div>
    </div>
  );
}
