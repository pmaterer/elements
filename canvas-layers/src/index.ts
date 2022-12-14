import { LayerCanvas } from './LayerCanvas';

let secondsPassed = 0;
let previousTimestamp = 0;

let secondsAcculm = 0;

let layerThreeOn = true;

const WIDTH = 400;
const HEIGHT = 400;

const rootContainer = document.getElementById('root');

if (rootContainer === null) {
  throw new Error('Cannot get root container');
}

const layerCanvas = new LayerCanvas('main', WIDTH, HEIGHT);
rootContainer.appendChild(layerCanvas.container);
const canvasOne = layerCanvas.addLayer('one');
const canvasTwo = layerCanvas.addLayer('two');
const canvasThree = layerCanvas.addLayer('three');

const ctx1 = canvasOne.canvas.getContext('2d');
const ctx2 = canvasTwo.canvas.getContext('2d');
const ctx3 = canvasThree.canvas.getContext('2d');

if (ctx1) {
  ctx1.fillStyle = 'blue';
  ctx1.fillRect(0, 0, WIDTH, HEIGHT);
}

if (ctx2) {
  ctx2.fillStyle = 'red';
  ctx2.fillRect(10, 10, 70, 70);
}

if (ctx3) {
  ctx3.fillStyle = 'green';
  ctx3.fillRect(20, 20, 100, 100);
}

window.requestAnimationFrame((timestamp: number) => {
  draw(layerCanvas, timestamp);
});

function draw(layerCanvas: LayerCanvas, timestamp: number) {
  secondsPassed = (timestamp - previousTimestamp) / 1000;
  previousTimestamp = timestamp;

  secondsAcculm += secondsPassed;

  if (Math.round(secondsAcculm) == 1) {
    if (layerThreeOn) {
      layerCanvas.removeLayer('three');
      layerThreeOn = false;
    } else {
      layerCanvas.addLayer(canvasThree);
      layerThreeOn = true;
    }
    secondsAcculm = 0;
  }

  window.requestAnimationFrame((timestamp: number) => {
    draw(layerCanvas, timestamp);
  });
}
