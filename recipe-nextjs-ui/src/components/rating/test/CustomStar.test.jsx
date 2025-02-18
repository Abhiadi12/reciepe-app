import React from "react";
import { render, screen } from "@testing-library/react";

import CustomStar from "../CustomStar";

describe("CustomStar Component", () => {
  test("renders star icon", () => {
    render(<CustomStar />);
    const star = screen.getByTestId("star-icon");
    expect(star).toBeInTheDocument();
  });
});
