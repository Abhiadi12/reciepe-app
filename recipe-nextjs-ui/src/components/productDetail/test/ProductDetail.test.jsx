import React from "react";
import { render, screen } from "@testing-library/react";
import { useParams } from "next/navigation";
import useGetProductDetail from "@/hooks/useGetProductDetail";
import ProductDetail from "../ProductDetail";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/hooks/useGetProductDetail", () => jest.fn());
jest.mock("@/components/productDetail/ProductCard", () => () => (
  <div data-testid="mock-product-card">Mocked ProductCard</div>
));
jest.mock("@/components/comment/CommentBody", () => () => (
  <div data-testid="mock-comment-body">Mocked CommentBody</div>
));
jest.mock("@/components/rating/RatingBody", () => () => (
  <div data-testid="mock-rating-body">Mocked RatingBody</div>
));

describe("ProductDetail Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders ProductCard, RatingBody, and CommentBody", () => {
    const mockProduct = {
      id: "123",
      title: "Test Recipe",
      createdBy: { _id: "user-456" },
    };

    // Mock the useParams hook
    useParams.mockReturnValue({
      query: { id: "123" },
    });

    // Mock the useGetProductDetail hook
    useGetProductDetail.mockReturnValue({ product: mockProduct });

    render(<ProductDetail />);

    expect(screen.getByTestId("mock-product-card")).toBeInTheDocument();
    expect(screen.getByTestId("mock-rating-body")).toBeInTheDocument();
    expect(screen.getByTestId("mock-comment-body")).toBeInTheDocument();
  });

  test("handles missing product data gracefully", () => {
    useParams.mockReturnValue({
      query: { id: "123" },
    });

    useGetProductDetail.mockReturnValue({ product: null });

    render(<ProductDetail />);

    expect(screen.queryByText("Mocked ProductCard")).not.toBeInTheDocument();
    expect(screen.queryByText("Mocked RatingBody")).not.toBeInTheDocument();
    expect(screen.queryByText("Mocked CommentBody")).not.toBeInTheDocument();
  });
});
