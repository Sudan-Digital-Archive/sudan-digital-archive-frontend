import { SubjectTag } from "./SubjectTag.tsx";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../../testUtils/testHelpers.tsx";
import { screen } from "@testing-library/react";

describe("SubjectTag", () => {
  it("should render properly with provided text", () => {
    renderWithProviders(<SubjectTag label="Politics"></SubjectTag>);
    expect(screen.getByText("Politics")).toBeTruthy();
  });
});
