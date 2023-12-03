import React from "react";
import { Layout } from "../../Layout";
import { Post, useGetPostBySlugQuery } from "../../../__generated__/graphql";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import ReactMarkdown from "react-markdown";
import { getStyleForPath } from "../../../types/ColorStyles";
import { AuthorCard } from "../../Cards/AuthorCard";
import { TagsCard } from "../../Cards/TagsCard";

type BlogPageProps = {};

export const BlogPage: React.FC<BlogPageProps> = ({}) => {
  const location = useLocation();
  const borderColor = getStyleForPath(location.pathname)["border"];
  const textColor = getStyleForPath(location.pathname)["text"];
  const textHoverColor = getStyleForPath(location.pathname)["textHover"];

  const { data, loading, error } = useGetPostBySlugQuery({
    variables: {
      slug: location.pathname.split("/").pop() || "",
    },
  });
  const post = data?.post as Post;

  return (
    <>
      <Layout>
        <article className="px-3">
          <h2 className={`text-slate-500 text-center py-3`}>
            {formatDate(post?.createdAt)}
          </h2>
          <h1
            className={`font-bold text-3xl text-center pb-3 border-b-2 ${borderColor}`}
          >
            {post?.title}
          </h1>
          <div className={`space-y-2 xl:grid xl:grid-cols-4`}>
            <div className="xl:col-span-3 p-5">
              <ReactMarkdown>{data?.post?.content}</ReactMarkdown>
            </div>
            <div className="xl:col-span-1">
              <AuthorCard postItem={post}/>
              <TagsCard postItem={post} />
              <Link
                to="/blog"
                className={`${textColor} ${textHoverColor} font-semibold`}
              >
                &larr; Back to the blog
              </Link>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};
