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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { AccessionWithMetadata } from "../apiTypes/apiResponses";

interface AccessionsCardsProps {
  accessions: AccessionWithMetadata[];
}

export function AccessionsCards({ accessions }: AccessionsCardsProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
            <CardFooter>
              <Button
                colorScheme="purple"
                fontSize={i18n.language === "en" ? "0.8em" : "1em"}
                onClick={() => navigate(`/archive/${accession.id}`)}
              >
                {t("archive_view_record_button")}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
