import { Text, Badge } from "@chakra-ui/react";
export function Description({ description }: { description: string }) {
  return (
    <Text>
      <Badge colorScheme="cyan">Description:</Badge> {description}
    </Text>
  );
}
