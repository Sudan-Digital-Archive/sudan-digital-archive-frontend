import { Button, useClipboard, useToast, Stack } from "@chakra-ui/react";
import { CopyIcon, ExternalLinkIcon, InfoOutlineIcon } from "@chakra-ui/icons";
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
    <Stack spacing={2}>
      <Button
        onClick={onOpen}
        rightIcon={<InfoOutlineIcon />}
        size="xs"
        variant="outline"
      >
        {t("view_accession_see_metadata")}
      </Button>

      <Button
        variant="outline"
        onClick={handleCopy}
        rightIcon={<CopyIcon />}
        size="xs"
      >
        {t("copy_record")}
      </Button>
      <NavLink to="/archive" target="_blank">
        <Button variant="outline" rightIcon={<ExternalLinkIcon />} size="xs">
          {t("what_is_sda")}
        </Button>
      </NavLink>
    </Stack>
  );
}
