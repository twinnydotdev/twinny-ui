import { d as store_get, u as unsubscribe_stores, c as pop, p as push } from './index3-DtxWIhGN.js';
import { p as page } from './stores-Tm0oNvlE.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './utils-DUJOOww9.js';
import './client-CnCRRyPd.js';
import './exports-CTha0ECg.js';

function Error($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<h1>${escape_html(store_get($$store_subs ??= {}, "$page", page).status)}</h1> <p>${escape_html(store_get($$store_subs ??= {}, "$page", page).error?.message)}</p>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { Error as default };
//# sourceMappingURL=error.svelte-l5jd_UiP.js.map
