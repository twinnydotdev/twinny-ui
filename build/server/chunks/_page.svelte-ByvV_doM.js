import { d as store_get, u as unsubscribe_stores, g as bind_props, c as pop, p as push } from './index3-DtxWIhGN.js';
import { c as URL_VSCODE_MARKETPLACE } from './index4-B-yQ_bQk.js';
import { e as t2 } from './index5-CMKg5tHl.js';
import { a as attr } from './attributes-BeaNKpgU.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './client-CnCRRyPd.js';
import './utils-DUJOOww9.js';
import './index2-LyvPryGv.js';
import './exports-CTha0ECg.js';

const logo = "/_app/immutable/assets/twinny-logo.Bt_Wmo1-.svg";
function Button($$payload, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const { buttonText = "", disabled } = props;
  $$payload.out += `<button${attr("disabled", disabled, true)} class="font-bold py-3 px-6 rounded transition-all duration-200 bg-rose-600">${escape_html(buttonText)}</button>`;
}
function Register($$payload, $$props) {
  push();
  var $$store_subs;
  let { form } = $$props;
  $$payload.out += `<div class="flex flex-col gap-3 items-center justify-center mt-4"><form action="?/register" method="POST" class="flex flex-wrap gap-2 items-center justify-center"><label for="email"><input id="email" name="email" type="email"${attr("placeholder", store_get($$store_subs ??= {}, "$t", t2)("common.subscribe_placeholder"))} class="w-full px-4 text-base font-medium tracking-wide text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm transition-all duration-300 ease-in-out focus:outline-none h-[48px] focus:border-rose-500"></label> `;
  Button($$payload, {
    buttonText: store_get($$store_subs ??= {}, "$t", t2)("common.subscribe")
  });
  $$payload.out += `<!----></form> `;
  if (form?.success) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-center font-bold text-green-500 my-1">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.thanks"))}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (form?.error) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-center font-bold text-red-500 my-1">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.subscribe_error"))}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let form = $$props["form"];
  $$payload.out += `<div><img alt="twinny logo" class="h-32 w-auto mx-auto flex-shrink-0 mt-24 brightness-200 contrast-200"${attr("src", logo)}> <h2 class="flex items-center justify-center pt-10 pb-4 text-white text-xl mx-auto max-w-xl text-center leading-normal">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.subtitle"))}</h2> <div class="flex grow gap-3 items-center justify-center pb-10"><a${attr("href", URL_VSCODE_MARKETPLACE)} target="_blank" rel="noreferrer noopener">`;
  Button($$payload, {
    buttonText: store_get($$store_subs ??= {}, "$t", t2)("common.install")
  });
  $$payload.out += `<!----></a> <a href="/symmetry" target="_blank" rel="noreferrer noopener"><button class="font-bold py-3 px-6 rounded transition-all duration-200 bg-stone-500">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.try-symmetry"))}</button></a></div> <hr class="w-full border-stone-600 mb-6"> <p class="text-center font-bold my-1">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.subscribe_label"))}</p> `;
  Register($$payload, { form });
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { form });
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-ByvV_doM.js.map
