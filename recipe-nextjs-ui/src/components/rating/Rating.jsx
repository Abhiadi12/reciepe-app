import React from "react";
import { Controller } from "react-hook-form";
import CustomStar from "./CustomStar";

function Rating({
  control,
  name,
  maxRating = 5,
  size = 24,
  readonly = false,
  className = "",
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = 0, onChange }, fieldState: { error } }) => (
        <div className="flex flex-col">
          <div className={`flex items-center gap-1 ${className}`}>
            {[...Array(maxRating)].map((_, index) => {
              const ratingValue = index + 1;
              const filled = ratingValue <= value;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !readonly && onChange(ratingValue)}
                  className={`
                      ${readonly ? "cursor-default" : "cursor-pointer"}
                      transition-colors duration-200
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
          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export default Rating;
