import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipeById } from "../services/recipe.service";
import { showAlert } from "../store/alertSlice";

function useGetProductDetail(productId) {
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProductDetail() {
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
  }, [productId]);

  return { product };
}

export default useGetProductDetail;
