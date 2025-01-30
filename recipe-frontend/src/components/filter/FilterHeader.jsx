import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useFilter from "../../hooks/useFilter";
import useFetchIngredients from "../../hooks/useFetchIngredients";
import { FILTER_BY_TIME } from "../../constants/mock.constant";
import { showAlert } from "../../store/alertSlice";
import { ALERT_TYPE } from "../../constants/alert.constant";
import { Dropdown, MultiSelect, Button } from "../common/";

/***
 * FilterHeader component
 * @param {function} fetchFilteredRecipes -> function to fetch filtered recipes
 */

function FilterHeader({ fetchFilteredRecipes }) {
  const {
    ingredientIds,
    preparationTime,
    handleChangeIngrident,
    handleChangePreparationTime,
  } = useFilter();

  const { ingredients } = useFetchIngredients();

  const { control, reset } = useForm({
    defaultValues: {
      preparationTime: "",
      ingredients: [],
    },
  });

  const dispatch = useDispatch();

  const onChangeHandler = (value) => {
    const [start, end] = value?.split("-");
    handleChangePreparationTime(Number(start), Number(end));
  };

  const handleClickOnSearch = () => {
    if (
      preparationTime?.minPrepTime === null &&
      preparationTime?.maxPrepTime === null &&
      ingredientIds.length === 0
    ) {
      dispatch(
        showAlert({
          message: "Please select atleast one filter",
          type: ALERT_TYPE.ERROR,
        })
      );
      return;
    }
    fetchFilteredRecipes(
      preparationTime?.minPrepTime,
      preparationTime?.maxPrepTime,
      ingredientIds
    );
  };

  const handleClear = () => {
    handleChangePreparationTime(null, null);
    handleChangeIngrident([]);
    // reset form
    reset();
    // fetch all recipes
    fetchFilteredRecipes(0, 0, [], true);
  };

  return (
    <div className="flex justify-center p-2 md:p-4">
      <Dropdown
        name="preparationTime"
        label="filter by preparation time"
        list={FILTER_BY_TIME}
        onChangeHandler={onChangeHandler}
        control={control}
      />

      <MultiSelect
        name="ingredients"
        control={control}
        list={ingredients}
        placeholder="Select ingredients"
        label="serach by ingredients"
        onChangeHandler={(val) => {
          handleChangeIngrident(val);
        }}
        className={"ml-2"}
      />
      <div className="mt-7 ml-2 flex gap-2">
        <Button onClick={handleClickOnSearch}>Search</Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>
    </div>
  );
}

export default FilterHeader;
