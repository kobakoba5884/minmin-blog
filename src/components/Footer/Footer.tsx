import React from "react";

type FooterProps = {};

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <>
      <footer className="text-center py-2">
        <p>© 2023 Minmin Blog.</p>
      </footer>
    </>
  );
};
