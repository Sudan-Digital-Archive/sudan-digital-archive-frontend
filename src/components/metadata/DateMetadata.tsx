import { Badge, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function DateMetadata({
  date,
  fontSize = "md",
}: {
  date: string;
  fontSize?: string;
}) {
  const { t, i18n } = useTranslation();

  function parseDate(date: string): string {
    try {
      const parsedDate = new Date(date);

      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      };

      return parsedDate.toLocaleDateString(
        i18n.language === "ar" ? "ar-EG" : "en-US",
        options
      );
    } catch (error) {
      console.error(`Could not parse date ${date}. Error: ${error}`);
      return "";
    }
  }

  return (
    <Text fontSize={fontSize}>
      <Badge colorScheme="cyan">{t("metadata_date_label")}</Badge>{" "}
      <Text as="i" fontSize={fontSize}>
        {parseDate(date)}
      </Text>
    </Text>
  );
}
