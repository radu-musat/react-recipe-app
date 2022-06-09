import React, { useCallback } from "react";

export default function RecipeIngredientEdit(props) {
  const { ingredient, handleIngredientChange, handleIngredientDelete } = props;

  const handleChange = useCallback(
    (changes) => {
      handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
    },
    [ingredient, handleIngredientChange]
  );

 

  return (
    <>
      <input
        className="input is-primary"
        value={ingredient.name}
        type="text"
        onInput={(e) => handleChange({ name: e.target.value })}
      />
      <input
        className="input is-primary"
        value={ingredient.amount}
        type="text"
        onInput={(e) => handleChange({ amount: e.target.value })}
      />
      <button
        className="button is-danger delete"
        onClick={ ()=> handleIngredientDelete(ingredient.id) }
      >
        &times;
      </button>
    </>
  );
}
