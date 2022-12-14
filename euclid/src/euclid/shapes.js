import Vec2 from "../Vec2";
import { v4 as uuidv4 } from 'uuid';
import { PI, HALF_PI } from '../constants';


export class Line {

  id = uuidv4();

  constructor(v1, v2, color) {
    this.v1 = v1;
    this.v2 = v2;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.stroke()
    ctx.closePath();
  }
}

export class Triangle {
  constructor(v1, v2, v3) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.lineTo(this.v3.x, this.v3.y);
    ctx.lineTo(this.v1.x, this.v1.y);
    ctx.stroke();


    ctx.closePath();
  }
}

export class Segment extends Line {
  arrowSize = 0.4;
  color = '#3B82F6';

  constructor(v1, v2) {
    super(v1, v2);
  }

  getAngle() {
    return Math.atan2(this.v1.y - this.v2.y, this.v1.x - this.v2.x);
  }

  draw(ctx) {
    super.draw(ctx)

    ctx.save();
    ctx.translate(this.v2.x, this.v2.y);
    ctx.rotate(this.getAngle() - HALF_PI);

    new Triangle(
      new Vec2(-this.arrowSize * 0.5, this.arrowSize),
      new Vec2(this.arrowSize * 0.5, this.arrowSize),
      new Vec2(0, 0),
    ).draw(ctx);

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}