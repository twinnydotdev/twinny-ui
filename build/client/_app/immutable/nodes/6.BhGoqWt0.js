import { a as append, t as template, d as comment, e as text } from "../chunks/disclose-version.MsUyedxE.js";
import { p as push, ar as state, t as template_effect, a as pop, w as set, o as get, c as child, r as reset, s as sibling, f as first_child } from "../chunks/runtime.BnxtgvYn.js";
import { s as setup_stores, a as set_text, b as store_get } from "../chunks/store.D5ssPbdD.js";
import { i as if_block } from "../chunks/if.BZevqZ9O.js";
import { e as each, i as index } from "../chunks/each.B_lVq9b9.js";
import { s as set_attribute } from "../chunks/attributes.nWpjpnK-.js";
import { s as set_class } from "../chunks/class.DfGxVK-I.js";
import { p as proxy } from "../chunks/preload-helper.CAG-2Ty2.js";
import { t } from "../chunks/index.DdWbHULs.js";
import { o as onMount, a as onDestroy } from "../chunks/index-client.CIF4T9ze.js";
import { U as URL_GITHUB } from "../chunks/index.gBqYhdbN.js";
const getShortId = (name, prefixLength = 10, suffixLength = 10) => {
  if (!name) return "";
  if (name.length >= prefixLength + suffixLength) {
    return `${name.substring(0, prefixLength)}...${name.substring(name.length - suffixLength)}`;
  }
  return name;
};
var root_1 = template(`<div class="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">Connection lost. Attempting to reconnect...</div>`);
var root_2 = template(`<div class="bg-gradient-to-br from-stone-800 to-stone-900 p-6 rounded-xl shadow-lg"><div class="flex items-center gap-4"><div class="rounded-lg"><div class=" text-stone-100"><!></div></div> <div><p class="text-sm font-medium text-stone-400"> </p> <p class="text-3xl font-bold"> </p></div></div></div>`);
var root_17 = template(`<a class="block p-4 bg-stone-700/50 rounded-lg hover:bg-stone-700 transition-colors"><div class="flex items-center gap-4"><div class="p-2 bg-rose-500/10 rounded-lg"><div class="text-rose-500"> </div></div> <div><p class="font-medium"> </p></div></div></a>`);
var root_18 = template(`<th> </th>`);
var root_20 = template(`<a><button class="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition-colors"> </button></a>`);
var root_21 = template(`<span class="text-stone-500"> </span>`);
var root_19 = template(`<tr class="hover:bg-stone-700/30 transition-colors"><td class="px-6 py-4"> </td><td class="px-6 py-4"> </td><td class="px-6 py-4"><span> </span></td><td class="px-6 py-4 hidden lg:table-cell"> </td><td class="px-6 py-4"> </td><td class="px-6 py-4 hidden xl:table-cell"> </td><td class="px-6 py-4"> </td><td class="px-6 py-4"> </td><td class="px-6 py-4"><!></td></tr>`);
var root_23 = template(`<a><button class="w-full mt-3 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition-colors"> </button></a>`);
var root_22 = template(`<div class="p-4 space-y-4"><div class="flex justify-between items-start"><div><p class="font-medium"> </p> <p class="text-sm text-stone-400"> </p></div> <span> </span></div> <div class="grid grid-cols-2 gap-4 text-sm"><div><p class="text-stone-400"> </p> <p> </p></div> <div><p class="text-stone-400"> </p> <p> </p></div> <div><p class="text-stone-400"> </p> <p> </p></div> <div><p class="text-stone-400"> </p> <p> </p></div></div> <!></div>`);
var root = template(`<div class="min-h-screen bg-stone-900 text-stone-100 p-6"><div class="max-w-7xl mx-auto space-y-8"><div class="border-b border-stone-800 pb-6"><h2 class="text-3xl font-bold text-stone-100 mb-2"> </h2> <p class="text-stone-400"> </p></div> <!> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"></div> <div class="space-y-6"><h3 class="text-2xl font-bold"> </h3> <div class="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-6 shadow-lg space-y-6"><p class="text-stone-300"> </p> <div class="space-y-4"></div></div></div> <div class="bg-stone-800 rounded-xl overflow-hidden shadow-lg"><div class="hidden md:block overflow-x-auto"><table class="w-full text-sm"><thead class="bg-stone-700"><tr></tr></thead><tbody class="divide-y divide-stone-700"></tbody></table></div> <div class="md:hidden divide-y divide-stone-700"></div></div> <div><div class="flex justify-end items-center mt-8 text-rose-500 font-medium"><a href="/privacy"> </a></div></div></div></div>`);
function _page($$anchor, $$props) {
  push($$props, true);
  const $$stores = setup_stores();
  const $t = () => store_get(t, "$t", $$stores);
  let ws;
  let stats = state(proxy({
    activeModels: 0,
    activePeers: 0,
    averageSessionMinutes: 0,
    totalProviderTime: 0,
    totalRequests: 0,
    totalRequestsToday: 0,
    totalSessions: 0,
    uniquePeerCount: 0
  }));
  let peers = state(proxy([]));
  let connectionStatus = state("disconnected");
  onMount(() => {
    ws = new WebSocket("https://twinny.dev/ws");
    ws.onopen = () => set(connectionStatus, "connected");
    ws.onclose = () => set(connectionStatus, "disconnected");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      set(peers, proxy(data.allPeers));
      set(stats, proxy({
        averageSessionMinutes: data.stats.averageSessionMinutes,
        totalProviderTime: data.stats.totalProviderTime,
        totalRequests: data.stats.totalRequests,
        totalRequestsToday: data.stats.totalRequestsToday,
        totalSessions: data.stats.totalSessions,
        activePeers: data.activePeers,
        activeModels: data.activeModels,
        uniquePeerCount: data.uniquePeerCount
      }));
    };
  });
  onDestroy(() => ws == null ? void 0 : ws.close());
  var div = root();
  var div_1 = child(div);
  var div_2 = child(div_1);
  var h2 = child(div_2);
  var text$1 = child(h2, true);
  template_effect(() => set_text(text$1, $t()("common.symmetry")));
  reset(h2);
  var p = sibling(h2, 2);
  var text_1 = child(p, true);
  template_effect(() => set_text(text_1, $t()("common.access")));
  reset(p);
  reset(div_2);
  var node = sibling(div_2, 2);
  if_block(node, () => get(connectionStatus) === "disconnected", ($$anchor2) => {
    var div_3 = root_1();
    append($$anchor2, div_3);
  });
  var div_4 = sibling(node, 2);
  each(div_4, 21, () => Object.entries(get(stats)), index, ($$anchor2, $$item) => {
    let key = () => get($$item)[0];
    let value = () => get($$item)[1];
    var div_5 = root_2();
    var div_6 = child(div_5);
    var div_7 = child(div_6);
    var div_8 = child(div_7);
    var node_1 = child(div_8);
    if_block(
      node_1,
      () => key() === "activeModels",
      ($$anchor3) => {
        var text_2 = text("🤖");
        append($$anchor3, text_2);
      },
      ($$anchor3) => {
        var fragment = comment();
        var node_2 = first_child(fragment);
        if_block(
          node_2,
          () => key() === "activePeers",
          ($$anchor4) => {
            var text_3 = text("⚡");
            append($$anchor4, text_3);
          },
          ($$anchor4) => {
            var fragment_1 = comment();
            var node_3 = first_child(fragment_1);
            if_block(
              node_3,
              () => key() === "uniquePeerCount",
              ($$anchor5) => {
                var text_4 = text("👥");
                append($$anchor5, text_4);
              },
              ($$anchor5) => {
                var fragment_2 = comment();
                var node_4 = first_child(fragment_2);
                if_block(
                  node_4,
                  () => key() === "averageSessionMinutes",
                  ($$anchor6) => {
                    var text_5 = text("⏱️");
                    append($$anchor6, text_5);
                  },
                  ($$anchor6) => {
                    var fragment_3 = comment();
                    var node_5 = first_child(fragment_3);
                    if_block(
                      node_5,
                      () => key() === "totalProviderTime",
                      ($$anchor7) => {
                        var text_6 = text("⌛");
                        append($$anchor7, text_6);
                      },
                      ($$anchor7) => {
                        var fragment_4 = comment();
                        var node_6 = first_child(fragment_4);
                        if_block(
                          node_6,
                          () => key() === "totalRequests",
                          ($$anchor8) => {
                            var text_7 = text("📊");
                            append($$anchor8, text_7);
                          },
                          ($$anchor8) => {
                            var fragment_5 = comment();
                            var node_7 = first_child(fragment_5);
                            if_block(
                              node_7,
                              () => key() === "totalRequestsToday",
                              ($$anchor9) => {
                                var text_8 = text("📈");
                                append($$anchor9, text_8);
                              },
                              ($$anchor9) => {
                                var text_9 = text("📝");
                                append($$anchor9, text_9);
                              },
                              true
                            );
                            append($$anchor8, fragment_5);
                          },
                          true
                        );
                        append($$anchor7, fragment_4);
                      },
                      true
                    );
                    append($$anchor6, fragment_3);
                  },
                  true
                );
                append($$anchor5, fragment_2);
              },
              true
            );
            append($$anchor4, fragment_1);
          },
          true
        );
        append($$anchor3, fragment);
      }
    );
    reset(div_8);
    reset(div_7);
    var div_9 = sibling(div_7, 2);
    var p_1 = child(div_9);
    var text_10 = child(p_1, true);
    template_effect(() => set_text(text_10, $t()(`common.${key()}`)));
    reset(p_1);
    var p_2 = sibling(p_1, 2);
    var text_11 = child(p_2, true);
    reset(p_2);
    reset(div_9);
    reset(div_6);
    reset(div_5);
    template_effect(() => set_text(text_11, value()));
    append($$anchor2, div_5);
  });
  reset(div_4);
  var div_10 = sibling(div_4, 2);
  var h3 = child(div_10);
  var text_12 = child(h3, true);
  template_effect(() => set_text(text_12, $t()("common.become_a_provider")));
  reset(h3);
  var div_11 = sibling(h3, 2);
  var p_3 = child(div_11);
  var text_13 = child(p_3, true);
  template_effect(() => set_text(text_13, $t()("common.become_a_provider_description")));
  reset(p_3);
  var div_12 = sibling(p_3, 2);
  each(
    div_12,
    21,
    () => [
      [URL_GITHUB, "symmetry_github_repo", "<>"]
    ],
    index,
    ($$anchor2, $$item) => {
      let url = () => get($$item)[0];
      let key = () => get($$item)[1];
      let icon = () => get($$item)[2];
      var a = root_17();
      var div_13 = child(a);
      var div_14 = child(div_13);
      var div_15 = child(div_14);
      var text_14 = child(div_15, true);
      reset(div_15);
      reset(div_14);
      var div_16 = sibling(div_14, 2);
      var p_4 = child(div_16);
      var text_15 = child(p_4, true);
      template_effect(() => set_text(text_15, $t()(`common.${key()}`)));
      reset(p_4);
      reset(div_16);
      reset(div_13);
      reset(a);
      template_effect(() => {
        set_attribute(a, "href", url());
        set_text(text_14, icon());
      });
      append($$anchor2, a);
    }
  );
  reset(div_12);
  reset(div_11);
  reset(div_10);
  var div_17 = sibling(div_10, 2);
  var div_18 = child(div_17);
  var table = child(div_18);
  var thead = child(table);
  var tr = child(thead);
  each(
    tr,
    20,
    () => [
      "model",
      "name",
      "online",
      "provider",
      "total_requests",
      "tokens_per_sec",
      "total_tokens",
      "up_time_minutes",
      "chat"
    ],
    index,
    ($$anchor2, header) => {
      var th = root_18();
      var text_16 = child(th, true);
      template_effect(() => set_text(text_16, $t()(`common.${header}`)));
      reset(th);
      template_effect(() => set_class(th, `px-6 py-4 text-left font-semibold ${(header === "provider" ? "hidden lg:table-cell" : "") ?? ""} ${(header === "tokens_per_sec" ? "hidden xl:table-cell" : "") ?? ""}`));
      append($$anchor2, th);
    }
  );
  reset(tr);
  reset(thead);
  var tbody = sibling(thead);
  each(tbody, 21, () => get(peers), index, ($$anchor2, peer) => {
    var tr_1 = root_19();
    var td = child(tr_1);
    var text_17 = child(td, true);
    template_effect(() => set_text(text_17, getShortId(get(peer).model_name, 10, 10)));
    reset(td);
    var td_1 = sibling(td);
    var text_18 = child(td_1, true);
    template_effect(() => set_text(text_18, getShortId(get(peer).name, 10, 10)));
    reset(td_1);
    var td_2 = sibling(td_1);
    var span = child(td_2);
    var text_19 = child(span, true);
    reset(span);
    reset(td_2);
    var td_3 = sibling(td_2);
    var text_20 = child(td_3, true);
    reset(td_3);
    var td_4 = sibling(td_3);
    var text_21 = child(td_4, true);
    reset(td_4);
    var td_5 = sibling(td_4);
    var text_22 = child(td_5, true);
    template_effect(() => set_text(text_22, Math.round(get(peer).avg_tokens_per_second || 0)));
    reset(td_5);
    var td_6 = sibling(td_5);
    var text_23 = child(td_6, true);
    reset(td_6);
    var td_7 = sibling(td_6);
    var text_24 = child(td_7, true);
    reset(td_7);
    var td_8 = sibling(td_7);
    var node_8 = child(td_8);
    if_block(
      node_8,
      () => get(peer).online,
      ($$anchor3) => {
        var a_1 = root_20();
        var button = child(a_1);
        var text_25 = child(button, true);
        template_effect(() => set_text(text_25, $t()("common.chat")));
        reset(button);
        reset(a_1);
        template_effect(() => set_attribute(a_1, "href", `/chat?model=${get(peer).model_name ?? ""}`));
        append($$anchor3, a_1);
      },
      ($$anchor3) => {
        var span_1 = root_21();
        var text_26 = child(span_1, true);
        template_effect(() => set_text(text_26, $t()("common.offline")));
        reset(span_1);
        append($$anchor3, span_1);
      }
    );
    reset(td_8);
    reset(tr_1);
    template_effect(() => {
      set_class(span, `inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${(get(peer).online ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500") ?? ""}`);
      set_text(text_19, get(peer).online ? "Online" : "Offline");
      set_text(text_20, get(peer).provider || "unknown");
      set_text(text_21, get(peer).total_requests || 0);
      set_text(text_23, get(peer).total_tokens || 0);
      set_text(text_24, get(peer).duration_minutes || 0);
    });
    append($$anchor2, tr_1);
  });
  reset(tbody);
  reset(table);
  reset(div_18);
  var div_19 = sibling(div_18, 2);
  each(div_19, 21, () => get(peers), index, ($$anchor2, peer) => {
    var div_20 = root_22();
    var div_21 = child(div_20);
    var div_22 = child(div_21);
    var p_5 = child(div_22);
    var text_27 = child(p_5, true);
    template_effect(() => set_text(text_27, getShortId(get(peer).model_name)));
    reset(p_5);
    var p_6 = sibling(p_5, 2);
    var text_28 = child(p_6, true);
    reset(p_6);
    reset(div_22);
    var span_2 = sibling(div_22, 2);
    var text_29 = child(span_2, true);
    reset(span_2);
    reset(div_21);
    var div_23 = sibling(div_21, 2);
    var div_24 = child(div_23);
    var p_7 = child(div_24);
    var text_30 = child(p_7, true);
    template_effect(() => set_text(text_30, $t()("common.provider")));
    reset(p_7);
    var p_8 = sibling(p_7, 2);
    var text_31 = child(p_8, true);
    reset(p_8);
    reset(div_24);
    var div_25 = sibling(div_24, 2);
    var p_9 = child(div_25);
    var text_32 = child(p_9, true);
    template_effect(() => set_text(text_32, $t()("common.total_requests")));
    reset(p_9);
    var p_10 = sibling(p_9, 2);
    var text_33 = child(p_10, true);
    reset(p_10);
    reset(div_25);
    var div_26 = sibling(div_25, 2);
    var p_11 = child(div_26);
    var text_34 = child(p_11, true);
    template_effect(() => set_text(text_34, $t()("common.total_tokens")));
    reset(p_11);
    var p_12 = sibling(p_11, 2);
    var text_35 = child(p_12, true);
    reset(p_12);
    reset(div_26);
    var div_27 = sibling(div_26, 2);
    var p_13 = child(div_27);
    var text_36 = child(p_13, true);
    template_effect(() => set_text(text_36, $t()("common.up_time_minutes")));
    reset(p_13);
    var p_14 = sibling(p_13, 2);
    var text_37 = child(p_14, true);
    reset(p_14);
    reset(div_27);
    reset(div_23);
    var node_9 = sibling(div_23, 2);
    if_block(node_9, () => get(peer).online, ($$anchor3) => {
      var a_2 = root_23();
      var button_1 = child(a_2);
      var text_38 = child(button_1, true);
      template_effect(() => set_text(text_38, $t()("common.chat")));
      reset(button_1);
      reset(a_2);
      template_effect(() => set_attribute(a_2, "href", `/chat?model=${get(peer).model_name ?? ""}`));
      append($$anchor3, a_2);
    });
    reset(div_20);
    template_effect(() => {
      set_text(text_28, get(peer).name);
      set_class(span_2, `inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${(get(peer).online ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500") ?? ""}`);
      set_text(text_29, get(peer).online ? "Online" : "Offline");
      set_text(text_31, get(peer).provider || "unknown");
      set_text(text_33, get(peer).total_requests || 0);
      set_text(text_35, get(peer).total_tokens || 0);
      set_text(text_37, get(peer).duration_minutes || 0);
    });
    append($$anchor2, div_20);
  });
  reset(div_19);
  reset(div_17);
  var div_28 = sibling(div_17, 2);
  var div_29 = child(div_28);
  var a_3 = child(div_29);
  var text_39 = child(a_3, true);
  template_effect(() => set_text(text_39, $t()("common.privacy_policy")));
  reset(a_3);
  reset(div_29);
  reset(div_28);
  reset(div_1);
  reset(div);
  append($$anchor, div);
  pop();
}
export {
  _page as component
};
