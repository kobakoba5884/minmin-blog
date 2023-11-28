import React, { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { TfiAlignRight, TfiAlignLeft } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";
import { getStyleForPath } from "../../types/ColorStyles";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = ({}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const borderColor = getStyleForPath(location.pathname)["border"];

  return (
    <>
      <header
        className={`px-6 py-6 bg-white z-50 text-xl ${borderColor} border-b-4 sm:border-none`}
      >
        <div className="flex justify-between">
          <div>
            <Link to="/" className="text-slate-700 font-bold">
              Minmin Blog
            </Link>
          </div>
          <nav className="font-semibold">
            <ul className="flex justify-end space-x-1">
              <li className="px-5 hidden sm:inline-block">
                <Link to="/">blog</Link>
              </li>
              <li className="px-5 hidden sm:inline-block">
                <Link to="/about">about</Link>
              </li>
              <li className="px-5 hidden sm:inline-block">
                <Link to="/tags">Tags</Link>
              </li>
              <li className="px-5 flex items-center">
                <button onClick={() => setIsDarkMode(!isDarkMode)}>
                  {isDarkMode ? <BsSun /> : <BsMoon />}
                </button>
              </li>
              <li className=" flex items-center sm:hidden">
                <button className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <TfiAlignRight /> : <TfiAlignLeft />}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div
        className={`sm:hidden fixed top-20 right-0 opacity-90 h-full w-full z-30 shadow-md bg-white p-5 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav>
          <ul className="flex flex-col space-y-6 text-4xl pl-10 text-slate-600 font-semibold">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/tags" onClick={() => setIsMenuOpen(false)}>
                Tags
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
