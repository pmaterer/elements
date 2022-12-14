import { useEffect, useRef } from "react";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = width;
        canvas.height = height;
      }
    }
  });

  {
    return <canvas ref={canvasRef}></canvas>;
  }
};

export default Canvas;
