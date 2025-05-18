import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Box,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import {
  DateMetadata,
  Title,
  Description,
  OriginalURL,
  Subject,
} from "./metadata";
import { useTranslation } from "react-i18next";
import type { AccessionWithMetadata } from "../apiTypes/apiResponses";
import { NavLink } from "react-router";
import { DeleteAccession } from "./forms/DeleteAccession";

interface AccessionsCardsProps {
  accessions: AccessionWithMetadata[];
  onRefresh: () => void;
  isLoggedIn: boolean;
}

export function AccessionsCards({ accessions, isLoggedIn, onRefresh }: AccessionsCardsProps) {
  const { t, i18n } = useTranslation();

  return (
    <SimpleGrid spacing={10} columns={{ sm: 1, md: 2, lg: 3 }} my={5} mx={5}>
      {accessions.map((accession: AccessionWithMetadata, index: number) => {
        const title =
          i18n.language === "en" ? accession.title_en : accession.title_ar;
        const description =
          i18n.language === "en"
            ? accession.description_en
            : accession.description_ar;
        const subjects =
          i18n.language === "en"
            ? accession.subjects_en
            : accession.subjects_ar;

        return (
          <Card
            border="2px"
            borderColor="gray.200"
            borderStyle="inset"
            key={`accession-card-${index}`}
            overflow="auto"
          >
            <CardHeader>
              <Title
                title={title || t("metadata_missing_title")}
                fontSize={i18n.language === "en" ? "md" : "lg"}
                truncate
              />
            </CardHeader>
            <CardBody>
              {description && (
                <Description
                  description={description}
                  fontSize={i18n.language === "en" ? "md" : "lg"}
                  truncate
                />
              )}
              <Box>
                <DateMetadata
                  date={accession.dublin_metadata_date}
                  fontSize={i18n.language === "en" ? "md" : "lg"}
                />
              </Box>
              <Subject subjects={subjects} />
              <OriginalURL
                url={accession.seed_url}
                fontSize={i18n.language === "en" ? "md" : "lg"}
              />
            </CardBody>
            <CardFooter justifyContent="space-between">
              <NavLink to={`/archive/${accession.id}?isPrivate=${accession.is_private}`}>
                <Button
                  colorScheme="purple"
                  fontSize={i18n.language === "en" ? "0.8em" : "1em"}
                >
                  {t("archive_view_record_button")}
                </Button>
              </NavLink>
              {isLoggedIn && (
                <DeleteAccession
                  accessionId={accession.id}
                  isOpen={false}
                  onClose={() => {
                    onRefresh();
                  }}
                  onSuccess={() => {
                    onRefresh();
                  }}
                />
              )}
            </CardFooter>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
