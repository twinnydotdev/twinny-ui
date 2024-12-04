import { _ as __vitePreload } from "./preload-helper.CAG-2Ty2.js";
import { w as writable, g as get, d as derived } from "./index.BOcsL8W8.js";
var H$1 = Object.defineProperty, q = Object.defineProperties;
var B$1 = Object.getOwnPropertyDescriptors;
var x$1 = Object.getOwnPropertySymbols;
var K = Object.prototype.hasOwnProperty, A$1 = Object.prototype.propertyIsEnumerable;
var N$1 = (s2, t3, e) => t3 in s2 ? H$1(s2, t3, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t3] = e, l$1 = (s2, t3) => {
  for (var e in t3 || (t3 = {})) K.call(t3, e) && N$1(s2, e, t3[e]);
  if (x$1) for (var e of x$1(t3)) A$1.call(t3, e) && N$1(s2, e, t3[e]);
  return s2;
}, f$1 = (s2, t3) => q(s2, B$1(t3));
var L$1 = (s2, t3) => {
  var e = {};
  for (var a in s2) K.call(s2, a) && t3.indexOf(a) < 0 && (e[a] = s2[a]);
  if (s2 != null && x$1) for (var a of x$1(s2)) t3.indexOf(a) < 0 && A$1.call(s2, a) && (e[a] = s2[a]);
  return e;
};
var C$1 = ["error", "warn", "debug"], $$1 = ({ logger: s2 = console, level: t3 = C$1[1], prefix: e = "[i18n]: " }) => C$1.reduce((a, r, i2) => f$1(l$1({}, a), { [r]: (o) => C$1.indexOf(t3) >= i2 && s2[r](`${e}${o}`) }), {}), c$1 = $$1({}), V$1 = (s2) => {
  c$1 = s2;
};
var z$1 = (n2) => {
  var d2 = n2, { parser: s2, key: t3, params: e, translations: a, locale: r, fallbackLocale: i2 } = d2, o = L$1(d2, ["parser", "key", "params", "translations", "locale", "fallbackLocale"]);
  if (!t3) return c$1.warn(`No translation key provided ('${r}' locale). Skipping translation...`), "";
  if (!r) return c$1.warn(`No locale provided for '${t3}' key. Skipping translation...`), "";
  let u2 = (a[r] || {})[t3];
  if (i2 && u2 === void 0 && (c$1.debug(`No translation provided for '${t3}' key in locale '${r}'. Trying fallback '${i2}'`), u2 = (a[i2] || {})[t3]), u2 === void 0) {
    if (c$1.debug(`No translation provided for '${t3}' key in fallback '${i2}'.`), o.hasOwnProperty("fallbackValue")) return o.fallbackValue;
    c$1.warn(`No translation nor fallback found for '${t3}' .`);
  }
  return s2.parse(u2, e, r, t3);
}, h$1 = (...s2) => s2.length ? s2.filter((t3) => !!t3).map((t3) => {
  let e = `${t3}`.toLowerCase();
  try {
    let [a] = Intl.Collator.supportedLocalesOf(t3);
    if (!a) throw new Error();
    e = a;
  } catch (a) {
    c$1.warn(`'${t3}' locale is non-standard.`);
  }
  return e;
}) : [], w = (s2, t3, e) => {
  if (t3 && Array.isArray(s2)) return s2.map((a) => w(a, t3));
  if (s2 && typeof s2 == "object") {
    let a = Object.keys(s2).reduce((r, i2) => {
      let o = s2[i2], n2 = e ? `${e}.${i2}` : `${i2}`;
      return o && typeof o == "object" && !(t3 && Array.isArray(o)) ? l$1(l$1({}, r), w(o, t3, n2)) : f$1(l$1({}, r), { [n2]: w(o, t3) });
    }, {});
    return Object.keys(a).length ? a : null;
  }
  return s2;
}, G$1 = (s2) => s2.reduce((t3, { key: e, data: a, locale: r }) => {
  if (!a) return t3;
  let [i2] = h$1(r), o = f$1(l$1({}, t3[i2] || {}), { [e]: a });
  return f$1(l$1({}, t3), { [i2]: o });
}, {}), E$1 = async (s2) => {
  try {
    let t3 = await Promise.all(s2.map((r) => {
      var i2 = r, { loader: e } = i2, a = L$1(i2, ["loader"]);
      return new Promise(async (o) => {
        let n2;
        try {
          n2 = await e();
        } catch (d2) {
          c$1.error(`Failed to load translation. Verify your '${a.locale}' > '${a.key}' Loader.`), c$1.error(d2);
        }
        o(f$1(l$1({ loader: e }, a), { data: n2 }));
      });
    }));
    return G$1(t3);
  } catch (t3) {
    c$1.error(t3);
  }
  return {};
}, W$1 = (s2) => (t3) => {
  try {
    if (typeof t3 == "string") return t3 === s2;
    if (typeof t3 == "object") return t3.test(s2);
  } catch (e) {
    c$1.error("Invalid route config!");
  }
  return false;
}, F$1 = (s2, t3) => {
  let e = true;
  try {
    e = Object.keys(s2).filter((a) => s2[a] !== void 0).every((a) => s2[a] === t3[a]);
  } catch (a) {
  }
  return e;
};
var D$2 = 1e3 * 60 * 60 * 24, O$1 = class O {
  constructor(t3) {
    this.cachedAt = 0;
    this.loadedKeys = {};
    this.currentRoute = writable();
    this.config = writable();
    this.isLoading = writable(false);
    this.promises = /* @__PURE__ */ new Set();
    this.loading = { subscribe: this.isLoading.subscribe, toPromise: (t4, e) => {
      let { fallbackLocale: a } = get(this.config), r = Array.from(this.promises).filter((i2) => {
        let o = F$1({ locale: h$1(t4)[0], route: e }, i2);
        return a && (o = o || F$1({ locale: h$1(a)[0], route: e }, i2)), o;
      }).map(({ promise: i2 }) => i2);
      return Promise.all(r);
    }, get: () => get(this.isLoading) };
    this.privateRawTranslations = writable({});
    this.rawTranslations = { subscribe: this.privateRawTranslations.subscribe, get: () => get(this.rawTranslations) };
    this.privateTranslations = writable({});
    this.translations = { subscribe: this.privateTranslations.subscribe, get: () => get(this.translations) };
    this.locales = f$1(l$1({}, derived([this.config, this.privateTranslations], ([t4, e]) => {
      if (!t4) return [];
      let { loaders: a = [] } = t4, r = a.map(({ locale: o }) => o), i2 = Object.keys(e).map((o) => o);
      return Array.from(/* @__PURE__ */ new Set([...h$1(...r), ...h$1(...i2)]));
    }, [])), { get: () => get(this.locales) });
    this.internalLocale = writable();
    this.loaderTrigger = derived([this.internalLocale, this.currentRoute], ([t4, e], a) => {
      var r, i2;
      t4 !== void 0 && e !== void 0 && !(t4 === ((r = get(this.loaderTrigger)) == null ? void 0 : r[0]) && e === ((i2 = get(this.loaderTrigger)) == null ? void 0 : i2[1])) && (c$1.debug("Triggering translation load..."), a([t4, e]));
    }, []);
    this.localeHelper = writable();
    this.locale = { subscribe: this.localeHelper.subscribe, forceSet: this.localeHelper.set, set: this.internalLocale.set, update: this.internalLocale.update, get: () => get(this.locale) };
    this.initialized = derived([this.locale, this.currentRoute, this.privateTranslations], ([t4, e, a], r) => {
      get(this.initialized) || r(t4 !== void 0 && e !== void 0 && !!Object.keys(a).length);
    });
    this.translation = derived([this.privateTranslations, this.locale, this.isLoading], ([t4, e, a], r) => {
      let i2 = t4[e];
      i2 && Object.keys(i2).length && !a && r(i2);
    }, {});
    this.t = f$1(l$1({}, derived([this.config, this.translation], (r) => {
      var [i2] = r, o = i2, { parser: t4, fallbackLocale: e } = o, a = L$1(o, ["parser", "fallbackLocale"]);
      return (n2, ...d2) => z$1(l$1({ parser: t4, key: n2, params: d2, translations: this.translations.get(), locale: this.locale.get(), fallbackLocale: e }, a.hasOwnProperty("fallbackValue") ? { fallbackValue: a.fallbackValue } : {}));
    })), { get: (t4, ...e) => get(this.t)(t4, ...e) });
    this.l = f$1(l$1({}, derived([this.config, this.translations], (i2) => {
      var [o, ...n2] = i2, d2 = o, { parser: t4, fallbackLocale: e } = d2, a = L$1(d2, ["parser", "fallbackLocale"]), [r] = n2;
      return (u2, b, ...k) => z$1(l$1({ parser: t4, key: b, params: k, translations: r, locale: u2, fallbackLocale: e }, a.hasOwnProperty("fallbackValue") ? { fallbackValue: a.fallbackValue } : {}));
    })), { get: (t4, e, ...a) => get(this.l)(t4, e, ...a) });
    this.getLocale = (t4) => {
      let { fallbackLocale: e } = get(this.config) || {}, a = t4 || e;
      if (!a) return;
      let r = this.locales.get();
      return r.find((o) => h$1(a).includes(o)) || r.find((o) => h$1(e).includes(o));
    };
    this.setLocale = (t4) => {
      if (t4 && t4 !== get(this.internalLocale)) return c$1.debug(`Setting '${t4}' locale.`), this.internalLocale.set(t4), this.loading.toPromise(t4, get(this.currentRoute));
    };
    this.setRoute = (t4) => {
      if (t4 !== get(this.currentRoute)) {
        c$1.debug(`Setting '${t4}' route.`), this.currentRoute.set(t4);
        let e = get(this.internalLocale);
        return this.loading.toPromise(e, t4);
      }
    };
    this.loadConfig = async (t4) => {
      await this.configLoader(t4);
    };
    this.getTranslationProps = async (t4 = this.locale.get(), e = get(this.currentRoute)) => {
      let a = get(this.config);
      if (!a || !t4) return [];
      let r = this.translations.get(), { loaders: i2, fallbackLocale: o = "", cache: n2 = D$2 } = a || {}, d2 = Number.isNaN(+n2) ? D$2 : +n2;
      this.cachedAt ? Date.now() > d2 + this.cachedAt && (c$1.debug("Refreshing cache."), this.loadedKeys = {}, this.cachedAt = 0) : (c$1.debug("Setting cache timestamp."), this.cachedAt = Date.now());
      let [u2, b] = h$1(t4, o), k = r[u2], I = r[b], R2 = (i2 || []).map((j2) => {
        var T2 = j2, { locale: p2 } = T2, y = L$1(T2, ["locale"]);
        return f$1(l$1({}, y), { locale: h$1(p2)[0] });
      }).filter(({ routes: p2 }) => !p2 || (p2 || []).some(W$1(e))).filter(({ key: p2, locale: y }) => y === u2 && (!k || !(this.loadedKeys[u2] || []).includes(p2)) || o && y === b && (!I || !(this.loadedKeys[b] || []).includes(p2)));
      if (R2.length) {
        this.isLoading.set(true), c$1.debug("Fetching translations...");
        let p2 = await E$1(R2);
        this.isLoading.set(false);
        let y = Object.keys(p2).reduce((T2, P2) => f$1(l$1({}, T2), { [P2]: Object.keys(p2[P2]) }), {}), j2 = R2.filter(({ key: T2, locale: P2 }) => (y[P2] || []).some((S2) => `${S2}`.startsWith(T2))).reduce((T2, { key: P2, locale: S2 }) => f$1(l$1({}, T2), { [S2]: [...T2[S2] || [], P2] }), {});
        return [p2, j2];
      }
      return [];
    };
    this.addTranslations = (t4, e) => {
      if (!t4) return;
      let a = get(this.config), { preprocess: r } = a || {};
      c$1.debug("Adding translations...");
      let i2 = Object.keys(t4 || {});
      this.privateRawTranslations.update((o) => i2.reduce((n2, d2) => f$1(l$1({}, n2), { [d2]: l$1(l$1({}, n2[d2] || {}), t4[d2]) }), o)), this.privateTranslations.update((o) => i2.reduce((n2, d2) => {
        let u2 = true, b = t4[d2];
        return typeof r == "function" && (b = r(b)), (typeof r == "function" || r === "none") && (u2 = false), f$1(l$1({}, n2), { [d2]: l$1(l$1({}, n2[d2] || {}), u2 ? w(b, r === "preserveArrays") : b) });
      }, o)), i2.forEach((o) => {
        let n2 = Object.keys(t4[o]).map((d2) => `${d2}`.split(".")[0]);
        e && (n2 = e[o]), this.loadedKeys[o] = Array.from(/* @__PURE__ */ new Set([...this.loadedKeys[o] || [], ...n2 || []]));
      });
    };
    this.loader = async ([t4, e]) => {
      let a = this.getLocale(t4) || void 0;
      c$1.debug(`Adding loader promise for '${a}' locale and '${e}' route.`);
      let r = (async () => {
        let i2 = await this.getTranslationProps(a, e);
        i2.length && this.addTranslations(...i2);
      })();
      this.promises.add({ locale: a, route: e, promise: r }), r.then(() => {
        a && this.locale.get() !== a && this.locale.forceSet(a);
      });
    };
    this.loadTranslations = (t4, e = get(this.currentRoute) || "") => {
      let a = this.getLocale(t4);
      if (a) return this.setRoute(e), this.setLocale(a), this.loading.toPromise(a, e);
    };
    this.loaderTrigger.subscribe(this.loader), this.isLoading.subscribe(async (e) => {
      e && this.promises.size && (await this.loading.toPromise(), this.promises.clear(), c$1.debug("Loader promises have been purged."));
    }), t3 && this.loadConfig(t3);
  }
  async configLoader(t3) {
    if (!t3) return c$1.error("No config provided!");
    let n2 = t3, { initLocale: e, fallbackLocale: a, translations: r, log: i2 } = n2, o = L$1(n2, ["initLocale", "fallbackLocale", "translations", "log"]);
    i2 && V$1($$1(i2)), [e] = h$1(e), [a] = h$1(a), c$1.debug("Setting config."), this.config.set(l$1({ initLocale: e, fallbackLocale: a, translations: r }, o)), r && this.addTranslations(r), e && await this.loadTranslations(e);
  }
};
var R = Object.defineProperty, A = Object.defineProperties;
var E = Object.getOwnPropertyDescriptors;
var x = Object.getOwnPropertySymbols;
var C = Object.prototype.hasOwnProperty, O2 = Object.prototype.propertyIsEnumerable;
var p$1 = (t3, e, r) => e in t3 ? R(t3, e, { enumerable: true, configurable: true, writable: true, value: r }) : t3[e] = r, u$1 = (t3, e) => {
  for (var r in e || (e = {})) C.call(e, r) && p$1(t3, r, e[r]);
  if (x) for (var r of x(e)) O2.call(e, r) && p$1(t3, r, e[r]);
  return t3;
}, T = (t3, e) => A(t3, E(e));
var c = (t3, e) => {
  var r = {};
  for (var i2 in t3) C.call(t3, i2) && e.indexOf(i2) < 0 && (r[i2] = t3[i2]);
  if (t3 != null && x) for (var i2 of x(t3)) e.indexOf(i2) < 0 && O2.call(t3, i2) && (r[i2] = t3[i2]);
  return r;
};
var j = (t3, e) => {
  for (var r in e) R(t3, r, { get: e[r], enumerable: true });
};
var h = {};
j(h, { ago: () => Q, currency: () => W, date: () => G, eq: () => $, gt: () => L, gte: () => z, lt: () => V, lte: () => v, ne: () => S, number: () => B });
var g = (t3, e) => {
  let { modifierDefaults: r } = e || {}, { [t3]: i2 } = r || {};
  return i2 || {};
};
var $ = ({ value: t3, options: e = [], defaultValue: r = "" }) => (e.find(({ key: i2 }) => `${i2}`.toLowerCase() === `${t3}`.toLowerCase()) || {}).value || r, S = ({ value: t3, options: e = [], defaultValue: r = "" }) => (e.find(({ key: i2 }) => `${i2}`.toLowerCase() !== `${t3}`.toLowerCase()) || {}).value || r, V = ({ value: t3, options: e = [], defaultValue: r = "" }) => (e.sort((o, n2) => +o.key - +n2.key).find(({ key: o }) => +t3 < +o) || {}).value || r, L = ({ value: t3, options: e = [], defaultValue: r = "" }) => (e.sort((o, n2) => +n2.key - +o.key).find(({ key: o }) => +t3 > +o) || {}).value || r, v = ({ value: t3, options: e = [], defaultValue: r = "" }) => $({ value: t3, options: e, defaultValue: V({ value: t3, options: e, defaultValue: r }) }), z = ({ value: t3, options: e = [], defaultValue: r = "" }) => $({ value: t3, options: e, defaultValue: L({ value: t3, options: e, defaultValue: r }) }), B = ({ value: t3, props: e, defaultValue: r = "", locale: i2 = "", parserOptions: o }) => {
  if (!i2) return "";
  let s2 = g("number", o), { maximumFractionDigits: n2 } = s2, m2 = c(s2, ["maximumFractionDigits"]), d2 = (e == null ? void 0 : e.number) || {}, { maximumFractionDigits: f2 = n2 || 2 } = d2, a = c(d2, ["maximumFractionDigits"]);
  return new Intl.NumberFormat(i2, u$1(T(u$1({}, m2), { maximumFractionDigits: f2 }), a)).format(+t3 || +r);
}, G = ({ value: t3, props: e, defaultValue: r = "", locale: i2 = "", parserOptions: o }) => {
  if (!i2) return "";
  let n2 = c(g("date", o), []), m2 = c((e == null ? void 0 : e.date) || {}, []);
  return new Intl.DateTimeFormat(i2, u$1(u$1({}, n2), m2)).format(+t3 || +r);
}, D$1 = [{ key: "second", multiplier: 1e3 }, { key: "minute", multiplier: 60 }, { key: "hour", multiplier: 60 }, { key: "day", multiplier: 24 }, { key: "week", multiplier: 7 }, { key: "month", multiplier: 13 / 3 }, { key: "year", multiplier: 12 }], N = (t3 = "", e = "") => new RegExp(`^${t3}s?$`).test(e), H = (t3) => D$1.indexOf(D$1.find(({ key: e }) => N(e, t3))), J = (t3, e) => D$1.reduce(([r, i2], { key: o, multiplier: n2 }, m2) => {
  if (N(i2, e)) return [r, i2];
  if (!i2 || m2 === H(i2) + 1) {
    let f2 = Math.round(r / n2);
    if (!i2 || Math.abs(f2) >= 1 || e !== "auto") return [f2, o];
  }
  return [r, i2];
}, [t3, ""]), Q = ({ value: t3, defaultValue: e = "", locale: r = "", props: i2, parserOptions: o }) => {
  if (!r) return "";
  let k = g("ago", o), { format: n2, numeric: m2 } = k, f2 = c(k, ["format", "numeric"]), y = (i2 == null ? void 0 : i2.ago) || {}, { format: a = n2 || "auto", numeric: s2 = m2 || "auto" } = y, d2 = c(y, ["format", "numeric"]), M2 = +t3 || +e, l2 = J(M2, a);
  return new Intl.RelativeTimeFormat(r, u$1(T(u$1({}, f2), { numeric: s2 }), d2)).format(...l2);
}, W = ({ value: t3, defaultValue: e = "", locale: r = "", props: i2, parserOptions: o }) => {
  if (!r) return "";
  let M2 = g("currency", o), { ratio: n2, currency: m2 } = M2, f2 = c(M2, ["ratio", "currency"]), l2 = (i2 == null ? void 0 : i2.currency) || {}, { ratio: a = n2 || 1, currency: s2 = m2 } = l2, d2 = c(l2, ["ratio", "currency"]);
  return new Intl.NumberFormat(r, u$1(T(u$1({}, f2), { style: "currency", currency: s2 }), d2)).format(a * (t3 || e));
};
var X = (t3) => typeof t3 == "string" && /{{(?:(?!{{|}}).)+}}/.test(t3), F = (t3) => typeof t3 == "string" ? t3.replace(/\\(?=:|;|{|})/g, "") : t3, Y = ({ value: t3, props: e, payload: r, parserOptions: i2, locale: o }) => `${t3}`.replace(/{{\s*(?:(?!{{|}}).)+\s*}}/g, (n2) => {
  let m2 = F(`${n2.match(/(?!{|\s).+?(?!\\[:;]).(?=\s*(?:[:;]|}}$))/)}`), f2 = r == null ? void 0 : r[m2], [, a = ""] = n2.match(/.+?(?!\\;).;\s*default\s*:\s*([^\s:;].+?(?:\\[:;]|[^;}])*)(?=\s*(?:;|}}$))/i) || [];
  a = a || (r == null ? void 0 : r.default) || "";
  let [, s2 = ""] = n2.match(/{{\s*(?:[^;]|(?:\\;))+\s*(?:(?!\\:).[:])\s*(?!\s)((?:\\;|[^;])+?)(?=\s*(?:[;]|}}$))/i) || [];
  if (f2 === void 0 && s2 !== "ne") return a;
  let d2 = !!s2, { customModifiers: M2 } = i2 || {}, l2 = u$1(u$1({}, h), M2 || {});
  s2 = Object.keys(l2).includes(s2) ? s2 : "eq";
  let k = l2[s2], y = (n2.match(/[^\s:;{](?:[^;]|\\[;])+[^:;}]/gi) || []).reduce((b, I, q2) => {
    if (q2 > 0) {
      let P2 = F(`${I.match(/(?:(?:\\:)|[^:])+/)}`.trim()), w2 = `${I.match(/(?:(?:\\:)|[^:])+$/)}`.trimStart();
      if (P2 && P2 !== "default" && w2) return [...b, { key: P2, value: w2 }];
    }
    return b;
  }, []);
  return !d2 && !y.length ? f2 : k({ value: f2, options: y, props: e, defaultValue: a, locale: o, parserOptions: i2 });
}), U = ({ value: t3, props: e, payload: r, parserOptions: i2, locale: o }) => {
  if (X(t3)) {
    let n2 = Y({ value: t3, payload: r, props: e, parserOptions: i2, locale: o });
    return U({ value: n2, payload: r, props: e, parserOptions: i2, locale: o });
  } else return F(t3);
}, Z = (t3) => ({ parse: (e, [r, i2], o, n2) => (r != null && r.default && e === void 0 && (e = r.default), e === void 0 && (e = n2), U({ value: e, payload: r, props: i2, parserOptions: t3, locale: o })) }), rt = Z;
var n = Object.defineProperty, M = Object.defineProperties;
var u = Object.getOwnPropertyDescriptors;
var s = Object.getOwnPropertySymbols;
var f = Object.prototype.hasOwnProperty, P = Object.prototype.propertyIsEnumerable;
var i = (r, o, e) => o in r ? n(r, o, { enumerable: true, configurable: true, writable: true, value: e }) : r[o] = e, p = (r, o) => {
  for (var e in o || (o = {})) f.call(o, e) && i(r, e, o[e]);
  if (s) for (var e of s(o)) P.call(o, e) && i(r, e, o[e]);
  return r;
}, d = (r, o) => M(r, u(o));
var l = (r, o) => {
  var e = {};
  for (var a in r) f.call(r, a) && o.indexOf(a) < 0 && (e[a] = r[a]);
  if (r != null && s) for (var a of s(r)) o.indexOf(a) < 0 && P.call(r, a) && (e[a] = r[a]);
  return e;
};
var m = (e) => {
  var a = e, { parserOptions: r = {} } = a, o = l(a, ["parserOptions"]);
  return d(p({}, o), { parser: rt(r) });
}, t$1 = class t extends O$1 {
  constructor(e) {
    super(e && m(e));
    this.loadConfig = (e2) => super.configLoader(m(e2));
  }
}, D = t$1;
const en = "English";
const languages = {
  en
};
const config = {
  translations: {
    en: { languages },
    "zh-CN": { languages },
    "zh-TW": { languages },
    "ja": { languages },
    "ko": { languages },
    "fr": { languages },
    "de": { languages }
  },
  loaders: [
    {
      locale: "en",
      key: "common",
      loader: async () => (await __vitePreload(async () => {
        const { default: __vite_default__ } = await import("./common.BS_687BI.js");
        return { default: __vite_default__ };
      }, true ? [] : void 0, import.meta.url)).default
    },
    {
      locale: "zh-CN",
      key: "common",
      loader: async () => (await __vitePreload(async () => {
        const { default: __vite_default__ } = await import("./common.DXy2Hc8J.js");
        return { default: __vite_default__ };
      }, true ? [] : void 0, import.meta.url)).default
    },
    {
      locale: "zh-TW",
      key: "common",
      loader: async () => (await __vitePreload(async () => {
        const { default: __vite_default__ } = await import("./common.DeMNGiJJ.js");
        return { default: __vite_default__ };
      }, true ? [] : void 0, import.meta.url)).default
    },
    {
      locale: "ja",
      key: "common",
      loader: async () => (await __vitePreload(async () => {
        const { default: __vite_default__ } = await import("./common.ZN-lt1oQ.js");
        return { default: __vite_default__ };
      }, true ? [] : void 0, import.meta.url)).default
    },
    {
      locale: "ko",
      key: "common",
      loader: async () => (await __vitePreload(async () => {
        const { default: __vite_default__ } = await import("./common.C8Pw0O66.js");
        return { default: __vite_default__ };
      }, true ? [] : void 0, import.meta.url)).default
    },
    {
      locale: "fr",
      key: "common",
      loader: async () => (await __vitePreload(async () => {
        const { default: __vite_default__ } = await import("./common.D1SCx7Rh.js");
        return { default: __vite_default__ };
      }, true ? [] : void 0, import.meta.url)).default
    },
    {
      locale: "de",
      key: "common",
      loader: async () => (await __vitePreload(async () => {
        const { default: __vite_default__ } = await import("./common.BxveGJwS.js");
        return { default: __vite_default__ };
      }, true ? [] : void 0, import.meta.url)).default
    }
  ]
};
const {
  t: t2,
  locale,
  locales,
  loading,
  loadTranslations,
  translations,
  addTranslations,
  setLocale,
  setRoute
} = new D(config);
export {
  addTranslations as a,
  setLocale as b,
  locale as l,
  setRoute as s,
  t2 as t
};
