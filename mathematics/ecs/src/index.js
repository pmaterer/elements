import Component from "./engine/components/component";
import { Entity } from "./engine/entity";
import { System } from "./engine/system";
import { Renderer } from "./engine/addons/canvasRenderer";
import { Loop } from "./engine/addons/loop";
import { World } from "./engine/world"

Renderer.setup(
  document.getElementById('app'), 400, 500
);

class Position extends Component {
  // static name = "position";
  static position = { x: 0, y: 0 };
}

class Size extends Component {
  // static name = "size";
  static size = 10;
}

class Renderable extends Component {
  // static name = "renderable";
  static color = `rgba(50, 255, 255, 1.0)`;
}

class Rectangle extends Entity {
  static components = [Position, Size, Renderable];
}

class RectangleRenderer extends System {
  dependencies = [Position, Size, Renderable];
  onUpdate = (entities) => {
    entities.forEach(entity => {
      Renderer.ctx.beginPath();
      Renderer.ctx.fillStyle = "#fff";
      Renderer.ctx.rect(0, 0, 200, 200);
      // Renderer.ctx.moveTo(entity.position.x * Renderer.worldScale, entity.position.y * Renderer);
      // Renderer.ctx.lineTo(entity.size * Renderer.worldScale, entity.size * Renderer);
      Renderer.ctx.fill();
      Renderer.ctx.closePath();
    })
  }
}



console.log(Renderer)

const world = new World({
  // addons: [Renderer, Loop],
  addons: [Renderer],
  systems: [
    RectangleRenderer
  ]
});

const rect = new Rectangle(world, {
  position: {
    x: 100,
    y: 100
  },
  size: 40
});

world.start();