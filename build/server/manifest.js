const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","symmetry-unix.sh","symmetry-windows.ps1"]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.DLLMQxB0.js","app":"_app/immutable/entry/app.C9LEgJAG.js","imports":["_app/immutable/entry/start.DLLMQxB0.js","_app/immutable/chunks/entry.Ds2mMouq.js","_app/immutable/chunks/runtime.BnxtgvYn.js","_app/immutable/chunks/index.BOcsL8W8.js","_app/immutable/chunks/utils.CrF-uPqs.js","_app/immutable/entry/app.C9LEgJAG.js","_app/immutable/chunks/preload-helper.CAG-2Ty2.js","_app/immutable/chunks/runtime.BnxtgvYn.js","_app/immutable/chunks/store.D5ssPbdD.js","_app/immutable/chunks/events.DDYLEkdX.js","_app/immutable/chunks/disclose-version.MsUyedxE.js","_app/immutable/chunks/utils.CrF-uPqs.js","_app/immutable/chunks/if.BZevqZ9O.js","_app/immutable/chunks/this.9kAdUk7W.js","_app/immutable/chunks/props.C4h6FEPR.js","_app/immutable/chunks/index-client.CIF4T9ze.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-cz0RStw9.js')),
			__memo(() => import('./chunks/1-BIP_IV2g.js')),
			__memo(() => import('./chunks/2-Cot7iXuJ.js')),
			__memo(() => import('./chunks/3-CkOl-fpt.js')),
			__memo(() => import('./chunks/4-DEXIc07m.js')),
			__memo(() => import('./chunks/5-BEiERca-.js')),
			__memo(() => import('./chunks/6-Bj3753Sd.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/chat",
				pattern: /^\/chat\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/sponsor",
				pattern: /^\/sponsor\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/symmetry",
				pattern: /^\/symmetry\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
