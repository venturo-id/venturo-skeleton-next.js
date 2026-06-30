/*
 * _console-quiet.js — hand-written enhancement (NOT part of Figma export).
 *
 * Why: this is a static mirror of a Figma Sites build. The Figma client runtime
 * (sites-runtime.*.js) re-hydrates each page in the browser. Because the captured
 * HTML can't perfectly match what the runtime re-renders, React throws a hydration
 * mismatch (Minified React error #425). One mismatch makes React discard and
 * re-render the whole subtree, so a SINGLE root cause prints a huge cascading stack
 * trace — looks like hundreds of errors, is really one. React recovers; the page
 * renders fine. Pure console noise.
 *
 * This filters ONLY a known all-list of harmless runtime messages. Anything not
 * matching a pattern is passed straight through, so genuine NEW errors still show.
 *
 * Cannot be silenced from JS (browser emits these natively, not via console API):
 *   - "Dropped srcset candidate" / srcset 'w' descriptor warnings (Figma srcset)
 *   - "Failed to load resource: 404" network errors
 *   - browser-extension content_script.js messages
 * Those are left alone on purpose.
 *
 * Must load SYNCHRONOUSLY in <head> BEFORE the runtime module so the wrappers are
 * installed before the runtime logs anything. Do not add `defer`.
 */
(function () {
  "use strict";

  // Substrings identifying known-harmless runtime noise. Conservative on purpose.
  var MUTE = [
    "[Hydration Error]",
    "Minified React error #425",
    "Error cleaning CSS rules",
    "Node cannot be found in the current page",
  ];

  function isMuted(args) {
    for (var i = 0; i < args.length; i++) {
      var a = args[i];
      var s = typeof a === "string" ? a : (a && a.message) ? a.message : "";
      if (!s) continue;
      for (var j = 0; j < MUTE.length; j++) {
        if (s.indexOf(MUTE[j]) !== -1) return true;
      }
    }
    return false;
  }

  function wrap(method) {
    var original = console[method];
    if (typeof original !== "function") return;
    console[method] = function () {
      if (isMuted(arguments)) return; // swallow known noise
      return original.apply(console, arguments);
    };
  }

  wrap("error");
  wrap("warn");

  // The hydration error also surfaces as an uncaught window error in some builds.
  window.addEventListener(
    "error",
    function (e) {
      var msg = (e && e.message) || "";
      for (var j = 0; j < MUTE.length; j++) {
        if (msg.indexOf(MUTE[j]) !== -1) {
          e.preventDefault();
          return false;
        }
      }
    },
    true
  );
})();
