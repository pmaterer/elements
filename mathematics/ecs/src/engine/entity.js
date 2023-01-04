import { v4 as uuidv4 } from "uuid";

export class Entity {
  id = uuidv4();
  components = [];
  world = null;

  // static name = "Entity";
  static components = [];

  constructor(world, values) {
    this.world = world;
    this.constructor.components.forEach((component) => {
      this.addComponent(component, values);
    })
  }

  addComponent(component, values = {}) {
    component.props.forEach((prop) => {
      if (component[prop] && prop !== "name") {
        if (this[prop]) console.warn(`Entity prop ${prop} overwrite by component ${component.name}`)
        this[prop] = values[prop] ? values[prop] : component[prop];
      }
    });
    this.components.push(component.name);
  }

  removeComponent(component, shouldClean = false) {
    if (this.components.indexOf(component.name) === -1) return;
    this.components.splice(this.components.indexOf(component.name), 1);
    if (!component.props || !shouldClean) return;
    component.props.forEach((prop) => {
      delete this[prop];
    })
  }

  serialize() {
    let data = {};
    Object.keys(this).forEach((prop) => {
      prop !== "world" ? (data[prop] = this[prop]) : false
    })
    return JSON.stringify(data);
  }

  unserialize(json) {
    const props = JSON.parse(json);
    Object.keys(props).forEach((prop) => {
      this[prop] = props[prop];
    });
  }

  destroy() {
    this.world.removeEntity(this);
  }

}