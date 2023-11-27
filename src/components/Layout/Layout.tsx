import React, { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Analytics } from "@vercel/analytics/react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-150 md:px-3 max-w-5xl mx-auto min-w-[320px]">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </div>
    </>
  );
};
