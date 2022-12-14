import React, { useState } from "react";
import Controls from "./components/Controls";

import { Segment } from "./euclid/shapes";
import MouseCoordinates from "./components/MouseCoordinates/MouseCoordinates";

import Canvas from "./Canvas";

import Vec2 from "./Vec2";

import styles from "./App.module.css";

const ORIGIN = new Vec2(0, 0);

const App = () => {
  const [segments, setSegments] = useState([
    new Segment(ORIGIN, new Vec2(1, 1)),
    new Segment(ORIGIN, new Vec2(-2, -5)),
  ]);

  const [mouseOver, setMouseOver] = useState(false);
  const [mouseCoordinates, setMouseCoordinates] = useState(null);

  const handleSetSegments = (segment) => {
    setSegments((segments) => [...segments, segment]);
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.heading}>Euclid</h1>
      <div className={styles.container}>
        <Controls
          handleSetSegments={handleSetSegments}
          mouseCoordinates={mouseCoordinates}
          segments={segments}
        />
        <Canvas
          setMouseCoordinates={setMouseCoordinates}
          setMouseOver={setMouseOver}
          segments={segments}
        />
        <MouseCoordinates mouseCoordinates={mouseCoordinates} />
      </div>
    </div>
  );
};

export default App;
