import React, { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-150">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};
