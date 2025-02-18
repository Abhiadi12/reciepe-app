export const mockRecipe = {
  image: { url: "https://example.com/image.jpg" },
  title: "Delicious Pasta",
  description: "A tasty pasta recipe",
  ingredients: [
    { _id: "1", name: "Tomato" },
    { _id: "2", name: "Basil" },
  ],
  steps: ["Boil water", "Add pasta", "Cook for 10 mins"],
  prepTime: 20,
  createdBy: { username: "ChefJohn" },
};

export const mockRecipesTwo = [
  {
    _id: "1",
    title: "Recipe 1",
    description: "Description 1",
    prepTime: 30,
    image: { url: "image1.jpg" },
    ratings: 4.5,
    ingredients: ["ingredient1", "ingredient2"],
  },
  {
    _id: "2",
    title: "Recipe 2",
    description: "Description 2",
    prepTime: 45,
    image: { url: "image2.jpg" },
    ratings: 4.0,
    ingredients: ["ingredient2", "ingredient3"],
  },
];
