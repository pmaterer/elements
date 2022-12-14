import { Entity } from './Entity';
import { Vec2 } from './math';

class Circle extends Entity {
  private showDirection = false;
  constructor(
    public radius: number,
    public position: Vec2,
    public velocity: Vec2
  ) {
    super(position, velocity);
  }

  toggleShowDirection(): void {
    this.showDirection = !this.showDirection;
  }

  update(dt: number): void {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = this.isColliding ? '#fffad6' : '#ad0b42';
    ctx.fill();
    ctx.closePath();
    if (this.showDirection) {
      ctx.beginPath();
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(
        this.position.x + this.velocity.x,
        this.position.y + this.velocity.y
      );
      ctx.stroke();
      ctx.closePath();
    }
  }
}

class Rectangle extends Entity {
  constructor(
    public width: number,
    public height: number,
    public position: Vec2,
    public velocity: Vec2
  ) {
    super(position, velocity);
  }

  update(dt: number): void {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.isColliding ? '#fffad6' : '#007080';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.closePath();
  }
}

export { Rectangle, Circle };
