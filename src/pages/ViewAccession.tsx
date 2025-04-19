import {
  DateMetadata,
  Subject,
  Title,
  Description,
  OriginalURL,
} from "../components/metadata/index.tsx";
import { useParams, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { appConfig } from "../constants.ts";
import type { AccessionOne } from "../apiTypes/apiResponses.ts";
import { useWindowSize } from "../hooks/useWindowSize.ts";
import AccessionButtons from "../components/AccessionButtons.tsx";
import {
  SlideFade,
  Spinner,
  VStack,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";

export default function ViewAccession() {
  const { id } = useParams();
  const [replayerState, setReplayerState] = useState({ source: "", url: "" });
  const [accession, setAccession] = useState<null | AccessionOne>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t, i18n } = useTranslation();
  const width = useWindowSize();
  const isMobile = width <= 768;
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "en";

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useEffect(() => {
    const fetchAccession = async () => {
      try {
        const response = await fetch(`${appConfig.apiURL}accessions/${id}`, {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setReplayerState({
          source: data.wacz_url,
          url: data.accession.seed_url,
        });
        setAccession(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccession();
    return () => {
      setReplayerState({ source: "", url: "" });
      setAccession(null);
    };
  }, [id]);

  return (
    <>
      <SlideFade in>
        <VStack
          display="flex"
          flexDirection="column"
          h="100vh"
          alignItems="center"
          justifyContent="center"
        >
          {!accession || !replayerState.source || !replayerState.url ? (
            <Spinner />
          ) : (
            <>
              {isMobile ? (
                <VStack m={4} spacing={4} alignItems="center">
                  <AccessionButtons onOpen={onOpen} id={id} lang={lang} />
                </VStack>
              ) : (
                <HStack m={4} spacing={4}>
                  <AccessionButtons onOpen={onOpen} id={id} lang={lang} />
                </HStack>
              )}
              <Drawer
                placement="right"
                onClose={onClose}
                isOpen={isOpen}
                size="lg"
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader borderBottomWidth="1px">
                    <Title
                      title={
                        i18n.language === "en"
                          ? accession.accession.title_en ||
                            t("metadata_missing_title")
                          : accession.accession.title_ar ||
                            t("metadata_missing_title")
                      }
                      fontSize={i18n.language === "en" ? "md" : "lg"}
                    />
                  </DrawerHeader>
                  <DrawerBody>
                    <Subject
                      subjects={
                        i18n.language === "en"
                          ? accession.accession.subjects_en
                          : accession.accession.subjects_ar
                      }
                    />
                    {((i18n.language === "en" &&
                      accession.accession.description_en) ||
                      (i18n.language === "ar" &&
                        accession.accession.description_ar)) && (
                      <Description
                        description={
                          i18n.language === "en"
                            ? accession.accession.description_en
                            : accession.accession.description_ar
                        }
                        fontSize={i18n.language === "en" ? "md" : "lg"}
                      />
                    )}
                    <Box>
                      <DateMetadata
                        date={accession.accession.dublin_metadata_date}
                        fontSize={i18n.language === "en" ? "md" : "lg"}
                      />
                    </Box>
                    <OriginalURL
                      url={accession.accession.seed_url}
                      fontSize={i18n.language === "en" ? "md" : "lg"}
                    />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
              <Box flex="1" w="100vw" bg="white">
                <Box h="4px" bg="gray" />
                <replay-web-page
                  embed="replayonly"
                  replayBase="/replay/"
                  source={replayerState.source}
                  url={replayerState.url}
                ></replay-web-page>
              </Box>
            </>
          )}
        </VStack>
      </SlideFade>
    </>
  );
}
