import { Heading, Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { truncateString } from "../../utils/text";

interface SubjectProps {
  subject: string;
  fontSize?: string;
  truncate?: boolean;
  maxLength?: number;
}

export function Subject({ 
  subject, 
  fontSize = "md",
  truncate = false,
  maxLength = 200 
}: SubjectProps) {
  const { t } = useTranslation();
  const displayText = truncate ? truncateString(subject, maxLength) : subject;

  return (
    <Heading as="h6" size="xs" fontSize={fontSize}>
      <Badge colorScheme="cyan">{t("metadata_subject_label")}</Badge> {displayText}
    </Heading>
  );
}
