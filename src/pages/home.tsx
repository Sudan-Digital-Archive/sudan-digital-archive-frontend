import { Box, SlideFade, VStack, Heading, Text } from "@chakra-ui/react";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { useTranslation } from "react-i18next";

export default function Home() {
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
          <VStack
            spacing={8}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Box>
              <Text
                className="gradientText"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >
                {t("landing_heading")}
              </Text>
            </Box>
            <Box>
              <Heading
                as="h2"
                size="lg"
                lineHeight="tall"
                fontWeight="medium"
                color="gray.500"
              >
                A{" "}
                <Box as="span" color="gray.200">
                  collective{" "}
                </Box>
                memory. We aim to create future{" "}
                <Box as="span" color="gray.200">
                  justice{" "}
                </Box>
                and{" "}
                <Box as="span" color="gray.200">
                  accountability{" "}
                </Box>{" "}
                for the wondeful people of{" "}
                <Box as="span" color="gray.300">
                  Sudan
                </Box>
                .
              </Heading>
            </Box>
          </VStack>
        </Box>
      </SlideFade>
      <Footer />
    </>
  );
}
