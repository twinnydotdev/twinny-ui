import { h as hydrating } from "./runtime.BnxtgvYn.js";
function set_class(dom, value) {
  var prev_class_name = dom.__className;
  var next_class_name = to_class(value);
  if (hydrating && dom.className === next_class_name) {
    dom.__className = next_class_name;
  } else if (prev_class_name !== next_class_name || hydrating && dom.className !== next_class_name) {
    if (value == null) {
      dom.removeAttribute("class");
    } else {
      dom.className = next_class_name;
    }
    dom.__className = next_class_name;
  }
}
function to_class(value) {
  return value == null ? "" : value;
}
export {
  set_class as s
};
