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
  const borderColor = getStyleForPath(location.pathname)["border"];

  return (
    <>
      <Layout>
        <div className="max-w-xl mx-auto pb-7 px-7">
        <h2 className={`mb-5 text-slate-700 font-bold text-4xl py-7 border-b-2 ${borderColor}`}>Tags</h2>
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
