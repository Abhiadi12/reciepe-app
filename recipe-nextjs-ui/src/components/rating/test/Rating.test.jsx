import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, Controller } from "react-hook-form";
import Rating from "../Rating";
import CustomStar from "../CustomStar";

jest.mock("../CustomStar", () => {
  return jest.fn(({ filled, size }) => (
    <div data-testid="custom-star" data-filled={filled} data-size={size}>
      ★
    </div>
  ));
});

// Mock useForm and Controller
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
  Controller: jest.fn(({ render }) =>
    render({
      field: {
        value: 0,
        onChange: jest.fn(),
      },
      fieldState: {
        error: null,
      },
    }),
  ),
}));

describe("Rating Component", () => {
  const mockControl = {};
  const defaultProps = {
    control: mockControl,
    name: "rating",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    CustomStar.mockClear();
  });

  describe("Rendering", () => {
    test("renders with default props", () => {
      render(<Rating {...defaultProps} />);

      const stars = screen.getAllByTestId("custom-star");
      expect(stars).toHaveLength(5); // Default maxRating is 5
      expect(stars[0].dataset.size).toBe("24"); // Default size is 24
    });

    test("renders with custom maxRating", () => {
      render(<Rating {...defaultProps} maxRating={3} />);

      const stars = screen.getAllByTestId("custom-star");
      expect(stars).toHaveLength(3);
    });

    test("renders with custom size", () => {
      render(<Rating {...defaultProps} size={32} />);

      const stars = screen.getAllByTestId("custom-star");
      stars.forEach((star) => {
        expect(star.dataset.size).toBe("32");
      });
    });
  });

  describe("Interactions", () => {
    test("handles star click correctly", () => {
      const mockOnChange = jest.fn();
      Controller.mockImplementationOnce(({ render }) =>
        render({
          field: { value: 0, onChange: mockOnChange },
          fieldState: { error: null },
        }),
      );

      render(<Rating {...defaultProps} />);

      const stars = screen.getAllByRole("button");
      fireEvent.click(stars[2]); // Click the third star

      expect(mockOnChange).toHaveBeenCalledWith(3);
    });

    test("disables interaction when readonly", () => {
      const mockOnChange = jest.fn();
      Controller.mockImplementationOnce(({ render }) =>
        render({
          field: { value: 0, onChange: mockOnChange },
          fieldState: { error: null },
        }),
      );

      render(<Rating {...defaultProps} readonly />);

      const stars = screen.getAllByRole("button");
      expect(stars[0]).toBeDisabled();

      fireEvent.click(stars[2]);
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    test("shows filled stars based on value", () => {
      Controller.mockImplementationOnce(({ render }) =>
        render({
          field: { value: 3, onChange: jest.fn() },
          fieldState: { error: null },
        }),
      );

      render(<Rating {...defaultProps} />);

      const stars = screen.getAllByTestId("custom-star");

      // First 3 stars should be filled
      expect(stars[0].dataset.filled).toBe("true");
      expect(stars[1].dataset.filled).toBe("true");
      expect(stars[2].dataset.filled).toBe("true");

      // Last 2 stars should not be filled
      expect(stars[3].dataset.filled).toBe("false");
      expect(stars[4].dataset.filled).toBe("false");
    });
  });

  describe("Styling", () => {
    test("applies custom className", () => {
      render(<Rating {...defaultProps} className="custom-class" />);

      const ratingContainer = screen.getAllByRole("button")[0].parentElement;
      expect(ratingContainer).toHaveClass("custom-class");
    });

    test("applies correct button styles for readonly state", () => {
      render(<Rating {...defaultProps} readonly />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveClass("cursor-default");
        expect(button).not.toHaveClass("cursor-pointer");
      });
    });
  });
});
