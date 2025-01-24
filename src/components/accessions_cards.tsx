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
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <SimpleGrid spacing={10} columns={{ sm: 1, md: 2, lg: 5 }} mt={5}>
      {accessions.map((record, index) => {
        if (record && record[1]) {
          return (
            <Card
              border="2px"
              borderColor="gray.200"
              borderStyle="inset"
              key={`accession-card-${index}`}
              overflow="auto"
            >
              <CardHeader>
                <Title title={record[1].title} />
              </CardHeader>
              <CardBody>
                <Subject subject={record[1].subject} />
                <Description description={record[1].description} />
                {record[1].description}
                <Box>
                  <DateMetadata date={record[0].dublin_metadata_date} />
                </Box>
                <OriginalURL url={record[0].seed_url} />
              </CardBody>
              <CardFooter>
                <Button
                  colorScheme="purple"
                  fontSize="0.8em"
                  onClick={() => navigate(`/archive/${record[0].id}`)}
                >
                  {t("archive_view_record_button")}
                </Button>
              </CardFooter>
            </Card>
          );
        }
      })}
    </SimpleGrid>
  );
}
