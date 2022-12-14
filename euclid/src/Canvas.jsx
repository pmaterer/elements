import React, { useEffect, useRef } from "react";
import { Line, Triangle, Segment } from "./euclid/shapes";
import { Grid } from "./euclid/grid";
import colors from "./colors";

import styles from "./Canvas.module.css";

const WIDTH = 800;
const HEIGHT = 800;

const PI = Math.PI;
const HALF_PI = PI / 2;

let canvas;
let ctx;
let canvasMousePosition;

let originX;
let originY;

let scalar;

const dimensions = {
  min: -10,
  max: 10,
};

function getCanvasMousePosition(canvasRef, e) {
  const rect = canvasRef.current.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left - originX) / scalar,
    y: -(e.clientY - rect.top - originY) / scalar,
  };
}

const Canvas = ({ segments, setMouseOver, setMouseCoordinates }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let requestId;

    function init() {
      // canvas = document.createElement("canvas");
      const canvas = canvasRef.current;
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      // canvas.onmousemove = trackMouse;

      // const canvasContainer = document.getElementById("canvas");
      // canvasContainer.appendChild(canvas);

      ctx = canvas.getContext("2d");

      // set origin to center of canvas
      originX = canvas.width * 0.5;
      originY = canvas.height * 0.5;
      ctx.translate(originX, originY);

      // flip y-axis
      ctx.scale(1, -1);

      // scale to dimensions
      const size = dimensions.max - dimensions.min;
      scalar = canvas.width / size;
      ctx.scale(scalar, scalar);

      requestId = requestAnimationFrame(loop);
    }

    function loop() {
      draw();
      window.requestAnimationFrame(loop);
    }

    function draw() {
      new Grid(scalar, dimensions, colors).draw(ctx);

      ctx.lineWidth = 1 / scalar;

      segments.map((segment) => {
        segment.draw(ctx);
      });
    }

    init();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [segments]);

  const onMouseOver = () => {
    setMouseOver(true);
  };

  const onMouseLeave = () => {
    setMouseOver(false);
  };

  const onMouseMove = (e) => {
    setMouseCoordinates(getCanvasMousePosition(canvasRef, e));
  };

  return (
    <canvas
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      ref={canvasRef}
      onMouseMove={onMouseMove}
      className={styles.canvas}
    ></canvas>
  );
};

export default Canvas;
