export default class Circle {
  constructor(p, colors, radius) {
    this.p = p;
    this.colors = colors;
    this.radius = radius;
  }

  draw() {
    const p = this.p;
    p.push();
    p.noFill();
    p.stroke(this.colors.primary);
    p.ellipse(0, 0, 2 * this.radius);
    p.pop();
  }
}