import React from "react";
import { render, screen } from "@testing-library/react";
import MenuBar from "../MenuBar";

describe("MenuBar Component", () => {
  test("renders children", () => {
    render(<MenuBar>Menu Content</MenuBar>);

    const menuBar = screen.getByText(/menu content/i);
    expect(menuBar).toBeInTheDocument();
  });

  test("renders with custom class", () => {
    render(
      <MenuBar data-testid="menu" className="custom-class">
        Menu Content
      </MenuBar>,
    );

    const menuBar = screen.getByTestId("menu");
    expect(menuBar).toHaveClass("custom-class");
  });
});
