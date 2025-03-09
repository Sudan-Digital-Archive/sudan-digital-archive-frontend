import { Tooltip, Link, Badge, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

export function OriginalURL({ url, fontSize = "md" }: { url: string; fontSize?: string }) {
  const { t } = useTranslation();
  return (
    <Text fontSize={fontSize}>
      <Tooltip label={url}>
        <Link href={url} isExternal onFocus={(e) => e.preventDefault()}>
          <Badge colorScheme="cyan">
            {t("metadata_original_url_label")} <ExternalLinkIcon mx="2px" />
          </Badge>
        </Link>
      </Tooltip>
    </Text>
  );
}
