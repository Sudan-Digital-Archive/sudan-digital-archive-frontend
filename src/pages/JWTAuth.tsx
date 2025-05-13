import { useEffect, useState } from "react";
import {
  Center,
  Spinner,
  Text,
  VStack,
  SlideFade,
} from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router";
import { appConfig } from "../constants.ts";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";

export default function JWTAuth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get("sessionID");
    const userId = searchParams.get("userID");
    if (sessionId && userId) {
      const authorizeUser = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${appConfig.apiURL}auth/authorize`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ sessionId, userId }),
          });

          if (response.status === 200) {
            console.log("User logged in");
            navigate("/archive");
          } else {
            console.error("Authorization failed");
          }
        } catch (error) {
          console.error("Authorization error:", error);
        } finally {
          setIsLoading(false);
        }
      };

      authorizeUser();
    } else {
      console.error("Session ID or User ID missing");
      setIsLoading(false);
    }
  }, [navigate, searchParams]);

  return (
    <>
      <Menu
      />
      <SlideFade in>
        <VStack alignItems="center" justifyContent="center" height="100vh">
          {isLoading ? (
            <Center>
              <VStack>
                <Spinner size="xl" />
                <Text mt={4}>Authenticating...</Text>
              </VStack>
            </Center>
          ) : null}
        </VStack>
      </SlideFade>
      <Footer />
    </>
  );
}
