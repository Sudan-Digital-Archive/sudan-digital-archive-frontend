import { Box, HStack, Link, Highlight, Text } from "@chakra-ui/react";
import { GitHub } from "react-feather";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <Box p={6}>
      <Box maxW="6xl" mx="auto" fontSize="xs">
        <Box
          display="flex"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
        >
          <HStack spacing={2}>
            <Box display="flex" alignItems="center">
              <Text p={2}>
                <Highlight
                  query={
                    i18n.language === "en"
                      ? ["free", "open source", "software"]
                      : ["مجاني", "برنامج", "مفتوح المصدر"]
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
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
