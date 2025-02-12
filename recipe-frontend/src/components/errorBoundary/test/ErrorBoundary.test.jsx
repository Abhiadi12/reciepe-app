import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import ErrorBoundary from "../ErrorBoundary";

describe("ErrorBoundary Component", () => {
  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Content</div>
      </ErrorBoundary>
    );

    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
  });
});
