/* Westbridge College Professionals: language toggle, menu and section highlighting.
   No tracking, no cookies. The only thing stored is the visitor's language choice, in their own browser. */
(function () {
  "use strict";
  var KEY = "wb-lang";
  var root = document.documentElement;
  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var english = {};
  nodes.forEach(function (n) { english[n.getAttribute("data-i18n")] = n.innerHTML; });
  var attrNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n-alt],[data-i18n-aria]"));
  attrNodes.forEach(function (n) {
    if (n.hasAttribute("data-i18n-alt")) n._enAlt = n.getAttribute("alt");
    if (n.hasAttribute("data-i18n-aria")) n._enAria = n.getAttribute("aria-label");
  });

  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked: choice lasts this page only */ } }

  function initial() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "zh" || q === "en") return q;
    var s = saved();
    if (s === "zh" || s === "en") return s;
    var langs = navigator.languages || [navigator.language || ""];
    return String(langs[0] || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
  }

  function apply(lang) {
    var zh = lang === "zh" && window.WB_ZH ? window.WB_ZH : null;
    nodes.forEach(function (n) {
      var k = n.getAttribute("data-i18n");
      var v = zh && Object.prototype.hasOwnProperty.call(zh, k) ? zh[k] : english[k];
      if (n.tagName === "TITLE") { document.title = v; } else { n.innerHTML = v; }
    });
    attrNodes.forEach(function (n) {
      if (n.hasAttribute("data-i18n-alt")) {
        var a = n.getAttribute("data-i18n-alt");
        n.setAttribute("alt", zh && zh[a] ? zh[a] : n._enAlt);
      }
      if (n.hasAttribute("data-i18n-aria")) {
        var r = n.getAttribute("data-i18n-aria");
        n.setAttribute("aria-label", zh && zh[r] ? zh[r] : n._enAria);
      }
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-lang-en]"), function (n) {
      n.setAttribute("lang", zh ? n.getAttribute("data-lang-zh") : n.getAttribute("data-lang-en"));
    });
    root.setAttribute("lang", zh ? "zh-CN" : "en");
    /* article dates: <time datetime="2026-11-10" data-date> or data-date="month" for month-only */
    Array.prototype.forEach.call(document.querySelectorAll("time[data-date]"), function (t) {
      var iso = t.getAttribute("datetime"), monthOnly = t.getAttribute("data-date") === "month";
      var parts = iso.split("-").map(Number);
      var d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] || 1));
      var opts = monthOnly ? { year: "numeric", month: "long", timeZone: "UTC" } : { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };
      try { t.textContent = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-US", opts).format(d); } catch (e) { /* keep the ISO date */ }
    });
    Array.prototype.forEach.call(document.querySelectorAll(".lang button"), function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === (zh ? "zh" : "en")));
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".lang button"), function (b) {
    b.addEventListener("click", function () {
      var l = b.getAttribute("data-lang");
      save(l);
      apply(l);
    });
  });
  apply(initial());

  /* mobile menu */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    var close = function () { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); };
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* header border once the page scrolls */
  var header = document.querySelector(".site-header");
  var onScroll = function () { if (header) header.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* highlight the nav item for the section in view (home page only) */
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll("[data-spy]"));
  if (spyLinks.length && "IntersectionObserver" in window) {
    var visible = {};
    var mark = function () {
      var current = null;
      spyLinks.forEach(function (a) { if (visible[a.getAttribute("data-spy")]) current = a.getAttribute("data-spy"); });
      spyLinks.forEach(function (a) {
        if (a.getAttribute("data-spy") === current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      mark();
    }, { rootMargin: "-45% 0px -50% 0px" });
    spyLinks.forEach(function (a) {
      var s = document.getElementById(a.getAttribute("data-spy"));
      if (s) io.observe(s);
    });
  }
})();
