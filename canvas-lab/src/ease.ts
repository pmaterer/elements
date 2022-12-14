import { easeLinear } from './engine/animation';
import { Entity } from './engine/Entity';
import { Game } from './engine/Game';
import { Vec2 } from './engine/math';

class Rectangle extends Entity {
  private timePassed = 0;
  constructor(
    public width: number,
    public height: number,
    public position: Vec2,
    public velocity: Vec2
  ) {
    super(position, velocity);
  }

  update(ctx: CanvasRenderingContext2D, dt: number): void {
    this.timePassed += dt;

    this.position.x += easeLinear(this.timePassed, 1, 200, 12);
    this.position.y += this.velocity.y * dt;

    if (
      this.position.y + this.height > ctx.canvas.clientHeight ||
      this.position.y < 0
    ) {
      this.velocity.y = -this.velocity.y;
    }

    if (
      this.position.x + this.width > ctx.canvas.clientWidth ||
      this.position.x < 0
    ) {
      this.velocity.x = -this.velocity.x;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#105390';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const r1 = new Rectangle(40, 40, new Vec2(30, 100), new Vec2(10, 1));

const game = new Game('game', 300, 800);
game.addEntity(r1);
