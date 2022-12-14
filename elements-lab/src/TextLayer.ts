import { Vec2 } from '@materer/maths';

export class TextLayer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private origin: Vec2;

  constructor(width: number, height: number, parent: HTMLDivElement) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
  }
}

// export class TextLayer {
//   private virtCanvas: HTMLCanvasElement;
//   private virtCtx: CanvasRenderingContext2D;
//   // private origin: Vec2;
//   // private scalar: number;

//   constructor(private ctx: CanvasRenderingContext2D, width: number, height: number, private dimensions: Dimensions) {
//     this.virtCanvas = document.createElement('canvas');
//     this.virtCanvas.width = width;
//     this.virtCanvas.height = height;
//     this.virtCtx = this.virtCanvas.getContext('2d') as CanvasRenderingContext2D;

//     // set origin to center
//     // this.origin = new Vec2(this.virtCanvas.width * 0.5, this.virtCanvas.height * 0.5);
//     // this.virtCtx.translate(this.origin.x, this.origin.y);

//     // flip y-axis
//     // this.virtCtx.scale(1, -1);

//     // const virtCanvasSize = this.dimensions.max - this.dimensions.min;
//     // this.scalar = this.virtCanvas.width / virtCanvasSize;
//   }

//   draw() {
//     this.ctx.imageSmoothingEnabled = false;
//     this.virtCtx.strokeStyle = 'red';
//     this.virtCtx.lineWidth = 1;
//     this.virtCtx.rect(0, 0, 100, 100);
//     this.virtCtx.stroke();

//     this.ctx.drawImage(this.virtCanvas, 0, 0, 100, 100);
//     // this.ctx.drawImage(this.virtCanvas, 0, 0);
//   }
// }
