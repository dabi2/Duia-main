/* NUGET: BEGIN LICENSE TEXT
 *
 * Microsoft grants you the right to use these script files for the sole
 * purpose of either: (i) interacting through your browser with the Microsoft
 * website or online service, subject to the applicable licensing or use
 * terms; or (ii) using the files as included with a Microsoft product subject
 * to that product's license terms. Microsoft reserves all other rights to the
 * files not expressly granted by Microsoft, whether by implication, estoppel
 * or otherwise. Insofar as a script file is dual licensed under GPL,
 * Microsoft neither took the code under GPL nor distributes it thereunder but
 * under the terms set out in this paragraph. All notices and licenses
 * below are for informational purposes only.
 *
 * NUGET: END LICENSE TEXT */
/*
 ** Unobtrusive Ajax support library for jQuery
 ** Copyright (C) Microsoft Corporation. All rights reserved.
 */
(function(a) { var b = "unobtrusiveAjaxClick",
        d = "unobtrusiveAjaxClickTarget",
        h = "unobtrusiveValidation";

    function c(d, b) { var a = window,
            c = (d || "").split("."); while (a && c.length) a = a[c.shift()]; if (typeof a === "function") return a;
        b.push(d); return Function.constructor.apply(null, b) }

    function e(a) { return a === "GET" || a === "POST" }

    function g(b, a) {!e(a) && b.setRequestHeader("X-HTTP-Method-Override", a) }

    function i(c, b, e) { var d; if (e.indexOf("application/x-javascript") !== -1) return;
        d = (c.getAttribute("data-ajax-mode") || "").toUpperCase();
        a(c.getAttribute("data-ajax-update")).each(function(f, c) { var e; switch (d) {
                case "BEFORE":
                    e = c.firstChild;
                    a("<div />").html(b).contents().each(function() { c.insertBefore(this, e) }); break;
                case "AFTER":
                    a("<div />").html(b).contents().each(function() { c.appendChild(this) }); break;
                case "REPLACE-WITH":
                    a(c).replaceWith(b); break;
                default:
                    a(c).html(b) } }) }

    function f(b, d) { var j, k, f, h;
        j = b.getAttribute("data-ajax-confirm"); if (j && !window.confirm(j)) return;
        k = a(b.getAttribute("data-ajax-loading"));
        h = parseInt(b.getAttribute("data-ajax-loading-duration"), 10) || 0;
        a.extend(d, { type: b.getAttribute("data-ajax-method") || undefined, url: b.getAttribute("data-ajax-url") || undefined, cache: !!b.getAttribute("data-ajax-cache"), beforeSend: function(d) { var a;
                g(d, f);
                a = c(b.getAttribute("data-ajax-begin"), ["xhr"]).apply(b, arguments);
                a !== false && k.show(h); return a }, complete: function() { k.hide(h);
                c(b.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(b, arguments) }, success: function(a, e, d) { i(b, a, d.getResponseHeader("Content-Type") || "text/html");
                c(b.getAttribute("data-ajax-success"), ["data", "status", "xhr"]).apply(b, arguments) }, error: function() { c(b.getAttribute("data-ajax-failure"), ["xhr", "status", "error"]).apply(b, arguments) } });
        d.data.push({ name: "X-Requested-With", value: "XMLHttpRequest" });
        f = d.type.toUpperCase(); if (!e(f)) { d.type = "POST";
            d.data.push({ name: "X-HTTP-Method-Override", value: f }) }
        a.ajax(d) }

    function j(c) { var b = a(c).data(h); return !b || !b.validate || b.validate() }
    a(document).on("click", "a[data-ajax=true]", function(a) { a.preventDefault();
        f(this, { url: this.href, type: "GET", data: [] }) });
    a(document).on("click", "form[data-ajax=true] input[type=image]", function(c) { var g = c.target.name,
            e = a(c.target),
            f = a(e.parents("form")[0]),
            d = e.offset();
        f.data(b, [{ name: g + ".x", value: Math.round(c.pageX - d.left) }, { name: g + ".y", value: Math.round(c.pageY - d.top) }]);
        setTimeout(function() { f.removeData(b) }, 0) });
    a(document).on("click", "form[data-ajax=true] :submit", function(e) { var g = e.currentTarget.name,
            f = a(e.target),
            c = a(f.parents("form")[0]);
        c.data(b, g ? [{ name: g, value: e.currentTarget.value }] : []);
        c.data(d, f);
        setTimeout(function() { c.removeData(b);
            c.removeData(d) }, 0) });
    a(document).on("submit", "form[data-ajax=true]", function(h) { var e = a(this).data(b) || [],
            c = a(this).data(d),
            g = c && c.hasClass("cancel");
        h.preventDefault(); if (!g && !j(this)) return;
        f(this, { url: this.action, type: this.method || "GET", data: e.concat(a(this).serializeArray()) }) }) })(jQuery);