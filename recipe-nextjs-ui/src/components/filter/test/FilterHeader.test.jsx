import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useFilter from "@/hooks/useFilter";
import useFetchIngredients from "@/hooks/useFetchIngredients";
import { showAlert } from "@/store/alertSlice";
import { ALERT_TYPE } from "@/constants/alert.constant";
import FilterHeader from "../FilterHeader";

// Mock dependencies
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("@/hooks/useFilter", () => jest.fn());
jest.mock("@/hooks/useFetchIngredients", () => jest.fn());
jest.mock("@/store/alertSlice", () => ({
  showAlert: jest.fn(),
}));

// Mock components
jest.mock("@/components/common", () => ({
  Dropdown: ({ label, onChangeHandler, control }) => (
    <div data-testid="mock-dropdown">
      <label>{label}</label>
      <select
        data-testid="time-select"
        onChange={(e) => onChangeHandler(e.target.value)}
      >
        <option value="">Select</option>
        <option value="0-15">0-15 min</option>
        <option value="15-30">15-30 min</option>
      </select>
    </div>
  ),
  MultiSelect: ({ label, onChangeHandler, control }) => (
    <div data-testid="mock-multiselect">
      <label>{label}</label>
      <select
        data-testid="ingredient-select"
        multiple
        onChange={(e) => {
          const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value,
          );
          onChangeHandler(values);
        }}
      >
        <option value="1">Tomato</option>
        <option value="2">Onion</option>
      </select>
    </div>
  ),
  Button: ({ children, onClick }) => (
    <button data-testid={`button-${children.toLowerCase()}`} onClick={onClick}>
      {children}
    </button>
  ),
}));

describe("FilterHeader Component", () => {
  const mockReset = jest.fn();
  const mockDispatch = jest.fn();
  const mockFetchFilteredRecipes = jest.fn();
  const mockHandleChangeIngrident = jest.fn();
  const mockHandleChangePreparationTime = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockReturnValue(mockDispatch);

    useForm.mockReturnValue({
      control: {},
      reset: mockReset,
    });

    useFilter.mockReturnValue({
      ingredientIds: [],
      preparationTime: { minPrepTime: null, maxPrepTime: null },
      handleChangeIngrident: mockHandleChangeIngrident,
      handleChangePreparationTime: mockHandleChangePreparationTime,
    });

    useFetchIngredients.mockReturnValue({
      ingredients: [
        { id: 1, name: "Tomato" },
        { id: 2, name: "Onion" },
      ],
    });
  });

  test("renders filter components correctly", () => {
    render(<FilterHeader fetchFilteredRecipes={mockFetchFilteredRecipes} />);

    expect(screen.getByTestId("mock-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("mock-multiselect")).toBeInTheDocument();
    expect(screen.getByTestId("button-search")).toBeInTheDocument();
    expect(screen.getByTestId("button-clear")).toBeInTheDocument();
  });

  test("displays error when searching without filters", () => {
    render(<FilterHeader fetchFilteredRecipes={mockFetchFilteredRecipes} />);

    fireEvent.click(screen.getByTestId("button-search"));

    expect(mockDispatch).toHaveBeenCalledWith(
      showAlert({
        message: "Please select atleast one filter",
        type: ALERT_TYPE.ERROR,
      }),
    );
    expect(mockFetchFilteredRecipes).not.toHaveBeenCalled();
  });

  test("handles preparation time filter change", () => {
    render(<FilterHeader fetchFilteredRecipes={mockFetchFilteredRecipes} />);

    fireEvent.change(screen.getByTestId("time-select"), {
      target: { value: "15-30" },
    });

    expect(mockHandleChangePreparationTime).toHaveBeenCalledWith(15, 30);
  });

  test("handles ingredient selection", () => {
    render(<FilterHeader fetchFilteredRecipes={mockFetchFilteredRecipes} />);

    fireEvent.change(screen.getByTestId("ingredient-select"), {
      target: {
        selectedOptions: [{ value: "1" }, { value: "2" }],
      },
    });

    expect(mockHandleChangeIngrident).toHaveBeenCalledWith(["1", "2"]);
  });

  test("calls fetchFilteredRecipes with correct parameters when filters are applied", () => {
    useFilter.mockReturnValue({
      ingredientIds: [1, 2],
      preparationTime: { minPrepTime: 15, maxPrepTime: 30 },
      handleChangeIngrident: mockHandleChangeIngrident,
      handleChangePreparationTime: mockHandleChangePreparationTime,
    });

    render(<FilterHeader fetchFilteredRecipes={mockFetchFilteredRecipes} />);

    fireEvent.click(screen.getByTestId("button-search"));

    expect(mockFetchFilteredRecipes).toHaveBeenCalledWith(15, 30, [1, 2]);
  });

  test("handles clear button click", () => {
    render(<FilterHeader fetchFilteredRecipes={mockFetchFilteredRecipes} />);

    fireEvent.click(screen.getByTestId("button-clear"));

    expect(mockHandleChangePreparationTime).toHaveBeenCalledWith(null, null);
    expect(mockHandleChangeIngrident).toHaveBeenCalledWith([]);
    expect(mockReset).toHaveBeenCalled();
    expect(mockFetchFilteredRecipes).toHaveBeenCalledWith(0, 0, [], true);
  });

  test("correctly formats time range from dropdown selection", () => {
    render(<FilterHeader fetchFilteredRecipes={mockFetchFilteredRecipes} />);

    fireEvent.change(screen.getByTestId("time-select"), {
      target: { value: "0-15" },
    });

    expect(mockHandleChangePreparationTime).toHaveBeenCalledWith(0, 15);
  });
});
