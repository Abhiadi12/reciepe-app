import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useFetchIngredients from "../../hooks/useFetchIngredients";
import { useForm, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FileInput, Input, Textarea, Button, MultiSelect } from "../common/";
import {
  titleValidation,
  descriptionValidation,
  ingradientValidation,
  stepsValidation,
  prepTimeValidation,
} from "../../validations/postValidation";
import { addRecipe, updateRecipe } from "../../services/recipe.service";
import { showAlert } from "../../store/alertSlice";
import { ALERT_TYPE } from "../../constants/alert.constant";

const AddRecipe = ({
  defaultValues,
  handleHideModal,
  fetchData,
  id,
  disbaleButton,
  isEdit = false,
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  const { ingredients } = useFetchIngredients();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      ingredients: defaultValues?.ingredients?.map((ing) => ing) || "",
      steps: defaultValues?.steps?.map((step) => ({ value: step })) || [
        { value: "" },
      ],
      prepTime: defaultValues?.prepTime || "",
      file: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const dispatch = useDispatch();

  const handleAddStep = () => {
    const steps = getValues("steps");
    const lastStep = steps[steps.length - 1]?.value;

    if (!lastStep.trim()) {
      setError(`steps.${steps.length - 1}.value`, {
        type: "manual",
        message: "Please fill in this step before adding a new one.",
      });
    } else {
      clearErrors("steps");
      append({ value: "" });
    }
  };

  const handleImageChange = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setValue("file", file, { shouldValidate: true });
      setPreviewImage(imageUrl);
      clearErrors("file");
    } else {
      setError("file", {
        type: "manual",
        message: "Image is required",
      });
    }
  };

  const onSuccessfulSubmit = (res) => {
    const message = res.data?.message;
    fetchData();
    handleHideModal();
    dispatch(
      showAlert({
        message,
        type: ALERT_TYPE.SUCCESS,
      })
    );
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    // pass data.ingredients as an array
    data.ingredients?.forEach((ingredient) => {
      formData.append("ingredients[]", ingredient);
    });
    formData.append("prepTime", data.prepTime);
    data.steps?.forEach((step) => {
      formData.append("steps[]", step.value);
    });
    if (data.file) {
      formData.append("file", data.file);
    } else if (existingImageUrl) {
      formData.append("existingImage", existingImageUrl);
    }

    if (isEdit) {
      updateRecipe(id, formData)
        .then((res) => {
          onSuccessfulSubmit(res);
        })
        .catch((error) => {
          dispatch(
            showAlert({
              message: error.response.data?.message,
              type: ALERT_TYPE.ERROR,
            })
          );
        });
      return;
    }
    addRecipe(formData)
      .then((res) => {
        onSuccessfulSubmit(res);
      })
      .catch((error) => {
        dispatch(
          showAlert({
            message: error.response.data?.message,
            type: ALERT_TYPE.ERROR,
          })
        );
      });
  };

  useEffect(() => {
    if (defaultValues?.file?.url) {
      setExistingImageUrl(defaultValues.file.url);
      setPreviewImage(defaultValues.file.url);
    }
  }, [defaultValues]);

  return (
    <div>
      <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-semibold mb-4">Create/Edit Recipe</h2>

        {/* Title */}
        <div className="mb-4">
          <Input
            id="title"
            label="Title"
            name="title"
            placeholder="Enter recipe title"
            control={control}
            rules={titleValidation}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <Textarea
            id="description"
            label="Description"
            name="description"
            placeholder="Enter a brief description"
            rows={3}
            control={control}
            rules={descriptionValidation}
          />
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <MultiSelect
            name="ingredients"
            control={control}
            list={ingredients}
            placeholder="Select ingredients"
            label="Select ingredients"
            onChangeHandler={(val) => {}}
            className={"ml-2"}
            rules={ingradientValidation}
          />
        </div>

        {/* Steps - Dynamic Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Steps
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col space-y-1 mb-3">
              <div className="flex items-center space-x-2">
                <Input
                  id={`steps.${index}`}
                  name={`steps.${index}.value`}
                  placeholder={`Step ${index + 1}`}
                  control={control}
                  rules={stepsValidation}
                />
                {fields.length > 1 && (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="text-red-500 cursor-pointer"
                    onClick={() => remove(index)}
                  />
                )}
              </div>
            </div>
          ))}
          <Button type="button" className="mt-2" onClick={handleAddStep}>
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add Step
          </Button>
        </div>

        {/* Prep Time */}
        <div className="mb-4">
          <Input
            id="prepTime"
            label="Preparation Time (minutes)"
            name="prepTime"
            type="number"
            placeholder="e.g., 20"
            control={control}
            rules={prepTimeValidation}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <FileInput
            id="image"
            label="Upload Image"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            control={control}
            rules={{
              required: !existingImageUrl ? "Image is required" : false,
            }}
            onChange={(e) => handleImageChange(e.target.files)}
          />

          {/* Image Preview */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Recipe Preview"
              className="mt-2 w-full h-40 object-cover rounded-md"
            />
          )}

          {/* ex */}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={disbaleButton}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddRecipe;
