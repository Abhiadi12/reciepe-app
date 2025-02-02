import React from "react";
import { Button } from "../common";

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
          className="h-10 px-4 py-2 bg-muted-foreground text-primary-foreground
           hover:bg-muted-foreground/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setIsEdit(false)}
        >
          Cancel
        </button>
        <Button
          onClick={() => {
            if (validate()) {
              handleEdit();
            }
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default CommentEdit;
