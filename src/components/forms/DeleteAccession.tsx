import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { appConfig } from "../../constants";

interface DeleteAccessionProps {
  accessionId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteAccession: React.FC<DeleteAccessionProps> = ({
  accessionId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelRef = useRef(null);
  const toast = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${appConfig.apiURL}accessions/${accessionId}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast({
          title: t("delete_accession_success_toast_title"),
          description: t("delete_accession_success_toast_description"),
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onSuccess();
        onClose();
      } else {
        toast({
          title: t("delete_accession_error_toast_title"),
          description: t("delete_accession_error_toast_description"),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting accession:", error);
      toast({
        title: t("delete_accession_error_toast_title"),
        description: t("delete_accession_error_toast_description"),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("delete_accession_alert_header")}
          </AlertDialogHeader>

          <AlertDialogBody>{t("delete_accession_alert_body")}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t("delete_accession_cancel_button")}
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
              isLoading={isDeleting}
            >
              {t("delete_accession_confirm_button")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
