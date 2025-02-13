import React from "react";
import { Controller } from "react-hook-form";

const Textarea = ({
  id,
  label = "",
  placeholder = "",
  className = "",
  control = {},
  name = "",
  rules = {},
  defaultValue = "",
  rows = 3,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={`flex flex-col ${className}`}>
          {label && (
            <label
              htmlFor={id}
              className="block text-sm font-medium text-foreground mb-2"
            >
              {label}
            </label>
          )}
          <textarea
            id={id}
            placeholder={placeholder}
            rows={rows}
            className={`flex w-full rounded-md border focus:border-none ${
              fieldState.error
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-input focus-visible:ring-ring"
            } bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
            {...field}
            {...props}
          />
          {fieldState.error && (
            <span className="text-sm text-red-500">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default Textarea;
