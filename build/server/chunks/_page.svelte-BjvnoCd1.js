import { e as ensure_array_like, d as store_get, m as stringify, u as unsubscribe_stores, c as pop, p as push } from './index3-DtxWIhGN.js';
import { e as t2 } from './index5-CMKg5tHl.js';
import { o as onDestroy } from './index-server-BHrvRbIP.js';
import { U as URL_GITHUB } from './index4-B-yQ_bQk.js';
import { g as getShortId } from './index6-BKVqErUh.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as attr } from './attributes-BeaNKpgU.js';
import './utils-DUJOOww9.js';
import './index2-LyvPryGv.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let ws;
  let stats = {
    activeModels: 0,
    activePeers: 0,
    averageSessionMinutes: 0,
    totalProviderTime: 0,
    totalRequests: 0,
    totalRequestsToday: 0,
    totalSessions: 0,
    uniquePeerCount: 0
  };
  let peers = [];
  onDestroy(() => ws?.close());
  const each_array = ensure_array_like(Object.entries(stats));
  const each_array_1 = ensure_array_like([
    [URL_GITHUB, "symmetry_github_repo", "<>"]
  ]);
  const each_array_2 = ensure_array_like([
    "model",
    "name",
    "online",
    "provider",
    "total_requests",
    "tokens_per_sec",
    "total_tokens",
    "up_time_minutes",
    "chat"
  ]);
  const each_array_3 = ensure_array_like(peers);
  const each_array_4 = ensure_array_like(peers);
  $$payload.out += `<div class="min-h-screen bg-stone-900 text-stone-100 p-6"><div class="max-w-7xl mx-auto space-y-8"><div class="border-b border-stone-800 pb-6"><h2 class="text-3xl font-bold text-stone-100 mb-2">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.symmetry"))}</h2> <p class="text-stone-400">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.access"))}</p></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">Connection lost. Attempting to reconnect...</div>`;
  }
  $$payload.out += `<!--]--> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [key, value] = each_array[$$index];
    $$payload.out += `<div class="bg-gradient-to-br from-stone-800 to-stone-900 p-6 rounded-xl shadow-lg"><div class="flex items-center gap-4"><div class="rounded-lg"><div class="text-stone-100">`;
    if (key === "activeModels") {
      $$payload.out += "<!--[-->";
      $$payload.out += `🤖`;
    } else {
      $$payload.out += "<!--[!-->";
      if (key === "activePeers") {
        $$payload.out += "<!--[-->";
        $$payload.out += `⚡`;
      } else {
        $$payload.out += "<!--[!-->";
        if (key === "uniquePeerCount") {
          $$payload.out += "<!--[-->";
          $$payload.out += `👥`;
        } else {
          $$payload.out += "<!--[!-->";
          if (key === "averageSessionMinutes") {
            $$payload.out += "<!--[-->";
            $$payload.out += `⏱️`;
          } else {
            $$payload.out += "<!--[!-->";
            if (key === "totalProviderTime") {
              $$payload.out += "<!--[-->";
              $$payload.out += `⌛`;
            } else {
              $$payload.out += "<!--[!-->";
              if (key === "totalRequests") {
                $$payload.out += "<!--[-->";
                $$payload.out += `📊`;
              } else {
                $$payload.out += "<!--[!-->";
                if (key === "totalRequestsToday") {
                  $$payload.out += "<!--[-->";
                  $$payload.out += `📈`;
                } else {
                  $$payload.out += "<!--[!-->";
                  $$payload.out += `📝`;
                }
                $$payload.out += `<!--]-->`;
              }
              $$payload.out += `<!--]-->`;
            }
            $$payload.out += `<!--]-->`;
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div></div> <div><p class="text-sm font-medium text-stone-400">${escape_html(store_get($$store_subs ??= {}, "$t", t2)(`common.${key}`))}</p> <p class="text-3xl font-bold">${escape_html(value)}</p></div></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="space-y-6"><h3 class="text-2xl font-bold">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.become_a_provider"))}</h3> <div class="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-6 shadow-lg space-y-6"><p class="text-stone-300">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.become_a_provider_description"))}</p> <div class="space-y-4"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let [url, key, icon] = each_array_1[$$index_1];
    $$payload.out += `<a${attr("href", url)} class="block p-4 bg-stone-700/50 rounded-lg hover:bg-stone-700 transition-colors"><div class="flex items-center gap-4"><div class="p-2 bg-rose-500/10 rounded-lg"><div class="text-rose-500">${escape_html(icon)}</div></div> <div><p class="font-medium">${escape_html(store_get($$store_subs ??= {}, "$t", t2)(`common.${key}`))}</p></div></div></a>`;
  }
  $$payload.out += `<!--]--></div></div></div> <div class="bg-stone-800 rounded-xl overflow-hidden shadow-lg"><div class="hidden md:block overflow-x-auto"><table class="w-full text-sm"><thead class="bg-stone-700"><tr><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let header = each_array_2[$$index_2];
    $$payload.out += `<th${attr("class", `px-6 py-4 text-left font-semibold ${stringify(header === "provider" ? "hidden lg:table-cell" : "")} ${stringify(header === "tokens_per_sec" ? "hidden xl:table-cell" : "")}`)}>${escape_html(store_get($$store_subs ??= {}, "$t", t2)(`common.${header}`))}</th>`;
  }
  $$payload.out += `<!--]--></tr></thead><tbody class="divide-y divide-stone-700"><!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let peer = each_array_3[$$index_3];
    $$payload.out += `<tr class="hover:bg-stone-700/30 transition-colors"><td class="px-6 py-4">${escape_html(getShortId(peer.model_name, 10, 10))}</td><td class="px-6 py-4">${escape_html(getShortId(peer.name, 10, 10))}</td><td class="px-6 py-4"><span${attr("class", `inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${stringify(peer.online ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}`)}>${escape_html(peer.online ? "Online" : "Offline")}</span></td><td class="px-6 py-4 hidden lg:table-cell">${escape_html(peer.provider || "unknown")}</td><td class="px-6 py-4">${escape_html(peer.total_requests || 0)}</td><td class="px-6 py-4 hidden xl:table-cell">${escape_html(Math.round(peer.avg_tokens_per_second || 0))}</td><td class="px-6 py-4">${escape_html(peer.total_tokens || 0)}</td><td class="px-6 py-4">${escape_html(peer.duration_minutes || 0)}</td><td class="px-6 py-4">`;
    if (peer.online) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<a${attr("href", `/chat?model=${stringify(peer.model_name)}`)}><button class="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition-colors">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.chat"))}</button></a>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-stone-500">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.offline"))}</span>`;
    }
    $$payload.out += `<!--]--></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div> <div class="md:hidden divide-y divide-stone-700"><!--[-->`;
  for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
    let peer = each_array_4[$$index_4];
    $$payload.out += `<div class="p-4 space-y-4"><div class="flex justify-between items-start"><div><p class="font-medium">${escape_html(getShortId(peer.model_name))}</p> <p class="text-sm text-stone-400">${escape_html(peer.name)}</p></div> <span${attr("class", `inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${stringify(peer.online ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}`)}>${escape_html(peer.online ? "Online" : "Offline")}</span></div> <div class="grid grid-cols-2 gap-4 text-sm"><div><p class="text-stone-400">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.provider"))}</p> <p>${escape_html(peer.provider || "unknown")}</p></div> <div><p class="text-stone-400">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.total_requests"))}</p> <p>${escape_html(peer.total_requests || 0)}</p></div> <div><p class="text-stone-400">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.total_tokens"))}</p> <p>${escape_html(peer.total_tokens || 0)}</p></div> <div><p class="text-stone-400">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.up_time_minutes"))}</p> <p>${escape_html(peer.duration_minutes || 0)}</p></div></div> `;
    if (peer.online) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<a${attr("href", `/chat?model=${stringify(peer.model_name)}`)}><button class="w-full mt-3 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition-colors">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.chat"))}</button></a>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div><div class="flex justify-end items-center mt-8 text-rose-500 font-medium"><a href="/privacy">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.privacy_policy"))}</a></div></div></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BjvnoCd1.js.map
