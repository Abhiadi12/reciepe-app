import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRating, updateRating } from "@/services/rating.service";
import { showAlert } from "@/store/alertSlice";
import { ALERT_TYPE } from "@/constants/alert.constant";
import RatingForm from "../RatingForm";

// Mock dependencies
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("@/services/rating.service", () => ({
  addRating: jest.fn(),
  updateRating: jest.fn(),
}));

jest.mock("@/components/common", () => ({
  Textarea: ({ label, control, name }) => (
    <div>
      <label>{label}</label>
      <textarea data-testid="feedback-input" />
    </div>
  ),
  Card: ({ children, ...props }) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  ),
  Button: ({ children, type }) => (
    <button type={type} data-testid="submit-button">
      {children}
    </button>
  ),
}));

jest.mock("../Rating", () => ({
  __esModule: true,
  default: ({ control, name }) => (
    <div data-testid="rating-component">Rating Component</div>
  ),
}));

describe("RatingForm Component", () => {
  const mockDispatch = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockReset = jest.fn();
  const mockControl = {};

  const defaultProps = {
    userId: "user123",
    recipeId: "recipe123",
    existedRating: null,
    isEdit: false,
    setRefetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useForm.mockReturnValue({
      control: mockControl,
      handleSubmit: () => mockHandleSubmit,
      reset: mockReset,
    });
  });

  test("renders new rating form correctly", () => {
    render(<RatingForm {...defaultProps} />);

    expect(screen.getByText("Rate this Recipe")).toBeInTheDocument();
    expect(screen.getByTestId("rating-component")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-input")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("renders edit form when isEdit is true", () => {
    render(<RatingForm {...defaultProps} isEdit={true} />);

    expect(screen.getByText("Edit your review")).toBeInTheDocument();
  });

  test("resets form when existedRating changes", () => {
    const existedRating = {
      feedback: "Great recipe!",
      score: 4,
    };

    render(
      <RatingForm
        {...defaultProps}
        isEdit={true}
        existedRating={existedRating}
      />,
    );

    expect(mockReset).toHaveBeenCalledWith({
      feedback: existedRating.feedback,
      rating: existedRating.score,
    });
  });

  test("handles successful new rating submission", async () => {
    const mockResponse = {
      data: { message: "Rating added successfully" },
    };
    addRating.mockResolvedValueOnce(mockResponse);

    render(<RatingForm {...defaultProps} />);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  test("handles successful rating update", async () => {
    const mockResponse = {
      data: { message: "Rating updated successfully" },
    };
    updateRating.mockResolvedValueOnce(mockResponse);

    render(<RatingForm {...defaultProps} isEdit={true} />);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
