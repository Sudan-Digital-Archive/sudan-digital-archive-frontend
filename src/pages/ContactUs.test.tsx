import { screen } from "@testing-library/react";
import ContactUs from "./ContactUs";
import { addi18n, renderWithProviders } from "../../testUtils/testHelpers";
import { describe, it, expect } from "vitest";
addi18n();

describe("ContactUs Component", () => {
  it("renders without errors", () => {
    renderWithProviders(<ContactUs />);
  });

  it("displays the heading in English", () => {
    renderWithProviders(<ContactUs />);
    expect(screen.getByText("Get in Touch")).toBeTruthy();
  });

  it("displays the heading in Arabic", () => {
    renderWithProviders(<ContactUs />, { language: "ar" });
    expect(screen.getByText("ابقى على تواصل")).toBeTruthy();
  });

  it("displays the email address", () => {
    renderWithProviders(<ContactUs />);
    expect(
      screen.getByText("info@sudandigitalarchive.com")
    ).toBeTruthy();
  });
});
