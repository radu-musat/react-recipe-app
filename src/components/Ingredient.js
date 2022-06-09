import React from 'react';

export default function Ingredient({ name, amount }) {
  return (
        <span className="mr-1 my-1 tag is-success">{ name } - { amount }</span>
  )
};