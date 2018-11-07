import React, { useState, useCallback } from "react";

export const useArray = initial => {
  const [value, setValue] = useState(initial);

  return {
    value,
    setValue,
    add: useCallback(
      a =>
        setValue(v => {
          v.push(a);
          return v;
        }),
      []
    ),
    clear: useCallback(() => setValue(() => []), []),
    removeById: useCallback(
      id => setValue(arr => arr.filter(v => v && v.id !== id)),
      []
    ),
    removeIndex: useCallback(index =>
      setValue(v => {
        v.splice(index, 1);
        return v;
      }, [])
    )
  };
};

const Demo = () => {
  const todos = useArray([{ name: "Item 1", id: 1 }]);
  const addNewItem = () => {
    const index = todos.value.length + 1;
    todos.add({ name: `Item ${index}`, id: index });
  };
  return (
    <div>
      {todos.value.map((todo, index) => (
        <div>
          {todo.name}{" "}
          <button onClick={() => todos.removeIndex(index)}>x</button>
        </div>
      ))}

      <br />
      <button onClick={addNewItem}>Add Item</button>
    </div>
  );
};

export default Demo;
