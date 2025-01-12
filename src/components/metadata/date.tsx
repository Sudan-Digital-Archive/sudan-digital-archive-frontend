import { Badge, Text } from "@chakra-ui/react";

export function Date({ date }: { date: string }) {
  return (
    <>
      <Badge colorScheme="cyan">Date:</Badge>{" "}
      {/* TODO: Create a timestamp component */}
      <Text as="i" fontSize="0.9em">
        {date}
      </Text>
    </>
  );
}
