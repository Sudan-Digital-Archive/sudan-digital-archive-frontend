import {
  Button,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { ExternalLink, Plus } from "react-feather";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { appConfig } from "../constants.ts";

interface AccessionButtonsProps {
  onOpen: () => void;
  id: string | undefined;
  lang: string;
}

export default function AccessionButtons({
  onOpen,
  id,
  lang,
}: AccessionButtonsProps) {
  const { t } = useTranslation();
  const { onCopy } = useClipboard(window.location.href);
  const toast = useToast();

  const handleCopy = () => {
    const url = `${appConfig.appURLFrontend}archive/${id}?lang=${lang}`;
    onCopy(url);
    toast({
      title: t("link_copied"),
      description: url,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button colorScheme="pink" onClick={onOpen} rightIcon={<Plus />}>
        {t("view_accession_see_metadata")}
      </Button>

      <Button colorScheme="pink" onClick={handleCopy} rightIcon={<CopyIcon />}>
        {t("copy_record")}
      </Button>
      <NavLink to="/mission" target="_blank">
        <Button colorScheme="pink" rightIcon={<ExternalLink />}>
          {t("what_is_sda")}
        </Button>
      </NavLink>
    </>
  );
}
