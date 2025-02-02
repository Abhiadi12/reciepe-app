import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Modal } from "../common";
import { isAuthorize } from "../../utils/isAuthorize";
import DeleteRecipe from "../recipe/DeleteRecipe";
import { showAlert } from "../../store/alertSlice";
import { ALERT_TYPE } from "../../constants/alert.constant";
import CommentEdit from "./CommentEdit";
import {
  deleteComment,
  updateCommentById,
} from "../../services/comment.service";

function CommentCard({
  comment,
  recipeId,
  filterDeletedComment,
  updateComment,
}) {
  const currentUsrId = useSelector((state) => state.auth?.user?._id);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const dispatch = useDispatch();

  const handleDelete = async (commentId) => {
    try {
      const response = await deleteComment(recipeId, commentId);
      const message = response.data?.message;

      filterDeletedComment(commentId);
      dispatch(showAlert({ message, type: ALERT_TYPE.SUCCESS }));
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message,
          type: ALERT_TYPE.ERROR,
        })
      );
    } finally {
      setIsDelete(false);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await updateCommentById(recipeId, comment?._id, {
        comment: editedComment,
      });
      const message = response.data?.message;
      updateComment(comment?._id, editedComment);
      dispatch(showAlert({ message, type: ALERT_TYPE.SUCCESS }));
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response?.data?.message,
          type: ALERT_TYPE.ERROR,
        })
      );
    }
    setIsEdit(false);
  };

  return (
    <div className="border-b border-gray-200 py-3">
      <div className="flex flex-col gap-2 px-4">
        <div className="flex justify-between items-center">
          {/* Avatar & Username */}
          <div className="flex gap-2 items-center">
            <div className=" h-10 w-10 shrink-0 overflow-hidden rounded-full flex items-center justify-center bg-primary text-primary-foreground cursor-pointer">
              {comment?.user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <h3 className="text-primary text-lg font-semibold">
              {comment?.user?.username || "Unknown User"}
            </h3>
          </div>

          {/* Edit & Delete Buttons */}
          {isAuthorize(currentUsrId, comment?.user?._id) && (
            <div className="flex gap-4">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => setIsEdit(true)}
                aria-label="Edit"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => setIsDelete(true)}
                aria-label="Delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>

        <p className="px-8 text-gray-800">{comment.comment}</p>

        <p className="px-8 text-gray-500 text-sm">
          {new Date(comment?.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        modalOpen={isDelete}
        setModalOpen={setIsDelete}
        cstmStyle="w-full max-w-lg"
      >
        <DeleteRecipe
          title="Are you sure?"
          description="Do you want to delete this comment?"
          id={comment?._id}
          handleDelete={handleDelete}
        />
      </Modal>

      {/* Edit Comment Modal */}
      <Modal
        modalOpen={isEdit}
        setModalOpen={setIsEdit}
        cstmStyle="w-full max-w-lg"
      >
        <CommentEdit
          editedComment={editedComment}
          setEditedComment={setEditedComment}
          setIsEdit={setIsEdit}
          handleEdit={handleEdit}
        />
      </Modal>
    </div>
  );
}

export default CommentCard;
