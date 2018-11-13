import React, { useState, useEffect } from "react";

const useMedia = (query, defaultState = false) => {
  const [state, setState] = useState(defaultState);

  useEffect(
    () => {
      let mounted = true;
      const mql = window.matchMedia(query);
      const onChange = () => {
        if (!mounted) return;
        setState(!!mql.matches);
      };

      mql.addListener(onChange);
      setState(mql.matches);

      return () => {
        mounted = false;
        mql.removeListener(onChange);
      };
    },
    [query]
  );

  return state;
};

const Example = () => {
  const isWide = useMedia("(min-width: 1000px)");

  return <div>Screen is wider than 1000px: {isWide ? "Yes" : "No"}</div>;
};

export default Example;
