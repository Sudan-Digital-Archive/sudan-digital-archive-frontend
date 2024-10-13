import { Box, HStack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Home } from "react-feather";

const links = [
  {
    url: "/archive",
    title: "The Archive",
  },
  {
    url: "/about",
    title: "About",
  },
  {
    url: "/archive",
    title: "Arabic",
  },
];

/**
 * Navigation menu component.
 * @return {ReactElement} the menubar.
 */
const Navbar = () => {
  const navigate = useNavigate();
  const menuBar = () => {
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
          {menuBar()}
        </HStack>
      </Box>
    </Box>
  );
};

export default Navbar;
