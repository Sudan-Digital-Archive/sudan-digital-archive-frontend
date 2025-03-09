import { SubjectTag } from "../src/components/SubjectTag";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "./testHelpers";
import { screen, fireEvent } from "@testing-library/react";

describe("SubjectTag", () => {
  it("should render properly with provided text", () => {
    renderWithProviders(<SubjectTag label="Politics"></SubjectTag>);
    expect(screen.getByText("Politics")).toBeTruthy();
  });

  it("should not display a close button by default", () => {
    renderWithProviders(<SubjectTag label="Politics" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("should display a close button when hasCloseButton is true", () => {
    renderWithProviders(<SubjectTag label="Politics" hasCloseButton />);
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("should call onClose callback when close button is clicked", () => {
    const onCloseMock = vi.fn();
    renderWithProviders(
      <SubjectTag label="Politics" hasCloseButton onClose={onCloseMock} />
    );
    
    fireEvent.click(screen.getByRole("button"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
