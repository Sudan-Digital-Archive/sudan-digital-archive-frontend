import { Box, SlideFade, VStack, Heading, Text } from "@chakra-ui/react";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import Flag from "react-flagpack";
import "react-flagpack/dist/style.css";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      <Menu />
      <SlideFade in>
        <Box
          as="section"
          h={"calc(80vh - 50px)"}
          display="flex"
          alignItems="center"
          maxW="2xl"
          mx="auto"
          px={4}
        >
          <Box>
            <VStack spacing={2} align="left">
              <Heading
                textAlign="center"
                py={2}
                bgGradient="linear(to-r, cyan.300, pink.600)"
                bgClip="text"
              >
                {t("about_heading")}
              </Heading>
              <Text as="div" fontSize="lg">
                We are a <Box as="b">grassroots </Box> organization of people
                who care about what is going on in Sudan{" "}
                <Flag code="SD" gradient="real-linear" size="m" hasDropShadow />
                . We don't want important historical events to go{" "}
                <Box as="b">undocumented</Box>.
              </Text>

              <Text fontSize="lg">
                You might think that's <Box as="b">impossible</Box> - everything
                goes online these days! But that's exactly the problem. There is
                so much content on the internet that it can be{" "}
                <Box as="b">hard to find </Box>what you are looking for. Even
                worse, things often <Box as="b">disappear</Box> within a few
                years.
              </Text>
              <Text fontSize="lg">So, we decided to build an archive.</Text>
            </VStack>
          </Box>
        </Box>
      </SlideFade>
      <Footer />
    </>
  );
}
