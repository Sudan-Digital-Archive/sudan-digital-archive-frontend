import { Heading, Badge } from "@chakra-ui/react";
export function Subject({ subject }: { subject: string }) {
  return (
    <Heading as="h6" size="xs">
      <Badge colorScheme="cyan">Subject:</Badge> {subject}
    </Heading>
  );
}
