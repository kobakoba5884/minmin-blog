// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { useLocation } from "react-router-dom";

// type ColorContextType = {
//   color: string;
//   setColor: (color: string) => void;
// };

// const ColorContextDefaultValues: ColorContextType = {
//   color: "orange",
//   setColor: () => {},
// };

// const ColorContext = createContext<ColorContextType>(ColorContextDefaultValues);

// export const useColorContext = () => useContext(ColorContext);

// type ColorProviderProps = {
//   children: ReactNode;
// };

// export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
//   const location = useLocation();
//   const [color, setColor] = useState<string>("orange");

//   useEffect(() => {
//     switch (location.pathname) {
//       case "/":
//         setColor("orange");
//         break;
//       case "/about":
//         setColor("blue");
//         break;
//       case "/tags":
//         setColor("green");
//         break;
//       default:
//         setColor("orange");
//     }
//   }, [location]);

//   const value = { color, setColor };

//   console.log('context ' + color)

//   return (
//     <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
//   );
// };
