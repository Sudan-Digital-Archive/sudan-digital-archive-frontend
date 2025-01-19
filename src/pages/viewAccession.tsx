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
  Date,
  Subject,
  Title,
  Description,
  OriginalURL,
} from "../components/metadata";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function ViewAccession() {
  const { id } = useParams();
  const [replayerState, setReplayerState] = useState({ source: "", url: "" });
  const [accession, setAccession] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      .catch((err) => console.log("Service Worker registration failed: ", err));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/accessions/${id}`, {
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
      setAccession({});
    };
  }, [id]);
  return (
    <>
      <Menu />
      <SlideFade in>
        <VStack display="flex">
          {!accession.accession ? (
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
                    <Title title={accession.metadata_en.title} />
                  </DrawerHeader>
                  <DrawerBody>
                    <Subject subject={accession.metadata_en.subject} />
                    <Description
                      description={accession.metadata_en.description}
                    />
                    <Box>
                      <Date date={accession.accession.dublin_metadata_date} />
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
                See metadata
              </Button>
            </>
          )}
        </VStack>
      </SlideFade>
      <Footer />
    </>
  );
}
