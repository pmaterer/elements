import React, { useRef, useEffect } from 'react';

import { Game } from '../engine/Game';
import { Vec2 } from '../engine/math';
import { Rectangle } from '../engine/Shapes';
import { easeLinear } from '../engine/animation';

type EaseProps = {
  width: number;
  height: number;
};

class EaseRectangle extends Rectangle {
  private timePassed = 0;
  constructor(
    public width: number,
    public height: number,
    public position: Vec2,
    public velocity: Vec2
  ) {
    super(width, height, position, velocity);
  }

  update(dt: number): void {
    this.timePassed += dt;
    let easeX = Math.floor(easeLinear(this.timePassed, 15, 30, 1));
    if (this.velocity.x < 0) {
      easeX = -easeX;
    }
    this.position.x += easeX;
    this.position.y += this.velocity.y * dt;
  }
}

const Ease = ({ width, height }: EaseProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const r1 = new EaseRectangle(
        40,
        40,
        new Vec2(30, 100),
        new Vec2(100, 50)
      );
      const game = new Game(canvasRef.current, height, width);
      game.addEntity(r1);
    }
  }, []);
  return <canvas ref={canvasRef} />;
};

export default Ease;
