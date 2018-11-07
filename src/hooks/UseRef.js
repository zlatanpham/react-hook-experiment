import React, { useRef, useEffect } from "react";

const Example = () => {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };

  useEffect(() => {
    onButtonClick();
  });

  return (
    <>
      <input ref={inputEl} type="text" />{" "}
      <button onClick={onButtonClick}>Focus on input</button>
    </>
  );
};

export default Example;
