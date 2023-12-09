import React from "react";
import { Layout } from "../../Layout";
import { useGetTagsQuery } from "../../../__generated__/graphql";
import { Link, useLocation } from "react-router-dom";
import { getStyleForPath } from "../../../types/ColorStyles";

type TagsProps = {};

export const TagsPage: React.FC<TagsProps> = ({}) => {
  const { data, loading, error } = useGetTagsQuery();
  const location = useLocation();
  const textColor = getStyleForPath(location.pathname)["text"];
  const textHoverColor = getStyleForPath(location.pathname)["textHover"];

  return (
    <>
      <Layout>
        <div className="max-w-xl mx-auto p-7">
          <div className="flex flex-wrap">
            {data?.tags.map((tagItem) => (
              <div key={tagItem.name} className="flex flex-wrap">
                  <Link
                    to={`/tags/${tagItem?.slug}`}
                    key={tagItem?.id}
                    className={`${textColor} ${textHoverColor} text-2xl font-semibold pr-5`}
                  >
                    {tagItem?.name}
                  </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};
