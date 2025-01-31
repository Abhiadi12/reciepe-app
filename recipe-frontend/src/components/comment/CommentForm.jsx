import React from "react";
import { useForm } from "react-hook-form";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { showAlert } from "../../store/alertSlice";
import { ALERT_TYPE } from "../../constants/alert.constant";
import { createComment } from "../../services/comment.service";

function CommentForm({ id, label, name, placeholder, fetchData, className }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      [name]: "", // Ensures reset works
    },
  });

  const dispatch = useDispatch();

  const handleComment = async (data) => {
    try {
      const response = await createComment(id, data);
      dispatch(
        showAlert({
          message: response.data?.message,
          type: ALERT_TYPE.SUCCESS,
        })
      );
      reset();
      fetchData && fetchData();
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message,
          type: ALERT_TYPE.ERROR,
        })
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleComment)} className={className}>
        <Textarea
          id={id}
          label={label}
          name={name}
          placeholder={placeholder}
          rows={3}
          control={control}
          className="w-full"
        />

        <Button type="submit" className="self-center">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CommentForm;
