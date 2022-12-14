import { Vec2 } from '@materer/maths';
import { CanvasLayer, LayeredCanvas } from './LayeredCanvas';
import { Grid } from './Grid';
import { TextLayer } from './TextLayer';

const gridColors: GridColors = {
  background: '#221529',
  majorLines: '#879ba3',
  axisLines: '#d64562',
};

class World {
  private layeredCanvas: LayeredCanvas;
  // private canvas: HTMLCanvasElement;
  // private ctx: CanvasRenderingContext2D;
  private mainCtx: CanvasRenderingContext2D;
  private textCtx: CanvasRenderingContext2D;

  private dimensions: Dimensions;
  private origin: Vec2;
  private scalar: number;
  private entities: Array<Entity>;

  // private textLayer: TextLayer;

  constructor(width: number, height: number, dimensions: Dimensions, parentElementId: string) {
    this.loop = this.loop.bind(this);
    this.entities = [];
    this.dimensions = dimensions;

    const canvasContainer = document.getElementById(parentElementId) as HTMLDivElement;
    this.layeredCanvas = new LayeredCanvas('world', height, width, canvasContainer);

    this.layeredCanvas.addLayer('main');

    // this.canvas = document.createElement('canvas');
    // this.canvas.width = width;
    // this.canvas.height = height;
    // canvasStack?.appendChild(this.canvas);

    this.mainCtx = this.layeredCanvas.getLayer('main').ctx;

    // this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.origin = new Vec2(width * 0.5, height * 0.5);
    this.mainCtx.translate(this.origin.x, this.origin.y);
    this.mainCtx.scale(1, -1);
    const canvasSize = this.dimensions.max - this.dimensions.min;
    this.scalar = width / canvasSize;
    this.mainCtx.scale(this.scalar, this.scalar);
    this.mainCtx.lineWidth = 1 / this.scalar + 0.01;

    // // set origin to center
    // this.origin = new Vec2(this.canvas.width * 0.5, this.canvas.height * 0.5);
    // this.ctx.translate(this.origin.x, this.origin.y);

    // // flip y-axis
    // this.ctx.scale(1, -1);

    // // scale to dimensions
    // const canvasSize = this.dimensions.max - this.dimensions.min;
    // this.scalar = this.canvas.width / canvasSize;
    // this.ctx.scale(this.scalar, this.scalar);
    // this.ctx.lineWidth = 1 / this.scalar + 0.01;

    // this.textRender = new TextRenderer(this.ctx, this.scalar);

    // this.textLayer = new TextLayer(this.ctx, this.canvas.width, this.canvas.height, dimensions);
  }

  addEntity(drawable: Entity): void {
    this.entities.push(drawable);
  }

  draw(): void {
    // new Grid(this.dimensions, gridColors, this.textRender).draw(this.ctx);
    new Grid(this.dimensions, gridColors).draw(this.mainCtx);
    for (const drawable of this.entities) {
      drawable.draw(this.mainCtx);
    }
  }

  loop(): void {
    this.draw();
    // this.textLayer.draw();
    window.requestAnimationFrame(this.loop);
  }
}

export enum TextAlign {
  Start = 'start',
  End = 'end',
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

// export class TextRenderer {
//   constructor(private ctx: CanvasRenderingContext2D, private scalar: number) {}

//   draw(
//     text: string,
//     fontSize: number,
//     font: string,
//     color: string,
//     x: number,
//     y: number,
//     textAlign: TextAlign = TextAlign.Start,
//   ): void {
//     const transform = this.ctx.getTransform();
//     const newTransform = copyTransformTranslation(transform);
//     this.ctx.setTransform(newTransform);

//     this.ctx.font = `${fontSize}px ${font}`;
//     this.ctx.fillStyle = color;
//     this.ctx.textAlign = textAlign;
//     this.ctx.fillText(text, x * this.scalar, -y * this.scalar);
//     this.ctx.setTransform(transform);
//   }
// }

// function copyTransformTranslation(m: DOMMatrixReadOnly): DOMMatrixReadOnly {
//   const newMatrix = new DOMMatrix();
//   newMatrix.e = m.e;
//   newMatrix.f = m.f;

//   return newMatrix as DOMMatrixReadOnly;
// }

export default World;
