export default class Component {
  // static name = "Unnamed Component";

  constructor() {
    throw Error("Cannot instantiate class Component")
  }

  static get props() {
    let allProps = [];
    for (let prop in this) {
      allProps.push(prop);
    }
    return allProps;
  }
}