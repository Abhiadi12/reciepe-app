import React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import Card from "../Card";
import { describe, expect, it } from "vitest";

describe("Card Component", () => {
  it("renders children", () => {
    render(<Card>Card Content</Card>);

    const card = screen.getByText(/card content/i);
    expect(card).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(
      <Card data-testid="card" className="custom-class">
        Card Content
      </Card>
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("custom-class");
  });
});
