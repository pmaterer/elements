import { Grid } from "./grid";

const defaults = {
  dimensions: {
    min: -10,
    max: 10,
  },
};

export default class App {
  constructor(canvas, size = 900, dimensions = defaults.dimensions) {
    canvas.width = size;
    canvas.height = size;

    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;

    this.dimensions = dimensions;
    this.origin = size / 2;
    this.gridSize = dimensions.max - dimensions.min;
    this.scalar = canvas.width / this.gridSize;

    this.grid = new Grid(this.scalar, this.dimensions);
    this.entities = [];

    this.mousePosition = {
      x: 0,
      y: 0,
    };
  }

  getMousePosition(e) {
    const boundingBox = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - boundingBox.left - this.origin) / this.scalar,
      y: -(e.clientY - boundingBox.top - this.origin) / this.scalar,
    };
  }

  draw() {
    const ctx = this.ctx;
    ctx.setTransform(this.scalar, 0, 0, -this.scalar, this.origin, this.origin);
    ctx.lineWidth = 1 / this.scalar;

    this.grid.draw(ctx);

    this.entities.forEach((entity) => {
      entity.draw(ctx);
    });

    this.canvas.onmousemove = (e) => {
      this.mousePosition = this.getMousePosition(e);
      this.entities.forEach((entity) => {
        entity.checkMouse(this.mousePosition);
        if (entity.moving) {
          entity.update(this.mousePosition);
        }
      });
    };

    this.canvas.onmousedown = () => {
      this.entities.forEach((entity) => {
        if (entity.active) {
          entity.moving = true;
        }
      });
    };

    this.canvas.onmouseup = () => {
      this.entities.forEach((entity) => {
        if (entity.moving) {
          entity.moving = false;
        }
      });
    };
  }

  add(...entity) {
    this.entities.push(...entity);
  }
}
