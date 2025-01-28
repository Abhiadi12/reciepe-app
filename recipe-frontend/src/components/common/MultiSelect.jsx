import React, { useState } from "react";
import { Controller } from "react-hook-form";

function MultiSelect({
  name,
  control,
  list,
  placeholder,
  label,
  rules,
  onChangeHandler,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`w-full max-w-sm ${className}`}>
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
        render={({ field, fieldState: { error } }) => {
          const selectedValues = Array.isArray(field.value) ? field.value : [];
          const selectedLabels = list
            .filter((item) => selectedValues.includes(item.value))
            .map((item) => item.label);

          return (
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`block w-full p-2 border rounded-md shadow-sm bg-background text-foreground cursor-pointer min-h-10 ${
                  error ? "border-destructive" : "border-input"
                }`}
              >
                {selectedLabels.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {selectedLabels.map((label) => (
                      <span
                        key={label}
                        className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground">
                    {placeholder || "Choose options"}
                  </span>
                )}
              </div>

              {isOpen && (
                <div className="absolute z-50 w-full mt-1 border border-input rounded-md shadow-lg bg-background">
                  {list.map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center px-3 py-2 cursor-pointer hover:bg-muted"
                      onClick={() => {
                        const newValues = selectedValues.includes(item.value)
                          ? selectedValues.filter((v) => v !== item.value)
                          : [...selectedValues, item.value];

                        field.onChange(newValues);
                        onChangeHandler?.(newValues);
                      }}
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedValues.includes(item.value)}
                        onChange={() => {}}
                      />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {error && (
                <p className="mt-1 text-sm text-destructive">
                  {error.message || "This field is required"}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

export default MultiSelect;
