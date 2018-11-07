import React, { useState, useCallback } from "react";

const useInput = (initial = "") => {
  const [value, setValue] = useState(initial);
  const onChange = useCallback(e => setValue(e.target.value), []);

  return {
    value,
    setValue,
    onChange,
    hasValue: value !== undefined && value !== null && value !== "",
    clear: useCallback(() => setValue(""), []),
    bindToInput: {
      onChange,
      value
    },
    bind: {
      onChange: setValue,
      value
    }
  };
};

const Example = () => {
  const { bindToInput, value, clear, hasValue } = useInput();

  return (
    <div>
      <p>{value}</p>
      <input type="text" {...bindToInput} />{" "}
      <button onClick={() => clear()} disabled={!hasValue}>
        x
      </button>
    </div>
  );
};

export default Example;
