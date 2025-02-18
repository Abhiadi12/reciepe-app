import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar from "../Avatar";

describe("Avatar Component", () => {
  test("renders children", () => {
    render(<Avatar>Avatar Content</Avatar>);

    const avatar = screen.getByText(/avatar content/i);
    expect(avatar).toBeInTheDocument();
  });

  test("renders with custom class", () => {
    render(
      <Avatar data-testid="avatar" className="custom-class">
        Avatar Content
      </Avatar>,
    );

    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveClass("custom-class");
  });
});
