import React from "react";
import { Post } from "../../__generated__/graphql";

type PostListItemProps = {
    postItem: Post
};

export const PostListItem: React.FC<PostListItemProps> = ({postItem}) => {
  return (
    <>
      <div className="flex justify-between border mx-5">
        <div className="p-5 border">{postItem?.createdAt}</div>
        <div className="p-5 border">
          <div>{postItem?.title}</div>
          <div>
            {postItem?.tags.map((tagItem) => (
              <span>{tagItem?.name}</span>
            ))}
          </div>
          <div>{postItem?.excerpt}</div>
        </div>
      </div>
    </>
  );
};
