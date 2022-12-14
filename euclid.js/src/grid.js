export default class Grid {
  constructor(p, dimensions, colors) {
    this.p = p;
    this.dimensions = dimensions;
    this.colors = colors;
  }

  draw() {
    const p = this.p;

    p.push();
    p.stroke(this.colors.grid);

    for (let x = this.dimensions.min; x <= this.dimensions.max; x++) {
      p.line(x, this.dimensions.min, x, this.dimensions.max);
    }

    for (let y = this.dimensions.min; y <= this.dimensions.max; y++) {
      p.line(this.dimensions.min, y, this.dimensions.max, y);
    }

    p.stroke(this.colors.axis);
    p.line(this.dimensions.min, 0, this.dimensions.max, 0);
    p.line(0, this.dimensions.min, 0, this.dimensions.max);

    p.pop();
  }
}
