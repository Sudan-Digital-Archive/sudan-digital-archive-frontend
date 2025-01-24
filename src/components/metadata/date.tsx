import { Badge, Text } from "@chakra-ui/react";

export function DateMetadata({ date }: { date: string }) {
  function parseDate(date: string): string {
    try {
      const parsed = new Date(date);
      return parsed.toISOString().split("T")[0];
    } catch (error) {
      console.error(`Could not parse date ${date}. Error: ${error}`);
    }
    return "";
  }

  return (
    <>
      <Badge colorScheme="cyan">Date:</Badge>{" "}
      <Text as="i" fontSize="0.9em">
        {parseDate(date)}
      </Text>
    </>
  );
}
