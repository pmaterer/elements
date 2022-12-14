interface CanvasLayer {
  name: string;
  canvas: HTMLCanvasElement;
}

class LayerCanvas {
  private _container: HTMLDivElement;
  private _layers: Array<CanvasLayer> = [];
  private canvasHeight: number;
  private canvasWidth: number;

  constructor(name: string, height: number, width: number) {
    this.canvasHeight = height;
    this.canvasWidth = width;

    this._container = document.createElement('div') as HTMLDivElement;
    this._container.id = name;

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
  }

  public get container() {
    return this._container;
  }

  public get layers() {
    return this._layers;
  }

  addLayer(canvasLayer: CanvasLayer): void;
  addLayer(name: string): CanvasLayer;
  addLayer(layerOrName: CanvasLayer | string): CanvasLayer | void {
    if (typeof layerOrName === 'string') {
      const canvas = document.createElement('canvas') as HTMLCanvasElement;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      canvas.id = layerOrName;
      this._container.appendChild(canvas);

      const layer: CanvasLayer = {
        name: layerOrName,
        canvas: canvas,
      };

      this._layers.push(layer);

      return layer;
    } else {
      this._container.appendChild(layerOrName.canvas);
      this._layers.push(layerOrName);
    }
  }

  getLayer(index: number): CanvasLayer | undefined;
  getLayer(name: string): CanvasLayer | undefined;
  getLayer(indexOrName: number | string): CanvasLayer | undefined {
    if (typeof indexOrName == 'number') {
      return this._layers[indexOrName];
    } else {
      for (const layer of this._layers) {
        if (layer.name === indexOrName) return layer;
      }
    }
    return undefined;
  }

  removeLayer(index: number): void;
  removeLayer(name: string): void;
  removeLayer(indexOrName: number | string): void {
    let nodeToRemove: HTMLCanvasElement | undefined = undefined;

    if (typeof indexOrName == 'number') {
      const layer = this.getLayer(indexOrName);
      if (layer) {
        nodeToRemove = layer.canvas;
      }
      this._layers.splice(indexOrName, 1);
    } else {
      const layer = this.getLayer(indexOrName);
      if (layer) {
        nodeToRemove = layer.canvas;
      }
      this._layers = this._layers.filter((layer) => layer.name !== indexOrName);
    }

    if (nodeToRemove) {
      this._container.removeChild(nodeToRemove);
    }
  }
}

export { LayerCanvas, CanvasLayer };
