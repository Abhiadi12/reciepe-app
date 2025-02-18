import React from "react";
import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import AuthpageClient from "../AuthpageClient";

// Mock dependencies
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("@/components/authentication/AuthForm", () => ({
  __esModule: true,
  default: () => <div data-testid="auth-form">Mock Auth Form</div>,
}));

describe("AuthpageClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders AuthForm component", () => {
    useSelector.mockReturnValue(null); // No token

    render(<AuthpageClient />);

    expect(screen.getByTestId("auth-form")).toBeInTheDocument();
  });

  test("selects token from Redux state", () => {
    const mockToken = "mock-token";
    useSelector.mockReturnValue(mockToken);

    render(<AuthpageClient />);

    expect(useSelector).toHaveBeenCalled();
    const selectorFn = useSelector.mock.calls[0][0];
    const mockState = {
      auth: {
        user: {
          token: mockToken,
        },
      },
    };
    expect(selectorFn(mockState)).toBe(mockToken);
  });
});
