import React from "react";
import { Layout } from "../../Layout";
import { useGetAuthorByIdQuery } from "../../../__generated__/graphql";
import { getStyleForPath } from "../../../types/ColorStyles";
import { useLocation } from "react-router-dom";

type AboutProps = {};

export const AboutPage: React.FC<AboutProps> = ({}) => {
  const location = useLocation();
  const shadowColor = getStyleForPath(location.pathname)["shadow"];
  const borderColor = getStyleForPath(location.pathname)["border"];
  const { data, loading, error } = useGetAuthorByIdQuery({
    variables: {
      id: "clpe6ucn25yvp0a15hvmul45j",
    },
  });

  const author = data?.author;

  return (
    <>
      <Layout>
        <div className="max-w-xl mx-auto pb-7 px-7">
        <h2 className={`mb-5 dark:text-white text-slate-700 font-bold text-4xl py-7 border-b-2 ${borderColor}`}>About</h2>
          <div className=" p-5 flex flex-col items-center">
            <h2 className={`text-xl p-3 dark:text-white`}>{author?.name}</h2>
            <img
              src={author?.photo?.url}
              alt="author photo"
              className={`rounded-full w-48 h-48 object-cover mt-8 ${shadowColor} shadow-lg`}
            />
            <p className="mt-8 dark:text-white">{author?.bio}</p>
          </div>
        </div>
      </Layout>
    </>
  );
};
