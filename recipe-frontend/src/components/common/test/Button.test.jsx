import React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";
import { vi, describe, expect, it } from "vitest";

describe("Button Component", () => {
  it("renders button with children text", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <Button data-testid="btn" onClick={handleClick}>
        click
      </Button>
    );
    const button = screen.getByTestId("btn");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as disabled when the disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button", { name: /disabled button/i });

    expect(button).toBeDisabled();
  });
});
