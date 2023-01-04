import { Circle, Label, Line } from "./shapes";
import { Vec2 } from "materer-vectors";

const defaultColorOptions = {
  background: "#e6f0e9",
  grid: "#737874",
  axis: "#786060",
};

export class Grid {
  constructor(scalar, dimensions, colorOptions = defaultColorOptions) {
    this.scalar = scalar;
    this.dimensions = dimensions;
    this.colorOptions = colorOptions;
  }

  draw(ctx) {
    ctx.fillStyle = this.colorOptions.background;
    ctx.fillRect(
      this.dimensions.min,
      this.dimensions.max,
      this.dimensions.max * 2,
      this.dimensions.min * 2,
    );

    ctx.strokeStyle = this.colorOptions.grid;

    const gridLabelColorOptions = {
      fill: false,
      strokeColor: "#000"
    }

    for (let x = this.dimensions.min; x <= this.dimensions.max; x++) {
      new Line(
        new Vec2(x, this.dimensions.min),
        new Vec2(x, this.dimensions.max),
        this.colorOptions.grid,
      ).draw(ctx);
      new Label(new Vec2(x + 0.05, 0 + 0.05), x, 14, gridLabelColorOptions).draw(ctx);
      new Circle(new Vec2(x, 0), 0.04, {
        fill: true,
        fillColor: "#000",
        strokeColor: "#000",
      }).draw(ctx);
    }

    ctx.strokeStyle = this.colorOptions.grid;
    for (let y = this.dimensions.min; y <= this.dimensions.max; y++) {
      new Line(
        new Vec2(this.dimensions.min, y),
        new Vec2(this.dimensions.max, y),
      ).draw(ctx);
      new Label(new Vec2(0 + 0.05, y + 0.05), y, 14, gridLabelColorOptions).draw(ctx);
      new Circle(new Vec2(0, y), 0.04, {
        fill: true,
        fillColor: "#000",
        strokeColor: "#000",
      }).draw(ctx);
    }

    ctx.strokeStyle = this.colorOptions.axis;

    new Line(
      new Vec2(this.dimensions.min, 0),
      new Vec2(this.dimensions.max, 0),
    ).draw(ctx);

    new Line(
      new Vec2(0, this.dimensions.min),
      new Vec2(0, this.dimensions.max),
    ).draw(ctx);
  }
}
