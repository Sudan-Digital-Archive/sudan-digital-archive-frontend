import Footer from "../src/components/footer";
import React from "react";
import { describe, it, expect } from "vitest";
import { addi18n, renderWithProviders } from "./testHelpers";
import { screen } from "@testing-library/react";

addi18n();
describe("Footer", () => {
  it("should render properly in English", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/free/)).toBeTruthy();
    expect(screen.getByText(/open source/)).toBeTruthy();
    expect(screen.getByText(/software/)).toBeTruthy();
    expect(screen.getByText("Github")).toBeTruthy();
  });

  it("should render properly in Arabic", () => {
    renderWithProviders(<Footer />, { language: "ar" });
    expect(screen.getByText(/برمجيات/)).toBeTruthy();
    expect(screen.getByText(/مفتوحة/)).toBeTruthy();
    expect(screen.getByText(/المصدر/)).toBeTruthy();
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });
});
