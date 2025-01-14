import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  SlideFade,
  Spinner,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FilePlus } from "react-feather";
import {
  Date,
  Subject,
  Title,
  Description,
  OriginalURL,
} from "../components/metadata";
import { CreateAccession } from "../components/forms/create_accession.tsx";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Archive() {
  const [accessions, setAccessions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
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
          <Button
            colorScheme="pink"
            rightIcon={<FilePlus />}
            variant="solid"
            onClick={onOpen}
          >
            Add record
          </Button>
          <Box border="1px" borderColor="cyan" w="100%" p={2}>
            Search filters will go here
          </Box>
          <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center">Archive a URL</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CreateAccession />
              </ModalBody>
              <ModalFooter />
            </ModalContent>
          </Modal>
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
                        <Button
                          colorScheme="purple"
                          fontSize="0.8em"
                          onClick={() => navigate(`/archive/${record[0].id}`)}
                        >
                          View record
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                }
              })}
            </SimpleGrid>
          )}
          {/*Highlight component on the numbers would look good or just bold */}
          <Box mt={3}>
            Page <b>1</b> out of <b>5</b>
          </Box>
          <Footer />
        </VStack>
      </SlideFade>
    </>
  );
}
