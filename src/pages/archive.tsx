import {
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
  Text,
} from "@chakra-ui/react";
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
        <Box
          as="section"
          h={"calc(80vh - 50px)"}
          w={"calc(80vw - 50px)"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          px={4}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {accessions.map((record, index) => {
                if (record && record[1]) {
                  return (
                    <Card key={`accession-card-${index}`}>
                      <CardHeader>
                        <Heading size="md">{record[1].title}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>
                        {record[1].subject}
                        </Text>
                      </CardBody>
                      <CardFooter>
                      <Link to={`/archive/${record[0].id}`}>View record</Link>
                      </CardFooter>
                    </Card>
                  );
                }
              })}
            </SimpleGrid>
          )}
        </Box>
      </SlideFade>
      <Footer />
    </>
  );
}
