import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { data } from "@/mocks/dropdown.mock";
import Dropdown from "../Dropdown";

const TestWrapper = ({ children, defaultValues = {} }) => {
  const methods = useForm({ defaultValues });
  return children(methods);
};

describe("Dropdown Component", () => {
  const defaultProps = {
    name: "testDropdown",
    list: data,
    placeholder: "Select an option",
    label: "Test Label",
    onChangeHandler: jest.fn(),
  };

  test("renders dropdown with label and placeholder", () => {
    render(
      <TestWrapper>
        {(methods) => <Dropdown {...defaultProps} control={methods.control} />}
      </TestWrapper>,
    );

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  test("renders all options from the list", () => {
    render(
      <TestWrapper>
        {(methods) => <Dropdown {...defaultProps} control={methods.control} />}
      </TestWrapper>,
    );

    defaultProps.list.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  test("calls onChangeHandler when selection changes", async () => {
    const onChangeHandler = jest.fn();

    render(
      <TestWrapper>
        {(methods) => (
          <Dropdown
            {...defaultProps}
            control={methods.control}
            onChangeHandler={onChangeHandler}
          />
        )}
      </TestWrapper>,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "option1" } });

    expect(onChangeHandler).toHaveBeenCalledWith("option1");
  });

  test.skip("displays error message when validation fails", async () => {
    const rules = { required: "This field is required" };

    render(
      <TestWrapper>
        {(methods) => (
          <Dropdown {...defaultProps} control={methods.control} rules={rules} />
        )}
      </TestWrapper>,
    );

    const form = screen.getByRole("combobox").closest("form");
    if (form) {
      await waitFor(() => fireEvent.submit(form));
    }

    screen.debug();

    const errorMessage = await screen.findByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders without label when label prop is not provided", () => {
    const { label, ...propsWithoutLabel } = defaultProps;

    render(
      <TestWrapper>
        {(methods) => (
          <Dropdown {...propsWithoutLabel} control={methods.control} />
        )}
      </TestWrapper>,
    );

    expect(screen.queryByText("Test Label")).not.toBeInTheDocument();
  });
});
