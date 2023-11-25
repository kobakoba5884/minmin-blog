import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./components/pages/AboutPage";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { TagsPage } from "./components/pages/TagsPage/TagsPage";

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_HYGRAPH_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_AUTH_TOKEN}`,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
