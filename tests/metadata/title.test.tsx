import { Title } from "../../src/components/metadata/title";
import { describe, it, expect } from "vitest";
import { addi18n, renderWithProviders } from "../test_helpers";
import { screen } from "@testing-library/react";
import React from "react";


addi18n();
describe("Title", () => {
  const testTitle = "Test Title";

  it("should render properly in English", () => {
    renderWithProviders(<Title title={testTitle} />);
    expect(screen.getByText("Title:")).toBeTruthy();
    expect(screen.getByText(testTitle)).toBeTruthy();
  });

  it("should render properly in Arabic", () => {
    renderWithProviders(<Title title={testTitle} />, { language: "ar" });
    expect(screen.getByText("العنوان:")).toBeTruthy();
    expect(screen.getByText(testTitle)).toBeTruthy();
    expect(document.documentElement.dir).toBe("rtl");
  });
});
