import React, { useState, useEffect } from "react";

const useGeolocation = () => {
  const [state, setState] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longtitude: null,
    speed: null,
    timestamp: Date.now()
  });

  let mounted = true;
  let watchId;
  const onEvent = event => {
    if (mounted) {
      setState({
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longtitude: event.coords.longtitude,
        speed: event.coords.speed,
        timestamp: event.timestamp
      });
    }
  };

  useEffect(
    () => {
      navigator.geolocation.getCurrentPosition(onEvent);
      watchId = navigator.geolocation.watchPosition(onEvent);

      return () => {
        mounted = false;
        navigator.geolocation.clearWatch(watchId);
      };
    },
    [0]
  );

  return state;
};

const Example = () => {
  const state = useGeolocation();

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

export default Example;
