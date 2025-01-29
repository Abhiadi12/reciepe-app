import React from "react";

function useFilter() {
  const [ingredientIds, setIngridentsIds] = React.useState([]);
  const [preparationTime, setPreparationTime] = React.useState({
    minPrepTime: null,
    maxPrepTime: null,
  });

  const handleChangeIngrident = (idsArray) => {
    if (idsArray && Array.isArray(idsArray)) setIngridentsIds(idsArray);
  };

  const handleChangePreparationTime = (min, max) => {
    if (typeof min === "number" && typeof max === "number")
      setPreparationTime({ minPrepTime: min, maxPrepTime: max });
  };

  return {
    ingredientIds,
    preparationTime,
    handleChangeIngrident,
    handleChangePreparationTime,
  };
}

export default useFilter;
