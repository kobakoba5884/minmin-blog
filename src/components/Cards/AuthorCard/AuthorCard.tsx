import React from "react";
import { Post } from "../../../__generated__/graphql";

type AuthorCardProps = {
  postItem: Post;
};

export const AuthorCard: React.FC<AuthorCardProps> = ({ postItem }) => {
  return (
    <>
      <div
        className={`p-5 border-b-2 border-b-slate-200 dark:border-b-emerald-200`}
      >
        <div
          className={`dark:bg-zinc-900 flex justify-center space-x-8 xl:flex xl:justify-around items-center py-2`}
        >
          <img
            src={postItem?.author?.photo?.url}
            alt="author photo"
            className={`my-1 rounded-full w-12 h-12 object-cover dark:shadow-emerald-300 shadow-lg`}
          />
          <h2 className="my-1 dark:text-white">{postItem?.author?.name}</h2>
        </div>
      </div>
    </>
  );
};
