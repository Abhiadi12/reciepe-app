import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span>icon</span>,
}));

describe("Pagination Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
    isDisabled: false,
  };

  test("renders pagination component with correct initial values", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText("Page")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("of")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("disables Previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const previousButton = screen.getByText("Previous").closest("button");
    expect(previousButton).toBeDisabled();
  });

  test("enables Previous button when not on first page", () => {
    render(<Pagination {...defaultProps} currentPage={2} />);

    const previousButton = screen.getByText("Previous").closest("button");
    expect(previousButton).not.toBeDisabled();
  });

  test("disables Next button when isDisabled is true", () => {
    render(<Pagination {...defaultProps} isDisabled={true} />);

    const nextButton = screen.getByText("Next").closest("button");
    expect(nextButton).toBeDisabled();
  });

  test("calls onPageChange with correct value when Previous button is clicked", () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={2}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByText("Previous"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test("calls onPageChange with correct value when Next button is clicked", () => {
    const onPageChange = jest.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText("Next"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("displays correct page numbers", () => {
    render(<Pagination {...defaultProps} currentPage={3} totalPages={5} />);

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("applies correct styles to buttons", () => {
    render(<Pagination {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveClass("inline-flex", "items-center", "px-4", "py-2");
    });
  });
});
