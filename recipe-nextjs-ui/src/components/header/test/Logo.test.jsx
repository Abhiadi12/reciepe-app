import React from "react";
import { render } from "@testing-library/react";

import Logo from "../Logo";

describe("Logo Component", () => {
  test("renders logo correctly", () => {
    const { getByText } = render(<Logo />);
    expect(getByText("RecipeHub")).toBeInTheDocument();
  });
});
