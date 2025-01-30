export const titleValidation = {
  required: "Title is required",
  minLength: {
    value: 3,
    message: "Title must be at least 3 characters long",
  },
};

export const descriptionValidation = {
  required: "Description is required",
  minLength: {
    value: 3,
    message: "Description must be at least 3 characters long",
  },
  maxLength: {
    value: 500,
    message: "Description cannot exceed 500 characters",
  },
};

export const ingradientValidation = { required: "Ingredients are required" };

export const stepsValidation = { required: "This step cannot be empty." };

export const prepTimeValidation = {
  required: "Preparation time is required",
  validate: (value) => !isNaN(value) || "Preparation time must be a number",
};

export const imageValidation = { required: "Image is required" };
