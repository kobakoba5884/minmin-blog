type StyleConfig = {
  border: string;
  shadow: string;
  text: string;
  textHover: string;
};

export type ColorStyles = {
  [key: string]: StyleConfig;
};

export const colorStyles: ColorStyles = {
  "/": {
    border: "border-b-orange-300",
    shadow: "shadow-orange-300",
    text: "text-orange-300",
    textHover: "hover:text-orange-500",
  },
  "/about": {
    border: "border-b-blue-300",
    shadow: "shadow-blue-300",
    text: "text-blue-300",
    textHover: "hover:text-blue-500",
  },
  "/tags": {
    border: "border-b-green-300",
    shadow: "shadow-green-300",
    text: "text-green-300",
    textHover: "hover:text-green-500",
  },
  default: {
    border: "border-b-red-300",
    shadow: "shadow-red-300",
    text: "text-red-300",
    textHover: "hover:text-red-500",
  },
};

export const getStyleForPath = (pathname: string): StyleConfig => {
  return colorStyles[pathname] || colorStyles["default"];
}