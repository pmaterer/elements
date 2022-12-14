import { Entity } from './Entity';
import { Circle, Rectangle } from './Shapes';

// https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
const circleRectangleIntersect = (
  rx: number,
  ry: number,
  rw: number,
  rh: number,

  cx: number,
  cy: number,
  cr: number
): boolean => {
  let testX = cx;
  let testY = cy;

  if (cx < rx) testX = rx;
  else if (cx > rx + rw) testX = rx + rw;
  if (cy < ry) testY = ry;
  else if (cy > ry + rh) testY = ry + rh;

  const distX = cx - testX;
  const distY = cy - testY;
  const distance = Math.sqrt(distX * distX + distY * distY);

  if (distance <= cr) {
    return true;
  }
  return false;
};

const isIntersecting = <A extends Entity, B extends Entity>(
  e1: A,
  e2: B
): boolean => {
  if (e1 instanceof Rectangle && e2 instanceof Rectangle) {
    if (
      e2.position.x > e1.width + e1.position.x ||
      e1.position.x > e2.width + e2.position.x ||
      e2.position.y > e1.height + e1.position.y ||
      e1.position.y > e2.height + e2.position.y
    )
      return false;
    return true;
  } else if (e1 instanceof Circle && e2 instanceof Circle) {
    const squareDistance =
      (e1.position.x - e2.position.x) * (e1.position.x - e2.position.x) +
      (e1.position.y - e2.position.y) * (e1.position.y - e2.position.y);
    return squareDistance <= (e1.radius + e2.radius) * (e1.radius + e2.radius);
  } else if (e1 instanceof Circle && e2 instanceof Rectangle) {
    return circleRectangleIntersect(
      e2.position.x,
      e2.position.y,
      e2.width,
      e2.height,
      e1.position.x,
      e1.position.y,
      e1.radius
    );
  } else if (e1 instanceof Rectangle && e2 instanceof Circle) {
    return circleRectangleIntersect(
      e1.position.x,
      e1.position.y,
      e1.width,
      e1.height,
      e2.position.x,
      e2.position.y,
      e2.radius
    );
  } else {
    return false;
  }
};

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export { isIntersecting, getRandomInt };
