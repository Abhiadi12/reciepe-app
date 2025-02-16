import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import MultiSelect from "../MultiSelect";
import "@testing-library/jest-dom";

// Wrapper component to provide form context
const TestWrapper = ({ children, defaultValues = {} }) => {
  const methods = useForm({ defaultValues });
  return children(methods);
};

describe("MultiSelect Component", () => {
  const mockList = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  const defaultProps = {
    name: "test",
    list: mockList,
    placeholder: "Select options",
    label: "Test Label",
    className: "test-class",
  };

  const mockOnChangeHandler = jest.fn();

  test("renders with label and placeholder", () => {
    render(
      <TestWrapper>
        {(methods) => (
          <MultiSelect {...defaultProps} control={methods.control} />
        )}
      </TestWrapper>,
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Select options")).toBeInTheDocument();
  });

  test("opens dropdown when clicked", () => {
    render(
      <TestWrapper>
        {(methods) => (
          <MultiSelect {...defaultProps} control={methods.control} />
        )}
      </TestWrapper>,
    );

    // selector is the "Select options" button
    const selector = screen.getByText("Select options");

    // Click the "Select options" button
    fireEvent.click(selector);

    // Check if the first option is rendered
    mockList.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test("calls onChangeHandler when selection changes", () => {
    render(
      <TestWrapper>
        {(methods) => (
          <MultiSelect
            {...defaultProps}
            control={methods.control}
            onChangeHandler={mockOnChangeHandler}
          />
        )}
      </TestWrapper>,
    );

    fireEvent.click(screen.getByText("Select options"));
    fireEvent.click(screen.getByText("Option 1"));

    expect(mockOnChangeHandler).toHaveBeenCalledWith(["1"]);
  });

  test("applies custom className correctly", () => {
    render(
      <TestWrapper>
        {(methods) => (
          <MultiSelect
            {...defaultProps}
            control={methods.control}
            className="custom-class"
          />
        )}
      </TestWrapper>,
    );

    const container = screen.getByTestId("multi-select-container");
    expect(container).toHaveClass("custom-class");
  });

  test("displays error message when validation fails", () => {
    const rules = { required: "This field is required" };

    render(
      <TestWrapper>
        {(methods) => (
          <MultiSelect
            {...defaultProps}
            control={methods.control}
            rules={rules}
          />
        )}
      </TestWrapper>,
    );

    methods.trigger("test");

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  test("renders without label when not provided", () => {
    const { label, ...propsWithoutLabel } = defaultProps;

    render(
      <TestWrapper>
        {(methods) => (
          <MultiSelect {...propsWithoutLabel} control={methods.control} />
        )}
      </TestWrapper>,
    );

    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });
});
