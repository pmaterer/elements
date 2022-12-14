import { Grid } from './Grid';
import { World } from './World';

const dimensions: Dimensions = {
  min: -20,
  max: 20
};

const gridColors: GridColors = {
  background: '#221529',
  majorLines: '#879ba3',
  axisLines: '#d64562'
};

const WIDTH = 900;
const HEIGHT = 900;

const world = new World(WIDTH, HEIGHT, dimensions, 'root');

console.log('Running!');

requestAnimationFrame(world.loop);
