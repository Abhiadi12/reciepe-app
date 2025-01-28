import React from "react";
import { fetchAllIngredients } from "../services/recipe.service";

function useFetchIngredients() {
  const [ingredients, setIngredients] = React.useState([]);

  const fetchIngredients = async () => {
    try {
      const response = await fetchAllIngredients();
      console.log("response", response);
      const modifiedData = response?.data?.data?.map((item) => ({
        ...item,
        value: item?._id,
        label: item?.name,
      }));
      setIngredients(modifiedData);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchIngredients();
  }, []);

  return { ingredients };
}

export default useFetchIngredients;
