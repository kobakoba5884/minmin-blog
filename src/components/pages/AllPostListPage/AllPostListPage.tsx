import React, { ReactNode, useState } from "react";
import { Layout } from "../../Layout";
import { InputField } from "../../Elements/InputField";
import { PostListItem } from "../../PostListItem";
import { Post, useGetPostsQuery } from "../../../__generated__/graphql";

type AllPostListPageProps = {};

export const AllPostListPage: React.FC<AllPostListPageProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useGetPostsQuery();

  const filteredPosts = searchTerm
    ? data?.posts?.filter(
        (post) =>
          post?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post?.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post?.tags.some((tag) =>
            tag?.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : data?.posts;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
  };

  return (
    <>
      <Layout>
        <div className="max-w-2xl mx-auto p-5 mb-3">
          <h2 className="mb-5 font-bold text-4xl">All Post</h2>
          <div>
            <InputField
              placeholder="search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        {filteredPosts?.map((postItem) => (
          <PostListItem
            key={postItem.id}
            postItem={postItem as Partial<Post>}
          />
        ))}
      </Layout>
    </>
  );
};