import React, { useEffect, useState } from "react";
import { Layout } from "../../Layout";
import { InputField } from "../../Elements/InputField";
import { PostListItem } from "../../PostListItem";
import {
  Post,
  useGetPostsByTagSlugQuery,
} from "../../../__generated__/graphql";
import { useLocation, useNavigate } from "react-router-dom";

type PostListByTagPageProps = {};

export const PostListByTagPage: React.FC<PostListByTagPageProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { data, loading, error } = useGetPostsByTagSlugQuery({
    variables: {
      slug: location.pathname.split("/").pop() || "",
    },
  });

  useEffect(() => {
    if (!loading && data?.posts.length == 0) {
      navigate("/404", { replace: true });
    }
  }, [loading, data, navigate]);

  const tagName = data?.tag?.name;

  const filteredPosts = searchTerm
    ? data?.posts?.filter(
        (post) =>
          post?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post?.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="mb-5 font-bold text-4xl">{tagName}</h2>
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