import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import Input from "../Input";

describe("Input Component", () => {
  const TestComponent = (props) => {
    const { control } = useForm({
      defaultValues: {
        [props.name || "testField"]: "",
      },
    });

    return (
      <Input control={control} name={props.name || "testField"} {...props} />
    );
  };

  const renderInput = (props = {}) => {
    return render(<TestComponent {...props} />);
  };

  test("renders input element with correct attributes", () => {
    renderInput({
      id: "test-input",
      placeholder: "Enter text",
      type: "text",
    });

    const input = screen.getByTestId("test-input");
    expect(input).toBeInTheDocument();
  });

  test("renders label when provided", () => {
    renderInput({
      id: "test-input",
      label: "Test Label",
    });

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
  });

  test("does not render label when not provided", () => {
    renderInput({
      id: "test-input",
    });

    const label = screen.queryByRole("label");
    expect(label).not.toBeInTheDocument();
  });

  test("handles onChange events", async () => {
    renderInput({
      id: "test-input-change",
      name: "testField",
    });

    const input = screen.getByTestId("test-input-change");
    await fireEvent.change(input, { target: { value: "test value" } });
    expect(input).toHaveValue("test value");
  });
});
