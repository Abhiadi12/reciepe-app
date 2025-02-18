import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "@/store/authSlice";
import Header from "../Header";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header Component", () => {
  const renderWithStore = (preloadedState) => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState,
    });

    return render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
  };

  test("renders logo and links correctly", () => {
    renderWithStore({ auth: { user: null } });

    expect(screen.getByText("RecipeHub")).toBeInTheDocument();
  });

  test("shows logout button and avatar when user is logged in", () => {
    renderWithStore({ auth: { user: { username: "JohnDoe" } } });

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  test("calls logout action when clicking logout button", () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: { user: { username: "JohnDoe" } } },
    });

    jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });
});
