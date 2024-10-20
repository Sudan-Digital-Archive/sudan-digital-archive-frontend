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

  const theme = extendTheme({
    config,
    direction,
  });

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
