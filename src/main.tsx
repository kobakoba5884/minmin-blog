import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./components/pages/AboutPage";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { TagsPage } from "./components/pages/TagsPage/TagsPage";
import { BlogPage } from "./components/pages/BlogPage";
import { AllPostListPage } from "./components/pages/AllPostListPage";
import { PostListByTagPage } from "./components/pages/PostListByTagPage";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_HYGRAPH_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_AUTH_TOKEN}`,
  },
});

console.log(import.meta.env.VITE_HYGRAPH_ENDPOINT);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <DarkModeProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<AllPostListPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/tags/:slug" element={<PostListByTagPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </DarkModeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
