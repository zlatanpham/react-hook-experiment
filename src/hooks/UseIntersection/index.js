import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    height:2000px
  }
`;

const useIntersection = node => {
  const [state, set] = useState(false);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1
    };

    const callback = function(entries, observer) {
      entries.forEach(entry => {
        const { intersectionRatio } = entry;
        set(intersectionRatio !== 1);
      });
    };
    const observer = new IntersectionObserver(callback, options);

    observer.observe(node.current);
  }, []);

  return state;
};

const Marker = styled.div`
  width: 100px;
  background-color: yellow;
  position: relative;
`;

const FloatObject = styled.div`
  width: 200px;
  height: 200px;
  ${({ active }) =>
    active
      ? `
    position:fixed;
    background-color: green;
    top:20px;
    `
      : `
    background-color: red;
    `};
`;

const Example = () => {
  const node = useRef(null);
  const active = useIntersection(node);
  return (
    <div>
      <Marker ref={node}>
        My Marker
        <FloatObject active={active}>Fixed Object</FloatObject>
      </Marker>
      {active ? "active" : "deactive"}
      <GlobalStyle />
    </div>
  );
};

export default Example;
