import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { message } from "@/constants/message.constant";
import CommentEdit from "../CommentEdit";

// Mock Button component
jest.mock("@/components/common", () => ({
  Button: ({ children, onClick }) => (
    <button onClick={onClick} data-testid="save-button">
      {children}
    </button>
  ),
}));

describe("CommentEdit Component", () => {
  const mockProps = {
    editedComment: "Initial comment",
    setEditedComment: jest.fn(),
    setIsEdit: jest.fn(),
    handleEdit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = mockProps) => {
    return render(<CommentEdit {...props} />);
  };

  test("renders component with initial comment", () => {
    renderComponent();

    expect(screen.getByText(message.EDIT_COMMENT)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("Initial comment");
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("updates comment when typing", () => {
    renderComponent();

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Updated comment" } });

    expect(mockProps.setEditedComment).toHaveBeenCalledWith("Updated comment");
  });

  test("shows error when trying to save empty comment", () => {
    renderComponent({
      ...mockProps,
      editedComment: "",
    });

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    expect(screen.getByText(message.COMMENT_REQUIRED)).toBeInTheDocument();
    expect(mockProps.handleEdit).not.toHaveBeenCalled();
  });

  test("clears error when typing after validation error", () => {
    renderComponent({
      ...mockProps,
      editedComment: "",
    });

    // First trigger error
    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);
    expect(screen.getByText(message.COMMENT_REQUIRED)).toBeInTheDocument();

    // Then type something
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New comment" } });

    expect(
      screen.queryByText(message.COMMENT_REQUIRED),
    ).not.toBeInTheDocument();
  });

  test("handles cancel button click", () => {
    renderComponent();

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockProps.setIsEdit).toHaveBeenCalledWith(false);
  });

  test("calls handleEdit when form is valid", () => {
    renderComponent();

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    expect(mockProps.handleEdit).toHaveBeenCalled();
  });

  test("textarea has error class when validation fails", () => {
    renderComponent({
      ...mockProps,
      editedComment: "",
    });

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("border-red-500");
  });

  test("applies correct styling when no error", () => {
    renderComponent();

    const textarea = screen.getByRole("textbox");
    expect(textarea).not.toHaveClass("border-red-500");
  });

  test("handles undefined initial comment gracefully", () => {
    renderComponent({
      ...mockProps,
      editedComment: undefined,
    });

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("");
  });

  test("validation succeeds with non-empty comment", () => {
    renderComponent({
      ...mockProps,
      editedComment: "Valid comment",
    });

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    expect(
      screen.queryByText(message.COMMENT_REQUIRED),
    ).not.toBeInTheDocument();
    expect(mockProps.handleEdit).toHaveBeenCalled();
  });
});
