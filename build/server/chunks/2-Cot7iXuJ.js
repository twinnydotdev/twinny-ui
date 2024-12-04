import { f as fail } from './index-DwrKR0Y-.js';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { v as verifyEmailAddress } from './index6-BKVqErUh.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = new sqlite3.Database(path.join(__dirname, "../../../sqlite.db"));
async function registerEmailAddress(request) {
  try {
    const formData = await request.formData();
    const emailAddress = formData.get("email");
    const emailValid = verifyEmailAddress(emailAddress);
    if (!emailAddress || !emailValid) {
      return fail(400, { error: true });
    }
    return await new Promise((resolve, reject) => {
      db.get("SELECT * FROM subscribers WHERE email = ?", [emailAddress], (err, subscriber) => {
        if (err) {
          return reject({ error: true });
        }
        if (subscriber) {
          return resolve({ error: true, message: "Already subscribed" });
        }
        db.prepare("INSERT INTO subscribers (email) VALUES (?)").run(emailAddress, (err2) => {
          if (err2) {
            return reject({ error: true });
          }
          return resolve({ success: true });
        });
      });
    });
  } catch (error) {
    return { error: true };
  }
}
const actions = {
  register: async ({ request }) => {
    try {
      const result = await registerEmailAddress(request);
      return result;
    } catch (e) {
      return { error: true };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-ByvV_doM.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/2.CUeVThZT.js","_app/immutable/chunks/disclose-version.MsUyedxE.js","_app/immutable/chunks/runtime.BnxtgvYn.js","_app/immutable/chunks/legacy.B3OkvZeC.js","_app/immutable/chunks/store.D5ssPbdD.js","_app/immutable/chunks/events.DDYLEkdX.js","_app/immutable/chunks/utils.CrF-uPqs.js","_app/immutable/chunks/lifecycle.D_YzOIEN.js","_app/immutable/chunks/props.C4h6FEPR.js","_app/immutable/chunks/preload-helper.CAG-2Ty2.js","_app/immutable/chunks/attributes.BaHDbf67.js","_app/immutable/chunks/index.gBqYhdbN.js","_app/immutable/chunks/index.DdWbHULs.js","_app/immutable/chunks/index.BOcsL8W8.js","_app/immutable/chunks/if.BZevqZ9O.js","_app/immutable/chunks/actions.PjXaC0Mr.js","_app/immutable/chunks/attributes.nWpjpnK-.js","_app/immutable/chunks/entry.Ds2mMouq.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-Cot7iXuJ.js.map
