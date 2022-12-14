import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./reset.css";
import "./styles.css";

ReactDOM.render(<App />, document.getElementById("app"));


// import { Line, Segment } from "./euclid/shapes";
// import Vec2 from "./Vec2";
// import { ORIGIN } from "./constants";

// let v1 = new Vec2(2, -4);

// let l1 = new Line(ORIGIN, v1);
// let s1 = new Segment(ORIGIN, v1);

// console.log(s1.id)