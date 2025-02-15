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
  Subject,
  Title,
  Description,
  OriginalURL,
} from "../components/metadata";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { AccessionList } from "../types/api_responses";

interface AccessionsCardsProps {
  accessions: AccessionList;
}

export function AccessionsCards({ accessions }: AccessionsCardsProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <SimpleGrid spacing={10} columns={{ sm: 1, md: 2, lg: 5 }} mt={5}>
      {accessions.map((record, index) => {
        const [accession, metadata] = record;
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
                title={metadata?.title ?? t("metadata_missing_title")}
                fontSize={i18n.language === "en" ? "md" : "lg"}
                truncate
              />
            </CardHeader>
            <CardBody>
              <Subject
                subject={metadata?.subject ?? t("metadata_missing_subject")}
                fontSize={i18n.language === "en" ? "md" : "lg"}
                truncate
              />
              {metadata?.description && (
                <Description
                  description={
                    metadata?.description ?? t("metadata_missing_description")
                  }
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
