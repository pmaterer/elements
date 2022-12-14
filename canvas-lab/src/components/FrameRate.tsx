import React, { useRef, useEffect } from 'react';

import { Game } from '../engine/Game';
import { Vec2 } from '../engine/math';
import { Rectangle } from '../engine/Shapes';

type FrameRateProps = {
  width: number;
  height: number;
  frameRate: number;
};

const FrameRate = ({ width, height, frameRate }: FrameRateProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const r1 = new Rectangle(40, 40, new Vec2(30, 100), new Vec2(100, 50));
      const game = new Game(canvasRef.current, height, width);
      game.enableFps();
      game.enabledFixedFps(frameRate);
      game.addEntity(r1);
    }
  }, []);
  return <canvas ref={canvasRef} />;
};

export default FrameRate;
