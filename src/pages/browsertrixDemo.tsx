import { SlideFade, Box } from "@chakra-ui/react";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
export default function Archive() {
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
        <replay-web-page
          source="https://ams3.digitaloceanspaces.com/btrix-beta2/crawls/6473f79c-8638-4344-9833-a812a5df5304/20240804150407183-9f0097cc-cf7-0.wacz?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00PFR8T6YNBUE7U4E6%2F20241208%2F%2Fs3%2Faws4_request&X-Amz-Date=20241208T143815Z&X-Amz-Expires=172800&X-Amz-SignedHeaders=host&X-Amz-Signature=1c1c6509fa1e8444d0e35cd056fee68810289028bd74c72bee92a9d169b1a7ce"
          url="https://x.com/Moh_Gamea/status/1647363547234553856"
        ></replay-web-page>
        </Box>
      </SlideFade>
      <Footer />
    </>
  );
}
