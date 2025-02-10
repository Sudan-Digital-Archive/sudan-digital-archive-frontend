import { Text, Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { truncateString } from "../../utils/text";

interface DescriptionProps {
  description: string;
  fontSize?: string;
  truncate?: boolean;
  maxLength?: number;
}

export function Description({ 
  description, 
  fontSize = "md",
  truncate = false,
  maxLength = 200 
}: DescriptionProps) {
  const { t } = useTranslation();
  const displayText = truncate ? truncateString(description, maxLength) : description;

  return (
    <Text fontSize={fontSize}>
      <Badge colorScheme="cyan">{t("metadata_description_label")}</Badge> {displayText}
    </Text>
  );
}
