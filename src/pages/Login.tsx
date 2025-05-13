import { Box, SlideFade, VStack } from "@chakra-ui/react";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import { Login as LoginForm } from "../components/forms/Login.tsx";

export default function Login() {

  return (
    <>
      <Menu
      />
      <SlideFade in>
      <VStack alignItems="center" justifyContent="center">
          <Box w="100%" p={10}>
            <LoginForm />
          </Box>
          <Footer />
        </VStack>
      </SlideFade>
    </>
  );
}
