import React from "react";
import { Layout } from "../../Layout";
import { useGetAuthorByIdQuery } from "../../../__generated__/graphql";
import { getStyleForPath } from "../../../types/ColorStyles";
import { useLocation } from "react-router-dom";
import { PageTitle } from "../../PageTitle";

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
        <div className="p-7 dark:text-white">
          <PageTitle pageTitle="About" className={`border-b-2 ${borderColor}`}/>
          <div className="flex flex-col justify-center items-center space-y-7 py-7">
            <h2 className={`text-2xl`}>{author?.name}</h2>
            <img
              src={author?.photo?.url}
              alt="author photo"
              className={`rounded-full w-48 h-48 object-cover ${shadowColor} shadow-lg`}
            />
            <p className="">{author?.bio}</p>
          </div>
        </div>
      </Layout>
    </>
  );
};
