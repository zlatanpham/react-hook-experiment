import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const on = (node, event, callback) => node.addEventListener(event, callback);
const off = (node, event, callback) =>
  node.removeEventListener(event, callback);

const useMove = ref => {
  const fireMove = e => {
    document.documentElement.style.cursor = "move";
    on(document, "mousemove", move);
    on(document, "mouseup", removeEvents);
  };

  const removeEvents = () => {
    document.documentElement.style.cursor = "default";
    off(document, "mousemove", move);
    off(document, "mouseup", removeEvents);
  };

  const move = e => {
    const { clientX, clientY } = e;
    window.requestAnimationFrame(() => {
      ref.current.style.left = clientX + "px";
      ref.current.style.top = clientY + "px";
    });
  };

  useEffect(() => {
    ref.current.style.cursor = "move";
    on(ref.current, "mousedown", fireMove);

    return () => {
      off(ref.current, "mousedown", fireMove);
      removeEvents();
    };
  }, []);
};

const Box = styled.div`
  width: 20px;
  height: 20px;
  background: red;
  position: absolute;
`;

const Example = () => {
  const boxRef = useRef(null);
  useMove(boxRef);

  return <Box ref={boxRef} />;
};

export default Example;
