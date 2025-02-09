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
import { useCallback, useEffect, useState } from "react";
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

  const updateFilters = useCallback((updates: AccessionsQueryFilters) => {
    setQueryFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  function handleDateChange(
    date: Date | null,
    dateField: "date_from" | "date_to"
  ) {
    if (!date) {
      updateFilters({ [dateField]: "" });
      return;
    }

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

    const newQueryDate = `${date.toISOString().split("T")[0]}T00:00:00`;
    updateFilters({ [dateField]: newQueryDate });
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(queryTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [queryTerm]);

  useEffect(() => {
    updateFilters({ query_term: debouncedQuery });
  }, [debouncedQuery, updateFilters]);

  const fetchAccessions = useCallback(
    async (filters: AccessionsQueryFilters) => {
      try {
        const response = await fetch(
          `${appConfig.apiURL}accessions?${buildFilters(filters)}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setAccessions(data.items);
        setPagination({
          currentPage: data.page,
          totalPages: data.num_pages,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setIsLoading(true);
    fetchAccessions(queryFilters);
    return () => {
      setAccessions([]);
      setIsLoading(false);
    };
  }, [fetchAccessions, queryFilters]);

  return (
    <>
      <Menu
        changeLanguageOverride={() => {
          setIsLoading(true);
          const newLanguage = i18n.language === "en" ? "ar" : "en";
          i18n.changeLanguage(newLanguage);
          switch (newLanguage) {
            case "en":
              document.documentElement.lang = "en";
              document.documentElement.dir = "ltr";
              break;
            case "ar":
              document.documentElement.lang = "ar";
              document.documentElement.dir = "rtl";
              break;
            default:
              throw `Language ${newLanguage} is not supported`;
          }
          updateFilters({ lang: newLanguage === "en" ? "english" : "arabic" });
        }}
      />
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
                    onClick={() =>
                      updateFilters({
                        page: (pagination.currentPage - 1).toString(),
                      })
                    }
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
                  onClick={() =>
                    updateFilters({
                      page: (pagination.currentPage + 1).toString(),
                    })
                  }
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
