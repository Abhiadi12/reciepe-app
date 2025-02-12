import React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MenuBar from "../MenuBar";

describe("MenuBar Component", () => {
  it("renders children", () => {
    render(<MenuBar>Menu Content</MenuBar>);

    const menuBar = screen.getByText(/menu content/i);
    expect(menuBar).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(
      <MenuBar data-testid="menu" className="custom-class">
        Menu Content
      </MenuBar>
    );

    const menuBar = screen.getByTestId("menu");
    expect(menuBar).toHaveClass("custom-class");
  });
});
