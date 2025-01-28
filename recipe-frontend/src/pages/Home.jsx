import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterHeader from "../components/filter/FilterHeader";
import RecipeCard from "../components/recipe/RecipeCard";
import {
  fetchAllRecipes,
  fetchFilteredRecipes,
} from "../services/recipe.service";
import { filterRecipeRequest } from "../store/filterRecipeSlice";
import usePagination from "../hooks/usePagination";

function Home() {
  const { loading, data, error } = useSelector((state) => state.filterRecipe);
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    setTotalPages,
    handlePageChange,
    handlePageSizeChange,
    handleTotalPagesChange,
    isDisabled,
  } = usePagination(1, 10);

  const dispatch = useDispatch();

  const fetchRecipes = async (
    minTime,
    maxTime,
    ingridentsIds,
    fetchAll = false
  ) => {
    dispatch(filterRecipeRequest());
    try {
      if (fetchAll) {
        // Fetch all recipes
        const response = await fetchAllRecipes();
        dispatch(filterRecipeSuccess(response?.data?.data));
        return;
      }
    } catch (error) {
      dispatch(filterRecipeFail(error?.message));
    }
  };

  React.useEffect(() => {
    fetchRecipes(0, 0, [], true);
  }, []);

  console.log("data - loaidnf", loading, data);
  return (
    <div className="mt-12 p-4">
      <FilterHeader fetchRecipes={fetchRecipes} />
      <div className="flex flex-col gap-2 items-center">
        {/* <RecipeCard />
        <RecipeCard /> */}
      </div>
    </div>
  );
}

export default Home;
