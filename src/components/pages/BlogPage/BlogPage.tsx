import React from "react";
import { Layout } from "../../Layout";
import { useGetPostBySlugQuery } from "../../../__generated__/graphql";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import ReactMarkdown from "react-markdown";
import { getStyleForPath } from "../../../types/ColorStyles";

type BlogPageProps = {};

export const BlogPage: React.FC<BlogPageProps> = ({}) => {
  const location = useLocation();
  const borderColor = getStyleForPath(location.pathname)["border"];
  const shadowColor = getStyleForPath(location.pathname)["shadow"];
  const textColor = getStyleForPath(location.pathname)["text"];
  const textHoverColor = getStyleForPath(location.pathname)["textHover"];

  const { data, loading, error } = useGetPostBySlugQuery({
    variables: {
      slug: location.pathname.split("/").pop() || "",
    },
  });
  const post = data?.post;

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
          <div
            className={`space-y-2 xl:grid xl:grid-cols-4`}
          >
            <div className="xl:col-span-1">
              <div className={`p-5 border-b-2 ${borderColor}`}>
                <h2>Author</h2>
                <div
                  className={`xl:flex xl:justify-between xl:items-center py-2`}
                >
                  <img
                    src={post?.author?.photo?.url}
                    alt="author photo"
                    className={`my-1 rounded-full w-10 h-10 object-cover ${shadowColor} shadow-lg`}
                  />
                  <h2 className="my-1">{post?.author?.name}</h2>
                </div>
              </div>
              <div className={`p-5 mb-4 border-b-2 ${borderColor}`}>
                <h2>Tags</h2>
                {post?.tags?.map((tagItem) => (
                  <Link
                    to="#"
                    key={tagItem?.id}
                    className={`${textColor} ${textHoverColor} font-semibold pr-3`}
                  >
                    {tagItem?.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/blog"
                className={`${textColor} ${textHoverColor} font-semibold mb-2`}
              >
                &larr; Back to the blog
              </Link>
            </div>
            <div className="xl:col-span-3 mx-2 px-3">{data?.post?.content}</div>
            {/* <ReactMarkdown>{data?.post?.content}</ReactMarkdown> */}
          </div>
        </article>
      </Layout>
    </>
  );
};
