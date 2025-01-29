import React from "react";
import { useDispatch } from "react-redux";
import { fetchAllIngredients } from "../services/recipe.service";
import { showAlert } from "../store/alertSlice";
import { ALERT_TYPE } from "../constants/alert.constant";

function useFetchIngredients() {
  const [ingredients, setIngredients] = React.useState([]);
  const dispatch = useDispatch();

  const fetchIngredients = async () => {
    try {
      const response = await fetchAllIngredients();
      const modifiedData = response?.data?.data?.map((item) => ({
        ...item,
        value: item?._id,
        label: item?.name,
      }));
      setIngredients(modifiedData);
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response.data?.message,
          type: ALERT_TYPE.ERROR,
        })
      );
    }
  };

  React.useEffect(() => {
    fetchIngredients();
  }, []);

  return { ingredients };
}

export default useFetchIngredients;
