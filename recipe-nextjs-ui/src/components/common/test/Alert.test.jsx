import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Alert from "../Alert";
import alertReducer, { hideAlert } from "../../../store/alertSlice";

// Mock Redux store
const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      alert: alertReducer,
    },
    preloadedState: {
      alert: initialState,
    },
  });
};

// Mock timer
jest.useFakeTimers();

describe("Alert Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test("renders nothing when there is no message", () => {
    const store = createMockStore({ message: "", type: "" });

    render(
      <Provider store={store}>
        <Alert />
      </Provider>,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("renders success alert with correct styles", () => {
    const store = createMockStore({
      message: "Success message",
      type: "success",
    });

    render(
      <Provider store={store}>
        <Alert />
      </Provider>,
    );

    const alert = screen.getByText("Success message");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("bg-green-500");
  });

  test("renders error alert with correct styles", () => {
    const store = createMockStore({
      message: "Error message",
      type: "error",
    });

    render(
      <Provider store={store}>
        <Alert />
      </Provider>,
    );

    const alert = screen.getByText("Error message");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("bg-red-500");
    expect(alert).toHaveClass("text-white");
  });

  test("renders info alert with correct styles", () => {
    const store = createMockStore({
      message: "Info message",
      type: "info",
    });

    render(
      <Provider store={store}>
        <Alert />
      </Provider>,
    );

    const alert = screen.getByText("Info message");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("bg-blue-500");
  });

  test("automatically hides after 3 seconds", () => {
    const store = createMockStore({
      message: "Test message",
      type: "success",
    });

    const spy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <Alert />
      </Provider>,
    );

    expect(screen.getByText("Test message")).toBeInTheDocument();

    // Fast-forward time by 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(spy).toHaveBeenCalledWith(hideAlert());
  });

  test("clears timeout on unmount", () => {
    const store = createMockStore({
      message: "Test message",
      type: "success",
    });

    const { unmount } = render(
      <Provider store={store}>
        <Alert />
      </Provider>,
    );

    const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
