import { message } from "@/constants/message.constant";

export const titleValidation = {
  required: message.TITLE_REQUIRED,
  minLength: {
    value: 3,
    message: message.TITLE_LENGTH,
  },
};

export const descriptionValidation = {
  required: message.DESCRIPTION_REQUIRED,
  minLength: {
    value: 3,
    message: message.DESCRIPTION_LENGTH,
  },
  maxLength: {
    value: 500,
    message: message.DESCRIPTION_MAX_LENGTH,
  },
};

export const ingradientValidation = { required: message.INGREDIENTS_REQUIRED };

export const stepsValidation = { required: message.STEP_CANNOT_BE_EMPTY };

export const prepTimeValidation = {
  required: message.PREP_TIME_REQUIRED,
  validate: (value) => !isNaN(value) || message.PREP_TIME_VALID,
};

export const imageValidation = { required: message.IMAGE_REQUIRED };
