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

interface NavbarProps {
  // useful if you want to prevent layout shifts
  // e.g. refresh data before everything goes right to left
  changeLanguageOverride?: () => void;
}

const Navbar = ({ changeLanguageOverride }: NavbarProps) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
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
  };

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
            <MenuItem onClick={() => navigate("/mission")}>
              {t("nav_mission")}
            </MenuItem>
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
            onClick={changeLanguageOverride || handleLanguageChange}
          >
            {i18n.language === "en" ? "عربي" : "English"}
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
