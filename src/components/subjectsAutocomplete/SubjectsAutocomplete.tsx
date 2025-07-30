import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Box, useToast, IconButton, HStack } from "@chakra-ui/react";
import { CreatableSelect, Select, type OptionProps } from "chakra-react-select";
import { DeleteIcon } from "@chakra-ui/icons";
import { appConfig } from "../../constants";
import type { Subject, SubjectsResponse } from "../../apiTypes/apiResponses";
import type { SubjectOption } from "./types";
import { useUser } from "../../hooks/useUser";

interface SubjectsAutocompleteProps {
  menuPlacement?: "top" | "bottom";
  onChange?: (values: readonly SubjectOption[]) => void;
  defaultValues?: {
    values: number[];
    labels: string[];
  };
}

export const SubjectsAutocomplete = ({
  onChange,
  menuPlacement = "bottom",
  defaultValues,
}: SubjectsAutocompleteProps) => {
  const { t, i18n } = useTranslation();
  const { isLoggedIn } = useUser();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingNewSubject, setIsCreatingNewSubject] = useState(false);
  const [isDeletingSubject, setIsDeletingSubject] = useState(false);
  const toast = useToast();
  const [selectedOptions, setSelectedOptions] = useState<SubjectOption[]>(
    defaultValues
      ? defaultValues.values.map((value, index) => ({
          value,
          label: defaultValues.labels[index],
        }))
      : []
  );

  const apiLang = i18n.language === "en" ? "english" : "arabic";

  const subjectOptions: SubjectOption[] = subjects.map((subject) => ({
    value: subject.id,
    label: subject.subject,
  }));

  const fetchSubjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${appConfig.apiURL}metadata-subjects?page=0&per_page=50&lang=${apiLang}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: SubjectsResponse = await response.json();
      setSubjects(data.items || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast({
        title: t("subjects_autocomplete_error_fetching_subjects"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [apiLang, toast, t]);

  const createNewSubject = async (subjectName: string) => {
    setIsCreatingNewSubject(true);
    try {
      const response = await fetch(`${appConfig.apiURL}metadata-subjects`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          metadata_subject: subjectName,
          lang: apiLang,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newSubject = await response.json();
      setSubjects((prev) => [...prev, newSubject]);

      toast({
        title: t("subjects_autocomplete_create_success", {
          subject: newSubject.subject,
        }),
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      return newSubject;
    } catch (error) {
      console.error("Error creating subject:", error);
      toast({
        title: t("subjects_autocomplete_error_creating_subject"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return null;
    } finally {
      setIsCreatingNewSubject(false);
    }
  };

  const deleteSubject = async (subjectId: number) => {
    setIsDeletingSubject(true);
    try {
      const response = await fetch(
        `${appConfig.apiURL}metadata-subjects/${subjectId}`,
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            lang: apiLang,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSubjects((prev) => prev.filter((s) => s.id !== subjectId));
      setSelectedOptions((prev) => prev.filter((o) => o.value !== subjectId));

      toast({
        title: t("subjects_autocomplete_delete_success"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (onChange) {
        onChange(selectedOptions.filter((o) => o.value !== subjectId));
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      toast({
        title: t("subjects_autocomplete_error_deleting_subject"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeletingSubject(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects, apiLang]);

  const handleChange = (newValue: readonly SubjectOption[]) => {
    setSelectedOptions(newValue as SubjectOption[]);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleCreateOption = async (inputValue: string) => {
    const newSubject = await createNewSubject(inputValue);

    if (newSubject) {
      const newOption = {
        value: newSubject.id,
        label: newSubject.subject,
      };
      setSelectedOptions((prev) => [...prev, newOption]);

      if (onChange) {
        onChange([...selectedOptions, newOption]);
      }
    }
  };

  const customComponents = {
    Option: (props: OptionProps<SubjectOption>) => {
      return (
        <HStack
          {...props.innerProps}
          px={4}
          py={2}
          bg={props.isFocused ? "gray.100" : "transparent"}
          _dark={{
            bg: props.isFocused ? "gray.700" : "transparent",
          }}
          justify="space-between"
          width="100%"
          cursor="pointer"
        >
          <Box>{props.data.label}</Box>
          {isLoggedIn && (
            <IconButton
              aria-label={t("delete")}
              icon={<DeleteIcon />}
              size="sm"
              colorScheme="red"
              variant="ghost"
              isLoading={isDeletingSubject}
              onClick={(e) => {
                e.stopPropagation();
                deleteSubject(props.data.value);
              }}
            />
          )}
        </HStack>
      );
    },
  };

  return (
    <Box width="100%" position="relative">
      {isLoggedIn ? (
        <CreatableSelect
          isMulti
          tagColorScheme="cyan"
          name="subjects"
          options={subjectOptions}
          placeholder={t("subjects_autocomplete_search_subjects")}
          noOptionsMessage={() => t("subjects_autocomplete_no_subjects_found")}
          formatCreateLabel={(inputValue) =>
            `${t("subjects_autocomplete_create")} "${inputValue}"`
          }
          menuPlacement={menuPlacement}
          isLoading={isLoading}
          isDisabled={isLoading || isCreatingNewSubject || isDeletingSubject}
          value={selectedOptions}
          onChange={handleChange}
          onCreateOption={handleCreateOption}
          chakraStyles={{
            loadingIndicator: (provided) => ({
              ...provided,
              marginRight: 2,
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              bg: "transparent",
              px: 2,
              cursor: "pointer",
            }),
            clearIndicator: (provided) => ({
              ...provided,
              bg: "transparent",
              px: 2,
              cursor: "pointer",
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: "8px",
              flexWrap: "wrap",
              gap: "4px",
            }),
            option: (provided, { isSelected }) => ({
              ...provided,
              color: isSelected ? "grey.300" : provided.color,
              _dark: {
                backgroundColor: isSelected
                  ? "cyan.700"
                  : provided.backgroundColor,
              },
            }),
          }}
          components={customComponents}
          closeMenuOnSelect={false}
          size="md"
          hideSelectedOptions={false}
          controlShouldRenderValue={true}
        />
      ) : (
        <Select
          isMulti
          tagColorScheme="cyan"
          name="subjects"
          options={subjectOptions}
          placeholder={t("subjects_autocomplete_search_subjects")}
          noOptionsMessage={() => t("subjects_autocomplete_no_subjects_found")}
          menuPlacement={menuPlacement}
          isLoading={isLoading}
          isDisabled={isLoading || isCreatingNewSubject || isDeletingSubject}
          value={selectedOptions}
          onChange={handleChange}
          chakraStyles={{
            loadingIndicator: (provided) => ({
              ...provided,
              marginRight: 2,
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              bg: "transparent",
              px: 2,
              cursor: "pointer",
            }),
            clearIndicator: (provided) => ({
              ...provided,
              bg: "transparent",
              px: 2,
              cursor: "pointer",
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: "8px",
              flexWrap: "wrap",
              gap: "4px",
            }),
            option: (provided, { isSelected }) => ({
              ...provided,
              color: isSelected ? "grey.300" : provided.color,
              _dark: {
                backgroundColor: isSelected
                  ? "cyan.700"
                  : provided.backgroundColor,
              },
            }),
          }}
          components={customComponents}
          closeMenuOnSelect={false}
          size="md"
          hideSelectedOptions={false}
          controlShouldRenderValue={true}
        />
      )}
    </Box>
  );
};
