import { Line } from "./shapes";

export class Grid {
  constructor(scalar, dimensions, colors) {
    this.scalar = scalar;
    this.dimensions = dimensions;
    this.colors = colors;
  }

  draw(ctx) {
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(
      this.dimensions.min,
      this.dimensions.max,
      this.dimensions.max * 2,
      this.dimensions.min * 2,
    );

    ctx.strokeStyle = this.colors.grid;
    ctx.lineWidth = 1 / this.scalar;

    ctx.beginPath();
    for (let x = this.dimensions.min; x <= this.dimensions.max; x++) {
      new Line(
        { x: x, y: this.dimensions.min },
        { x: x, y: this.dimensions.max },
      ).draw(ctx);
    }

    ctx.beginPath();
    for (let y = this.dimensions.min; y <= this.dimensions.max; y++) {
      new Line(
        { x: this.dimensions.min, y: y },
        { x: this.dimensions.max, y: y },
      ).draw(ctx);
    }

    ctx.strokeStyle = this.colors.axis;
    ctx.lineWidth = 1 / this.scalar + 0.05;

    new Line(
      { x: this.dimensions.min, y: 0 },
      { x: this.dimensions.max, y: 0 },
    ).draw(ctx);
    new Line(
      { x: 0, y: this.dimensions.min },
      { x: 0, y: this.dimensions.max },
    ).draw(ctx);
  }
}
