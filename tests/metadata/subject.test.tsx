import { Subject } from "../../src/components/metadata";
import { describe, it, expect } from "vitest";
import { addi18n, renderWithProviders } from "../testHelpers";
import { screen } from "@testing-library/react";
import React from "react";

addi18n();
describe("Subject", () => {
  const testSubjects = ["Test Subject", "Another Subject"];

  it("should render properly in English", () => {
    renderWithProviders(<Subject subjects={testSubjects} />, {
      language: "en",
    });
    expect(screen.getByText("Subjects:")).toBeTruthy();
    testSubjects.forEach((subject) => {
      expect(screen.getByText(subject)).toBeTruthy();
    });
  });

  it("should render properly in Arabic", () => {
    renderWithProviders(<Subject subjects={testSubjects} />, {
      language: "ar",
    });
    expect(screen.getByText("المواضيع:")).toBeTruthy();
    testSubjects.forEach((subject) => {
      expect(screen.getByText(subject)).toBeTruthy();
    });
    expect(document.documentElement.dir).toBe("rtl");
  });

  it("should display missing message when no subjects provided", () => {
    renderWithProviders(<Subject subjects={null} />, { language: "en" });
    expect(screen.getByText("Subject translation not available")).toBeTruthy();
  });
});
