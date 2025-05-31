import { Tag, TagLabel } from "@chakra-ui/react";

interface SubjectTagProps {
  label: string;
}

export const SubjectTag = ({
  label,
}: SubjectTagProps) => {
  return (
    <Tag
      fontSize="md"
      variant="solid"
      colorScheme="cyan"
      borderRadius="full"
      m={0.5}
    >
      <TagLabel>{label}</TagLabel>
    </Tag>
  );
};
