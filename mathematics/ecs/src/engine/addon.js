export class Addon {
  constructor() {
    throw Error("Cannot instantiate class Addon");
  }

  static onInit = (world) => { };
  static onBeforeUpdate = (world, time) => { };
  static onAfterUpdate = (world, time) => { };
}