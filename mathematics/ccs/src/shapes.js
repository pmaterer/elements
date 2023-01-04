import { Vec2 } from "materer-vectors";

import { v4 as uuidv4 } from "uuid";
import { hexToRGB } from "./colors";

const HALF_PI = Math.PI / 2;

const defaultColorOptions = {
  fill: false,
  fillColor: "#64a6c2",
  strokeColor: "#77d9d5",
};

const defaultFontColorOptions = {
  fill: true,
  fillColor: "#453f3f",
  strokeColor: "#fff",
};

export class Label {
  constructor(v1, label, fontSize = 18, colorOptions = defaultFontColorOptions) {
    this.v1 = v1;
    this.colorOptions = colorOptions;
    this.label = label;
    this.fontSize = fontSize;
  }

  draw(ctx) {
    ctx.save();
    const defaultMatrix = ctx.getTransform();

    const fontMatrix = DOMMatrix.fromMatrix(defaultMatrix);
    fontMatrix.a = 1;
    fontMatrix.d = 1;
    ctx.setTransform(fontMatrix);

    const xScale = defaultMatrix.a;
    const yScale = defaultMatrix.d;


    ctx.font = `${this.fontSize}px monospace`;

    if (this.colorOptions.fill) {
      ctx.textBaseline = 'top';
      const bgColor = hexToRGB(this.colorOptions.fillColor, 0.8);
      ctx.fillStyle = bgColor;
      const width = ctx.measureText(this.label).width;
      ctx.fillRect(this.v1.x * xScale, this.v1.y * yScale, width, this.fontSize);
    }

    ctx.fillStyle = this.colorOptions.strokeColor;

    ctx.fillText(this.label, this.v1.x * xScale, this.v1.y * yScale);

    ctx.setTransform(defaultMatrix);

    ctx.restore();
  }
}

export class Line {
  constructor(v1, v2, color, label = null) {
    this.id = uuidv4();
    this.v1 = v1;
    this.v2 = v2;
    this.color = color;
    this.label = label;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.stroke();
    ctx.closePath();

    if (this.label)
      new Label(
        new Vec2((this.v1.x + this.v2.x) / 2, (this.v1.y + this.v2.y) / 2),
        this.label + ` (${this.v2.x.toFixed(1)}, ${this.v2.y.toFixed(1)})`,
      ).draw(ctx);
  }
}

export class Triangle {
  constructor(v1, v2, v3, colorOptions = defaultColorOptions) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.colorOptions = colorOptions;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.lineTo(this.v3.x, this.v3.y);
    ctx.lineTo(this.v1.x, this.v1.y);

    ctx.strokeStyle = this.colorOptions.strokeColor;
    ctx.stroke();

    if (this.colorOptions.fill) {
      ctx.fillStyle = this.colorOptions.fillColor;
      ctx.fill();
    }
    ctx.closePath();
  }
}

export class Segment extends Line {
  arrowLength = 0.3;
  arrowSize = 0.2;

  mouseSensitivity = 0.2;
  active = false;
  moving = false;

  constructor(v1, v2, color = "#3B82F6", label = null, drawAngle = true) {
    super(v1, v2, color, label);
    this.color = color;
    this.drawAngle = drawAngle
  }

  getAngle() {
    return Math.atan2(this.v1.y - this.v2.y, this.v1.x - this.v2.x);
  }

  draw(ctx) {
    super.draw(ctx);

    ctx.save();
    ctx.translate(this.v2.x, this.v2.y);
    ctx.rotate(this.getAngle() - HALF_PI);

    new Triangle(
      new Vec2(-this.arrowSize * 0.5, this.arrowLength),
      new Vec2(this.arrowSize * 0.5, this.arrowLength),
      new Vec2(0, 0),
      {
        fill: true,
        fillColor: this.color,
        strokeColor: this.color,
      },
    ).draw(ctx);

    ctx.restore();

    ctx.save();
    if (this.drawAngle) {
      ctx.beginPath();
      const angle = Math.atan2(this.v2.y, this.v2.x)
      ctx.arc(0, 0, this.v2.magnitude() * 0.3, 0, angle);
      ctx.stroke();
      ctx.closePath();
    }

    ctx.restore();
  }

  checkMouse(mousePosition) {
    const distance = new Vec2(
      mousePosition.x - this.v2.x,
      mousePosition.y - this.v2.y,
    );
    if (distance.magnitude() ** 2 < this.mouseSensitivity ** 2) {
      this.active = true;
      return;
    }
    this.active = false;
    return;
  }

  update(position) {
    this.v2.x = position.x;
    this.v2.y = position.y;
  }
}

export class Circle {
  constructor(origin, radius, colorOptions = defaultColorOptions) {
    this.origin = origin;
    this.radius = radius;
    this.colorOptions = colorOptions;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.origin.x, this.origin.y, this.radius, 0, 360);

    if (this.colorOptions.fill) {
      ctx.fillStyle = this.colorOptions.fillColor;
      ctx.fill();
    }

    ctx.strokeStyle = this.colorOptions.strokeColor;
    ctx.stroke();
    ctx.closePath();
  }
}
