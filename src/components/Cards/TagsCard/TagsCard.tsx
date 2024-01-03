import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../../__generated__/graphql";

type TagsCardProps = {
  postItem: Post;
};

export const TagsCard: React.FC<TagsCardProps> = ({ postItem }) => {
  return (
    <>
      <div
        className={`p-5 mb-4 border-b-2 border-b-slate-200 dark:border-b-emerald-200`}
      >
        <h2 className="dark:text-white">Tags</h2>
        <div className="flex flex-wrap dark:bg-zinc-900">
          {postItem?.tags?.map((tagItem) => (
            <Link
              to={`/tags/${tagItem?.slug}`}
              key={tagItem?.id}
              className={`text-emerald-400 font-bold hover:text-emerald-700 pr-3`}
            >
              {tagItem?.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
