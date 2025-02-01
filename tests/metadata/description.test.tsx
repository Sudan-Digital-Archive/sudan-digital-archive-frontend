import { Description } from "../../src/components/metadata/description";
import { describe, it, expect } from "vitest";
import { addi18n, renderWithProviders } from "../test_helpers";
import { screen } from "@testing-library/react";
import React from "react";

addi18n();
describe("Description", () => {
  const testDescription = "Test Description";

  it("should render properly in English", () => {
    renderWithProviders(<Description description={testDescription} />);
    expect(screen.getByText("Description:")).toBeTruthy();
    expect(screen.getByText(testDescription)).toBeTruthy();
  });

  it("should render properly in Arabic", () => {
    renderWithProviders(<Description description={testDescription} />, { language: "ar" });
    expect(screen.getByText("الوصف:")).toBeTruthy();
    expect(screen.getByText(testDescription)).toBeTruthy();
    expect(document.documentElement.dir).toBe("rtl");
  });

});
