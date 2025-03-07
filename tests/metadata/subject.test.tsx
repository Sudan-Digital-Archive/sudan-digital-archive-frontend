import { Subject } from "../../src/components/metadata/subject";
import { describe, it, expect } from "vitest";
import { addi18n, renderWithProviders } from "../testHelpers";
import { screen } from "@testing-library/react";
import React from "react";

addi18n();
describe("Subject", () => {
  const testSubject = "Test Subject";

  it("should render properly in English", () => {
    renderWithProviders(<Subject subject={testSubject} />);
    expect(screen.getByText("Subject:")).toBeTruthy();
    expect(screen.getByText(testSubject)).toBeTruthy();
  });

  it("should render properly in Arabic", () => {
    renderWithProviders(<Subject subject={testSubject} />, { language: "ar" });
    expect(screen.getByText("الموضوع:")).toBeTruthy();
    expect(screen.getByText(testSubject)).toBeTruthy();
    expect(document.documentElement.dir).toBe("rtl");
  });

});
