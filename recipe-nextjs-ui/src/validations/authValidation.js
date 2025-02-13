import { message } from "@/constants/message.constant";
import { REGEX } from "@/constants/regex.constant";

export const emailValidation = {
  required: message.EMAIL_REQUIRED,
  pattern: {
    value: REGEX.EMAIL,
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
