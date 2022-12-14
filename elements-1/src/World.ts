import { Vec2 } from '@materer/maths';
import { Grid } from './Grid';

const gridColors: GridColors = {
  background: '#221529',
  majorLines: '#879ba3',
  axisLines: '#d64562'
};

export class World {
  private mainCtx: CanvasRenderingContext2D;
  private uiCtx: CanvasRenderingContext2D;
  private entities: Array<Entity>;

  private dimensions: Dimensions;
  private origin: Vec2;
  private scalar: number;

  constructor(
    width: number,
    height: number,
    dimensions: Dimensions,
    parentElementId: string
  ) {
    this.loop = this.loop.bind(this);
    this.entities = [];
    this.dimensions = dimensions;

    // setup main context
    const mainCanvas = document.getElementById('main') as HTMLCanvasElement;
    mainCanvas.width = width;
    mainCanvas.height = height;
    this.mainCtx = mainCanvas.getContext('2d') as CanvasRenderingContext2D;

    this.origin = new Vec2(width * 0.5, height * 0.5);
    this.mainCtx.translate(this.origin.x, this.origin.y);
    this.mainCtx.scale(1, -1);

    const canvasSize = this.dimensions.max - this.dimensions.min;
    this.scalar = width / canvasSize;
    this.mainCtx.scale(this.scalar, this.scalar);
    this.mainCtx.lineWidth = 1 / this.scalar + 0.01;

    // setup ui context
    const uiCanvas = document.getElementById('ui') as HTMLCanvasElement;
    uiCanvas.width = width;
    uiCanvas.height = height;
    this.uiCtx = uiCanvas.getContext('2d') as CanvasRenderingContext2D;
    this.uiCtx.translate(this.origin.x, this.origin.y);
    this.uiCtx.scale(1, -1);
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  draw(): void {
    new Grid(this.dimensions, gridColors).draw(this.mainCtx);

    // ui
    this.uiCtx.font = `12px monospace`;
    this.uiCtx.fillStyle = 'black';
    this.uiCtx.textAlign = 'center';
    this.uiCtx.fillText('a', 0, 0);
  }

  loop(): void {
    this.draw();
    window.requestAnimationFrame(this.loop);
  }
}
