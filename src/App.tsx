import { useState } from "react";
import { Post, useGetPostsQuery } from "./__generated__/graphql";
import { InputField } from "./components/Elements/InputField";
import { Layout } from "./components/Layout";
import { PostListItem } from "./components/PostListItem";
import { getStyleForPath } from "./types/ColorStyles";
import { useDarkModeContext } from "./contexts/DarkModeContext";

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
      <div className={`${darkMode ? 'dark': ''}`}>
        <Layout>
          <div className={`space-y-2 pb-7 m-5 border-b-2 ${borderColor}`}>
            <h2 className={`mb-5 dark:text-white text-slate-700 font-bold text-4xl py-2`}>
              All Posts
            </h2>
            <div>
              <InputField
                placeholder="search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          {filteredPosts?.map((postItem) => (
            <PostListItem
              key={postItem.id}
              postItem={postItem as Partial<Post>}
            />
          ))}
        </Layout>
      </div>
    </>
  );
}

export default App;
