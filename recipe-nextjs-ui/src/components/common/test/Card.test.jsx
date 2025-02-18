import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Card Component", () => {
  test("renders children", () => {
    render(<Card>Card Content</Card>);

    const card = screen.getByText(/card content/i);
    expect(card).toBeInTheDocument();
  });

  test("renders with custom class", () => {
    render(
      <Card data-testid="card" className="custom-class">
        Card Content
      </Card>,
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("custom-class");
  });
});
