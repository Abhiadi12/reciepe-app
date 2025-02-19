import React from "react";
import { render } from "@testing-library/react";

import RedirectLoader from "../RedirectLoader";

describe("RedirectLoader Component", () => {
  test("renders redirect loader", () => {
    render(<RedirectLoader />);
  });
});
