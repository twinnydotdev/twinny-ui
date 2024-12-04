import { a as append, t as template } from "../chunks/disclose-version.MsUyedxE.js";
import "../chunks/legacy.B3OkvZeC.js";
import { t as template_effect, c as child, o as get, K as mutable_state, s as sibling, r as reset, w as set } from "../chunks/runtime.BnxtgvYn.js";
import { e as event } from "../chunks/events.DDYLEkdX.js";
import { i as if_block } from "../chunks/if.BZevqZ9O.js";
import { s as set_attribute } from "../chunks/attributes.nWpjpnK-.js";
var root_1 = template(`<svg class="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
var root_2 = template(`<svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`);
var root_3 = template(`<div class="text-sm text-green-400">Address copied to clipboard!</div>`);
var root = template(`<div class="flex flex-col items-center gap-4 p-6"><div class="flex items-center gap-2 text-lg font-medium"><span class="text-red-500">₿</span> <span>im hungry, please send bitcorns</span></div> <div class="relative group"><div class="flex items-center gap-3 bg-stone-900 rounded-lg p-4 pr-12 border border-stone-500 hover:border-gray-600 transition-colors cursor-pointer" role="button" tabindex="0" aria-label="Click to copy Bitcoin address"><code class="font-mono text-sm text-gray-300 break-all"></code> <button class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-stone-800 hover:bg-gray-700 transition-colors"><!></button></div></div> <!></div>`);
function _page($$anchor) {
  let copied = mutable_state(false);
  const bitcoinAddress = "1PVavNkMmBmUz8nRYdnVXiTgXrAyaxfehj";
  async function copyToClipboard() {
    await navigator.clipboard.writeText(bitcoinAddress);
    set(copied, true);
    setTimeout(
      () => {
        set(copied, false);
      },
      2e3
    );
  }
  var div = root();
  var div_1 = sibling(child(div), 2);
  var div_2 = child(div_1);
  var code = child(div_2);
  code.textContent = bitcoinAddress;
  var button = sibling(code, 2);
  var node = child(button);
  if_block(
    node,
    () => get(copied),
    ($$anchor2) => {
      var svg = root_1();
      append($$anchor2, svg);
    },
    ($$anchor2) => {
      var svg_1 = root_2();
      append($$anchor2, svg_1);
    }
  );
  reset(button);
  reset(div_2);
  reset(div_1);
  var node_1 = sibling(div_1, 2);
  if_block(node_1, () => get(copied), ($$anchor2) => {
    var div_3 = root_3();
    append($$anchor2, div_3);
  });
  reset(div);
  template_effect(() => set_attribute(button, "aria-label", get(copied) ? "Copied!" : "Copy to clipboard"));
  event("click", div_2, copyToClipboard);
  event("keydown", div_2, (e) => e.key === "Enter" && copyToClipboard());
  append($$anchor, div);
}
export {
  _page as component
};
