import { render, screen } from "@testing-library/react";
import ProductDetail from "../ProductDetail";
import useGetProductDetail from "@/hooks/useGetProductDetail";
import { useParams } from "next/navigation";

// Mock the dependencies
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/hooks/useGetProductDetail", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./ProductCard", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="product-card">Product Card</div>),
}));

jest.mock("@/components/comment/CommentBody", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="comment-body">Comment Body</div>),
}));

jest.mock("@/components/rating/RatingBody", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="rating-body">Rating Body</div>),
}));

describe("ProductDetail", () => {
  const mockProduct = {
    _id: "123",
    name: "Test Product",
    createdBy: {
      _id: "user123",
    },
  };

  beforeEach(() => {
    useParams.mockReturnValue({ id: "123" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders null when product is not available", () => {
    useGetProductDetail.mockReturnValue({ product: null });
    const { container } = render(<ProductDetail />);
    expect(container.firstChild).toBeNull();
  });

  it("renders all components when product is available", () => {
    useGetProductDetail.mockReturnValue({ product: mockProduct });

    render(<ProductDetail />);

    // Check if all main components are rendered
    expect(screen.getByTestId("product-card")).toBeInTheDocument();
    expect(screen.getByTestId("rating-body")).toBeInTheDocument();
    expect(screen.getByTestId("comment-body")).toBeInTheDocument();
  });

  it("passes correct props to child components", () => {
    useGetProductDetail.mockReturnValue({ product: mockProduct });

    render(<ProductDetail />);

    // Verify ProductCard props
    const ProductCard = require("./ProductCard").default;
    expect(ProductCard).toHaveBeenCalledWith(
      { recipe: mockProduct },
      expect.anything(),
    );

    // Verify RatingBody props
    const RatingBody = require("@/components/rating/RatingBody").default;
    expect(RatingBody).toHaveBeenCalledWith(
      {
        recipeId: "123",
        recipeOwnerId: "user123",
      },
      expect.anything(),
    );

    // Verify CommentBody props
    const CommentBody = require("@/components/comment/CommentBody").default;
    expect(CommentBody).toHaveBeenCalledWith({ id: "123" }, expect.anything());
  });

  it("has correct layout classes", () => {
    useGetProductDetail.mockReturnValue({ product: mockProduct });

    render(<ProductDetail />);

    // Check main container
    const mainContainer =
      screen.getByTestId("product-card").parentElement.parentElement;
    expect(mainContainer).toHaveClass("mt-16");

    // Check grid container
    const gridContainer = screen.getByTestId("product-card").parentElement;
    expect(gridContainer).toHaveClass("grid", "grid-cols-1", "md:grid-cols-2");
  });
});
