import React from "react";
import { Post } from "../../../__generated__/graphql";
import { useLocation } from "react-router-dom";
import { getStyleForPath } from "../../../types/ColorStyles";

type AuthorCardProps = {
  postItem: Post;
};

export const AuthorCard: React.FC<AuthorCardProps> = ({ postItem }) => {
  const location = useLocation();
  const borderColor = getStyleForPath(location.pathname)["border"];
  const shadowColor = getStyleForPath(location.pathname)["shadow"];

  return (
    <>
      <div className={`p-5 border-b-2 ${borderColor}`}>
        <div className={`flex justify-center space-x-8 xl:flex xl:justify-around items-center py-2`}>
          <img
            src={postItem?.author?.photo?.url}
            alt="author photo"
            className={`my-1 rounded-full w-12 h-12 object-cover ${shadowColor} shadow-lg`}
          />
          <h2 className="my-1">{postItem?.author?.name}</h2>
        </div>
      </div>
    </>
  );
};
