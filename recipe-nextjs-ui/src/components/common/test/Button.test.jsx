import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  test("renders children", () => {
    render(<Button>Button Content</Button>);

    const button = screen.getByText(/button content/i);
    expect(button).toBeInTheDocument();
  });

  test("renders with custom class", () => {
    render(
      <Button data-testid="button" className="custom-class">
        Button Content
      </Button>,
    );

    const button = screen.getByTestId("button");
    expect(button).toHaveClass("custom-class");
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Button data-testid="btn" onClick={handleClick}>
        click
      </Button>,
    );
    const button = screen.getByTestId("btn");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders as disabled when the disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByText(/disabled button/i);

    expect(button).toBeDisabled();
  });
});
