import React, { useState, useEffect, useCallback } from "react";

const useWindowMousePosition = () => {
  let [position, set] = useState({
    x: null,
    y: null
  });

  const handleMouseMove = useCallback(e => {
    set({
      x: e.pageX,
      y: e.pageY
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return position;
};

const Example = () => {
  const position = useWindowMousePosition();

  return <div>{JSON.stringify(position)}</div>;
};

export default Example;
