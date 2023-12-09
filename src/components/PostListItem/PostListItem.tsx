import React from "react";
import { Post } from "../../__generated__/graphql";
import { Link, useLocation } from "react-router-dom";
import { getStyleForPath } from "../../types/ColorStyles";
import { format, parseISO } from "date-fns";
import { formatDate } from "../../utils/formatDate";

type PostListItemProps = {
  postItem: Partial<Post>;
};

export const PostListItem: React.FC<PostListItemProps> = ({ postItem }) => {
  const location = useLocation();
  const borderColor = getStyleForPath(location.pathname)["border"];
  const textColor = getStyleForPath(location.pathname)["text"];
  const textHoverColor = getStyleForPath(location.pathname)["textHover"];
  const pathToPost = postItem?.slug ? `./blog/${postItem?.slug}` : "#";

  return (
    <>
      <article
        className={`space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 border-b-2 ${borderColor} p-4 mx-5`}
      >
        <div className="text-slate-500 xl:col-span-1">
          {formatDate(postItem?.createdAt)}
        </div>
        <div className="xl:col-span-3">
          <h2 className="font-bold text-slate-700 text-2xl mb-4 cursor-pointer">
            <Link to={pathToPost}>{postItem?.title}</Link>
          </h2>
          <div className="flex flex-wrap mb-5">
            {postItem?.tags?.map((tagItem) => (
              <Link
                to="#"
                key={tagItem?.id}
                className={`${textColor} ${textHoverColor} font-semibold pr-3`}
              >
                {tagItem?.name}
              </Link>
            ))}
          </div>
          <div className="mb-4">{postItem?.excerpt}</div>
          <Link
            to={pathToPost}
            className={`${textColor} ${textHoverColor} font-semibold mb-2`}
          >
            Read more &#8594;
          </Link>
        </div>
      </article>
    </>
  );
};
