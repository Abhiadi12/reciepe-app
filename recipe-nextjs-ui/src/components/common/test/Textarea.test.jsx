import React from "react";
import { useForm } from "react-hook-form";
import { render, screen, fireEvent } from "@testing-library/react";
import Textarea from "../Textarea";

describe("Text Component", () => {
  const TestComponent = (props) => {
    const { control } = useForm({
      defaultValues: {
        [props.name || "testField"]: "",
      },
    });

    return (
      <Textarea control={control} name={props.name || "testField"} {...props} />
    );
  };

  const renderInput = (props = {}) => {
    return render(<TestComponent {...props} />);
  };

  it("renders input element with correct attributes", () => {
    renderInput({
      id: "test-area",
      placeholder: "Enter text",
    });

    const input = screen.getByTestId("test-area");
    expect(input).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    renderInput({
      id: "test-area",
      label: "Test Label",
    });

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    renderInput({
      id: "test-area",
    });

    const label = screen.queryByRole("label");
    expect(label).not.toBeInTheDocument();
  });

  it("handles onChange events", async () => {
    renderInput({
      id: "test-area-change",
      name: "testField",
    });

    const input = screen.getByTestId("test-area-change");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(input).toHaveValue("new value");
  });
});
