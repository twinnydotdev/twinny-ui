import { G as component_context, N as lifecycle_outside_component, l as legacy_mode_flag, F as user_effect, u as untrack, O as lifecycle_legacy_only } from "./runtime.BnxtgvYn.js";
function onMount(fn) {
  if (component_context === null) {
    lifecycle_outside_component();
  }
  if (legacy_mode_flag && component_context.l !== null) {
    init_update_callbacks(component_context).m.push(fn);
  } else {
    user_effect(() => {
      const cleanup = untrack(fn);
      if (typeof cleanup === "function") return (
        /** @type {() => void} */
        cleanup
      );
    });
  }
}
function onDestroy(fn) {
  if (component_context === null) {
    lifecycle_outside_component();
  }
  onMount(() => () => untrack(fn));
}
function beforeUpdate(fn) {
  if (component_context === null) {
    lifecycle_outside_component();
  }
  if (component_context.l === null) {
    lifecycle_legacy_only();
  }
  init_update_callbacks(component_context).b.push(fn);
}
function afterUpdate(fn) {
  if (component_context === null) {
    lifecycle_outside_component();
  }
  if (component_context.l === null) {
    lifecycle_legacy_only();
  }
  init_update_callbacks(component_context).a.push(fn);
}
function init_update_callbacks(context) {
  var l = (
    /** @type {ComponentContextLegacy} */
    context.l
  );
  return l.u ?? (l.u = { a: [], b: [], m: [] });
}
export {
  onDestroy as a,
  afterUpdate as b,
  beforeUpdate as c,
  onMount as o
};
