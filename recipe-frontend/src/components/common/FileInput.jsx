import React, { useState } from "react";
import { Controller } from "react-hook-form";

const FileInput = ({ id, label = "", control, name, rules = {} }) => {
  const [preview, setPreview] = useState(null);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={id}
              className="block text-sm font-medium text-foreground mb-2"
            >
              {label}
            </label>
          )}
          <input
            id={id}
            type="file"
            accept="image/*"
            className={`w-full border rounded-md p-2 ${
              fieldState.error ? "border-red-500" : "border-input"
            }`}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
                onChange(file);
              }
            }}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border"
            />
          )}
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

export default FileInput;
