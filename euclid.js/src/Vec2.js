import { v4 as uuidv4 } from "uuid";

export default class Vec2 {
  constructor(x, y) {
    this.id = uuidv4();
    this.x = x;
    this.y = y;
  }

  add(v) {
    if (v instanceof Vec2) return new Vec2(this.x + v.x, this.y + v.y);
    else if (typeof v == "number") return new Vec2(this.x + v, this.y + v);
    else throw `Vec2: cannot add type of ${typeof v}`;
  }

  subtract(v) {
    if (v instanceof Vec2) return new Vec2(this.x - v.x, this.y - v.y);
    else if (typeof v == "number") return new Vec2(this.x - v, this.y - v);
    else throw `Vec2: cannot subtract type of ${typeof v}`;
  }

  multiply(v) {
    if (v instanceof Vec2) return new Vec2(this.x * v.x, this.y * v.y);
    else if (typeof v == "number") return new Vec2(this.x * v, this.y * v);
    else throw `Vec2: cannot multiply type of ${typeof v}`;
  }

  divide(v) {
    if (v instanceof Vec2) return new Vec2(this.x / v.x, this.y / v.y);
    else if (typeof v == "number") return new Vec2(this.x / v, this.y / v);
    else throw `Vec2: cannot multiply type of ${typeof v}`;
  }

  equals(v) {
    return this.x == v.x && this.y == v.y;
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  length() {
    return Math.sqrt(this.dot(this));
  }

  unit() {
    return this.divide(this.length);
  }
}
