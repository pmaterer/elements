import { nearlyEquals } from './utils';

export default class mat2 {
  private values = new Float32Array(4);

  static readonly identity = new mat2([1, 0, 0, 1]);

  constructor(values?: number[]) {
    if (values !== undefined) {
      for (let i = 0; i < 4; i++) {
        this.values[i] = values[i];
      }
    }
  }

  at(index: number): number {
    return this.values[index];
  }

  all(): number[] {
    const values: number[] = [];
    for (let i = 0; i < 4; i++) {
      values[i] = this.values[i];
    }

    return values;
  }

  row(index: number): number[] {
    return [this.values[index * 2 + 0], this.values[index * 2 + 1]];
  }

  col(index: number): number[] {
    return [this.values[index], this.values[index + 2]];
  }

  equals(m: mat2): boolean {
    for (let i = 0; i < 4; i++) {
      if (!nearlyEquals(this.values[i], m.at(i))) return false;
    }

    return true;
  }

  determinant(): number {
    return this.values[0] * this.values[3] - this.values[2] * this.values[1];
  }

  transposed(): mat2 {
    return new mat2([
      this.values[0],
      this.values[2],
      this.values[1],
      this.values[3]
    ]);
  }

  inversed(): mat2 {
    let det = this.determinant();
    det = 1.0 / det;

    const a11 = this.values[0];
    const values: number[] = [];

    values[0] = det * this.values[3];
    values[1] = det * -this.values[1];
    values[2] = det * -this.values[2];
    values[3] = det * a11;

    return new mat2(values);
  }

  multiplied(m: mat2): mat2 {
    const a11 = this.values[0];
    const a12 = this.values[1];
    const a21 = this.values[2];
    const a22 = this.values[3];

    const values: number[] = [];

    values[0] = a11 * m.at(0) + a12 * m.at(2);
    values[1] = a11 * m.at(1) + a12 * m.at(3);
    values[2] = a21 * m.at(0) + a22 * m.at(2);
    values[3] = a21 * m.at(1) + a22 * m.at(3);

    return new mat2(values);
  }

  rotated(angle: number): mat2 {
    const a11 = this.values[0];
    const a12 = this.values[1];
    const a21 = this.values[2];
    const a22 = this.values[3];

    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const values: number[] = [];
    values[0] = a11 * cos + a12 * sin;
    values[1] = a11 * -sin + a12 * cos;
    values[2] = a21 * cos + a22 * sin;
    values[3] = a21 * -sin + a22 * cos;

    return new mat2(values);
  }

  toString(): string {
    return `[${this.values.toString()}]`;
  }
}
