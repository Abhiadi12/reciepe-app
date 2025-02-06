import { createSlice } from "@reduxjs/toolkit";

const filterRecipeSlice = createSlice({
  name: "filterRecipe",
  initialState: {
    loading: false,
    data: [],
    error: "",
    pageNo: 1,
    pageSize: 10,
  },
  reducers: {
    filterRecipeRequest: (state) => {
      state.loading = true;
    },
    filterRecipeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    },
    filterRecipeFail: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
    increasePageNo: (state) => {
      state.pageNo += 1;
    },
    resetPageNo: (state) => {
      state.pageNo = 1;
    },
    decreasePageNo: (state) => {
      state.pageNo -= 1;
    },
  },
});

export const {
  filterRecipeRequest,
  filterRecipeSuccess,
  filterRecipeFail,
  increasePageNo,
  decreasePageNo,
  resetPageNo,
} = filterRecipeSlice.actions;

export default filterRecipeSlice.reducer;
