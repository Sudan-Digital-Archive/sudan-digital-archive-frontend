import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  SimpleGrid,
  SlideFade,
  Spinner,
  VStack,
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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Archive() {
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
          <Box border="1px" borderColor="cyan" w="100%" p={2}>
            Filters will go here
          </Box>
          <Box border="1px" borderColor="cyan" w="100%" p={2}>
            CREATE
          </Box>
          {accessions.length === 0 ? (
            <Spinner />
          ) : (
            <SimpleGrid spacing={10} columns={{ sm: 1, md: 2, lg: 4 }} mt={5}>
              {accessions.map((record, index) => {
                if (record && record[1]) {
                  return (
                    <Card
                      border="2px"
                      borderColor="gray.200"
                      borderStyle="inset"
                      key={`accession-card-${index}`}
                      overflow="auto"
                    >
                      <CardHeader>
                        <Title title={record[1].title} />
                      </CardHeader>
                      <CardBody>
                        <Subject subject={record[1].subject} />
                        <Description description={record[1].description} />
                        {record[1].description}
                        <Box>
                          <Date date={record[0].dublin_metadata_date} />
                        </Box>
                        <OriginalURL url={record[0].seed_url} />
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
                    <Card
                      border="2px"
                      borderColor="gray.200"
                      borderStyle="inset"
                      key={`accession-card-${index}`}
                      overflow="auto"
                    >
                      <CardHeader>
                        <Title title={record[1].title} />
                      </CardHeader>
                      <CardBody>
                        <Subject subject={record[1].subject} />
                        <Description description={record[1].description} />
                        {record[1].description}
                        <Box>
                          <Date date={record[0].dublin_metadata_date} />
                        </Box>
                        <OriginalURL url={record[0].seed_url} />
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
                    <Card
                      border="2px"
                      borderColor="gray.200"
                      borderStyle="inset"
                      key={`accession-card-${index}`}
                      overflow="auto"
                    >
                      <CardHeader>
                        <Title title={record[1].title} />
                      </CardHeader>
                      <CardBody>
                        <Subject subject={record[1].subject} />
                        <Description description={record[1].description} />
                        {record[1].description}
                        <Box>
                          <Date date={record[0].dublin_metadata_date} />
                        </Box>
                        <OriginalURL url={record[0].seed_url} />
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
          {/*Highlight component on the numbers would look good or just bold */}
          <Box mt={3}>Page 1 out of 5</Box>
          <Footer />
        </VStack>
      </SlideFade>
    </>
  );
}
