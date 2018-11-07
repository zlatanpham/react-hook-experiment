import React, { useState, useCallback } from "react";

const useBoolean = (initial = false) => {
  const [value, setValue] = useState(initial);

  return {
    value,
    setValue,
    toggle: useCallback(() => setValue(v => !v), []),
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), [])
  };
};

const Example = () => {
  const { value, toggle } = useBoolean();
  return <button onClick={() => toggle()}>{JSON.stringify(value)}</button>;
};

export default Example;
