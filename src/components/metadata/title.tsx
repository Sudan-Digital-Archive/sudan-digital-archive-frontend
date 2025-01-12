import {
    Badge,
 
    Heading,

  } from "@chakra-ui/react";
export function Title({title}: {title: string}) {
  return (
    <Heading as="h5" size="sm">
      <Badge colorScheme="cyan" fontSize="0.9em">
        Title:
      </Badge>{" "}
      {title}
    </Heading>
  );
}
