import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteRating,
  getAllRatingsByRecipeId,
} from "../../services/rating.service";
import RatingForm from "./RatingForm";
import useAxiosLoader from "../../hooks/useAxiosLoader";
import { showAlert } from "../../store/alertSlice";
import { ALERT_TYPE } from "../../constants/alert.constant";
import ShimmerRating from "../shimmer/ShimmerRating";
import RatingCard from "./RatingCard";

function RatingBody({ recipeId, recipeOwnerId }) {
  const loading = useAxiosLoader();
  const userId = useSelector((state) => state.auth?.user?._id);
  const [ratings, setRatings] = React.useState([]);
  const [userRating, setUserRating] = React.useState(null);
  const [refetch, setRefetch] = React.useState(false);

  const dispatch = useDispatch();

  function getCurrentUserRating(ratings) {
    return ratings.find((rating) => rating?.user?._id === userId);
  }

  async function fetchAllRatings() {
    try {
      const response = await getAllRatingsByRecipeId(recipeId);
      const allRatings = response?.data?.data;
      setRatings(allRatings);
      const currentUserRating = getCurrentUserRating(allRatings);
      setUserRating(currentUserRating);
    } catch (error) {
      dispatch(showAlert(error?.response?.data?.message, ALERT_TYPE.ERROR));
    }
  }

  async function handleDeleteRating(id) {
    try {
      const response = await deleteRating(id);
      dispatch(showAlert(response?.data?.message, ALERT_TYPE.SUCCESS));
      fetchAllRatings();
    } catch (error) {
      dispatch(showAlert(error?.response?.data?.message, ALERT_TYPE.ERROR));
    }
  }

  useEffect(() => {
    if (recipeId) {
      fetchAllRatings();
    }
  }, [recipeId, refetch]);

  return (
    <div>
      {userId !== recipeOwnerId &&
        (loading ? (
          <ShimmerRating />
        ) : (
          <RatingForm
            userId={userId}
            recipeId={recipeId}
            existedRating={userRating}
            isEdit={Boolean(userRating)}
            setRefetch={setRefetch}
          />
        ))}

      {/* show all ratings */}
      {loading ? (
        <ShimmerRating />
      ) : (
        <div className="mt-3">
          <RatingCard
            ratings={ratings}
            userId={userId}
            onDelete={handleDeleteRating}
          />
        </div>
      )}
    </div>
  );
}

export default RatingBody;
