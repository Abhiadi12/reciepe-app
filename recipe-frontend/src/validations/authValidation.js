export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Enter a valid email address",
  },
};

export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long",
  },
};

export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name must be at least 3 characters long",
  },
};
