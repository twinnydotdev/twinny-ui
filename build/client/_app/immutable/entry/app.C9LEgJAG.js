const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.Be5LYAyK.js","../chunks/index.DdWbHULs.js","../chunks/preload-helper.CAG-2Ty2.js","../chunks/runtime.BnxtgvYn.js","../chunks/index.BOcsL8W8.js","../chunks/utils.CrF-uPqs.js","../chunks/disclose-version.MsUyedxE.js","../chunks/legacy.B3OkvZeC.js","../chunks/store.D5ssPbdD.js","../chunks/events.DDYLEkdX.js","../chunks/each.B_lVq9b9.js","../chunks/slot.C-Yg7316.js","../chunks/lifecycle.D_YzOIEN.js","../chunks/attributes.BaHDbf67.js","../chunks/index.gBqYhdbN.js","../chunks/stores.EYq5kNcp.js","../chunks/entry.Ds2mMouq.js","../assets/0.3WWdF9su.css","../nodes/1.C5-Uh2WH.js","../nodes/2.CUeVThZT.js","../chunks/props.C4h6FEPR.js","../chunks/if.BZevqZ9O.js","../chunks/actions.PjXaC0Mr.js","../chunks/attributes.nWpjpnK-.js","../nodes/3.kSRE6zNr.js","../chunks/marked.esm.DCdqfXa9.js","../chunks/class.DfGxVK-I.js","../chunks/this.9kAdUk7W.js","../chunks/index-client.CIF4T9ze.js","../assets/3.KDujhvHj.css","../nodes/4.0o7cv3zT.js","../assets/4.uO-nhraD.css","../nodes/5.BzN2x3no.js","../nodes/6.BhGoqWt0.js"])))=>i.map(i=>d[i]);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _events, _instance;
import { p as proxy, _ as __vitePreload } from "../chunks/preload-helper.CAG-2Ty2.js";
import { o as get, k as LEGACY_PROPS, w as set, aH as flush_sync, az as define_property, A as mutable_source, p as push, E as user_pre_effect, F as user_effect, aI as tick, f as first_child, a as pop, ar as state, s as sibling, c as child, t as template_effect, r as reset, m as derived } from "../chunks/runtime.BnxtgvYn.js";
import { h as hydrate, m as mount, u as unmount, a as set_text } from "../chunks/store.D5ssPbdD.js";
import { d as comment, a as append, t as template, e as text } from "../chunks/disclose-version.MsUyedxE.js";
import { i as if_block } from "../chunks/if.BZevqZ9O.js";
import { c as component, b as bind_this } from "../chunks/this.9kAdUk7W.js";
import { p as prop } from "../chunks/props.C4h6FEPR.js";
import { o as onMount } from "../chunks/index-client.CIF4T9ze.js";
function asClassComponent(component2) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options) {
      super({
        component: component2,
        ...options
      });
    }
  };
}
class Svelte4Component {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(options) {
    /** @type {any} */
    __privateAdd(this, _events);
    /** @type {Record<string, any>} */
    __privateAdd(this, _instance);
    var _a;
    var sources = /* @__PURE__ */ new Map();
    var add_source = (key, value) => {
      var s = mutable_source(value);
      sources.set(key, s);
      return s;
    };
    const props = new Proxy(
      { ...options.props || {}, $$events: {} },
      {
        get(target, prop2) {
          return get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
        },
        has(target, prop2) {
          if (prop2 === LEGACY_PROPS) return true;
          get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
          return Reflect.has(target, prop2);
        },
        set(target, prop2, value) {
          set(sources.get(prop2) ?? add_source(prop2, value), value);
          return Reflect.set(target, prop2, value);
        }
      }
    );
    __privateSet(this, _instance, (options.hydrate ? hydrate : mount)(options.component, {
      target: options.target,
      anchor: options.anchor,
      props,
      context: options.context,
      intro: options.intro ?? false,
      recover: options.recover
    }));
    if (!((_a = options == null ? void 0 : options.props) == null ? void 0 : _a.$$host) || options.sync === false) {
      flush_sync();
    }
    __privateSet(this, _events, props.$$events);
    for (const key of Object.keys(__privateGet(this, _instance))) {
      if (key === "$set" || key === "$destroy" || key === "$on") continue;
      define_property(this, key, {
        get() {
          return __privateGet(this, _instance)[key];
        },
        /** @param {any} value */
        set(value) {
          __privateGet(this, _instance)[key] = value;
        },
        enumerable: true
      });
    }
    __privateGet(this, _instance).$set = /** @param {Record<string, any>} next */
    (next) => {
      Object.assign(props, next);
    };
    __privateGet(this, _instance).$destroy = () => {
      unmount(__privateGet(this, _instance));
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    __privateGet(this, _instance).$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    __privateGet(this, _events)[event] = __privateGet(this, _events)[event] || [];
    const cb = (...args) => callback.call(this, ...args);
    __privateGet(this, _events)[event].push(cb);
    return () => {
      __privateGet(this, _events)[event] = __privateGet(this, _events)[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    __privateGet(this, _instance).$destroy();
  }
}
_events = new WeakMap();
_instance = new WeakMap();
const matchers = {};
var root_4 = template(`<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>`);
var root$1 = template(`<!> <!>`, 1);
function Root($$anchor, $$props) {
  push($$props, true);
  let components = prop($$props, "components", 23, () => []), data_0 = prop($$props, "data_0", 3, null), data_1 = prop($$props, "data_1", 3, null);
  {
    user_pre_effect(() => $$props.stores.page.set($$props.page));
  }
  user_effect(() => {
    $$props.stores;
    $$props.page;
    $$props.constructors;
    components();
    $$props.form;
    data_0();
    data_1();
    $$props.stores.page.notify();
  });
  let mounted = state(false);
  let navigated = state(false);
  let title = state(null);
  onMount(() => {
    const unsubscribe = $$props.stores.page.subscribe(() => {
      if (get(mounted)) {
        set(navigated, true);
        tick().then(() => {
          set(title, proxy(document.title || "untitled page"));
        });
      }
    });
    set(mounted, true);
    return unsubscribe;
  });
  const Pyramid_1 = derived(() => $$props.constructors[1]);
  var fragment = root$1();
  var node = first_child(fragment);
  if_block(
    node,
    () => $$props.constructors[1],
    ($$anchor2) => {
      var fragment_1 = comment();
      const Pyramid_0 = derived(() => $$props.constructors[0]);
      var node_1 = first_child(fragment_1);
      component(node_1, () => get(Pyramid_0), ($$anchor3, $$component) => {
        bind_this(
          $$component($$anchor3, {
            get data() {
              return data_0();
            },
            get form() {
              return $$props.form;
            },
            children: ($$anchor4, $$slotProps) => {
              var fragment_2 = comment();
              var node_2 = first_child(fragment_2);
              component(node_2, () => get(Pyramid_1), ($$anchor5, $$component2) => {
                bind_this(
                  $$component2($$anchor5, {
                    get data() {
                      return data_1();
                    },
                    get form() {
                      return $$props.form;
                    }
                  }),
                  ($$value) => components()[1] = $$value,
                  () => {
                    var _a;
                    return (_a = components()) == null ? void 0 : _a[1];
                  }
                );
              });
              append($$anchor4, fragment_2);
            },
            $$slots: { default: true }
          }),
          ($$value) => components()[0] = $$value,
          () => {
            var _a;
            return (_a = components()) == null ? void 0 : _a[0];
          }
        );
      });
      append($$anchor2, fragment_1);
    },
    ($$anchor2) => {
      var fragment_3 = comment();
      const Pyramid_0 = derived(() => $$props.constructors[0]);
      var node_3 = first_child(fragment_3);
      component(node_3, () => get(Pyramid_0), ($$anchor3, $$component) => {
        bind_this(
          $$component($$anchor3, {
            get data() {
              return data_0();
            },
            get form() {
              return $$props.form;
            }
          }),
          ($$value) => components()[0] = $$value,
          () => {
            var _a;
            return (_a = components()) == null ? void 0 : _a[0];
          }
        );
      });
      append($$anchor2, fragment_3);
    }
  );
  var node_4 = sibling(node, 2);
  if_block(node_4, () => get(mounted), ($$anchor2) => {
    var div = root_4();
    var node_5 = child(div);
    if_block(node_5, () => get(navigated), ($$anchor3) => {
      var text$1 = text();
      template_effect(() => set_text(text$1, get(title)));
      append($$anchor3, text$1);
    });
    reset(div);
    append($$anchor2, div);
  });
  append($$anchor, fragment);
  pop();
}
const root = asClassComponent(Root);
const nodes = [
  () => __vitePreload(() => import("../nodes/0.Be5LYAyK.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/1.C5-Uh2WH.js"), true ? __vite__mapDeps([18,6,3,7,8,9,5,12,15,16,4]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/2.CUeVThZT.js"), true ? __vite__mapDeps([19,6,3,7,8,9,5,12,20,2,13,14,1,4,21,22,23,16]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/3.kSRE6zNr.js"), true ? __vite__mapDeps([24,6,3,8,9,5,21,10,25,22,23,26,2,27,15,16,4,28,1,7,11,12,20,29]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/4.0o7cv3zT.js"), true ? __vite__mapDeps([30,6,3,7,25,12,31]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/5.BzN2x3no.js"), true ? __vite__mapDeps([32,6,3,7,9,21,23]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/6.BhGoqWt0.js"), true ? __vite__mapDeps([33,6,3,8,9,5,21,10,23,26,2,1,4,28,14]) : void 0, import.meta.url)
];
const server_loads = [0];
const dictionary = {
  "/": [2],
  "/chat": [3],
  "/privacy": [4],
  "/sponsor": [5],
  "/symmetry": [6]
};
const hooks = {
  handleError: ({ error }) => {
    console.error(error);
  },
  reroute: () => {
  }
};
export {
  dictionary,
  hooks,
  matchers,
  nodes,
  root,
  server_loads
};
