import {
  SlideFade,
  Spinner,
  VStack,
  Drawer,
  DrawerBody,
  Button,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Box,
  HStack,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import {
  DateMetadata,
  Subject,
  Title,
  Description,
  OriginalURL,
} from "../components/metadata/index.tsx";
import { useParams, NavLink, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { appConfig } from "../constants.ts";
import type { AccessionOne } from "../apiTypes/apiResponses.ts";
import { useWindowSize } from "../hooks/useWindowSize.ts";
import { CopyIcon } from "@chakra-ui/icons";
import { ExternalLink, Plus } from "react-feather";

export default function ViewAccession() {
  const { id } = useParams();
  const [replayerState, setReplayerState] = useState({ source: "", url: "" });
  const [accession, setAccession] = useState<null | AccessionOne>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t, i18n } = useTranslation();
  const width = useWindowSize();
  const isMobile = width <= 768;
  const { onCopy } = useClipboard(window.location.href);
  const toast = useToast();
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

  const handleCopy = () => {
    const url = `${appConfig.appURLFrontend}archive/${id}?lang=${lang}`;
    onCopy(url);
    toast({
      title: t("link_copied"),
      description: url,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

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
              <HStack
                m={4}
                spacing={4}
                direction={isMobile ? "column" : "row"}
                alignItems="flex-start"
              >
                <Button
                  colorScheme="pink"
                  onClick={onOpen}
                  rightIcon={<Plus />}
                >
                  {t("view_accession_see_metadata")}
                </Button>

                <Button
                  colorScheme="pink"
                  onClick={handleCopy}
                  rightIcon={<CopyIcon />}
                >
                  {t("copy_record")}
                </Button>
                <NavLink to="/mission" target="_blank">
                  <Button colorScheme="pink" rightIcon={<ExternalLink />}>
                    {t("what_is_sda")}
                  </Button>
                </NavLink>
              </HStack>
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
