// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { showAlert } from "@/store/alertSlice";
// import { ALERT_TYPE } from "@/constants/alert.constant";
// import useFilter from "@/hooks/useFilter";
// import useFetchIngredients from "@/hooks/useFetchIngredients";
// import FilterHeader from "../FilterHeader";

// jest.mock("@/hooks/useFilter");
// jest.mock("@/hooks/useFetchIngredients");
// jest.mock("@/store/alertSlice", () => ({
//   showAlert: jest.fn(),
// }));

// const mockDispatch = jest.fn();
// const mockStore = configureStore({
//   reducer: () => ({}),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });

// describe("FilterHeader Component", () => {
//   let fetchFilteredRecipes;

//   beforeEach(() => {
//     fetchFilteredRecipes = jest.fn();

//     useFilter.mockReturnValue({
//       ingredientIds: [],
//       preparationTime: { minPrepTime: null, maxPrepTime: null },
//       handleChangeIngrident: jest.fn(),
//       handleChangePreparationTime: jest.fn(),
//     });

//     useFetchIngredients.mockReturnValue({
//       ingredients: [
//         { id: 1, name: "Tomato" },
//         { id: 2, name: "Onion" },
//       ],
//     });

//     jest.spyOn(mockStore, "dispatch").mockImplementation(mockDispatch);
//   });

//   const renderComponent = () =>
//     render(
//       <Provider store={mockStore}>
//         <FilterHeader fetchFilteredRecipes={fetchFilteredRecipes} />
//       </Provider>,
//     );

//   test("renders dropdowns and buttons", () => {
//     renderComponent();
//     expect(
//       screen.getByLabelText(/filter by preparation time/i),
//     ).toBeInTheDocument();
//     expect(screen.getByLabelText(/serach by ingredients/i)).toBeInTheDocument();
//     expect(screen.getByText(/Search/i)).toBeInTheDocument();
//     expect(screen.getByText(/Clear/i)).toBeInTheDocument();
//   });

//   // test("shows alert if no filter is selected and search is clicked", () => {
//   //   renderComponent();
//   //   fireEvent.click(screen.getByText(/Search/i));
//   //   expect(mockDispatch).toHaveBeenCalledWith(
//   //     showAlert({
//   //       message: "Please select atleast one filter",
//   //       type: ALERT_TYPE.ERROR,
//   //     }),
//   //   );
//   //   expect(fetchFilteredRecipes).not.toHaveBeenCalled();
//   // });

//   // test("calls fetchFilteredRecipes with correct params on search", () => {
//   //   useFilter.mockReturnValue({
//   //     ingredientIds: [1],
//   //     preparationTime: { minPrepTime: 10, maxPrepTime: 20 },
//   //     handleChangeIngrident: jest.fn(),
//   //     handleChangePreparationTime: jest.fn(),
//   //   });
//   //   renderComponent();
//   //   fireEvent.click(screen.getByText(/Search/i));
//   //   expect(fetchFilteredRecipes).toHaveBeenCalledWith(10, 20, [1]);
//   // });

//   // test("clears filters and resets form on clear button click", () => {
//   //   const mockReset = jest.fn();
//   //   useFilter.mockReturnValue({
//   //     ingredientIds: [1],
//   //     preparationTime: { minPrepTime: 10, maxPrepTime: 20 },
//   //     handleChangeIngrident: jest.fn(),
//   //     handleChangePreparationTime: jest.fn(),
//   //   });
//   //   jest.spyOn(require("react-hook-form"), "useForm").mockReturnValue({
//   //     control: {},
//   //     reset: mockReset,
//   //   });
//   //   renderComponent();
//   //   fireEvent.click(screen.getByText(/Clear/i));
//   //   expect(mockReset).toHaveBeenCalled();
//   //   expect(fetchFilteredRecipes).toHaveBeenCalledWith(0, 0, [], true);
//   // });
// });
