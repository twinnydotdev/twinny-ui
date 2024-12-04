import { ac as get_first_child, aF as TEMPLATE_FRAGMENT, aG as TEMPLATE_USE_IMPORT_NODE, Q as create_text, x as active_effect, h as hydrating, $ as hydrate_node, V as set_hydrate_node, b as hydrate_next } from "./runtime.BnxtgvYn.js";
function create_fragment_from_html(html) {
  var elem = document.createElement("template");
  elem.innerHTML = html;
  return elem.content;
}
function assign_nodes(start, end) {
  var effect = (
    /** @type {Effect} */
    active_effect
  );
  if (effect.nodes_start === null) {
    effect.nodes_start = start;
    effect.nodes_end = end;
  }
}
// @__NO_SIDE_EFFECTS__
function template(content, flags) {
  var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
  var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
  var node;
  var has_start = !content.startsWith("<!>");
  return () => {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    if (node === void 0) {
      node = create_fragment_from_html(has_start ? content : "<!>" + content);
      if (!is_fragment) node = /** @type {Node} */
      get_first_child(node);
    }
    var clone = (
      /** @type {TemplateNode} */
      use_import_node ? document.importNode(node, true) : node.cloneNode(true)
    );
    if (is_fragment) {
      var start = (
        /** @type {TemplateNode} */
        get_first_child(clone)
      );
      var end = (
        /** @type {TemplateNode} */
        clone.lastChild
      );
      assign_nodes(start, end);
    } else {
      assign_nodes(clone, clone);
    }
    return clone;
  };
}
// @__NO_SIDE_EFFECTS__
function template_with_script(content, flags) {
  var fn = /* @__PURE__ */ template(content, flags);
  return () => run_scripts(
    /** @type {Element | DocumentFragment} */
    fn()
  );
}
function run_scripts(node) {
  if (hydrating) return node;
  const is_fragment = node.nodeType === 11;
  const scripts = (
    /** @type {HTMLElement} */
    node.tagName === "SCRIPT" ? [
      /** @type {HTMLScriptElement} */
      node
    ] : node.querySelectorAll("script")
  );
  const effect = (
    /** @type {Effect} */
    active_effect
  );
  for (const script of scripts) {
    const clone = document.createElement("script");
    for (var attribute of script.attributes) {
      clone.setAttribute(attribute.name, attribute.value);
    }
    clone.textContent = script.textContent;
    if (is_fragment ? node.firstChild === script : node === script) {
      effect.nodes_start = clone;
    }
    if (is_fragment ? node.lastChild === script : node === script) {
      effect.nodes_end = clone;
    }
    script.replaceWith(clone);
  }
  return node;
}
function text(value = "") {
  if (!hydrating) {
    var t = create_text(value + "");
    assign_nodes(t, t);
    return t;
  }
  var node = hydrate_node;
  if (node.nodeType !== 3) {
    node.before(node = create_text());
    set_hydrate_node(node);
  }
  assign_nodes(node, node);
  return node;
}
function comment() {
  if (hydrating) {
    assign_nodes(hydrate_node, null);
    return hydrate_node;
  }
  var frag = document.createDocumentFragment();
  var start = document.createComment("");
  var anchor = create_text();
  frag.append(start, anchor);
  assign_nodes(start, anchor);
  return frag;
}
function append(anchor, dom) {
  if (hydrating) {
    active_effect.nodes_end = hydrate_node;
    hydrate_next();
    return;
  }
  if (anchor === null) {
    return;
  }
  anchor.before(
    /** @type {Node} */
    dom
  );
}
const PUBLIC_VERSION = "5";
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
export {
  append as a,
  assign_nodes as b,
  create_fragment_from_html as c,
  comment as d,
  text as e,
  template_with_script as f,
  template as t
};
