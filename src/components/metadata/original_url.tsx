import { Tooltip, Link, Badge } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
export function OriginalURL({ url }: { url: string }) {
  return (
    <>
      <Tooltip label={url}>
        <Link href={url} isExternal onFocus={(e) => e.preventDefault()}>
          <Badge colorScheme="cyan">
            View original url <ExternalLinkIcon mx="2px" />
          </Badge>
        </Link>
      </Tooltip>
    </>
  );
}
