import { Vec2 } from '@materer/maths';
import { PI, HALF_PI } from './constants';

export class Point implements Entity {
  constructor(public v1: Vec2, public color: Color) {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.v1.x, this.v1.y, 0.1, 0, 2 * PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}

export class Line implements Entity {
  constructor(public v1: Vec2, public v2: Vec2, public color: Color) {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}
