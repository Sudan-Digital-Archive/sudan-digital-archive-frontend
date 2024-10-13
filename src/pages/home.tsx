import { Box, SlideFade, VStack, Heading, Text } from "@chakra-ui/react";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
/*
Internationalize the site
Do about page
Push code
Sort out favicons
Fix layout of components
*/
export default function Home() {
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
                className="gradient-text-landing-page"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >
                Sudan Digital Archive
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
                for the wondeful people of {" "}
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
