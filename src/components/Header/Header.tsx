import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = ({}) => {
  const isDarkMode = false;

  return (
    <header className="px-6 py-5 bg-white">
      <div className="flex justify-between">
        <div>
            <Link to="/" className="text-slate-700 font-bold">Minmin Blog</Link>
        </div>
        <nav>
          <ul className="flex justify-end">
            <li className="px-3"><Link to="/">blog</Link></li>
            <li className="px-3"><Link to="/about">about</Link></li>
            <li className="px-3"><Link to="/tags">Tags</Link></li>
            <li className="px-3 flex items-center">
              <button>
                {isDarkMode ? <BsSun /> : <BsMoon />}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
