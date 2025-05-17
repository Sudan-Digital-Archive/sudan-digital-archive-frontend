import { useEffect, useState } from "react";
import {
  Center,
  Spinner,
  Text,
  VStack,
  SlideFade,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";
import { useSearchParams, useNavigate, Link as RouterLink } from "react-router";
import { appConfig } from "../constants.ts";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import { useUser } from "../hooks/useUser";

export default function JWTAuth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoggedIn } = useUser();

  useEffect(() => {
    const sessionId = searchParams.get("sessionID");
    const userId = searchParams.get("userID");
    if (sessionId && userId) {
      const authorizeUser = async () => {
        setIsLoading(true);
        setError(null);
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
            setIsLoggedIn(true);
            navigate("/archive");
          } else {
            const errorText = await response.text();
            setError(errorText || "Unable to log you in. The magic link is not valid or has expired.");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          setError("An error occurred while trying to log you in. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      authorizeUser();
    } else {
      setError("Invalid login link. Missing required information.");
      setIsLoading(false);
    }
  }, [navigate, searchParams, setIsLoggedIn]);

  return (
    <>
      <Menu />
      <SlideFade in>
        <VStack alignItems="center" justifyContent="center" height="100vh" spacing={6}>
          {isLoading ? (
            <Center>
              <VStack>
                <Spinner size="xl" />
                <Text mt={4}>Logging you in...</Text>
              </VStack>
            </Center>
          ) : error ? (
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              width="80%"
              maxW="500px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Authentication Failed
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {error}
              </AlertDescription>
              <Button
                as={RouterLink}
                to="/login"
                colorScheme="cyan"
                mt={4}
              >
                Back to Login
              </Button>
            </Alert>
          ) : null}
        </VStack>
      </SlideFade>
      <Footer />
    </>
  );
}
