import React, { useCallback, useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from "uuid";

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  const handleChange = useCallback(
    (changes) => {
      handleRecipeChange(recipe.id, { ...recipe, ...changes });
    },
    [recipe, handleRecipeChange]
  );

  const handleIngredientChange = useCallback(
    (id, ingredient) => {
      const newIngredients = [...recipe.ingredients];
      const index = newIngredients.findIndex((i) => i.id === id);
      newIngredients[index] = ingredient;
      handleChange({ ingredients: newIngredients });
    },
    [recipe, handleChange]
  );

  const handleIngredientAdd = useCallback(() => {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };

    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }, [handleChange, recipe]);

  const handleIngredientDelete = useCallback(
    (id) => {
      handleChange({
        ingredients: recipe.ingredients.filter((i) => i.id !== id),
      });
    },
    [handleChange, recipe]
  );

  return (
    <div className="column recipe-edit">
      <button
        className="delete delete-top"
        onClick={() => {
          handleRecipeSelect(undefined);
        }}
      >
        &times;
      </button>
      <div className="mb-5">
 
        <div className="box">
          <small className="mb-3">data will be saved automatically</small>
          <label className="has-text-weight-bold" htmlFor="name">
            Name
          </label>
          <input
            className="input is-primary mb-3"
            type="text"
            name="name"
            id="name"
            value={recipe.name}
            onChange={(e) => handleChange({ name: e.target.value })}
          />

          <label className="has-text-weight-bold" htmlFor="timer">
            Cook Time
          </label>
          <input
            className="input is-primary mb-3"
            type="text"
            name="cookTimer"
            id="cookTime"
            value={recipe.cookTime}
            onChange={(e) => handleChange({ cookTime: e.target.value })}
          />

          <label className="has-text-weight-bold" htmlFor="servings">
            Servings
          </label>
          <input
            className="input is-primary mb-3"
            type="number"
            name="servings"
            id="servings"
            value={recipe.servings}
            onChange={(e) =>
              handleChange({ servings: parseInt(e.target.value) || "" })
            }
          />

          <label className="has-text-weight-bold" htmlFor="instructions">
            Instructions
          </label>
          <textarea
            className="input is-primary"
            type="text"
            name="instructions"
            id="instructions"
            value={recipe.instructions}
            onChange={(e) => handleChange({ instructions: e.target.value })}
          />
        </div>
      </div>
      <div className="box">
        <h4 className="subtitle is-5 has-text-weight-bold">Ingredients</h4>
        <div className="recipe-edit__ingredients mb-3">
          <h6 className="has-text-weight-bold subtitle is-6 mb-0 ">name</h6>
          <h6 className="has-text-weight-bold subtitle is-6 mb-0">amount</h6>
          <div></div>
          {recipe.ingredients.map((ingredient) => {
            return (
              <RecipeIngredientEdit
                key={ingredient.id}
                handleIngredientChange={handleIngredientChange}
                handleIngredientDelete={handleIngredientDelete}
                ingredient={ingredient}
              />
            );
          })}
        </div>
        <button
          className="button is-success"
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
