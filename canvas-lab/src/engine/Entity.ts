import { Vec2 } from './math';

abstract class Entity {
  width = 0;
  height = 0;

  isColliding = false;

  constructor(public position: Vec2, public velocity: Vec2) {}

  abstract update(dt: number): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}

export { Entity };
