import React, { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Analytics } from "@vercel/analytics/react";
import { useDarkModeContext } from "../../contexts/DarkModeContext";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode, setIsDarkMode } = useDarkModeContext();

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className={`dark:bg-zinc-900`}>
        <div className={`h-screen flex flex-col md:px-3 max-w-5xl mx-auto`}>
          <Header />
          <main className={`flex-grow`}>{children}</main>
          <Footer />
          <Analytics />
        </div>
      </div>
    </div>
  );
};
