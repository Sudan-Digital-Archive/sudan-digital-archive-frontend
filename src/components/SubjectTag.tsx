import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

interface SubjectTagProps {
  label: string;
  hasCloseButton?: boolean;
  onClose?: () => void;
}

export const SubjectTag = ({
  label,
  hasCloseButton = false,
  onClose,
}: SubjectTagProps) => {
  return (
    <Tag
      fontSize="sm"
      variant="solid"
      colorScheme="cyan"
      borderRadius="full"
      m={0.5}
    >
      <TagLabel>{label}</TagLabel>
      {hasCloseButton && <TagCloseButton onClick={onClose} />}
    </Tag>
  );
};
