import { Badge, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function Title({ title, fontSize = "md" }: { title: string; fontSize?: string }) {
  const { t } = useTranslation();
  return (
    <Heading as="h5" size="sm" fontSize={fontSize}>
      <Badge colorScheme="cyan" fontSize="0.9em">
        {t("metadata_title_label")}
      </Badge>{" "}
      {title}
    </Heading>
  );
}
