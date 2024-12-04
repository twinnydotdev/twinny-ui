import { a as addTranslations, s as setRoute, b as setLocale, l as locale, t } from "../chunks/index.DdWbHULs.js";
import { a as append, f as template_with_script, t as template } from "../chunks/disclose-version.MsUyedxE.js";
import "../chunks/legacy.B3OkvZeC.js";
import { e as effect, u as untrack, p as push, a as pop, f as first_child, aJ as next, t as template_effect, aK as $document, s as sibling, c as child, r as reset, o as get } from "../chunks/runtime.BnxtgvYn.js";
import { s as setup_stores, d as head, b as store_get, a as set_text } from "../chunks/store.D5ssPbdD.js";
import { e as each, i as index } from "../chunks/each.B_lVq9b9.js";
import { s as slot } from "../chunks/slot.C-Yg7316.js";
import { e as event } from "../chunks/events.DDYLEkdX.js";
import { i as is } from "../chunks/preload-helper.CAG-2Ty2.js";
import { i as init } from "../chunks/lifecycle.D_YzOIEN.js";
import { a as attr } from "../chunks/attributes.BaHDbf67.js";
import { U as URL_GITHUB, b as URL_DOCS, c as URL_TWINNYDOTDEV } from "../chunks/index.gBqYhdbN.js";
import { p as page } from "../chunks/stores.EYq5kNcp.js";
function select_option(select, value, mounting) {
  if (select.multiple) {
    return select_options(select, value);
  }
  for (var option of select.options) {
    var option_value = get_option_value(option);
    if (is(option_value, value)) {
      option.selected = true;
      return;
    }
  }
  if (!mounting || value !== void 0) {
    select.selectedIndex = -1;
  }
}
function init_select(select, get_value) {
  let mounting = true;
  effect(() => {
    if (get_value) {
      select_option(select, untrack(get_value), mounting);
    }
    mounting = false;
    var observer = new MutationObserver(() => {
      var value = select.__value;
      select_option(select, value);
    });
    observer.observe(select, {
      // Listen to option element changes
      childList: true,
      subtree: true,
      // because of <optgroup>
      // Listen to option element value attribute changes
      // (doesn't get notified of select value changes,
      // because that property is not reflected as an attribute)
      attributes: true,
      attributeFilter: ["value"]
    });
    return () => {
      observer.disconnect();
    };
  });
}
function select_options(select, value) {
  for (var option of select.options) {
    option.selected = ~value.indexOf(get_option_value(option));
  }
}
function get_option_value(option) {
  if ("__value" in option) {
    return option.__value;
  } else {
    return option.value;
  }
}
const load = async ({ data }) => {
  const { i18n, translations } = data;
  const { locale: locale2, route } = i18n;
  addTranslations(translations);
  await setRoute(route);
  await setLocale(locale2);
  return i18n;
};
const _layout$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load
}, Symbol.toStringTag, { value: "Module" }));
var root_1$1 = template_with_script(
  `<script async src="https://www.googletagmanager.com/gtag/js?id=G-VWZBLLSELX">
  <\/script> <script>
    window.dataLayer = window.dataLayer || []

    function gtag() {
      dataLayer.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', 'G-VWZBLLSELX')
  <\/script>`,
  1
);
function Analytics($$anchor, $$props) {
  push($$props, false);
  const $$stores = setup_stores();
  const $page = () => store_get(page, "$page", $$stores);
  if (typeof gtag !== "undefined") {
    gtag("config", "VWZBLLSELX", {
      page_title: document.title,
      page_path: $page().url.pathname
    });
  }
  init();
  head(($$anchor2) => {
    var fragment = root_1$1();
    var script = first_child(fragment);
    next(2);
    append($$anchor2, fragment);
  });
  pop();
}
var root_1 = template_with_script(
  `<meta name="title" content="Twinny - Free AI Extension for VS Code &amp; Symmetry Network"> <meta name="description" content="The free and private AI extension for Visual Studio Code and home of the Symmetry inference network. Enhance your development with privacy-focused AI assistance."> <meta name="keywords" content="VS Code extension, AI assistant, Symmetry inference network, private AI, code completion, developer tools, privacy-focused AI"> <meta property="og:type" content="website"> <meta property="og:title" content="Twinny - Private AI Extension &amp; Symmetry Network"> <meta property="og:description" content="Free, privacy-focused AI extension for VS Code. Home of the Symmetry inference network for enhanced development workflows."> <meta name="twitter:card" content="summary_large_image"> <meta name="twitter:title" content="Twinny - VS Code AI Extension &amp; Symmetry"> <meta name="twitter:description" content="Free and private AI coding assistant, featuring the Symmetry inference network for smarter development."> <link href="https://fonts.googleapis.com/css2?family=Fira+Code&amp;display=swap" rel="stylesheet"> <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "Twinny",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "VS Code",
      "description": "Free and private AI extension for Visual Studio Code, featuring the Symmetry inference network for enhanced development"
    }
  <\/script>`,
  1
);
var root_2 = template(`<option class="bg-[#1c1917]"> </option>`);
var root = template(`<!> <div class="flex h-[100vh] flex-col p-2 text-gray-300"><header class="flex justify-between items-center px-4 py-2"><a href="/" aria-label="Home"><h1 class="text-xl font-bold flex-grow select-none" itemscope="" itemtype="http://schema.org/SoftwareApplication"><span itemprop="name"> </span></h1></a> <nav aria-label="Main navigation" class="flex items-center"><a class="ml-3 hover:text-gray-100 transition-colors"${attr("href", URL_GITHUB)} target="_blank" rel="noopener noreferrer nofollow" aria-label="GitHub repository"> </a> <a class="ml-3 hover:text-gray-100 transition-colors"${attr("href", URL_DOCS)} target="_blank" rel="noopener noreferrer nofollow" aria-label="Documentation"> </a> <select class="ml-3 bg-[#1c1917] rounded transition-colors focus:outline-none" aria-label="Select language"></select></nav></header> <main class="flex grow flex-col items-center justify-center"><!></main> <footer class="flex justify-between items-center w-full px-4 py-2"><a href="/sponsor" class="hover:text-gray-100 transition-colors" aria-label="Sponsor project"><span class="text-red-500 mr-1" aria-hidden="true">🖤</span> <span> </span></a> <a${attr("href", URL_TWINNYDOTDEV)} class="hover:text-gray-100 transition-colors" target="_blank" rel="noopener noreferrer nofollow" aria-label="Contact us"> </a></footer></div>`, 1);
function _layout($$anchor, $$props) {
  push($$props, false);
  const $$stores = setup_stores();
  const $t = () => store_get(t, "$t", $$stores);
  const $locale = () => store_get(locale, "$locale", $$stores);
  const languages = [
    { code: "en", label: "en" },
    { code: "zh-CN", label: "简" },
    { code: "zh-TW", label: "繁" },
    { code: "ja", label: "日" },
    { code: "ko", label: "한" },
    { code: "fr", label: "fr" },
    { code: "de", label: "de" }
  ];
  function handleLanguageChange(event2) {
    const select = event2.target;
    locale.set(select.value);
    document.cookie = `lang=${select.value} ;`;
  }
  init();
  var fragment_1 = root();
  head(($$anchor2) => {
    var fragment = root_1();
    $document.title = `Twinny - Privacy-First AI Extension & Symmetry Network`;
    next(20);
    append($$anchor2, fragment);
  });
  var node = first_child(fragment_1);
  Analytics(node, {});
  var div = sibling(node, 2);
  var header = child(div);
  var a = child(header);
  var h1 = child(a);
  var span = child(h1);
  var text = child(span, true);
  template_effect(() => set_text(text, $t()("common.title")));
  reset(span);
  reset(h1);
  reset(a);
  var nav = sibling(a, 2);
  var a_1 = child(nav);
  var text_1 = child(a_1, true);
  template_effect(() => set_text(text_1, $t()("common.github")));
  reset(a_1);
  var a_2 = sibling(a_1, 2);
  var text_2 = child(a_2, true);
  template_effect(() => set_text(text_2, $t()("common.docs")));
  reset(a_2);
  var select_1 = sibling(a_2, 2);
  init_select(select_1, $locale);
  var select_1_value;
  each(select_1, 5, () => languages, index, ($$anchor2, $$item) => {
    let code = () => get($$item).code;
    let label = () => get($$item).label;
    var option = root_2();
    var option_value = {};
    var text_3 = child(option, true);
    reset(option);
    template_effect(() => {
      if (option_value !== (option_value = code())) {
        option.value = null == (option.__value = code()) ? "" : code();
      }
      set_text(text_3, label());
    });
    append($$anchor2, option);
  });
  reset(select_1);
  reset(nav);
  reset(header);
  var main = sibling(header, 2);
  var node_1 = child(main);
  slot(node_1, $$props, "default", {});
  reset(main);
  var footer = sibling(main, 2);
  var a_3 = child(footer);
  var span_1 = sibling(child(a_3), 2);
  var text_4 = child(span_1, true);
  template_effect(() => set_text(text_4, $t()("common.sponsor")));
  reset(span_1);
  reset(a_3);
  var a_4 = sibling(a_3, 2);
  var text_5 = child(a_4, true);
  template_effect(() => set_text(text_5, $t()("common.contact")));
  reset(a_4);
  reset(footer);
  reset(div);
  template_effect(() => {
    if (select_1_value !== (select_1_value = $locale())) {
      select_1.value = null == (select_1.__value = $locale()) ? "" : $locale(), select_option(select_1, $locale());
    }
  });
  event("change", select_1, handleLanguageChange);
  append($$anchor, fragment_1);
  pop();
}
export {
  _layout as component,
  _layout$1 as universal
};
