import React from "react";
import { Layout } from "../../Layout";
import { useGetTagsQuery } from "../../../__generated__/graphql";
import { Link, useLocation } from "react-router-dom";
import { getStyleForPath } from "../../../types/ColorStyles";
import { PageTitle } from "../../PageTitle";

type TagsProps = {};

export const TagsPage: React.FC<TagsProps> = ({}) => {
  const { data, loading, error } = useGetTagsQuery();
  const location = useLocation();
  const textColor = getStyleForPath(location.pathname)["text"];
  const textHoverColor = getStyleForPath(location.pathname)["textHover"];
  const borderColor = getStyleForPath(location.pathname)["border"];

  return (
    <>
      <Layout>
        <div className="p-7">
          <PageTitle pageTitle="Tags" className={`pb-7 border-b-2 ${borderColor}`}/>
          <div className="flex flex-wrap py-7">
            {data?.tags.map((tagItem) => (
              <Link
                to={`/tags/${tagItem?.slug}`}
                key={tagItem?.id}
                className={`${textColor} ${textHoverColor} text-2xl font-semibold mt-2 mb-2 mr-5`}
              >
                {tagItem?.name} ({tagItem?.posts?.length})
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};
