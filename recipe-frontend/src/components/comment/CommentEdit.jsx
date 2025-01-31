import React from "react";

function CommentEdit({
  editedComment,
  setEditedComment,
  setIsEdit,
  handleEdit,
}) {
  const [error, setError] = React.useState("");

  const validate = () => {
    if (!editedComment) {
      setError("Comment is required");
      return false;
    }
    return true;
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Edit Comment</h3>
      <textarea
        className={`w-full border p-2 mt-2 ${error && "border-red-500"}`}
        rows="3"
        value={editedComment}
        onChange={(e) => {
          setError("");
          setEditedComment(e.target.value);
        }}
      />
      <p className="text-red-500 text-sm mt-1">{error}</p>
      <div className="flex justify-end mt-3 gap-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setIsEdit(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            if (validate()) {
              handleEdit();
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CommentEdit;
