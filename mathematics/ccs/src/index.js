import { Vec2 } from "materer-vectors";
import App from "./app";
import { ORIGIN } from "./constants";
import { Label, Segment } from "./shapes";

const canvas = document.getElementById("app");
const app = new App(canvas, 1300, { min: -10, max: 10 });

const colors = {
  red: "#d94179",
  blue: "#4180d9",
  purple: "#8D61A9",
  black: "#000",
};

// addition
// const v1 = new Vec2(4, 4);
// const s1 = new Segment(ORIGIN, v1, "#d94179", "v");
// const v2 = new Vec2(1, 3);
// const s2 = new Segment(ORIGIN, v2, "#4180d9", "u");
// const v3 = v1.add(v2);
// const s3 = new Segment(ORIGIN, v3, "#8D61A9", "v+u");
// const s4 = new Segment(v1, v3, "#4180d9", "u");
// const s5 = new Segment(v2, v3, "#d94179", "v");
// app.add(s1, s2, s3, s4, s5);
// app.draw();

// scalar
// const v1 = new Vec2(4, 2);
// const s1 = new Segment(ORIGIN, v1, colors.red, "v");
// const k = 2;
// const labelPosK = new Vec2(4, -4);
// const scalarLabelK = new Label(labelPosK, colors.black, `scalar k=${k}`);
// const r = -2;
// const labelPosR = new Vec2(4, -4.5);
// const scalarLabelR = new Label(labelPosR, colors.black, `scalar r=${r}`);
// const v2 = v1.scale(k);
// const s3 = new Segment(ORIGIN, v2, colors.blue, "vk")
// const v4 = v1.scale(r);
// const s4 = new Segment(ORIGIN, v4, colors.blue, "vr")
// app.add(scalarLabelK, scalarLabelR, s3, s4, s1);
// app.draw()

// subtraction
// const v = new Vec2(-3, 5);
// const s1 = new Segment(ORIGIN, v, colors.red, "v");
// const negV = v.scale(-1);
// const s4 = new Segment(ORIGIN, negV, colors.red, "-v")
// const u = new Vec2(6, 4);
// const s2 = new Segment(ORIGIN, u, colors.blue, "u")
// const uv = u.subtract(v);
// const s3 = new Segment(ORIGIN, uv, colors.purple, "u-v")
// const s5 = new Segment(u, uv, colors.blue, "-v")
// const s6 = new Segment(v, u, colors.purple, "u-v")
// app.add(s1, s2, s3, s4, s5, s6);





const v1 = new Vec2(-4, 2);
const v2 = new Vec2(4, 1);

const s2 = new Segment(ORIGIN, v1, colors.red, "w");
const s3 = new Segment(ORIGIN, v2, colors.blue, "blah");

let v3 = v1.add(v2);
let s4 = new Segment(ORIGIN, v3, colors.purple, "added");

app.add(s2, s3, s4);

window.requestAnimationFrame(draw);
function draw() {
  v3 = v1.add(v2);
  s4.v2 = v3;

  app.draw();
  window.requestAnimationFrame(draw);
}
