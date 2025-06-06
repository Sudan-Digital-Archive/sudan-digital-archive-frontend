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
  Switch,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, FilePlus } from "react-feather";
import { CreateUpdateAccession } from "../components/forms/CreateUpdateAccession.tsx";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArchiveDatePicker } from "../components/DatePicker.tsx";
import { appConfig } from "../constants.ts";
import { AccessionsCards } from "../components/AccessionsCards.tsx";
import type { AccessionsQueryFilters } from "../apiTypes/apiRequests.ts";
import type { ListAccessions } from "../apiTypes/apiResponses.ts";
import { SubjectsAutocomplete } from "../components/subjectsAutocomplete/SubjectsAutocomplete.tsx";
import { useUser } from "../hooks/useUser.ts";

export default function Archive() {
  const { t, i18n } = useTranslation();
  const [queryFilters, setQueryFilters] = useState<AccessionsQueryFilters>({
    page: 0,
    per_page: 50,
    lang: i18n.language === "en" ? "english" : "arabic",
    query_term: "",
    metadata_subjects: [],
    is_private: false,
  });
  const [accessions, setAccessions] = useState<ListAccessions | null>(null);
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
  const { isLoggedIn } = useUser();
  function buildFilters(queryFilters: AccessionsQueryFilters) {
    let queryParams = "";
    for (const [key, value] of Object.entries(queryFilters)) {
      if (Array.isArray(value)) {
        value.forEach((item) => (queryParams += `${key}=${item}&`));
      } else {
        queryParams += `${key}=${value}&`;
      }
    }
    return new URLSearchParams(queryParams);
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
        const endpoint = isLoggedIn
          ? `${appConfig.apiURL}accessions/private`
          : `${appConfig.apiURL}accessions`;
        const url = `${endpoint}?${buildFilters({
          ...filters,
        })}`;
        const response = await fetch(url, {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });
        const data: ListAccessions = await response.json();
        setAccessions(data);
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
    [isLoggedIn]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchAccessions(queryFilters);
    return () => {
      setAccessions(null);
      setIsLoading(false);
    };
  }, [fetchAccessions, queryFilters]);

  const handleAccessionsRefresh = () => {
    fetchAccessions(queryFilters);
  };

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
          {isLoggedIn ? (
            <Button
              colorScheme="pink"
              rightIcon={<FilePlus />}
              variant="solid"
              onClick={onOpen}
            >
              {t("archive_add_record")}
            </Button>
          ) : null}
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
              {isLoggedIn && (
                <>
                  <Tag size="lg" colorScheme="cyan">
                    {t("archive_filter_private_records")}
                  </Tag>
                  <Switch
                  my={2}
                    mx={2}
                    size="lg"
                    onChange={(e) => {
                      updateFilters({ is_private: e.target.checked });
                    }}
                  />
                </>
              )}
            </Flex>
            <Flex py={5}>
              <SubjectsAutocomplete
                menuPlacement="top"
                onChange={(subjects) => {
                  updateFilters({
                    ["metadata_subjects"]: subjects.map(
                      (subject) => subject.value
                    ),
                  });
                }}
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
                {isLoggedIn ? <CreateUpdateAccession /> : null}
              </ModalBody>
              <ModalFooter />
            </ModalContent>
          </Modal>
          {isLoading || !accessions ? (
            <Spinner />
          ) : (
            <AccessionsCards
              accessions={accessions.items}
              onRefresh={handleAccessionsRefresh}
            />
          )}
          {accessions && accessions?.items.length > 0 && !isLoading && (
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
                        page: pagination.currentPage - 1,
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
                      page: pagination.currentPage + 1,
                    })
                  }
                />
              )}
            </HStack>
          )}
          {!isLoading && accessions && accessions.items.length === 0 && (
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
