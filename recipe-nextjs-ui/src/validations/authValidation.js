import { message } from "@/constants/message.constant";

export const emailValidation = {
  required: message.EMAIL_REQUIRED,
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: message.EMAIL_VALID,
  },
};

export const passwordValidation = {
  required: message.PASSWORD_REQUIRED,
  minLength: {
    value: 8,
    message: message.PASSWORD_LENGTH,
  },
};

export const nameValidation = {
  required: message.NAME_REQUIRED,
  minLength: {
    value: 3,
    message: message.NAME_LENGTH,
  },
};
