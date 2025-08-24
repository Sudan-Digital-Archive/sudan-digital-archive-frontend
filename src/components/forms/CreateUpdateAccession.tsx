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
  Switch,
} from "@chakra-ui/react";
import { ArchiveDatePicker } from "../DatePicker.tsx";
import { useTranslation } from "react-i18next";
import { appConfig } from "../../constants.ts";
import { useState, useEffect, useCallback } from "react";
import { SubjectsAutocomplete } from "../subjectsAutocomplete/SubjectsAutocomplete.tsx";
import type { ChangeEvent, FormEvent } from "react";
import type { AccessionWithMetadata } from "../../apiTypes/apiResponses.ts";
import type { SubjectOption } from "../subjectsAutocomplete/types.ts";

interface CreateUpdateAccessionProps {
  accessionToUpdate?: AccessionWithMetadata;
  onSuccess?: () => void;
}

export function CreateUpdateAccession({
  accessionToUpdate,
  onSuccess,
}: CreateUpdateAccessionProps) {
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const isEditMode = !!accessionToUpdate;

  const [url, setUrl] = useState(accessionToUpdate?.seed_url || "");
  const [title, setTitle] = useState(
    (i18n.language === "en"
      ? accessionToUpdate?.title_en
      : accessionToUpdate?.title_ar) || ""
  );
  const [subjects, setSubjects] = useState<readonly SubjectOption[]>([]);
  const [description, setDescription] = useState(
    (i18n.language === "en"
      ? accessionToUpdate?.description_en
      : accessionToUpdate?.description_ar) || ""
  );
  const [date, setDate] = useState<Date | null>(
    accessionToUpdate?.dublin_metadata_date
      ? new Date(accessionToUpdate.dublin_metadata_date)
      : null
  );
  const [browserProfile, setBrowserProfile] = useState<string>(
    t("create_accession_crawl_type_default")
  );
  const [isPrivate, setIsPrivate] = useState(
    accessionToUpdate?.is_private || false
  );

  // Initialize subjects if editing an existing record
  useEffect(() => {
    if (accessionToUpdate) {
      const subjectIds =
        i18n.language === "en"
          ? accessionToUpdate.subjects_en_ids
          : accessionToUpdate.subjects_ar_ids;
      const subjectLabels =
        i18n.language === "en"
          ? accessionToUpdate.subjects_en
          : accessionToUpdate.subjects_ar;

      if (
        subjectIds &&
        subjectLabels &&
        subjectIds.length === subjectLabels.length
      ) {
        const initialSubjects: SubjectOption[] = subjectIds.map(
          (id, index) => ({
            value: id,
            label: subjectLabels[index] || "",
          })
        );
        setSubjects(initialSubjects);
      }
    }
  }, [accessionToUpdate, i18n.language]);

  const [urlError, setUrlError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [subjectsError, setSubjectsError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);
  const validateURL = useCallback(
    (value: string) => {
      try {
        new URL(value);
        return { valid: true, error: "" };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleLanguageChange = () => {
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
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      const subjectIds = subjects.map((subject) => subject.value);
      const payload = {
        metadata_language: i18n.language === "en" ? "english" : "arabic",
        url: url,
        metadata_title: title,
        metadata_subjects: subjectIds,
        metadata_description: description || null,
        metadata_time: `${
          new Date(date as Date).toISOString().split("T")[0]
        }T00:00:00`,
        // TODO: Change me - add browser profile into the backend so it's in the accession w metadata
        browser_profile: isEditMode ? null : getBrowserProfile(browserProfile),
        is_private: isPrivate,
      };

      const method = isEditMode ? "PUT" : "POST";
      const urlPath = isEditMode
        ? `${appConfig.apiURL}accessions/${accessionToUpdate?.id}`
        : `${appConfig.apiURL}accessions`;
      const response = await fetch(urlPath, {
        method,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201 || response.status === 200) {
        toast({
          title: isEditMode
            ? t("update_accession_success_title")
            : t("create_accession_crawling_url_title"),
          description: isEditMode
            ? t("update_accession_success_description")
            : t("create_accession_success_description"),
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        if (isEditMode && onSuccess) {
          onSuccess();
        } else {
          setUrl("");
          setTitle("");
          setSubjects([]);
          setDescription("");
          setDate(null);
          setBrowserProfile(t("create_accession_crawl_type_default"));
          setIsPrivate(false);
        }
      } else {
        const errorText = await response.text();
        console.error(errorText);
        toast({
          title: isEditMode
            ? t("update_accession_error_title")
            : t("create_accession_error_toast_title"),
          description: `${
            isEditMode
              ? t("update_accession_error_description")
              : t("create_accession_error_toast_description")
          } ${errorText}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: isEditMode
          ? t("update_accession_error_title")
          : t("create_accession_error_toast_title"),
        description: isEditMode
          ? t("update_accession_error_description")
          : t("create_accession_error_toast_description"),
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
      {isEditMode && (
        <FormControl display="flex" alignItems="center" mb={2}>
          <FormLabel htmlFor="language-switch" mr={2} display="flex" alignItems="center">
            {t("change_language_label", {
              targetLanguage: i18n.language === "en" ? t("arabic") : t("english"),
            })}
          </FormLabel>
          <Switch
            id="language-switch"
            isChecked={i18n.language === "ar"}
            onChange={handleLanguageChange}
            alignSelf="top"
            transform="translateY(-3px)"
          />
        </FormControl>
      )}
      <FormControl isInvalid={!!urlError} isRequired>
        <FormLabel>{t("create_accession_url_field_label")}</FormLabel>
        <Input
          value={url}
          onChange={handleUrlChange}
          // prevents annoying url validation when you close modal after submission
          // since url is always focused after submission
          onBlur={() =>
            setTimeout(() => {
              handleUrlBlur();
            }, 300)
          }
          placeholder={t("create_accession_url_field_placeholder")}
          isDisabled={isEditMode}
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
          <SubjectsAutocomplete
            onChange={handleSubjectsChange}
            value={subjects}
            defaultValues={
              accessionToUpdate
                ? {
                    values:
                      (i18n.language === "en"
                        ? accessionToUpdate.subjects_en_ids
                        : accessionToUpdate.subjects_ar_ids) || [],
                    labels:
                      (i18n.language === "en"
                        ? accessionToUpdate.subjects_en
                        : accessionToUpdate.subjects_ar) || [],
                  }
                : undefined
            }
          />
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

      {!isEditMode && (
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
      )}

      <FormControl display="flex" alignItems="center" mt={5}>
        <FormLabel htmlFor="is-private-switch" mb="0">
          {t("create_accession_private_label")}
        </FormLabel>
        <Switch
          id="is-private-switch"
          isChecked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
      </FormControl>

      <Button
        mt={4}
        colorScheme="cyan"
        isLoading={isSubmitting}
        type="submit"
        disabled={!isFormValid}
      >
        {isEditMode
          ? t("edit_accession_submit_button")
          : t("create_accession_submit_field_label")}
      </Button>
    </form>
  );
}
