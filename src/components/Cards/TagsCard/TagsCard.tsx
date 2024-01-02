import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getStyleForPath } from "../../../types/ColorStyles";
import { Post } from "../../../__generated__/graphql";

type TagsCardProps = {
    postItem: Post
};

export const TagsCard: React.FC<TagsCardProps> = ({postItem}) => {
  const location = useLocation();
  const borderColor = getStyleForPath(location.pathname)["border"];
  const textColor = getStyleForPath(location.pathname)["text"];
  const textHoverColor = getStyleForPath(location.pathname)["textHover"];

  return (
    <>
      <div className={`p-5 mb-4 border-b-2 ${borderColor}`}>
        <h2 className="dark:text-white">Tags</h2>
        <div className="flex flex-wrap dark:bg-zinc-900">
          {postItem?.tags?.map((tagItem) => (
            <Link
              to={`/tags/${tagItem?.slug}`}
              key={tagItem?.id}
              className={`${textColor} ${textHoverColor} font-semibold pr-3`}
            >
              {tagItem?.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
