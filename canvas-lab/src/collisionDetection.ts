// http://www.jeffreythompson.org/collision-detection/table_of_contents.php
import { Game } from './engine/Game';
import { Vec2 } from './engine/math';

import { Rectangle, Circle } from './engine/Shapes';
import { getRandomInt } from './engine/utils';

const GAME_HEIGHT = 600;
const GAME_WIDTH = 1200;

const rectangles: Rectangle[] = [];
const numberOfRectangles = 6;
const rectangleWidth = 40;
const rectangleHeight = 40;

for (let i = 0; i < numberOfRectangles; i++) {
  const r = new Rectangle(
    rectangleWidth,
    rectangleHeight,
    new Vec2(
      getRandomInt(0, GAME_WIDTH - rectangleWidth),
      getRandomInt(0, GAME_HEIGHT - rectangleHeight)
    ),
    new Vec2(getRandomInt(100, 300), getRandomInt(100, 300))
  );
  rectangles.push(r);
}

const circles: Circle[] = [];
const numberOfCircles = 4;
const circleRadius = 30;

for (let i = 0; i < numberOfCircles; i++) {
  const c = new Circle(
    circleRadius,
    new Vec2(
      getRandomInt(0, GAME_WIDTH - circleRadius),
      getRandomInt(0, GAME_HEIGHT - circleRadius)
    ),
    new Vec2(getRandomInt(100, 300), getRandomInt(100, 300))
  );
  // c.toggleShowDirection();
  circles.push(c);
}

const game = new Game('game', GAME_HEIGHT, GAME_WIDTH);

rectangles.forEach((rectangle) => game.addEntity(rectangle));
circles.forEach((circle) => game.addEntity(circle));
