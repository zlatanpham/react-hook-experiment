import React, { useState, useEffect, useCallback } from "react";

const useAsync = (fn, args) => {
  const [state, set] = useState({ loading: true });
  const memoized = useCallback(fn, args);

  useEffect(
    () => {
      let mounted = true;
      const promise = memoized();

      promise.then(
        value => {
          if (mounted) {
            set({
              loading: false,
              value
            });
          }
        },
        error => {
          if (mounted) {
            set({ loading: false, error });
          }
        }
      );

      return () => {
        mounted = false;
      };
    },
    [memoized]
  );

  return state;
};

const Example = () => {
  const { loading, value } = useAsync(
    () =>
      new Promise(resolve =>
        setTimeout(() => resolve("MISSION COMPLETES"), 2000)
      )
  );
  return <div>{loading ? "Loading......" : value}</div>;
};

export default Example;
