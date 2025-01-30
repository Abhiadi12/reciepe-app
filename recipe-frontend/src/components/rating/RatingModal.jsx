import React, { useState } from "react";
import { Modal } from "../common";

function RatingModal(
  open,
  setOpen,
  initialRating = 0,
  maxRating = 5,
  size = 24,
  readonly = false,
  onChange = () => {},
  className = ""
) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    if (!readonly) {
      setRating(value);
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div>
      <Modal
        modalOpen={open}
        setModalOpen={setOpen}
        cstmStyle="w-full max-w-2xl"
      >
        <div
          className={`flex items-center gap-1 ${className}`}
          onMouseLeave={handleMouseLeave}
        >
          {[...Array(maxRating)].map((_, index) => {
            const value = index + 1;
            const filled = value <= (hoverRating || rating);

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleClick(value)}
                onMouseEnter={() => handleMouseEnter(value)}
                className={`
              ${readonly ? "cursor-default" : "cursor-pointer"}
              transition-colors duration-200
              disabled:opacity-50
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-blue-500
              rounded-sm
              ${filled ? "text-yellow-400" : "text-gray-300"}
              hover:text-yellow-400
            `}
                disabled={readonly}
              >
                <CustomStar filled={filled} size={size} />
              </button>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}

export default RatingModal;
