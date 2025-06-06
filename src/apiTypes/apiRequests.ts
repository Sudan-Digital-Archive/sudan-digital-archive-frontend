export type AccessionsQueryFilters = {
  date_from?: Date;
  date_to?: Date;
  lang?: string;
  page?: number;
  per_page?: number;
  query_term?: string;
  metadata_subjects?: number[]
  is_private?: boolean
};
