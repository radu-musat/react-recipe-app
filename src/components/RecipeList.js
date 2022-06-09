import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from "./App";

export default function RecipeList({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);

  const renderedRecipes = recipes.map((recipe) => {
    return <Recipe key={recipe.id} {...recipe} />;
  });

  return (
    <div className="column recipe-list">
      <div className="block">{renderedRecipes}</div>

      <div className="buttons">
        <button className="button is-success" onClick={handleRecipeAdd}>
          Add Recipe
        </button>
      </div>
    </div>
  );
}
