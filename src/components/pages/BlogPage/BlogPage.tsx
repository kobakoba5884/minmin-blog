import React, { useEffect } from "react";
import { Layout } from "../../Layout";
import { Post, useGetPostBySlugQuery } from "../../../__generated__/graphql";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import { getStyleForPath } from "../../../types/ColorStyles";
import { AuthorCard } from "../../Cards/AuthorCard";
import { TagsCard } from "../../Cards/TagsCard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

type BlogPageProps = {};

export const BlogPage: React.FC<BlogPageProps> = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const borderColor = getStyleForPath(location.pathname)["border"];
  const textColor = getStyleForPath(location.pathname)["text"];
  const textHoverColor = getStyleForPath(location.pathname)["textHover"];

  const { data, loading, error } = useGetPostBySlugQuery({
    variables: {
      slug: location.pathname.split("/").pop() || "",
    },
  });

  useEffect(() => {
    if (!loading && !data?.post) {
      navigate("/404", { replace: true });
    }
  }, [loading, data, navigate]);

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
              <Markdown
                children={post?.content}
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        remarkplugins={[remarkGfm]}
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        // style={dark}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>
            <div className="xl:col-span-1">
              <AuthorCard postItem={post} />
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
