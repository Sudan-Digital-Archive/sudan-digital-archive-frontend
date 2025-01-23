import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { CreateAccession } from "../components/forms/create_accession.tsx";
import Menu from "../components/menu.tsx";
import Footer from "../components/footer.tsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArchiveDatePicker } from "../components/date_picker.tsx";
import { appConfig } from "../constants.ts";
import { AccessionsCards } from "../components/accessions_cards.tsx";
import type { AccessionsQueryFilters } from "../types/api_requests.ts";
export default function Archive() {
  const { t, i18n } = useTranslation();
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
  function buildFilters(queryFilters: AccessionsQueryFilters) {
    const nonNullFilters: AccessionsQueryFilters = {};
    for (const [key, value] of Object.entries(queryFilters)) {
      if (value) {
        nonNullFilters[key as keyof AccessionsQueryFilters] = value;
      }
    }
    return new URLSearchParams(nonNullFilters);
  }
  function handleDateChange(
    date: Date | null,
    dateField: "date_from" | "date_to"
  ) {
    if (!date) return;
    let newFilters;
    switch (dateField) {
      case "date_from":
        setDateFrom(date);
        break;
      case "date_to":
        setDateTo(date);
        break;
      default:
        throw `Unsupported dateField arg ${dateField}`;
    }
    if (!date) {
      newFilters = {
        ...queryFilters,
        [dateField]: "",
      };
    } else {
      const newQueryDate = `${date.toISOString().split("T")[0]}`;
      newFilters = {
        ...queryFilters,
        [dateField]: `${newQueryDate}T00:00:00`,
      };
    }
    setQueryFilters(newFilters);
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
    fetch(`${appConfig.apiURL}accessions?${buildFilters(queryFilters)}`, {
      headers: {
        Accept: "application/json",
      },
    })
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
            {t("archive_add_record")}
          </Button>
          <Box w="100%" p={10}>
            <Input
              value={queryTerm}
              onChange={(event) => {
                setQueryTerm(event.target.value);
              }}
              placeholder={t("archive_text_search_query_placeholder")}
              size="lg"
              mb={5}
            />
            <Flex>
              <Tag size="lg" colorScheme="cyan" w="110px">
                {t("archive_date_from_filter")}
              </Tag>
              <ArchiveDatePicker
                selected={dateFrom}
                onChange={(date) => handleDateChange(date, "date_from")}
              />
              <Tag size="lg" colorScheme="cyan" w="110px">
                {t("archive_date_to_filter")}
              </Tag>
              <ArchiveDatePicker
                selected={dateTo}
                onChange={(date) => handleDateChange(date, "date_to")}
              />
            </Flex>
          </Box>
          <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center">
                {t("archive_create_modal_header")}
              </ModalHeader>
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
            <AccessionsCards accessions={accessions} />
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
                {t("archive_pagination_page")}
                <b>{pagination.currentPage + 1}</b>
                {t("archive_pagination_page_out_of")}
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
              {t("archive_no_records_found")}
            </Box>
          )}
          <Footer />
        </VStack>
      </SlideFade>
    </>
  );
}
