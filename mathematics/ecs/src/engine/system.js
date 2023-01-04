export class System {
  dependencies = [];
  world = null;
  constructor(world) {
    this.world = world;
  }
  onInit = (entities) => { };
  onUpdate = (entities) => { };
}