import { a as addTranslations, s as setRoute, b as setLocale, d as defaultLocale, l as locales, c as loadTranslations, t as translations } from './index5-CMKg5tHl.js';
import './index2-LyvPryGv.js';
import './utils-DUJOOww9.js';

const load$1 = async ({ data }) => {
  const { i18n, translations } = data;
  const { locale, route } = i18n;
  addTranslations(translations);
  await setRoute(route);
  await setLocale(locale);
  return i18n;
};

var _layout_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load$1
});

const load = async ({ url, cookies, request }) => {
  const { pathname } = url;
  let locale = (cookies.get("lang") || "").toLowerCase();
  if (!locale) {
    const acceptLanguageHeader = request.headers.get("accept-language") || "";
    let match = acceptLanguageHeader.match(/^[a-z]+(?=[-_])/i);
    if (!match) {
      match = acceptLanguageHeader.match(/^[a-z]+/i);
    }
    locale = match ? match[0].toLowerCase() : defaultLocale;
  }
  const supportedLocales = locales.get().map((l) => l.toLowerCase());
  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }
  await loadTranslations(locale, pathname);
  return {
    i18n: { locale, route: pathname },
    translations: translations.get()
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-BJUy6k7O.js')).default;
const universal_id = "src/routes/+layout.ts";
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.Be5LYAyK.js","_app/immutable/chunks/index.DdWbHULs.js","_app/immutable/chunks/preload-helper.CAG-2Ty2.js","_app/immutable/chunks/runtime.BnxtgvYn.js","_app/immutable/chunks/index.BOcsL8W8.js","_app/immutable/chunks/utils.CrF-uPqs.js","_app/immutable/chunks/disclose-version.MsUyedxE.js","_app/immutable/chunks/legacy.B3OkvZeC.js","_app/immutable/chunks/store.D5ssPbdD.js","_app/immutable/chunks/events.DDYLEkdX.js","_app/immutable/chunks/each.B_lVq9b9.js","_app/immutable/chunks/slot.C-Yg7316.js","_app/immutable/chunks/lifecycle.D_YzOIEN.js","_app/immutable/chunks/attributes.BaHDbf67.js","_app/immutable/chunks/index.gBqYhdbN.js","_app/immutable/chunks/stores.EYq5kNcp.js","_app/immutable/chunks/entry.Ds2mMouq.js"];
const stylesheets = ["_app/immutable/assets/0.3WWdF9su.css"];
const fonts = ["_app/immutable/assets/geist-sans-latin-400-normal.gapTbOY8.woff2","_app/immutable/assets/geist-sans-latin-400-normal.BOaIZNA2.woff"];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets, _layout_ts as universal, universal_id };
//# sourceMappingURL=0-cz0RStw9.js.map
