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
  useDisclosure,
  Tag,
  Input,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, FilePlus } from "react-feather";
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
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/date-picker.css";
export default function Archive() {
  const { i18n } = useTranslation();
  const [queryFilters, setQueryFilters] = useState({
    page: "0",
    per_page: "50",
    lang: i18n.language === "en" ? "english" : "arabic",
    query_term: "",
    date_from: "",
    date_to: "",
  });
  const [accessions, setAccessions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
  });
  const [dateFrom, setDateFrom] = useState<null | Date>(null);
  const [dateTo, setDateTo] = useState<null | Date>(null);
  const [queryTerm, setQueryTerm] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();
  function buildFilters(queryFilters) {
    const nonNullFilters = {};
    for (const [key, value] of Object.entries(queryFilters)) {
      if (value) {
        nonNullFilters[key] = value;
      }
    }
    return new URLSearchParams(nonNullFilters);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(queryTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [queryTerm]);

  useEffect(() => {
    const newFilters = {
      ...queryFilters,
      ["query_term"]: debouncedQuery,
    };
    setQueryFilters(newFilters);
    // Want to do this because otherwise it will continuously rerender
    // since it will keep changing `queryFilters`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:5000/api/v1/accessions?${buildFilters(queryFilters)}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAccessions(data.items);
        setPagination({
          currentPage: data.page,
          totalPages: data.num_pages,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      setAccessions([]);
      setIsLoading(false);
    };
  }, [queryFilters]);
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
          <Box w="100%" p={10}>
            <Input
              value={queryTerm}
              onChange={(event) => {
                setQueryTerm(event.target.value);
              }}
              placeholder="Enter search term here..."
              size="lg"
              mb={5}
            />
            <Flex>
              <Tag size="lg" colorScheme="cyan" w="110px">
                Date from:{" "}
              </Tag>

              <Box className="dark-theme" mr={2} ml={2}>
                <DatePicker
                  dateFormat="YYYY-MM-DD"
                  isClearable
                  selected={dateFrom}
                  onChange={(date) => {
                    setDateFrom(date);
                    let newFilters;
                    if (!date) {
                      newFilters = {
                        ...queryFilters,
                        ["date_from"]: "",
                      };
                    } else {
                      const newQueryDate = `${
                        date.toISOString().split("T")[0]
                      }`;
                      newFilters = {
                        ...queryFilters,
                        ["date_from"]: `${newQueryDate}T00:00:00`,
                      };
                    }
                    setQueryFilters(newFilters);
                  }}
                />
              </Box>
              <Tag size="lg" colorScheme="cyan" w="110px">
                Date to:{" "}
              </Tag>
              <Box className="dark-theme" mr={2} ml={2}>
                <DatePicker
                  dateFormat="YYYY-MM-DD"
                  isClearable
                  selected={dateTo}
                  onChange={(date) => {
                    setDateTo(date);
                    let newFilters;
                    if (!date) {
                      newFilters = {
                        ...queryFilters,
                        ["date_to"]: "",
                      };
                    } else {
                      const newQueryDate = `${
                        date.toISOString().split("T")[0]
                      }`;
                      newFilters = {
                        ...queryFilters,
                        ["date_to"]: `${newQueryDate}T00:00:00`,
                      };
                    }
                    setQueryFilters(newFilters);
                  }}
                />
              </Box>
            </Flex>
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
          {isLoading ? (
            <Spinner />
          ) : (
            <SimpleGrid spacing={10} columns={{ sm: 1, md: 2, lg: 5 }} mt={5}>
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
          {accessions.length > 0 && !isLoading && (
            <HStack mt={3}>
              {pagination.currentPage != 0 &&
                pagination.currentPage != pagination.totalPages && (
                  <Button
                    size="xs"
                    leftIcon={<ArrowLeft />}
                    colorScheme="purple"
                    variant="link"
                    onClick={() => {
                      const newFilters = {
                        ...queryFilters,
                        ["page"]: (pagination.currentPage - 1).toString(),
                      };
                      setQueryFilters(newFilters);
                    }}
                  />
                )}
              <Box>
                Page <b>{pagination.currentPage + 1}</b> out of{" "}
                <b>{pagination.totalPages}</b>
              </Box>
              {pagination.currentPage + 1 < pagination.totalPages && (
                <Button
                  size="xs"
                  leftIcon={<ArrowRight />}
                  colorScheme="purple"
                  variant="link"
                  onClick={() => {
                    const newFilters = {
                      ...queryFilters,
                      ["page"]: (pagination.currentPage + 1).toString(),
                    };
                    setQueryFilters(newFilters);
                  }}
                />
              )}
            </HStack>
          )}
          {!isLoading && accessions.length === 0 && (
            <Box mt={3} as="i">
             No records matched your search!
            </Box>
          )}
          <Footer />
        </VStack>
      </SlideFade>
    </>
  );
}
