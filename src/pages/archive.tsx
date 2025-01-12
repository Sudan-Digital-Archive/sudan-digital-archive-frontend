import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  SlideFade,
  Spinner,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Archive() {
  const [isLoading, setIsLoading] = useState(true);
  const [accessions, setAccessions] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/accessions?page=0&per_page=200&lang=english`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAccessions(data.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      setAccessions([]);
    };
  }, []);
  return (
    <>
      <Menu />
      <SlideFade in>
        <VStack alignItems="center" justifyContent="center">
          <Box border='1px' borderColor='gray.200' w="100%" p={2} >Filters will go here</Box>
          {isLoading ? (
            <Spinner />
          ) : (
            <SimpleGrid
              // h={"calc(80vh - 50px)"}
              // w={"calc(80vw - 50px)"}
              spacing={10}
              // minChildWidth={240}
              columns={{ sm: 1, md: 2, lg: 4 }}
              mt={5}
            >
              {accessions.map((record, index) => {
                if (record && record[1]) {
                  return (
                    <Card key={`accession-card-${index}`} overflow="auto">
                      <CardHeader>
                        <Heading as="h5" size="sm">
                          <Badge colorScheme="cyan" fontSize="0.9em">
                            Title:
                          </Badge>{" "}
                          {record[1].title}
                        </Heading>
                      </CardHeader>
                      <CardBody>
                        <Heading as="h6" size="xs">
                          <Badge colorScheme="cyan">Subject:</Badge>{" "}
                          {record[1].subject}
                        </Heading>
                        <Text>
                          <Badge colorScheme="cyan">Description:</Badge>{" "}
                          {record[1].description}
                        </Text>
                        <Box>
                          <Badge colorScheme="cyan">Date:</Badge>{" "}
                          {/* TODO: Create a timestamp component */}
                          <Text as="i" fontSize="0.9em">
                            {record[0].dublin_metadata_date}
                          </Text>
                        </Box>
                        <ChakraLink href={record[0].seed_url} isExternal>
                          <Badge colorScheme="cyan">
                            View original url <ExternalLinkIcon mx="2px" />
                          </Badge>
                        </ChakraLink>
                      </CardBody>
                      <CardFooter>
                        <Button colorScheme="purple" fontSize="0.8em">
                          <Link to={`/archive/${record[0].id}`}>
                            View record
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                }
              })}
              {accessions.map((record, index) => {
                if (record && record[1]) {
                  return (
                    <Card key={`accession-card-${index}`}>
                      <CardHeader>
                        <Heading as="h5" size="sm">
                          <Badge colorScheme="cyan" fontSize="0.9em">
                            Title:
                          </Badge>{" "}
                          {record[1].title}
                        </Heading>
                      </CardHeader>
                      <CardBody>
                        <Heading as="h6" size="xs">
                          <Badge colorScheme="cyan">Subject:</Badge>{" "}
                          {record[1].subject}
                        </Heading>
                        <Text>
                          <Badge colorScheme="cyan">Description:</Badge>{" "}
                          {record[1].description}
                        </Text>
                        <Box>
                          <Badge colorScheme="cyan">Date:</Badge>{" "}
                          {/* TODO: Create a timestamp component */}
                          <Text as="i" fontSize="0.9em">
                            {record[0].dublin_metadata_date}
                          </Text>
                        </Box>
                        <ChakraLink href={record[0].seed_url} isExternal>
                          <Badge colorScheme="cyan">
                            View original url <ExternalLinkIcon mx="2px" />
                          </Badge>
                        </ChakraLink>
                      </CardBody>
                      <CardFooter>
                        <Button colorScheme="purple" fontSize="0.8em">
                          <Link to={`/archive/${record[0].id}`}>
                            View record
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                }
              })}
              {accessions.map((record, index) => {
                if (record && record[1]) {
                  return (
                    <Card key={`accession-card-${index}`}>
                      <CardHeader>
                        <Heading as="h5" size="sm">
                          <Badge colorScheme="cyan" fontSize="0.9em">
                            Title:
                          </Badge>{" "}
                          {record[1].title}
                        </Heading>
                      </CardHeader>
                      <CardBody>
                        <Heading as="h6" size="xs">
                          <Badge colorScheme="cyan">Subject:</Badge>{" "}
                          {record[1].subject}
                        </Heading>
                        <Text>
                          <Badge colorScheme="cyan">Description:</Badge>{" "}
                          {record[1].description}
                        </Text>
                        <Box>
                          <Badge colorScheme="cyan">Date:</Badge>{" "}
                          {/* TODO: Create a timestamp component */}
                          <Text as="i" fontSize="0.9em">
                            {record[0].dublin_metadata_date}
                          </Text>
                        </Box>
                        <ChakraLink href={record[0].seed_url} isExternal>
                          <Badge colorScheme="cyan">
                            View original url <ExternalLinkIcon mx="2px" />
                          </Badge>
                        </ChakraLink>
                      </CardBody>
                      <CardFooter>
                        <Button colorScheme="purple" fontSize="0.8em">
                          <Link to={`/archive/${record[0].id}`}>
                            View record
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                }
              })}
            </SimpleGrid>
          )}
          <Box mt={3}>Page 1 out of 5</Box>
          <Footer />
        </VStack>
      </SlideFade>
    </>
  );
}
