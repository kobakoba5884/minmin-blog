import { Post, useGetPostsWithLimitQuery } from "./__generated__/graphql";
import { Layout } from "./components/Layout";
import { PostListItem } from "./components/PostListItem";
import { PageTitle } from "./components/PageTitle";

function App() {
  const POSTS_PER_PAGE = 5;
  const { data, loading, error } = useGetPostsWithLimitQuery({
    variables: { first: POSTS_PER_PAGE },
  });

  return (
    <>
      <Layout>
        <div className="mx-5 p-7">
          <PageTitle
            pageTitle="Latest"
            className={`pb-7 border-b-2 border-b-slate-200 dark:border-b-emerald-200`}
          />
          {data?.posts?.map((postItem) => (
            <PostListItem
              key={postItem.id}
              postItem={postItem as Partial<Post>}
            />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default App;
