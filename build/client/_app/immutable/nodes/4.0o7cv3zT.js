import { a as append, t as template } from "../chunks/disclose-version.MsUyedxE.js";
import "../chunks/legacy.B3OkvZeC.js";
import { p as push, a as pop, c as child, r as reset } from "../chunks/runtime.BnxtgvYn.js";
import { M as Marked, h as html } from "../chunks/marked.esm.DCdqfXa9.js";
import { i as init } from "../chunks/lifecycle.D_YzOIEN.js";
var root = template(`<div class="max-w-3xl mx-auto px-6 py-8 rounded-lg shadow-md"><div class="prose prose-slate max-w-none text-white"><!></div></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  const marked = new Marked();
  const markdown = marked.parse(`
  # Privacy Policy for twinny.dev and Symmetry Network

  Last updated: November 28, 2024

  ## Overview
  This privacy policy describes how twinny.dev ("we", "us", or "our") handles information when you use our services through the Symmetry network integration.

  ## Data Collection and Usage
  We collect and process the following information:
  - Inferece data sent through the Symmetry network
  - Connection and session metadata (timestamps, network identifiers, etc.)
  - Technical information necessary for service operation

  ## Provider Data Collection and Usage
  While providers on the Symmetry network may state they do not collect data, please be aware:
  - We cannot verify or guarantee providers' data collection practices
  - Providers may collect and store data without explicit disclosure
  - All messages sent through providers should be treated as potentially visible
  - Exercise caution and assume any transmitted data may be retained
  - We recommend treating all providers as untrusted parties

  Consider any data sent through the network as potentially visible to:
  - Network providers
  - Infrastructure operators

  ## Data Storage and Security
  While we implement reasonable security measures, please note:
  - Communications over the Symmetry network may be visible to network participants
  - We cannot guarantee complete security of data transmission or storage
  - You are responsible for the content you transmit through the service

  ## Disclaimer of Liability
  We expressly disclaim liability for:
  - Data loss, corruption, or breach
  - Unauthorized access to transmitted content
  - Service interruptions or failures
  - Any damages arising from use of the service

  ## Your Responsibilities
  By using our service, you agree to:
  - Not transmit sensitive or confidential information
  - Comply with applicable laws and regulations
  - Accept all risks associated with using a distributed network
  - Take appropriate precautions to protect your data
  - Not transmit hate speech, harassment, or discriminatory content
  - Not engage in harmful, abusive, or malicious behavior
  - Take full responsibility for all content transmitted through the service
  - Not use the service for illegal activities or harmful purposes
  - Understand that you are solely responsible for your actions and content
  - Accept that we may terminate service for violation of these terms

  ## Data Retention
  - Message logs may be retained for technical and operational purposes
  - We may delete data at any time without notice
  - You are responsible for maintaining your own backups

  ## Third-Party Services
  - Data is not shared with third parties without your explicit consent

  ## Changes to Policy
  We may update this policy at any time. Continued use of the service constitutes acceptance of any changes.

  ## Contact
  For questions about this privacy policy, contact us on X at [@twinnydotdev](https://x.com/twinnydotdev).
  `);
  init();
  var div = root();
  var div_1 = child(div);
  var node = child(div_1);
  html(node, () => markdown);
  reset(div_1);
  reset(div);
  append($$anchor, div);
  pop();
}
export {
  _page as component
};
