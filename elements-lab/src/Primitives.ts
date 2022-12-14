import { Vec2 } from '@materer/maths';
import { PI, HALF_PI } from './constants';

export class Point implements Entity {
  constructor(public v1: Vec2, public color: Color) {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.v1.x, this.v1.y, 0.1, 0, 2 * PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

export class Triangle implements Entity {
  constructor(public v1: Vec2, public v2: Vec2, public v3: Vec2, public color: Color) {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.lineTo(this.v3.x, this.v3.y);
    ctx.lineTo(this.v1.x, this.v1.y);
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

export class Circle implements Entity {
  constructor(
    public center: Vec2,
    public radius: number,
    public strokeColor: Color,
    public fillColor: Color,
    public fill: boolean,
  ) {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = this.strokeColor;
    if (this.fill) {
      ctx.fillStyle = this.fillColor;
    }
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * PI);
    ctx.stroke();
    if (this.fill) {
      ctx.fill();
    }
    ctx.restore();
  }
}

export class Segment extends Line implements Entity {
  private arrowSize = 0.4;
  constructor(public v1: Vec2, public v2: Vec2, public color: Color) {
    super(v1, v2, color);
  }

  getAngle(): number {
    return Math.atan2(this.v1.y - this.v2.y, this.v1.x - this.v2.x);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);

    ctx.save();

    ctx.translate(this.v2.x, this.v2.y);
    ctx.rotate(this.getAngle() - HALF_PI);

    new Triangle(
      new Vec2(-this.arrowSize * 0.5, this.arrowSize),
      new Vec2(this.arrowSize * 0.5, this.arrowSize),
      new Vec2(0, 0),
      this.color,
    ).draw(ctx);

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.restore();
  }
}
