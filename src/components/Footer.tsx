import { Box, HStack, Link, Highlight, Text, Stack } from "@chakra-ui/react";
import { GitHub } from "react-feather";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
const Footer = () => {
  const { t, i18n } = useTranslation();
  //TODO: Put in custom hook
  const [width, setWidth] = useState<number>(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const isMobile = width <= 768;
  return (
    <Box p={6}>
      <Box maxW="6xl" mx="auto" fontSize="xs">
        <Stack
          direction={isMobile ? "column" : "row"}
          textAlign={isMobile ? "center" : "center"}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Text lineHeight="2.5">
            <Highlight
              query={
                i18n.language === "en"
                  ? ["free", "open source", "software"]
                  : ["برمجيات", "مفتوحة", "المصدر"]
              }
              styles={{
                px: "1.5",
                py: "1",
                rounded: "full",
                bg: "teal.100",
              }}
            >
              {t("footer_text")}
            </Highlight>
          </Text>
          <Link
            href="https://github.com/Sudan-Digital-Archive/sudan-digital-archive-frontend"
            rounded="sm"
            color="gray.100"
            fontWeight="bold"
            isExternal
          >
            <HStack spacing={2} alignItems="center">
              <Box as={GitHub} /> <Text>Github</Text>
            </HStack>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
