import { e as ensure_array_like, h as head, d as store_get, f as slot, u as unsubscribe_stores, c as pop, p as push } from './index3-DtxWIhGN.js';
import { U as URL_GITHUB, a as URL_DOCS, b as URL_TWINNYDOTDEV } from './index4-B-yQ_bQk.js';
import { e as t2 } from './index5-CMKg5tHl.js';
import { p as page } from './stores-Tm0oNvlE.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as attr } from './attributes-BeaNKpgU.js';
import './utils-DUJOOww9.js';
import './index2-LyvPryGv.js';
import './client-CnCRRyPd.js';
import './exports-CTha0ECg.js';

function Analytics($$payload, $$props) {
  push();
  var $$store_subs;
  if (typeof gtag !== "undefined") {
    gtag("config", "VWZBLLSELX", {
      page_title: document.title,
      page_path: store_get($$store_subs ??= {}, "$page", page).url.pathname
    });
  }
  head($$payload, ($$payload2) => {
    $$payload2.out += `<script async src="https://www.googletagmanager.com/gtag/js?id=G-VWZBLLSELX">
  <\/script> <script>
    window.dataLayer = window.dataLayer || []

    function gtag() {
      dataLayer.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', 'G-VWZBLLSELX')
  <\/script>`;
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  const languages = [
    { code: "en", label: "en" },
    { code: "zh-CN", label: "简" },
    { code: "zh-TW", label: "繁" },
    { code: "ja", label: "日" },
    { code: "ko", label: "한" },
    { code: "fr", label: "fr" },
    { code: "de", label: "de" }
  ];
  const each_array = ensure_array_like(languages);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Twinny - Privacy-First AI Extension &amp; Symmetry Network</title>`;
    $$payload2.out += `<meta name="title" content="Twinny - Free AI Extension for VS Code &amp; Symmetry Network"> <meta name="description" content="The free and private AI extension for Visual Studio Code and home of the Symmetry inference network. Enhance your development with privacy-focused AI assistance."> <meta name="keywords" content="VS Code extension, AI assistant, Symmetry inference network, private AI, code completion, developer tools, privacy-focused AI"> <meta property="og:type" content="website"> <meta property="og:title" content="Twinny - Private AI Extension &amp; Symmetry Network"> <meta property="og:description" content="Free, privacy-focused AI extension for VS Code. Home of the Symmetry inference network for enhanced development workflows."> <meta name="twitter:card" content="summary_large_image"> <meta name="twitter:title" content="Twinny - VS Code AI Extension &amp; Symmetry"> <meta name="twitter:description" content="Free and private AI coding assistant, featuring the Symmetry inference network for smarter development."> <link href="https://fonts.googleapis.com/css2?family=Fira+Code&amp;display=swap" rel="stylesheet"> <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "Twinny",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "VS Code",
      "description": "Free and private AI extension for Visual Studio Code, featuring the Symmetry inference network for enhanced development"
    }
  <\/script>`;
  });
  Analytics($$payload);
  $$payload.out += `<!----> <div class="flex h-[100vh] flex-col p-2 text-gray-300"><header class="flex justify-between items-center px-4 py-2"><a href="/" aria-label="Home"><h1 class="text-xl font-bold flex-grow select-none" itemscope="" itemtype="http://schema.org/SoftwareApplication"><span itemprop="name">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.title"))}</span></h1></a> <nav aria-label="Main navigation" class="flex items-center"><a class="ml-3 hover:text-gray-100 transition-colors"${attr("href", URL_GITHUB)} target="_blank" rel="noopener noreferrer nofollow" aria-label="GitHub repository">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.github"))}</a> <a class="ml-3 hover:text-gray-100 transition-colors"${attr("href", URL_DOCS)} target="_blank" rel="noopener noreferrer nofollow" aria-label="Documentation">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.docs"))}</a> <select class="ml-3 bg-[#1c1917] rounded transition-colors focus:outline-none" aria-label="Select language"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let { code, label } = each_array[$$index];
    $$payload.out += `<option class="bg-[#1c1917]"${attr("value", code)}>${escape_html(label)}</option>`;
  }
  $$payload.out += `<!--]--></select></nav></header> <main class="flex grow flex-col items-center justify-center"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></main> <footer class="flex justify-between items-center w-full px-4 py-2"><a href="/sponsor" class="hover:text-gray-100 transition-colors" aria-label="Sponsor project"><span class="text-red-500 mr-1" aria-hidden="true">🖤</span> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.sponsor"))}</span></a> <a${attr("href", URL_TWINNYDOTDEV)} class="hover:text-gray-100 transition-colors" target="_blank" rel="noopener noreferrer nofollow" aria-label="Contact us">${escape_html(store_get($$store_subs ??= {}, "$t", t2)("common.contact"))}</a></footer></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-BJUy6k7O.js.map
