import React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Avatar from "../Avatar";

describe("Avatar Component", () => {
  it("renders children", () => {
    render(<Avatar>Avatar Content</Avatar>);

    const avatar = screen.getByText(/avatar content/i);
    expect(avatar).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(
      <Avatar data-testid="avatar" className="custom-class">
        Avatar Content
      </Avatar>
    );

    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveClass("custom-class");
  });
});
