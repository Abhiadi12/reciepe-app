import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RatingCard from "../RatingCard";
import { getAverageRating } from "../../../utils/getAverageRating";
import { mockRatings } from "@/mocks/ratings.mock";

// Mock the dependencies
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = ({ handleDelete }) => (
      <div data-testid="mock-delete-recipe">
        <button onClick={() => handleDelete("123")}>Confirm Delete</button>
      </div>
    );
    return DynamicComponent;
  },
}));

jest.mock("../../../utils/getAverageRating", () => ({
  getAverageRating: jest.fn(),
}));

jest.mock("@/components/common", () => ({
  Card: ({ children, ...props }) => (
    <div data-testid="mock-card" {...props}>
      {children}
    </div>
  ),
  Modal: ({ children, modalOpen, setModalOpen }) =>
    modalOpen ? (
      <div data-testid="mock-modal">
        {children}
        <button onClick={() => setModalOpen(false)}>Close Modal</button>
      </div>
    ) : null,
}));

describe("RatingCard Component", () => {
  const defaultProps = {
    ratings: mockRatings,
    userId: "user1",
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getAverageRating.mockReturnValue(4.5);
  });

  test("renders total ratings count correctly", () => {
    render(<RatingCard {...defaultProps} />);

    expect(screen.getByText("Total Ratings: 2")).toBeInTheDocument();
  });

  test("renders average rating correctly", () => {
    render(<RatingCard {...defaultProps} />);

    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(getAverageRating).toHaveBeenCalledWith(mockRatings);
  });

  test("renders individual ratings with correct stars", () => {
    render(<RatingCard {...defaultProps} />);

    const ratings = screen.getAllByText("★".repeat(4));
    expect(ratings).toHaveLength(1);
  });

  test('shows "You" for current user\'s rating', () => {
    render(<RatingCard {...defaultProps} />);

    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  test("shows delete button only for user's own ratings", () => {
    render(<RatingCard {...defaultProps} />);

    const deleteButtons = screen.getAllByText("delete");
    expect(deleteButtons).toHaveLength(1);
  });

  test("opens delete modal when delete is clicked", () => {
    render(<RatingCard {...defaultProps} />);

    const deleteButton = screen.getByText("delete");
    fireEvent.click(deleteButton);
    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
    expect(screen.getByTestId("mock-delete-recipe")).toBeInTheDocument();
  });

  test("calls onDelete when confirmation button is clicked", () => {
    render(<RatingCard {...defaultProps} />);

    // Open modal
    fireEvent.click(screen.getByText("delete"));

    // Click confirm delete
    fireEvent.click(screen.getByText("Confirm Delete"));

    // Verify onDelete was called
    expect(defaultProps.onDelete).toHaveBeenCalledWith("123");
  });
});
