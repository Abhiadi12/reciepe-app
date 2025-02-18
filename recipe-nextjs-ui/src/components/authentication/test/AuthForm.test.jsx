import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import AuthForm from "../AuthForm";
import { login, signup } from "@/services/auth.service";
import { showAlert } from "@/store/alertSlice";
import { login as loginAction } from "@/store/authSlice";
import { ALERT_TYPE } from "@/constants/alert.constant";
import { message } from "@/constants/message.constant";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("@/services/auth.service", () => ({
  login: jest.fn(),
  signup: jest.fn(),
}));

jest.mock("@/components/common", () => ({
  Card: ({ children, ...props }) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  ),
  Input: ({ label, control, name, type, rules, placeholder }) => (
    <div>
      <label>{label}</label>
      <input
        data-testid={`${name}-input`}
        type={type}
        placeholder={placeholder}
      />
    </div>
  ),
  Button: ({ children, type }) => (
    <button type={type} data-testid="submit-button">
      {children}
    </button>
  ),
}));

describe("AuthForm Component", () => {
  const mockRouter = { push: jest.fn() };
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
    useDispatch.mockReturnValue(mockDispatch);
  });

  test("renders login form by default", () => {
    render(<AuthForm />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.queryByTestId("name-input")).not.toBeInTheDocument();
  });

  test("switches to signup form when signup button is clicked", () => {
    render(<AuthForm />);

    fireEvent.click(screen.getByText("Sign Up"));

    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
  });

  test("handles successful login", async () => {
    const mockResponse = {
      data: {
        data: { token: "mock-token" },
        message: "Login successful",
      },
    };
    login.mockResolvedValueOnce(mockResponse);

    render(<AuthForm />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith("test@example.com", "password123");
      expect(mockDispatch).toHaveBeenCalledWith(
        loginAction(mockResponse.data.data),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        showAlert({
          message: mockResponse.data.message,
          type: ALERT_TYPE.SUCCESS,
        }),
      );
      expect(mockRouter.push).toHaveBeenCalledWith("/home");
    });
  });

  test("handles login error", async () => {
    const mockError = {
      response: {
        data: {
          message: "Invalid credentials",
        },
      },
    };
    login.mockRejectedValueOnce(mockError);

    render(<AuthForm />);

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        showAlert({
          message: mockError.response.data.message,
          type: ALERT_TYPE.ERROR,
        }),
      );
    });
  });

  test("handles successful signup", async () => {
    const mockResponse = {
      data: {
        message: "Signup successful",
      },
    };
    signup.mockResolvedValueOnce(mockResponse);

    render(<AuthForm />);

    // Switch to signup form
    fireEvent.click(screen.getByText("Sign Up"));

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith(
        "Test User",
        "test@example.com",
        "password123",
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        showAlert({
          message: mockResponse.data.message,
          type: ALERT_TYPE.SUCCESS,
        }),
      );
    });
  });

  test("resets form after successful signup", async () => {
    const mockReset = jest.fn();
    useForm.mockReturnValue({
      control: {},
      handleSubmit: (fn) => fn,
      formState: { errors: {} },
      reset: mockReset,
    });

    const mockResponse = {
      data: {
        message: "Signup successful",
      },
    };
    signup.mockResolvedValueOnce(mockResponse);

    render(<AuthForm />);

    // Switch to signup form and submit
    fireEvent.click(screen.getByText("Sign Up"));
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalled();
    });
  });
});
