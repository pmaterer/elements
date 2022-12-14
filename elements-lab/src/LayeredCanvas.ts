// export function createCanvasStackContainer(parent: HTMLElement): HTMLDivElement {
//   const container = document.createElement('div') as HTMLDivElement;
//   container.id = 'canvas-stack-container';

//   const containerStyle = document.createElement('style');
//   containerStyle.innerHTML = `
//         #canvas-stack-container {
//             position: relative;
//         }
//         #canvas-stack-container canvas {
//             position: absolute;
//             background-color: transparent;
//         }
//     `;
//   document.head.appendChild(containerStyle);

//   return container;
// }

export class LayeredCanvas {
  private layersContainer: HTMLDivElement;
  private layers: Record<string, CanvasLayer> = {};
  private canvasHeight: number;
  private canvasWidth: number;

  constructor(name: string, height: number, width: number, parentElement: HTMLElement) {
    this.canvasHeight = height;
    this.canvasWidth = width;

    this.layersContainer = document.createElement('div') as HTMLDivElement;
    this.layersContainer.id = name;

    const containerStyle = document.createElement('style');
    containerStyle.innerHTML = `
      #${name} {
        position: relative;
      }

      #${name} > canvas {
        position: absolute;
        background-color: transparent;
      }
    `;
    document.head.appendChild(containerStyle);

    parentElement.appendChild(this.layersContainer);
  }

  addLayer(name: string): void {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    const ctx = canvas.getContext('2d');
    this.layersContainer.appendChild(canvas);
    if (ctx) {
      const layer: CanvasLayer = {
        canvas: canvas,
        ctx: ctx,
      };

      this.layers[name] = layer;
    }
  }

  getLayer(name: string): CanvasLayer {
    return this.layers[name];
  }
}

export interface CanvasLayer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}
