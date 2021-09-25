/*!
 * DrawSVGPlugin 3.8.0
 * https://greensock.com
 * 
 * @license Copyright 2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

! function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {})
}(this, function (e) {
  "use strict";

  function i() {
    return "undefined" != typeof window
  }

  function j() {
    return a || i() && (a = window.gsap) && a.registerPlugin && a
  }

  function m(e) {
    return Math.round(1e4 * e) / 1e4
  }

  function n(e) {
    return parseFloat(e) || 0
  }

  function o(e, t) {
    var i = n(e);
    return ~e.indexOf("%") ? i / 100 * t : i
  }

  function p(e, t) {
    return n(e.getAttribute(t))
  }

  function r(e, t, i, r, o, s) {
    return P(Math.pow((n(i) - n(e)) * o, 2) + Math.pow((n(r) - n(t)) * s, 2))
  }

  function s(e) {
    return console.warn(e)
  }

  function t(e) {
    return "non-scaling-stroke" === e.getAttribute("vector-effect")
  }

  function w() {
    return String.fromCharCode.apply(null, arguments)
  }

  function A(e) {
    if (!(e = v(e)[0])) return 0;
    var n, i, o, a, f, w, d, l = e.tagName.toLowerCase(),
      h = e.style,
      u = 1,
      c = 1;
    t(e) && (c = e.getScreenCTM(), u = P(c.a * c.a + c.b * c.b), c = P(c.d * c.d + c.c * c.c));
    try {
      i = e.getBBox()
    } catch (e) {
      s("Some browsers won't measure invisible elements (like display:none or masks inside defs).")
    }
    var g = i || {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      _ = g.x,
      y = g.y,
      x = g.width,
      m = g.height;
    if (i && (x || m) || !k[l] || (x = p(e, k[l][0]), m = p(e, k[l][1]), "rect" !== l && "line" !== l && (x *= 2, m *= 2), "line" === l && (_ = p(e, "x1"), y = p(e, "y1"), x = Math.abs(x - _), m = Math.abs(m - y))), "path" === l) a = h.strokeDasharray, h.strokeDasharray = "none", n = e.getTotalLength() || 0, u !== c && s("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."), n *= (u + c) / 2, h.strokeDasharray = a;
    else if ("rect" === l) n = 2 * x * u + 2 * m * c;
    else if ("line" === l) n = r(_, y, _ + x, y + m, u, c);
    else if ("polyline" === l || "polygon" === l)
      for (o = e.getAttribute("points").match(b) || [], "polygon" === l && o.push(o[0], o[1]), n = 0, f = 2; f < o.length; f += 2) n += r(o[f - 2], o[f - 1], o[f], o[f + 1], u, c) || 0;
    else "circle" !== l && "ellipse" !== l || (w = x / 2 * u, d = m / 2 * c, n = Math.PI * (3 * (w + d) - P((3 * w + d) * (w + 3 * d))));
    return n || 0
  }

  function B(e, t) {
    if (!(e = v(e)[0])) return [0, 0];
    t = t || A(e) + 1;
    var i = d.getComputedStyle(e),
      r = i.strokeDasharray || "",
      o = n(i.strokeDashoffset),
      s = r.indexOf(",");
    return s < 0 && (s = r.indexOf(" ")), t < (r = s < 0 ? t : n(r.substr(0, s))) && (r = t), [-o || 0, r - o || 0]
  }

  function C() {
    i() && (d = window, h = a = j(), v = a.utils.toArray, l = -1 !== ((d.navigator || {}).userAgent || "").indexOf("Edge"))
  }
  var a, v, d, l, h, b = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    k = {
      rect: ["width", "height"],
      circle: ["r", "r"],
      ellipse: ["rx", "ry"],
      line: ["x2", "y2"]
    },
    P = Math.sqrt,
    f = "DrawSVGPlugin",
    u = w(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
    c = function (e) {
      var t = 0 === (window ? window.location.href : "").indexOf(w(102, 105, 108, 101, 58, 47, 47)) || -1 !== e.indexOf(w(108, 111, 99, 97, 108, 104, 111, 115, 116)) || -1 !== e.indexOf(w(49, 50, 55, 46, 48, 32, 48, 46, 49)),
        n = [u, w(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), w(99, 111, 100, 101, 112, 101, 110, 46, 112, 108, 117, 109, 98, 105, 110, 103), w(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118), w(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112), w(112, 101, 110, 115, 46, 99, 108, 111, 117, 100), w(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), w(99, 100, 112, 110, 46, 105, 111), w(112, 101, 110, 115, 46, 105, 111), w(103, 97, 110, 110, 111, 110, 46, 116, 118), w(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116), w(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116), w(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), w(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), w(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109), w(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109), w(112, 108, 110, 107, 114, 46, 99, 111), w(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), w(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109), w(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103), w(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111), w(99, 115, 98, 46, 97, 112, 112), w(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109), w(99, 111, 100, 105, 101, 114, 46, 105, 111), w(109, 111, 116, 105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), w(115, 116, 97, 99, 107, 111, 118, 101, 114, 102, 108, 111, 119, 46, 99, 111, 109), w(115, 116, 97, 99, 107, 101, 120, 99, 104, 97, 110, 103, 101, 46, 99, 111, 109), w(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116)],
        i = n.length;
      for (setTimeout(function () {
          window && window.console && !window._gsapWarned && a && !1 !== a.config().trialWarn && (console.log(w(37, 99, 87, 97, 114, 110, 105, 110, 103), w(102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 51, 48, 112, 120, 59, 99, 111, 108, 111, 114, 58, 114, 101, 100, 59)), console.log(w(65, 32, 116, 114, 105, 97, 108, 32, 118, 101, 114, 115, 105, 111, 110, 32, 111, 102, 32) + f + w(32, 105, 115, 32, 108, 111, 97, 100, 101, 100, 32, 116, 104, 97, 116, 32, 111, 110, 108, 121, 32, 119, 111, 114, 107, 115, 32, 108, 111, 99, 97, 108, 108, 121, 32, 97, 110, 100, 32, 111, 110, 32, 100, 111, 109, 97, 105, 110, 115, 32, 108, 105, 107, 101, 32, 99, 111, 100, 101, 112, 101, 110, 46, 105, 111, 32, 97, 110, 100, 32, 99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111, 46, 32, 42, 42, 42, 32, 68, 79, 32, 78, 79, 84, 32, 68, 69, 80, 76, 79, 89, 32, 84, 72, 73, 83, 32, 70, 73, 76, 69, 32, 42, 42, 42, 32, 76, 111, 97, 100, 105, 110, 103, 32, 105, 116, 32, 111, 110, 32, 97, 110, 32, 117, 110, 97, 117, 116, 104, 111, 114, 105, 122, 101, 100, 32, 115, 105, 116, 101, 32, 118, 105, 111, 108, 97, 116, 101, 115, 32, 116, 104, 101, 32, 108, 105, 99, 101, 110, 115, 101, 32, 97, 110, 100, 32, 119, 105, 108, 108, 32, 99, 97, 117, 115, 101, 32, 97, 32, 114, 101, 100, 105, 114, 101, 99, 116, 46, 32, 80, 108, 101, 97, 115, 101, 32, 106, 111, 105, 110, 32, 67, 108, 117, 98, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 32, 116, 111, 32, 103, 101, 116, 32, 102, 117, 108, 108, 32, 97, 99, 99, 101, 115, 115, 32, 116, 111, 32, 116, 104, 101, 32, 98, 111, 110, 117, 115, 32, 112, 108, 117, 103, 105, 110, 115, 32, 116, 104, 97, 116, 32, 98, 111, 111, 115, 116, 32, 121, 111, 117, 114, 32, 97, 110, 105, 109, 97, 116, 105, 111, 110, 32, 115, 117, 112, 101, 114, 112, 111, 119, 101, 114, 115, 46, 32, 68, 105, 115, 97, 98, 108, 101, 32, 116, 104, 105, 115, 32, 119, 97, 114, 110, 105, 110, 103, 32, 119, 105, 116, 104, 32, 103, 115, 97, 112, 46, 99, 111, 110, 102, 105, 103, 40, 123, 116, 114, 105, 97, 108, 87, 97, 114, 110, 58, 32, 102, 97, 108, 115, 101, 125, 41, 59)), console.log(w(37, 99, 71, 101, 116, 32, 117, 110, 114, 101, 115, 116, 114, 105, 99, 116, 101, 100, 32, 102, 105, 108, 101, 115, 32, 97, 116, 32, 104, 116, 116, 112, 115, 58, 47, 47, 103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109, 47, 99, 108, 117, 98), w(102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 49, 54, 112, 120, 59, 99, 111, 108, 111, 114, 58, 35, 52, 101, 57, 56, 49, 53)), window._gsapWarned = 1)
        }, 50); - 1 < --i;)
        if (-1 !== e.indexOf(n[i])) return !0;
      return t || !setTimeout(function () {
        window.location.href = w(104, 116, 116, 112, 115, 58, 47, 47) + u + w(47, 114, 101, 113, 117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47) + "?plugin=" + f + "&source=codepen"
      }, 3e3)
    }(window ? window.location.host : ""),
    g = {
      version: "3.8.0",
      name: "drawSVG",
      register: function register(e) {
        a = e, C()
      },
      init: function init(e, i) {
        if (!e.getBBox) return !1;
        h || C();
        var r, s, a, f = A(e);
        return this._style = e.style, this._target = e, i + "" == "true" ? i = "0 100%" : i ? -1 === (i + "").indexOf(" ") && (i = "0 " + i) : i = "0 0", s = function _parse(e, t, n) {
          var i, r, s = e.indexOf(" ");
          return r = s < 0 ? (i = void 0 !== n ? n + "" : e, e) : (i = e.substr(0, s), e.substr(s + 1)), i = o(i, t), (r = o(r, t)) < i ? [r, i] : [i, r]
        }(i, f, (r = B(e, f))[0]), this._length = m(f), this._dash = m(r[1] - r[0]), this._offset = m(-r[0]), this._dashPT = this.add(this, "_dash", this._dash, m(s[1] - s[0])), this._offsetPT = this.add(this, "_offset", this._offset, m(-s[0])), l && (a = d.getComputedStyle(e)).strokeLinecap !== a.strokeLinejoin && (s = n(a.strokeMiterlimit), this.add(e.style, "strokeMiterlimit", s, s + .01)), this._live = t(e) || ~(i + "").indexOf("live"), this._nowrap = ~(i + "").indexOf("nowrap"), this._props.push("drawSVG"), c
      },
      render: function render(e, t) {
        var n, i, r, o, s = t._pt,
          a = t._style;
        if (s) {
          for (t._live && (n = A(t._target)) !== t._length && (i = n / t._length, t._length = n, t._offsetPT && (t._offsetPT.s *= i, t._offsetPT.c *= i), t._dashPT ? (t._dashPT.s *= i, t._dashPT.c *= i) : t._dash *= i); s;) s.r(e, s.d), s = s._next;
          r = t._dash || e && 1 !== e && 1e-4 || 0, n = t._length - r + .1, o = t._offset, r && o && r + Math.abs(o % t._length) > t._length - .2 && (o += o < 0 ? .1 : -.1) && (n += .1), a.strokeDashoffset = r ? o : o + .001, a.strokeDasharray = n < .2 ? "none" : r ? r + "px," + (t._nowrap ? 999999 : n) + "px" : "0px, 999999px"
        }
      },
      getLength: A,
      getPosition: B
    };
  j() && a.registerPlugin(g), e.DrawSVGPlugin = g, e.default = g;
  if (typeof (window) === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    })
  } else {
    delete e.default
  }
});