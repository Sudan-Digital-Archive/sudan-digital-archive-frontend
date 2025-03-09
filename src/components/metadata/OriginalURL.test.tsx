import { OriginalURL } from "./OriginalURL.tsx";
import { describe, it, expect } from "vitest";
import { addi18n, renderWithProviders } from  "../../../testUtils/testHelpers.tsx";
import { screen } from "@testing-library/react";

addi18n();
describe("OriginalURL", () => {
  const testUrl = "https://example.com";

  it("should render properly in English", () => {
    renderWithProviders(<OriginalURL url={testUrl} />);
    expect(screen.getByText("View original url")).toBeTruthy();
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe(testUrl);
  });

  it("should render properly in Arabic", () => {
    renderWithProviders(<OriginalURL url={testUrl} />, { language: "ar" });
    expect(screen.getByText("عرض الرابط الأصلي")).toBeTruthy();
    expect(document.documentElement.dir).toBe("rtl");
  });
});
