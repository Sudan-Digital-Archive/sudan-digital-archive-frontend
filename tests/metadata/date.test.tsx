import { DateMetadata } from "../../src/components/metadata/date";
import { describe, it, expect } from "vitest";
import { addi18n, renderWithProviders } from "../test_helpers";
import { screen } from "@testing-library/react";
import React from "react";

addi18n();
describe("DateMetadata", () => {
  const testDate = "2023-01-01";

  it("should render properly in English", () => {
    renderWithProviders(<DateMetadata date={testDate} />);
    expect(screen.getByText("Date:")).toBeTruthy();
    expect(screen.getByText("January 1, 2023")).toBeTruthy();
  });

  it("should render properly in Arabic", () => {
    renderWithProviders(<DateMetadata date={testDate} />, { language: "ar" });
    expect(screen.getByText("التاريخ:")).toBeTruthy();
    expect(screen.getByText("١ يناير ٢٠٢٣")).toBeTruthy();
    expect(document.documentElement.dir).toBe("rtl");
  });

  it("should handle invalid date", () => {
    renderWithProviders(<DateMetadata date="invalid-date" fontSize="lg" />, {
      language: "en",
    });
    expect(screen.getByText("Date:")).toBeTruthy();
    expect(screen.queryByText(/invalid-date/)).toBeFalsy();
  });
});
