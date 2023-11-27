import React from "react";
import { Layout } from "../../Layout";
import { useGetAuthorQuery } from "../../../__generated__/graphql";

type AboutProps = {};

export const AboutPage: React.FC<AboutProps> = ({}) => {
  const { data, loading, error } = useGetAuthorQuery({
    variables: {
      id: "clpe6ucn25yvp0a15hvmul45j",
    },
  });

  const author = data?.author;

  return (
    <>
      <Layout>
        <div className="max-w-xl mx-auto p-7">
          <div className="bg-white rounded p-5 flex flex-col items-center">
            <h2 className="text-xl">{author?.name}</h2>
            <img
              src={author?.photo?.url}
              alt=""
              className="rounded-full w-48 h-48 object-cover mt-8 shadow-blue-200 shadow-lg"
            />
            <p className="mt-8">{author?.bio}</p>
          </div>
        </div>
      </Layout>
    </>
  );
};
