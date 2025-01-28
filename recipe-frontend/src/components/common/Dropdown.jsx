import React from "react";
import { Controller } from "react-hook-form";

function Dropdown({
  name,
  control,
  list,
  placeholder,
  label,
  rules,
  onChangeHandler,
}) {
  return (
    <div className="w-full max-w-sm">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-muted-foreground mb-2"
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <select
              {...field}
              id={name}
              onChange={(e) => {
                field.onChange(e); // Update the form state
                onChangeHandler(e.target.value); // Call the external handler
              }}
              className={`block w-full p-2 border ${
                error ? "border-destructive" : "border-input"
              } rounded-md shadow-sm focus:ring-ring focus:border-ring bg-background text-foreground`}
              defaultValue=""
            >
              <option value="" disabled>
                {placeholder || "Choose an option"}
              </option>
              {list.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {error && (
              <p className="mt-1 text-sm text-destructive">
                {error.message || "This field is required"}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}

export default Dropdown;
