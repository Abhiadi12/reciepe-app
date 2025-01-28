import React from "react";

function useFilter() {
  const [ingridentsIds, setIngridentsIds] = React.useState([]);
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
    ingridentsIds,
    preparationTime,
    handleChangeIngrident,
    handleChangePreparationTime,
  };
}

export default useFilter;
