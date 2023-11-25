import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../Layout";

type NotFoundProps = {};

export const NotFoundPage: React.FC<NotFoundProps> = ({}) => {
  return (
    <>
      <Layout>
        <div className="max-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-3xl mt-2">Sorry, we couldn't find this page.</h2>
          <p className="mt-2">
            But don't worry, you can find plenty of other things on our
            homepage.
          </p>
          <button>
            <Link to="/">Back to homepage</Link>
          </button>
        </div>
      </Layout>
    </>
  );
};
