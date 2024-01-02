import React, { useEffect, useState } from "react";
import { Layout } from "../../Layout";
import { InputField } from "../../Elements/InputField";
import { PostListItem } from "../../PostListItem";
import {
  Post,
  useGetPostsByTagSlugQuery,
} from "../../../__generated__/graphql";
import { useLocation, useNavigate } from "react-router-dom";
import { getStyleForPath } from "../../../types/ColorStyles";
import { PageTitle } from "../../PageTitle";

type PostListByTagPageProps = {};

export const PostListByTagPage: React.FC<PostListByTagPageProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const borderColor = getStyleForPath(location.pathname)["border"];
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
        <div className="mx-5">
          <div className={`p-7 border-b-2 ${borderColor}`}>
            <PageTitle pageTitle={tagName as string} />
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
        </div>
      </Layout>
    </>
  );
};
