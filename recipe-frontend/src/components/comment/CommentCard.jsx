import React, { useState } from "react";
import { Avatar, Modal } from "../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { isAuthorize } from "../../utils/isAuthorize";
import DeleteRecipe from "../recipe/DeleteRecipe";

function CommentCard({ comment, recipeId, onDelete, onEdit }) {
  const currentUsrId = useSelector((state) => state.auth?.user?._id);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);

  const handleDelete = () => {
    // onDelete(comment._id);
    setIsDelete(false);
  };

  const handleEdit = () => {
    // onEdit(comment._id, editedComment);
    setIsEdit(false);
  };

  return (
    <div className="border-b border-gray-200 py-3">
      <div className="flex flex-col gap-2 px-4">
        <div className="flex justify-between items-center">
          {/* Avatar & Username */}
          <div className="flex gap-2 items-center">
            <Avatar>
              {comment?.user?.username?.[0]?.toUpperCase() || "U"}
            </Avatar>
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
        <div className="p-4">
          <h3 className="text-lg font-semibold">Edit Comment</h3>
          <textarea
            className="w-full border p-2 mt-2"
            rows="3"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <div className="flex justify-end mt-3 gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleEdit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CommentCard;
