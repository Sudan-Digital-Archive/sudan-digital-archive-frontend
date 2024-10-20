import { Box, SlideFade, VStack, Heading, Text } from "@chakra-ui/react";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import Flag from "react-flagpack";
import "react-flagpack/dist/style.css";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t, i18n } = useTranslation();
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
              <Text as="div" fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                {t("about_sentence_one_part_one")}
                <Box as="b">{t("about_sentence_one_part_two_bold")}</Box>
                {t("about_sentence_one_part_three_before_flag")}{" "}
                <Flag code="SD" gradient="real-linear" size="m" hasDropShadow />
                .{t("about_sentence_two_part_one")}
                <Box as="b">{t("about_sentence_two_part_two_bold")}</Box>
                {t("about_sentence_two_part_three")}
              </Text>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                {t("about_sentence_three_part_one")}
                <Box as="b">{t("about_sentence_three_part_two_bold")}</Box>
                {t("about_sentence_three_part_three")}
                <Box as="b">{t("about_sentence_three_part_four_bold")}</Box>
                {t("about_sentence_three_part_five")}
                <Box as="b">{t("about_sentence_three_part_six_bold")}</Box>
                {t("about_sentence_three_part_seven")}
              </Text>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                {t("about_sentence_four")}
              </Text>
            </VStack>
          </Box>
        </Box>
      </SlideFade>
      <Footer />
    </>
  );
}
