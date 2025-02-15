type AccessionListRecord = {
  id: string;
  dublin_metadata_date: string;
  seed_url: string;
};
type AccessionMetadata = {
  id: string;
  title: string;
  subject: string;
  description?: string;
};
export type AccessionList = [AccessionListRecord, AccessionMetadata | null][];

export type AccessionOne = {
  accession: { dublin_metadata_date: string; seed_url: string };
  metadata_ar: AccessionMetadata;
  metadata_en: AccessionMetadata;
};
