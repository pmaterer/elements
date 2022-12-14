import vec2 from './vec2';
import mat2 from './mat2';
import { nearlyEquals } from './utils';

export { vec2 as Vec2 };

const m1 = new mat2();
const m2 = new mat2([4, 2, 3, 1.1]);

console.log(m1.toString());
console.log(m2.toString());

console.log(m2.at(2));
console.log(m2.all());
console.log(m2.row(1));

const m3 = new mat2([4, 2, 3, 1.2]);
console.log(m2.equals(m3));
console.log(m2.determinant());
