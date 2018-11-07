import React, { useEffect, useCallback } from "react";
import { useArray } from "./UseArray";

const useOnMount = onMount => useEffect(() => onMount && onMount(), []);
const useOnUnmount = onUnmount =>
  useEffect(() => {
    return () => onUnmount && onUnmount();
  }, []);

const Item = ({ value, onClear }) => {
  useOnMount(() => console.log(`${value} was created`));
  useOnUnmount(() => console.log(`${value} was removed`));

  return (
    <div id={value}>
      {value} <button onClick={() => onClear()}>x</button>
    </div>
  );
};

const Example = () => {
  const { value, removeIndex, add } = useArray([{ name: "Item 1", id: 1 }]);
  const addNewItem = useCallback(value => {
    const index = Date.now();
    add({ name: `Item ${index}`, id: index });
  }, []);

  return (
    <>
      <p>Open your Browser's console:</p>
      {value.map(({ name, id }, index) => (
        <Item key={id} value={name} onClear={() => removeIndex(index)} />
      ))}
      <br />
      <button onClick={() => addNewItem(value)}>Add Item</button>
    </>
  );
};

export default Example;
