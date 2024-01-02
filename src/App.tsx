import { useState } from "react";
import { Post, useGetPostsQuery } from "./__generated__/graphql";
import { InputField } from "./components/Elements/InputField";
import { Layout } from "./components/Layout";
import { PostListItem } from "./components/PostListItem";
import { getStyleForPath } from "./types/ColorStyles";
import { useDarkModeContext } from "./contexts/DarkModeContext";
import { PageTitle } from "./components/PageTitle";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useGetPostsQuery();
  const borderColor = getStyleForPath(location.pathname)["border"];
  const { darkMode, setIsDarkMode } = useDarkModeContext();

  const filteredPosts = searchTerm
    ? data?.posts?.filter(
        (post) =>
          post?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post?.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post?.tags.some((tag) =>
            tag?.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : data?.posts;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
  };

  return (
    <>
      <Layout>
        <div className="mx-5">
          <div className={`p-7 border-b-2 ${borderColor}`}>
            <PageTitle pageTitle="All Posts" />
            <div>
              <InputField
                placeholder="search"
                value={searchTerm}
                onChange={handleSearch}
                className=""
              />
            </div>
          </div>
          {filteredPosts?.map((postItem) => (
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
