import { Vec2 } from '@materer/maths';
import { ORIGIN } from './constants';
import { Circle, Point, Segment } from './Primitives';
import World from './World';

const dimensions: Dimensions = {
  min: -20,
  max: 20,
};

const gridColors: GridColors = {
  background: '#221529',
  majorLines: '#879ba3',
  axisLines: '#d64562',
};

const color: ColorPalette = {
  background: '#28282e',
  gridLines: '#fff7e4',
  axisLines: '#ffe6c6',
  lines: ['#accce4', '#87a889'],
  fills: ['#b3e3da', '#b0eb93'],
};

const WIDTH = 900;
const HEIGHT = 900;

const world = new World(WIDTH, HEIGHT, dimensions, 'root');

// const p1 = new Point(new Vec2(2, 2), '#8cde8c');
// world.addEntity(p1);

// const c = new Circle(new Vec2(10, 10), 2, '#bfb471', '#750e1b', true);
// world.addEntity(c);

// const v1 = new Segment(ORIGIN, new Vec2(4, 1), color.lines[0]);
// world.addEntity(v1);

const v1 = new Vec2(4, 2);

const s1 = new Segment(ORIGIN, v1, color.lines[0]);

world.addEntity(s1);

const s2 = new Segment(ORIGIN, v1.add(new Vec2(2, 2)), color.lines[1]);
world.addEntity(s2);

const domm = new DOMMatrix();
console.log(domm);

requestAnimationFrame(world.loop);
