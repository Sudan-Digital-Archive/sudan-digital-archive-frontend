import { useTranslation } from "react-i18next";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { type ChakraProviderProps } from "@chakra-ui/react";

export default function ChakraThemeRTLProvider({
  children,
}: ChakraProviderProps) {
  const { i18n } = useTranslation();
  const direction = i18n.language === "en" ? "ltr" : "rtl";

  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };
  // https://stackoverflow.com/questions/68988224/scrollbar-css-not-showing-on-iphone-chrome-and-safari
  const styles = {
    global: {
      "::-webkit-scrollbar": {
        width: "5px",
        background: "transparent",
      },
      "*::-webkit-scrollbar-track": {
        background: "transparent",
        width: "5px",
      },
      "*::-webkit-scrollbar-track-piece": {
        background: "transparent",
        width: "5px",
      },
      "*::-webkit-scrollbar-corner": {
        background: "transparent",
      },
      "*::-webkit-scrollbar-resizer": {
        background: "transparent",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "var(--chakra-colors-pink-700)",
      },
      "*::-webkit-resizer": {
        backgroundColor: "transparent",
      },
      "*::-webkit-scrollbar-button": {
        background: "transparent",
        width: "5px",
      },
    },
  };
  //   const styles = {
  //     global: {
  //       // "*::-webkit-scrollbar": {
  //       //   width: "10px",
  //       //   background: "transparent",
  //       // },
  // "*::-webkit-scrollbar-track": {
  //   background: "transparent",
  // },
  // "*::-webkit-scrollbar-corner": {
  //   background: "red",
  // },
  // "*::-webkit-scrollbar-resizer": {
  //   background: "red",
  // },
  // "*::-webkit-scrollbar-thumb": {
  //   backgroundColor: "var(--chakra-colors-gray-800)",
  //   borderRadius: 0,
  //   border: "none",
  // },
  // "*::-webkit-scrollbar-button": {
  //   background: "transparent",
  // },
  // '::-webkit-scrollbar': {
  //       w: '0.25rem',
  //       bgColor: 'black',
  //     },
  //    '::-webkit-scrollbar-thumb': {
  //       bgColor: 'orange',
  //     },
  //       "*": {
  //         scrollbarWidth: "thin",
  //         scrollbarColor:
  //           "var(--chakra-colors-pink-700) var(--chakra-colors-grey-800);",
  //       },
  //     },
  //   };
  const theme = extendTheme({
    config,
    direction,
    styles,
  });

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
