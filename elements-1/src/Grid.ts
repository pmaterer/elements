import { Vec2 } from '@materer/maths';
import { Line } from './Shapes';

export class Grid implements Entity {
  constructor(private dimensions: Dimensions, private colors: GridColors) {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.fillStyle = this.colors.background;
    ctx.fillRect(
      this.dimensions.min,
      this.dimensions.max,
      this.dimensions.max * 2,
      this.dimensions.min * 2
    );

    ctx.beginPath();
    for (let x = this.dimensions.min; x <= this.dimensions.max; x++) {
      new Line(
        new Vec2(x, this.dimensions.min),
        new Vec2(x, this.dimensions.max),
        this.colors.majorLines
      ).draw(ctx);
    }

    ctx.beginPath();
    for (let y = this.dimensions.min; y <= this.dimensions.max; y++) {
      new Line(
        new Vec2(this.dimensions.min, y),
        new Vec2(this.dimensions.max, y),
        this.colors.majorLines
      ).draw(ctx);
    }

    ctx.lineWidth = ctx.lineWidth + 0.09;
    new Line(
      new Vec2(this.dimensions.min, 0),
      new Vec2(this.dimensions.max, 0),
      this.colors.axisLines
    ).draw(ctx);
    new Line(
      new Vec2(0, this.dimensions.min),
      new Vec2(0, this.dimensions.max),
      this.colors.axisLines
    ).draw(ctx);

    ctx.restore();
  }
}
