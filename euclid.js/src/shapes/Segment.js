import { v4 as uuidv4 } from "uuid";
import { randomHsl } from "../colors";

export default class Segment {
  id = uuidv4();
  arrow_size = 0.6;

  constructor(v1, v2, arrow = true) {
    this.v1 = v1;
    this.v2 = v2;
    this.arrow = arrow;
    this.color = randomHsl(360, 100, 50);
  }

  getAngle() {
    return Math.atan2(this.v1.y - this.v2.y, this.v1.x - this.v2.x);
  }

  draw(p) {
    const color = p.color(this.color);
    p.push();

    p.stroke(color);
    p.fill(color);

    p.line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);

    if (this.arrow) {

      p.push();
      p.translate(this.v2.x, this.v2.y);
      p.rotate(this.getAngle() - p.HALF_PI);

      p.triangle(
        -this.arrow_size * 0.5,
        this.arrow_size,
        this.arrow_size * 0.5,
        this.arrow_size,
        0,
        0
      );
      p.pop();
    }
    p.pop();
  }
}
