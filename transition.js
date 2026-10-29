/* Page transitions: on a click to another page of this site, fade the
   page out, then navigate. The fly-in on arrival is plain CSS. */
(function () {
  var FADE_MS = 250;

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target.closest("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;

    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    e.preventDefault();
    document.documentElement.classList.add("is-leaving");
    setTimeout(function () { location.href = url.href; }, FADE_MS);
  });

  // Coming back via the back button can restore the faded-out page
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) document.documentElement.classList.remove("is-leaving");
  });
})();
