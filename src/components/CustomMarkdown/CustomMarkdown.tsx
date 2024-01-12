import React, { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { dark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDarkModeContext } from "../../contexts/DarkModeContext";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { VscFoldDown, VscFoldUp } from "react-icons/vsc";

type CustomMarkdownProps = {
  content: string;
};

const sharedStyle = {
  borderRadius: "10px",
  padding: "20px",
  overflow: "hidden",
  marginTop: "10px",
  marginBottom: "10px",
  overflowX: "auto" as "auto",
};

const customDarkStyle = {
  ...dark,
  hljs: {
    ...dark.hljs,
    ...sharedStyle,
    backgroundColor: "#27272a",
  },
};

const customLightStyle = {
  ...oneLight,
  hljs: {
    ...oneLight.hljs,
    ...sharedStyle,
    backgroundColor: "#f5f5f5",
  },
};

export const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ content }) => {
  const { darkMode, setIsDarkMode } = useDarkModeContext();
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      <Markdown
        children={content}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <div className="relative group">
                <SyntaxHighlighter
                  remarkplugins={[remarkGfm]}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={darkMode ? customDarkStyle : customLightStyle}
                />
                <CopyToClipboard
                  text={String(children).replace(/\n$/, "")}
                  onCopy={onCopy}
                >
                  <button className="absolute top-0 right-0 mt-3 mr-3 hidden group-hover:block">
                    <FaRegCopy
                      className={`text-2xl cursor-pointer hover:text-emerald-700 ${
                        copied ? "text-orange-400" : "text-emerald-400"
                      }`}
                    />
                  </button>
                </CopyToClipboard>
              </div>
            ) : (
              <code {...rest} className={`text-pink-400`}>
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
          h3: ({ node, ...props }) => (
            <h3 className="text-3xl py-5 font-semibold" {...props} />
          ),
          h4: ({ node, ...props }) => {
            const [showThoughts, setShowThoughts] = useState(false);

            return (
              <small className="\">
                <button
                  onClick={() => setShowThoughts(!showThoughts)}
                  className="text-xl text-center rounded-t-lg w-full bg-neutral-100 dark:bg-zinc-800 text-emerald-400 font-bold hover:text-emerald-700 py-1 px-5"
                >
                  {showThoughts ? (
                    <VscFoldUp className="inline-block" />
                  ) : (
                    <VscFoldDown className="inline-block" />
                  )}
                </button>
                <h4
                  className={`text-lg p-5 overflow-hidden bg-neutral-100 dark:bg-zinc-800 rounded-b-lg ${showThoughts ? "block" : "hidden"}`}
                  {...props}
                />
              </small>
            );
          },
          ul: ({ node, ...props }) => (
            <ul className="text-xl py-5" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="list-disc py-2 ml-7" {...props} />
          ),
          hr: ({ node, ...props }) => <hr className="" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-emerald-400 font-bold hover:text-emerald-700"
              {...props}
            />
          ),
        }}
      />
    </>
  );
};
