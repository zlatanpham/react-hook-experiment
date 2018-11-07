import React, { useState, useEffect } from "react";

const useInterval = ({ startImediate = true, duration, callback }) => {
  const [count, updateCount] = useState(null);
  const [intervalState, setIntervalState] = useState(startImediate);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(
    () => {
      if (intervalState) {
        const intervalId = setInterval(() => {
          updateCount(count + 1);
          callback && callback();
        }, duration);
        setIntervalId(intervalId);
      }

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
      };
    },
    [intervalState, count]
  );
  return {
    intervalId,
    start: () => {
      setIntervalState(true);
    },
    stop: () => {
      setIntervalState(false);
    }
  };
};

const Example = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const { start, stop, intervalId } = useInterval({
    duration: 1000,
    startImediate: true,
    callback: () => {
      setTime(new Date().toLocaleTimeString());
    }
  });
  return (
    <>
      <div>The time is now {time}</div>
      {intervalId ? (
        <button onClick={() => stop()}>Stop</button>
      ) : (
        <button onClick={() => start()}>Start</button>
      )}
    </>
  );
};

export default Example;
