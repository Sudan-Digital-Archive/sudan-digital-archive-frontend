import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  Box,
} from "@chakra-ui/react";
import { ArchiveDatePicker } from "../DatePicker.tsx";
import { useTranslation } from "react-i18next";
import { appConfig } from "../../constants.ts";
import { useState, useEffect, useCallback } from "react";
import { SubjectsAutocomplete } from "../subjectsAutocomplete/SubjectsAutocomplete.tsx";
import type { FormEvent } from "react";
import type { SubjectOption } from "../subjectsAutocomplete/types.ts";
export function CreateAccession() {
  const { t, i18n } = useTranslation();
  const toast = useToast();

  // Form state
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  // TODO Use proper type
  const [subjects, setSubjects] = useState<readonly SubjectOption[]>([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [browserProfile, setBrowserProfile] = useState<string>(
    t("create_accession_crawl_type_default")
  );

  // Error states
  const [urlError, setUrlError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [subjectsError, setSubjectsError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validity state
  const [isFormValid, setIsFormValid] = useState(false);
  const validateURL = useCallback(
    (value: string) => {
      try {
        new URL(value);
        return { valid: true, error: "" };
      } catch (_) {
        return { valid: false, error: t("create_accession_invalid_url") };
      }
    },
    [t]
  );
  const validateDate = useCallback(
    (value: Date | null) => {
      if (!value) {
        return { valid: false, error: t("create_accession_date_required") };
      }
      try {
        new Date(value);
        return { valid: true, error: "" };
      } catch (_) {
        return { valid: false, error: t("create_accession_invalid_date") };
      }
    },
    [t]
  );
  const validateTitle = useCallback(
    (value: string) => {
      if (!value) {
        return { valid: false, error: t("create_accession_title_required") };
      }
      return { valid: true, error: "" };
    },
    [t]
  );

  const validateForm = useCallback(() => {
    const urlValid = validateURL(url).valid;
    const titleValid = validateTitle(title).valid;
    const subjectsValid = subjects.length > 0;
    const dateValid = validateDate(date).valid;
    return urlValid && titleValid && subjectsValid && dateValid;
  }, [
    date,
    subjects.length,
    title,
    url,
    validateDate,
    validateTitle,
    validateURL,
  ]);
  // Validate form whenever inputs change
  useEffect(() => {
    const isFormValid = validateForm();

    setIsFormValid(isFormValid);
  }, [validateForm]);

  const getBrowserProfile = (profile: string) => {
    switch (profile) {
      case t("create_accession_crawl_type_facebook"):
        return "facebook";
      default:
        return null;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
  };

  const handleUrlBlur = () => {
    const urlCheck = validateURL(url);
    if (!urlCheck.valid) {
      setUrlError(urlCheck.error);
    } else {
      setUrlError("");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleTitleBlur = () => {
    const titleCheck = validateTitle(title);
    if (!titleCheck.valid) {
      setTitleError(titleCheck.error);
    } else {
      setTitleError("");
    }
  };

  const handleSubjectsChange = (values: readonly SubjectOption[]) => {
    setSubjects(values);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (val: Date | null) => {
    const dateCheck = validateDate(val);
    if (!dateCheck.valid) {
      setDateError(dateCheck.error);
    } else {
      setDate(val);
      setDateError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // TODO: This duplicates the blur check, refactor to simplify
    const urlCheck = validateURL(url);
    if (!urlCheck.valid) {
      setUrlError(urlCheck.error);
    }
    const titleCheck = validateTitle(title);
    if (!titleCheck.valid) {
      setTitleError(titleCheck.error);
    }
    const dateCheck = validateDate(date);
    if (!dateCheck.valid) {
      setDateError(dateCheck.error);
    }
    if (subjects.length === 0) {
      setSubjectsError(t("create_accession_subjects_error"));
    }
    if (
      !urlCheck.valid ||
      !titleCheck.valid ||
      !dateCheck.valid ||
      subjects.length === 0
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert subject IDs from strings to numbers if needed
      const subjectIds = subjects.map((subject) => subject.value);

      const response = await fetch(`${appConfig.apiURL}accessions`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          metadata_language: i18n.language === "en" ? "english" : "arabic",
          url: url,
          metadata_title: title,
          metadata_subjects: subjectIds,
          metadata_description: description ? description : null,
          metadata_time: `${
            new Date(date as Date).toISOString().split("T")[0]
          }T00:00:00`,
          browser_profile: getBrowserProfile(browserProfile),
        }),
      });

      const responseText = await response.text();

      if (response.status === 201) {
        toast({
          title: t("create_accession_crawling_url_title"),
          description: t("create_accession_success_description"),
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setUrl("");
        setTitle("");
        setSubjects([]);
        setDescription("");
        setDate(null);
        setBrowserProfile(t("create_accession_crawl_type_default"));
      } else {
        console.error(responseText);
        toast({
          title: t("create_accession_error_toast_title"),
          description: `${t(
            "create_accession_error_toast_description"
          )} ${responseText}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: t("create_accession_error_toast_title"),
        description: t("create_accession_error_toast_description"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormControl isInvalid={!!urlError} isRequired>
        <FormLabel>{t("create_accession_url_field_label")}</FormLabel>
        <Input
          value={url}
          onChange={handleUrlChange}
          onBlur={handleUrlBlur}
          placeholder={t("create_accession_url_field_placeholder")}
        />
        <FormErrorMessage>{urlError}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!titleError} isRequired>
        <FormLabel mt={5}>{t("create_accession_title_field_label")}</FormLabel>
        <Input
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
        />
        <FormErrorMessage>{titleError}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!subjectsError}>
        <FormLabel mt={5}>
          {t("create_accession_subjects_field_label")}
        </FormLabel>
        <Box my={2}>
          <SubjectsAutocomplete onChange={handleSubjectsChange} />
        </Box>
        <FormErrorMessage>{subjectsError}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel mt={5}>
          {t("create_accession_description_field_label")}
        </FormLabel>
        <Textarea value={description} onChange={handleDescriptionChange} />
      </FormControl>

      <FormControl isInvalid={!!dateError} isRequired>
        <FormLabel mt={5}>{t("create_accession_date_field_label")}</FormLabel>
        <ArchiveDatePicker
          selected={(date && new Date(date)) || null}
          onChange={(val) => handleDateChange(val)}
          showPlaceholder={true}
        />
        <FormErrorMessage mb={2}>{dateError}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormLabel mt={5}>{t("create_accession_crawl_type_label")}</FormLabel>
        <RadioGroup onChange={setBrowserProfile} value={browserProfile}>
          <Stack direction="row">
            <Radio value={t("create_accession_crawl_type_default")}>
              {t("create_accession_crawl_type_default")}
            </Radio>
            <Radio value={t("create_accession_crawl_type_facebook")}>
              {t("create_accession_crawl_type_facebook")}
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <Button
        mt={4}
        colorScheme="cyan"
        isLoading={isSubmitting}
        type="submit"
        disabled={!isFormValid}
      >
        {t("create_accession_submit_field_label")}
      </Button>
    </form>
  );
}
