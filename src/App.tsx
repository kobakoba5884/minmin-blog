import { Post, useGetPostsQuery } from "./__generated__/graphql";
import { InputField } from "./components/Elements/InputField";
import { Layout } from "./components/Layout";
import { PostListItem } from "./components/PostListItem";

function App() {
  const { data, loading, error } = useGetPostsQuery();

  console.log(data?.posts)

  return (
    <>
      <Layout>
        <div className="max-w-2xl mx-auto p-5 mb-3">
          <h2 className="mb-5 font-bold text-4xl">All Post</h2>
          <div>
            <InputField placeholder="search" />
          </div>
        </div>
        {data?.posts.map((postItem) => (
          <PostListItem key={postItem.id} postItem={postItem as Partial<Post>} />
        ))}
      </Layout>
    </>
  );
}

export default App;
