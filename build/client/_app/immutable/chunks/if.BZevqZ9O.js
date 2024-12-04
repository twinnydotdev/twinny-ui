import { T as block, a1 as resume_effect, a2 as branch, a3 as pause_effect, h as hydrating, b as hydrate_next, an as EFFECT_TRANSPARENT, Y as HYDRATION_START_ELSE, Z as remove_nodes, V as set_hydrate_node, _ as set_hydrating, $ as hydrate_node } from "./runtime.BnxtgvYn.js";
function if_block(node, get_condition, consequent_fn, alternate_fn = null, elseif = false) {
  if (hydrating) {
    hydrate_next();
  }
  var anchor = node;
  var consequent_effect = null;
  var alternate_effect = null;
  var condition = null;
  var flags = elseif ? EFFECT_TRANSPARENT : 0;
  block(() => {
    if (condition === (condition = !!get_condition())) return;
    let mismatch = false;
    if (hydrating) {
      const is_else = (
        /** @type {Comment} */
        anchor.data === HYDRATION_START_ELSE
      );
      if (condition === is_else) {
        anchor = remove_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
    }
    if (condition) {
      if (consequent_effect) {
        resume_effect(consequent_effect);
      } else {
        consequent_effect = branch(() => consequent_fn(anchor));
      }
      if (alternate_effect) {
        pause_effect(alternate_effect, () => {
          alternate_effect = null;
        });
      }
    } else {
      if (alternate_effect) {
        resume_effect(alternate_effect);
      } else if (alternate_fn) {
        alternate_effect = branch(() => alternate_fn(anchor));
      }
      if (consequent_effect) {
        pause_effect(consequent_effect, () => {
          consequent_effect = null;
        });
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
  }, flags);
  if (hydrating) {
    anchor = hydrate_node;
  }
}
export {
  if_block as i
};
