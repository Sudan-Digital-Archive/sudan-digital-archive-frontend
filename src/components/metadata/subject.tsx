import { Heading, Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function Subject({ subject, fontSize = "md" }: { subject: string; fontSize?: string }) {
  const { t } = useTranslation();
  return (
    <Heading as="h6" size="xs" fontSize={fontSize}>
      <Badge colorScheme="cyan">{t("metadata_subject_label")}</Badge> {subject}
    </Heading>
  );
}
