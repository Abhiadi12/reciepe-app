import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "../common";
import FileInput from "../common/FileInput";
import Textarea from "../common/Textarea";
import MultiSelect from "../common/MultiSelect";
import useFetchIngredients from "../../hooks/useFetchIngredients";

const AddRecipeForm = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      steps: [""],
      image: null,
      ingredients: [],
    },
  });

  const { ingredients } = useFetchIngredients();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = (data) => {
    console.log("Submitted Recipe:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg"
    >
      <Input
        id="title"
        label="Recipe Title"
        placeholder="Enter recipe title"
        name="title"
        control={control}
        rules={{ required: "Title is required" }}
      />

      <Textarea
        id="description"
        label="Description"
        placeholder="Enter recipe description"
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
      />

      <MultiSelect
        name="ingredients"
        control={control}
        list={ingredients}
        placeholder="Select ingredients"
        label="serach by ingredients"
        onChangeHandler={(val) => {
          handleChangeIngrident(val);
        }}
        className={"ml-2"}
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Steps
        </label>
        {fields.map((step, index) => (
          <div key={step.id} className="flex gap-2 items-center mb-2">
            <Input
              id={`step-${index}`}
              placeholder={`Step ${index + 1}`}
              name={`steps.${index}`}
              control={control}
              rules={{ required: "Step cannot be empty" }}
            />
            <button
              type="button"
              className="text-red-500"
              onClick={() => remove(index)}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-blue-500 mt-2"
          onClick={() => append("")}
        >
          + Add Step
        </button>
      </div>

      <FileInput
        id="image"
        label="Recipe Image"
        name="image"
        control={control}
        rules={{ required: "Image is required" }}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md"
      >
        Submit Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
