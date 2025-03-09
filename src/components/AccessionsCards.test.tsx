import { AccessionsCards } from "./AccessionsCards";
import { describe, it, expect } from "vitest";
import { addi18n, renderWithProviders } from "../../testUtils/testHelpers.tsx";
import { screen } from "@testing-library/react";

const mockAccessions = [
  {
    id: 123,
    seed_url: "https://example.com",
    dublin_metadata_date: "2023-01-01",
    title_en: "Test Title",
    description_en: "Test Description",
    subjects_en: ["Test Subject"],
    subjects_en_ids: [1],
    title_ar: null,
    description_ar: null,
    subjects_ar: null,
    subjects_ar_ids: null,
    has_english_metadata: true,
    has_arabic_metadata: false,
    crawl_status: "completed",
    crawl_timestamp: "2023-01-01",
    crawl_id: "abc123",
    org_id: "org123",
    job_run_id: "job123",
  },
  {
    id: 456,
    seed_url: "https://example2.com",
    dublin_metadata_date: "2023-01-02",
    title_en: null,
    description_en: null,
    subjects_en: null,
    subjects_en_ids: null,
    title_ar: null,
    description_ar: null,
    subjects_ar: null,
    subjects_ar_ids: null,
    has_english_metadata: false,
    has_arabic_metadata: false,
    crawl_status: "completed",
    crawl_timestamp: "2023-01-02",
    crawl_id: "def456",
    org_id: "org456",
    job_run_id: "job456",
  },
];

addi18n();
describe("AccessionsCards", () => {
  it("should render properly in English", () => {
    renderWithProviders(<AccessionsCards accessions={mockAccessions} />, {
      language: "en",
    });
    expect(screen.getByText("Test Title")).toBeTruthy();
    expect(screen.getByText(/Test Subject/)).toBeTruthy();
    expect(screen.getByText("Test Description")).toBeTruthy();
    expect(screen.getByText("No title available")).toBeTruthy();
    expect(screen.getAllByText("View record")).toBeTruthy();
  });

  it("should render properly in Arabic", () => {
    renderWithProviders(<AccessionsCards accessions={mockAccessions} />, {
      language: "ar",
    });
    expect(screen.getAllByText("عرض السجل")).toBeTruthy();
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });

  it("should truncate long descriptions", () => {
    const longDescription = "A".repeat(300);
    const accessionsWithLongDesc = [
      {
        id: 789,
        seed_url: "https://example.com",
        dublin_metadata_date: "2023-01-01",
        title_en: "Test Title",
        description_en: longDescription,
        subjects_en: ["Test Subject"],
        subjects_en_ids: [1],
        title_ar: null,
        description_ar: null,
        subjects_ar: null,
        subjects_ar_ids: null,
        has_english_metadata: true,
        has_arabic_metadata: false,
        crawl_status: "completed",
        crawl_timestamp: "2023-01-01",
        crawl_id: "ghi789",
        org_id: "org789",
        job_run_id: "job789",
      },
    ];

    renderWithProviders(
      <AccessionsCards accessions={accessionsWithLongDesc} />,
      { language: "en" }
    );
    const displayedDescription = screen.getByText((content) =>
      content.includes("A")
    );
    expect(displayedDescription.textContent?.length).toBeLessThan(
      longDescription.length
    );
    expect(displayedDescription.textContent?.endsWith("...")).toBeTruthy();
  });
});
