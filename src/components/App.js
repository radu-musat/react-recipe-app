import React, { useState, useCallback, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import { v4 as uuidv4 } from "uuid"; // https://www.npmjs.com/package/uuid
import "bulma/css/bulma.css";
import "../css/app.css";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

export default function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (recipeJSON) {
      setRecipes(JSON.parse(recipeJSON));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const handleRecipeAdd = useCallback(() => {

    console.log('adding...')
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    };

    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }, [recipes]);

  const handleRecipeDelete = useCallback(
    (id) => {
      if(selectedRecipeId != null && selectedRecipeId === id) {
          setSelectedRecipeId(undefined);
      }

      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    },
    [recipes, selectedRecipeId]
  );

  const handleRecipeSelect = useCallback((id) => {
    setSelectedRecipeId(id);
  }, []);

  const handleRecipeChange = useCallback(
    (id, recipe) => {
      const newRecipes = [...recipes];
      const index = newRecipes.findIndex((r) => r.id === id);
      newRecipes[index] = recipe;
      setRecipes(newRecipes);
    },
    [recipes]
  );

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <div className="container mt-6">
        <div className="columns  is-align-items-flex-start">
          <RecipeList recipes={recipes} />
          {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
        </div>
      </div>
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 2,
    cookTime: "1:45",
    instructions:
      "1. Put salt on chicken\n2. Put chicken in oven \n3. Eat the chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 TBS",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions:
      "1. Put paprika on pork\n2. Put pork in oven\n3. Eat the pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 Pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 TBS",
      },
    ],
  },
];
 