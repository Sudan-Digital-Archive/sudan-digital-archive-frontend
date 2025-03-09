import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Box, useToast } from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { appConfig } from "../../constants";
import type { Subject, SubjectsResponse } from "../../apiTypes/apiResponses";
import { SubjectTag } from "../SubjectTag";
import type { SubjectOption } from "./types";

interface SubjectsAutocompleteProps {
  menuPlacement?: "top" | "bottom";
  onChange?: (values: readonly SubjectOption[]) => void;
}

export const SubjectsAutocomplete = ({
  onChange,
  menuPlacement = "bottom",
}: SubjectsAutocompleteProps) => {
  const { t, i18n } = useTranslation();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingNewSubject, setIsCreatingNewSubject] = useState(false);
  const toast = useToast();
  const [selectedOptions, setSelectedOptions] = useState<SubjectOption[]>([]);

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
        title: t("subjects_autocomplete_create_success", { subject: newSubject.subject }),
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MultiValue: ({ removeProps, ...props }: any) => {
      return (
        <SubjectTag
          label={props.data.label}
          hasCloseButton={true}
          onClose={removeProps.onClick}
        />
      );
    },
  };

  return (
    <Box width="100%" position="relative">
      <CreatableSelect
        isMulti
        name="subjects"
        options={subjectOptions}
        placeholder={t("subjects_autocomplete_search_subjects")}
        noOptionsMessage={() => t("subjects_autocomplete_no_subjects_found")}
        formatCreateLabel={(inputValue) => `${t("subjects_autocomplete_create")} "${inputValue}"`}
        menuPlacement={menuPlacement}
        isLoading={isLoading}
        isDisabled={isLoading || isCreatingNewSubject}
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
          multiValue: () => ({
            // Remove default styling since we're using our own component
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
    </Box>
  );
};
