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
import { ArchiveDatePicker } from "../date_picker.tsx";
import { useTranslation } from "react-i18next";
import { appConfig } from "../../constants.ts";
import { useState, useEffect, useCallback } from "react";
import { SubjectsAutocomplete } from "../subjects_autocomplete.tsx";

export function CreateAccession() {
  const { t, i18n } = useTranslation();
  const toast = useToast();

  // Form state
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  // TODO Use proper type
  const [subjects, setSubjects] = useState<
    readonly { label: string; value: number }[]
  >([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string>("");
  const [browserProfile, setBrowserProfile] = useState<string>(
    t("create_accession_crawl_type_default")
  );

  // Error states
  const [urlError, setUrlError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validity state
  const [isFormValid, setIsFormValid] = useState(false);
  const validateURL = useCallback(
    (value: string) => {
      try {
        new URL(value);
        return "";
      } catch (_) {
        return t("create_accession_invalid_url");
      }
    },
    [t]
  );
  const validateDate = useCallback(
    (value: string) => {
      if (!value) {
        return "Date is required";
      }
      try {
        new Date(value);
        return "";
      } catch (_) {
        return t("create_accession_invalid_date");
      }
    },
    [t]
  );
  // Validate form whenever inputs change
  useEffect(() => {
    const urlValid = url !== "" && validateURL(url) === "";
    const titleValid = title !== "";
    const subjectsValid = subjects.length > 0;
    const dateValid = date !== "" && validateDate(date) === "";

    setIsFormValid(urlValid && titleValid && subjectsValid && dateValid);
  }, [url, title, subjects, date, browserProfile, validateURL, validateDate]);

  const getBrowserProfile = (profile: string) => {
    switch (profile) {
      case t("create_accession_crawl_type_facebook"):
        return "facebook";
      default:
        return null;
    }
  };

  const validateRequired = (
    value: string,
    fieldName: string,
    customValidator?: (val: string) => string
  ) => {
    if (!value) {
      return t(`create_accession_invalid_${fieldName}`);
    }
    return customValidator ? customValidator(value) : "";
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    // Remove validation on change - will validate on blur instead
  };

  const handleUrlBlur = () => {
    // Validate URL on blur
    setUrlError(validateRequired(url, "url", validateURL));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setTitleError(validateRequired(value, "title"));
  };

  const handleSubjectsChange = (
    values: readonly { label: string; value: number }[]
  ) => {
    setSubjects(values);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (val: Date | null) => {
    if (val) {
      const dateStr = val.toISOString();
      setDate(dateStr);
      setDateError(validateDate(dateStr));
    } else {
      setDate("");
      setDateError(validateDate(""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const urlValidation = validateRequired(url, "url", validateURL);
    const titleValidation = validateRequired(title, "title");
    const dateValidation = validateDate(date);
    setUrlError(urlValidation);
    setTitleError(titleValidation);
    setDateError(dateValidation);

    if (
      urlValidation ||
      titleValidation ||
      dateValidation ||
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
            new Date(date).toISOString().split("T")[0]
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
        // Reset form after successful submission
        setUrl("");
        setTitle("");
        setSubjects([]);
        setDescription("");
        setDate("");
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
        <Input value={title} onChange={handleTitleChange} />
        <FormErrorMessage>{titleError}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormLabel mt={5}>
          {t("create_accession_subjects_field_label")}
        </FormLabel>
        <Box my={2}>
          <SubjectsAutocomplete onChange={handleSubjectsChange} />
        </Box>
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
