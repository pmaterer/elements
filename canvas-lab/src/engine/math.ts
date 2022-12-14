class Vec2 {
  constructor(public x: number = 0, public y: number = 0) {}

  add(v: Vec2 | number): Vec2 {
    if (typeof v === 'number') return new Vec2(this.x + v, this.y + v);
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  static add(v1: Vec2, v2: Vec2, dest?: Vec2): Vec2 {
    if (!dest) {
      dest = new Vec2();
    }

    dest.x = v1.x + v2.x;
    dest.y = v1.y + v2.y;

    return dest;
  }

  subtract(v: Vec2 | number): Vec2 {
    if (typeof v === 'number') return new Vec2(this.x - v, this.y - v);
    return new Vec2(this.x - v.x, this.y - v.y);
  }

  static subtract(v1: Vec2, v2: Vec2, dest?: Vec2): Vec2 {
    if (!dest) {
      dest = new Vec2();
    }

    dest.x = v1.x - v2.x;
    dest.y = v1.y - v2.y;

    return dest;
  }

  scale(scalar: number): Vec2 {
    return new Vec2(this.x * scalar, this.y * scalar);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dot(v: Vec2): number {
    return this.x * v.x + this.y * v.y;
  }

  normalize(): Vec2 {
    return this.scale(1 / this.magnitude());
  }

  distance(v: Vec2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

export { Vec2 };
