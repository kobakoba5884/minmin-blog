import React from "react";
import { Post } from "../../__generated__/graphql";
import { useLocation } from "react-router-dom";
import { getStyleForPath } from "../../types/ColorStyles";
import { format, parseISO } from "date-fns";

type PostListItemProps = {
  postItem: Partial<Post>;
};

export const PostListItem: React.FC<PostListItemProps> = ({ postItem }) => {
  const location = useLocation();

  const borderColor = getStyleForPath(location.pathname)["border"];
  const textColor = getStyleForPath(location.pathname)["text"];
  const textHoverColor = getStyleForPath(location.pathname)["textHover"];

  return (
    <>
      <article className={`space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 border-b-2 ${borderColor} p-3 mx-5`}>
        <div className="text-slate-500 xl:col-span-1">{postItem?.createdAt ? format(parseISO(postItem.createdAt), 'MMMM dd, yyyy') : ''}</div>
        <div className="xl:col-span-3">
          <h2 className="font-bold text-slate-700 text-2xl mb-4">{postItem?.title}</h2>
          <div className="flex flex-wrap mb-5">
            {postItem?.tags?.map((tagItem) => (
              <a href="#" key={tagItem?.id} className={`${textColor} ${textHoverColor} font-semibold pr-2`}>{tagItem?.name}</a>
            ))}
          </div>
          <div className="mb-4">{postItem?.excerpt}</div>
          <a href="#" className={`${textColor} ${textHoverColor} font-semibold mb-2`}>Read more &#8594;</a>
        </div>
      </article>
    </>
  );
};
