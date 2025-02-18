import React from "react";
import { render } from "@testing-library/react";

import ShimmerRating from "../ShimmerRating";

describe("ShimmerRating Component", () => {
  test("renders shimmer rating", () => {
    render(<ShimmerRating />);
  });
});
