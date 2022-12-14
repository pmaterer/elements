import { Entity } from './Entity';

import { Circle, Rectangle } from './Shapes';
import { isIntersecting } from './utils';

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private dt = 0;
  private previousTimestamp = 0;
  private secondsElapsed = 0;
  private fps = 0;
  private showFps = false;

  private useFixedFps = false;
  private fixedFps = 25;

  private entities: Entity[] = [];

  constructor(canvas: HTMLCanvasElement, height = 600, width = 1200) {
    this.loop = this.loop.bind(this);
    this.canvas = canvas;
    this.canvas.height = height;
    this.canvas.width = width;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    window.requestAnimationFrame(this.loop);
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  enabledFixedFps(fixedFps: number): void {
    this.fixedFps = fixedFps;
    this.useFixedFps = true;
  }

  disableFixedFps(): void {
    this.useFixedFps = false;
  }

  enableFps(): void {
    this.showFps = true;
  }

  disableFps(): void {
    this.showFps = false;
  }

  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private loop(timestamp: number): void {
    this.dt = (timestamp - this.previousTimestamp) / 1000;
    this.previousTimestamp = timestamp;
    this.secondsElapsed += this.dt;

    // never move more than 0.1 seconds
    this.dt = Math.min(this.dt, 0.1);

    this.update(this.dt);
    this.detectCollisions();
    this.draw();

    if (this.useFixedFps) {
      setTimeout(() => {
        window.requestAnimationFrame(this.loop);
      }, 1000 / this.fixedFps);
    } else {
      window.requestAnimationFrame(this.loop);
    }
  }

  private detectCollisions() {
    let o1: Entity;
    let o2: Entity;

    this.entities.forEach((entity) => (entity.isColliding = false));

    for (let i = 0; i < this.entities.length; i++) {
      o1 = this.entities[i];
      for (let j = i + 1; j < this.entities.length; j++) {
        o2 = this.entities[j];

        if (isIntersecting(o1, o2)) {
          o1.isColliding = true;
          o2.isColliding = true;

          const collisionVector = o2.position.subtract(o1.position);
          // normalize to get direction of collision
          const collisionVectorNorm = collisionVector.normalize();

          // now get speed of collision
          const relativeVelocityVector = o1.velocity.subtract(o2.velocity);
          const speed = relativeVelocityVector.dot(collisionVectorNorm);

          if (speed < 0) {
            break;
          }

          o1.velocity.x -= speed * collisionVectorNorm.x;
          o1.velocity.y -= speed * collisionVectorNorm.y;

          o2.velocity.x += speed * collisionVectorNorm.x;
          o2.velocity.y += speed * collisionVectorNorm.y;
        }
      }
    }

    // check wall collision
    this.entities.forEach((entity) => {
      if (entity instanceof Circle) {
        if (
          entity.position.y + entity.radius > this.canvas.height ||
          entity.position.y - entity.radius < 0
        ) {
          entity.velocity.y = -entity.velocity.y;
        }

        if (
          entity.position.x + entity.radius > this.canvas.width ||
          entity.position.x - entity.radius < 0
        ) {
          entity.velocity.x = -entity.velocity.x;
        }
      } else if (entity instanceof Rectangle) {
        if (
          entity.position.y + entity.height > this.canvas.height ||
          entity.position.y < 0
        ) {
          entity.velocity.y = -entity.velocity.y;
        }
        if (
          entity.position.x + entity.width > this.canvas.width ||
          entity.position.x < 0
        ) {
          console.log('hit x wall going back');
          entity.velocity.x = -entity.velocity.x;
        }
      }
    });
  }

  private displayFps(): void {
    if (this.showFps) {
      if (Math.round(this.secondsElapsed) === 1) {
        this.fps = Math.round(1 / this.dt);
        this.secondsElapsed = 0;
      }

      this.ctx.font = '25px monospace';
      this.ctx.fillStyle = '#381631';
      this.ctx.fillText(`FPS: ${this.fps}`, 10, 30);
    }
  }

  private update(dt: number): void {
    for (const entity of this.entities) {
      entity.update(dt);
    }
  }

  private draw(): void {
    this.clearCanvas();
    this.ctx.fillStyle = '#fdaac6';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.displayFps();

    for (const entity of this.entities) {
      entity.draw(this.ctx);
    }
  }
}

export { Game };
