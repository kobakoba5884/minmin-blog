import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  dark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDarkModeContext } from "../../contexts/DarkModeContext";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

type CustomMarkdownProps = {
  content: string;
};

const customDarkStyle = {
  ...dark,
  hljs: {
    ...dark.hljs,
    backgroundColor: "#282c34", // Customize the dark mode background color here
    borderRadius: "10px",
    padding: "20px",
    overflow: "hidden",
    marginTop: "10px",
    marginBottom: "10px",
    overflowX: "auto" as "auto",
  },
};

const customLightStyle = {
  ...materialLight,
  hljs: {
    ...materialLight.hljs,
    backgroundColor: "#f5f5f5", // Customize the light mode background color here
    borderRadius: "10px",
    padding: "20px",
    overflow: "hidden",
    marginTop: "10px",
    marginBottom: "10px",
    overflowX: "auto" as "auto",
  },
};

export const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ content }) => {
  const { darkMode, setIsDarkMode } = useDarkModeContext();
  return (
    <>
      <Markdown
        children={content}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <div className="relative custom-scrollbar">
                <SyntaxHighlighter
                  remarkplugins={[remarkGfm]}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={darkMode ? customDarkStyle : customLightStyle}
                />
                <CopyToClipboard text={String(children).replace(/\n$/, "")}>
                  <button
                    className="absolute top-0 right-0 mt-3 mr-3"
                    onClick={() => console.log("Copied!")}
                  >
                    <FaRegCopy className="text-2xl cursor-pointer text-emerald-400 hover:text-emerald-700" />
                  </button>
                </CopyToClipboard>
              </div>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
          p: ({ node, ...props }) => <p className="text-lg py-2" {...props} />,
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl py-5 font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl py-5 font-bold" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="text-xl py-2" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="list-disc py-2" {...props} />
          ),
        }}
      />
    </>
  );
};
