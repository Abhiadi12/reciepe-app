import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipeById } from "../services/recipe.service";
import { showAlert } from "../store/alertSlice";
import { ALERT_TYPE } from "../constants/alert.constant";

function useGetProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProductDetail() {
      if (!productId) return;

      try {
        const response = await fetchRecipeById(productId);
        setProduct(response.data?.data);
      } catch (error) {
        dispatch(
          showAlert({
            message: error.response.data?.message,
            type: ALERT_TYPE.ERROR,
          })
        );
      }
    }

    getProductDetail();
  }, [productId, dispatch]);

  return { product };
}

export default useGetProductDetail;
