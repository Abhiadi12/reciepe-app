import React from "react";
import { render } from "@testing-library/react";

import ShimmerComment from "../ShimmerComment";

describe("ShimmerComment Component", () => {
  test("renders shimmer comment", () => {
    render(<ShimmerComment />);
  });
});
