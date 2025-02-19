// Home.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  fetchAllRecipes,
  fetchFilteredRecipes,
} from "@/services/recipe.service";
import filterRecipeReducer from "@/store/filterRecipeSlice";
import Home from "../HomeClinet";
import { mockRecipesTwo } from "@/mocks/recipe.mock";

// Mock withAuth HOC
jest.mock("@/hoc/withAuth", () => ({
  __esModule: true,
  default: (Component) => Component,
}));

// Mock the service functions
jest.mock("@/services/recipe.service", () => ({
  fetchAllRecipes: jest.fn(),
  fetchFilteredRecipes: jest.fn(),
}));

// Mock components
jest.mock("@/components/filter/FilterHeader", () => ({
  __esModule: true,
  default: ({ fetchFilteredRecipes }) => (
    <div data-testid="filter-header">
      <button onClick={() => fetchFilteredRecipes(10, 30, ["1", "2"])}>
        Apply Filter
      </button>
    </div>
  ),
}));

jest.mock("@/components/recipe/RecipeCard", () => ({
  __esModule: true,
  default: ({ title }) => <div data-testid="recipe-card">{title}</div>,
}));

jest.mock("@/components/recipe/ShimmerCard", () => ({
  __esModule: true,
  default: () => <div data-testid="shimmer-card">Loading...</div>,
}));

jest.mock("@/components/common/Pagination", () => ({
  __esModule: true,
  default: ({ currentPage, onPageChange }) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      <span>Page {currentPage}</span>
    </div>
  ),
}));

// Mock usePagination hook
jest.mock("@/hooks/usePagination", () => () => ({
  page: 1,
  pageSize: 10,
  totalPages: 30,
  handlePageChange: jest.fn(),
  handlePageSizeChange: jest.fn(),
  handleTotalPagesChange: jest.fn(),
  isDisabled: () => false,
}));

describe("Home Component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        filterRecipe: filterRecipeReducer,
        // Add auth reducer mock if needed by withAuth
        auth: () => ({
          isAuthenticated: true,
          user: { id: "123", name: "Test User" },
        }),
      },
      preloadedState: {
        filterRecipe: {
          loading: false,
          data: [],
          error: null,
        },
        // Add auth state if needed by withAuth
        auth: {
          isAuthenticated: true,
          user: { id: "123", name: "Test User" },
        },
      },
    });

    jest.clearAllMocks();
  });

  const mockRecipes = mockRecipesTwo;

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
  };

  test("renders initial loading state", () => {
    store = configureStore({
      reducer: {
        filterRecipe: filterRecipeReducer,
        auth: () => ({ isAuthenticated: true, user: { id: "123" } }),
      },
      preloadedState: {
        filterRecipe: {
          loading: true,
          data: [],
          error: null,
        },
        auth: { isAuthenticated: true, user: { id: "123" } },
      },
    });

    renderComponent();

    const shimmerCards = screen.getAllByTestId("shimmer-card");
    expect(shimmerCards).toHaveLength(3);
  });

  test("fetches and renders initial recipes", async () => {
    fetchAllRecipes.mockResolvedValueOnce({
      data: {
        data: {
          recipes: mockRecipes,
          totalRecipes: 2,
        },
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(fetchAllRecipes).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("recipe-card")).toHaveLength(2);
      expect(screen.getByText("Recipe 1")).toBeInTheDocument();
      expect(screen.getByText("Recipe 2")).toBeInTheDocument();
    });
  });

  test("handles filter application", async () => {
    fetchFilteredRecipes.mockResolvedValueOnce({
      data: {
        data: {
          recipes: [mockRecipes[0]],
          totalRecipes: 1,
        },
      },
    });

    renderComponent();

    const filterButton = screen.getByText("Apply Filter");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(fetchFilteredRecipes).toHaveBeenCalledWith(1, 10, 10, 30, [
        "1",
        "2",
      ]);
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("recipe-card")).toHaveLength(1);
      expect(screen.getByText("Recipe 1")).toBeInTheDocument();
    });
  });

  test("skips effect when filter is applied", async () => {
    fetchAllRecipes.mockResolvedValueOnce({
      data: {
        data: {
          recipes: mockRecipes,
          totalRecipes: 2,
        },
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(fetchAllRecipes).toHaveBeenCalledTimes(1);
    });

    // Apply filter
    const filterButton = screen.getByText("Apply Filter");
    fireEvent.click(filterButton);

    // Effect should be skipped
    expect(fetchAllRecipes).toHaveBeenCalledTimes(1);
  });
});
