import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterHeader from "../components/filter/FilterHeader";
import RecipeCard from "../components/recipe/RecipeCard";
import {
  fetchAllRecipes,
  fetchFilteredRecipes,
} from "../services/recipe.service";
import {
  filterRecipeFail,
  filterRecipeRequest,
  filterRecipeSuccess,
} from "../store/filterRecipeSlice";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/common/Pagination";
import ShimmerCard from "../components/recipe/ShimmerCard";

function Home() {
  const { loading, data } = useSelector((state) => state.filterRecipe);
  const {
    page,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    handleTotalPagesChange,
    isDisabled,
  } = usePagination(1, 10, 1);
  const [skipEffect, setSkipEffect] = React.useState(false);

  const dispatch = useDispatch();

  const fetchRecipes = async (
    minPrepTime,
    maxPrepTime,
    ingredientIds,
    fetchAll = false
  ) => {
    if (!fetchAll) {
      setSkipEffect(true);
    }

    dispatch(filterRecipeRequest());
    try {
      if (fetchAll) {
        const response = await fetchAllRecipes({
          page: page,
          limit: pageSize,
        });
        const { recipes, totalRecipes } = response.data?.data;

        dispatch(filterRecipeSuccess(recipes));
        handleTotalPagesChange(totalRecipes);
        return;
      }
      const response = await fetchFilteredRecipes(
        1,
        pageSize,
        minPrepTime,
        maxPrepTime,
        ingredientIds
      );
      handlePageChange(1);
      const { recipes, totalRecipes } = response.data?.data;

      dispatch(filterRecipeSuccess(recipes));
      handleTotalPagesChange(totalRecipes);
    } catch (error) {
      dispatch(filterRecipeFail(error?.message));
    }
  };

  React.useEffect(() => {
    if (skipEffect) {
      setSkipEffect(false);
      return;
    }

    fetchRecipes(0, 0, [], true);
  }, [page, pageSize]);

  return (
    <div className="mt-12 p-4">
      <FilterHeader fetchFilteredRecipes={fetchRecipes} />
      <div className="mb-2">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalPages / pageSize)}
          onPageChange={handlePageChange}
          isDisabled={isDisabled(page)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {loading
          ? [...Array(3)].map((_, index) => <ShimmerCard key={index} />)
          : data.map((recipe) => (
              <RecipeCard
                key={recipe?._id}
                imageUrl={recipe?.image?.url}
                title={recipe?.title}
                description={recipe?.description}
                prepTime={recipe?.prepTime}
                ratings={recipe?.ratings}
                ingedients={recipe?.ingredients}
                id={recipe?._id}
              />
            ))}
      </div>
    </div>
  );
}

export default Home;
