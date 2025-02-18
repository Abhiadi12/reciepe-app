import React from "react";
import { render } from "@testing-library/react";

import ShimmerTable from "../ShimmerTable";

describe("ShimmerTable Component", () => {
  test("renders shimmer table", () => {
    render(<ShimmerTable />);
  });
});
