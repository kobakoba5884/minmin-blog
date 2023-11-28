import React from "react";
import { Layout } from "../../Layout";
import { useGetTagsQuery } from "../../../__generated__/graphql";

type TagsProps = {};

export const TagsPage: React.FC<TagsProps> = ({}) => {
  const { data, loading, error } = useGetTagsQuery();

  return (
    <>
      <Layout>
        <div className="max-w-xl mx-auto p-7">
          <div className="flex flex-wrap">
            {data?.tags.map((tagItem) => (
              <div key={tagItem.name} className="mr-2 mb-2">
                <span className="rounded px-3 py-1 text-sm font-semibold mr-2">
                  {tagItem.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};
