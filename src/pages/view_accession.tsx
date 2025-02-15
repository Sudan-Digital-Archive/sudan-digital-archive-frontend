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
} from "@chakra-ui/react";
import {
  DateMetadata,
  Subject,
  Title,
  Description,
  OriginalURL,
} from "../components/metadata/index.tsx";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { appConfig } from "../constants.ts";
import type { AccessionOne } from "../types/api_responses.ts";
export default function ViewAccession() {
  const { id } = useParams();
  const [replayerState, setReplayerState] = useState({ source: "", url: "" });
  const [accession, setAccession] = useState<null | AccessionOne>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t, i18n } = useTranslation();

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
        setAccession({
          accession: data.accession,
          metadata_en: data.metadata_en,
          metadata_ar: data.metadata_ar,
        });
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
      <Menu />
      <SlideFade in>
        <VStack display="flex">
          {!accession || !replayerState.source || !replayerState.url ? (
            <Spinner />
          ) : (
            <>
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
                          ? accession.metadata_en?.title ??
                            t("metadata_missing_title")
                          : accession.metadata_ar?.title ??
                            t("metadata_missing_title")
                      }
                      fontSize={i18n.language === "en" ? "md" : "lg"}
                    />
                  </DrawerHeader>
                  <DrawerBody>
                    <Subject
                      subject={
                        i18n.language === "en"
                          ? accession.metadata_en?.subject ??
                            t("metadata_missing_subject")
                          : accession.metadata_ar?.subject ??
                            t("metadata_missing_subject")
                      }
                      fontSize={i18n.language === "en" ? "md" : "lg"}
                    />
                    {((i18n.language === "en" &&
                      accession.metadata_en?.description) ||
                      (i18n.language === "ar" &&
                        accession.metadata_ar?.description)) && (
                      <Description
                        description={
                          i18n.language === "en"
                            ? accession.metadata_en?.description ??
                              t("metadata_missing_description")
                            : accession.metadata_ar?.description ??
                              t("metadata_missing_description")
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
              <Box
                border="2px"
                borderColor="pink"
                borderStyle="inset"
                h="70vh"
                w="80vw"
              >
                <replay-web-page
                  replayBase="/replay/"
                  source={replayerState.source}
                  url={replayerState.url}
                ></replay-web-page>
              </Box>
              <Button colorScheme="pink" onClick={onOpen} mt={5}>
                {t("view_accession_see_metadata")}
              </Button>
            </>
          )}
        </VStack>
      </SlideFade>
      <Footer />
    </>
  );
}
