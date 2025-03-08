import { Text, Badge, Tag, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SubjectTag } from "../SubjectTag.tsx";

interface SubjectProps {
  subjects: string[] | null;
  missingMessage?: boolean;
}

export function Subject({ subjects }: SubjectProps) {
  const { t, i18n } = useTranslation();
  const fontSize = i18n.language === "en" ? "md" : "lg";
  if (!subjects || subjects.length === 0) {
    return (
      <Box mb={3}>
        <Text fontSize={fontSize}>
          <Badge colorScheme="cyan">
            {t("metadata_subjects_label")}
          </Badge>{" "}
          <Tag colorScheme="pink" size="md">
            {t("metadata_missing_subject")}
          </Tag>
        </Text>
      </Box>
    );
  } else {
    return (
      <Box my={1}>
        <Text fontSize={fontSize}>
          <Badge colorScheme="cyan">
            {t("metadata_subjects_label")}:
          </Badge>{" "}
          {subjects.map((subject, idx) => (
            <SubjectTag key={`subject-${idx}`} label={subject} />
          ))}
        </Text>
      </Box>
    );
  }
}
