import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../Layout";
import { Button } from "../../Elements/Button";

type NotFoundProps = {};

export const NotFoundPage: React.FC<NotFoundProps> = ({}) => {
  return (
    <>
      <Layout>
        <div className="max-h-screen flex flex-col items-center justify-center p-4 dark:text-white">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-3xl mb-2">Sorry, we couldn't find this page.</h2>
          <p className="my-4">
            But don't worry, you can find plenty of other things on our
            homepage.
          </p>
          <Button>
            <Link to="/">Back to homepage</Link>
          </Button>
        </div>
      </Layout>
    </>
  );
};
