import {
  Box,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDown } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Home } from "react-feather";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const navigate = useNavigate();
  const MenuBar = () => {
    return (
      <HStack spacing={4} alignItems="center" aria-label="navigation-menu">
        <Menu>
          <MenuButton
            as={Button}
            px={4}
            py={2}
            onClick={() => navigate("/archive")}
            size="sm"
            variant="ghost"
          >
            {t("nav_the_archive")}
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDown />}
            size="sm"
            variant="ghost"
          >
            {t("nav_about")}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate("/who-are-we")}>
              {t("nav_who_are_we")}
            </MenuItem>
            <MenuItem onClick={() => navigate("/mission")}>{t("nav_mission")}</MenuItem>
            <MenuItem onClick={() => navigate("/why-another-archive")}>
              {t("nav_why_another_archive")}
            </MenuItem>
            <MenuItem onClick={() => navigate("/code-of-conduct")}>
              {t("nav_coc")}
            </MenuItem>
          </MenuList>
        </Menu>
        <Box>
          <Button
            colorScheme="pink"
            variant="ghost"
            onClick={() => {
              const newLanguage = language === "en" ? "ar" : "en";
              setLanguage(newLanguage);
              changeLanguage(newLanguage);
              switch (newLanguage) {
                case "en":
                  document.documentElement.lang = "en";
                  document.documentElement.dir = "ltr";
                  break;
                case "ar":
                  document.documentElement.lang = "ar";
                  document.documentElement.dir = "rtl";
                  break;
                default:
                  throw `Language ${newLanguage} is not supported`;
              }
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
