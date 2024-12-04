import { w as writable, g as get, d as derived } from './index2-LyvPryGv.js';

var R=Object.defineProperty,A$1=Object.defineProperties;var E$1=Object.getOwnPropertyDescriptors;var x$1=Object.getOwnPropertySymbols;var C$1=Object.prototype.hasOwnProperty,O$1=Object.prototype.propertyIsEnumerable;var p$1=(t,e,r)=>e in t?R(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,u$1=(t,e)=>{for(var r in e||(e={}))C$1.call(e,r)&&p$1(t,r,e[r]);if(x$1)for(var r of x$1(e))O$1.call(e,r)&&p$1(t,r,e[r]);return t},T=(t,e)=>A$1(t,E$1(e));var c$1=(t,e)=>{var r={};for(var i in t)C$1.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&x$1)for(var i of x$1(t))e.indexOf(i)<0&&O$1.call(t,i)&&(r[i]=t[i]);return r};var j=(t,e)=>{for(var r in e)R(t,r,{get:e[r],enumerable:!0});};var h$1={};j(h$1,{ago:()=>Q,currency:()=>W$1,date:()=>G$1,eq:()=>$$1,gt:()=>L$1,gte:()=>z$1,lt:()=>V$1,lte:()=>v,ne:()=>S,number:()=>B$1});var g=(t,e)=>{let{modifierDefaults:r}=e||{},{[t]:i}=r||{};return i||{}};var $$1=({value:t,options:e=[],defaultValue:r=""})=>(e.find(({key:i})=>`${i}`.toLowerCase()===`${t}`.toLowerCase())||{}).value||r,S=({value:t,options:e=[],defaultValue:r=""})=>(e.find(({key:i})=>`${i}`.toLowerCase()!==`${t}`.toLowerCase())||{}).value||r,V$1=({value:t,options:e=[],defaultValue:r=""})=>(e.sort((o,n)=>+o.key-+n.key).find(({key:o})=>+t<+o)||{}).value||r,L$1=({value:t,options:e=[],defaultValue:r=""})=>(e.sort((o,n)=>+n.key-+o.key).find(({key:o})=>+t>+o)||{}).value||r,v=({value:t,options:e=[],defaultValue:r=""})=>$$1({value:t,options:e,defaultValue:V$1({value:t,options:e,defaultValue:r})}),z$1=({value:t,options:e=[],defaultValue:r=""})=>$$1({value:t,options:e,defaultValue:L$1({value:t,options:e,defaultValue:r})}),B$1=({value:t,props:e,defaultValue:r="",locale:i="",parserOptions:o})=>{if(!i)return "";let s=g("number",o),{maximumFractionDigits:n}=s,m=c$1(s,["maximumFractionDigits"]),d=(e==null?void 0:e.number)||{},{maximumFractionDigits:f=n||2}=d,a=c$1(d,["maximumFractionDigits"]);return new Intl.NumberFormat(i,u$1(T(u$1({},m),{maximumFractionDigits:f}),a)).format(+t||+r)},G$1=({value:t,props:e,defaultValue:r="",locale:i="",parserOptions:o})=>{if(!i)return "";let n=c$1(g("date",o),[]),m=c$1((e==null?void 0:e.date)||{},[]);return new Intl.DateTimeFormat(i,u$1(u$1({},n),m)).format(+t||+r)},D$2=[{key:"second",multiplier:1e3},{key:"minute",multiplier:60},{key:"hour",multiplier:60},{key:"day",multiplier:24},{key:"week",multiplier:7},{key:"month",multiplier:13/3},{key:"year",multiplier:12}],N$1=(t="",e="")=>new RegExp(`^${t}s?$`).test(e),H$1=t=>D$2.indexOf(D$2.find(({key:e})=>N$1(e,t))),J=(t,e)=>D$2.reduce(([r,i],{key:o,multiplier:n},m)=>{if(N$1(i,e))return [r,i];if(!i||m===H$1(i)+1){let f=Math.round(r/n);if(!i||Math.abs(f)>=1||e!=="auto")return [f,o]}return [r,i]},[t,""]),Q=({value:t,defaultValue:e="",locale:r="",props:i,parserOptions:o})=>{if(!r)return "";let k=g("ago",o),{format:n,numeric:m}=k,f=c$1(k,["format","numeric"]),y=(i==null?void 0:i.ago)||{},{format:a=n||"auto",numeric:s=m||"auto"}=y,d=c$1(y,["format","numeric"]),M=+t||+e,l=J(M,a);return new Intl.RelativeTimeFormat(r,u$1(T(u$1({},f),{numeric:s}),d)).format(...l)},W$1=({value:t,defaultValue:e="",locale:r="",props:i,parserOptions:o})=>{if(!r)return "";let M=g("currency",o),{ratio:n,currency:m}=M,f=c$1(M,["ratio","currency"]),l=(i==null?void 0:i.currency)||{},{ratio:a=n||1,currency:s=m}=l,d=c$1(l,["ratio","currency"]);return new Intl.NumberFormat(r,u$1(T(u$1({},f),{style:"currency",currency:s}),d)).format(a*(t||e))};var X=t=>typeof t=="string"&&/{{(?:(?!{{|}}).)+}}/.test(t),F$1=t=>typeof t=="string"?t.replace(/\\(?=:|;|{|})/g,""):t,Y=({value:t,props:e,payload:r,parserOptions:i,locale:o})=>`${t}`.replace(/{{\s*(?:(?!{{|}}).)+\s*}}/g,n=>{let m=F$1(`${n.match(/(?!{|\s).+?(?!\\[:;]).(?=\s*(?:[:;]|}}$))/)}`),f=r==null?void 0:r[m],[,a=""]=n.match(/.+?(?!\\;).;\s*default\s*:\s*([^\s:;].+?(?:\\[:;]|[^;}])*)(?=\s*(?:;|}}$))/i)||[];a=a||(r==null?void 0:r.default)||"";let[,s=""]=n.match(/{{\s*(?:[^;]|(?:\\;))+\s*(?:(?!\\:).[:])\s*(?!\s)((?:\\;|[^;])+?)(?=\s*(?:[;]|}}$))/i)||[];if(f===void 0&&s!=="ne")return a;let d=!!s,{customModifiers:M}=i||{},l=u$1(u$1({},h$1),M||{});s=Object.keys(l).includes(s)?s:"eq";let k=l[s],y=(n.match(/[^\s:;{](?:[^;]|\\[;])+[^:;}]/gi)||[]).reduce((b,I,q)=>{if(q>0){let P=F$1(`${I.match(/(?:(?:\\:)|[^:])+/)}`.trim()),w=`${I.match(/(?:(?:\\:)|[^:])+$/)}`.trimStart();if(P&&P!=="default"&&w)return [...b,{key:P,value:w}]}return b},[]);return !d&&!y.length?f:k({value:f,options:y,props:e,defaultValue:a,locale:o,parserOptions:i})}),U=({value:t,props:e,payload:r,parserOptions:i,locale:o})=>{if(X(t)){let n=Y({value:t,payload:r,props:e,parserOptions:i,locale:o});return U({value:n,payload:r,props:e,parserOptions:i,locale:o})}else return F$1(t)},Z=t=>({parse:(e,[r,i],o,n)=>(r!=null&&r.default&&e===void 0&&(e=r.default),e===void 0&&(e=n),U({value:e,payload:r,props:i,parserOptions:t,locale:o}))}),rt=Z;

var H = Object.defineProperty, q = Object.defineProperties;
var B = Object.getOwnPropertyDescriptors;
var x = Object.getOwnPropertySymbols;
var K = Object.prototype.hasOwnProperty, A = Object.prototype.propertyIsEnumerable;
var N = (s2, t3, e) => t3 in s2 ? H(s2, t3, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t3] = e, l$1 = (s2, t3) => {
  for (var e in t3 || (t3 = {})) K.call(t3, e) && N(s2, e, t3[e]);
  if (x) for (var e of x(t3)) A.call(t3, e) && N(s2, e, t3[e]);
  return s2;
}, f$1 = (s2, t3) => q(s2, B(t3));
var L = (s2, t3) => {
  var e = {};
  for (var a in s2) K.call(s2, a) && t3.indexOf(a) < 0 && (e[a] = s2[a]);
  if (s2 != null && x) for (var a of x(s2)) t3.indexOf(a) < 0 && A.call(s2, a) && (e[a] = s2[a]);
  return e;
};
var C = ["error", "warn", "debug"], $ = ({ logger: s2 = console, level: t3 = C[1], prefix: e = "[i18n]: " }) => C.reduce((a, r, i2) => f$1(l$1({}, a), { [r]: (o) => C.indexOf(t3) >= i2 && s2[r](`${e}${o}`) }), {}), c = $({}), V = (s2) => {
  c = s2;
};
var z = (n2) => {
  var d2 = n2, { parser: s2, key: t3, params: e, translations: a, locale: r, fallbackLocale: i2 } = d2, o = L(d2, ["parser", "key", "params", "translations", "locale", "fallbackLocale"]);
  if (!t3) return c.warn(`No translation key provided ('${r}' locale). Skipping translation...`), "";
  if (!r) return c.warn(`No locale provided for '${t3}' key. Skipping translation...`), "";
  let u2 = (a[r] || {})[t3];
  if (i2 && u2 === void 0 && (c.debug(`No translation provided for '${t3}' key in locale '${r}'. Trying fallback '${i2}'`), u2 = (a[i2] || {})[t3]), u2 === void 0) {
    if (c.debug(`No translation provided for '${t3}' key in fallback '${i2}'.`), o.hasOwnProperty("fallbackValue")) return o.fallbackValue;
    c.warn(`No translation nor fallback found for '${t3}' .`);
  }
  return s2.parse(u2, e, r, t3);
}, h = (...s2) => s2.length ? s2.filter((t3) => !!t3).map((t3) => {
  let e = `${t3}`.toLowerCase();
  try {
    let [a] = Intl.Collator.supportedLocalesOf(t3);
    if (!a) throw new Error();
    e = a;
  } catch (a) {
    c.warn(`'${t3}' locale is non-standard.`);
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
}, G = (s2) => s2.reduce((t3, { key: e, data: a, locale: r }) => {
  if (!a) return t3;
  let [i2] = h(r), o = f$1(l$1({}, t3[i2] || {}), { [e]: a });
  return f$1(l$1({}, t3), { [i2]: o });
}, {}), E = async (s2) => {
  try {
    let t3 = await Promise.all(s2.map((r) => {
      var i2 = r, { loader: e } = i2, a = L(i2, ["loader"]);
      return new Promise(async (o) => {
        let n2;
        try {
          n2 = await e();
        } catch (d2) {
          c.error(`Failed to load translation. Verify your '${a.locale}' > '${a.key}' Loader.`), c.error(d2);
        }
        o(f$1(l$1({ loader: e }, a), { data: n2 }));
      });
    }));
    return G(t3);
  } catch (t3) {
    c.error(t3);
  }
  return {};
}, W = (s2) => (t3) => {
  try {
    if (typeof t3 == "string") return t3 === s2;
    if (typeof t3 == "object") return t3.test(s2);
  } catch (e) {
    c.error("Invalid route config!");
  }
  return false;
}, F = (s2, t3) => {
  let e = true;
  try {
    e = Object.keys(s2).filter((a) => s2[a] !== void 0).every((a) => s2[a] === t3[a]);
  } catch (a) {
  }
  return e;
};
var D$1 = 1e3 * 60 * 60 * 24, O = class {
  constructor(t3) {
    this.cachedAt = 0;
    this.loadedKeys = {};
    this.currentRoute = writable();
    this.config = writable();
    this.isLoading = writable(false);
    this.promises = /* @__PURE__ */ new Set();
    this.loading = { subscribe: this.isLoading.subscribe, toPromise: (t4, e) => {
      let { fallbackLocale: a } = get(this.config), r = Array.from(this.promises).filter((i2) => {
        let o = F({ locale: h(t4)[0], route: e }, i2);
        return a && (o = o || F({ locale: h(a)[0], route: e }, i2)), o;
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
      return Array.from(/* @__PURE__ */ new Set([...h(...r), ...h(...i2)]));
    }, [])), { get: () => get(this.locales) });
    this.internalLocale = writable();
    this.loaderTrigger = derived([this.internalLocale, this.currentRoute], ([t4, e], a) => {
      var r, i2;
      t4 !== void 0 && e !== void 0 && !(t4 === ((r = get(this.loaderTrigger)) == null ? void 0 : r[0]) && e === ((i2 = get(this.loaderTrigger)) == null ? void 0 : i2[1])) && (c.debug("Triggering translation load..."), a([t4, e]));
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
      var [i2] = r, o = i2, { parser: t4, fallbackLocale: e } = o, a = L(o, ["parser", "fallbackLocale"]);
      return (n2, ...d2) => z(l$1({ parser: t4, key: n2, params: d2, translations: this.translations.get(), locale: this.locale.get(), fallbackLocale: e }, a.hasOwnProperty("fallbackValue") ? { fallbackValue: a.fallbackValue } : {}));
    })), { get: (t4, ...e) => get(this.t)(t4, ...e) });
    this.l = f$1(l$1({}, derived([this.config, this.translations], (i2) => {
      var [o, ...n2] = i2, d2 = o, { parser: t4, fallbackLocale: e } = d2, a = L(d2, ["parser", "fallbackLocale"]), [r] = n2;
      return (u2, b, ...k) => z(l$1({ parser: t4, key: b, params: k, translations: r, locale: u2, fallbackLocale: e }, a.hasOwnProperty("fallbackValue") ? { fallbackValue: a.fallbackValue } : {}));
    })), { get: (t4, e, ...a) => get(this.l)(t4, e, ...a) });
    this.getLocale = (t4) => {
      let { fallbackLocale: e } = get(this.config) || {}, a = t4 || e;
      if (!a) return;
      let r = this.locales.get();
      return r.find((o) => h(a).includes(o)) || r.find((o) => h(e).includes(o));
    };
    this.setLocale = (t4) => {
      if (t4 && t4 !== get(this.internalLocale)) return c.debug(`Setting '${t4}' locale.`), this.internalLocale.set(t4), this.loading.toPromise(t4, get(this.currentRoute));
    };
    this.setRoute = (t4) => {
      if (t4 !== get(this.currentRoute)) {
        c.debug(`Setting '${t4}' route.`), this.currentRoute.set(t4);
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
      let r = this.translations.get(), { loaders: i2, fallbackLocale: o = "", cache: n2 = D$1 } = a || {}, d2 = Number.isNaN(+n2) ? D$1 : +n2;
      this.cachedAt ? Date.now() > d2 + this.cachedAt && (c.debug("Refreshing cache."), this.loadedKeys = {}, this.cachedAt = 0) : (c.debug("Setting cache timestamp."), this.cachedAt = Date.now());
      let [u2, b] = h(t4, o), k = r[u2], I = r[b], R = (i2 || []).map((j) => {
        var T = j, { locale: p2 } = T, y = L(T, ["locale"]);
        return f$1(l$1({}, y), { locale: h(p2)[0] });
      }).filter(({ routes: p2 }) => !p2 || (p2 || []).some(W(e))).filter(({ key: p2, locale: y }) => y === u2 && (!k || !(this.loadedKeys[u2] || []).includes(p2)) || o && y === b && (!I || !(this.loadedKeys[b] || []).includes(p2)));
      if (R.length) {
        this.isLoading.set(true), c.debug("Fetching translations...");
        let p2 = await E(R);
        this.isLoading.set(false);
        let y = Object.keys(p2).reduce((T, P2) => f$1(l$1({}, T), { [P2]: Object.keys(p2[P2]) }), {}), j = R.filter(({ key: T, locale: P2 }) => (y[P2] || []).some((S) => `${S}`.startsWith(T))).reduce((T, { key: P2, locale: S }) => f$1(l$1({}, T), { [S]: [...T[S] || [], P2] }), {});
        return [p2, j];
      }
      return [];
    };
    this.addTranslations = (t4, e) => {
      if (!t4) return;
      let a = get(this.config), { preprocess: r } = a || {};
      c.debug("Adding translations...");
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
      c.debug(`Adding loader promise for '${a}' locale and '${e}' route.`);
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
      e && this.promises.size && (await this.loading.toPromise(), this.promises.clear(), c.debug("Loader promises have been purged."));
    }), t3 && this.loadConfig(t3);
  }
  async configLoader(t3) {
    if (!t3) return c.error("No config provided!");
    let n2 = t3, { initLocale: e, fallbackLocale: a, translations: r, log: i2 } = n2, o = L(n2, ["initLocale", "fallbackLocale", "translations", "log"]);
    i2 && V($(i2)), [e] = h(e), [a] = h(a), c.debug("Setting config."), this.config.set(l$1({ initLocale: e, fallbackLocale: a, translations: r }, o)), r && this.addTranslations(r), e && await this.loadTranslations(e);
  }
};
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
}, t$1 = class t extends O {
  constructor(e) {
    super(e && m(e));
    this.loadConfig = (e2) => super.configLoader(m(e2));
  }
}, D = t$1;
const en = "English";
const languages = {
  en
};
const defaultLocale = "en";
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
      loader: async () => (await import('./common-BB8FqfPQ.js')).default
    },
    {
      locale: "zh-CN",
      key: "common",
      loader: async () => (await import('./common2-CErE-K6B.js')).default
    },
    {
      locale: "zh-TW",
      key: "common",
      loader: async () => (await import('./common3-iT3aiX5S.js')).default
    },
    {
      locale: "ja",
      key: "common",
      loader: async () => (await import('./common4-DCjqevQP.js')).default
    },
    {
      locale: "ko",
      key: "common",
      loader: async () => (await import('./common5-vvZWDaNo.js')).default
    },
    {
      locale: "fr",
      key: "common",
      loader: async () => (await import('./common6-COiirw2h.js')).default
    },
    {
      locale: "de",
      key: "common",
      loader: async () => (await import('./common7-DIagBqvx.js')).default
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

export { addTranslations as a, setLocale as b, loadTranslations as c, defaultLocale as d, t2 as e, locales as l, setRoute as s, translations as t };
//# sourceMappingURL=index5-CMKg5tHl.js.map
