import Menu from "../src/components/menu";
import React from "react";
import { describe, it, expect } from "vitest";
import { addi18n, renderWithProviders } from "./testHelpers";
import { screen } from "@testing-library/react";

addi18n();
describe("Menu", () => {
  it("should render properly in English", () => {
    renderWithProviders(<Menu />);
    expect(screen.getByText("The Archive")).toBeTruthy();
    expect(screen.getByText("About")).toBeTruthy();
    expect(screen.getByText("عربي")).toBeTruthy();
  });

  it("should render properly in Arabic", () => {
    renderWithProviders(<Menu />, { language: "ar" });
    expect(screen.getByText("الأرشيف")).toBeTruthy();
    expect(screen.getByText("English")).toBeTruthy();
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });
});
