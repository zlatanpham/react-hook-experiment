import React, { useState, useEffect } from "react";

const useRaf = (ms = 1000, delay = 0) => {
  const [elapsed, set] = useState(0);

  useEffect(
    () => {
      let raf, timerStop, start;

      const onFrame = () => {
        const time = Math.min(1, (Date.now() - start) / ms);
        set(time);
        loop();
      };

      const loop = () => {
        raf = requestAnimationFrame(onFrame);
      };
      const onStart = () => {
        timerStop = setTimeout(() => {
          cancelAnimationFrame(raf);
          set(1);
        }, ms);
        start = Date.now();
        loop();
      };
      const timerDelay = setTimeout(onStart, delay);

      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(raf);
      };
    },
    [ms, delay]
  );

  return elapsed;
};

const Example = () => {
  const elapsed = useRaf(5000, 1000);

  return <div>Elapsed: {elapsed}</div>;
};

export default Example;
