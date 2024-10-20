import { Box, SlideFade, Heading } from "@chakra-ui/react";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { motion, isValidMotionProp } from "framer-motion";
import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
export default function Archive() {
  const { t, i18n } = useTranslation();
  const getTranslatedTexts = useCallback(() => {
    return {
      text1: t("the_archive_sentence_one").split(" "),
      text2: t("the_archive_sentence_two").split(" "),
      text3: t("the_archive_sentence_three").split(" "),
      text4: t("the_archive_sentence_four").split(" "),
    };
  }, [t]);
  const [texts, setTexts] = useState(getTranslatedTexts());
  const ChakraSpan = chakra(motion.span, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  // https://salehmubashar.com/blog/5-cool-animations-in-react-with-framer-motion
  useEffect(() => {
    setTexts(getTranslatedTexts());
  }, [i18n.language, getTranslatedTexts]);

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
                {t("the_archive_header")}
              </Heading>
            </Box>
            <Box py={1}>
              {texts.text1.map((el, i) => (
                <ChakraSpan
                  fontSize="4xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // @ts-expect-error chakra funkiness
                  transition={{
                    duration: 5,
                    delay:
                      t("the_archive_header").split(" ").length / 10 + i / 10,
                  }}
                  key={`archive-2-${i}`}
                >
                  {el}{" "}
                </ChakraSpan>
              ))}
            </Box>
            <Box py={1}>
              {texts.text2.map((el, i) => (
                <ChakraSpan
                  fontSize="3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // @ts-expect-error chakra funkiness
                  transition={{
                    duration: 5,
                    delay: texts.text1.length / 10 + 1 + i / 10,
                  }}
                  key={`archive-2-${i}`}
                >
                  {el}{" "}
                </ChakraSpan>
              ))}
            </Box>
            <Box py={1}>
              {texts.text3.map((el, i) => (
                <ChakraSpan
                  fontSize="2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // @ts-expect-error chakra funkiness
                  transition={{
                    duration: 5,
                    delay: texts.text2.length / 10 + 2 + i / 10,
                  }}
                  key={`archive-2-${i}`}
                >
                  {el}{" "}
                </ChakraSpan>
              ))}
            </Box>
            <Box py={1}>
              {texts.text4.map((el, i) => (
                <ChakraSpan
                  fontSize="2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // @ts-expect-error chakra funkiness
                  transition={{
                    duration: 5,
                    delay: texts.text3.length / 10 + 3 + i / 10,
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
