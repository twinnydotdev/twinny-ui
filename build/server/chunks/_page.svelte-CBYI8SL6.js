import { a as attr } from './attributes-BeaNKpgU.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function _page($$payload) {
  const bitcoinAddress = "1PVavNkMmBmUz8nRYdnVXiTgXrAyaxfehj";
  $$payload.out += `<div class="flex flex-col items-center gap-4 p-6"><div class="flex items-center gap-2 text-lg font-medium"><span class="text-red-500">₿</span> <span>im hungry, please send bitcorns</span></div> <div class="relative group"><div class="flex items-center gap-3 bg-stone-900 rounded-lg p-4 pr-12 border border-stone-500 hover:border-gray-600 transition-colors cursor-pointer" role="button" tabindex="0" aria-label="Click to copy Bitcoin address"><code class="font-mono text-sm text-gray-300 break-all">${escape_html(bitcoinAddress)}</code> <button class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-stone-800 hover:bg-gray-700 transition-colors"${attr("aria-label", "Copy to clipboard")}>`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`;
  }
  $$payload.out += `<!--]--></button></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CBYI8SL6.js.map
