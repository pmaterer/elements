import p5 from "p5";
import React, { useEffect, useRef, useState } from "react";

import Grid from "./grid";
import Circle from "./shapes/circle";
import Segment from "./shapes/segment";
import Vec2 from "./Vec2";

import Dashboard from "./components/Dashboard";

const canvasWidth = 700;
const canvasHeight = 700;

const colors = {
  background: "#ffeee5",
  grid: "#0099db",
  axis: "#3d083b",
  primary: "#da2424",
};

const dimensions = {
  min: -25,
  max: 25,
};

let scalar = 1;

const ORIGIN = new Vec2(0, 0);

function scale(p, dimensions) {
  const size = dimensions.max - dimensions.min;
  scalar = p.width / size;
  p.scale(scalar);
}

function normalizeMouseCoordinates(coordinates) {
  const x = coordinates.x / scalar - dimensions.max;
  const y = dimensions.max - coordinates.y / scalar;
  return { x, y };
}

const App = () => {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [mouseOverSketch, setMouseOverSketch] = useState(false);
  const [segments, setSegments] = useState([
    new Segment(ORIGIN, new Vec2(1, 1)),
    new Segment(new Vec2(-2, -5), new Vec2(2, 2)),
  ]);

  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
      };

      p.draw = () => {
        p.background(colors.background);
        p.push();

        p.translate(p.width / 2, p.height / 2);
        p.scale(1, -1);
        scale(p, dimensions);

        p.strokeWeight(1 / scalar);

        const grid = new Grid(p, dimensions, colors);
        grid.draw();

        const circle = new Circle(p, colors, 1);
        circle.draw();

        segments.map((segment) => {
          segment.draw(p);
        });

        setMouseCoordinates(
          normalizeMouseCoordinates({ x: p.mouseX, y: p.mouseY })
        );
      };
    };
    let inst = new p5(sketch, sketchRef.current);

    return () => inst.remove();
  }, [segments]); // run once

  function canvasHover() {
    setMouseOverSketch(true);
  }

  function canvasLeave() {
    setMouseOverSketch(false);
  }

  const handleSegmentSubmit = (segment) => {
    setSegments((segments) => [...segments, segment]);
  };

  const handleSegmentDelete = (id) => {
    setSegments(
      segments.filter((segment) => {
        return segment.id != id;
      })
    );
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-900 p-4 text-yellow-50 flex basis-1 justify-between font-eb-garamond">
      <Dashboard
        mouseCoordinates={mouseCoordinates}
        mouseOver={mouseOverSketch}
        segments={segments}
        setSegments={handleSegmentSubmit}
        removeSegment={handleSegmentDelete}
      />
      <div
        onMouseLeave={canvasLeave}
        onMouseOver={canvasHover}
        ref={sketchRef}
        className="m-5 p-2 border-2 border-dashed border-blue-500"
      ></div>
    </div>
  );
};

export default App;
