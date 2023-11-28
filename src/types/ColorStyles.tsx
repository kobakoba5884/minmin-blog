type StyleConfig = {
  border: string;
  shadow: string;
};

export type ColorStyles = {
  [key: string]: StyleConfig;
};

export const colorStyles: ColorStyles = {
  "/": {
    border: "border-b-orange-200",
    shadow: "shadow-orange-200",
  },
  "/about": {
    border: "border-b-blue-200",
    shadow: "shadow-blue-200",
  },
  "/tags": {
    border: "border-b-green-200",
    shadow: "shadow-green-200",
  },
  default: {
    border: "border-b-red-200",
    shadow: "shadow-red-200",
  },
};

export const getStyleForPath = (pathname: string): StyleConfig => {
  return colorStyles[pathname] || colorStyles["default"];
}
