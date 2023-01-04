export class World {
  addons = [];
  systems = [];
  entities = [];

  constructor(props = { addons: [], systems: [] }) {
    this.addons = props.addons;
    props.systems.forEach((system) => {
      this.systems = [...this.systems, new system(this)]
    })
  }

  addEntity(entity) {
    this.entities.add(entity);
  }

  removeEntity(entity) {
    if (this.entities.indexOf(entity) === -1)
      return console.warn(`Cannot remove entity from world ${entity}`)
    this.entities.splice(this.entities.indexOf(entity), 1)
  }

  getEntitiesWithComponents(components) {
    return components.length ? this.entities.filter((entity) => components.every((component) => entity.components.indexOf(component.name) >= 0)) : this.entities;
  }


  getEntitiesOfType(entityConstructor) {
    return this.entities.filter(
      (entity) => entity.constructor === entityConstructor
    )
  }

  getEntityById(id) {
    return this.entities.find((entity) => entity.id === id)
  }

  start() {
    console.log("world.start()")
    for (let a = 0; a < this.addons.length; a++) {
      const addon = this.addons[a];
      addon.onInit(this);
    }
    for (let s = 0; s < this.systems.length; s++) {
      const system = this.systems[s];
      const entities = this.getEntitiesWithComponents(system.dependencies);
      system.onInit(entities);
    }
  }

  update(time) {
    console.log(`world.update(${time})`)
    for (let a = 0; a < this.addons.length; a++) {
      const addon = this.addons[a];
      addon.onBeforeUpdate(this, time);
    }
    for (let s = 0; s < this.systems.length; s++) {
      const system = this.systems[s];
      const entities = this.getEntitiesWithComponents(system.dependencies);
      system.onUpdate(entities);
    }
    for (let a = 0; a < this.addons.length; a++) {
      const addon = this.addons[a];
      addon.onAfterUpdate(this, time);
    }
  }

}