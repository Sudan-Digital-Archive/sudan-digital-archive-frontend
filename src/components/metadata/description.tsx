import { Text, Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function Description({ description, fontSize = "md" }: { description: string; fontSize?: string }) {
  const { t } = useTranslation();
  return (
    <Text fontSize={fontSize}>
      <Badge colorScheme="cyan">{t("metadata_description_label")}</Badge> {description}
    </Text>
  );
}
