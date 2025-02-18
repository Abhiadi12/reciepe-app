import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { mockRecipe } from "@/mocks/recipe.mock";

describe("ProductCard Component", () => {
  test("renders recipe image, title, and description", () => {
    render(<ProductCard recipe={mockRecipe} />);

    expect(screen.getByAltText(/delicious pasta/i)).toBeInTheDocument();
    expect(screen.getByText(/delicious pasta/i)).toBeInTheDocument();
    expect(screen.getByText(/a tasty pasta recipe/i)).toBeInTheDocument();
  });

  test("renders list of ingredients", () => {
    render(<ProductCard recipe={mockRecipe} />);

    expect(screen.getByText(/tomato/i)).toBeInTheDocument();
    expect(screen.getByText(/basil/i)).toBeInTheDocument();
  });

  test("renders steps in an ordered list", () => {
    render(<ProductCard recipe={mockRecipe} />);

    expect(screen.getByText(/boil water/i)).toBeInTheDocument();
    expect(screen.getByText(/add pasta/i)).toBeInTheDocument();
    expect(screen.getByText(/cook for 10 mins/i)).toBeInTheDocument();
  });

  test("displays preparation time and created by username", () => {
    render(<ProductCard recipe={mockRecipe} />);

    expect(screen.getByText(/prep time:/i)).toBeInTheDocument();
    expect(screen.getByText(/20 mins/i)).toBeInTheDocument();
    expect(screen.getByText(/created by:/i)).toBeInTheDocument();
    expect(screen.getByText(/chefjohn/i)).toBeInTheDocument();
  });
});
