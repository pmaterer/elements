import { Addon } from "../addon";

let raf = null;
export class Loop extends Addon {
  static loop = (world) => {
    raf = requestAnimationFrame(world.update.bind(world));
  }
  static stop = () => {
    cancelAnimationFrame(raf);
    raf = null
  }
  static onInit = (world) => {
    Loop.loop(world)
  };
  static onBeforeUpdate = (world) => {
    Loop.loop(world);
  };
  static get isRunning() {
    return raf != null
  }
}