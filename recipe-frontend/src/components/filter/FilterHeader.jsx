import React from "react";
import { useForm } from "react-hook-form";
import useFilter from "../../hooks/useFilter";
import Dropdown from "../common/Dropdown";
import MultiSelect from "../common/MultiSelect";
import Button from "../common/Button";
import useFetchIngredients from "../../hooks/useFetchIngredients";
import { FILTER_BY_TIME } from "../../constants/mock.constant";

/***
 * FilterHeader component
 * @param {function} fetchFilteredRecipes -> function to fetch filtered recipes
 */

function FilterHeader({ fetchFilteredRecipes }) {
  const {
    ingridentsIds,
    preparationTime,
    handleChangeIngrident,
    handleChangePreparationTime,
  } = useFilter();

  const { ingredients } = useFetchIngredients();

  const { control } = useForm({
    defaultValues: {
      preparationTime: "",
      ingredients: [],
    },
  });

  const onChangeHandler = (value) => {
    const [start, end] = value?.split("-");
    console.log("start", start, "end", end);
    handleChangePreparationTime(Number(start), Number(end));
  };

  const handleClickOnSearch = () => {
    console.log("ingridentsIds", ingridentsIds, preparationTime);
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
      <div className="mt-7 ml-2">
        <Button onClick={handleClickOnSearch}>Search</Button>
      </div>
    </div>
  );
}

export default FilterHeader;
