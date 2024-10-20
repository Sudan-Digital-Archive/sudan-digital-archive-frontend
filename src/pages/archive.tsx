import { Box, SlideFade, Heading } from "@chakra-ui/react";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { motion, isValidMotionProp } from "framer-motion";
import { chakra, shouldForwardProp } from "@chakra-ui/react";
export default function Archive() {
  // https://salehmubashar.com/blog/5-cool-animations-in-react-with-framer-motion
  const text = "The archive is coming soon!".split(" ");
  const text2 = "In fact, it already exists.".split(" ");
  const text3 = "We just haven't made it public yet.".split(" ");
  const text4 =
    "It contains a lot of sensitive information, so we are working on a way to share it safely.".split(
      " "
    );
  const text5 = "Until then, watch this space!".split(" ");
  const ChakraSpan = chakra(motion.span, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });
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
            <Box py={1}>
              <Heading
                py={2}
                bgGradient="linear(to-r, cyan.300, pink.600)"
                bgClip="text"
              >
                The archive is coming soon!
              </Heading>
            </Box>
            <Box py={1}>
              {text2.map((el, i) => (
                <ChakraSpan
                  fontSize="4xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // @ts-expect-error chakra funkiness
                  transition={{
                    duration: 5,
                    delay: text.length / 10  + i / 10,
                  }}
                  key={`archive-2-${i}`}
                >
                  {el}{" "}
                </ChakraSpan>
              ))}
            </Box>
            <Box py={1}>
              {text3.map((el, i) => (
                <ChakraSpan
                  fontSize="3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // @ts-expect-error chakra funkiness
                  transition={{
                    duration: 5,
                    delay: text2.length / 10 + 1 + i / 10,
                  }}
                  key={`archive-2-${i}`}
                >
                  {el}{" "}
                </ChakraSpan>
              ))}
            </Box>
            <Box py={1}>
              {text4.map((el, i) => (
                <ChakraSpan
                  fontSize="2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // @ts-expect-error chakra funkiness
                  transition={{
                    duration: 5,
                    delay: text3.length / 10 + 2 + i / 10,
                  }}
                  key={`archive-2-${i}`}
                >
                  {el}{" "}
                </ChakraSpan>
              ))}
            </Box>
            <Box py={1}>
              {text5.map((el, i) => (
                <ChakraSpan
                  fontSize="2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // @ts-expect-error chakra funkiness
                  transition={{
                    duration: 5,
                    delay: text4.length / 10 + 3 + i / 10,
                  }}
                  key={`archive-2-${i}`}
                >
                  {el}{" "}
                </ChakraSpan>
              ))}
            </Box>
          </Box>
        </Box>
      </SlideFade>
      <Footer />
    </>
  );
}
