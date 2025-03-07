import { AccessionsCards } from "../src/components/accessions_cards";
import React from "react";
import { describe, it, expect } from "vitest";
import { addi18n, renderWithProviders } from "./test_helpers";
import { screen } from "@testing-library/react";

const mockAccessions = [
  [
    {
      id: "123",
      seed_url: "https://example.com",
      dublin_metadata_date: "2023-01-01",
    },
    {
      title: "Test Title",
      subject: "Test Subject",
      description: "Test Description",
    },
  ],
  [
    {
      id: "456",
      seed_url: "https://example2.com",
      dublin_metadata_date: "2023-01-02",
    },
    null, // Testing missing metadata case
  ],
];

addi18n();
describe("AccessionsCards", () => {
  it("should render properly in English", () => {
    renderWithProviders(<AccessionsCards accessions={mockAccessions} />);
    expect(screen.getByText("Test Title")).toBeTruthy();
    expect(screen.getByText("Test Subject")).toBeTruthy();
    expect(screen.getByText("Test Description")).toBeTruthy();
    expect(screen.getByText("Title translation not available")).toBeTruthy();
    expect(screen.getAllByText("View record")).toBeTruthy();
  });

  it("should render properly in Arabic", () => {
    renderWithProviders(<AccessionsCards accessions={mockAccessions} />, { language: "ar" });
    expect(screen.getAllByText("عرض السجل")).toBeTruthy();
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });

  it("should truncate long descriptions", () => {
    const longDescription = "A".repeat(300); 
    const accessionsWithLongDesc = [
      [
        {
          id: "789",
          seed_url: "https://example.com",
          dublin_metadata_date: "2023-01-01",
        },
        {
          title: "Test Title",
          subject: "Test Subject",
          description: longDescription,
        },
      ],
    ];

    renderWithProviders(<AccessionsCards accessions={accessionsWithLongDesc} />);
    const displayedDescription = screen.getByText((content) => content.includes("A"));
    expect(displayedDescription.textContent?.length).toBeLessThan(longDescription.length);
    expect(displayedDescription.textContent?.endsWith("...")).toBeTruthy();
  });
});
