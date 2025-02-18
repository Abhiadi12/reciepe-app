import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useDispatch } from "react-redux";
import CommentForm from "../CommentForm";
import { createComment } from "@/services/comment.service";
import { showAlert } from "@/store/alertSlice";
import { ALERT_TYPE } from "@/constants/alert.constant";

// Mock dependencies
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("@/services/comment.service", () => ({
  createComment: jest.fn(),
}));

// Mock common components
jest.mock("@/components/common/Textarea", () => ({
  __esModule: true,
  default: ({ label, control, name, placeholder }) => (
    <div>
      <label>{label}</label>
      <textarea
        data-testid="comment-input"
        name={name}
        placeholder={placeholder}
      />
    </div>
  ),
}));

jest.mock("@/components/common/Button", () => ({
  __esModule: true,
  default: ({ children, type }) => (
    <button type={type} data-testid="submit-button">
      {children}
    </button>
  ),
}));

describe("CommentForm", () => {
  const mockDispatch = jest.fn();
  const mockFetchData = jest.fn();
  const mockReset = jest.fn();

  const defaultProps = {
    id: "123",
    label: "Add Comment",
    name: "comment",
    placeholder: "Write your comment",
    fetchData: mockFetchData,
    className: "test-class",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    // Mock useForm hook implicitly
    jest.spyOn(require("react-hook-form"), "useForm").mockReturnValue({
      control: {},
      handleSubmit: (fn) => (data) => fn(data),
      reset: mockReset,
    });
  });

  test("renders comment form with correct props", () => {
    render(<CommentForm {...defaultProps} />);

    expect(screen.getByTestId("comment-input")).toBeInTheDocument();
    expect(screen.getByText("Add Comment")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("handles successful comment submission", async () => {
    const mockResponse = {
      data: {
        message: "Comment added successfully",
      },
    };
    createComment.mockResolvedValueOnce(mockResponse);

    render(<CommentForm {...defaultProps} />);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Verify createComment was called with correct params
      expect(createComment).toHaveBeenCalledWith(
        defaultProps.id,
        expect.any(Object),
      );

      // Verify success alert was dispatched
      expect(mockDispatch).toHaveBeenCalledWith(
        showAlert({
          message: mockResponse.data.message,
          type: ALERT_TYPE.SUCCESS,
        }),
      );

      // Verify form was reset
      expect(mockReset).toHaveBeenCalled();

      // Verify data refetch was triggered
      expect(mockFetchData).toHaveBeenCalled();
    });
  });

  test("handles comment submission error", async () => {
    const mockError = {
      response: {
        data: {
          message: "Failed to add comment",
        },
      },
    };
    createComment.mockRejectedValueOnce(mockError);

    render(<CommentForm {...defaultProps} />);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Verify error alert was dispatched
      expect(mockDispatch).toHaveBeenCalledWith(
        showAlert({
          message: mockError.response.data.message,
          type: ALERT_TYPE.ERROR,
        }),
      );

      // Verify form was not reset on error
      expect(mockReset).not.toHaveBeenCalled();

      // Verify data refetch was not triggered on error
      expect(mockFetchData).not.toHaveBeenCalled();
    });
  });

  test("handles form submission without fetchData prop", async () => {
    const mockResponse = {
      data: {
        message: "Comment added successfully",
      },
    };
    createComment.mockResolvedValueOnce(mockResponse);

    const propsWithoutFetch = {
      ...defaultProps,
      fetchData: undefined,
    };

    render(<CommentForm {...propsWithoutFetch} />);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createComment).toHaveBeenCalled();
      expect(mockReset).toHaveBeenCalled();
      // Should not throw error when fetchData is undefined
      expect(mockFetchData).not.toHaveBeenCalled();
    });
  });

  test("applies custom className to form", () => {
    const { container } = render(<CommentForm {...defaultProps} />);
    const form = container.querySelector("form");
    expect(form).toHaveClass("test-class");
  });
});
