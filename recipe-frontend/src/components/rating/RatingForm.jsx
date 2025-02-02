import React, { useEffect } from "react";
import { Textarea, Card, Button } from "../common";
import Rating from "./Rating";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRating, updateRating } from "../../services/rating.service";
import { showAlert } from "../../store/alertSlice";
import { ALERT_TYPE } from "../../constants/alert.constant";

function RatingForm({ userId, recipeId, existedRating, isEdit, setRefetch }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      feedback: "",
      rating: 0,
    },
  });
  const dispatch = useDispatch();
  const handleFeedbackSubmit = async (data) => {
    const payload = {
      feedback: data.feedback,
      score: data.rating,
      user: userId,
      recipe: recipeId,
    };

    try {
      let response = null;
      if (isEdit) {
        response = await updateRating(payload);
      } else response = await addRating(payload);
      dispatch(
        showAlert({
          message: response.data?.message,
          type: ALERT_TYPE.SUCCESS,
        })
      );
      setRefetch((prev) => !prev);
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message,
          type: ALERT_TYPE.ERROR,
        })
      );
    }
  };

  // Reset form when existedRating changes
  useEffect(() => {
    if (existedRating) {
      reset({
        feedback: existedRating.feedback || "",
        rating: existedRating.score || 0,
      });
    }
  }, [existedRating, reset]);

  return (
    <Card className="w-full">
      <h2 className="text-lg font-semibold pl-4 pt-2">
        {isEdit ? "Edit your review" : "Rate this Recipe"}
      </h2>
      <form
        onSubmit={handleSubmit(handleFeedbackSubmit)}
        className="flex flex-col p-4 space-y-4"
      >
        <Rating control={control} name="rating" />

        <Textarea
          id="feedback"
          label="Feedback"
          name="feedback"
          placeholder="Enter your feedback"
          rows={3}
          control={control}
        />

        <Button type="submit">{isEdit ? "Edit Your Review" : "Submit"}</Button>
      </form>
    </Card>
  );
}

export default RatingForm;
