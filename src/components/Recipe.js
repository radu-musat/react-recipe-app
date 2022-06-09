import React, { useContext } from "react";
import IngredientsList from "./IngredientsList";
import { RecipeContext } from "./App";

export default function Recipe(props) {
  const { id, name, cookTime, servings, instructions, ingredients } = props;
  const { handleRecipeDelete } = useContext(RecipeContext);
  const { handleRecipeSelect } = useContext(RecipeContext);

  return (
    <div className="mb-3 p-3 card recipe">
      <div className="columns">
        <div className="column">
          <div className="mb-3 recipe-header">
            <h3 className="title">{name}</h3>

            <div className="buttons">
              <button
                className="button is-warning"
                onClick={() => {
                  handleRecipeSelect(id);
                }}
              >
                Edit
              </button>
              <button
                className="button is-danger"
                onClick={() => {
                  handleRecipeDelete(id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="mb-3">
            <span className="subtitle is-5 mr-2">Cook Time:</span>
            <span>{cookTime}</span>
          </div>
          <div className="mb-3">
            <span className="subtitle is-5 mr-2">Servings:</span>
            <span>{servings}</span>
          </div>
          <div className="mb-3">
            <span className="subtitle is-5 mr-2">Instructions:</span>
            <div className="instructions">{instructions}</div>
          </div>
        </div>
        <div className="column">
          <span className="subtitle is-5 mr-2">Ingredients:</span>
          <div>
            <IngredientsList ingredients={ingredients} />
          </div>
        </div>
      </div>
    </div>
  );
}
