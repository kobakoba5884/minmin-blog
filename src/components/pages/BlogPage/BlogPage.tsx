import React, { useEffect } from "react";
import { Layout } from "../../Layout";
import { Post, useGetPostBySlugQuery } from "../../../__generated__/graphql";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import { AuthorCard } from "../../Cards/AuthorCard";
import { TagsCard } from "../../Cards/TagsCard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useDarkModeContext } from "../../../contexts/DarkModeContext";

type BlogPageProps = {};

export const BlogPage: React.FC<BlogPageProps> = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setIsDarkMode } = useDarkModeContext();

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
          <h2 className={`dark:text-white text-slate-500 text-center py-3`}>
            {formatDate(post?.createdAt)}
          </h2>
          <h1
            className={`dark:text-white font-bold text-3xl text-center pb-3 border-b-2 border-b-slate-200 dark:border-b-emerald-200`}
          >
            {post?.title}
          </h1>
          <div className={`dark:text-white space-y-2 xl:grid xl:grid-cols-4`}>
            <div className={`xl:col-span-3 p-5 xl:border-b-0 border-b-2 border-b-slate-200 dark:border-b-emerald-200`}>
              <Markdown
                children={post?.content}
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        remarkplugins={[remarkGfm]}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={darkMode ? dark : undefined}
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
                className={`text-emerald-400 font-bold hover:text-emerald-700`}
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
