import { Box, HStack, Link, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Home } from "react-feather";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const links = [
  {
    url: "/archive",
    title: "The Archive",
  },
  {
    url: "/about",
    title: "About",
  },
];

const Navbar = () => {
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const navigate = useNavigate();
  const MenuBar = () => {
    return (
      <HStack spacing={4} alignItems="center" aria-label="navigation-menu">
        {[
          links.map((link) => {
            return (
              <Box key={link.url}>
                <Link
                  px={4}
                  py={2}
                  onClick={() => navigate(link.url)}
                  rounded="sm"
                  fontSize="sm"
                >
                  {link.title}
                </Link>
              </Box>
            );
          }),
        ]}
        <Box>
          <Button
            colorScheme="pink"
            variant="ghost"
            onClick={() => {
              const newLanguage = language === "en" ? "ar" : "en";
              setLanguage(newLanguage);
              changeLanguage(newLanguage);
            }}
          >
            {language === "en" ? "عربي" : "English"}
          </Button>
        </Box>
      </HStack>
    );
  };

  return (
    <Box
      as="header"
      zIndex={1}
      borderTop="3px solid"
      style={{
        borderImage:
          "linear-gradient(to right, var(--chakra-colors-cyan-300), var(--chakra-colors-pink-600)) 1 0 0 0",
      }}
    >
      <Box maxW="6xl" mx="auto" px={4}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          py={4}
          flexDir={["column", "column", "row"]}
          gridGap={[4, 4, 0]}
        >
          <Box display="flex" alignItems="center">
            <Link
              onClick={() => navigate("/")}
              display="flex"
              aria-label="Logo"
            >
              <Home />
            </Link>
          </Box>
          <MenuBar />
        </HStack>
      </Box>
    </Box>
  );
};

export default Navbar;
