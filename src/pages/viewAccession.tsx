import { SlideFade, Spinner, Box } from "@chakra-ui/react";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function ViewAccession() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [replayerState, setReplayerState] = useState({ source: "", url: "" });
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

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      setReplayerState({ source: "", url: "" });
    };
  }, [id]);
  return (
    <>
      <Menu />
      <SlideFade in>
        <Box
          h={"calc(80vh - 50px)"}
          w={"calc(90vw - 50px)"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          px={4}
          border="2px"
          borderColor="pink"
          borderStyle="inset"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <replay-web-page
              source={replayerState.source}
              url={replayerState.url}
            ></replay-web-page>
          )}
        </Box>
      </SlideFade>
      <Footer />
    </>
  );
}
