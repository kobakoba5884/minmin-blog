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
          <article className="bg-white rounded p-5 flex flex-col items-center">
            <p className="text-xl">{author?.name}</p>
            <img
              src={author?.photo?.url}
              alt=""
              className="rounded-full w-32 h-32 object-cover mt-4"
            />
            <p className="mt-4">{author?.bio}</p>
          </article>
        </div>
      </Layout>
    </>
  );
};
