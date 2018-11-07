import React, { useState, useEffect, useRef } from "react";

const useActive = ({ refEl }) => {
  const [value, setValue] = useState(false);
  const handleMouseDown = () => {
    setValue(true);
  };

  const handleMouseUp = () => {
    setValue(false);
  };
  useEffect(() => {
    if (refEl && refEl.current) {
      refEl.current.addEventListener("mousedown", handleMouseDown);
      refEl.current.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (refEl && refEl.current) {
        refEl.current.removeEventListener("mousedown", handleMouseDown);
        refEl.current.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, []);

  return value;
};

const Example = () => {
  const inputEl = useRef(null);
  const activeValue = useActive({ refEl: inputEl });

  return (
    <>
      <input ref={inputEl} type="text" />
      <did>{activeValue ? "Active" : "Nop"}</did>
    </>
  );
};

export default Example;
