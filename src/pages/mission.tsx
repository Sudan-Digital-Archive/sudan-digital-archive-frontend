import { Box, SlideFade, VStack, Heading, Text, Image } from "@chakra-ui/react";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { useTranslation } from "react-i18next";
export default function Mission() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Menu />
      <SlideFade in>
        <Box
          as="section"
          display="flex"
          alignItems="center"
          maxW="2xl"
          mx="auto"
          px={4}
        >
          <Box>
            <VStack spacing={2} align="left">
              <Heading
                py={2}
                bgGradient="linear(to-r, cyan.300, pink.600)"
                bgClip="text"
              >
                {t("mission_title")}
              </Heading>
              <Image boxSize="lg" objectFit="cover" src="https://blah" />
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                {t("mission_para_one")}
              </Text>
              <Text as="b" fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                {t("mission_para_two")}
              </Text>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                {t("mission_para_three")}
              </Text>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                {t("mission_para_four")}
              </Text>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                {t("mission_para_five")}
              </Text>
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                {t("mission_para_six")}
              </Text>
              <Image boxSize="lg" objectFit="cover" src="https://blah" />
              <Text fontSize={i18n.language === "en" ? "lg" : "2xl"}>
                As a Sudanese-led initiative, all key decisions about content
                selection, storage methods, promotion strategies, and annotation
                practices center Sudanese perspectives and needs. We are
                committed to ensuring our collections remain as accessible as
                possible while respecting privacy and security considerations.
                Through this approach, we aim to provide a robust and trusted
                foundation for understanding Sudan's past and present,
                contributing to a more informed and equitable future for all
                Sudanese people.
              </Text>
            </VStack>
          </Box>
        </Box>
      </SlideFade>
      <Footer />
    </>
  );
}
