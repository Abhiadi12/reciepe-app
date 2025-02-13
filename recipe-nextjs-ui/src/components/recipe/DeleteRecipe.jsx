import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";

function DeleteRecipe({
  title,
  description,
  id,
  handleDelete,
  btnText = "Delete",
}) {
  return (
    <div>
      <div className="flex flex-col gap-4 justify-center items-center p-2">
        <FontAwesomeIcon icon={faTriangleExclamation} size="3x" color="red" />
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
        <div className="flex gap-4">
          <button
            onClick={() => handleDelete(id)}
            className="h-10 px-4 py-2 bg-red-600 text-primary-foreground hover:bg-red-600/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteRecipe;
