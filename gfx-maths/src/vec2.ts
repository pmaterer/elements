import { nearlyEquals } from './utils';

export default class vec2 {
  private values = new Float32Array(2);

  static readonly zero = new vec2([0, 0]);
  static readonly one = new vec2([1, 1]);
  // static haveSameDirection(v1: vec2, v2: vec2): boolean {
  //   const dotProduct = v1.normalize().dot(v2.normalize());
  //   return nearlyEquals(dotProduct, 1);
  // }

  // static haveOppositeDirection(v1: vec2, v2: vec2): boolean {
  //   const dotProduct = v1.normalize().dot(v2.normalize());
  //   return nearlyEquals(dotProduct, -1);
  // }

  // static arePerpendicular(v1: vec2, v2: vec2): boolean {
  //   const dotProduct = v1.normalize().dot(v2.normalize());
  //   return nearlyEquals(dotProduct, 0);
  // }

  get x(): number {
    return this.values[0];
  }

  set x(value: number) {
    this.values[0] = value;
  }

  get y(): number {
    return this.values[1];
  }

  set y(value: number) {
    this.values[1] = value;
  }

  get xy(): [number, number] {
    return [this.values[0], this.values[1]];
  }

  set xy(values: [number, number]) {
    this.values[0] = values[0];
    this.values[1] = values[1];
  }

  constructor(values?: [number, number]) {
    if (values !== undefined) {
      this.xy = values;
    }
  }

  copy(): vec2 {
    const dest = new vec2();
    dest.x = this.x;
    dest.y = this.y;
    return dest;
  }

  equals(v: vec2): boolean {
    if (!nearlyEquals(this.x, v.x)) return false;
    if (!nearlyEquals(this.y, v.y)) return false;
    return true;
  }

  negate(dest?: vec2): vec2 {
    if (!dest) dest = this;

    dest.x = -this.x;
    dest.y = -this.y;

    return dest;
  }

  squaredLength(): number {
    return this.x * this.x + this.y * this.y;
  }

  length(): number {
    return Math.sqrt(this.squaredLength());
  }

  add(v: vec2): vec2 {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  subtract(v: vec2): vec2 {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  multiply(v: vec2): vec2 {
    this.x *= v.x;
    this.y *= v.y;

    return this;
  }

  divide(v: vec2): vec2 {
    this.x /= v.x;
    this.y /= v.y;

    return this;
  }

  scale(scalar: number): vec2 {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  normalize(): vec2 {
    let length = this.length();

    if (length === 1) {
      return this;
    }

    if (length === 0) {
      this.x = 0;
      this.y = 0;

      return this;
    }

    length = 1.0 / length;

    this.x *= length;
    this.y *= length;

    return this;
  }

  dot(v: vec2): number {
    return this.x * v.x + this.y * v.y;
  }

  squaredDistance(v: vec2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  distance(v: vec2): number {
    return Math.sqrt(this.squaredDistance(v));
  }

  // cross(v: vec2): vec2 {  }
}
