import React, { ReactNode, createContext, useContext, useState } from "react";

type DarkModeContextType = {
  darkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
};

const DarkModeContextDefaultValues: DarkModeContextType = {
  darkMode: false,
  setIsDarkMode: () => {},
};

type DarkModeProviderProps = {
  children: ReactNode;
};

const DarkModeContext = createContext<DarkModeContextType>(
  DarkModeContextDefaultValues
);

export const useDarkModeContext = () => useContext(DarkModeContext);

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [darkMode, setIsDarkMode] = useState<boolean>(false);

  const value = { darkMode, setIsDarkMode };

  return (
    <>
      <DarkModeContext.Provider value={value}>
        {children}
      </DarkModeContext.Provider>
    </>
  );
};
