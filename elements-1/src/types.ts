type Color = string;

interface Dimensions {
  min: number;
  max: number;
}

interface GridColors {
  background: Color;
  majorLines: Color;
  axisLines: Color;
}

interface Entity {
  draw(ctx: CanvasRenderingContext2D): void;
}
