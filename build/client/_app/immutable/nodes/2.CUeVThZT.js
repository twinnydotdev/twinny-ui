import { a as append, t as template } from "../chunks/disclose-version.MsUyedxE.js";
import "../chunks/legacy.B3OkvZeC.js";
import { p as push, t as template_effect, a as pop, c as child, r as reset, s as sibling, o as get, m as derived, n as derived_safe_equal } from "../chunks/runtime.BnxtgvYn.js";
import { s as setup_stores, a as set_text, b as store_get } from "../chunks/store.D5ssPbdD.js";
import { i as init } from "../chunks/lifecycle.D_YzOIEN.js";
import { r as rest_props, p as prop } from "../chunks/props.C4h6FEPR.js";
import { a as attr } from "../chunks/attributes.BaHDbf67.js";
import { a as URL_VSCODE_MARKETPLACE } from "../chunks/index.gBqYhdbN.js";
import { t } from "../chunks/index.DdWbHULs.js";
import { i as if_block } from "../chunks/if.BZevqZ9O.js";
import { a as action } from "../chunks/actions.PjXaC0Mr.js";
import { s as set_attribute } from "../chunks/attributes.nWpjpnK-.js";
import { p as parse, i as invalidateAll, a as applyAction } from "../chunks/entry.Ds2mMouq.js";
const logo = "" + new URL("../assets/twinny-logo.Bt_Wmo1-.svg", import.meta.url).href;
var root$2 = template(`<button class="font-bold py-3 px-6 rounded transition-all duration-200 bg-rose-600"></button>`);
function Button($$anchor, $$props) {
  let props = rest_props($$props, ["$$slots", "$$events", "$$legacy"]);
  const { buttonText = "", disabled } = props;
  var button = root$2();
  button.disabled = disabled;
  button.textContent = buttonText;
  append($$anchor, button);
}
function deserialize(result) {
  const parsed = JSON.parse(result);
  if (parsed.data) {
    parsed.data = parse(parsed.data);
  }
  return parsed;
}
function clone(element) {
  return (
    /** @type {T} */
    HTMLElement.prototype.cloneNode.call(element)
  );
}
function enhance(form_element, submit = () => {
}) {
  const fallback_callback = async ({
    action: action2,
    result,
    reset: reset2 = true,
    invalidateAll: shouldInvalidateAll = true
  }) => {
    if (result.type === "success") {
      if (reset2) {
        HTMLFormElement.prototype.reset.call(form_element);
      }
      if (shouldInvalidateAll) {
        await invalidateAll();
      }
    }
    if (location.origin + location.pathname === action2.origin + action2.pathname || result.type === "redirect" || result.type === "error") {
      applyAction(result);
    }
  };
  async function handle_submit(event) {
    var _a, _b, _c, _d, _e;
    const method = ((_a = event.submitter) == null ? void 0 : _a.hasAttribute("formmethod")) ? (
      /** @type {HTMLButtonElement | HTMLInputElement} */
      event.submitter.formMethod
    ) : clone(form_element).method;
    if (method !== "post") return;
    event.preventDefault();
    const action2 = new URL(
      // We can't do submitter.formAction directly because that property is always set
      ((_b = event.submitter) == null ? void 0 : _b.hasAttribute("formaction")) ? (
        /** @type {HTMLButtonElement | HTMLInputElement} */
        event.submitter.formAction
      ) : clone(form_element).action
    );
    const enctype = ((_c = event.submitter) == null ? void 0 : _c.hasAttribute("formenctype")) ? (
      /** @type {HTMLButtonElement | HTMLInputElement} */
      event.submitter.formEnctype
    ) : clone(form_element).enctype;
    const form_data = new FormData(form_element);
    const submitter_name = (_d = event.submitter) == null ? void 0 : _d.getAttribute("name");
    if (submitter_name) {
      form_data.append(submitter_name, ((_e = event.submitter) == null ? void 0 : _e.getAttribute("value")) ?? "");
    }
    const controller = new AbortController();
    let cancelled = false;
    const cancel = () => cancelled = true;
    const callback = await submit({
      action: action2,
      cancel,
      controller,
      formData: form_data,
      formElement: form_element,
      submitter: event.submitter
    }) ?? fallback_callback;
    if (cancelled) return;
    let result;
    try {
      const headers = new Headers({
        accept: "application/json",
        "x-sveltekit-action": "true"
      });
      if (enctype !== "multipart/form-data") {
        headers.set(
          "Content-Type",
          /^(:?application\/x-www-form-urlencoded|text\/plain)$/.test(enctype) ? enctype : "application/x-www-form-urlencoded"
        );
      }
      const body = enctype === "multipart/form-data" ? form_data : new URLSearchParams(form_data);
      const response = await fetch(action2, {
        method: "POST",
        headers,
        cache: "no-store",
        body,
        signal: controller.signal
      });
      result = deserialize(await response.text());
      if (result.type === "error") result.status = response.status;
    } catch (error) {
      if (
        /** @type {any} */
        (error == null ? void 0 : error.name) === "AbortError"
      ) return;
      result = { type: "error", error };
    }
    callback({
      action: action2,
      formData: form_data,
      formElement: form_element,
      update: (opts) => fallback_callback({
        action: action2,
        result,
        reset: opts == null ? void 0 : opts.reset,
        invalidateAll: opts == null ? void 0 : opts.invalidateAll
      }),
      // @ts-expect-error generic constraints stuff we don't care about
      result
    });
  }
  HTMLFormElement.prototype.addEventListener.call(form_element, "submit", handle_submit);
  return {
    destroy() {
      HTMLFormElement.prototype.removeEventListener.call(form_element, "submit", handle_submit);
    }
  };
}
var root_1 = template(`<p class="text-center font-bold text-green-500 my-1"> </p>`);
var root_2 = template(`<p class="text-center font-bold text-red-500 my-1"> </p>`);
var root$1 = template(`<div class="flex flex-col gap-3 items-center justify-center mt-4"><form action="?/register" method="POST" class="flex flex-wrap gap-2 items-center justify-center"><label for="email"><input id="email" name="email" type="email" class="w-full px-4 text-base font-medium tracking-wide text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm transition-all duration-300 ease-in-out focus:outline-none h-[48px] focus:border-rose-500"></label> <!></form> <!> <!></div>`);
function Register($$anchor, $$props) {
  push($$props, true);
  const $$stores = setup_stores();
  const $t = () => store_get(t, "$t", $$stores);
  var div = root$1();
  var form_1 = child(div);
  var label = child(form_1);
  var input = child(label);
  template_effect(() => set_attribute(input, "placeholder", $t()("common.subscribe_placeholder")));
  reset(label);
  var node = sibling(label, 2);
  var buttonText = derived(() => $t()("common.subscribe"));
  Button(node, {
    get buttonText() {
      return get(buttonText);
    }
  });
  reset(form_1);
  action(form_1, ($$node) => enhance($$node));
  var node_1 = sibling(form_1, 2);
  if_block(node_1, () => {
    var _a;
    return (_a = $$props.form) == null ? void 0 : _a.success;
  }, ($$anchor2) => {
    var p = root_1();
    var text = child(p, true);
    template_effect(() => set_text(text, $t()("common.thanks")));
    reset(p);
    append($$anchor2, p);
  });
  var node_2 = sibling(node_1, 2);
  if_block(node_2, () => {
    var _a;
    return (_a = $$props.form) == null ? void 0 : _a.error;
  }, ($$anchor2) => {
    var p_1 = root_2();
    var text_1 = child(p_1, true);
    template_effect(() => set_text(text_1, $t()("common.subscribe_error")));
    reset(p_1);
    append($$anchor2, p_1);
  });
  reset(div);
  append($$anchor, div);
  pop();
}
var root = template(`<div><img alt="twinny logo" class="h-32 w-auto mx-auto flex-shrink-0 mt-24 brightness-200 contrast-200"${attr("src", logo)}> <h2 class="flex items-center justify-center pt-10 pb-4 text-white text-xl mx-auto max-w-xl text-center leading-normal"> </h2> <div class="flex grow gap-3 items-center justify-center pb-10"><a${attr("href", URL_VSCODE_MARKETPLACE)} target="_blank" rel="noreferrer noopener"><!></a> <a href="/symmetry" target="_blank" rel="noreferrer noopener"><button class="font-bold py-3 px-6 rounded transition-all duration-200 bg-stone-500"> </button></a></div> <hr class="w-full border-stone-600 mb-6"> <p class="text-center font-bold my-1"> </p> <!></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  const $$stores = setup_stores();
  const $t = () => store_get(t, "$t", $$stores);
  let form = prop($$props, "form", 8);
  init();
  var div = root();
  var h2 = sibling(child(div), 2);
  var text = child(h2, true);
  template_effect(() => set_text(text, $t()("common.subtitle")));
  reset(h2);
  var div_1 = sibling(h2, 2);
  var a = child(div_1);
  var node = child(a);
  var buttonText = derived_safe_equal(() => $t()("common.install"));
  Button(node, {
    get buttonText() {
      return get(buttonText);
    }
  });
  reset(a);
  var a_1 = sibling(a, 2);
  var button = child(a_1);
  var text_1 = child(button, true);
  template_effect(() => set_text(text_1, $t()("common.try-symmetry")));
  reset(button);
  reset(a_1);
  reset(div_1);
  var p = sibling(div_1, 4);
  var text_2 = child(p, true);
  template_effect(() => set_text(text_2, $t()("common.subscribe_label")));
  reset(p);
  var node_1 = sibling(p, 2);
  Register(node_1, {
    get form() {
      return form();
    }
  });
  reset(div);
  append($$anchor, div);
  pop();
}
export {
  _page as component
};
