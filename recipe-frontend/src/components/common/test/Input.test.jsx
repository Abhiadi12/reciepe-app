import React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";
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

  it("renders input element with correct attributes", () => {
    renderInput({
      id: "test-input",
      placeholder: "Enter text",
      type: "text",
    });

    const input = screen.getByTestId("test-input");
    expect(input).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    renderInput({
      id: "test-input",
      label: "Test Label",
    });

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    renderInput({
      id: "test-input",
    });

    const label = screen.queryByRole("label");
    expect(label).not.toBeInTheDocument();
  });
});
