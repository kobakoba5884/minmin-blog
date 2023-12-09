import { highlightAll } from "prismjs";
import React, {
  ReactNode,
  useEffect,
} from "react";
// import { CodeComponent } from 'react-markdown/src/ast-to-react';
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/light-async";

type CodeBlockProps = React.HTMLAttributes<HTMLElement> & {
  node: any;
  children: ReactNode;
  inline?: boolean;
  className?: string;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  useEffect(() => {
    highlightAll();
  }, [children]);

  return (
    <>
      <SyntaxHighlighter
        style={dark}
        // language={lang}
        children={String(children).replace(/\n$/, "")}
      />
    </>
  );
};
