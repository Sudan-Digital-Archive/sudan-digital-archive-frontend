import {
  SlideFade,
  Spinner,
  VStack,
  Drawer,
  DrawerBody,
  Button,
  DrawerHeader,
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

  // this service worker is seriously cool
  // it lives in public/replay/sw.js
  // and imports a service worker that webrecorder built
  // it intercepts all requests to /replay/sw.js to allow
  // use of a <replay-web-page/> component that lets you embed
  // full browser crawls in a webpage using JS injected
  // with a script tag in `index.html`
  // https://github.com/webrecorder/replayweb.page
  useEffect(() => {
    navigator.serviceWorker
      .register("/replay/sw.js")
      .then((registration) =>
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope
        )
      )
      .catch((err) =>
        console.error("Service Worker registration failed: ", err)
      );
  }, []);
  useEffect(() => {
    fetch(`${appConfig.apiURL}accessions/${id}`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReplayerState({
          source: data.wacz_url,
          url: data.accession.seed_url,
        });
        setAccession({
          accession: data.accession,
          metadata_en: data.metadata_en,
          metadata_ar: data.metadata_ar,
        });
      })
      .catch((error) => {
        console.error(error);
      });

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
          {!accession ? (
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
                  <DrawerHeader borderBottomWidth="1px">
                    <Title
                      title={
                        i18n.language === "en"
                          ? accession.metadata_en.title
                          : accession.metadata_ar.title
                      }
                    />
                  </DrawerHeader>
                  <DrawerBody>
                    <Subject
                      subject={
                        i18n.language === "en"
                          ? accession.metadata_en.subject
                          : accession.metadata_ar.subject
                      }
                    />
                    <Description
                      description={
                        i18n.language === "en"
                          ? accession.metadata_en.description
                          : accession.metadata_ar.description
                      }
                    />
                    <Box>
                      <DateMetadata
                        date={accession.accession.dublin_metadata_date}
                      />
                    </Box>
                    <OriginalURL url={accession.accession.seed_url} />
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
