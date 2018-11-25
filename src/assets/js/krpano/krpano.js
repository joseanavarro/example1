/*
	krpano Embedding Script
	krpano 1.19-pr4 (build 2016-04-07)
*/
function createPanoViewer(e) {
    function ut(e) {
        return ("" + e).toLowerCase()
    }

    function at(e, t) {
        return e[d](t) >= 0
    }

    function ft() {
        var t, r, i, s, o, u, a, f, l = n.location;
        l = l.search || l.hash;
        if (l) {
            t = ".html5.flash.wmode.mobilescale.fakedevice.", r = l[R](1)[j]("&");
            for (i = 0; i < r[M]; i++) s = r[i], o = s[d]("="), o == -1 && (o = s[M]), u = s[R](0, o), a = ut(u), f = s[R](o + 1), t[d]("." + a) >= 0 ? e[a] = f : a[N](0, 9) == "initvars." ? (e[O] || (e[O] = {}), e[O][u[N](9)] = f) : e.addVariable(u, f)
        }
    }

    function lt(e) {
        return e[P] = ft, e
    }

    function ct() {
        function x() {
            var e, n, i, s, o, u, a;
            if (t.plugins) {
                e = t.plugins["Shockwave Flash"];
                if (typeof e == "object") {
                    n = e.description;
                    if (n) {
                        i = v, t[q] && (s = t[q]["application/x-shockwave-flash"], s && (s.enabledPlugin || (i = p)));
                        if (i) {
                            o = n[j](" ");
                            for (u = 0; u < o[M]; ++u) {
                                a = parseFloat(o[u]);
                                if (isNaN(a)) continue;
                                return a
                            }
                        }
                    }
                }
            }
            if (r[G]) try {
                e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (e) {
                    n = e.GetVariable("$version");
                    if (n) return parseFloat(n[j](" ")[1][j](",").join("."))
                }
            } catch (f) {}
            return 0
        }

        function T() {
            var e, t, i = p,
                s = n[Z]("div");
            for (e = 0; e < 5; e++)
                if (typeof s.style[["p", "msP", "MozP", "WebkitP", "OP"][e] + "erspective"] != U) {
                    i = v, e == 3 && r.matchMedia && (t = r.matchMedia("(-webkit-transform-3d)"), t && (i = t.matches == v));
                    break
                }
            return i
        }

        function C() {
            var e, t, i = {
                failIfMajorPerformanceCaveat: v
            };
            if (r._krpWGL == v) return v;
            try {
                e = n[Z]("canvas");
                for (t = 0; t < 4; t++)
                    if (e.getContext([B, "experimental-webgl", "moz-webgl", "webkit-3d"][t], i)) return r._krpWGL = v, v
            } catch (s) {}
            return p
        }
        var l, c, h, m, g, y, b, w, E, S;
        if (s > 0) return;
        l = p, c = p, h = p, c = C();
        if (e.isDevice("iphone|ipad|ipod") && i[d]("opera mini") < 0) a = f = v, l = v;
        else {
            o = x(), o >= 10.1 && (u = v), l = T(), m = ut(t.platform), g = 0, y = 0, b = 0, w = i[d]("firefox/"), w < 0 && (w = i[d]("gecko/")), w >= 0 && (g = parseInt(i[N](1 + i[d]("/", w)), 10)), h = !!r[et], w = i[d](et), w > 0 && (b = parseInt(i[N](w + 7), 10), h = v), w = i[d](tt), w > 0 && (y = parseInt(i[N](w + 8), 10), g >= 18 && (y = 4)), l && (y > 0 && y < 4 && (l = p), g > 3 && g < 18 && y > 1 && (c = l = p), c || (m[d](Q) < 0 && g > 3 && y < 1 && (l = p), h && (l = p)));
            if (l || c) {
                a = v, E = i[d]("blackberry") >= 0 || i[d]("rim tablet") >= 0 || i[d]("bb10") >= 0, S = (t.msMaxTouchPoints | 0) > 1;
                if (y >= 4 || E || S) f = v
            }
        }
        s = 1 | l << 1 | c << 2 | h << 3
    }

    function ht(e) {
        function L(e) {
            function a() {
                r[m] ? (r[m]("DOMMouseScroll", c, p), r[m]("mousewheel", c, p), n[m]("mousedown", f, p), n[m]("mouseup", l, p)) : (r.opera ? r.attachEvent(_, c) : r[_] = n[_] = c, n.onmousedown = f, n.onmouseup = l)
            }

            function f(e) {
                e || (e = r.event, e[w] = e[X]), u = e ? e[w] : x
            }

            function l(e) {
                var t, i, s, a, f, l, c, h;
                e || (e = r.event, e[w] = e[X]), t = 0, i = o[M];
                for (t = 0; t < i; t++) {
                    s = o[t];
                    if (s) {
                        a = n[s.id];
                        if (a && s.needfix) {
                            f = a[S](), l = a == e[w], c = a == u, h = e.clientX >= f.left && e.clientX < f.right && e.clientY >= f.top && e.clientY < f.bottom;
                            if ((l || c) && h == p) try {
                                a[I] && a[I](0, "mouseUp")
                            } catch (d) {}
                        }
                    }
                }
                return v
            }

            function c(t) {
                var i, u, a, f, l, c;
                t || (t = r.event, t[w] = t[X]), i = 0, u = p, t.wheelDelta ? (i = t.wheelDelta / 120, r.opera && s && (i /= 4 / 3)) : t.detail && (i = -t.detail, s == p && (i /= 3));
                if (i) {
                    a = 0, f = o[M];
                    for (a = 0; a < f; a++) {
                        l = o[a];
                        if (l) {
                            c = n[l.id];
                            if (c && c == t[w]) {
                                try {
                                    c.jswheel ? c.jswheel(i) : c[b] ? c[b](i) : c[k] && (c[k](), c[b] && c[b](i))
                                } catch (h) {}
                                u = v;
                                break
                            }
                        }
                    }
                }
                e[$] == p && (u = p);
                if (u) return t[nt] && t[nt](), t[st] && t[st](), t.cancelBubble = v, t.cancel = v, n[m] || (t.returnValue = p), p
            }
            var i, s = ut(t.appVersion)[d](Q) >= 0,
                o = r._krpMW,
                u = x;
            o || (o = r._krpMW = new Array, a()), i = e[y], o.push({
                id: e.id,
                needfix: s || !!r[et] || i == "opaque" || i == "transparent"
            })
        }
        var i, s, o, u, a, f, l = encodeURIComponent,
            c = "",
            h = e[rt],
            T = e[H],
            N = e.id;
        for (;;) {
            s = n[E](N);
            if (!s) break;
            N += String.fromCharCode(48 + Math.floor(9 * Math.random())), e.id = N
        }
        e[y] && (T[y] = e[y]), e[C] && (T[C] = e[C]), e[z] !== undefined && (h[z] = e[z]), e[y] = ut(T[y]), T.allowfullscreen = "true", T.allowscriptaccess = it, i = "browser.", c = i + "useragent=" + l(t.userAgent) + "&" + i + "location=" + l(r.location.href);
        for (i in h) c += "&" + l(i) + "=" + l(h[i]);
        i = O, h = e[i];
        if (h) {
            c += "&" + i + "=";
            for (i in h) c += "%26" + l(escape(i)) + "=" + l(escape(h[i]))
        }
        T.flashvars = c, e[A] && (T.base = e[A]), o = "", u = ' id="' + N + '" width="' + e.width + '" height="' + e.height + '" style="outline:none;" ', a = "_krpcb_" + N, !e[F] || (r[a] = function() {
            try {
                delete r[a]
            } catch (t) {
                r[a] = x
            }
            e[F](n[E](N))
        });
        if (t.plugins && t[q] && !r[G]) {
            o = '<embed name="' + N + '"' + u + 'type="application/x-shockwave-flash" src="' + e.swf + '" ';
            for (i in T) o += i + '="' + T[i] + '" ';
            o += " />"
        } else {
            o = "<object" + u + 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="' + e.swf + '" />';
            for (i in T) o += '<param name="' + i + '" value="' + T[i] + '" />';
            o += "</object>"
        }
        e[g].innerHTML = o, e.focus === v && (f = n[E](N), f && f.focus()), L(e)
    }

    function pt(e) {
        typeof embedpanoJS !== U ? embedpanoJS(e) : e[T]("krpano HTML5 Viewer not available!")
    }

    function dt(n, r) {
        var u, a, f, l;
        n == 1 ? (o >= 11.4 && (u = v, ut(t.platform)[d](Q) >= 0 && ut(t.vendor)[d]("apple") >= 0 && (a = i[d]("webkit/"), a > 0 && (a = parseFloat(i[N](a + 7)), !isNaN(a) && a > 0 && a < 534 && (u = p))), u && (e[y] == x && !e[H][y] ? e[y] = s & 8 ? "window" : "direct" : (f = ("" + e[y])[d]("-flash"), f > 0 && (e[y] = e[y][N](0, f))))), ht(e)) : n == 2 ? pt(e) : (l = "", r < 2 && (l += "Adobe Flashplayer"), r == 0 && (l += " or<br/>"), r != 1 && (l += "HTML5 Browser with WebGL ", at(ut(e[W]), B) || (l += "or CSS3D "), l += "support"), l += " required!", e[T](l))
    }

    function vt() {
        var t = 'Local usage with <span style="border:1px solid gray;padding:0px 3px;">file://</span> urls is limited due browser security restrictions!<br><br>Use a localhost server (like the <a href="http://krpano.com/tools/ktestingserver/#top" style="color:white;">krpano Testing Server</a>) for local testing!<br>Just start the krpano Testing Server and refresh this page.<br><br><a href="http://krpano.com/docu/localusage/#top" style="color:gray;font-style:italic;text-decoration:none;">More information...</a>';
        e[T](t)
    }

    function mt(e, t, n) {
        var r;
        try {
            r = new XMLHttpRequest, r.responseType = "text", r.open("GET", e, v), r.onreadystatechange = function() {
                var e;
                r.readyState === 4 && (e = r.status, e == 0 && r.responseText || e == 200 ? t() : n())
            }, r.send(x)
        } catch (i) {
            n()
        }
    }
    var t, n, r, i, s, o, u, a, f, l, c, h, p = !1,
        d = "indexOf",
        v = !0,
        m = "addEventListener",
        g = "targetelement",
        y = "wmode",
        b = "externalMouseEvent",
        w = "target",
        E = "getElementById",
        S = "getBoundingClientRect",
        x = null,
        T = "onerror",
        N = "slice",
        C = "bgcolor",
        k = "enable_mousewheel_js_bugfix",
        L = "localfallback",
        A = "flashbasepath",
        O = "initvars",
        M = "length",
        _ = "onmousewheel",
        D = "fallback",
        P = "passQueryParameters",
        H = "params",
        B = "webgl",
        j = "split",
        F = "onready",
        I = "externalMouseEvent2",
        q = "mimeTypes",
        R = "substring",
        U = "undefined",
        z = "xml",
        W = "html5",
        X = "srcElement",
        V = "basepath",
        $ = "mwheel",
        J = "flash",
        K = "consolelog",
        Q = "mac",
        G = "ActiveXObject",
        Y = "never",
        Z = "createElement",
        et = "chrome",
        tt = "android",
        nt = "stopPropagation",
        rt = "vars",
        it = "always",
        st = "preventDefault",
        ot = "only";
    return t = navigator, n = document, r = window, i = ut(t.userAgent), s = 0, o = 0, u = p, a = p, f = v, e || (e = {}), l = e[P] === v, e.swf || (e.swf = "krpano.swf"), e[z] === undefined && (e[z] = e.swf[j](".swf").join(".xml")), e.id || (e.id = "krpanoSWFObject"), e.width || (e.width = "100%"), e.height || (e.height = "100%"), e[C] || (e[C] = "#000000"), e[y] || (e[y] = x), e[w] || (e[w] = x), e[W] || (e[W] = "auto"), e[J] || (e[J] = x), e[$] === undefined && (e[$] = v), e[rt] || (e[rt] = {}), e[H] || (e[H] = {}), e[F] || (e[F] = x), e.mobilescale || (e.mobilescale = .5), e.fakedevice || (e.fakedevice = x), e[L] || (e[L] = "http://localhost:8090"), e[V] ? e[A] = e[V] : (c = "./", h = e.swf.lastIndexOf("/"), h >= 0 && (c = e.swf[N](0, h + 1)), e[V] = c), e.isDevice = function(e) {
        var t, n, r, s = "all",
            o = ["ipad", "iphone", "ipod", tt];
        for (t = 0; t < 4; t++) i[d](o[t]) >= 0 && (s += "|" + o[t]);
        e = ut(e)[j]("|");
        if (e == x) return v;
        n = e[M];
        for (t = 0; t < n; t++) {
            r = e[t];
            if (s[d](r) >= 0) return v
        }
        return p
    }, e.addVariable = function(t, n) {
        t = ut(t), t == "pano" || t == z ? e[z] = n : e[rt][t] = n
    }, e.addParam = function(t, n) {
        e[H][ut(t)] = n
    }, e.useHTML5 = function(t) {
        e[W] = t
    }, e.isHTML5possible = function() {
        return ct(), a
    }, e.isFlashpossible = function() {
        return ct(), u
    }, e[T] || (e[T] = function(t) {
        var n = e[g];
        n ? n.innerHTML = '<table style="width:100%;height:100%;"><tr style="vertical-align:middle;text-align:center;"><td>ERROR:<br><br>' + t + "<br><br></td></tr></table>" : alert("ERROR: " + t)
    }), e.embed = function(t) {
        var i, o, f, c, h, m;
        t && (e[w] = t), e[g] = n[E](e[w]), e[g] ? (l && ft(), e.focus === undefined && e[g][S] && (i = e[g][S](), e.focus = i.top == 0 && i.left == 0 && i.right >= r.innerWidth && i.bottom >= r.innerHeight), e[$] == p && (e[rt]["control.disablewheel"] = v), e[K] && (e[rt][K] = e[K]), s == 0 && ct(), o = ut(e[W]), f = e[J], f && (f = ut(f), f == "prefer" ? o = D : f == D ? o = "prefer" : f == ot ? o = Y : f == Y && (o = ot)), c = 0, h = 0, m = a, m && at(o, B) && (m = s & 4), o == Y ? (c = u ? 1 : 0, h = 1) : at(o, ot) ? (c = m ? 2 : 0, h = 2) : at(o, it) ? c = h = 2 : o == D ? c = u ? 1 : a ? 2 : 0 : c = m ? 2 : u ? 1 : 0, c == 2 && ut(location.href[N](0, 7)) == "file://" ? mt(location.href, function() {
            dt(c, h)
        }, function() {
            var t, n = ut(e[L]);
            n == J ? u ? dt(1, 0) : vt() : n == "none" ? dt(c, h) : n[d]("://") > 0 ? (t = new Image, t[T] = vt, t.onload = function() {
                location.href = n + "/krpanotestingserverredirect.html?" + location.href
            }, t.src = n + "/krpanotestingserver.png") : vt()
        }) : dt(c, h)) : e[T]("No Embedding Target")
    }, lt(e)
}

function removepano(e) {
    var t, n, r, i, s = document.getElementById(e);
    if (s) {
        t = window._krpMW;
        if (t)
            for (n = 0; n < t.length; n++) {
                r = t[n];
                if (r && r.id === e) {
                    t.splice(n, 1);
                    break
                }
            }
        s.unload && s.unload(), i = s.parentNode, i && i.removeChild(s)
    }
}

function embedpano(e) {
    createPanoViewer(e).embed()
};
/*
	krpano HTML5 Viewer
	krpano 1.19-pr4 (build 2016-04-07)
*/
var krpanoJS = {
    version: "1.19-pr4",
    build: "2016-04-07"
};

function embedpanoJS(p) {
    function embedhtml5(ed, Jc) {
    function Zd() {
        function F(a) {
            return ("" + a).toLowerCase()
        }

        function ya(a, c) {
            if (!a) return a;
            var w = 0,
                b = 0,
                e, n = a.length,
                h;
            for (e = 0; e < n; e++)
                if (h = a.charCodeAt(e), 32 >= h) w++;
                else break;
            for (e = n - 1; 0 < e; e--)
                if (h = a.charCodeAt(e), 32 >= h) b++;
                else break;
            void 0 === c && (e = a.charAt(w), h = a.charAt(n - b - 1), ("'" == e && "'" == h || '"' == e && '"' == h) && 3 == a.split(e).length && (w++, b++));
            return a = a.slice(w, n - b)
        }

        function ma(a) {
            return _[55] === typeof a ? a : 0 <= _[402].indexOf(String(a).toLowerCase())
        }

        function qa(a, c) {
            if (typeof a != c) {
                if (_[540] == c) return Number(a);
                if (_[55] == c) return ma(a);
                if (_[1] == c) return null == a ? null : String(a)
            }
            return a
        }

        function sa(a) {
            return Number(a).toFixed(6)
        }

        function va(a, c, w, b) {
            a.__defineGetter__(c, w);
            void 0 !== b && a.__defineSetter__(c, b)
        }

        function Eb(a, c, w) {
            a.__defineGetter__(c, function() {
                return a[w]
            });
            a.__defineSetter__(c, function(c) {
                a[w] = c
            })
        }

        function ta(a, c, w) {
            var b = "_" + c;
            a[b] = w;
            a.__defineGetter__(c, function() {
                return a[b]
            });
            a.__defineSetter__(c, function(c) {
                c = qa(c, typeof w);
                c != a[b] && (a[b] = c, a.haschanged = !0)
            })
        }

        function na(a) {
            a && a.preventDefault()
        }

        function ca(a, c, w, b) {
            a && a.addEventListener(c, w, b)
        }

        function ka(a, c, w, b) {
            a && a.removeEventListener(c, w, b)
        }

        function jb(a, c, w, b, e) {
            c[a + _[320]](w, b, e)
        }

        function Ja(a) {
            var c = ba.createElement(1 == a ? "img" : 2 == a ? _[541] : "div");
            c && 1 == a && "off" != ud && (c.crossOrigin = ud);
            return c
        }

        function Kc(a) {
            return function() {
                return a.apply(a, arguments)
            }
        }

        function vd(a) {
            return a.split("<").join("&lt;").split(">").join("&gt;")
        }

        function wa(a, c) {
            var w = "(" + (a >> 16 & 255) + "," + (a >> 8 & 255) + "," + (a & 255);
            void 0 === c && (c = 1 - (a >> 24 & 255) / 255);
            return (1 > c ? "rgba" + w + "," + c : "rgb" + w) + ")"
        }

        function $d(a) {
            return a.split("[").join("<").split("<<").join("[").split("]").join(">").split(">>").join("]")
        }

        function fd(a, c) {
            a = Number(a);
            c = Number(c);
            return a - 360 * Math.round((a - c) / 360)
        }

        function gd(a) {
            if (a) {
                var c = a.indexOf("?");
                0 <= c && (a = a.slice(0, c));
                c = a.indexOf("#");
                0 <= c && (a = a.slice(0, c))
            }
            return a
        }

        function ed(a) {
            a = gd(a);
            var c = a.lastIndexOf("/"),
                w = a.lastIndexOf("\\");
            w > c && (c = w);
            return a.slice(c + 1)
        }

        function wd(a, c) {
            var w = String(a).charCodeAt(0);
            return 48 <= w && 57 >= w ? (oa(3, c + _[167]), !1) : !0
        }

        function Zd(a, c) {
            for (var w = "", b = 0, e = 1, n = 0, h = 0; 1 == e && 0 == b;) {
                var g, z = a.indexOf("*", n),
                    w = "";
                0 > z ? (z = a.length, b = 1) : (w = a.indexOf("*", z + 1), 0 > w && (w = a.length), g = w - (z + 1), w = a.substr(z + 1, g));
                g = z - n;
                0 < g && c.substr(h, b ? void 0 : g) != a.substr(n, g) && (e = 0);
                n = z + 1;
                "" != w && (h = c.indexOf(w, h), 0 > h && (e = 0))
            }
            return !!e
        }

        function Lc(a, c, w, b) {
            for (; 32 >= a.charCodeAt(c);) c++;
            for (; 32 >= a.charCodeAt(w - 1);) w--;
            var e = a.charCodeAt(c);
            if (37 == e) a = Q(a.slice(c + 1, w), b);
            else if (103 == e && "get(" == a.slice(c, c + 4)) {
                for (c += 4; 32 >= a.charCodeAt(c);) c++;
                for (w = a.lastIndexOf(")"); 32 >= a.charCodeAt(w - 1);) w--;
                a = Q(a.slice(c, w), b)
            } else 99 == e && "calc(" == a.slice(c, c + 5) ? a = Q(a.slice(c, w), b) : (b = a.charCodeAt(c), 39 != b && 34 != b || b != a.charCodeAt(w - 1) || (c++, w--), a = a.slice(c, w));
            return a
        }

        function xd(a) {
            var c = [];
            if (null == a || void 0 == a) return c;
            var w, b = 0,
                e, n, h = 0;
            a = F(a);
            e = a.length;
            for (w = 0; w < e; w++) n = a.charCodeAt(w), 40 == n ? h++ : 41 == n ? h-- : 46 == n && 0 == h && (c.push(a.slice(b, w)), b = w + 1);
            c.push(a.slice(b));
            return c
        }

        function Na(a, c) {
            var b = !1;
            a = F(a);
            var f, e, n, h;
            n = hd[a];
            null != n && void 0 !== n && "" != n && (Ob(n, null, c), b = !0);
            h = hd.getArray();
            e = h.length;
            for (f = 0; f < e; f++)
                if (n = h[f]) n = n[a], null != n && void 0 !== n && "" != n && (Ob(n, null, c), b = !0);
            return b
        }

        function da(a, c, b, f, e) {
            if (c && _[1] == typeof c) {
                var n = c.slice(0, 4);
                "get:" == n ? c = Q(c.slice(4)) : "calc" == n && 58 == c.charCodeAt(4) && (c = X.calc(null, c.slice(5)))
            }
            var n = null,
                h, g = xd(a);
            h = g.length;
            if (1 == h && f && (n = g[0], void 0 !== f[n])) {
                f[n] = _[55] == typeof f[n] ? ma(c) : c;
                return
            }
            var z = l,
                n = null;
            1 < h && (n = g[h - 1]);
            for (a = 0; a < h; a++) {
                var ua = g[a],
                    r = a == h - 1,
                    y = null,
                    p = ua.indexOf("[");
                0 < p && (y = Lc(ua, p + 1, ua.length - 1, f), ua = ua.slice(0, p));
                p = !1;
                if (void 0 === z[ua]) {
                    if (b) break;
                    r || (null == y ? z[ua] = new id : (z[ua] = new pb(id), p = !0))
                } else p = !0;
                if (p && 0 == r && z[ua] && 1 == z[ua].isArray && null != y)
                    if (r = null, z = z[ua], r = b ? z.getItem(y) : z.createItem(y)) {
                        if (a == h - 2 && "name" == n) {
                            c = F(c);
                            y != c && (null == c || "null" == c || "" == c ? z.removeItem(y) : z.renameItem(y, c));
                            break
                        }
                        z = r;
                        continue
                    } else break;
                if (r) z[ua] = 1 == e ? c : qa(c, typeof z[ua]);
                else if (z = z[ua], null == z) break
            }
        }

        function ae(a) {
            if (a && "null" != a) {
                if (_[1] == typeof a) {
                    var c = a.split("&"),
                        b = c.length,
                        f;
                    a = {};
                    for (f = 0; f < b; f++) {
                        var e = c[f].split("=");
                        a[e[0]] = e[1]
                    }
                }
                for (var n in a) "xml" != n && da(n, a[n])
            }
        }

        function Q(a, c, b) {
            if (a && "calc(" == ("" + a).slice(0, 5)) return X.calc(null, a.slice(5, a.lastIndexOf(")")));
            var f, e, n = xd(a);
            f = n.length;
            if (1 == f && _[324] == n[0]) return c ? c._type + "[" + c.name + "]" : "";
            if (1 == f && c && (e = n[0], c.hasOwnProperty(e))) return c[e];
            var h = l;
            for (a = 0; a < f; a++) {
                e = n[a];
                var g = a == f - 1,
                    z = null,
                    ua = e.indexOf("[");
                0 < ua && (z = Lc(e, ua + 1, e.length - 1, c), e = e.slice(0, ua));
                if (h && void 0 !== h[e]) {
                    if (null != z && (ua = h[e]) && ua.isArray)
                        if (e = ua.getItem(z)) {
                            if (g) return e;
                            h = e;
                            continue
                        } else break;
                    if (g) return h[e];
                    h = h[e]
                } else break
            }
            return !0 === b ? void 0 : null
        }

        function Ob(a, c, b) {
            X.callaction(a, c, b)
        }

        function We(a, c, b) {
            Ob(a, c ? Q(c) : null, b ? ma(b) : null)
        }

        function oa(a, c) {
            !yd && (0 < a || l.debugmode) && (c = ["DEBUG", "INFO", _[519], "ERROR", _[378]][a] + ": " + c, V.log(c), 2 < a && l.showerrors && setTimeout(function() {
                try {
                    V.showlog(!0)
                } catch (a) {}
            }, 500))
        }

        function Ga(a, c) {
            if (!yd) {
                a = "" + a;
                var w = 0 < F(a).indexOf("load");
                a = vd(a).split("[br]").join("<br/>");
                var f = La.createItem(_[466]),
                    e = La.createItem(_[464]);
                f.sprite || (f.create(), V.controllayer.appendChild(f.sprite));
                e.sprite || (e.create(), V.controllayer.appendChild(e.sprite));
                f.imagewidth = 1;
                f.imageheight = 1;
                f.loaded = !0;
                f.handcursor = !1;
                f.align = _[82];
                f.width = "100%";
                f.height = "100%";
                f.alpha = .5;
                f.keep = !0;
                f = f.sprite.style;
                f.backgroundColor = _[38];
                f.zIndex = 99999998;
                w && (e.visible = !1);
                e.imagewidth = 1;
                e.imageheight = 1;
                e.loaded = !0;
                e.handcursor = !1;
                e.align = _[87];
                e.y = 0;
                e.width = "105%";
                var n = b.ie || b.android ? -2 : 2;
                e.height = n + 46 / aa;
                e.keep = !0;
                f = e.sprite.style;
                f.backgroundColor = _[38];
                f.color = _[54];
                f.fontFamily = b.realDesktop && !b.ie ? _[30] : _[20];
                f.fontSize = "12px";
                f.margin = "-2px";
                f.border = _[258];
                c || (c = _[302]);
                e.sprite.innerHTML = _[178] + c + "<br/>" + a + _[334];
                f.zIndex = 99999999;
                f[jd] = _[219];
                e.jsplugin = {
                    onresize: function(a, c) {
                        var b = e.sprite.childNodes[0].clientHeight;
                        e.height = n + Math.max(46, b) / aa;
                        0 >= b && (e.imageheight = 1)
                    }
                };
                setTimeout(function() {
                    try {
                        e.visible = !0
                    } catch (a) {}
                }, w ? 500 : 10)
            }
        }

        function Xe() {
            fb.removeelements(!0);
            xe.stop();
            gb.unregister();
            cb.unload();
            V.remove()
        }

        function Ye() {
            this.caller = this.args = this.cmd = null
        }

        function qb(a, c, b) {
            var f = null;
            if (null == a || "" == a) return null;
            for (var e = 0, n = 0, h = 0, g = 0, z = 0, l = 0, r = 0, y = 0, p = "", p = 0, p = a.charCodeAt(z); 0 < p && 32 >= p || 59 == p;) z++, p = a.charCodeAt(z);
            for (var v = Ze, t = 0, n = a.length, e = z; e < n; e++)
                if (p = a.charCodeAt(e), 0 == y && 0 == r && 40 == p) h++;
                else if (0 == y && 0 == r && 41 == p) {
                if (g++, h == g) {
                    l = e + 1;
                    p = a.slice(z, l);
                    v[t++] = p;
                    z = l;
                    for (p = a.charCodeAt(z); 0 < p && 32 >= p;) z++, p = a.charCodeAt(z);
                    p = a.charCodeAt(z);
                    if (59 != p) {
                        l = n;
                        break
                    }
                    z++;
                    for (p = a.charCodeAt(z); 59 == p || 0 < p && 32 >= p;) z++, p = a.charCodeAt(z);
                    e = z
                }
            } else 34 == p ? 0 == r ? r = 1 : 1 == r && (r = 0) : 39 == p ? 0 == r ? r = 2 : 2 == r && (r = 0) : 91 == p && 0 == r ? y++ : 93 == p && 0 == r && y--;
            l != n && (p = a.slice(z, n), 0 < p.length && (v[t++] = p));
            n = t;
            for (e = 0; e < n; e++)
                if (p = v[e], r = p.indexOf("["), a = p.indexOf("]"), h = p.indexOf("("), 0 < r && 0 < a && h > r && h < a && (h = p.indexOf("(", a)), g = a = null, 0 < h ? (a = p.slice(0, h), g = ya(p.slice(h + 1, p.lastIndexOf(")")), !1), 0 >= g.length && (g = null)) : (a = p, g = null), a = ya(a), "//" != a.slice(0, 2)) {
                    z = [];
                    if (null != g) {
                        for (var l = g.length, h = 0, q = t = -1, x = r = 0, p = null, y = 0; y < l; y++) p = g.charCodeAt(y), 0 == r && 40 == p ? h++ : 0 == r && 41 == p ? h-- : 34 == p ? 1 == r && 0 <= t ? (t = -1, r = 0) : 0 == r && (t = y, r = 1) : 39 == p && (2 == r && 0 <= q ? (q = -1, r = 0) : 0 == r && (q = y, r = 2)), 44 == p && 0 == h && 0 == r && (p = ya(g.slice(x, y)), z.push(p), x = y + 1);
                        0 == h && (p = ya(g.slice(x, y)), z.push(p))
                    }
                    null == f && (f = []);
                    h = new Ye;
                    h.cmd = b ? a : F(a);
                    h.args = z;
                    h.caller = c;
                    f.push(h)
                }
            return f
        }

        function uc() {
            this.z = this.y = this.x = 0
        }

        function Ra() {
            var a = _[134] !== typeof Float32Array ? new Float32Array(16) : Array(16);
            a[0] = a[5] = a[10] = a[15] = 1;
            a[1] = a[2] = a[3] = a[4] = a[6] = a[7] = a[8] = a[9] = a[11] = a[12] = a[13] = a[14] = 0;
            return a
        }

        function ye(a, c, b, f, e, n, h, g, z, l, r, y, p, v, t, q, x) {
            a[0] = c;
            a[1] = b;
            a[2] = f;
            a[3] = e;
            a[4] = n;
            a[5] = h;
            a[6] = g;
            a[7] = z;
            a[8] = l;
            a[9] = r;
            a[10] = y;
            a[11] = p;
            a[12] = v;
            a[13] = t;
            a[14] = q;
            a[15] = x
        }

        function Pb(a, c, b, f, e, n, h, g, z, l) {
            a[0] = c;
            a[1] = b;
            a[2] = f;
            a[3] = 0;
            a[4] = e;
            a[5] = n;
            a[6] = h;
            a[7] = 0;
            a[8] = g;
            a[9] = z;
            a[10] = l;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1
        }

        function Nd(a, c) {
            a[0] = c[0];
            a[1] = c[1];
            a[2] = c[2];
            a[3] = c[3];
            a[4] = c[4];
            a[5] = c[5];
            a[6] = c[6];
            a[7] = c[7];
            a[8] = c[8];
            a[9] = c[9];
            a[10] = c[10];
            a[11] = c[11];
            a[12] = c[12];
            a[13] = c[13];
            a[14] = c[14];
            a[15] = c[15]
        }

        function ic(a, c) {
            var b = c[0],
                f = c[1],
                e = c[2],
                n = c[3],
                h = c[4],
                g = c[5],
                z = c[6],
                l = c[7],
                r = c[8],
                y = c[9],
                p = c[10],
                v = c[11],
                t = c[12],
                q = c[13],
                x = c[14],
                J = c[15],
                B = a[0],
                D = a[1],
                A = a[2],
                k = a[3];
            a[0] = B * b + D * h + A * r + k * t;
            a[1] = B * f + D * g + A * y + k * q;
            a[2] = B * e + D * z + A * p + k * x;
            a[3] = B * n + D * l + A * v + k * J;
            B = a[4];
            D = a[5];
            A = a[6];
            k = a[7];
            a[4] = B * b + D * h + A * r + k * t;
            a[5] = B * f + D * g + A * y + k * q;
            a[6] = B * e + D * z + A * p + k * x;
            a[7] = B * n + D * l + A * v + k * J;
            B = a[8];
            D = a[9];
            A = a[10];
            k = a[11];
            a[8] = B * b + D * h + A * r + k * t;
            a[9] = B * f + D * g + A * y + k * q;
            a[10] = B * e + D * z + A * p + k * x;
            a[11] = B * n + D * l + A * v + k * J;
            B = a[12];
            D = a[13];
            A = a[14];
            k = a[15];
            a[12] = B * b + D * h + A * r + k * t;
            a[13] = B * f + D * g + A * y + k * q;
            a[14] = B * e + D * z + A * p + k * x;
            a[15] = B * n + D * l + A * v + k * J
        }

        function uf(a, c) {
            var b = a[0],
                f = a[1],
                e = a[2],
                n = a[3],
                h = a[4],
                g = a[5],
                z = a[6],
                l = a[7],
                r = a[8],
                y = a[9],
                p = a[10],
                v = a[11],
                t = a[12],
                q = a[13],
                x = a[14],
                J = a[15],
                B = c[0],
                D = c[1],
                A = c[2],
                k = c[3],
                d = c[4],
                G = c[5],
                E = c[6],
                R = c[7],
                u = c[8],
                N = c[9],
                T = c[10],
                H = c[11],
                Fb = c[12],
                ea = c[13],
                O = c[14],
                F = c[15];
            a[0] = B * b + D * h + A * r + k * t;
            a[1] = B * f + D * g + A * y + k * q;
            a[2] = B * e + D * z + A * p + k * x;
            a[3] = B * n + D * l + A * v + k * J;
            a[4] = d * b + G * h + E * r + R * t;
            a[5] = d * f + G * g + E * y + R * q;
            a[6] = d * e + G * z + E * p + R * x;
            a[7] = d * n + G * l + E * v + R * J;
            a[8] = u * b + N * h + T * r + H * t;
            a[9] = u * f + N * g + T * y + H * q;
            a[10] = u * e + N * z + T * p + H * x;
            a[11] = u * n + N * l + T * v + H * J;
            a[12] = Fb * b + ea * h + O * r + F * t;
            a[13] = Fb * f + ea * g + O * y + F * q;
            a[14] = Fb * e + ea * z + O * p + F * x;
            a[15] = Fb * n + ea * l + O * v + F * J
        }

        function $e(a, c, b, f) {
            ye(a, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c, b, f, 1)
        }

        function ze(a, c, b, f) {
            var e = a[3],
                n = a[7],
                h = a[11],
                g = a[15];
            a[0] += e * c;
            a[1] += e * b;
            a[2] += e * f;
            a[4] += n * c;
            a[5] += n * b;
            a[6] += n * f;
            a[8] += h * c;
            a[9] += h * b;
            a[10] += h * f;
            a[12] += g * c;
            a[13] += g * b;
            a[14] += g * f
        }

        function af(a, c) {
            var b = c[0],
                f = c[1],
                e = c[2],
                n = c[4],
                h = c[5],
                g = c[6],
                z = c[8],
                l = c[9],
                r = c[10],
                y = a[0],
                p = a[1],
                v = a[2];
            a[0] = y * b + p * n + v * z;
            a[1] = y * f + p * h + v * l;
            a[2] = y * e + p * g + v * r;
            y = a[4];
            p = a[5];
            v = a[6];
            a[4] = y * b + p * n + v * z;
            a[5] = y * f + p * h + v * l;
            a[6] = y * e + p * g + v * r;
            y = a[8];
            p = a[9];
            v = a[10];
            a[8] = y * b + p * n + v * z;
            a[9] = y * f + p * h + v * l;
            a[10] = y * e + p * g + v * r;
            y = a[12];
            p = a[13];
            v = a[14];
            a[12] = y * b + p * n + v * z;
            a[13] = y * f + p * h + v * l;
            a[14] = y * e + p * g + v * r
        }

        function Ae(a, c, b, f) {
            var e, n, h;
            e = b * Y;
            b = Math.cos(e);
            n = Math.sin(e);
            e = -(c - 90) * Y;
            c = Math.cos(e);
            h = Math.sin(e);
            e = -f * Y;
            f = Math.cos(e);
            e = Math.sin(e);
            Pb(a, c * f - h * n * e, c * e + h * n * f, -h * b, -b * e, b * f, n, h * f + c * n * e, h * e - c * n * f, c * b)
        }

        function bf(a, c, b) {
            b = -b * Y;
            var f = Math.cos(b);
            b = Math.sin(b);
            0 == c ? Pb(a, 1, 0, 0, 0, f, b, 0, -b, f) : 1 == c ? Pb(a, f, 0, -b, 0, 1, 0, b, 0, f) : Pb(a, f, b, 0, -b, f, 0, 0, 0, 1)
        }

        function Be(a, c, b, f, e) {
            var n, h, g;
            e && (f = -f, b = -b, c = -c);
            n = -f * Y;
            f = Math.cos(n);
            h = Math.sin(n);
            n = -b * Y;
            b = Math.cos(n);
            g = Math.sin(n);
            n = -c * Y;
            c = Math.cos(n);
            n = Math.sin(n);
            e ? Pb(a, b * c - g * h * n, b * n + g * h * c, -g * f, -f * n, f * c, h, g * c + b * h * n, g * n - b * h * c, b * f) : Pb(a, c * b + n * h * g, n * f, -c * g + n * h * b, -n * b + c * h * g, c * f, n * g + c * h * b, f * g, -h, f * b)
        }

        function Ce(a, c) {
            var b = c[0],
                f = c[1],
                e = c[2],
                n = c[4],
                h = c[5],
                g = c[6],
                z = c[8],
                l = c[9],
                r = c[10],
                y = 1 / (b * h * r + f * g * z + n * l * e - z * h * e - n * f * r - l * g * b);
            Pb(a, (h * r - l * g) * y, (-f * r + l * e) * y, (f * g - h * e) * y, (-n * r + z * g) * y, (b * r - z * e) * y, (-b * g + n * e) * y, (n * l - z * h) * y, (-b * l + z * f) * y, (b * h - n * f) * y)
        }

        function Od(a, c) {
            var b = c.x,
                f = c.y,
                e = c.z;
            c.x = b * a[0] + f * a[4] + e * a[8];
            c.y = b * a[1] + f * a[5] + e * a[9];
            c.z = b * a[2] + f * a[6] + e * a[10]
        }

        function be(a, c) {
            var b = c[0],
                f = c[1],
                e = c[2];
            c[0] = b * a[0] + f * a[4] + e * a[8];
            c[1] = b * a[1] + f * a[5] + e * a[9];
            c[2] = b * a[2] + f * a[6] + e * a[10]
        }

        function Ub(a) {
            return b.fractionalscaling ? Math.round(a * (b.pixelratio + 1E-7)) / b.pixelratio : Math.round(a)
        }

        function Vb(a, c, b, f) {
            a = ("" + a).split(b);
            f = f ? f : [0, 0, 0, 0];
            b = a.length;
            4 == b ? (f[0] = a[0] * c + .5 | 0, f[1] = a[1] * c + .5 | 0, f[2] = a[2] * c + .5 | 0, f[3] = a[3] * c + .5 | 0) : 3 == b ? (f[0] = a[0] * c + .5 | 0, f[1] = f[3] = a[1] * c + .5 | 0, f[2] = a[2] * c + .5 | 0) : 2 == b ? (f[0] = f[2] = a[0] * c + .5 | 0, f[1] = f[3] = a[1] * c + .5 | 0) : f[0] = f[1] = f[2] = f[3] = a[0] * c + .5 | 0;
            return f
        }

        function De(a) {
            var c = a && a._poly;
            c && (c.setAttribute("fill", !0 === a.polyline ? "none" : wa(a.fillcolor, a.fillalpha)), c.setAttribute(_[539], wa(a.bordercolor, a.borderalpha)), c.setAttribute(_[340], a.borderwidth * aa))
        }

        function cf(a) {
            var c = u.r_rmatrix,
                b = u.r_zoom,
                f = u.r_zoff,
                e = .5 * Sa,
                n = .5 * Da + u.r_yoff,
                h = u._stereographic ? 10 - f : 1 - f * (1 - Math.min(u.fisheye * u.fisheye, 1)),
                g = a._poly;
            if (!g) {
                var z = V.svglayer;
                z || (z = document.createElementNS(_[96], "svg"), z.setAttribute(_[63], "100%"), z.setAttribute(_[18], "100%"), z.style.position = _[0], z.style.left = 0, z.style.top = 0, z.style.display = la.stereo ? "none" : "", V.svglayer = z, V.hotspotlayer.appendChild(z));
                g = document.createElementNS(_[96], ma(a.polyline) ? _[138] : _[532]);
                z.appendChild(g);
                g.kobject = a;
                a._poly = g;
                De(a);
                g.style.opacity = Number(a.DATA.alpha) * (a.keep ? 1 : vc);
                a._assignEvents(g);
                setTimeout(function() {
                    a.loading = !1;
                    a.loaded = !0;
                    X.callaction(a.onloaded, a)
                }, 7)
            }
            var z = a.point.getArray(),
                l = z.length,
                r = [];
            if (1 < l && a.DATA.visible && 0 == la.stereo) {
                var y, p, v, t = new uc,
                    q = new uc,
                    x;
                p = z[l - 1];
                v = (180 - Number(p.ath)) * Y;
                p = Number(p.atv) * Y;
                t.x = 1E3 * Math.cos(p) * Math.cos(v);
                t.z = 1E3 * Math.cos(p) * Math.sin(v);
                t.y = 1E3 * Math.sin(p);
                Od(c, t);
                for (y = 0; y < l; y++) p = z[y], v = (180 - Number(p.ath)) * Y, p = Number(p.atv) * Y, q.x = 1E3 * Math.cos(p) * Math.cos(v), q.z = 1E3 * Math.cos(p) * Math.sin(v), q.y = 1E3 * Math.sin(p), Od(c, q), q.z >= h ? (t.z >= h || (x = (h - t.z) / (q.z - t.z), p = b / (h + f), v = (t.x + (q.x - t.x) * x) * p + e, p = (t.y + (q.y - t.y) * x) * p + n, r.push(v.toFixed(2) + "," + p.toFixed(2))), p = b / (q.z + f), v = q.x * p + e, p = q.y * p + n, r.push(v.toFixed(2) + "," + p.toFixed(2))) : t.z >= h && (x = (h - q.z) / (t.z - q.z), p = b / (h + f), v = (q.x + (t.x - q.x) * x) * p + e, p = (q.y + (t.y - q.y) * x) * p + n, r.push(v.toFixed(2) + "," + p.toFixed(2))), t.x = q.x, t.y = q.y, t.z = q.z;
                0 == a.polyline && 2 < r.length && r.push(r[0]);
                g.style.pointerEvents = a.DATA.enabled ? _[286] : "none";
                g.style.cursor = a.DATA.handcursor ? _[10] : _[5];
                g.style.visibility = a.DATA.visible ? _[16] : _[6]
            }
            g.setAttribute(_[544], r.join(" "))
        }

        function df(a, c) {
            var b = 0,
                f, e, n;
            if (a && c) {
                b = a.DATA.zorder;
                f = c.DATA.zorder;
                e = null == b || isNaN(b);
                n = null == f || isNaN(f);
                if (b == f || e && n)
                    if (b = a.DATA.depth, f = c.DATA.depth, e = null == b || isNaN(b), n = null == f || isNaN(f), b == f || e && n) b = a.index, f = c.index, e = n = !1;
                b = e ? -1 : n ? 1 : b - f
            }
            return b
        }

        function ce(a, c) {
            if (void 0 === c && jc) {
                var w = db.getArray();
                w.sort(df);
                var f = w.length,
                    e;
                for (e = 0; e < f; e++) {
                    var n = w[e];
                    n && (n.index = e)
                }
                jc = !1
            }
            var w = db.getArray(),
                f = w.length,
                h;
            e = u.r_rmatrix;
            var n = Sa,
                g = Da,
                z = aa,
                l = .5 * n,
                r = .5 * g,
                y = u.r_zoom,
                p = u.r_hlookat,
                v = u.r_vlookat,
                t = u.r_vlookatA,
                q = u.r_yoff,
                x = u.r_zoff,
                J = u._camroll;
            h = u._stereographic;
            var B;
            B = 1 * (1 + x / 1E3);
            var D = 50;
            0 < x && (h ? D -= x : (D = 20 - x, -125 > D && (D = -125)));
            var A = 0,
                k = 0;
            h = 0;
            void 0 !== c && (h = c, f = h + 1);
            var d = kc,
                G = b.realDesktop && 250 > y ? 1.5 : 0,
                E = ef,
                R = ff;
            E[1] = l;
            E[5] = de;
            E[9] = sa(p);
            E[15] = d + "," + d + "," + d;
            var Ha = vb,
                N = new uc,
                T = null;
            if (!la.stereo)
                for (; h < f; h++) {
                    var H = w[h];
                    if (H && H._ready) {
                        var F = null == H.DATA.url && 0 < H.point.count,
                            T = null;
                        if (!F) {
                            if (H.DATA.webGL) continue;
                            T = H.sprite;
                            if (!T) continue
                        }
                        0 != H.haschanged_flags && H.processUpdates();
                        var ea = H.getparsed(),
                            T = T ? T.style : null,
                            O = Number(H.DATA.alpha) * (H.keep ? 1 : vc);
                        T && (T.opacity = O);
                        H._poly && (H._poly.style.opacity = O);
                        O = a || H.poschanged || H.forceupdate;
                        if (F) O && (cf(H), H.poschanged = !1);
                        else if (H.DATA.visible && H.loaded && O) {
                            H.poschanged = !1;
                            F = Number(H.DATA.flying);
                            A = (1 - F) * Number(H.DATA.ath);
                            k = (1 - F) * Number(H.DATA.atv);
                            0 < F && (A += F * fd(p, H.DATA.ath), k += F * fd(v, H.DATA.atv));
                            var O = !1,
                                Z = (180 - A) * Y,
                                P = k * Y;
                            N.x = 1E3 * Math.cos(P) * Math.cos(Z);
                            N.z = 1E3 * Math.cos(P) * Math.sin(Z);
                            N.y = 1E3 * Math.sin(P);
                            Od(e, N);
                            var zb = !1,
                                W = N.x,
                                m = N.y,
                                Z = N.z;
                            if (Z >= D - x) var C = y / (Z + x),
                                W = W * C,
                                m = m * C + q,
                                zb = 8E3 > Math.abs(W) && 8E3 > Math.abs(m),
                                W = W + l,
                                m = m + r;
                            if (H.DATA.distorted) {
                                T.pointerEvents = 50 <= Z + x && H.DATA.enabled ? "auto" : "none";
                                O = !0;
                                P = H.DATA.scale;
                                Z = Number(H.DATA.scale);
                                isNaN(Z) && (Z = 1);
                                H._hszscale = Z;
                                1 == H.scaleflying && (Z = Z * (1 - F) + Z / (y / (g / 2)) * B * F);
                                H.DATA.scale = 1;
                                H.updatepluginpos(_[203]);
                                H.DATA.scale = P;
                                var S = H.pixelwidth,
                                    I = H.pixelheight,
                                    ra = P = 1;
                                H._use_css_scale && (P = S / H.imagewidth, ra = I / H.imageheight);
                                var Ma = .5 * -I,
                                    W = m = 0,
                                    nb = H._oxpix,
                                    kd = H._oypix,
                                    m = m + .5 * -S / P,
                                    W = W + Ma / ra,
                                    m = m - (ea.ex - .5) * S / P,
                                    W = W - (ea.ey - .5) * I / ra,
                                    ea = -500,
                                    S = H._deepscale,
                                    I = H.DATA.depth;
                                isNaN(I) && (I = 1E3);
                                Ma = 1;
                                0 == (I | 0) ? (ea = 0, S = 1) : Ma = 1E3 / I;
                                2 == wb && (S *= 15);
                                S /= 1 + F + G;
                                if (b.firefox || 6 < b.iosversion && .1 > H.scale) S = 10 / (1 + F);
                                0 < x && (S = 1);
                                Z = Z * S * Ma;
                                ea *= S;
                                nb = nb * S * Ma;
                                kd = kd * S * Ma;
                                if (0 < x || b.firefox) O = zb;
                                zb = S * Ma * d / 2;
                                zb = _[303] + zb * H.tx + "px," + zb * H.ty + "px," + -zb * H.tz + "px) ";
                                E[3] = sa(r + q * (1 - F));
                                E[7] = sa(-(t * (1 - F) + v * F));
                                E[11] = zb + _[141] + sa(-A);
                                E[13] = sa(k);
                                E[17] = ea;
                                E[19] = sa(1 * H.DATA.rotate + F * J);
                                E[21] = nb;
                                E[23] = kd;
                                H.inverserotation ? (E[25] = "Y(" + sa(H.ry), E[27] = "X(" + sa(H.rx), E[29] = "Z(" + sa(-H.rz)) : (E[25] = "Z(" + sa(H.rz), E[27] = "X(" + sa(-H.rx), E[29] = "Y(" + sa(-H.ry));
                                E[31] = Z * P;
                                E[33] = Z * ra;
                                E[35] = m;
                                E[37] = W;
                                T[Ha + _[89]] = "0 0";
                                T[Ha] = E.join("")
                            } else if (Z >= D && (Z = 1, zb)) {
                                if (H.zoom || H.distorted) Z *= Number(2 * (1 - F) * C + F * aa) / aa;
                                H.updatepluginpos(_[215]);
                                S = H.pixelwidth;
                                I = H.pixelheight;
                                ra = P = 1;
                                H._use_css_scale && (P = S / H.imagewidth, ra = I / H.imageheight);
                                A = W;
                                k = m;
                                0 == H.accuracy && (A = Math.round(A), k = Math.round(k));
                                W = m = 0;
                                nb = H._oxpix * Z;
                                kd = H._oypix * Z;
                                Ma = 0 != P ? S / P : 0;
                                zb = 0 != ra ? I / ra : 0;
                                m -= (ea.ex - .5) * Ma;
                                W -= (ea.ey - .5) * zb;
                                ea = 2 * Z * (Math.max(S, I) * H.DATA.scale + Math.max(nb, kd));
                                if (0 < A + ea || 0 < k + ea || A - ea < n || k - ea < g) H._use_css_scale ? Z *= z : (m *= z, W *= z), O = -Ma / 2, ea = -zb / 2, H._istextfield && 0 == H.accuracy && (A |= 0, k |= 0, O |= 0, ea |= 0, nb |= 0, kd |= 0, m |= 0, W |= 0), R[1] = sa(A), R[3] = sa(k), R[5] = sa(O), R[7] = sa(ea), R[9] = sa(1 * H.DATA.rotate - J * (1 - F)), R[11] = nb, R[13] = kd, R[15] = Z * P, R[17] = Z * ra, R[19] = sa(m), R[21] = sa(W), F = R.join(""), F = wc && 2 > wb && .5 < Number(H.zorder2) ? _[365] + (999999999E3 + H._zdeep) + "px) " + F : _[293] + F, T[Ha + _[89]] = _[488], T[Ha] = F, O = !0
                            }
                            0 == H.forceupdate && (F = O ? "" : "none", F != T.display && (T.display = F));
                            H.forceupdate = !1
                        }
                    }
                }
        }

        function gf(a, c, w, f) {
            function e() {
                var d = Ja(),
                    a = d.style;
                a.marginTop = a.marginBottom = v[17] * J + "px";
                a.height = "1px";
                a.backgroundColor = wa(v[18]);
                "none" != v[19] && (a.borderBottom = _[373] + wa(v[19]));
                B.appendChild(d)
            }

            function n(a) {
                var d = a.changedTouches;
                return (d && 0 < d.length ? d[0] : a).pageY
            }

            function h(d, a, c) {
                var e = Ja(),
                    k = e.style;
                k.padding = v[20] * J + "px";
                k.border = v[21] + _[33] + wa(v[22]);
                k.borderRadius = v[23] * J + "px";
                k.marginTop = v[24] * J + "px";
                k.marginBottom = v[24] * J + "px";
                b.androidstock && (k[_[41]] = _[13]);
                gb.touch && ca(e, b.browser.events.touchstart, function(d) {
                    function S(S) {
                        S = n(S) - ra;
                        if (q > Da) {
                            var d = m + S | 0;
                            d < Da - q - 10 ? d = Da - q - 10 : 10 < d && (d = 10);
                            x.style.top = d + "px"
                        }
                        15 < Math.abs(S) && (e.onmouseout(), nb = !0)
                    }

                    function I() {
                        ka(M, k, S, !0);
                        ka(M, f, I, !0);
                        if (0 == nb) e.onclick()
                    }
                    na(d);
                    d.stopPropagation();
                    if (c && a) {
                        e.onmouseover();
                        var ra = n(d),
                            m = parseInt(x.style.top) | 0,
                            nb = !1,
                            k = b.browser.events.touchmove,
                            f = b.browser.events.touchend;
                        ca(M, k, S, !0);
                        ca(M, f, I, !0)
                    }
                }, !0);
                c && a ? (k.cursor = _[10], e.onmousedown = function(d) {
                    d.stopPropagation()
                }, e.onmouseover = function() {
                    k = this.style;
                    k.background = wa(v[25]);
                    k.border = v[21] + _[33] + wa(v[26]);
                    k.color = wa(v[27])
                }, e.onmouseout = function() {
                    k = this.style;
                    k.background = "none";
                    k.border = v[21] + _[33] + wa(v[22]);
                    k.color = wa(v[4])
                }, e.oncontextmenu = function(d) {
                    na(d);
                    d.stopPropagation();
                    e.onclick()
                }, e.onclick = function(d) {
                    f ? (k = x.style, k.opacity = 1, k.transition = _[117], k.opacity = 0, setTimeout(w, 300)) : w();
                    X.callaction(c)
                }) : (0 == a && (k.color = wa(v[5])), k.cursor = _[5]);
                var m = Ja();
                m.style.marginLeft = v[28] * J + "px";
                m.style.marginRight = v[29] * J + "px";
                m.innerHTML = d;
                e.appendChild(m);
                B.appendChild(e);
                return m
            }

            function g() {
                function d() {
                    return .4 > Math.random() ? " " : _[156]
                }
                var a = h("About" + d() + "the" + d() + _[56] + d() + _[479] + d() + _[434], !0, function() {
                    X.openurl(_[233])
                });
                try {
                    (new MutationObserver(function(d) {
                        d = M.getComputedStyle(a);
                        9 > Math.min(parseInt(d.width) | 0, parseInt(d.height) | 0) && (l = {}, Ga(_[116]))
                    })).observe(a, {
                        attributes: !1,
                        childList: !0,
                        characterData: !0,
                        subtree: !0
                    })
                } catch (c) {}
            }

            function z() {
                h(V.fullscreen ? p.exitfs : p.enterfs, !0, function() {
                    l.fullscreen = !l.fullscreen
                })
            }

            function u() {
                var d = b.android,
                    a = b.infoString,
                    a = a.split(_[476]).join("");
                h((Ha ? "" : _[143] + l.version + _[263] + l.build + _[292]) + (d ? _[504] : "") + a + cb.infoString + (d ? _[472] : ""), !0, null)
            }

            function r() {
                za && za[2] && h(za[2], !0, function() {
                    X.openurl(za[3])
                })
            }

            function y() {
                var d = x.getBoundingClientRect(),
                    b = d.width,
                    d = d.height,
                    e = c;
                if (0 < b && 0 < d) {
                    q = d;
                    f && (a -= b >> 1, a + b > Sa && (a = Sa - b - 10), 10 > a && (a = 10));
                    for (; a + b > Sa;) a -= b / 2;
                    0 > a && (a = 0);
                    c + d > Da && (c = f ? Da - d - 10 : c - d);
                    0 > c && (f ? c = Da - d >> 1 : e > Da / 2 ? (c = e - d, 0 > c && (c = 4)) : (c = e, c + d > Da && (c = Da - 4 - d)));
                    t = x.style;
                    t.left = (a | 0) + "px";
                    t.top = (c | 0) + "px";
                    f && (t.transition = _[117], t.opacity = 1)
                } else 10 > ++ea && setTimeout(y, 32)
            }
            var p = l.contextmenu;
            if (f && 0 == p.touch) return null;
            var v = null;
            p.customstyle && (_[127] == b.browser.domain || 0 == b.realDesktop || b.realDesktop && 0 != (Xa & 16)) && (v = F(p.customstyle).split("|"), 30 != v.length && (v = null));
            null == v && (v = (b.mac ? "default|14|default|0xFFFFFF|0x000000|0xBBBBBB|0|0|5|2|2|8|0x66000000|0|0|1|4|5|0xEEEEEE|none|1|0|0|0|3|0xEEEEEE|0|0|20|12" : "default|default|150%|0xFFFFFF|0x000000|0xBBBBBB|1|0xBBBBBB|0|2|2|8|0x66000000|0|0|2|2|5|0xE0E0E0|none|4|0|0|0|3|0xEEEEEE|0|0|18|12").split("|"));
            var t = null,
                q = 0,
                x = Ja();
            x.onselectstart = _[316];
            b.desktop && b.chrome && (x.style.opacity = .999);
            if (b.linux || b.android) v[1] = 12;
            t = x.style;
            t.position = _[0];
            t.zIndex = 99999999999;
            var J = 1;
            b.androidstock ? J = b.pixelratio : b.chrome && 40 > b.chromeversion && (t[vb] = _[27]);
            _[5] != v[0] ? t.fontFamily = v[0] : b.ios ? (t.fontFamily = _[20], t.fontWeight = _[510], _[5] == v[1] && (v[1] = 14)) : t.font = "menu";
            _[5] != v[1] && (t.fontSize = v[1] * J * (b.android ? 1.2 : 1) + "px");
            _[5] != v[2] && (t.lineHeight = v[2]);
            t.background = wa(v[3]);
            t.color = wa(v[4]);
            t.border = v[6] + _[33] + wa(v[7]);
            t.borderRadius = v[8] * J + "px";
            t.minWidth = "150px";
            t.textAlign = "left";
            t[jd] = v[9] + "px " + v[10] + "px " + v[11] + "px " + wa(v[12]);
            var B = Ja(),
                t = B.style;
            t.border = v[13] + _[33] + wa(v[14]);
            t.paddingTop = v[15] * J + "px";
            t.paddingBottom = v[16] * J + "px";
            gb.touch && ca(B, b.browser.events.touchstart, function(d) {
                na(d);
                d.stopPropagation()
            }, !1);
            x.appendChild(B);
            var D = p.item.getArray(),
                A, k, d = 0,
                G, E = D.length,
                R, Ha = 0 != (Xa & 16),
                N = Ha,
                T = Ha,
                H = !1,
                Fb = !1;
            for (R = 0; R < E; R++)
                if (A = D[R])
                    if (k = A.caption) k = $d(unescape(k)), A.separator && 0 < d && e(), G = F(k), _[56] == G ? 0 == N && (N = !0, g(), d++) : za && _[446] == G ? 0 == T && (T = !0, r(), d++) : _[129] == G ? (H = !0, b.fullscreensupport && (z(), d++)) : _[346] == G ? (Fb = !0, u(), d++) : (G = A.visible && (!A.showif || X.calc(null, A.showif))) ? (h(k, A.enabled, A.onclick), d++) : 0 == G && A.separator && 0 < d && B.removeChild(B.lastChild);
            za && 0 == T && (0 < d && (e(), d = 0), r());
            0 == N && (0 < d && e(), g(), d++);
            0 == H && 1 == p.fullscreen && b.fullscreensupport && (z(), d++);
            0 == Fb && 1 == p.versioninfo && (0 < d && e(), u(), d++);
            if (0 == d) return null;
            t = x.style;
            t.left = _[139];
            t.top = "10px";
            var ea = 0;
            f && (t.opacity = 0);
            setTimeout(y, 16);
            return x
        }

        function Of() {
            function a(a, c, b) {
                a.__defineGetter__(c, b)
            }
            l = new id;
            l.set = da;
            l.get = Q;
            l.call = Ob;
            l.trace = oa;
            Object.defineProperty(l, _[527], {
                value: X
            });
            l.Kloader = pa;
            l["true"] = !0;
            l[_[25]] = !1;
            l.strict = !1;
            l.version = _[450];
            l.build = _[386];
            l.buildversion = l.version;
            l.debugmode = !1;
            l.tweentypes = ld;
            l.basedir = _[389];
            l.lasterror = "";
            l.showtext = function() {};
            l.bgcolor = 0;
            l[bc[0]] = l[bc[1]] = !0;
            l.haveexternalinterface = !0;
            l.havenetworkaccess = !0;
            l.device = b;
            l.browser = b.browser;
            l._have_top_access = b.topAccess;
            l._isrealdesktop = b.realDesktop;
            l.iosversion = b.iosversion;
            l.isphone = b.iphone;
            l.ispad = b.ipad;
            l.isandroid = b.android;
            l.ishtml5 = !0;
            l.isflash = !1;
            l.ismobile = b.mobile;
            l.istablet = b.tablet;
            l.isdesktop = b.desktop;
            l.istouchdevice = b.touchdevice;
            l.isgesturedevice = b.gesturedevice;
            a(l, _[391], function() {
                return Gb / aa
            });
            a(l, _[347], function() {
                return ab / aa
            });
            va(l, _[396], function() {
                return aa
            }, function(a) {
                a = Number(a);
                isNaN(a) && (a = 1);
                1E-4 < Math.abs(a - aa) && (aa = a, V.onResize(null, !0))
            });
            xb = l.area = new Pf;
            l.wheeldelta = 0;
            l.wheeldelta_raw = Number.NaN;
            l.wheeldelta_touchscale = 0;
            l.keycode = 0;
            l.idletime = .5;
            l.__defineGetter__(_[427], Ca);
            l.__defineGetter__(_[572], Math.random);
            va(l, _[129], function() {
                return V.fullscreen
            }, function(a) {
                V.setFullscreen(ma(a))
            });
            va(l, _[423], function() {
                return pa.swfpath
            }, function(a) {
                pa.swfpath = a
            });
            l.hlookat_moveforce = 0;
            l.vlookat_moveforce = 0;
            l.fov_moveforce = 0;
            l.multireslevel = 0;
            l.lockmultireslevel = "-1";
            l.downloadlockedlevel = !1;
            K = l.mouse = {
                down: !1,
                up: !1,
                moved: !1,
                dragging: !1,
                vinvert: !1,
                downx: 0,
                downy: 0,
                x: 0,
                y: 0
            };
            a(K, _[571], function() {
                return K.x + xb.pixelx
            });
            a(K, _[570], function() {
                return K.y + xb.pixely
            });
            a(K, "dd", function() {
                var a = K.x - K.downx,
                    c = K.y - K.downy;
                return Math.sqrt(a * a + c * c)
            });
            u = l.view = new Qf;
            l.screentosphere = u.screentosphere;
            l.spheretoscreen = u.spheretoscreen;
            l.loadFile = pa.loadfile;
            l.decodeLicense = pa.decodeLicense;
            l.haveLicense = Kc(function(a) {
                var c = !1,
                    b = Xa;
                switch (a.toLowerCase().charCodeAt(0)) {
                    case 107:
                        c = 0 != (b & 1);
                        break;
                    case 109:
                        c = 0 != (b & 128);
                        break;
                    case 98:
                        c = 0 != (b & 16)
                }
                return c
            });
            l.parsepath = l.parsePath = pa.parsePath;
            l.contextmenu = new Rf;
            ha = l.control = new Sf;
            md = l.cursors = new Tf;
            L = l.image = {};
            La = l.plugin = new pb(yc);
            l.layer = La;
            db = l.hotspot = new pb(Uf);
            hd = l.events = new pb(null, !0);
            hd.dispatch = Na;
            la = l.display = {
                currentfps: 60,
                r_ft: 16,
                FRM: 0,
                _framebufferscale: 1,
                mipmapping: "auto",
                loadwhilemoving: b.realDesktop ? "true" : "auto",
                _stereo: !1,
                stereooverlap: 0,
                hardwarelimit: b.realDesktop && b.safari && "6" > b.safariversion ? 2E3 : b.realDesktop && !b.webgl ? 2560 : b.iphone && b.retina && !b.iphone5 ? 800 : b.iphone && !b.retina ? 600 : b.ipod && b.retina ? 640 : b.mobile || b.tablet ? 1024 : 4096
            };
            va(la, _[158], function() {
                return la._stereo
            }, function(a) {
                a = ma(a);
                la._stereo != a && (a = a && b.webgl, la._stereo = a, V.svglayer && (V.svglayer.style.display = a ? "none" : ""), u.haschanged = !0)
            });
            va(la, _[413], function() {
                var a = la.FRM | 0;
                return 0 == a ? "auto" : "" + a
            }, function(a) {
                a |= 0;
                0 > a && (a = 0);
                la.FRM = a
            });
            va(la, _[250], function() {
                return la._framebufferscale
            }, function(a) {
                a = Number(a);
                if (isNaN(a) || 0 == a) a = 1;
                la._framebufferscale = a;
                V.onResize(null, !0)
            });
            l.memory = {
                maxmem: b.realDesktop ? Math.min(Math.max(150, 48 * screen.availWidth * screen.availHeight >> 20), 400) : b.ios && 7.1 > b.iosversion || b.iphone && !b.iphone5 ? 40 : 50
            };
            l.network = {
                retrycount: 2
            };
            Mc = l.progress = {};
            Mc.progress = 0;
            Ta = new yc;
            Ta.name = "STAGE";
            rb = new yc;
            rb.name = _[505];
            La.alpha = 1;
            db.alpha = 1;
            db.visible = !0;
            va(La, _[16], function() {
                return "none" != V.pluginlayer.style.display
            }, function(a) {
                V.pluginlayer.style.display = ma(a) ? "" : "none"
            });
            l.xml = {
                url: "",
                content: null,
                scene: null,
                sceneNEW: null
            };
            var c = l.security = {};
            va(c, "cors", function() {
                return ud
            }, function(a) {
                ud = a
            });
            Ab = l.autorotate = new Vf;
            l.math = function() {
                function a(c) {
                    var b = Q(c, X.actioncaller);
                    return Number(null !== b ? b : c)
                }

                function c(b) {
                    return function(c, e) {
                        da(c, Math[b](a(void 0 === e ? c : e)), !1, X.actioncaller)
                    }
                }
                var b = {},
                    n = _[168].split(" "),
                    h;
                for (h in n) {
                    var g = n[h];
                    b[g] = c(g)
                }
                b.pi = Ua;
                b.atan2 = function(c, b, e) {
                    da(c, Math.atan2(a(b), a(e)), !1, X.actioncaller)
                };
                b.min = function() {
                    var c = arguments,
                        b = c.length,
                        e = 3 > b ? 0 : 1,
                        f = a(c[e]);
                    for (e++; e < b; e++) f = Math.min(f, a(c[e]));
                    da(c[0], f, !1, X.actioncaller)
                };
                b.max = function() {
                    var c = arguments,
                        b = c.length,
                        e = 3 > b ? 0 : 1,
                        f = a(c[e]);
                    for (e++; e < b; e++) f = Math.max(f, a(c[e]));
                    da(c[0], f, !1, X.actioncaller)
                };
                b.pow = X.pow;
                return b
            }();
            l.action = new pb;
            l.scene = new pb;
            l.data = new pb;
            l.addlayer = l.addplugin = function(a) {
                if (!wd(a, _[225] + a + ")")) return null;
                a = La.createItem(a);
                if (!a) return null;
                null == a.sprite && (a._dyn = !0, a.create(), null == a._parent && V.pluginlayer.appendChild(a.sprite));
                return a
            };
            l.removelayer = l.removeplugin = function(a, c) {
                var b = La.getItem(a);
                if (b) {
                    if (ma(c)) {
                        var n = b._childs;
                        if (n)
                            for (; 0 < n.length;) l.removeplugin(n[0].name, !0)
                    }
                    b.visible = !1;
                    b.parent = null;
                    b.sprite && V.pluginlayer.removeChild(b.sprite);
                    b.destroy();
                    La.removeItem(a)
                }
            };
            l.addhotspot = function(a) {
                if (!wd(a, _[367] + a + ")")) return null;
                a = db.createItem(a);
                if (!a) return null;
                0 == a._ready && (a._dyn = !0, a.create(), a.sprite && V.hotspotlayer.appendChild(a.sprite));
                Pd = !0;
                return a
            };
            l.removehotspot = function(a) {
                var c = db.getItem(a);
                if (c) {
                    c.visible = !1;
                    c.parent = null;
                    if (c.sprite) try {
                        V.hotspotlayer.removeChild(c.sprite)
                    } catch (b) {}
                    if (c._poly) {
                        try {
                            V.svglayer.removeChild(c._poly)
                        } catch (n) {}
                        c._poly.kobject = null;
                        c._poly = null
                    }
                    c.destroy();
                    db.removeItem(a)
                }
            }
        }

        function Wf() {
            var a = l.webVR;
            X.processTicks();
            var c = u.haschanged;
            Ya++;
            la.frame = Ya;
            cb.fps();
            var w = V.resizeCheck(),
                f = X.processAnimations(),
                c = c | u.haschanged;
            if (b.webgl || !b.ios || b.ios && 5 <= b.iosversion) f = !1;
            f |= Pd;
            Pd = !1;
            f && (u._hlookat += ((Ya & 1) - .5) / (1 + u.r_zoom), c = !0);
            c |= fb.handleloading();
            c |= gb.handleFrictions();
            c |= fb.idlecheck();
            c |= u.continuousupdates;
            X.processTicks();
            Za && (c = !0, Za = !1);
            a && a.enabled && (c = !0);
            c || w ? (cb.startFrame(), fb.updateview(0, !0), cb.finishFrame()) : (u.haschanged && u.updateView(), ce(!1), b.webgl && cb.hittesthotspots(null));
            fb.updateplugins(w);
            b.desktop && fb.checkHovering();
            a && a.enabled && a.submitframe && a.submitframe()
        }
        var zc = this;
        try {
            !Object.prototype.__defineGetter__ && Object.defineProperty({}, "x", {
                get: function() {
                    return !0
                }
            }).x && (Object.defineProperty(Object.prototype, _[246], {
                enumerable: !1,
                configurable: !0,
                value: function(a, c) {
                    Object.defineProperty(this, a, {
                        get: c,
                        enumerable: !0,
                        configurable: !0
                    })
                }
            }), Object.defineProperty(Object.prototype, _[245], {
                enumerable: !1,
                configurable: !0,
                value: function(a, c) {
                    Object.defineProperty(this, a, {
                        set: c,
                        enumerable: !0,
                        configurable: !0
                    })
                }
            }))
        } catch (ag) {}
        var bb = navigator,
            ba = document,
            M = window,
            Ua = Math.PI,
            Y = Ua / 180,
            Qb = Number.NaN,
            Qd = 0,
            Ca = M.performance && M.performance.now ? function() {
                return M.performance.now() - Qd
            } : function() {
                return (new Date).getTime() - Qd
            },
            Qd = Ca(),
            nd = String.fromCharCode,
            l = null,
            Gb = 0,
            ab = 0,
            Sa = 0,
            Da = 0,
            aa = 1,
            Rd = 1,
            Ac = 0,
            xb = null,
            Ab = null,
            ha = null,
            md = null,
            la = null,
            hd = null,
            Mc = null,
            db = null,
            L = null,
            K = null,
            La = null,
            u = null,
            Ta = null,
            rb = null,
            ee = !1,
            Wb = !1,
            fe = !1,
            ge = 0,
            Ya = 0,
            he = 60,
            Xa = 14,
            ie = null,
            bc = [_[387], _[569]],
            za = null,
            ud = "",
            Rb = null,
            eb = null,
            Bb = null,
            $a = null,
            Pd = !1,
            Kb = 0,
            hb = 0,
            Za = !1,
            wc = !0,
            b = {
                runDetection: function(a) {
                    function c() {
                        var a = screen.width,
                            d = screen.height,
                            c = b.topAccess ? top : M,
                            m = c.innerWidth,
                            e = c.innerHeight,
                            c = c.orientation | 0,
                            S = a / (d + 1),
                            I = m / (e + 1);
                        if (1 < S && 1 > I || 1 > S && 1 < I) S = a, a = d, d = S;
                        r.width = a;
                        r.height = d;
                        r.orientation = c;
                        b.window = {
                            width: m,
                            height: e
                        };
                        a /= m;
                        return b.pagescale = a
                    }

                    function w(a, d) {
                        for (var c = ["ms", "Moz", _[535], "O"], b = 0; 5 > b; b++) {
                            var e = 0 < b ? c[b - 1] + a.slice(0, 1).toUpperCase() + a.slice(1) : a;
                            if (void 0 !== K.style[e]) return e
                        }
                        return null
                    }
                    var f = "flash html5 mobile tablet desktop ie edge webkit firefox ios iosversion iphone ipod ipad retina hidpi android androidstock blackberry touchdevice gesturedevice fullscreensupport windows mac linux air standalone silk".split(" "),
                        e, n, h, g, z = ba.documentElement,
                        l = a.mobilescale;
                    isNaN(l) && (l = .5);
                    n = f.length;
                    for (e = 0; e < n; e++) h = f[e], b[h] = !1;
                    b.html5 = b.html = !0;
                    b.iosversion = 0;
                    b.css3d = !1;
                    b.webgl = !1;
                    b.topAccess = !1;
                    b.simulator = !1;
                    b.multiressupport = !1;
                    b.panovideosupport = !1;
                    var r = b.screen = {};
                    try {
                        top && top.document && (b.topAccess = !0)
                    } catch (y) {}
                    var p = bb.platform,
                        f = F(p),
                        v = bb.userAgent,
                        t = F(v),
                        q = n = "";
                    0 <= f.indexOf("win") ? b.windows = !0 : 0 <= f.indexOf("mac") ? b.mac = !0 : 0 <= f.indexOf("linux") && (b.linux = !0);
                    var x = M.devicePixelRatio,
                        J = 2 <= x;
                    e = 1;
                    var B = 0 <= f.indexOf("ipod"),
                        D = 0 <= f.indexOf(_[62]),
                        A = 0 <= f.indexOf("ipad"),
                        k = D || B || A,
                        d = t.indexOf("silk/"),
                        G = 0 <= t.indexOf(_[491]) || 0 <= t.indexOf(_[160]),
                        E = 0 > d && !G && 0 <= t.indexOf(_[489]),
                        R = h = !1,
                        u = !1,
                        N = v.indexOf(_[149]),
                        T = M.chrome && !G,
                        H = v.indexOf(_[490]),
                        Fb = !1,
                        ea = (k || E || 0 <= d) && (b.windows || b.mac);
                    G && (N = H = -1);
                    var f = !1,
                        O = 0;
                    Rd = c();
                    if (k) {
                        if (b.ios = !0, n = p, g = v.indexOf("OS "), 0 < g && (g += 3, O = v.slice(g, v.indexOf(" ", g)).split("_").join("."), n += _[496] + O, b.iosversion = parseFloat(O), "6.0" <= O && (D && !J || B && J) && (b._iOS6_canvas_bug = !0)), h = D || B, R = A, g = Math.max(screen.width, screen.height), b.iphone = D || B, b.iphone5 = D && 500 < g, b.ip6p = D && 735 < g, b.ipod = B, b.ipad = A, b.retina = J, D || B) e *= l
                    } else if (E)
                        if (g = v.indexOf(_[497]), O = parseFloat(v.slice(g + 8)), b.android = !0, b.linux = !1, b.androidversion = O, n = v.slice(g, v.indexOf(";", g)), h = 0 < t.indexOf(_[59]), T && 0 < t.indexOf(_[322]) && (h = 480 > Math.min(screen.width, screen.height)), R = !h, g = v.indexOf(")"), 5 < g && (O = v.slice(0, g).lastIndexOf(";"), 5 < O && (J = v.indexOf(_[562], O), 0 < J && (g = J), n += " (" + v.slice(O + 2, g) + ")")), 0 < H && isNaN(x) && (x = Rd), R && 1 < x) {
                            if (b.hidpi = !0, e = x, 0 <= N || 0 < H) b.hidpi = !1, e = 1
                        } else h && (b.hidpi = 1 < x, e = x * l, .5 > e && (e = .5), 0 <= N || 0 < H || ea) && (b.hidpi = !1, e = l);
                    else {
                        if (0 <= t.indexOf(_[398]) || 0 <= t.indexOf(_[395]) || 0 <= t.indexOf("bb10")) Fb = !0, b.blackberry = !0, n = _[370], f = !0;
                        0 <= d ? (Fb = !0, b.silk = !0, n = _[344] + parseFloat(t.slice(d + 5)).toFixed(2), u = !1, h = 0 <= t.indexOf(_[59]), R = !h, f = !0) : 0 <= t.indexOf("ipad") || 0 <= t.indexOf(_[62]) ? u = Fb = !0 : 0 <= t.indexOf(_[157]) ? (R = !0, n += _[552]) : 0 <= t.indexOf(_[59]) ? (h = !0, n += _[550], e = l) : u = !0
                    }
                    B = bb.vendor && 0 <= bb.vendor.indexOf("Apple");
                    D = M.opera;
                    J = !1;
                    u && (n = _[307]);
                    g = v.indexOf(_[529]);
                    0 < g && (B || D || E) && (g += 8, O = v.slice(g, v.indexOf(" ", g)), B ? (b.safari = !0, b.safariversion = O, q = _[548]) : (E && (q = _[261], f = !0), D && (b.opera = !0, b.operaversion = O, q = "Opera")), q += " " + O);
                    k && (g = v.indexOf(_[546]), 0 < g && (b.safari = !0, g += 6, O = parseFloat(v.slice(g, v.indexOf(" ", g))), b.crios = O, q = _[530] + O.toFixed(1)));
                    g = N;
                    if (0 <= g || T) O = parseFloat(v.slice(g + 7)), b.chrome = !0, b.chromeversion = O, b.chromemobile = E || 0 <= d, q = _[149] + (isNaN(O) ? "" : " " + O.toFixed(1)), g = t.indexOf("opr/"), 0 < g && (q = _[538] + parseFloat(v.slice(g + 4)).toFixed(1) + _[424]), E && 28 > O && (f = !0), E && 1 < x && 20 > O && !ea && (b.hidpi = !0, e = x, h && (e *= l));
                    else if (g = H, 0 > g && (g = v.indexOf(_[537])), 0 <= g && (O = parseFloat(v.slice(1 + v.indexOf("/", g))), b.firefox = !0, b.firefoxversion = O, q = _[455] + (isNaN(O) ? "" : O.toFixed(1)), E && 35 > O && (f = !0)), g = v.indexOf("MSIE "), J = 0 <= g || G) u = b.ie = !0, R = !1, q = _[236], 0 < t.indexOf(_[474]) || 0 < t.indexOf(_[321]) ? (h = !0, u = !1, q = _[498] + q, e = l) : 0 < t.indexOf("arm;") && 1 < bb.msMaxTouchPoints && (R = !0, u = !1, q = _[515] + q, f = !0, e = 1), 0 <= g ? (O = v.slice(g + 4, v.indexOf(";", g)), b.ieversion = parseFloat(O), q += O) : (g = v.indexOf("rv:"), 0 <= g ? (O = parseFloat(v.slice(g + 3)), !isNaN(O) && 10 <= O && 100 > O && (b.ieversion = O, q += " " + O.toFixed(1))) : (g = t.indexOf(_[160]), 0 <= g && (q = _[285], b.edge = !0, wc = !1, O = parseFloat(v.slice(g + 6)), isNaN(O) || (b.ieversion = O, q += " " + O.toFixed(5))))), n = q, q = "";
                    b.android && (b.androidstock = !(b.chrome || b.firefox || b.opera));
                    0 == b.ie && 0 < (g = t.indexOf(_[521])) && (O = parseFloat(t.slice(g + 7)), !isNaN(O) && 0 < O && (b.webkit = !0, b.webkitversion = O));
                    b.pixelratio = isNaN(x) ? 1 : x;
                    b.fractionalscaling = 0 != b.pixelratio % 1;
                    var x = {},
                        K = Ja();
                    x.find = w;
                    x.prefix = J ? "ms" : b.firefox ? "moz" : b.safari || b.chrome || b.androidstock ? _[86] : "";
                    x.perspective = w(_[371]);
                    x.transform = w(_[437]);
                    x.backgroundsize = w(_[294]);
                    x.boxshadow = w(_[412]);
                    x.boxshadow_style = _[270] == x.boxshadow ? _[228] : _[325] == x.boxshadow ? _[280] : _[390];
                    E && "4.0" > b.androidversion && (x.perspective = null);
                    x.perspective && (b.css3d = !0, _[239] == x.perspective && M.matchMedia && (t = M.matchMedia(_[206]))) && (b.css3d = 1 == t.matches);
                    K = null;
                    b.webgl = function() {
                        var a = null;
                        try {
                            for (var d = Ja(2), c = 0; 4 > c && !(a = d.getContext([_[65], _[100], _[130], _[131]][c])); c++);
                        } catch (b) {}
                        return null != a
                    }();
                    t = {};
                    t.useragent = v;
                    t.platform = p;
                    t.domain = null;
                    t.location = M.location.href;
                    p = t.events = {};
                    t.css = x;
                    if (k || E || void 0 !== z.ontouchstart || Fb) b.touchdevice = !0, b.gesturedevice = !0;
                    k = 0;
                    (bb.msPointerEnabled || bb.pointerEnabled) && b.ie && (E = bb.msMaxTouchPoints || bb.maxTouchPoints, bb.msPointerEnabled && (k = 2), bb.pointerEnabled && (k = 1), b.touchdevice = 0 < E, b.gesturedevice = 1 < E);
                    p.touchstart = [_[47], _[361], _[317]][k];
                    p.touchmove = [_[49], _[360], _[299]][k];
                    p.touchend = [_[52], _[417], _[350]][k];
                    p.touchcancel = [_[353], _[298], _[279]][k];
                    p.gesturestart = [_[338], _[111], _[111]][k];
                    p.gesturechange = [_[300], _[109], _[109]][k];
                    p.gestureend = [_[383], _[119], _[119]][k];
                    p.pointerover = [_[12], _[12], _[44]][k];
                    p.pointerout = [_[14], _[14], _[45]][k];
                    b.pointerEvents = b.opera || b.ie && 11 > b.ieversion ? !1 : !0;
                    q && (n += " - " + q);
                    b.realDesktop = u;
                    q = a.vars ? F(a.vars.simulatedevice) : null;
                    _[436] == q && (0 <= v.indexOf(_[153]) || 0 <= v.indexOf("iPod") ? q = _[62] : 0 <= v.indexOf("iPad") && (q = "ipad"));
                    b.touchdeviceNS = b.touchdevice;
                    v = _[62] == q ? 1 : "ipad" == q ? 2 : 0;
                    0 < v && (b.simulator = !0, b.crios = 0, n += " - " + (1 == v ? _[153] : "iPad") + _[379], e = v * l, h = 1 == v, R = 2 == v, u = !1, b.ios = !0, b.iphone = h, b.ipad = R, b.touchdevice = !0, b.gesturedevice = !0);
                    b.browser = t;
                    b.infoString = n;
                    a = F(a.fakedevice);
                    _[59] == a ? (h = !0, R = u = !1) : _[157] == a ? (R = !0, h = u = !1) : _[525] == a && (u = !0, h = R = !1);
                    b.mobile = h;
                    b.tablet = R;
                    b.desktop = u;
                    b.normal = R || u;
                    b.touch = b.gesturedevice;
                    b.mouse = u;
                    b.getViewportScale = c;
                    aa = e;
                    0 == b.simulator && 0 != ba.fullscreenEnabled && 0 != ba.mozFullScreenEnabled && 0 != ba.webkitFullScreenEnabled && 0 != ba.webkitFullscreenEnabled && 0 != ba.msFullscreenEnabled && (a = [_[238], _[217], _[201], _[202], _[224]], l = -1, e = null, n = _[248], z[a[0]] ? (e = "", l = 0) : z[a[1]] ? (e = "moz", l = 1) : z[a[2]] ? (e = _[86], l = 2) : z[a[3]] ? (e = _[86], l = 3) : z[a[4]] && (e = "MS", n = _[251], l = 4), 0 <= l && 0 == f && (b.fullscreensupport = !0, p.fullscreenchange = e + n, p.requestfullscreen = a[l]));
                    b.buildList();
                    delete b.runDetection
                },
                buildList: function() {
                    var a, c = "|all";
                    for (a in b) a == F(a) && b[a] && (c += "|" + a);
                    b.haveList = c + "|"
                },
                checkSupport: function(a) {
                    a = F(a).split("no-").join("!").split(".or.").join("|").split(".and.").join("+").split("|");
                    var c, l, f = a.length;
                    for (c = 0; c < f; c++) {
                        var e = a[c].split("+"),
                            n = !1;
                        for (l = 0; l < e.length; l++) {
                            var n = e[l],
                                h = !1;
                            33 == n.charCodeAt(0) && (n = n.slice(1), h = !0);
                            if (0 == n.indexOf("ios") && b.ios)
                                if (3 == n.length || b.iosversion >= parseFloat(n.slice(3)))
                                    if (h) {
                                        n = !1;
                                        break
                                    } else n = !0;
                            else if (h) n = !0;
                            else {
                                n = !1;
                                break
                            } else if (0 <= b.haveList.indexOf("|" + n + "|"))
                                if (h) {
                                    n = !1;
                                    break
                                } else n = !0;
                            else if (h) n = !0;
                            else {
                                n = !1;
                                break
                            }
                        }
                        if (n) return !0
                    }
                    return !1
                }
            },
            wb = 1,
            yd = !1,
            vb = null,
            je = null,
            ke = null,
            Nc = null,
            jd = null,
            le = !1,
            Oc = 0,
            id = function() {
                var a = this;
                a._type = "base";
                a.registerattribute = function(c, b, f, e) {
                    c = F(c);
                    f && e ? (a.hasOwnProperty(c) && (b = qa(a[c], typeof b)), a.__defineGetter__(c, e), a.__defineSetter__(c, f), f(b)) : a.hasOwnProperty(c) ? a[c] = qa(a[c], typeof b) : a[c] = b
                };
                a.createobject = function(c) {
                    c = F(c);
                    try {
                        return a.hasOwnProperty(c) ? a[c] : a[c] = new id
                    } catch (b) {}
                    return null
                };
                a.removeobject = a.removeattribute = function(c) {
                    c = F(c);
                    try {
                        a[c] = null, delete a[c]
                    } catch (b) {}
                };
                a.createarray = function(c) {
                    c = F(c);
                    return a[c] && a[c].isArray ? a[c] : a[c] = new pb(id)
                };
                a.removearray = function(c) {
                    c = F(c);
                    a[c] && a[c].isArray && (a[c] = null, delete a[c])
                };
                a.getattributes = function() {
                    var c = [],
                        b = ["index", _[448], "DATA"],
                        f;
                    for (f in a) _[15] != typeof a[f] && -1 == b.indexOf(f) && "_" != f.charAt(0) && c.push(f);
                    return c
                }
            },
            pb = function(a, c) {
                var b = [],
                    f = {};
                this.isArray = !0;
                this.isDynArray = 1 == c;
                this.__defineGetter__("count", function() {
                    return b.length
                });
                this.__defineSetter__("count", function(a) {
                    0 == a ? (b = [], f = {}) : b.length = a
                });
                this.createItem = function(c, n) {
                    var h = -1,
                        g = null,
                        h = String(c).charCodeAt(0);
                    if (48 <= h && 57 >= h) {
                        if (n) return null;
                        h = parseInt(c, 10);
                        g = b[h];
                        if (null == g || void 0 == g) g = null != a ? new a : {}, g.name = "n" + h, g.index = h, b[h] = g, f[g.name] = g
                    } else if (c = F(c), g = f[c], null == g || void 0 == g) g = n ? n : null != a ? new a : {}, h = b.push(g) - 1, g.index = h, g.name = c, b[h] = g, f[c] = g;
                    return g
                };
                this.getItem = function(a) {
                    var c = -1,
                        c = String(a).charCodeAt(0);
                    48 <= c && 57 >= c ? (c = parseInt(a, 10), a = b[c]) : a = f[F(a)];
                    return a
                };
                this.getArray = function() {
                    return b
                };
                this.renameItem = function(a, c) {
                    var h = -1,
                        h = String(a).charCodeAt(0);
                    48 <= h && 57 >= h ? (h = parseInt(a, 10), h = b[h]) : h = f[F(a)];
                    h && (delete f[h.name], c = F(c), h.name = c, f[c] = h)
                };
                this.removearrayitem = this.removeItem = function(a) {
                    var c = -1,
                        c = null;
                    a = String(a);
                    c = String(a).charCodeAt(0);
                    48 <= c && 57 >= c ? (c = parseInt(a, 10), c = b[c]) : c = f[F(a)];
                    if (c) {
                        f[c.name] = null;
                        delete f[c.name];
                        b.splice(c.index, 1);
                        var h;
                        h = b.length;
                        for (a = c.index; a < h; a++) b[a].index--
                    }
                    return c
                };
                this.sortby = function(a, c) {
                    var f, g;
                    g = b.length;
                    if (1 < g) {
                        var l = 1,
                            u = !1,
                            r = !1;
                        _[1] === typeof c && (c = c.toLowerCase(), 0 <= c.indexOf(_[392]) && (l = -1), 0 <= c.indexOf(_[500]) && (u = !0), 0 <= c.indexOf(_[281]) && (r = !0));
                        b.sort(function(c, b) {
                            var f = c[a],
                                g = b[a];
                            u ? (f = Number(f), isNaN(f) && (f = void 0), g = Number(g), isNaN(g) && (g = void 0), void 0 === f && void 0 === g && (f = c[a], g = b[a])) : r && (null != f && (f = ("" + f).toLowerCase()), null != g && (g = ("" + g).toLowerCase()));
                            return void 0 === f && void 0 !== g ? +l : void 0 !== f && void 0 === g || f < g ? -l : f > g ? +l : 0
                        });
                        for (f = 0; f < g; f++) b[f].index = f
                    }
                }
            },
            Ze = Array(256),
            pa = {};
        (function() {
            function a(a) {
                var c, b, e, f, k = a.length;
                c = 3 * (k >> 2) - ("=" == a.charAt(k - 1)) - ("=" == a.charAt(k - 2));
                for (var d = new r(c), g = c / 3 | 0, h = 0, n = 0; 0 < g--;) c = p[a.charCodeAt(h) & 127], b = p[a.charCodeAt(h + 1) & 127], e = p[a.charCodeAt(h + 2) & 127], f = p[a.charCodeAt(h + 3) & 127], d[n] = c << 2 | b >> 4, d[n + 1] = (b & 15) << 4 | e >> 2, d[n + 2] = (e & 3) << 6 | f, h += 4, n += 3;
                h < k && (c = p[a.charCodeAt(h) & 127], b = p[a.charCodeAt(h + 1) & 127], e = p[a.charCodeAt(h + 2) & 127], f = p[a.charCodeAt(h + 3) & 127], d[n++] = c << 2 | b >> 4, 64 != e && (d[n++] = (b & 15) << 4 | e >> 2), 64 != f && (d[n++] = (e & 3) << 6 | f));
                return d
            }

            function c(a, c) {
                var b, e, f = 15,
                    k = _[244],
                    d = new r(256);
                if (82 == c)
                    if (ie) f = 127, k = ie;
                    else return null;
                b = a[65] & 7;
                for (e = 0; 128 > e; e++) d[2 * e] = a[e], d[2 * e + 1] = String(k).charCodeAt(e & f);
                v.srand(d, 256);
                return v.flip(a, b + 128, a.length - 128 - b)
            }

            function w(a, c, b) {
                if (null == a) return null;
                a = "" + a;
                1 == c && l.basedir && 0 > a.indexOf("://") && 0 != a.indexOf("/") && _[92] != a.slice(0, 5) && (a = l.basedir + a);
                a = a.split("\\").join("/");
                null == g.firstxmlpath && (g.firstxmlpath = "");
                null == g.currentxmlpath && (g.currentxmlpath = "");
                null == g.swfpath && (g.swfpath = "");
                null == g.htmlpath && (g.htmlpath = "");
                for (c = a.indexOf("%"); 0 <= c;) {
                    var e = a.indexOf("%", c + 1);
                    if (e > c) {
                        var f = a.slice(c + 1, e),
                            k = null;
                        if (36 == f.charCodeAt(0)) {
                            if (f = Q(f.slice(1)), null != f) {
                                f = "" + f;
                                a = 47 == f.charCodeAt(0) || 0 < f.indexOf("://") ? f + a.slice(e + 1) : a.slice(0, c) + f + a.slice(e + 1);
                                c = a.indexOf("%");
                                continue
                            }
                        } else switch (f) {
                            case _[485]:
                                k = 1 == b ? "" : g.firstxmlpath;
                                break;
                            case _[405]:
                                k = g.currentxmlpath;
                                break;
                            case _[528]:
                                k = 1 == b ? "" : g.swfpath;
                                break;
                            case _[487]:
                                k = 1 == b ? "" : g.htmlpath;
                                break;
                            case _[531]:
                                k = 1 == b ? "" : l.basedir
                        }
                        null != k ? (e++, "/" == a.charAt(e) && e++, a = k + a.slice(e), c = a.indexOf("%")) : c = a.indexOf("%", c + 1)
                    } else c = -1
                }
                return a
            }

            function f(b, f, g) {
                var h, n;
                0 <= (h = f.indexOf(_[352])) ? (n = f.indexOf(_[336])) > h && (f = f.slice(h + 11, n), h = f.indexOf(_[432]), 0 <= h && (f = f.slice(h + 9, -3), 0 <= f.indexOf(_[101]) && (f = f.split(_[101]).join(_[566])))) : g && 0 <= (h = f.indexOf('"[[KENC')) && (n = f.lastIndexOf(']]"')) > h && (f = f.slice(h + 3, n));
                var k = null;
                h = f.slice(0, 8);
                n = f.slice(8);
                g = !0 === g && Xa & 64 || !g && Xa & 32;
                if ("KENC" != h.slice(0, 4)) return f;
                f = !1;
                var d = 0,
                    p = 0,
                    p = 0,
                    l = !1,
                    d = String(h).charCodeAt(4);
                if (80 == d || 82 == d)
                    if (p = String(h).charCodeAt(5), 85 == p && (p = String(h).charCodeAt(6), l = 90 == p, 66 == p || l)) f = !0;
                if (f && (!g || 80 != d))
                    if (l) {
                        h = d;
                        k = n.length;
                        f = g = null;
                        var q = p = l = d = 0,
                            v = 0,
                            z = 0,
                            t = 0;
                        for (g = new r(4 * k / 5 | 0); d < k;) p = n.charCodeAt(d++) - 35, q = n.charCodeAt(d++) - 35, v = n.charCodeAt(d++) - 35, z = n.charCodeAt(d++) - 35, t = n.charCodeAt(d++) - 35, 56 < p && p--, 56 < q && q--, 56 < v && v--, 56 < z && z--, 56 < t && t--, t += 85 * (85 * (85 * (85 * p + q) + v) + z), g[l++] = t >> 24 & 255, g[l++] = t >> 16 & 255, g[l++] = t >> 8 & 255, g[l++] = t & 255;
                        g = c(g, h);
                        if (null == g) k = null;
                        else {
                            k = g[2] << 16 | g[1] << 8 | g[0];
                            f = new r(k);
                            k = 8 + (g[6] << 16 | g[5] << 8 | g[4]);
                            d = 8;
                            for (l = 0; d < k;) {
                                p = g[d++];
                                q = p >> 4;
                                for (v = q + 240; 255 === v; q += v = g[d++]);
                                for (z = d + q; d < z;) f[l++] = g[d++];
                                if (d === k) break;
                                t = l - (g[d++] | g[d++] << 8);
                                q = p & 15;
                                for (v = q + 240; 255 === v; q += v = g[d++]);
                                for (z = l + q + 4; l < z;) f[l++] = f[t++]
                            }
                            g.length = 0;
                            k = n = e(f)
                        }
                    } else k = a(n), (k = c(k, d)) && (k = e(k));
                null == k && b && Ga(b + _[205]);
                return k
            }

            function e(a) {
                if (y) return y.decode(a);
                for (var c = "", b = 0, e = 0, f = 0, k = 0, d = a.length; b < d;) e = a[b], 128 > e ? (0 < e && (c += nd(e)), b++) : 191 < e && 224 > e ? (f = a[b + 1], c += nd((e & 31) << 6 | f & 63), b += 2) : (f = a[b + 1], k = a[b + 2], e = (e & 15) << 12 | (f & 63) << 6 | k & 63, 65279 != e && (c += nd(e)), b += 3);
                return c
            }

            function n(a, c, b) {
                void 0 !== c ? c(a, b) : Ga(a + _[98] + b + ")")
            }

            function h(a, c, e, f, h) {
                if (0 == g.DMcheck(a)) n(a, h, _[254]);
                else {
                    var k = null,
                        d = !1;
                    if (b.ie && "" == ba.domain) try {
                        k = new ActiveXObject(_[234]), d = !0
                    } catch (r) {
                        k = null
                    }
                    null == k && (k = new XMLHttpRequest);
                    void 0 !== k.overrideMimeType && c && k.overrideMimeType(c);
                    k.onreadystatechange = function() {
                        if (4 == k.readyState) {
                            var c = k.status,
                                b = k.responseText;
                            if (0 == c && b || 200 == c || 304 == c)
                                if (e) {
                                    var g = null,
                                        g = d ? (new DOMParser).parseFromString(b, _[36]) : k.responseXML;
                                    f(a, g, c)
                                } else f(a, b);
                            else n(a, h, k.status)
                        }
                    };
                    try {
                        k.open("GET", a, !0), k.send(null)
                    } catch (p) {
                        n(a, h, p)
                    }
                }
            }
            var g = pa,
                z = 1;
            try {
                String.fromCharCode.apply(null, (new Uint8Array(4)).subarray(2))
            } catch (u) {
                z = 0
            }
            var r = z ? Uint8Array : Array,
                y = z && window.TextDecoder ? new TextDecoder : null,
                p = null;
            (function() {
                var a;
                p = new r(128);
                for (a = 0; 128 > a; a++) p[a] = 0;
                p[43] = 62;
                p[47] = 63;
                p[61] = 64;
                for (a = 48; 58 > a; a++) p[a] = a + 4;
                for (a = 65; 91 > a; a++) p[a] = a - 65;
                for (a = 97; 123 > a; a++) p[a] = a - 71
            })();
            g.firstxmlpath = null;
            g.currentxmlpath = null;
            g.swfpath = null;
            g.htmlpath = null;
            g.parsePath = w;
            g.DMcheck = function(a) {
                var c;
                if (Xa & 256 && (c = ba.domain) && Rb) {
                    a = a.toLowerCase();
                    var b = a.indexOf("://");
                    if (0 < b) {
                        var b = b + 3,
                            e = a.indexOf("/", b);
                        if (0 < e) return a = a.slice(b, e), b = a.indexOf(":"), 1 < b && (a = a.slice(0, b)), a == c
                    } else return c == Rb
                }
                return !0
            };
            var v = new function() {
                    var a, c, b;
                    this.srand = function(e, f) {
                        var k, d, g, h, n = new r(256);
                        for (k = 0; 256 > k; k++) n[k] = k;
                        for (d = k = 0; 256 > k; k++) d = d + n[k] + e[k % f] & 255, h = n[k], n[k] = n[d], n[d] = h;
                        for (g = d = k = 0; 256 > g; g++) k = k + 1 & 255, d = d + n[k] & 255, h = n[k], n[k] = n[d], n[d] = h;
                        a = n;
                        c = k;
                        b = d
                    };
                    this.flip = function(e, f, k) {
                        var d = new r(k),
                            g, h;
                        d.length = k;
                        var n = a,
                            p = c,
                            l = b;
                        for (g = 0; g < k; g++, f++) p = p + 1 & 255, l = l + n[p] & 255, d[g] = e[f] ^ a[n[p] + n[l] & 255], h = n[p], n[p] = n[l], n[l] = h;
                        c = p;
                        b = l;
                        return d
                    }
                },
                t = {},
                q = function() {
                    this.img = this.url = null;
                    this.retries = 0;
                    this.refs = 1;
                    this.state = 0;
                    this.cb_done = [];
                    this.cb_err = []
                };
            q.prototype.handleEvent = function(a) {
                a = a.type;
                var c = 1;
                if ("load" == a) c = 2;
                else if (_[91] == a) c = 4;
                else if (_[40] == a && (c = 3, ++this.retries < l.network.retrycount)) {
                    this.reload();
                    return
                }
                this.state = c;
                this.finish()
            };
            q.prototype.removeImage = function() {
                var a = this.img;
                a.removeEventListener("load", this);
                a.removeEventListener(_[40], this);
                a.removeEventListener(_[91], this);
                this.img = null
            };
            q.prototype.clear = function() {
                this.img = this.url = null;
                this.retries = 0;
                this.refs = 1;
                this.state = 0;
                this.cb_done.length = 0;
                this.cb_err.length = 0
            };
            q.prototype.load = function() {
                var a = this.img,
                    c = this.state;
                null == a && (a = Ja(1), a.addEventListener("load", this), a.addEventListener(_[40], this), a.addEventListener(_[91], this), this.img = a);
                0 == c && (this.state = 1, a.src = this.url)
            };
            q.prototype.reload = function() {
                this.removeImage();
                this.state = 0;
                this.load()
            };
            q.prototype.finish = function() {
                var a, c = this.img,
                    b = this.refs,
                    e = 4 == this.state,
                    f = 2 == this.state ? this.cb_done : this.cb_err;
                delete t[this.url];
                this.removeImage();
                for (a = 0; a < b; a++) {
                    var k = f[a];
                    k && k(c, e)
                }
                this.clear()
            };
            g.reportLoadingError = function(a) {
                a = _[354] + a + _[457];
                l.lasterror = a;
                0 == Na(_[351]) && oa(3, a)
            };
            g.loadimage = function(a, c, b, e) {
                var f = t[a];
                f ? f.refs++ : (f = new q, f.url = a, t[a] = f);
                f.cb_done.push(c);
                f.cb_err.push(b);
                a = f;
                !0 === e && (a.retries = l.network.retrycount);
                a.load();
                return a.img
            };
            g.iOSWakelockCheck = function() {
                for (var a in t) t[a].reload()
            };
            g.loadfile = function(a, c, b) {
                g.loadfile2(a, null, c, b)
            };
            g.loadxml = function(a, c, b) {
                g.loadfile2(a, _[36], c, b, !0)
            };
            g.loadfile2 = function(a, c, b, e, g) {
                g = !0 === g;
                var k = {
                    errmsg: !0
                };
                k.rqurl = a;
                a = w(a);
                k.url = a;
                h(a, c, g, function(a, h, n) {
                    !0 === g ? b(h, n) : (h = f(a, h, _[108] == c), k.data = h, null != h ? b && b(k) : e && e(k))
                }, g ? e : function(c, b) {
                    e && e(k);
                    k.errmsg && oa(3, a + _[98] + b + ")")
                })
            };
            g.resolvecontentencryption = f;
            g.b64u8 = function(c) {
                return e(a(c))
            };
            g.decodeLicense = function(a) {
                return null
            }
        })();
        var fa = {};
        (function() {
            function a(c) {
                var b, e, f = c.childNodes,
                    g;
                e = f.length;
                for (b = 0; b < e; b++)
                    if (g = f.item(b)) switch (g.nodeType) {
                        case 1:
                            a(g);
                            break;
                        case 8:
                            c.removeChild(g), b--, e--
                    }
            }

            function c(a, c) {
                var b, e, f = a.childNodes,
                    g = -1;
                e = f.length;
                if (1 <= e)
                    for (b = 0; b < e; b++)
                        if (F(f[b].nodeName) == c) {
                            g = b;
                            break
                        }
                return 0 <= g ? f[g] : null
            }

            function w(c, e, f, g, h) {
                var n, t, q, x = null,
                    u = null,
                    B, D;
                D = 0;
                var A, k = c.length,
                    d = new XMLSerializer,
                    G = !1;
                g || (G = !0, g = [], h = [], l.xml.parsetime = Ca());
                for (var E = 0; E < k; E++)
                    if ((n = c[E]) && n.nodeName && "#text" != n.nodeName && (t = n.nodeName, t = F(t), _[142] != t)) {
                        t = null == e && _[56] == t ? null : e ? e + "." + t : t;
                        if (q = n.attributes)
                            if (q.devices && 0 == b.checkSupport(q.devices.value)) continue;
                            else if (q["if"] && !X.calc(null, q["if"].value)) continue;
                        A = (u = q && q.name ? q.name.value : null) ? !0 : !1;
                        if (f) {
                            if (_[524] == t && f & 16) continue;
                            if ((_[60] == t || "layer" == t) && f & 4) continue;
                            if (_[7] == t && f & 128) continue;
                            if (_[94] == t && f & 65536) continue;
                            if (f & 64 && u)
                                if (_[60] == t || "layer" == t) {
                                    if ((x = La.getItem(u)) && x._pCD && x.keep) continue
                                } else if (_[7] == t && (x = db.getItem(u)) && x._pCD && x.keep) continue
                        }
                        if (t)
                            if (A) {
                                if (_[11] == t || "data" == t || "scene" == t) {
                                    a(n);
                                    A = null;
                                    if ((_[11] == t || "data" == t) && n.childNodes && 1 <= n.childNodes.length)
                                        for (x = 0; x < n.childNodes.length; x++)
                                            if (4 == n.childNodes[x].nodeType) {
                                                A = n.childNodes[x].nodeValue;
                                                break
                                            }
                                    null == A && (A = d.serializeToString(n), A = A.slice(A.indexOf(">") + 1, A.lastIndexOf("</")), _[11] == t && (A = A.split(_[543]).join('"').split(_[545]).join("'").split(_[156]).join(String.fromCharCode(160)).split("&amp;").join("&")));
                                    _[11] == t && ma(n.getAttribute(_[499])) ? X.addPAction(u, A) : da(t + "[" + u + _[78], A);
                                    if (q) {
                                        var R;
                                        A = q.length;
                                        for (R = 0; R < A; R++)
                                            if (B = q[R], x = F(B.nodeName), B = B.value, "name" != x) {
                                                D = x.indexOf(".");
                                                if (0 < D)
                                                    if (b.checkSupport(x.slice(D + 1))) x = x.slice(0, D);
                                                    else continue;
                                                D = t + "[" + u + "]." + F(x);
                                                da(D, B)
                                            }
                                    }
                                    continue
                                }
                                t = t + "[" + u + "]";
                                if (!wd(u, t)) continue;
                                da(t + ".name", u)
                            } else(u = Q(t)) && u.isArray && !u.isDynArray && (u = "n" + String(u.count), t = t + "[" + u + "]", da(t + ".name", u));
                        if (q) {
                            var Ha = "view" == t,
                                x = t ? Q(t) : null,
                                u = null;
                            A = q.length;
                            x && (x._lateBinding && (u = x._lateBinding), (B = q.style) && (B = B.value) && null == u && (x.style = B, h.push(t), u = x._lateBinding = {}));
                            for (R = 0; R < A; R++) {
                                B = q[R];
                                x = F(B.nodeName);
                                B = B.value;
                                var N = t ? t + "." : "";
                                if ("name" != x && "style" != x) {
                                    D = x.indexOf(".");
                                    if (0 < D)
                                        if (b.checkSupport(x.slice(D + 1))) x = x.slice(0, D).toLowerCase();
                                        else continue;
                                    D = N + x;
                                    u ? u[x] = B : !B || _[1] != typeof B || "get:" != B.slice(0, 4) && "calc:" != B.slice(0, 5) ? (da(D, B), Ha && da("xml." + D, B)) : (g.push(D), g.push(B))
                                }
                            }
                        }
                        n.childNodes && 0 < n.childNodes.length && w(n.childNodes, t, f, g, h)
                    }
                if (G) {
                    k = g.length;
                    for (E = 0; E < k; E += 2) da(g[E], g[E + 1]);
                    k = h.length;
                    for (E = 0; E < k; E++)
                        if (t = h[E], X.assignstyle(t, null), x = Q(t))
                            if (u = x._lateBinding) X.copyattributes(x, u), x._lateBinding = null;
                    l.xml.parsetime = Ca() - l.xml.parsetime
                }
            }

            function f(a, c) {
                var b = null,
                    e, g;
                g = a.length;
                for (e = 0; e < g; e++)
                    if (b = a[e], !b || !b.nodeName || _[11] != F(b.nodeName)) {
                        var h = b.attributes;
                        if (h) {
                            var n, l = h.length,
                                w;
                            for (n = 0; n < l; n++) {
                                var u = h[n];
                                w = F(u.nodeName);
                                var B = w.indexOf(".");
                                0 < B && (w = w.slice(0, B));
                                if (_[462] == w) {
                                    w = u.value;
                                    var B = w.split("|"),
                                        D, A;
                                    A = B.length;
                                    for (D = 0; D < A; D++) w = B[D], "" != w && 0 > w.indexOf("://") && 47 != w.charCodeAt(0) && (B[D] = c + w);
                                    u.value = B.join("|")
                                } else if (B = w.indexOf("url"), 0 == B || 0 < B && B == w.length - 3)
                                    if (w = u.value) B = w.indexOf(":"), D = w.charCodeAt(0), 47 == D || 37 == D && 36 != w.charCodeAt(1) || 0 < B && ("//" == w.substr(B + 1, 2) || 0 <= _[115].indexOf(w.substr(0, B + 1))) || (w = c + w), u.value = w
                            }
                        }
                        b.childNodes && 0 < b.childNodes.length && f(b.childNodes, c)
                    }
            }

            function e(a, c) {
                var b = gd(c),
                    e = b.lastIndexOf("/"),
                    g = b.lastIndexOf("\\");
                g > e && (e = g);
                0 < e && (b = b.slice(0, e + 1), f(a, b))
            }

            function n(a, b) {
                var e = c(a, _[411]);
                if (e) {
                    var f = "",
                        g, n;
                    n = e.childNodes.length;
                    for (g = 0; g < n; g++) f += e.childNodes[g].nodeValue;
                    return (e = pa.resolvecontentencryption(b, f)) ? (e = (new DOMParser).parseFromString(e, _[36])) && e.documentElement && _[31] == e.documentElement.nodeName ? (oa(3, b + _[28]), null) : e : null
                }
                return Xa & 32 ? (Ga(b + _[214]), null) : a
            }

            function h(a, c) {
                var b, e;
                switch (a.nodeType) {
                    case 1:
                        var f = fa.xmlDoc.createElement(a.nodeName);
                        if (a.attributes && 0 < a.attributes.length)
                            for (b = 0, e = a.attributes.length; b < e;) f.setAttribute(a.attributes[b].nodeName, a.getAttribute(a.attributes[b++].nodeName));
                        if (c && a.childNodes && 0 < a.childNodes.length)
                            for (b = 0, e = a.childNodes.length; b < e;) f.appendChild(h(a.childNodes[b++], c));
                        return f;
                    case 3:
                    case 4:
                    case 8:
                        return fa.xmlDoc.createTextNode(a.nodeValue)
                }
            }

            function g(a, c) {
                var f, l, p;
                if (null != fa.xmlIncludeNode) {
                    p = gd(a.url);
                    if ((l = a.responseXML) && l.documentElement && _[31] == l.documentElement.nodeName) {
                        Ga(p + _[28]);
                        return
                    }
                    l = n(l, a.url);
                    if (null == l) return;
                    e(l.childNodes, p);
                    f = l.childNodes;
                    var w = fa.xmlIncludeNode.parentNode;
                    if (null != w.parentNode) {
                        var t = 0;
                        p = f.length;
                        if (1 < p)
                            for (l = 0; l < p; l++)
                                if (_[56] == F(f[l].nodeName)) {
                                    t = l;
                                    break
                                }
                        l = null;
                        l = void 0 === fa.xmlDoc.importNode ? h(f[t], !0) : fa.xmlDoc.importNode(f[t], !0);
                        w.insertBefore(l, fa.xmlIncludeNode);
                        w.removeChild(fa.xmlIncludeNode)
                    } else fa.xmlDoc = l;
                    fa.xmlAllNodes = [];
                    fa.addNodes(fa.xmlDoc.childNodes);
                    fa.xmlIncludeNode = null
                }
                w = !1;
                p = fa.xmlAllNodes.length;
                for (l = 0; l < p; l++)
                    if (f = fa.xmlAllNodes[l], t = null, null != f.nodeName) {
                        t = F(f.nodeName);
                        if (_[142] == t) {
                            var t = f.attributes,
                                q, u = t.length,
                                J = !1;
                            for (q = 0; q < u; q++) {
                                var B = t[q];
                                _[534] == B.nodeName ? 0 == b.checkSupport(B.value) && (J = !0) : "if" == B.nodeName && (X.calc(null, B.value) || (J = !0))
                            }
                            if (0 == J)
                                for (q = 0; q < u; q++)
                                    if (B = t[q], "url" == F(B.nodeName)) {
                                        w = !0;
                                        J = B.value;
                                        B = J.indexOf(":");
                                        0 < B && 0 <= _[115].indexOf(J.substr(0, B + 1)) && (J = X.calc(null, J.substr(B + 1)));
                                        fa.xmlIncludeNode = f;
                                        var D = pa.parsePath(J);
                                        D ? pa.loadxml(D, function(a, b) {
                                            a ? g({
                                                url: D,
                                                responseXML: a
                                            }, c) : Ga(D + " - " + (200 == b ? _[223] : _[197]))
                                        }) : c()
                                    }
                        }
                        if (w) break
                    }
                0 == w && c()
            }
            fa.resolvexmlencryption = n;
            fa.resolvexmlincludes = function(a, c) {
                var b = a.childNodes;
                fa.xmlDoc = a;
                fa.xmlAllNodes = [];
                fa.addNodes(b);
                e(b, l.xml.url);
                fa.xmlIncludeNode = null;
                g(null, c)
            };
            fa.parsexml = w;
            fa.xmlDoc = null;
            fa.xmlAllNodes = null;
            fa.xmlIncludeNode = null;
            fa.addNodes = function(a) {
                var c, b, e;
                e = a.length;
                for (b = 0; b < e; b++)(c = a[b]) && c.nodeName && _[11] != F(c.nodeName) && (fa.xmlAllNodes.push(c), c.childNodes && 0 < c.childNodes.length && fa.addNodes(c.childNodes))
            };
            fa.findxmlnode = c
        })();
        var ld = {};
        (function() {
            var a = ld;
            a.linear = function(a, b, f) {
                return f * a + b
            };
            a.easeinquad = function(a, b, f) {
                return f * a * a + b
            };
            a.easeoutquad = function(a, b, f) {
                return -f * a * (a - 2) + b
            };
            a[_[5]] = a.easeoutquad;
            a.easeinoutquad = function(a, b, f) {
                return (1 > (a /= .5) ? f / 2 * a * a : -f / 2 * (--a * (a - 2) - 1)) + b
            };
            a.easeinback = function(a, b, f) {
                return f * a * a * (2.70158 * a - 1.70158) + b
            };
            a.easeoutback = function(a, b, f) {
                return f * (--a * a * (2.70158 * a + 1.70158) + 1) + b
            };
            a.easeinoutback = function(a, b, f) {
                var e = 1.70158;
                return 1 > (a *= 2) ? f / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b : f / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
            };
            a.easeincubic = function(a, b, f) {
                return f * a * a * a + b
            };
            a.easeoutcubic = function(a, b, f) {
                return f * (--a * a * a + 1) + b
            };
            a.easeinquart = function(a, b, f) {
                return f * a * a * a * a + b
            };
            a.easeoutquart = function(a, b, f) {
                return -f * ((a = a / 1 - 1) * a * a * a - 1) + b
            };
            a.easeinquint = function(a, b, f) {
                return f * a * a * a * a * a + b
            };
            a.easeoutquint = function(a, b, f) {
                return f * ((a = a / 1 - 1) * a * a * a * a + 1) + b
            };
            a.easeinsine = function(a, b, f) {
                return -f * Math.cos(Ua / 2 * a) + f + b
            };
            a.easeoutsine = function(a, b, f) {
                return f * Math.sin(Ua / 2 * a) + b
            };
            a.easeinexpo = function(a, b, f) {
                return 0 == a ? b : f * Math.pow(2, 10 * (a - 1)) + b - .001 * f
            };
            a.easeoutexpo = function(a, b, f) {
                return 1 == a ? b + f : 1.001 * f * (-Math.pow(2, -10 * a) + 1) + b
            };
            a.easeincirc = function(a, b, f) {
                return -f * (Math.sqrt(1 - a * a) - 1) + b
            };
            a.easeoutcirc = function(a, b, f) {
                return f * Math.sqrt(1 - (a = a / 1 - 1) * a) + b
            };
            a.easeoutbounce = function(a, b, f) {
                return a < 1 / 2.75 ? 7.5625 * f * a * a + b : a < 2 / 2.75 ? f * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + b : a < 2.5 / 2.75 ? f * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) + b : f * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + b
            };
            a.easeinbounce = function(c, b, f) {
                return f - a.easeoutbounce(1 - c, 0, f) + b
            };
            a.getTweenfu = function(c) {
                c = F(c);
                "" == c || "null" == c ? c = _[73] : void 0 === a[c] && (c = _[73]);
                return a[c]
            }
        })();
        var X = {};
        (function() {
            function a(a, c, b) {
                var d, e = a.length;
                b = 1 != b;
                for (d = 0; d < e; d++) {
                    var m = "" + a[d],
                        f = m.toLowerCase();
                    b && "null" == f ? a[d] = null : 41 == m.charCodeAt(m.length - 1) && (f = f.slice(0, 4), "get(" == f ? a[d] = Q(ya(m.slice(4, m.length - 1)), c) : "calc" == f && 40 == m.charCodeAt(4) && (a[d] = Q(m, c)))
                }
            }

            function c(a, c) {
                var b, d, e, m = 0,
                    f = 0,
                    g = 0;
                e = "";
                b = 0;
                for (d = a.length; b < d;) {
                    e = a.charCodeAt(b);
                    if (!(32 >= e))
                        if (34 == e) 0 == g ? g = 1 : 1 == g && (g = 0);
                        else if (39 == e) 0 == g ? g = 2 : 2 == g && (g = 0);
                    else if (0 == g)
                        if (91 == e) 0 == f && (f = b + 1), m++;
                        else if (93 == e && 0 < m && (m--, 0 == m)) {
                        if (e = Lc(a, f, b, c)) a = a.slice(0, f) + e + a.slice(b), b = f + e.length + 1, d = a.length;
                        f = 0
                    }
                    b++
                }
                return a
            }

            function b(a, c) {
                var d = "",
                    e, m, f, g, k;
                f = a.length;
                k = c.length;
                for (m = 0; m < f; m++) e = a.charAt(m), "%" == e ? (m++, e = a.charCodeAt(m) - 48, 0 <= e && 9 >= e ? (m + 1 < f && (g = a.charCodeAt(m + 1) - 48, 0 <= g && 9 >= g && (m++, e = 10 * e + g)), d = e < k ? d + ("" + c[e]) : d + "null") : d = -11 == e ? d + "%" : d + ("%" + a.charAt(m))) : d += e;
                return d
            }

            function f(a, c, d, e) {
                d = Array.prototype.slice.call(d);
                d.splice(0, 0, a);
                c = b(c, d);
                k.callaction(c, e, !0)
            }

            function e(a) {
                a.position = O ? 0 : 1
            }

            function n(a, c, b) {
                var krpano = l;
                var caller = b;
                var args = c;
                var resolve = B;
                var actions = k;
                try {
                    eval(a, b)
                } catch (d) {
                    oa(3, c[0] + " - " + d)
                }
            }

            function h(a) {
                var c = E,
                    b = c.length,
                    d;
                for (d = 0; d < b; d++)
                    if (c[d].id == a) {
                        a = c.splice(d, 1);
                        ea === a && (ea = null);
                        a && a[0].blockedactions && (H.splice(H.indexOf(a), 1), k.executeActions(a[0].blockedactions));
                        break
                    }
            }

            function g(a) {
                oa(2, _[196] + a)
            }

            function z(a) {
                var c = a.length;
                if (2 == c || 3 == c) {
                    var d = Q(a[c - 2], k.actioncaller),
                        b = Q(a[c - 1], k.actioncaller);
                    null == d && (d = a[c - 2]);
                    null == b && (b = a[c - 1]);
                    return [a[0], parseFloat(d), parseFloat(b)]
                }
                return null
            }

            function ua(a, c, d) {
                var b = 1 == c.length ? Q(c[0], d) : c[1],
                    b = 0 == a ? escape(b) : unescape(b);
                da(c[0], b, !1, d, !0)
            }

            function r(a) {
                var c, b = a.length,
                    d = 0,
                    e = 0,
                    m = !1,
                    f = !1,
                    g = 0,
                    k = 0,
                    C = 0,
                    n = !1,
                    h = [],
                    q = 0,
                    p = 0;
                for (c = 0; c < b; c++)
                    if (p = a.charCodeAt(c), 0 == n && 32 >= p) 0 < e && (h[q++] = a.substr(d, e), e = 0), m = !1;
                    else if (0 == n && (61 == p || 33 == p && 61 == a.charCodeAt(c + 1) || 62 == p || 60 == p)) 0 == m && (0 < e ? (h[q++] = a.substr(d, e), e = 0) : 0 == q && 0 == l.strict && (h[q++] = ""), m = !0, f = !1, d = c), e++;
                else if (0 != n || 43 != p && 45 != p && 42 != p && 47 != p && 94 != p && 63 != p && 58 != p) {
                    if (0 == C)
                        if (91 == p) g++, n = !0;
                        else if (93 == p) g--, 0 == g && 0 == k && (n = !1);
                    else if (40 == p) k++, n = !0;
                    else if (41 == p) k--, 0 == k && 0 == g && (n = !1);
                    else {
                        if (39 == p || 34 == p) C = p, n = !0
                    } else p == C && (C = 0, 0 == g && 0 == k && (n = !1));
                    if (m || f) 0 < e && (h[q++] = a.substr(d, e), e = 0), f = m = !1, d = c;
                    0 == e && (d = c);
                    e++
                } else 0 < e && (h[q++] = a.substr(d, e)), m = !1, f = !0, d = c, e = 1;
                0 < e && (h[q++] = a.substr(d, e));
                2 == q && m && 0 == l.strict && (h[q++] = "");
                return h
            }

            function y(a) {
                var c = a.length;
                if (!(3 > c)) {
                    var d, b;
                    for (d = 1; d < c - 1; d++)
                        if (b = a[d], "==" == b || "!=" == b) {
                            a[d - 1] = "@" + a[d - 1];
                            b = a[d + 1];
                            if ("+" == b || "-" == b)
                                for (d++, b = a[d + 1];
                                    "+" == b || "-" == b;) d++, b = a[d + 1];
                            a[d + 1] = "@" + b
                        }
                }
            }

            function p(a) {
                var d = C,
                    c = a.length,
                    b, e;
                if (1 == c) a[0] = q(a[0]);
                else
                    for (b = 0; b < c; b++)
                        if (e = a[b], !(0 <= d.indexOf("." + e + "."))) {
                            switch (e) {
                                case "AND":
                                    e = "&&";
                                    break;
                                case "OR":
                                    e = "||";
                                    break;
                                case "GT":
                                    e = ">";
                                    break;
                                case "GE":
                                    e = ">=";
                                    break;
                                case "LT":
                                    e = "<";
                                    break;
                                case "LE":
                                    e = "<=";
                                    break;
                                case "EQ":
                                    e = "==";
                                    break;
                                case "LSHT":
                                    e = "<<";
                                    break;
                                case "RSHT":
                                    e = ">>";
                                    break;
                                case "BAND":
                                    e = "~&";
                                    break;
                                case "BOR":
                                    e = "~|";
                                    break;
                                default:
                                    e = q(e)
                            }
                            a[b] = e
                        }
            }

            function v(a) {
                var c = a.length;
                if (!(2 > c)) {
                    var d = C,
                        b, e, m = null;
                    for (b = 0; b < a.length; b++)
                        if (m = a[b], "+" == m || "-" == m)
                            if (0 == b || 0 <= d.indexOf("." + a[b - 1] + ".")) {
                                e = 45 == m.charCodeAt(0) ? -1 : 1;
                                c = 1;
                                for (m = "" + a[b + c];
                                    "+" == m || "-" == m;) e *= 45 == m.charCodeAt(0) ? -1 : 1, c++, m = "" + a[b + c];
                                m && 40 == m.charCodeAt(0) && (m = q(m));
                                m = m && 37 == m.charCodeAt(m.length - 1) ? parseFloat(m) * e + "%" : Number(m) * e;
                                a.splice(b, 1 + c, m);
                                --b
                            }
                    for (b = 1; b < a.length - 1; b++) m = a[b], "*" == m ? (a.splice(b - 1, 3, Number(a[b - 1]) * Number(a[b + 1])), b -= 3) : "/" == m ? (a.splice(b - 1, 3, Number(a[b - 1]) / Number(a[b + 1])), b -= 3) : "^" == m ? (a.splice(b - 1, 3, Math.pow(Number(a[b - 1]), Number(a[b + 1]))), b -= 3) : "<<" == m ? (a.splice(b - 1, 3, Number(a[b - 1]) << Number(a[b + 1])), b -= 3) : ">>" == m ? (a.splice(b - 1, 3, Number(a[b - 1]) >> Number(a[b + 1])), b -= 3) : "~&" == m ? (a.splice(b - 1, 3, Number(a[b - 1]) & Number(a[b + 1])), b -= 3) : "~|" == m && (a.splice(b - 1, 3, Number(a[b - 1]) | Number(a[b + 1])), b -= 3);
                    for (b = 1; b < a.length - 1; b++) m = a[b], "+" == m ? (a.splice(b - 1, 3, a[b - 1] + a[b + 1]), b -= 3) : "-" == m && (a.splice(b - 1, 3, Number(a[b - 1]) - Number(a[b + 1])), b -= 3)
                }
            }

            function t(a) {
                if (1 == a.length) return a[0];
                var b, c = null,
                    d = null,
                    e = null,
                    c = !1;
                for (b = 0; b < a.length; b++)
                    if (c = "" + a[b], 0 < c.length && 0 <= _[460].indexOf(c)) {
                        if (0 == b || b >= a.length - 1) throw _[42];
                        d = a[b - 1];
                        e = a[b + 1];
                        switch (c) {
                            case "===":
                            case "==":
                                c = d == e;
                                break;
                            case "!==":
                            case "!=":
                                c = d != e;
                                break;
                            case "<":
                                c = d < e;
                                break;
                            case "<=":
                                c = d <= e;
                                break;
                            case ">":
                                c = d > e;
                                break;
                            case ">=":
                                c = d >= e;
                                break;
                            default:
                                throw _[42];
                        }
                        a.splice(b - 1, 3, c);
                        b -= 2
                    }
                if (1 == a.length) return a[0];
                for (b = 0; b < a.length; b++)
                    if (c = a[b], "&&" == c || "||" == c) {
                        if (0 == b || b >= a.length - 1) throw _[42];
                        d = a[b - 1];
                        e = a[b + 1];
                        c = "&&" == c ? d && e : d || e;
                        a.splice(b - 1, 3, c);
                        b -= 2
                    }
                if (5 == a.length && "?" == a[1] && ":" == a[3]) return a[0] ? a[2] : a[4];
                if (1 < a.length) throw _[42];
                return a[0]
            }

            function q(a) {
                var b = void 0,
                    b = F(a),
                    c = b.charCodeAt(0),
                    d, e = 0,
                    f = !1;
                64 == c && (f = !0, a = a.slice(1), b = b.slice(1), c = b.charCodeAt(0));
                if (39 == c || 34 == c) {
                    a = ya(a);
                    if (f && 5 >= a.length) {
                        b = F(a);
                        if ("true" == b) return !0;
                        if (_[25] == b) return !1;
                        if ("null" == b) return null
                    }
                    2 >= a.length && 0 <= C.indexOf("." + a + ".") && (a = m + a + m);
                    return a
                }
                if (33 == c || 43 == c || 45 == c) e = c, a = a.slice(1), b = b.slice(1), c = b.charCodeAt(0);
                d = b.charCodeAt(b.length - 1);
                40 == c && 41 == d ? b = x(a.slice(1, -1)) : 37 == d ? b = a : (b = "null" != b ? Q(a, k.actioncaller, !0) : null, void 0 === b ? (c = Number(a), isNaN(c) || isNaN(parseFloat(a)) ? f && (b = a) : b = c) : _[1] == typeof b && (a = F(b), "true" == a ? b = !0 : _[25] == a ? b = !1 : "null" == a ? b = null : (a = Number(b), isNaN(a) || (b = a))));
                33 == e ? b = !b : 45 == e && (b = -b);
                return b
            }

            function x(a) {
                var b;
                if ("" == a || null === a) return a;
                try {
                    var c = r(a);
                    0 == l.strict && y(c);
                    p(c);
                    v(c);
                    b = t(c);
                    _[1] == typeof b && (b = b.split(m).join(""))
                } catch (d) {
                    oa(3, d + ": " + a)
                }
                return b
            }

            function J(a) {
                var b = a.position;
                1 == a.motionmode ? (b *= a.Tmax, b <= a.T1 ? b *= a.accelspeed / 2 * b : b > a.T1 && b <= a.T1 + a.T2 ? b = a.S1 + (b - a.T1) * a.Vmax : (b -= a.T1 + a.T2, b = a.Vmax * b + a.breakspeed / 2 * b * b + a.S1 + a.S2), b = 0 != a.Smax ? b / a.Smax : 1) : 2 == a.motionmode && (b = a.tweenfu(b, 0, 1));
                u.hlookat = a.startH + b * (a.destH - a.startH);
                u.vlookat = a.startV + b * (a.destV - a.startV);
                u.fov = a.startF + b * (a.destF - a.startF);
                hb = Ca()
            }

            function B(a, b) {
                var c = Q(a, b);
                null == c && (c = a);
                return c
            }

            function D(a) {
                var b = a.waitfor;
                "load" == b ? fb.isLoading() && (a.position = 0) : "blend" == b && fb.isBlending() && (a.position = 0);
                hb = Ca()
            }

            function A(a) {
                var b = a.varname,
                    c = parseFloat(a.startval),
                    d = parseFloat(a.endval),
                    e = null != a.startval ? 0 < String(a.startval).indexOf("%") : !1,
                    m = null != a.endval ? 0 < String(a.endval).indexOf("%") : !1;
                m ? e || (c = 0) : e && 0 == d && (m = !0);
                var e = 0,
                    e = a.position,
                    f = a.tweenmap;
                0 <= b.indexOf(_[26], b.lastIndexOf(".") + 1) ? (c = parseInt(a.startval), d = parseInt(a.endval), 1 <= e ? e = d : (e = f(e, 0, 1), e = Math.min(Math.max((c >> 24) + e * ((d >> 24) - (c >> 24)), 0), 255) << 24 | Math.min(Math.max((c >> 16 & 255) + e * ((d >> 16 & 255) - (c >> 16 & 255)), 0), 255) << 16 | Math.min(Math.max((c >> 8 & 255) + e * ((d >> 8 & 255) - (c >> 8 & 255)), 0), 255) << 8 | Math.min(Math.max((c & 255) + e * ((d & 255) - (c & 255)), 0), 255))) : e = 1 <= e ? d : f(e, c, d - c);
                da(b, m ? e + "%" : e, !0, a.actioncaller);
                null != a.updatefu && k.callaction(a.updatefu, a.actioncaller)
            }
            var k = X,
                d = !1;
            k.blocked = !1;
            k.actioncaller = null;
            var G = {};
            k.addPAction = function(a, b) {
                G[a] = b
            };
            var E = [],
                R = [],
                Ha = [],
                N = null,
                T = 0,
                H = [],
                K = null,
                ea = null,
                O = null,
                Z = function() {
                    this.blockedactions = this.id = null;
                    this.position = this.maxruntime = this.starttime = 0;
                    this.updatefu = this.actioncaller = this.donecall = this.process = null
                };
            k.copyattributes = function(a, b) {
                for (var c in b) {
                    var d = F(c);
                    if ("name" != d && "index" != d && "_type" != d) {
                        var e = b[c];
                        if (_[15] !== typeof e) {
                            if (e && _[1] == typeof e) {
                                var m = e.slice(0, 4);
                                "get:" == m ? e = Q(e.slice(4)) : "calc" == m && 58 == e.charCodeAt(4) && (e = x(e.slice(5)))
                            }
                            a[d] = _[55] == typeof a[d] ? ma(e) : e
                        }
                    }
                }
            };
            k.assignstyle = function(a, b) {
                var c = Q(a);
                if (c && (null == b && (b = c.style), b)) {
                    c.style = b;
                    var d = b.split("|"),
                        e, m;
                    m = d.length;
                    for (e = 0; e < m; e++) {
                        var f = Q(_[551] + d[e] + "]");
                        f ? k.copyattributes(c, f) : oa(3, a + _[213] + d[e])
                    }
                }
            };
            k.checkInterrupt = function() {
                if (0 < H.length) {
                    var a = N;
                    if (a) {
                        N = null;
                        var b = E,
                            c = b.length,
                            d;
                        for (d = 0; d < c; d++) {
                            var e = b[d];
                            e && e.blockedactions && (b.splice(d, 1), c--, d--)
                        }
                        K = ea = null;
                        H = [];
                        "break" != F(a) && k.callaction(a)
                    }
                }
            };
            k.isblocked = function() {
                return 0 < H.length || d
            };
            k.isBusy = function() {
                return d
            };
            k.actions_autorun = function(a, b) {
                var c = l.action.getArray(),
                    d = [],
                    e, m, f = null;
                m = c.length;
                for (e = 0; e < m; e++)(f = c[e]) && f.autorun == a && !f._arDone && (f._arDone = !0, d.push(f));
                m = d.length;
                if (0 < m) {
                    c = "";
                    for (e = 0; e < m; e++) f = d[e], c += _[520] + f.name + ");";
                    k.callaction(c, null, b)
                }
            };
            k.callwith = function(a, b) {
                var c = Q(a, k.actioncaller);
                if (c) {
                    var d = c._type;
                    _[60] != d && _[7] != d || k.callaction(b, c)
                }
            };
            k.callaction = function(a, b, c) {
                a && "null" != a && "" != a && (c = typeof a, _[15] === c ? a() : _[83] !== c && k.executeActions(qb(a, b, !1)))
            };
            k.haltActions = function() {
                d = !0;
                var a = new Z;
                a.id = "HALT" + ++T;
                a.maxruntime = 1;
                a.process = e;
                a.starttime = Ca();
                a.actioncaller = k.actioncaller;
                a.blockedactions = [];
                K = a;
                H.push(a);
                E.push(a);
                O = a
            };
            k.resumeActions = function() {
                d = !1;
                O && (K === O && (K = null), O = null)
            };
            k.processactions = function() {};
            var P = 0,
                zb = 0,
                W = 0;
            k.executeActions = function(c) {
                if (null != c) {
                    P++;
                    if (1 == P) W = 0;
                    else if (0 < W) return;
                    for (var d = null, e = null, m = null, f = null, g = k.actioncaller, C = 0, C = 0; C < c.length; C++) {
                        if (O && 0 == zb) {
                            O.blockedactions = O.blockedactions.concat(c.slice(C));
                            break
                        }
                        if (K && 0 == zb) {
                            K.blockedactions = K.blockedactions.concat(c.slice(C));
                            break
                        }
                        d = c[C];
                        e = String(d.cmd);
                        m = d.args.slice(0);
                        d = d.caller;
                        k.actioncaller = d;
                        if ("//" != e.slice(0, 2)) {
                            if ("call" == e) e = F(m.shift());
                            else if ("break" == e) {
                                W = P;
                                break
                            }
                            a(m, d, "set" == e);
                            if (_[268] == e && 0 == ma(m[1])) {
                                var e = m[0],
                                    e = F(e),
                                    h = null,
                                    h = l.events[e];
                                null != h && void 0 !== h && "" != h && k.nexttick(h);
                                m = l.events.getArray();
                                d = m.length;
                                f = void 0;
                                for (f = 0; f < d; f++)
                                    if (h = m[f]) h = h[e], null != h && void 0 !== h && "" != h && k.nexttick(h)
                            } else if (void 0 !== k[e]) k[e].apply(k[e], m);
                            else if (d && void 0 !== d[e]) f = d[e], _[15] === typeof f ? f.apply(f, m) : k.executeActions(qb(d[e], d, !1));
                            else {
                                if (_[11] == e || "call" == e) e = F(m.shift());
                                f = null;
                                null != (f = Q(e)) ? (h = typeof f, _[15] === h ? f.apply(f, m) : _[83] === h ? oa(2, _[104] + vd(e)) : _[1] === typeof f && (m.splice(0, 0, e), f = b(f, m), k.executeActions(qb(f, d, !1)))) : (h = Q(_[518] + e + "]")) ? ((f = h.content) || (f = G[e]), f && (m.splice(0, 0, e), _[385] === F(h.type) ? n(f, m, d) : (f = b(f, m), k.executeActions(qb(f, d, !1))))) : oa(2, _[104] + vd(e))
                            }
                        }
                    }
                    k.actioncaller = g;
                    P--;
                    0 == P && (W = 0, K = null)
                }
            };
            k.processAnimations = function(a) {
                var b = !1,
                    c = E,
                    d = c.length,
                    e, m = Ca();
                a = 1 == a;
                for (e = 0; e < d; e++) {
                    var f = c[e];
                    if (f) {
                        var g = 0 < f.maxruntime ? (m - f.starttime) / 1E3 / f.maxruntime : 1;
                        isNaN(g) && (g = 1);
                        1 < g && (g = 1);
                        f.position = g;
                        null != f.process && (b = !0, f.process(f), g = f.position);
                        if (1 <= g || a) c.splice(e, 1), d--, e--, f.blockedactions ? (ea === f && (ea = null), H.splice(H.indexOf(f), 1), 0 < f.blockedactions.length && 0 == a && (g = f.blockedactions, f.blockedactions = null, k.executeActions(g))) : f.donecall && 0 == a && k.callaction(f.donecall, f.actioncaller)
                    }
                }
                return b
            };
            k.processTicks = function() {
                var a = R,
                    b = a.length,
                    c;
                if (0 < b)
                    for (R = [], c = 0; c < b; c++) {
                        var d = a[c],
                            e = d.actioncaller;
                        (null == e || e && !0 !== e._destroyed) && k.callaction(d.call, e)
                    }
            };
            k.fromcharcode = function() {
                var a = arguments;
                2 == a.length && da(a[0], String.fromCharCode(B(a[1], k.actioncaller)), !1, k.actioncaller)
            };
            k.stopmovements = function() {
                gb.stopFrictions(4)
            };
            k.stopall = function() {
                g(_[517]);
                E = [];
                H = [];
                O = ea = K = null
            };
            k.breakall = function() {
                g(_[463]);
                k.processAnimations(!0)
            };
            k.oninterrupt = function(a) {
                N = a
            };
            k.delayedcall = function() {
                var a = arguments,
                    b = a.length,
                    c = 0;
                3 == b && (c++, b--);
                2 == b && (b = new Z, b.maxruntime = Number(a[c]), b.donecall = a[c + 1], b.starttime = Ca(), b.actioncaller = k.actioncaller, b.id = 0 < c ? "ID" + F(a[0]) : "DC" + ++T, h(b.id), E.push(b))
            };
            k.stopdelayedcall = function(a) {
                h("ID" + F(a))
            };
            k.nexttick = function(a) {
                var b = {};
                b.call = a;
                b.actioncaller = k.actioncaller;
                R.push(b)
            };
            k.def = function() {
                var a = arguments,
                    b = a.length;
                if (2 <= b) {
                    var c = k.actioncaller,
                        d = "" + a[0],
                        e = F(a[1]),
                        a = 3 == b ? a[2] : Q(d, c, !1);
                    _[83] == e ? a = {} : _[511] == e ? (a = parseInt(a), isNaN(a) && (a = 0)) : a = qa(a, e);
                    da(d, a, !1, c, !0)
                }
            };
            k.set = function() {
                var a = arguments;
                2 == a.length && da(a[0], a[1], !1, k.actioncaller)
            };
            k.copy = function() {
                var a = arguments;
                if (2 == a.length) {
                    var b = Q(a[1], k.actioncaller);
                    da(a[0], void 0 === b ? null : b, !1, k.actioncaller)
                }
            };
            k.push = function() {
                var a = arguments;
                1 == a.length && Ha.push(Q(a[0], k.actioncaller))
            };
            k.pop = function() {
                var a = arguments;
                1 == a.length && da(a[0], Ha.pop(), !1, k.actioncaller)
            };
            k[_[555]] = function() {
                var a = arguments,
                    b = a.length,
                    c = a[0],
                    d = F(Q(c, k.actioncaller));
                if (1 == b) da(c, !ma(d), !0, k.actioncaller);
                else if (3 <= b) {
                    var e;
                    b--;
                    for (e = 1; e <= b; e++) {
                        var m = F(a[e]),
                            f = !1;
                        isNaN(Number(d)) || isNaN(Number(m)) ? d == m && (f = !0) : Number(d) == Number(m) && (f = !0);
                        if (f) {
                            e++;
                            e > b && (e = 1);
                            da(c, a[e], !0, k.actioncaller);
                            break
                        }
                    }
                }
            };
            k.toggle = function(a) {
                var b = Q(a, k.actioncaller, !0);
                void 0 !== b && da(a, !ma(b), !0, k.actioncaller)
            };
            k.roundval = function() {
                var a = arguments;
                if (1 <= a.length) {
                    var b = Number(Q(a[0], k.actioncaller)),
                        c = 2 == a.length ? parseInt(a[1]) : 0,
                        b = 0 == c ? Math.round(b).toString() : b.toFixed(c);
                    da(a[0], b, !1, k.actioncaller, !0)
                }
            };
            k.tohex = function() {
                var a = arguments,
                    b = a.length;
                if (0 < b) {
                    var c = parseInt(Q(a[0], k.actioncaller)).toString(16).toUpperCase();
                    2 < b && (c = (_[469] + c).slice(-parseInt(a[2])));
                    1 < b && (c = a[1] + c);
                    da(a[0], c, !1, k.actioncaller, !0)
                }
            };
            k.tolower = function() {
                var a = arguments;
                1 == a.length && da(a[0], F(Q(a[0], k.actioncaller)), !1, k.actioncaller, !0)
            };
            k.toupper = function() {
                var a = arguments;
                1 == a.length && da(a[0], ("" + Q(a[0], k.actioncaller)).toUpperCase(), !1, k.actioncaller, !0)
            };
            k.inc = function() {
                var a = arguments,
                    b = a.length;
                if (1 <= b) {
                    var c = Number(Q(a[0], k.actioncaller)) + (1 < b ? Number(a[1]) : 1);
                    3 < b && c > Number(a[2]) && (c = Number(a[3]));
                    da(a[0], c, !0, k.actioncaller)
                }
            };
            k.dec = function() {
                var a = arguments,
                    b = a.length;
                if (1 <= b) {
                    var c = Number(Q(a[0], k.actioncaller)) - (1 < b ? Number(a[1]) : 1);
                    3 < b && c < Number(a[2]) && (c = Number(a[3]));
                    da(a[0], c, !0, k.actioncaller)
                }
            };
            k.add = function() {
                var a = z(arguments);
                a && da(a[0], a[1] + a[2], !1, k.actioncaller)
            };
            k.sub = function() {
                var a = z(arguments);
                a && da(a[0], a[1] - a[2], !1, k.actioncaller)
            };
            k.mul = function() {
                var a = z(arguments);
                a && da(a[0], a[1] * a[2], !1, k.actioncaller)
            };
            k.div = function() {
                var a = z(arguments);
                a && da(a[0], a[1] / a[2], !1, k.actioncaller)
            };
            k.mod = function() {
                var a = z(arguments);
                if (a) {
                    var b = a[1],
                        c = b | 0,
                        b = b + (-c + c % (a[2] | 0));
                    da(a[0], b, !1, k.actioncaller)
                }
            };
            k.pow = function() {
                var a = z(arguments);
                a && da(a[0], Math.pow(a[1], a[2]), !1, k.actioncaller)
            };
            k.clamp = function() {
                var a = arguments;
                if (3 == a.length) {
                    var b = k.actioncaller,
                        c = Number(Q(a[0], b)),
                        d = Number(a[1]),
                        e = Number(a[2]);
                    c < d && (c = d);
                    c > e && (c = e);
                    da(a[0], c, !1, b)
                }
            };
            k.remapfovtype = function() {
                var a = arguments,
                    b = a.length;
                if (3 == b || 5 == b) {
                    var c = k.actioncaller,
                        d = Number(Q(a[0], c)),
                        e = 3 == b ? l.area.pixelwidth : Number(Q(a[3], c)),
                        b = 3 == b ? l.area.pixelheight : Number(Q(a[4], c)),
                        d = u.fovRemap(d, a[1], a[2], e, b);
                    da(a[0], d, !1, c)
                }
            };
            k.screentosphere = function() {
                var a = arguments;
                if (4 == a.length) {
                    var b = k.actioncaller,
                        c = u.screentosphere(Number(Q(a[0], b)), Number(Q(a[1], b)));
                    da(a[2], c.x, !1, b);
                    da(a[3], c.y, !1, b)
                }
            };
            k.spheretoscreen = function() {
                var a = arguments;
                if (4 <= a.length) {
                    var b = k.actioncaller,
                        c = u.spheretoscreen(Number(Q(a[0], b)), Number(Q(a[1], b)), a[4]);
                    da(a[2], c.x, !1, b);
                    da(a[3], c.y, !1, b)
                }
            };
            k.screentolayer = function() {
                var a = arguments;
                if (5 == a.length) {
                    var b = k.actioncaller,
                        c = La.getItem(a[0]);
                    if (c) {
                        var d = Number(Q(a[1], b)),
                            e = Number(Q(a[2], b)),
                            m = Qb,
                            f = Qb,
                            g = c.sprite;
                        if (g) {
                            var C = aa,
                                f = V.viewerlayer.getBoundingClientRect(),
                                h = g.getBoundingClientRect(),
                                m = d * C - (h.left - f.left + g.clientLeft + g.scrollLeft),
                                f = e * C - (h.top - f.top + g.clientTop + g.scrollTop);
                            c.scalechildren && (C = 1);
                            m /= c._finalxscale * C;
                            f /= c._finalyscale * C
                        }
                        da(a[3], m, !1, b);
                        da(a[4], f, !1, b)
                    }
                }
            };
            k.layertoscreen = function() {
                var a = arguments;
                if (5 == a.length) {
                    var b = k.actioncaller,
                        c = La.getItem(a[0]);
                    if (c) {
                        var d = Number(Q(a[1], b)),
                            e = Number(Q(a[2], b)),
                            m = Qb,
                            f = Qb,
                            g = c.sprite;
                        if (g) var f = aa,
                            C = c.scalechildren ? f : 1,
                            h = V.viewerlayer.getBoundingClientRect(),
                            n = g.getBoundingClientRect(),
                            m = d * c._finalxscale / C + (n.left - h.left + g.clientLeft + g.scrollLeft) / f,
                            f = e * c._finalyscale / C + (n.top - h.top + g.clientTop + g.scrollTop) / f;
                        da(a[3], m, !1, b);
                        da(a[4], f, !1, b)
                    }
                }
            };
            k.escape = function() {
                ua(0, arguments, k.actioncaller)
            };
            k.unescape = function() {
                ua(1, arguments, k.actioncaller)
            };
            k.txtadd = function() {
                var a = arguments,
                    b, c = a.length,
                    d = 2 == c ? String(Q(a[0], k.actioncaller)) : "";
                "null" == d && (d = "");
                for (b = 1; b < c; b++) d += a[b];
                da(a[0], d, !1, k.actioncaller, !0)
            };
            k.subtxt = function() {
                var a = arguments,
                    b = a.length;
                if (2 <= b) {
                    var c = Q(a[1], k.actioncaller),
                        c = null == c ? String(a[1]) : String(c),
                        c = c.substr(2 < b ? Number(a[2]) : 0, 3 < b ? Number(a[3]) : void 0);
                    da(a[0], c, !1, k.actioncaller, !0)
                }
            };
            k.indexoftxt = function() {
                var a = arguments,
                    b = a.length;
                3 <= b && (b = String(a[1]).indexOf(String(a[2]), 3 < b ? Number(a[3]) : 0), da(a[0], b, !1, k.actioncaller, !0))
            };
            k.txtreplace = function() {
                var a = arguments,
                    b = a.length;
                if (3 == b || 4 == b) {
                    var b = 3 == b ? 0 : 1,
                        c = Q(a[b], k.actioncaller);
                    if (c) var d = a[b + 2],
                        c = c.split(a[b + 1]).join(d);
                    da(a[0], c, !1, k.actioncaller, !0)
                }
            };
            k.txtsplit = function() {
                var a = arguments,
                    b = a.length;
                if (3 <= b) {
                    var c = ("" + B(a[0], k.actioncaller)).split("" + a[1]),
                        d;
                    if (3 == b)
                        for (d = 0; d < c.length; d++) da(a[2] + "[" + d + _[508], c[d], !1, k.actioncaller, !0);
                    else
                        for (d = 2; d < b; d++) da(a[d], c[d - 2], !1, k.actioncaller, !0)
                }
            };
            k.showlog = function() {
                var a = arguments,
                    a = !(1 == a.length && 0 == ma(a[0]));
                V.showlog(a)
            };
            k.trace = function() {
                var a = arguments,
                    b, c = a.length,
                    d = "",
                    e = k.actioncaller;
                for (b = 0; b < c; b++) var m = a[b],
                    f = Q(m, e),
                    d = null != f ? d + f : d + m;
                oa(1, d)
            };
            k[_[556]] = function() {
                var a = arguments,
                    b, c = a.length,
                    d = k.actioncaller;
                for (b = 0; b < c; b++) a: {
                    var e = d,
                        m = void 0,
                        f = void 0,
                        g = void 0,
                        C = xd(a[b]),
                        f = C.length;
                    if (1 == f && e && (g = C[0], e.hasOwnProperty(g))) {
                        e[g] = null;
                        delete e[g];
                        break a
                    }
                    for (var h = l, m = 0; m < f; m++) {
                        var g = C[m],
                            n = m == f - 1,
                            p = null,
                            q = g.indexOf("[");
                        0 < q && (p = Lc(g, q + 1, g.length - 1, e), g = g.slice(0, q));
                        if (void 0 !== h[g]) {
                            if (null != p && (q = h[g], q.isArray))
                                if (g = q.getItem(p))
                                    if (n) break a;
                                    else {
                                        h = g;
                                        continue
                                    }
                            else break;
                            if (n) {
                                h[g] = null;
                                delete h[g];
                                break a
                            } else h = h[g]
                        } else break
                    }
                }
            };
            k.error = function() {
                1 == arguments.length || !1 !== ma(arguments[1]) ? Ga(arguments[0]) : oa(3, arguments[0])
            };
            k.openurl = function() {
                var a = arguments;
                M.open(a[0], 0 < a.length ? a[1] : _[557])
            };
            k.loadscene = function() {
                var a = arguments;
                if (0 < a.length) {
                    var b = a[0],
                        c = Q(_[88] + b + _[78]),
                        d = Q(_[88] + b + _[431]);
                    d && (d += ";");
                    null == c ? oa(3, 'loadscene() - scene "' + b + '" not found') : (l.xml.sceneNEW = b, l.xml.view = {}, fb.loadxml(_[140] + c + _[132], a[1], a[2], a[3], d))
                }
            };
            k.jsget = function() {
                var a = arguments;
                if (2 == a.length) {
                    var b = a[0],
                        c = a[1],
                        d = null;
                    try {
                        (function() {
                            var krpano = V.viewerlayer;
                            d = eval(c)
                        })()
                    } catch (e) {
                        oa(3, "js" + (b ? "get" : "call") + '() - calling Javascript "' + c + '" failed: ' + e)
                    }
                    b && da(b, d, !1, k.actioncaller)
                }
            };
            k.jscall = function() {
                var a = arguments;
                1 == a.length && k.jsget(null, a[0])
            };
            k.parseFunction = function(b) {
                var c = null;
                if (b = qb(b, null, !0)) b = b[0], a(b.args, k.actioncaller), c = [b.cmd].concat(b.args);
                return c
            };
            k.js = function(b) {
                b = "" + b;
                var c = qb(b, null, !0);
                if (c) {
                    c = c[0];
                    a(c.args, k.actioncaller);
                    var d = !1;
                    if (_[15] == typeof M[c.cmd]) {
                        d = !0;
                        try {
                            M[c.cmd].apply(M[c.cmd], c.args)
                        } catch (e) {
                            d = !1
                        }
                    }
                    if (0 == d) {
                        c = c.cmd + (0 < c.args.length ? "('" + c.args.join("','") + "');" : "();");
                        try {
                            eval(c)
                        } catch (m) {
                            oa(2, 'js() - calling Javascript "' + b + '" failed: ' + m)
                        }
                    }
                }
            };
            k.setfov = function() {
                var a = arguments;
                1 == a.length && (u.fov = Number(a[0]))
            };
            k.lookat = function() {
                var a = arguments;
                if (2 <= a.length) {
                    var b;
                    b = Number(a[0]);
                    isNaN(b) || (u.hlookat = b);
                    b = Number(a[1]);
                    isNaN(b) || (u.vlookat = b);
                    b = Number(a[2]);
                    isNaN(b) || (u.fov = b);
                    b = Number(a[3]);
                    isNaN(b) || (u.distortion = b);
                    b = Number(a[4]);
                    isNaN(b) || (u.architectural = b);
                    b = Number(a[5]);
                    isNaN(b) || (u.pannini = "" + b)
                }
            };
            k.adjusthlookat = function() {
                var a = arguments;
                1 == a.length && (a = Number(B(a[0], k.actioncaller)), isNaN(a) || (u.hlookat = fd(u.hlookat, a)))
            };
            k["for"] = function() {
                var a = arguments;
                if (4 == a.length) {
                    zb++;
                    var b = k.actioncaller,
                        c = "" + a[1],
                        d = "" + a[3] + ";" + a[2],
                        a = qb("" + a[0], b, !1),
                        b = qb(d, b, !1);
                    k.executeActions(a);
                    d = null;
                    try {
                        d = r(c), 0 == l.strict && y(d)
                    } catch (e) {
                        d = null, oa(3, e + ": " + c)
                    }
                    if (d)
                        for (;;)
                            if (c = d.slice(), p(c), v(c), t(c)) {
                                if (k.executeActions(b), 0 < W) {
                                    W = 0;
                                    break
                                }
                            } else break;
                    zb--
                }
            };
            k.loop = function() {
                f("loop", _[297], arguments, k.actioncaller)
            };
            k.asyncloop = function() {
                f(_[429], _[175], arguments, k.actioncaller)
            };
            k.callwhen = function() {
                f(_[470], _[181], arguments, k.actioncaller)
            };
            k.asyncfor = function() {
                f(_[478], "if('%5'!='NEXTLOOP',%1);if(%2,%4;%3;delayedcall(0,asyncfor(%1,%2,%3,%4,NEXTLOOP)););", arguments, k.actioncaller)
            };
            k.setinterval = function() {
                f(_[349], _[172], arguments, k.actioncaller)
            };
            k.clearinterval = function(a) {
                k.stopdelayedcall(_[420] + a)
            };
            var m = String.fromCharCode(2),
                C = ".<.<<.<=.==.===.=>.>.>>.!=.!==.+.-.*./.^.&&.||.?.:.~|.~&.";
            k.calc = function() {
                var a, b = arguments;
                2 == b.length && (a = x(b[1]), b[0] && da(b[0], a, !1, k.actioncaller));
                return a
            };
            k.resolvecondition = function() {
                var a = k.actioncaller,
                    b = arguments,
                    c = b.length,
                    d = null,
                    e = null,
                    e = !1;
                if (2 == c || 3 == c) {
                    d = F(b[0]);
                    e = 2 == c ? b[1] : b[2];
                    if ("null" == d || "" == d) d = null;
                    e = null == e || "" == e ? !1 : x(e);
                    null != d && (3 == c && (b = F(b[1]), c = ma(Q(d, a)), "and" == b ? e = c && e : "or" == b ? e = c || e : "xor" == b && (e = !(c && e) && (c || e))), da(d, e, !1, a))
                }
                return e
            };
            k["if"] = function() {
                var a = arguments,
                    b = k.actioncaller;
                2 <= a.length && (x(a[0]) ? k.callaction(a[1], b, !0) : 3 == a.length && k.callaction(a[2], b, !0))
            };
            k.ifnot = function() {
                var a = arguments;
                k["if"](a[0], a[2], a[1])
            };
            k.stoplookto = function() {
                h(_[84])
            };
            k.lookto = function() {
                var b = arguments,
                    c = b.length;
                if (2 <= c)
                    if (ea) oa(2, _[163]);
                    else {
                        var d = 0 == ma(b[5]),
                            e = k.actioncaller,
                            m = new Z;
                        k.stopmovements();
                        h(_[84]);
                        m.id = _[84];
                        m.actioncaller = e;
                        0 == d ? m.donecall = b[6] : (ea = m, m.blockedactions = [], K = m, H.push(m));
                        4 < c && void 0 === b[4] && c--;
                        3 < c && void 0 === b[3] && c--;
                        2 < c && void 0 === b[2] && c--;
                        var f = Number(b[0]),
                            g = Number(b[1]),
                            C = 2 < c ? Number(b[2]) : u.fov,
                            n = 3 < c ? b[3] : null,
                            l = 4 < c ? ma(b[4]) : !0;
                        if (!(isNaN(f) || isNaN(g) || isNaN(C))) {
                            var p = 1,
                                b = 720,
                                c = -720,
                                d = 720,
                                q = u.hlookat,
                                r = q,
                                t = u.vlookat,
                                v = u.fov;
                            if (l) {
                                for (; - 90 > g || 90 < g;) - 90 > g ? (g = -180 - g, f += 180) : 90 < g && (g = 180 - g, f -= 180);
                                for (; 0 > q;) q += 360;
                                for (; 360 < q;) q -= 360;
                                for (; 0 > f;) f += 360;
                                for (; 360 < f;) f -= 360;
                                for (; - 180 > t;) t += 360;
                                for (; 180 < t;) t -= 360;
                                q = fd(q, f);
                                t = fd(t, g);
                                l = q - r;
                                q -= l;
                                f -= l
                            }
                            m.startH = q;
                            m.startV = t;
                            m.startF = v;
                            m.destH = f;
                            m.destV = g;
                            m.destF = C;
                            f = Math.sqrt((f - q) * (f - q) + (g - t) * (g - t) + (C - v) * (C - v));
                            n && ((n = qb(n, null, !1)) && (n = n[0]), n && (g = n.cmd, C = n.args, a(C, e), _[57] == g ? (p = 0, d = 360, 1 == n.args.length && (d = parseFloat(C[0]))) : _[563] == g ? (p = 1, 0 < n.args.length && (b = parseFloat(C[0])), 1 < n.args.length && (c = parseFloat(C[1])), 2 < n.args.length && (d = parseFloat(C[2])), b = +Math.abs(b), c = -Math.abs(c), d = +Math.abs(d)) : "tween" == g && (p = 2, m.tweenfu = ld.getTweenfu(C[0]), m.maxruntime = parseFloat(C[1]), isNaN(m.maxruntime) && (m.maxruntime = .5))));
                            m.motionmode = p;
                            0 == p ? m.maxruntime = f / d : 1 == p && (e = f, p = d * d / (2 * b), n = d / b, f = -(d * d) / (2 * c), g = -d / c, C = e - (p + f), q = C / d, 0 > q && (d = Math.sqrt(2 * e * b * c / (c - b)), p = d * d / (2 * b), n = d / b, f = -(d * d) / (2 * c), g = -d / c, q = C = 0), t = n + q + g, m.accelspeed = b, m.breakspeed = c, m.Vmax = d, m.Tmax = t, m.Smax = e, m.T1 = n, m.T2 = q, m.T3 = g, m.S1 = p, m.S2 = C, m.S3 = f, m.maxruntime = t);
                            m.starttime = Ca();
                            m.process = J;
                            E.push(m)
                        }
                    }
            };
            k.looktohotspot = function() {
                var a = arguments,
                    b = k.actioncaller,
                    c = db.getItem(1 > a.length ? b ? b.name : "" : a[0]);
                if (c) {
                    var b = c.ath,
                        d = c.atv,
                        e = 30,
                        e = c.getcenter(),
                        b = e.x,
                        d = e.y,
                        e = e.z,
                        c = Number(a[1]);
                    isNaN(c) || (e = c);
                    c = u.fovmin;
                    e < c && (e = c);
                    k.lookto(b, d, e, a[2], a[3])
                }
            };
            k.moveto = function() {
                var a = arguments;
                2 <= a.length && k.lookto(a[0], a[1], u.fov, a[2])
            };
            k.zoomto = function() {
                var a = arguments;
                1 <= a.length && k.lookto(u.hlookat, u.vlookat, a[0], a[1])
            };
            k.getlooktodistance = function() {
                var a = arguments,
                    b = a.length;
                if (3 <= b) {
                    var c = k.actioncaller,
                        d = Number(B(a[1], c)),
                        e = Number(B(a[2], c)),
                        m = u.hlookat,
                        f = u.vlookat;
                    5 == b && (m = Number(B(a[3], c)), f = Number(B(a[4], c)));
                    if (!(isNaN(d) || isNaN(e) || isNaN(m) || isNaN(f))) {
                        var b = Math.PI,
                            g = b / 180,
                            d = b - d * g,
                            m = b - m * g,
                            f = f * g,
                            e = e * g,
                            d = Math.acos(Math.cos(f) * Math.cos(m) * Math.cos(e) * Math.cos(d) + Math.sin(f) * Math.sin(e) + Math.cos(f) * Math.sin(m) * Math.cos(e) * Math.sin(d)) / g;
                        da(a[0], d, !1, c)
                    }
                }
            };
            k.wait = function() {
                var a = arguments;
                if (1 == a.length) {
                    var a = a[0],
                        b = F(a);
                    if ("load" == b || "blend" == b) a = 0;
                    else {
                        b = "time";
                        a = Number(a);
                        if (isNaN(a)) return;
                        0 >= a && (a = 0)
                    }
                    var c = new Z;
                    c.waitfor = b;
                    c.maxruntime = a;
                    c.process = D;
                    c.starttime = Ca();
                    c.actioncaller = k.actioncaller;
                    c.id = "WAIT" + ++T;
                    c.blockedactions = [];
                    K = c;
                    H.push(c);
                    E.push(c)
                }
            };
            k.tween = function() {
                var a = arguments,
                    b = a.length;
                if (2 <= b) {
                    var d = k.actioncaller,
                        e = new Z,
                        m = F(a[0]);
                    if (0 < m.indexOf("|")) {
                        var b = ("" + a[0]).split("|"),
                            d = ("" + a[1]).split("|"),
                            e = a[3] ? ("" + a[3]).split("|") : [a[3]],
                            f = b.length,
                            g = d.length,
                            C = e.length,
                            n = parseFloat(a[2]);
                        if (0 > n || isNaN(n)) n = .5;
                        for (m = 0; m < g; m++) d[m] = ya(d[m]);
                        for (m = 0; m < C; m++) e[m] = ya(e[m]);
                        for (m = 0; m < f; m++) k.tween(ya(b[m]), d[m % g], n, e[m % C], m == f - 1 ? a[4] : null, m == f - 1 ? a[5] : null)
                    } else {
                        f = m;
                        C = a[1];
                        g = !1;
                        d && 0 > m.indexOf(".") && d.hasOwnProperty(m) && (f = d._type + "[" + d.name + "]." + m, g = !0);
                        0 == g && 0 < m.indexOf("[") && (f = m = c(m, d), f = f.split(_[150]).join(_[147]));
                        e.id = f;
                        e.varname = m;
                        e.actioncaller = d;
                        e.startval = g ? d[m] : Q(m, d);
                        if (null == e.startval || "" == e.startval) e.startval = 0;
                        e.endval = C;
                        m = 2 < b ? String(a[2]) : "0.5";
                        if (0 < m.indexOf("(") && (n = qb(m, null, !1))) {
                            var l = n[0];
                            _[484] == l.cmd && (n = Number(l.args[0]), m = Number(l.args[1]), C = Math.abs(parseFloat(C) - parseFloat(e.startval)), m = m * C / n)
                        }
                        m = parseFloat(m);
                        isNaN(m) && (m = .5);
                        e.maxruntime = m;
                        e.tweenmap = ld.getTweenfu(3 < b ? a[3] : _[73]);
                        if (4 < b)
                            if ("wait" == F(a[4])) e.blockedactions = [], K = e, H.push(e);
                            else if (C = a[4]) 0 == g && 0 < C.indexOf("[") && (C = c(C, d)), e.donecall = C;
                        5 < b && (e.updatefu = a[5]);
                        e.starttime = Ca();
                        e.process = A;
                        h(f);
                        E.push(e)
                    }
                }
            };
            k.stoptween = function() {
                var a = k.actioncaller,
                    b = arguments,
                    d = b.length,
                    e;
                for (e = 0; e < d; e++) {
                    var m = F(b[e]);
                    if (0 < m.indexOf("|")) k.stoptween.apply(k.stoptween, m.split("|"));
                    else {
                        if (a && 0 > m.indexOf(".")) {
                            if (h(a._type + "[" + a.name + "]." + m)) continue
                        } else 0 < m.indexOf("[") && (m = c(m, a)), m = m.split(_[150]).join(_[147]);
                        h(m)
                    }
                }
            };
            k.invalidatescreen = function() {
                u.haschanged = !0
            };
            k.updatescreen = function() {
                u.haschanged = !0
            };
            k.updateobject = function() {
                U && U.updateFOV && U.updateFOV(U, [Number(L.hfov), Number(L.vfov), Number(L.voffset)]);
                u.haschanged = !0
            };
            k.loadpano = function(a, b, c, d, e) {
                l.xml.scene = null;
                l.xml.view = {};
                fb.loadpano(a, b, c, d, e)
            };
            k.loadpanoscene = function(a, b, c, d, e, m) {
                l.xml.sceneNEW = b;
                l.xml.view = {};
                l._loadpanoscene_name = b;
                fb.loadpano(a, c, d, e, m)
            };
            k.loadxml = function(a, b, c, d, e) {
                l.xml.scene = null;
                l.xml.view = {};
                fb.loadxml(a, b, c, d, e)
            };
            k.fscommand = function() {};
            k.freezeview = function() {};
            k.reloadpano = function() {};
            k.addlensflare = function() {};
            k.removelensflare = function() {};
            k.SAcall = function(a) {
                var c = Q(_[11]);
                if ((a = qb(a, null, !1)) && c) {
                    var d, e;
                    e = a.length;
                    for (d = 0; d < e; d++) {
                        var m = a[d];
                        if (m) {
                            var f = m.cmd,
                                g = c.getItem(f);
                            g && 1 == ma(g.secure) ? (m = m.args, m.splice(0, 0, f), k.callaction(b(g.content, m))) : oa(2, _[486] + f + _[304])
                        }
                    }
                }
            }
        })();
        var V = {};
        (function() {
            function a(a) {
                a = _[199] + a;
                M.console ? M.console.log(a) : alert(a)
            }

            function c(a, b, c, d, e, f) {
                var g = Ja(),
                    k = g.style;
                k.position = _[0];
                "LT" == a ? (k.left = b, k.top = c) : (k.left = b, k.bottom = c);
                k.width = d;
                k.height = e;
                k.overflow = _[6];
                !1 === f && (k.webkitUserSelect = k.MozUserSelect = k.msUserSelect = k.oUserSelect = k.userSelect = "none");
                return g
            }

            function w(a) {
                if (q.fullscreen = a) M.activekrpanowindow = A.id;
                A.style.background = a ? wa(l.bgcolor, 1) : _[13];
                Na(1 == a ? _[242] : _[253])
            }

            function f(a) {
                J && (na(a), q.onResize(a), setTimeout(r, 250))
            }

            function e(a, b) {
                for (var c = a.style, d = b.length, e = 0, e = 0; e < d; e += 2) c[b[e]] = b[e + 1]
            }

            function n() {
                v(!Wb, fe);
                R.style.textDecoration = Wb ? _[135] : "none"
            }

            function h() {
                v(Wb, !fe);
                Ha.style.textDecoration = fe ? _[135] : "none"
            }

            function g(a) {
                hb = Ca()
            }

            function z(a) {
                w(!!(ba.fullscreenElement || ba.mozFullScreenElement || ba.webkitIsFullScreen || ba.webkitFullscreenElement || ba.msFullscreenElement))
            }

            function K(a) {
                if (J) {
                    a = M.innerHeight;
                    var b = ab;
                    a < b ? q.__scrollpage_yet = !0 : q.__scrollpage_yet && (q.__scrollpage_yet = !1, r());
                    if (a != b) q.onResize(null)
                }
            }

            function r() {
                var a = M.innerWidth,
                    c = M.innerHeight;
                q.__scrollpage_yet && c == ab && (q.__scrollpage_yet = !1);
                var d = screen.height - 64,
                    e = 268;
                26 <= b.crios && (d += 44, e = 300);
                (320 == a && c != d || a == screen.height && c != e) && M.scrollTo(0, 0)
            }

            function y() {
                if (8 == b.iosversion && b.ipad) {
                    var a = screen.width,
                        c = screen.height,
                        d = M.innerWidth,
                        e = M.innerHeight,
                        f = A.clientHeight;
                    if (Math.min(d, e) == Math.min(a, c) && Math.max(d, e) == Math.max(a, c) || f > e) O ^= 1, M.scrollTo(0, O), setTimeout(y, 60)
                }
            }

            function p(a, b) {
                na(a);
                var c = "none" != d.style.display ? "none" : "";
                void 0 !== b && (c = 1 == b ? "" : "none");
                d.style.display = c;
                R.style.display = Ha.style.display = l.debugmode ? "" : "none";
                G.scrollTop = G.scrollHeight
            }

            function v(a, b) {
                var c = a ? _[95] : "none";
                Wb = a;
                fe = b;
                var d, e, f, g;
                f = La.getArray();
                e = f.length;
                for (d = 0; d < e; d++)(g = f[d]) && g.sprite && (g.sprite.style.outline = c);
                c = b ? _[193] : "none";
                f = db.getArray();
                e = f.length;
                for (d = 0; d < e; d++)(g = f[d]) && g.sprite && (g.sprite.style.outline = c);
                Za = !0
            }

            function t() {
                L && (k.removeChild(L), L = null);
                var a, c = Ja();
                a = 25;
                b.androidstock && (a *= b.pixelratio);
                e(c, [_[34], _[0], "left", "50%", "top", "50%", _[26], _[54], _[51], a + "px", _[66], "none", _[39], _[5], _[312], "none"]);
                a = c.style;
                a.zIndex = 999999;
                a.opacity = .67;
                a = Ja();
                e(a, "position;relative;left;-50%;top;-25px;fontFamily;sans-serif;textShadow;#000000 1px 1px 2px;lineHeight;110%".split(";"));
                a.innerHTML = _[480] + (za && za[1] && 6 < ya(za[1], !1).length ? za[1] : _[180]) + _[435];
                c.appendChild(a);
                k.appendChild(c);
                L = c
            }
            var q = V;
            q.fullscreen = !1;
            var x = !0,
                J = !1,
                B = !1;
            q.__scrollpage_yet = !1;
            var D = null,
                A = null,
                k = null;
            q.htmltarget = null;
            q.viewerlayer = null;
            q.controllayer = null;
            q.panolayer = null;
            q.pluginlayer = null;
            q.hotspotlayer = null;
            var d = q.svglayer = null,
                G = null,
                E = null,
                R = null,
                Ha = null,
                N = null,
                T = 0,
                H = 0,
                Fb = !1,
                ea = !1;
            q.build = function(t) {
                function m(a) {
                    a && _[9] == a.type && 0 != (a.button | 0) || p(null, !1)
                }
                var C = t.target,
                    r = t.id,
                    I = ba.getElementById(C);
                if (!I) return a(_[182] + C), !1;
                for (var C = null, v = r, u = 1;;)
                    if (C = ba.getElementById(r))
                        if (_[282] == v) u++, r = v + u;
                        else return a(_[176] + r), !1;
                else break;
                C = Ja();
                C.id = r;
                C.style.position = _[136];
                C.style.overflow = _[6];
                C.style.lineHeight = _[58];
                C.style.fontWeight = _[58];
                C.style.fontStyle = _[58];
                C.tabIndex = -1;
                C.style.outline = 0;
                r = _[38];
                t.bgcolor && (r = t.bgcolor, l.bgcolor = parseInt(r.slice(1), 16));
                v = F(t.wmode);
                if (_[13] == v || _[154] == v) r = null;
                null != r && (C.style.background = r);
                I.appendChild(C);
                A = C;
                !0 === t.focus && (M.activekrpanowindow = A.id, A.focus());
                q.htmltarget = I;
                q.viewerlayer = C;
                k = c("LT", 0, 0, "100%", "100%", !1);
                e(k, "msTouchAction none touchAction none msContentZooming none contentZooming none -webkit-tap-highlight-color transparent".split(" "));
                q.controllayer = k;
                I = c("LT", 0, 0, "100%", "100%");
                q.panolayer = I;
                e(I, [_[295], "none"]);
                t = c("LT", 0, 0, "100%", "100%", !1);
                0 == b.ie && 0 == b.firefox && e(t, [je, _[121]]);
                b.android && b.firefox && wc && (r = c("LT", 0, 0, "1px", "1px"), r.style.background = _[249], r.style.pointerEvents = "none", r.style.zIndex = 999999999, r.style[vb] = _[27], t.appendChild(r));
                var r = b.androidstock ? b.pixelratio : 1,
                    v = 156 * r,
                    u = (b.mobile ? 8 : 13) * r,
                    w = b.androidstock || b.android && b.chrome ? 6 : 8;
                d = c("LB", 0, 0, "100%", v + "px", !0);
                d.style.display = "none";
                !0 !== b.opera && wc && (2 > wb && (d.style[vb] = _[27]), b.ios && 0 == b.simulator || b.android && b.chrome) && (d.style[vb] = _[27]);
                d.style.zIndex = 999999999;
                var x = c("LT", 0, 0, "100%", "100%", !0);
                x.style.opacity = .67;
                b.android && b.opera && (x.style.borderTop = _[191]);
                e(x, [_[256], _[38], jd, _[471] + w + _[397], _[133], w + "px", _[509], .67]);
                G = ba.createElement("pre");
                w = null;
                b.mac && (w = _[318] + (M.chrome ? "1px" : "0"));
                b.realDesktop ? (G.style.fontFamily = _[30], G.style.fontSize = "11px", w && (G.style.fontSize = "13px", G.style.textShadow = w)) : (G.style.fontFamily = _[20], G.style.fontSize = u + "px");
                e(G, [_[34], _[0], "left", "5px", "top", "0px", _[64], "left", _[355], 0, _[327], b.realDesktop ? "16px" : 0, _[406], 0, _[310], 0, _[126], "none", _[90], 0, _[133], (b.realDesktop ? 10 : 8) + "px", _[63], "100%", _[18], v - 10 + "px", _[459], "auto", _[229], "none", _[80], "block", _[418], "left", _[404], _[456], _[66], "none", _[26], _[54], _[39], "text"]);
                E = Ja();
                w && (E.style.textShadow = w);
                e(E, [_[34], _[0], _[3], 0, "top", "10px", _[53], "0 4px", _[18], "30px", _[68], "none", _[69], "none", _[75], "none", _[39], _[10], _[41], _[13], _[76], b.realDesktop ? _[30] : _[20], _[51], (b.realDesktop ? 10 : 9 * r | 0) + "px", _[26], _[54]]);
                E.innerHTML = "CLOSE";
                ca(E, _[47], na, !0);
                ca(E, _[49], na, !0);
                ca(E, _[52], m, !0);
                ca(E, _[2], m, !0);
                d.appendChild(x);
                d.appendChild(G);
                d.appendChild(E);
                R = Ja();
                w && (R.style.textShadow = w);
                e(R, [_[34], _[0], _[3], "0px", _[4], "0px", _[53], _[273], _[18], "12px", _[68], "none", _[69], "none", _[75], "none", _[39], _[10], _[41], _[13], _[76], b.realDesktop ? _[30] : _[20], _[51], (b.realDesktop ? 10 : 9 * r | 0) + "px", _[26], _[146], _[80], "none"]);
                R.innerHTML = _[573];
                ca(R, _[47], na, !0);
                ca(R, _[49], na, !0);
                ca(R, _[52], n, !0);
                ca(R, _[2], n, !0);
                d.appendChild(R);
                Ha = Ja();
                w && (Ha.style.textShadow = w);
                e(Ha, [_[34], _[0], _[3], "0px", _[4], "18px", _[53], _[271], _[18], "12px", _[68], "none", _[69], "none", _[75], "none", _[39], _[10], _[41], _[13], _[76], b.realDesktop ? _[30] : _[20], _[51], (b.realDesktop ? 10 : 9 * r | 0) + "px", _[26], _[146], _[80], "none"]);
                Ha.innerHTML = _[451];
                ca(Ha, _[47], na, !0);
                ca(Ha, _[49], na, !0);
                ca(Ha, _[52], h, !0);
                ca(Ha, _[2], h, !0);
                d.appendChild(Ha);
                C.appendChild(k);
                k.appendChild(I);
                k.appendChild(t);
                b.ios && (I = Ja(), I.style.position = _[0], I.style.webkitTransformStyle = _[121], t.appendChild(I));
                C.appendChild(d);
                q.pluginlayer = t;
                q.hotspotlayer = t;
                b.fullscreensupport && ca(ba, b.browser.events.fullscreenchange, z);
                ca(M, _[50], g, !1);
                ca(M, _[449], g, !1);
                ca(ba, _[43], g, !1);
                N = [C.style.width, C.style.height];
                q.onResize(null);
                ca(M, _[155], q.onResize, !1);
                b.iphone && b.safari && ca(M, _[151], K, !1);
                ca(M, _[103], f, !1);
                return !0
            };
            q.focus = function(a) {
                M.activekrpanowindow = A.id;
                b.desktop && ba.activeElement !== A && A.focus()
            };
            q.setFullscreen = function(a) {
                if (b.fullscreensupport)
                    if (a) A[b.browser.events.requestfullscreen]();
                    else try {
                        ba.exitFullscreen ? ba.exitFullscreen() : ba.mozCancelFullScreen ? ba.mozCancelFullScreen() : ba.webkitCancelFullScreen ? ba.webkitCancelFullScreen() : ba.webkitExitFullscreen ? ba.webkitExitFullscreen() : ba.msExitFullscreen && ba.msExitFullscreen()
                    } catch (c) {} else {
                        var d = ba.body,
                            e = d.style,
                            f = A.style;
                        if (a) q.fsbkup = [e.padding, e.margin, e.overflow, d.scrollTop, d.scrollLeft, M.pageYOffset], e.padding = "0 0", e.margin = "0 0", e.overflow = _[6], d.scrollTop = "0", d.scrollLeft = "0", d.appendChild(A), f.position = _[0], f.left = 0, f.top = 0, f.width = "100%", f.height = "100%", gb.domUpdate(), M.scrollTo(0, 0), w(!0);
                        else if (a = q.fsbkup) q.htmltarget.appendChild(A), e.padding = a[0], e.margin = a[1], e.overflow = a[2], d.scrollTop = a[3], d.scrollLeft = a[4], f.position = _[136], gb.domUpdate(), M.scrollTo(0, a[5]), q.fsbkup = null, w(!1)
                    }
            };
            var O = 0;
            q.onResize = function(a, b) {
                Fb = b;
                ea = !0
            };
            q.resizeCheck = function() {
                var a = !1,
                    c = A,
                    e = c.clientWidth,
                    c = c.clientHeight;
                if (e != T || c != H || xb && xb.haschanged) T = e, H = c, a = !0;
                ea && (a = !0, ea = !1);
                255 == (Ya & 511) && 0 == (Xa & 1) && t();
                if (a) {
                    var f = A,
                        g = "100%",
                        e = "100%";
                    null == N && (N = [f.style.width, f.style.height]);
                    N && (g = N[0], e = N[1], "" == g && (g = "100%"), "" == e && (e = "100%"), N = null);
                    if (c = zc.so) c.width && (g = c.width), c.height && (e = c.height);
                    q.fullscreen && (g = e = "100%");
                    var c = f.parentNode,
                        n = 0,
                        h = f;
                    do
                        if (n = h.offsetHeight, b.ie && q.fullscreen && 20 > n && (n = 0), 1 >= n) {
                            if (h = h.parentNode, null == h) {
                                n = M.innerHeight;
                                break
                            }
                        } else break;
                    while (1);
                    for (var l = 0, h = f; h && "body" != F(h.nodeName);) l++, h = h.parentNode;
                    var h = c ? c.offsetHeight : M.innerHeight,
                        p = f.clientWidth,
                        c = !1;
                    0 == f.clientHeight && (c = !0);
                    var E = g,
                        f = e;
                    0 < String(g).indexOf("%") ? g = parseFloat(g) * p / 100 : (g = parseFloat(g), E = g + "px");
                    0 < String(e).indexOf("%") ? e = parseFloat(e) * n / 100 : (e = parseFloat(e), f = e + "px");
                    1 > e && (e = 100);
                    var n = screen.width,
                        p = screen.height,
                        v = M.innerWidth,
                        u = M.innerHeight;
                    b.ios && 2 >= l && 0 == q.fullscreen && (26 <= b.crios && h > u && (u = e = h), y(), 7 <= b.iosversion && e > u && (e = u, J = B = !0, setTimeout(r, 10)));
                    x && (x = !1, b.iphone ? (320 == v && u >= p - 124 ? u = p - 124 : v == p && 208 <= u && (u = 208), 2 >= l && (v == g && u && (320 == g && e == p - 124 || g == p && (208 == e || 320 == e)) && (J = !0), 320 == g && u == p - 124 && (B = J = !0), 26 <= b.crios && (320 == g || g == p) && (J = !0))) : b.ipad && 28 <= b.crios && 2 >= l && (g > e != n > p && (l = n, n = p, p = l), g == n && e == p - 20 && (B = J = !0)));
                    J && (B ? (g = v, e = u, 9 == (b.iosversion | 0) && g > e && (e += 1)) : 320 == M.innerWidth ? (g = 320, e = p - 64, b.crios && (e += 44)) : (g = p, e = 320 == M.innerHeight ? 320 : 268, 26 <= b.crios && (e = 300)), E = g + "px", f = e + "px");
                    b.getViewportScale();
                    l = E;
                    gb && gb.focusLoss();
                    J && null == D && (D = setInterval(r, 4E3), setTimeout(r, 250));
                    h = !1;
                    if (Gb != g || ab != e || Fb) h = !0, Fb = !1, Gb = g, ab = e;
                    A.style.width = l;
                    A.style.height = f;
                    T = Gb;
                    H = ab;
                    Ta && (Ta._pxw = Ta.pixelwidth = Ta.imagewidth = Gb / aa, Ta._pxh = Ta.pixelheight = Ta.imageheight = ab / aa);
                    rb && (rb._pxw = rb.pixelwidth = rb.imagewidth = Gb / aa, rb._pxh = rb.pixelheight = rb.imageheight = ab / aa);
                    h && (xb && xb.calc(Gb, ab), Na(_[79]), h = !1);
                    xb ? (h |= xb.calc(Gb, ab), k.style.left = xb.pixelx * aa + "px", k.style.top = xb.pixely * aa + "px", k.style.width = Sa + "px", k.style.height = Da + "px", g = Sa, e = Da) : (Sa = Gb, Da = ab);
                    Ac = Math.max(4 * e / 3, g);
                    b.desktop && (l = M.devicePixelRatio, isNaN(l) || (b.pixelratio = l, b.fractionalscaling = 0 != l % 1));
                    cb.size(g, e);
                    h && Na(_[79]);
                    "" == d.style.display && (G.scrollTop = G.scrollHeight);
                    fb.updateview(!1, !0);
                    ea = c
                }
                return a
            };
            var Z = "";
            q.log = function(a) {
                if ("cls" == a) G.innerHTML = "";
                else if ("d" == a) t();
                else {
                    var c = 4 > b.firefoxversion ? 4096 : 1E4,
                        d = a.slice(0, 6).charCodeAt(0);
                    73 != d ? (c = _[211] + (68 == d ? _[574] : 87 == d ? _[576] : _[577]) + ";'>" + a + _[453], Z += c + "\n", G.innerHTML += "\n" + c) : (Z += a + "\n", Z.length > c ? (Z = Z.slice(-c / 2, -1), G.innerHTML = Z) : G.lastChild ? G.lastChild.nodeValue += "\n" + a : G.innerHTML += a);
                    G.scrollTop = G.scrollHeight;
                    zc.so.vars && ma(zc.so.vars.consolelog) && (c = M.console) && c.log && (b.firefox || b.chrome ? c.log("%c" + a, 68 == d ? _[289] : 69 == d ? _[190] : 87 == d ? _[290] : _[291]) : c.log(a))
                }
            };
            q.showlog = function(a) {
                p(null, a)
            };
            var P = 0;
            q.handleKeydown = function(a) {
                l[bc[1]] ? 79 == a ? p() : "none" != d.style.display && (68 == a ? (l.debugmode = !l.debugmode, p(null, !0), 0 == l.debugmode && (R.style.textDecoration = Ha.style.textDecoration = "none", ee = !1, v(!1, !1))) : l.debugmode && (72 == a ? h() : 76 == a ? n() : 80 == a ? (ee = !ee, Za = !0) : 83 == a ? (la.stereo = !la.stereo, Za = !0) : 65 == a ? (Ab.enabled = !Ab.enabled, oa(0, (Ab.enabled ? "en" : "dis") + _[265]), Za = !0) : 67 == a ? ha.mousetype = _[17] == ha.mousetype ? _[578] : _[17] : 85 == a && (oa(0, _[212]), u.maxpixelzoom = Number.NaN, u.fovmin = 0, u.fovmax = 179, u.limitview = "off", Za = !0))) : 0 != P || 220 != a && 160 != a ? 1 == P && 73 == a ? P++ : 2 == P && 68 == a ? P++ : 3 == P && 75 == a ? P++ : 4 == P && 70 == a ? P++ : 5 == P && 65 == a ? l[bc[1]] = !0 : P = 0 : P++
            };
            q.getMousePos = function(a, b) {
                var c = {},
                    d = b ? b : k,
                    e = d.getBoundingClientRect();
                c.x = Math.round(a.clientX - e.left - d.clientLeft + d.scrollLeft);
                c.y = Math.round(a.clientY - e.top - d.clientTop + d.scrollTop);
                return c
            };
            q.remove = function() {
                null != D && (clearInterval(D), D = null);
                try {
                    ka(M, _[155], q.onResize, !1), b.iphone && b.safari && ka(M, _[151], K, !1), ka(M, _[103], f, !1), b.fullscreensupport && ka(ba, b.browser.events.fullscreenchange, z), q.htmltarget.removeChild(A), q.htmltarget = null, q.viewerlayer = null, q.controllayer = null, q.panolayer = null, q.pluginlayer = null, k = A = E = G = d = q.hotspotlayer = null
                } catch (a) {}
            };
            var L = null
        })();
        var gb = {};
        (function() {
            function a(a) {
                var b = a.pointerType;
                if (4 != b && _[19] != b) {
                    a = a.changedTouches ? a.changedTouches : [a];
                    var b = a.length,
                        c, d, e;
                    for (c = 0; c < b; c++)
                        if (d = a[c], e = d.pointerId ? d.pointerId : d.identifier, void 0 !== e) {
                            d = C(d);
                            d = {
                                id: e,
                                lx: d.x / aa,
                                ly: d.y / aa
                            };
                            var m, f;
                            f = Ia.length;
                            for (m = 0; m < f; m++)
                                if (Ia[m].id == e) {
                                    Ia[m] = d;
                                    return
                                }
                            Ia.push(d)
                        }
                }
            }

            function c(a) {
                var b = a.pointerType;
                if (4 != b && _[19] != b) {
                    a = a.changedTouches ? a.changedTouches : [a];
                    var b = a.length,
                        c, d;
                    for (c = 0; c < b; c++)
                        if (d = a[c], d = d.pointerId ? d.pointerId : d.identifier, void 0 !== d) {
                            var e, m;
                            m = Ia.length;
                            for (e = 0; e < m; e++)
                                if (Ia[e].id == d) {
                                    Ia.splice(e, 1);
                                    break
                                }
                        }
                }
            }

            function w() {
                var a = F(ha.usercontrol);
                return (_[19] == a || "all" == a) && !X.isblocked()
            }

            function f(a) {
                return a && (a = a.pointerType, 4 == a || _[19] == a) ? !0 : !1
            }

            function e(a, b, c, d) {
                for (var e = Ya; 0 < Va.length && !(c - Va[0].t <= Pc) && !(1 >= e - Va[0].f);) Va.shift();
                e = Va.length - 1;
                0 <= e && a == Va[e].x && b == Va[e].y ? Va[e].t = c : Va.push({
                    x: a,
                    y: b,
                    t: c,
                    f: d
                })
            }

            function n(a, b, c, d, e) {
                e && (c = .5 * (c - a), d = .5 * (d - b), b = .5 * Sa, e = .5 * Da + u.r_yoff, a = b - c, c = b + c, b = e - d, d = e + d);
                b = u.inverseProject(a, b);
                e = u.inverseProject(c, d);
                d = (Math.atan2(e.z, e.x) - Math.atan2(b.z, b.x)) / Y;
                b = -(Math.atan2(b.y, Math.sqrt(b.x * b.x + b.z * b.z)) - Math.atan2(e.y, Math.sqrt(e.x * e.x + e.z * e.z))) / Y; - 180 > d ? d += 360 : 180 < d && (d -= 360);
                if (c < a && 0 > d || c > a && 0 < d) d = -d;
                return {
                    h: d,
                    v: b
                }
            }

            function h(a, b, c, d) {
                w() ? (a = n(a, b, c, d, ha.dragrelative), Ba = !1, ga = a.h, xa = a.v, K.vinvert && (ga *= -1), a = u.hlookat + ga, c = u.vlookat + xa, kb += ga, ma += xa, b = u._limits, ha.bouncinglimits && b && (360 > b[0] && (a < b[1] ? ($a = !0, a = .5 * kb + .5 * b[1]) : a > b[2] && ($a = !0, a = .5 * kb + .5 * b[2])), c < b[4] ? ($a = !0, c = -(ma - b[4]), d = Math.min(c / 720, 1), d = -Math.min(c - 120 * d + 200 * d * d - 3E3 * d * d * d + 3E3 * d * d * d * d, 163), c = .5 * (b[4] + d) + .5 * b[4]) : c > b[5] && ($a = !0, c = ma - b[5], d = Math.min(c / 720, 1), d = Math.min(c - 120 * d + 200 * d * d - 3E3 * d * d * d + 3E3 * d * d * d * d, 163), c = .5 * (b[5] + d) + .5 * b[5])), u.hlookat = a, u.vlookat = c, fb.updateview(), u.haschanged = !0) : xa = ga = 0
            }

            function g(a) {
                (ba.hidden || ba.webkitHidden || ba.mozHidden || ba.msHidden) && z(a)
            }

            function z(a) {
                a ? (_[29] == a.type ? V.controllayer.contains(a.target) && a.preventDefault() : J(), _[50] == a.type && !1 === a.persisted && (yd = !0), K.down && G(a)) : J();
                for (var b in ra) 1 == ra[b] && (l.keycode = b, Na(_[144]), ra[b] = !1);
                l.keycode = 0;
                ua()
            }

            function ua() {
                l.hlookat_moveforce = l.vlookat_moveforce = l.fov_moveforce = 0;
                ta = sa = Ba = !1;
                ob = La = Ra = Ua = ga = xa = Za = ya = za = Oa = 0
            }

            function r(a) {
                var c = 0;
                if (1 != ha.disablewheel && (na(a), hb = Ca(), w())) {
                    a.wheelDelta ? c = a.wheelDelta / -120 : a.detail && (c = a.detail, 0 == b.mac && (c /= 3));
                    var d = c * ha.mousefovchange;
                    ha.zoomtocursor ? (db = !0, t(a), Ka = K.x, Aa = K.y, 0 < d && 0 == ha.zoomoutcursor && (db = !1)) : db = !1;
                    ta = !0;
                    Ea = 0;
                    ob += .001 * d;
                    l.wheeldelta_raw = -c;
                    l.wheeldelta = 3 * -c;
                    A(_[71])
                }
            }

            function y(a) {
                var c = V.viewerlayer;
                ba.activeElement == c != 0 && M.activekrpanowindow == c.id && (hb = Ca(), c = a.keyCode, 0 == (a.altKey || a.ctrlKey || a.shiftKey || 32 > c || 111 < c && 124 > c) && na(a), l.keycode = c, X.checkInterrupt(), 0 != X.isblocked() || !0 === ra[c] && !ha.keydownrepeat || (ra[c] = !0, Na(_[425])), V.handleKeydown(c), v(c, 1), 27 == c && (J(), V.fullscreen && (V.fsbkup || b.opera) && V.setFullscreen(!1)))
            }

            function p(a) {
                var b = V.viewerlayer;
                ba.activeElement == b != 0 && M.activekrpanowindow == b.id && (hb = Ca(), a = a.keyCode, l.keycode = a, 1 == ra[a] && (ra[a] = !1, Na(_[144])), v(a, 0))
            }

            function v(a, b) {
                if (0 == b || !X.isblocked()) {
                    var c = F(ha.usercontrol);
                    if ("all" == c || "keyb" == c) a = "," + a + ",", 0 <= ("," + ha.keycodesin + ",").indexOf(a) ? l.fov_moveforce = -b : 0 <= ("," + ha.keycodesout + ",").indexOf(a) ? l.fov_moveforce = +b : 0 <= ("," + ha.keycodesleft + ",").indexOf(a) ? l.hlookat_moveforce = -b : 0 <= ("," + ha.keycodesright + ",").indexOf(a) ? l.hlookat_moveforce = +b : 0 <= ("," + ha.keycodesup + ",").indexOf(a) ? l.vlookat_moveforce = ha.keybinvert ? +b : -b : 0 <= ("," + ha.keycodesdown + ",").indexOf(a) && (l.vlookat_moveforce = ha.keybinvert ? -b : +b)
                }
            }

            function t(a) {
                a = C(a);
                K.x = a.x / aa;
                K.y = a.y / aa;
                K.moved = !0
            }

            function q(a) {
                var c, d, e = a.changedTouches ? a.changedTouches : [a];
                d = e.length;
                var m = F(a.type),
                    g = 0 <= m.indexOf("start") || 0 <= m.indexOf("down"); - 99 != pa && g && (Xb = !0);
                for (c = 0; c < d; c++) {
                    var m = e[c],
                        k = m.pointerId ? m.pointerId : m.identifier; - 99 == pa && g && (pa = k);
                    if (pa == k) {
                        d = C(m);
                        K.x = d.x / aa;
                        K.y = d.y / aa;
                        K.moved = !0;
                        0 == (Xa & 16) && (0 == b.realDesktop || 10 <= b.ieversion && !f(a)) && K.x > Gb / aa - 22 && K.y > ab / aa - 32 && a.type == S.touchstart && (nb = m.pageY, ca(I, S.touchend, x, !0));
                        break
                    }
                }
            }

            function x(a) {
                a = a.changedTouches ? a.changedTouches : [a];
                ka(I, S.touchend, x, !0); - 120 > a[0].pageY - nb && V.showlog(!0)
            }

            function J() {
                if (Ga) {
                    try {
                        I.removeChild(Ga), I.removeChild(eb)
                    } catch (a) {}
                    eb = Ga = null
                }
            }

            function B(a) {
                if (Ga) J();
                else {
                    na(a);
                    a.stopPropagation();
                    var c = C(a.changedTouches ? a.changedTouches[0] : a);
                    K.downx = K.x = c.x / aa;
                    K.downy = K.y = c.y / aa;
                    Ga = gf(c.x, c.y, J, 0 <= F(a.type).indexOf("touch"));
                    null != Ga && (eb = Ja(), a = eb.style, a.position = _[0], b.androidstock || (a.zIndex = 99999999998, a[vb] = _[27]), a.width = "100%", a.height = "100%", I.appendChild(eb), I.appendChild(Ga))
                }
            }

            function D(a, c) {
                var e = a.timeStamp | 0;
                500 < e && 500 > e - Kb ? Kb = 0 : (V.focus(1), na(a), (e = 0 == (a.button | 0)) && J(), X.checkInterrupt(), !X.isblocked() && e && (1 != c ? (ca(M, _[8], k, !0), ca(M, _[2], d, !0), b.topAccess && ca(top, _[2], G, !0)) : ca(b.topAccess ? top : M, S.touchend, H, !0), e = C(a), fa = e.x, Sb = e.y, oa = a.timeStamp, kb = u.hlookat, ma = u.vlookat, va = 0, K.down = !0, K.up = !1, K.moved = !1, K.downx = K.x = e.x / aa, K.downy = K.y = e.y / aa, 1 == A(_[46]) ? (ka(M, _[8], k, !0), K.down = !1) : md.update()))
            }

            function A(a) {
                var b = _[37] == a,
                    c = !1;
                if (_[46] == a || _[32] == a || b || _[71] == a) c = cb.hittesthotspots(a);
                0 == c && (b ? (Na(_[32]), Na(_[37])) : Na(a));
                return c
            }

            function k(a) {
                na(a);
                var b = C(a);
                K.x = b.x / aa;
                K.y = b.y / aa;
                K.moved = !0;
                if (_[17] == F(ha.mousetype)) {
                    sa = !0;
                    var c = n(fa, Sb, b.x, b.y, ha.movetorelative).h;
                    K.vinvert && (c *= -1);
                    va += c
                } else h(fa, Sb, b.x, b.y);
                fa = b.x;
                Sb = b.y;
                oa = a.timeStamp;
                e(fa, Sb, oa, Ya);
                (0 === a.buttons || void 0 === a.buttons && 0 === a.which) && d(a, !0)
            }

            function d(a, c) {
                hb = Ca();
                na(a);
                ka(M, _[8], k, !0);
                ka(M, _[2], d, !0);
                b.topAccess && ka(top, _[2], G, !0);
                var m = C(a);
                fa = m.x;
                Sb = m.y;
                oa = a.timeStamp;
                e(fa, Sb, oa, Ya);
                if (ha.drag_oldmode) Ba = !0, 1 >= Va.length && (Ba = !1, xa = ga = 0);
                else if (_[17] != F(ha.mousetype))
                    if (w() && 1 < Va.length && 0 == ia) {
                        var f = Va[0],
                            g = Va[Va.length - 1],
                            m = (g.t - f.t) * ha.draginertia;
                        0 < m && (f = n(f.x, f.y, g.x, g.y, ha.dragrelative), Ba = !0, ga = f.h / m, xa = f.v / m)
                    } else Ba = !1, xa = ga = 0;
                K.down = !1;
                K.dragging = !1;
                md.update();
                0 == K.up && (K.up = !0, m = _[32], !0 !== c && (0 == K.moved || 5 > Math.abs(K.x - K.downx) && 5 > Math.abs(K.y - K.downy)) && (m = _[37]), A(m))
            }

            function G(a) {
                d(a, !0)
            }

            function E(a) {
                1 == l.control.preventTouchEvents && na(a)
            }

            function R(a) {
                ub && (sb++, 2 == sb && (Pa = 1), wa.addPointer(a.pointerId), I.setPointerCapture ? I.setPointerCapture(a.pointerId) : I.msSetPointerCapture && I.msSetPointerCapture(a.pointerId))
            }

            function Ha(a) {
                sb--;
                0 > sb && (sb = 0);
                return 2 > sb && Ma ? (Z(a), !0) : !1
            }

            function N(c) {
                Kb = c.timeStamp | 0;
                Pc = b.ios ? 100 : 49 > he ? 200 : 100;
                a(c);
                if (qa) {
                    if (0 == l.control.preventTouchEvents) return;
                    if (f(c)) {
                        c.currentPoint && c.currentPoint.properties && 0 == c.currentPoint.properties.isLeftButtonPressed && (c.button = 0);
                        Kb = 0;
                        D(c, !0);
                        return
                    }
                    R(c)
                }
                M.activekrpanowindow = V.viewerlayer.id;
                hb = Ca();
                0 == V.__scrollpage_yet && E(c);
                J();
                if (!(Ma || 0 == U && 1 < Ia.length || (X.checkInterrupt(), X.isblocked()))) {
                    var d = c.changedTouches ? c.changedTouches[0] : c,
                        e = C(d);
                    lc = d.pointerId ? d.pointerId : d.identifier;
                    fa = e.x;
                    Sb = e.y;
                    oa = c.timeStamp;
                    Va = [];
                    kb = u.hlookat;
                    ma = u.vlookat;
                    va = 0;
                    K.down = !0;
                    K.dragging = !0;
                    K.up = !1;
                    K.moved = !1;
                    K.downx = K.x = e.x / aa;
                    K.downy = K.y = e.y / aa;
                    m = {
                        t: Kb
                    };
                    ia = 1 == A(_[46]) ? !0 : !1
                }
            }

            function T(a) {
                var b = a.pointerType;
                if (4 != b && _[19] != b) {
                    var b = a.changedTouches ? a.changedTouches : [a],
                        c = b.length,
                        d, g, l;
                    for (d = 0; d < c; d++)
                        if (g = b[d], l = g.pointerId ? g.pointerId : g.identifier, void 0 !== l) {
                            var p, q;
                            q = Ia.length;
                            for (p = 0; p < q; p++)
                                if (Ia[p].id == l) {
                                    g = C(g);
                                    l = g.y / aa;
                                    p = Ia[p];
                                    p.lx = g.x / aa;
                                    p.ly = l;
                                    break
                                }
                        }
                }
                if (qa) {
                    if (f(a)) {
                        K.down && k(a);
                        return
                    }
                    if (1 < sb) return
                }
                if ((b = w()) && 0 == U && 1 < Ia.length) {
                    var r;
                    q = g = Ia[0].lx;
                    r = l = Ia[0].ly;
                    p = Ia.length;
                    for (d = 1; d < p; d++) b = Ia[d].lx, c = Ia[d].ly, b < g && (g = b), b > q && (q = b), c < l && (l = c), c > r && (r = c);
                    b = q - g;
                    c = r - l;
                    b = Math.sqrt(b * b + c * c);
                    1 > b && (b = 1);
                    0 == xc ? (xc = !0, zd = b, ea(a)) : O(a, b / zd)
                } else hb = Ca(), 0 == V.__scrollpage_yet && E(a), Ma || 0 == b || (b = a.changedTouches ? a.changedTouches[0] : a, lc == (b.pointerId ? b.pointerId : b.identifier) && (b = C(b), 0 == ia && (_[17] == F(ha.touchtype) ? (sa = !0, c = n(fa, Sb, b.x, b.y, ha.movetorelative).h, -180 > c ? c = 360 + c : 180 < c && (c = -360 + c), va += c) : h(fa, Sb, b.x, b.y)), fa = b.x, Sb = b.y, oa = a.timeStamp, e(fa, Sb, oa, Ya), -99 == pa && (K.x = b.x / aa, K.y = b.y / aa), m && 16 < K.dd && (m = null), na(a)))
            }

            function H(a) {
                c(a);
                pa = -99;
                Xb = !1;
                if (qa) {
                    ka(b.topAccess ? top : M, S.touchend, H, !0);
                    if (Ha(a)) return;
                    if (f(a)) {
                        d(a);
                        return
                    }
                }
                xc && (Z(a), xc = !1);
                0 == V.__scrollpage_yet && E(a);
                if (Ma) lc = -99;
                else {
                    var g = a.changedTouches ? a.changedTouches[0] : a;
                    if (lc == (g.pointerId ? g.pointerId : g.identifier)) {
                        lc = -99;
                        g = C(g);
                        K.x = g.x / aa;
                        K.y = g.y / aa;
                        fa = g.x;
                        Sb = g.y;
                        oa = a.timeStamp;
                        e(fa, Sb, oa, Ya);
                        if (_[17] != F(ha.touchtype))
                            if (w() && 1 < Va.length && 0 == ia) {
                                var k = Va[0],
                                    h = Va[Va.length - 1],
                                    g = (h.t - k.t) * ha.draginertia;
                                0 < g && (k = n(k.x, k.y, h.x, h.y, ha.dragrelative), Ba = !0, ga = k.h / g, xa = k.v / g)
                            } else Ba = !1, xa = ga = 0;
                        K.down = !1;
                        K.dragging = !1;
                        if (0 == K.up) {
                            K.up = !0;
                            m && 0 == ia && (g = 52800 / (Math.min(Math.max(la.currentfps, 10), 60) + 35), 32 > K.dd && (a.timeStamp | 0) - m.t > g && B(a));
                            a = _[32];
                            if (0 == K.moved || 5 > Math.abs(K.x - K.downx) && 5 > Math.abs(K.y - K.downy)) a = _[37];
                            A(a)
                        }
                        m = null;
                        ia = !1
                    }
                }
            }

            function L(a) {
                c(a);
                xc = !1;
                pa = lc = -99;
                Ma = !1;
                sb = 0;
                ia = !1;
                m = null
            }

            function ea(a) {
                0 == l.control.preventTouchEvents || ub && 2 > sb || (na(a), Ma = !0, m = null, da = u.fov, lc = -99, K.down = !1, K.dragging = !1)
            }

            function O(a, b) {
                if (0 != l.control.preventTouchEvents) {
                    var c = void 0 !== b ? b : a.scale;
                    if (ub) {
                        if (2 > sb) return;
                        0 == Ma && ea(a);
                        c = Pa *= c
                    }
                    na(a);
                    hb = Ca();
                    if (w()) {
                        xa = ga = 0;
                        var d = 2 / Y,
                            e = 1 / Math.tan(da / d),
                            d = Math.atan(1 / (e * c)) * d,
                            e = d > u.fov ? -3 : 3;
                        l.wheeldelta = e;
                        l.wheeldelta_raw = e / 3;
                        l.wheeldelta_touchscale = c;
                        0 == ha.touchzoom && (d = u.fov);
                        ha.bouncinglimits && (d < u.fovmin ? (d = P(d), c = P(u.fovmin), ob = .5 * -(d - c), ta = !0, Ea = 1, d += ob, ob = 1E-9, d = Q(d)) : d > u.fovmax && (d = P(d), c = P(u.fovmax), ob = .75 * -(d - c), ta = !0, Ea = 1, d += ob, ob = 1E-9, d = Q(d)));
                        if (ha.zoomtocursor && (0 < e || 1 == ha.zoomoutcursor)) {
                            if (e = Ia.length, 0 < e) {
                                db = !0;
                                for (c = Aa = Ka = 0; c < e; c++) {
                                    var m = Ia[c];
                                    Ka += m.lx;
                                    Aa += m.ly
                                }
                                Ka /= e;
                                Aa /= e;
                                u.updateView();
                                e = u.screentosphere(Ka, Aa);
                                u.fov = d;
                                u.updateView();
                                c = u.screentosphere(Ka, Aa);
                                d = u.hlookat + (e.x - c.x);
                                e = u.vlookat + (e.y - c.y);
                                if (c = u._limits) 360 > c[0] && (d < c[1] ? d = c[1] : d > c[2] && (d = c[2])), e < c[4] ? e = c[4] : e > c[5] && (e = c[5]);
                                u.hlookat = d;
                                u.vlookat = e
                            }
                        } else u.fov = d, u.updateView();
                        A(_[71]);
                        u.haschanged = !0
                    }
                }
            }

            function Z(a) {
                0 != l.control.preventTouchEvents && (Ma && (Ma = !1), Xb = !1, Ia = [], na(a))
            }

            function P(a) {
                return Ta * Math.log(1 / Math.tan(.5 * a * Y))
            }

            function Q(a) {
                return 2 * Math.atan(1 / Math.exp(a / Ta)) / Y
            }
            var W = gb;
            W.mouse = !1;
            W.touch = !1;
            var m = null,
                C = null,
                S = null,
                I = null,
                ra = [],
                Ma = !1,
                nb = 0,
                U = !1,
                xc = !1,
                zd = 1,
                da = 90,
                lc = -99,
                kb = 0,
                ma = 0,
                fa = 0,
                Sb = 0,
                oa = 0,
                Va = [],
                pa = -99,
                Xb = !1,
                Pc = 100,
                ia = !1,
                Ia = [],
                qa = !1,
                ub = !1,
                wa = null,
                sb = 0,
                Pa = 1,
                Ba = !1,
                ga = 0,
                xa = 0,
                sa = !1,
                Ra = 0,
                Ua = 0,
                La = 0,
                va = 0,
                ta = !1,
                ob = 0,
                Ea = 0,
                db = !1,
                Ka = 0,
                Aa = 0,
                Za = 0,
                ya = 0,
                $a = !1,
                za = 0,
                Oa = 0,
                Ga = null,
                eb = null;
            W.registerControls = function(a) {
                I = a;
                S = b.browser.events;
                C = V.getMousePos;
                b.ie && (ub = (qa = bb.msPointerEnabled || bb.pointerEnabled) && (1 < bb.msMaxTouchPoints || 1 < bb.maxTouchPoints));
                U = ub || 0 == b.simulator && b.ios || void 0 !== ba.documentElement.ongesturestart;
                if (b.chrome || b.android) U = !1;
                a = !(0 == b.simulator && b.ios || b.android || 10 <= b.ieversion && b.touchdeviceNS);
                var c = b.touchdeviceNS;
                c && (b.mobile || b.tablet) && 0 == b.simulator && 0 == b.realDesktop && (a = !1);
                W.mouse = a;
                W.touch = c;
                S.mouse = a;
                S.touch = c;
                ca(ba, _[148], y, !1);
                ca(ba, "keyup", p, !1);
                ca(b.topAccess ? top : M, _[29], z, !0);
                ca(b.topAccess ? top : M, _[50], z, !0);
                ca(ba, _[43], g);
                ca(ba, _[97], g);
                ca(ba, _[99], g);
                ca(ba, _[102], g);
                if (a || qa) ca(I, _[113], r, !1), ca(I, _[128], r, !1);
                (a || qa) && ca(M, _[8], t, !0);
                a && ca(I, _[9], D, !1);
                (a && b.realDesktop || b.ie) && ca(I, _[29], B, !0);
                c && (ca(I, S.touchstart, q, !0), ca(I, S.touchmove, q, !0), ca(I, S.touchstart, N, !1), ca(I, S.touchmove, T, !0), ca(I, S.touchend, H, !0), ca(I, S.touchcancel, L, !0), U && (ca(I, S.gesturestart, ea, !1), ca(I, S.gesturechange, O, !1), ca(I, S.gestureend, Z, !0), ub && (ca(I, _[114], Z, !0), wa = new MSGesture, wa.target = I)))
            };
            W.domUpdate = function() {
                if (wa) {
                    var a = I;
                    sb = 0;
                    W.unregister();
                    W.registerControls(a)
                }
            };
            W.unregister = function() {
                wa && (wa = wa.target = null);
                ka(ba, _[148], y, !1);
                ka(ba, "keyup", p, !1);
                ka(b.topAccess ? top : M, _[29], z, !0);
                ka(b.topAccess ? top : M, _[50], z, !0);
                b.topAccess && ka(top, _[2], G, !0);
                ka(ba, _[43], g);
                ka(ba, _[97], g);
                ka(ba, _[99], g);
                ka(ba, _[102], g);
                ka(M, _[8], t, !0);
                ka(M, _[8], k, !0);
                ka(M, _[2], d, !0);
                ka(I, _[113], r, !1);
                ka(I, _[128], r, !1);
                ka(I, _[9], D, !1);
                ka(I, _[29], B, !0);
                ka(I, S.touchstart, q, !0);
                ka(I, S.touchmove, q, !0);
                ka(I, S.touchstart, N, !1);
                ka(I, S.touchmove, T, !0);
                ka(I, S.touchend, H, !0);
                ka(I, S.touchcancel, L, !0);
                ka(I, S.gesturestart, ea, !1);
                ka(I, S.gesturechange, O, !1);
                ka(I, S.gestureend, Z, !0);
                ka(I, _[114], Z, !0);
                C = S = I = null
            };
            W.handleFrictions = function() {
                var a, b = a = !1,
                    c = l.hlookat_moveforce,
                    d = l.vlookat_moveforce,
                    e = l.fov_moveforce;
                if (0 != e) {
                    var m = ha.keybfovchange;
                    db = !1;
                    ta = !0;
                    Ea = 0;
                    ob += m * e * .001
                }
                if (0 != c || 0 != d || 0 != Za || 0 != ya) {
                    var f = ha.keybfriction,
                        b = ha.keybspeed,
                        e = u.hlookat,
                        m = u.vlookat,
                        g = ha.keybaccelerate * Math.tan(Math.min(.5 * Number(u.fov), 45) * Y);
                    Za += c * g;
                    c = ya += d * g;
                    d = Za;
                    Za *= f;
                    ya *= f;
                    f = Math.sqrt(c * c + d * d);
                    0 < f ? (c /= f, d /= f) : d = c = 0;
                    f > b && (f = b);
                    d *= f;
                    e = 180 >= (Math.floor(m) % 360 + 450) % 360 ? e + d : e - d;
                    m += c * f;
                    u.hlookat = e;
                    u.vlookat = m;
                    f < .05 * g && (ya = Za = 0);
                    b = !0
                }
                a |= b;
                if (Ba) c = Math.pow(ha.dragfriction, .92), ga *= c, xa *= c, c = Math.sqrt(xa * xa + ga * ga), d = Math.min(.04 * Ac / u.r_zoom, .5), 0 != c && (u.hlookat += ga, u.vlookat += xa), c < d && (Ba = !1, xa = ga = 0), a |= 1;
                else if (sa) {
                    var c = K,
                        d = La,
                        b = Ra,
                        e = Ua,
                        f = .025 * ha.movetoaccelerate,
                        k = ha.movetospeed,
                        g = ha.movetofriction,
                        m = !1;
                    if (w()) {
                        if (c.down && (c.x != c.downx || c.y != c.downy)) {
                            var h = n(c.downx, c.downy, c.x, c.y, ha.movetorelative);
                            h.h = va;
                            b = d * b - h.h * f;
                            e = d * e - h.v * f;
                            d = Math.sqrt(b * b + e * e);
                            0 < d && (b /= d, e /= d, d > k && (d = k))
                        }
                        f = u.hlookat;
                        k = u.vlookat;
                        k += d * e * ha.movetoyfriction;
                        u.hlookat = f + d * b;
                        u.vlookat = k;
                        d *= g;
                        g = Math.min(.04 * Ac / u.r_zoom, .5);
                        0 == c.down && d < g && (m = !0)
                    } else m = !0;
                    m && (sa = !1, va = e = b = d = 0);
                    La = d;
                    Ra = b;
                    Ua = e;
                    a |= 1
                }
                if (ta) {
                    a: {
                        d = c = u.fov;b = ob;e = !1;
                        if (0 < Math.abs(b)) {
                            g = b;
                            f = ha.fovspeed;
                            e = u.fovmin;
                            m = u.fovmax;
                            b *= ha.fovfriction;
                            Math.abs(g) > f && (g = f * (g / Math.abs(g)));
                            c = P(c);
                            c = Q(c + g);
                            if (ha.bouncinglimits && 0 < Ea)
                                if (0 == Ma) g = P(c), c < e ? (b = P(e), b = .25 * -(g - b)) : c > m && (b = P(m), b = .25 * -(g - b));
                                else {
                                    c = void 0;
                                    break a
                                }
                            else c < e && (c = e, b = 0), c > m && (c = m, b = 0);
                            u.fov = c;
                            ob = b;
                            e = !0;
                            db && (u.fov = d, u.updateView(), d = u.screentosphere(Ka, Aa), u.fov = c, u.updateView(), c = u.screentosphere(Ka, Aa), b = u.vlookat + (d.y - c.y), u.hlookat += d.x - c.x, u.vlookat = b)
                        }
                        1E-5 > Math.abs(ob) && (Ea = ob = 0, ta = !1);c = e
                    }
                    a |= c
                }
                $a && (c = !1, K.down ? c = !1 : (d = u.hlookat, b = u.vlookat, d += za, b += Oa, u.hlookat = d, u.vlookat = b, c = !0, za *= .95, Oa *= .95, e = u._limits, ha.bouncinglimits && e && (360 > e[0] && (d < e[1] ? za = .15 * -(d - e[1]) : d > e[2] && (za = .15 * -(d - e[2]))), b < e[4] ? Oa = .15 * -(b - e[4]) : b > e[5] && (Oa = .15 * -(b - e[5]))), d = .15 * Math.min(.04 * Ac / u.r_zoom, .5), Math.sqrt(za * za + Oa * Oa) < d && (za = Oa = 0, $a = !1)), a |= c);
                return a
            };
            W.stopFrictions = function(a) {
                0 == (0 | a) && (a = 3);
                a & 1 && (Ra = ga = 0);
                a & 2 && (Ua = xa = 0);
                a & 4 && (ua(), K.down = !1)
            };
            W.isMultiTouch = function() {
                return Ma || xc || 1 < sb || Xb
            };
            W.isBouncing = function() {
                return 0 < Ea || $a
            };
            W.focusLoss = z;
            W.trackTouch = function(b) {
                if (0 == U || ub) {
                    var d = b.type;
                    d == S.touchstart ? qa ? R(b) : a(b) : d == S.touchend && (qa ? Ha(b) : c(b))
                }
            };
            var Ta = -.1
        })();
        var ia = null,
            U = null,
            mc = !1,
            Sd = !1,
            yb = 0,
            nc = !1,
            cc = !1,
            Lb = -1,
            fb = {};
        (function() {
            function a(a, b) {
                if (!0 !== b) u.haschanged = !0;
                else {
                    var c = l.webVR;
                    c && c.enabled && c.updateview();
                    c = X.isBusy();
                    0 == c && Na(_[332]);
                    u.updateView();
                    ia && cb.renderpano(ia, 2);
                    U && cb.renderpano(U, 1);
                    A && (A = cb.rendersnapshot(A, U));
                    ce(!0);
                    0 == c && Na(_[301])
                }
            }

            function c(a, b, c, f, g) {
                x.count++;
                x.id = x.count;
                if (e()) {
                    l.xml.sceneNEW && (l.xml.scene = l.xml.sceneNEW, l.xml.sceneNEW = null);
                    X.haltActions();
                    l.xml.url = "";
                    l.xml.content = a;
                    var k = (new DOMParser).parseFromString(a, _[36]);
                    fa.resolvexmlincludes(k, function() {
                        k = fa.xmlDoc;
                        h(k, b, c, f, g)
                    })
                }
            }

            function w(a, b) {
                setTimeout(function() {
                    try {
                        a.removeChild(b)
                    } catch (c) {}
                }, 20)
            }

            function f(a) {
                var c = 0 != (J & 64) && 0 == (J & 256),
                    e;
                !0 === a && (J = c = 0);
                if (0 == (J & 4)) {
                    var f = La.getArray();
                    a = f.length;
                    for (e = 0; e < a; e++) {
                        var g = f[e];
                        !g || 0 != c && 0 != g.keep || (g.sprite && (g.visible = !1, g.parent = null, g.sprite.parentNode && g.sprite.parentNode.removeChild(g.sprite)), g.destroy(), La.removeItem(e), e--, a--)
                    }
                }
                if (0 == (J & 128))
                    for (f = db.getArray(), a = f.length, e = 0; e < a; e++)
                        if ((g = f[e]) && (0 == c || 0 == g.keep)) {
                            if (g.sprite) {
                                g.visible = !1;
                                g.parent = null;
                                try {
                                    V.hotspotlayer.removeChild(g.sprite)
                                } catch (k) {}
                            }
                            var h = g._poly;
                            h && (h.kobject = null, 8.4 == b.iosversion ? w(V.svglayer, h) : V.svglayer.removeChild(h), g._poly = null);
                            g.destroy();
                            db.removeItem(e);
                            e--;
                            a--
                        }
                c = hd.getArray();
                a = c.length;
                for (e = 0; e < a; e++)(f = c[e]) && 0 == ma(f.keep) && (hd.removeItem(e), e--, a--)
            }

            function e() {
                return 1 < x.count && x.removeid != x.id && (x.removeid = x.id, Na(_[335], !0), x.removeid != x.id) ? !1 : !0
            }

            function n(a) {
                var b, c, e = "";
                a = gd(a);
                b = a.lastIndexOf("/");
                c = a.lastIndexOf("\\");
                c > b && (b = c);
                0 <= b && (e = a.slice(0, b + 1));
                return e
            }

            function h(a, c, e, k, h) {
                Ab.currentmovingspeed = 0;
                B = !1;
                J = U ? 64 : 0;
                e && (e = F(e), 0 <= e.indexOf(_[364]) && (J |= 4), 0 <= e.indexOf(_[337]) && (J |= 128), 0 <= e.indexOf(_[421]) && (J |= 16), 0 <= e.indexOf(_[483]) && (J |= 32), 0 <= e.indexOf("merge") && (J |= 16448), 0 <= e.indexOf(_[403]) && (J |= 256), 0 <= e.indexOf(_[481]) && (J |= 4), 0 <= e.indexOf(_[495]) && (J |= 36), 0 <= e.indexOf(_[409]) && (B = !0, J |= 65536), 0 <= e.indexOf(_[342]) && da(_[123], 0), 0 <= e.indexOf(_[399]) && (J |= 1056));
                0 == B && (yb = 0, k && (k = F(k), e = k.indexOf(_[575]), 0 <= e && (yb = parseFloat(k.slice(e + 6)), isNaN(yb) || 0 > yb)) && (yb = 2), U && (e = 0 != (J & 1024), b.webgl ? (e && (ia || A) && (ia && (A = cb.snapshot(A, ia)), e = !1), ia && (ia.destroy(), ia = null), 0 == e ? (U.stop(), A = cb.snapshot(A, U), U.destroy(), U = null) : (U.suspended = !0, ia = U, U = null, cb.renderpano(ia, 2)), cb.setblendmode(k), Lb = -1, nc = !1) : (0 == nc ? (ia && (ia.destroy(), ia = null), ia = U, 0 == e ? ia.stop() : ia.suspended = !0, U = null) : (k = (Ca() - Lb) / 1E3 / yb, k = v(k), .5 < k ? U && (U.destroy(), U = null) : (ia && (ia.destroy(), ia = null), ia = U, 0 == e ? ia.stop() : ia.suspended = !0, U = null), nc = !1), ia && ia.stopped && cb.renderpano(ia, 2))), J & 32 && (q[0] = u.hlookat, q[1] = u.vlookat, q[2] = u.camroll, q[3] = u.fov, q[4] = u.fovtype, q[5] = u.fovmin, q[6] = u.fovmax, q[7] = u.maxpixelzoom, q[8] = u.fisheye, q[9] = u.fisheyefovlink, q[10] = u.stereographic, q[12] = u.pannini, q[13] = u.architectural, q[14] = u.architecturalonlymiddle), 0 == (J & 16384) && u.defaults(), u.limitview = "auto", u.hlookatmin = Number.NaN, u.hlookatmax = Number.NaN, u.vlookatmin = Number.NaN, u.vlookatmax = Number.NaN, l.preview && delete l.preview, l.image && delete l.image, l.onstart = null, L = l.image = {}, L.type = null, L.multires = !1, L.multiresthreshold = .025, L.cubelabels = "l|f|r|b|u|d", L.stereo = !1, L.stereoformat = "TB", L.stereolabels = "1|2", L.tiled = !1, L.tilesize = 0, L.tiledimagewidth = 0, L.tiledimageheight = 0, L.baseindex = 1, L.level = new pb, L.hfov = 0, L.vfov = 0, L.voffset = 0, L.hres = 0, L.vres = 0, L.haschanged = !1, ta(L, "frame", 1), L.frames = 1);
                f();
                if (a && a.documentElement && _[31] == a.documentElement.nodeName) Ga(a.baseURI + _[28]);
                else {
                    fa.parsexml(a.childNodes, null, J);
                    if (null != l._loadpanoscene_name) {
                        var n = Q(_[88] + l._loadpanoscene_name + "]");
                        n && (k = _[140] + n.content + _[132], l.xml.url = "", l.xml.scene = l._loadpanoscene_name, l.xml.content = k, l.onstart = null, k = (new DOMParser).parseFromString(k, _[36]), fa.resolvexmlincludes(k, function() {
                            (a = fa.xmlDoc) && a.documentElement && _[31] == a.documentElement.nodeName ? Ga(a.baseURI + _[28]) : (fa.parsexml(a.childNodes, null, J), h = n.onstart)
                        }));
                        l._loadpanoscene_name = null
                    }
                    l.xmlversion = l.version;
                    l.version = l.buildversion;
                    D = h;
                    ae(c);
                    g()
                }
            }

            function g() {
                var a, b, c = l.plugin.getArray(),
                    e;
                b = c.length;
                for (a = 0; a < b; a++) {
                    var f = c[a];
                    if (f && f.layer && f.layer.isArray) {
                        var g = f.layer.getArray();
                        e = g.length;
                        for (b = 0; b < e; b++) {
                            var k = g[b];
                            k && (La.createItem(k.name, k), k.parent = f.name, k.keep = f.keep)
                        }
                        f.plugin = null;
                        f.layer = null;
                        a--;
                        b = c.length
                    }
                }
                if (0 != z(!0)) {
                    if (0 == B) {
                        J & 32 && (u.hlookat = q[0], u.vlookat = q[1], u.camroll = q[2], u.fov = q[3], u.fovtype = q[4], u.fovmin = q[5], u.fovmax = q[6], u.maxpixelzoom = q[7], u.fisheye = q[8], u.fisheyefovlink = q[9], u.stereographic = q[10], u.pannini = q[12], u.architectural = q[13], u.architecturalonlymiddle = q[14]);
                        fb.updateview();
                        ia && ia.removemainpano();
                        for (a = 0; 4100 > a; a++);
                        void 0 !== la.hardwarelimit && (Oc = parseFloat(la.hardwarelimit), isNaN(Oc) && (Oc = 0));
                        void 0 !== la.usedesktopimages && (le = ma(la.usedesktopimages));
                        mc = !0;
                        Mc.progress = 0;
                        U = cb.createPano(L);
                        U.addToLayer(V.panolayer);
                        0 < yb ? (cc = !0, U.setblend(0), vc = 0) : (cc = !1, U.setblend(1), vc = 1)
                    }
                    X.resumeActions();
                    X.actions_autorun(_[502], !0);
                    a = l.onstart;
                    D && (a = D, D = null);
                    c = x.id;
                    X.callaction(a, null, !0);
                    if (c == x.id && (X.actions_autorun(_[503], !1), Na(_[296]), l.xml && l.xml.scene && Na(_[407]), c == x.id)) {
                        0 == B && r();
                        a = db.getArray();
                        c = a.length;
                        for (f = 0; f < c; f++)(b = a[f]) && 0 == b._ready && (b.create(), b.sprite && V.hotspotlayer.appendChild(b.sprite));
                        z();
                        0 < ab && Na(_[79]);
                        fb.updateview();
                        X.processactions()
                    }
                }
            }

            function z(a) {
                var b = La.getArray(),
                    c = b.length,
                    e, f = !0;
                for (e = 0; e < c; e++) {
                    var k = b[e];
                    if (k) {
                        var h = !1;
                        1 == a ? 1 == k.preload && _[21] != k.type && 0 == k.loaded && (k.onloaded = g, k.altonloaded = null, h = !0, f = !1) : (1 == k.preload && (k.preload = !1, k.onloaded = null), h = !0);
                        h && 0 == k._ready && (k.create(), k.sprite && null == k._parent && V.pluginlayer.appendChild(k.sprite))
                    }
                }
                return f
            }

            function ua() {
                Na(_[235])
            }

            function r() {
                var c = b.desktop || le,
                    e = !1,
                    f = L.type,
                    g = parseFloat(L.hfov),
                    k = parseFloat(L.vfov),
                    h = parseFloat(L.voffset);
                isNaN(g) && (g = 0);
                isNaN(k) && (k = 0);
                isNaN(h) && (h = 0);
                var n = !!(L.multires && L.level && 0 < L.level.count),
                    l = !!L.mobile,
                    q = !!L.tablet;
                c || 0 != n || !l && !q || (f = "cube", e = !0);
                if (null == f)
                    if (L.left || L.cube) f = "cube";
                    else if (L.cubestrip) f = _[48];
                else if (L.sphere) f = _[61];
                else if (L.cylinder) f = _[35];
                else if (L.flat) f = "flat";
                else if (L.fisheye) f = _[81];
                else {
                    if (l || q) f = "cube", e = !0
                } else f = F(f);
                var r = _[61] == f || _[35] == f || _[81] == f,
                    t = 0 < g && 1 >= g && 45 >= k && r || "flat" == f,
                    v = "cube" == f || _[48] == f || null == f && 0 == r && 0 == t,
                    c = !1,
                    u = null;
                if (v) g = 360, k = 180;
                else if (r || t)
                    if (u = pa.parsePath(Q(_[554] + f + ".url"))) {
                        var w = 0;
                        0 <= (w = F(u).indexOf(_[516])) && (r = c = !0, n = t = !1, b.panovideosupport && (u = u.slice(w + 7)))
                    }
                L.type = f;
                L.hfov = g;
                L.vfov = k;
                L.voffset = h;
                h = ("" + L.cubelabels).split("|");
                6 == h.length && (U.cubelabels = h);
                U.stereo = b.webgl ? L.stereo : !1;
                U.stereoformat = "sbs" == F(L.stereoformat) ? 0 : 1;
                h = ("" + L.stereolabels).split("|");
                2 == h.length && (U.stereolabels = h);
                w = F(Q(_[323]));
                if (h = Q(_[366])) {
                    h = pa.parsePath(h);
                    if (_[48] == w || "null" == w && v) {
                        w = Q(_[230]);
                        if (null != w) {
                            var w = F(w),
                                z = [0, 1, 2, 3, 4, 5];
                            z[w.indexOf("l")] = 0;
                            z[w.indexOf("f")] = 1;
                            z[w.indexOf("r")] = 2;
                            z[w.indexOf("b")] = 3;
                            z[w.indexOf("u")] = 4;
                            z[w.indexOf("d")] = 5;
                            w = z
                        }
                        U.addCubestripPreview(h, w)
                    } else("flat" == w || ("null" == w || _[61] == w || _[35] == w) && t) && U.addFlatLevel(h, g, k, 0, 0, 0, L.baseindex, !0);
                    a(!1, !0)
                } else if (0 == w.indexOf("grid")) {
                    if (h = qb(w, null, !1))
                        if (h = h[0], "grid" == h.cmd) {
                            var m = h.args,
                                h = void 0 == m[1] ? 64 : parseInt(m[1]),
                                w = void 0 == m[2] ? 64 : parseInt(m[2]),
                                z = void 0 == m[3] ? 512 : parseInt(m[3]),
                                C = void 0 == m[4] ? 6710886 : parseInt(m[4]),
                                x = void 0 == m[5] ? 2236962 : parseInt(m[5]),
                                m = void 0 == m[6] ? void 0 == m[4] ? 16777215 : C : parseInt(m[6]),
                                C = wa(C),
                                x = wa(x),
                                m = wa(m);
                            U.addGridPreview(z, h, w, x, C, m);
                            a(!1, !0);
                            ua()
                        }
                } else ua();
                h = !1;
                w = b.androidstock && !b.webgl;
                if (t || v) {
                    if (e || v && w) q ? h = p(_[330]) : l && (h = p(_[333]));
                    if (0 == h)
                        if ("cube" == f) {
                            if (n)
                                if (e = L.level.getArray(), c = e.length, e.sort(function(a, b) {
                                        return +parseInt(a.tiledimagewidth, 10) - parseInt(b.tiledimagewidth, 10)
                                    }), 0 == b.multiressupport || w) {
                                    k = b.iphone && b.retina || b.tablet || b.android ? 1100 : b.iphone ? 512 : 2560;
                                    0 < Oc && (k = Oc + 256);
                                    for (u = c - 1; 0 <= u && !(g = e[u].tiledimagewidth, g <= k); u--);
                                    0 <= u && (h = p(_[72] + u + "]", !0))
                                } else
                                    for (e.sort(function(a, b) {
                                            return +parseInt(a.tiledimagewidth, 10) - parseInt(b.tiledimagewidth, 10)
                                        }), u = 0; u < c; u++)
                                        if (e = _[72] + u + "]", n = Q(e), k = y(e)) e = n.tilesize ? n.tilesize : L.tilesize, g = parseInt(n.tiledimagewidth, 10), 0 < e && 0 < g && (U.addCubeLevel(k, g, e, L.baseindex), h = !0);
                            0 == h && (h = p(_[94]))
                        } else if (_[48] == f && L.cubestrip) U.addCubestripPano(pa.parsePath("" + L.cubestrip.url)), h = !0;
                    else if ((_[61] == f || _[35] == f) && 1 >= g && 45 >= k || "flat" == f) {
                        if (b.multiressupport && n)
                            for (e = L.level.getArray(), c = e.length, e.sort(function(a, b) {
                                    return +parseInt(a.tiledimagewidth, 10) - parseInt(b.tiledimagewidth, 10)
                                }), u = 0; u < c; u++)
                                if (e = _[72] + u + "]", n = Q(e), l = Q(e + "." + f + ".url"), l = pa.parsePath(l)) e = n.tilesize ? n.tilesize : L.tilesize, q = parseInt(n.tiledimagewidth, 10), n = parseInt(n.tiledimageheight, 10), 0 < e && 0 < q && 0 < n && (U.addFlatLevel(l, g, k, q, n, e, L.baseindex, !1), h = !0);
                        0 == h && (c = L[f]) && c.url && (U.addFlatLevel(pa.parsePath("" + c.url), g, k, 0, 0, 0, L.baseindex, !1), h = !0)
                    }
                } else r && 0 == n && b.webgl && u && ((g = [Number(L.hfov), Number(L.vfov), Number(L.voffset)], k = L[f], c) ? b.panovideosupport && (c = La.getItem(u)) && (c.renderToBitmap = !0, c.visible = !1, U.addRoundPano(f, null, g, c, k), h = !0) : (U.addRoundPano(f, u, g, null, k), h = !0));
                h && (mc = Sd = !0);
                U.finalize();
                0 == h && null != f && (oa(2, _[183]), Na(_[112]));
                a(!1, !0)
            }

            function y(a) {
                var b = _[185].split(" "),
                    c = Array(6),
                    e, f;
                if (e = Q(a + "." + b[6] + ".url")) {
                    if (e = pa.parsePath(e))
                        for (f = 0; 6 > f; f++) c[f] = e.split("%s").join(U.cubelabels[f])
                } else
                    for (f = 0; 6 > f; f++)
                        if (e = pa.parsePath(Q(a + "." + b[f] + ".url"))) c[f] = e;
                        else return null; return c
            }

            function p(a, b) {
                var c = y(a);
                if (!c) return !1;
                if (b) {
                    var e = Q(a),
                        f = e.tilesize ? e.tilesize : L.tilesize,
                        e = parseInt(e.tiledimagewidth, 10);
                    U.addCubeLevel(c, e, f, L.baseindex)
                } else U.addCubeLevel(c, 0, 0, 1);
                return !0
            }

            function v(a) {
                1 < a && (a = 1);
                0 == b.webgl && (a *= a * a);
                a = 1 - a;
                0 > a && (a = 0);
                return a
            }
            var t = fb;
            t.loadpano = function(a, b, f, g, k) {
                x.count++;
                x.id = x.count;
                if (e())
                    if (0 > F(f).indexOf(_[380]) && da(_[123], 0), "null" == F(a) && (a = null), l.xml.content = null, l.xml.scene = null, a) {
                        X.haltActions();
                        null == pa.firstxmlpath ? pa.firstxmlpath = n(a) : a = pa.parsePath(a, !0);
                        pa.currentxmlpath = n(a);
                        l.xml.url = a;
                        var p = x.id;
                        pa.loadxml(a, function(c, e) {
                            if (p == x.id) {
                                if (c && c.childNodes) {
                                    var n = c.childNodes,
                                        l = n.length;
                                    0 == l ? c = null : 2 == l && n[1] && _[31] == n[1].nodeName && (c = null)
                                }
                                c ? (c = fa.resolvexmlencryption(c, a), null != c && fa.resolvexmlincludes(c, function() {
                                    c = fa.xmlDoc;
                                    h(c, b, f, g, k)
                                })) : 200 == e ? Ga(a + _[28]) : Ga(a + _[194])
                            }
                        })
                    } else l.xml.url = "", c(_[237], b, f, g, k)
            };
            t.loadxml = c;
            t.loadxmldoc = h;
            t.updateview = a;
            t.updateplugins = function(a) {
                var b = La.getArray(),
                    c = b.length,
                    e;
                Ca();
                var f = 0,
                    g = 0;
                for (e = 0; e < c; e++) {
                    var k = b[e];
                    k && k._ready && (0 != k.haschanged_flags && (k.processUpdates(), f++), (a || k.poschanged) && k.loaded && (k.updatepos(_[439]), g++))
                }
            };
            t.idlecheck = function() {
                var a = Ca();
                K.down && K.moved && (hb = Ca());
                (a - hb) / 1E3 > l.idletime && k != hb && (k = hb, Na(_[536]));
                return Ab.checkIdletime(a, hb)
            };
            t.previewdone = ua;
            t.havepanosize = function(a) {
                U && U.id == a.id && (L.hfov = a.hfov, L.vfov = a.vfov, L.hres = a.hres, L.vres = a.vres, Na(_[415]), u.haschanged = !0)
            };
            t.removeelements = f;
            t.isLoading = function() {
                return mc
            };
            t.isBlending = function() {
                return cc || nc
            };
            var q = [],
                x = {
                    count: 0,
                    id: 0
                },
                J = 0,
                B = !1,
                D = null,
                A = null,
                k = 0;
            t.checkHovering = function() {
                if (1 != (Ya & 1) && !X.isblocked()) {
                    var a = [La.getArray(), db.getArray()],
                        b, c, e, f, g;
                    for (g = 0; 2 > g; g++)
                        for (b = a[g], e = b.length, f = 0; f < e; f++)(c = b[f]) && c.DATA.visible && c.hovering && c.onhover && X.callaction(c.onhover, c)
                }
            };
            t.handleloading = function() {
                var a = !1;
                0 == nc && (ia && (a |= ia.doloading()), U && (a |= U.doloading()));
                mc = U && U.isloading();
                var b = cb.handleloading();
                Sd && 1 != mc && (Sd = !1, Na(_[112]));
                b & 1 && (mc = !0);
                b & 2 && (a = !0);
                U && (ia || A) && (0 == nc ? U.previewcheck() && (nc = !0, Lb = -1) : (a = 0, 0 <= yb && (-1 == Lb ? Lb = Ca() : (a = (Ca() - Lb) / 1E3, a = 0 < yb ? a / yb : 1), a = v(a), cc = !0, 0 < yb && U.setblend(1 - a), vc = 1 - a), 0 == a && (yb = 0, ia && (ia.destroy(), ia = null), cc = nc = !1), a = !0));
                return a
            }
        })();
        var cb = {};
        (function() {
            var a, c;

            function w(a) {
                if (ga) {
                    var b = l.bgcolor;
                    ga.clearColor((b >> 16 & 255) / 255, (b >> 8 & 255) / 255, (b & 255) / 255, a)
                }
            }

            function f(a) {
                if (!1 === document.hidden && Ba) {
                    var b = parseInt(Ba.style.height);
                    0 < b && (Ba.style.height = b + 1 + "px", setTimeout(function() {
                        Ba && parseInt(Ba.style.height) == b + 1 && (Ba.style.height = b + "px")
                    }, 100))
                }
            }

            function e() {
                return "attribute vec3 vx;attribute vec2 tx;uniform float sh;uniform float ch;uniform mat4 mx;uniform mat4 ot;uniform mat3 tm;varying vec2 tt;void main(){vec3 vr=vec3(ot*vec4(vx,1));vec3 vs=1000.0*normalize(vr);vec2 c2=vec2(vr.x,vr.z);c2=c2/max(1.0,length(c2));vec3 vc=1000.0*vec3(c2.x,clamp(vr.y*inversesqrt(1.0+vr.x*vr.x+vr.z*vr.z),-30.0,+30.0),c2.y);vec3 vv=vr*(1.0-sh)+sh*(vs*(1.0-ch)+vc*ch);gl_Position=mx*vec4(vv,1.0);tt=(vec3(tx,1)*tm).xy;}"
            }

            function n(a, b) {
                return "#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#endif\nuniform float aa;uniform sampler2D sm;varying vec2 tt;void main(){vec4 c=texture2D(sm,vec2(tt.s,tt.t)" + (a ? ",-1.0" : "") + ");" + (b ? _[189] : "") + "gl_FragColor=vec4(c.rgb,c.a*aa);}"
            }

            function h(a) {
                var b = ga;
                b && a && (b.deleteProgram(a.prg), b.deleteShader(a.vs), b.deleteShader(a.fs), a.prg = null, a.vs = null, a.fs = null)
            }

            function g(a, b, c, d) {
                var e = ga;
                null == a && (a = "attribute vec2 vx;varying vec2 tx;void main(){gl_Position=vec4(vx.x*2.0-1.0,-1.0+vx.y*2.0,0.0,1.0);tx=vx;}");
                var f = null;
                if (void 0 === kc[a]) {
                    f = e.createShader(e.VERTEX_SHADER);
                    e.shaderSource(f, a);
                    e.compileShader(f);
                    if (!e.getShaderParameter(f, e.COMPILE_STATUS)) return oa(0, _[118] + e.getShaderInfoLog(f)), null;
                    kc[a] = f
                } else f = kc[a];
                a = e.createShader(e.FRAGMENT_SHADER);
                e.shaderSource(a, b);
                e.compileShader(a);
                if (!e.getShaderParameter(a, e.COMPILE_STATUS)) return oa(0, _[118] + e.getShaderInfoLog(a)), null;
                b = e.createProgram();
                e.attachShader(b, f);
                e.attachShader(b, a);
                e.linkProgram(b);
                if (!e.getProgramParameter(b, e.LINK_STATUS)) return null;
                e.useProgram(b);
                e.uniform1i(e.getUniformLocation(b, "sm"), 0);
                var f = {
                        vs: f,
                        fs: a,
                        prg: b
                    },
                    m = c.split(","),
                    g;
                a = m.length;
                for (c = 0; c < a; c++)(g = m[c]) && e.enableVertexAttribArray(f[g] = e.getAttribLocation(b, g));
                d = d.split(",");
                a = d.length;
                for (c = 0; c < a; c++)(m = d[c]) && (f[m] = e.getUniformLocation(b, m));
                return f
            }

            function z(a, b) {
                return g(null, a, "vx", b)
            }

            function ua(a) {
                a = a && a.prg ? a.prg : a;
                var b = ga;
                a ? a != Qc && (wb = Qc, Qc = a, b.useProgram(Qc)) : wb && (Qc = wb, wb = null, b.useProgram(Qc))
            }

            function r() {
                var d = ga;
                try {
                    var f = d.createBuffer();
                    d.bindBuffer(lb, f);
                    d.bufferData(lb, new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]), Rc);
                    var m = d.createBuffer();
                    d.bindBuffer(Tb, m);
                    d.bufferData(Tb, new Uint16Array([0, 1, 2, 0, 2, 3]), Rc);
                    a = f;
                    c = m;
                    var k;
                    for (k = 0; 6 > k; k++) {
                        var d = _[170],
                            h = m = f = "";
                        0 == k ? m = _[179] : 1 == k ? (h = "cc", f = _[105], m = _[169]) : 2 == k ? (h = "cc", f = _[105], m = _[165]) : 3 == k ? (h = "ct,zf", f = _[187], m = _[164]) : 4 == k ? (h = "fp,bl", f = _[188], m = "float t=(tx.x*fp.x+tx.y*fp.y+fp.z)*(1.0-2.0*bl)+bl;gl_FragColor=vec4(texture2D(sm,tx).rgb,smoothstep(t-bl,t+bl,aa));") : 5 == k && (h = _[461], f = _[174], m = "float t=(1.0-sqrt(2.0)*sqrt((ap.x*(tx.x-0.5)*(tx.x-0.5)+ap.y*(tx.y-0.5)*(tx.y-0.5))/(0.5*(ap.x+ap.y))))*(1.0-2.0*bl)+bl;gl_FragColor=vec4(texture2D(sm,(tx-vec2(0.5,0.5))*mix(1.0,aa,zf)+vec2(0.5,0.5)).rgb,smoothstep(t-bl,t+bl,aa));");
                        d = _[198] + d + f + "void main(){" + m + "}";
                        Ka[k] = g(null, d, "vx", "aa," + h);
                        if (null == Ka[k]) return !1
                    }
                    var l = g(e(), n(!0, !1), _[93], _[67]);
                    null == l && b.ie && (l = g(e(), n(!1, !1), _[93], _[67]));
                    if (null == l) return !1;
                    za = l;
                    ya = g(e(), n(!1, !0), _[93], _[67]);
                    pb = l.vx;
                    qb = l.tx;
                    yb = l.sh;
                    Eb = l.ch;
                    xb = l.aa;
                    Gb = l.mx;
                    Ab = l.ot;
                    Kb = l.tm
                } catch (C) {
                    return !1
                }
                return !0
            }

            function y(a) {
                if (a) {
                    var b = ga;
                    b.deleteBuffer(a.vx);
                    b.deleteBuffer(a.tx);
                    b.deleteBuffer(a.ix);
                    a.vx = null;
                    a.tx = null;
                    a.ix = null;
                    a.vxd = null;
                    a.txd = null;
                    a.ixd = null;
                    a.tcnt = 0
                }
            }

            function p(a, b, c, d) {
                this.tcnt = a;
                this.vxd = b;
                this.txd = c;
                this.ixd = d;
                this.ix = this.tx = this.vx = null
            }

            function v(a) {
                var b = ga;
                b.bindBuffer(lb, a.vx = b.createBuffer());
                b.bufferData(lb, a.vxd, Rc);
                b.bindBuffer(lb, a.tx = b.createBuffer());
                b.bufferData(lb, a.txd, Rc);
                b.bindBuffer(Tb, a.ix = b.createBuffer());
                b.bufferData(Tb, a.ixd, Rc)
            }

            function t(a, b) {
                var c, d = 2 * (b + 1) * (b + 1);
                c = 6 * b * b;
                var e = new Float32Array(3 * (b + 1) * (b + 1)),
                    f = new Float32Array(d),
                    m = new Uint16Array(c),
                    g, k, h, n, l;
                a *= 2;
                for (k = c = d = 0; k <= b; k++)
                    for (g = 0; g <= b; g++) h = g / b, n = k / b, f[d] = h, f[d + 1] = n, d += 2, e[c] = a * (h - .5), e[c + 1] = a * (n - .5), e[c + 2] = 0, c += 3;
                for (k = c = 0; k < b; k++)
                    for (g = 0; g < b; g++) d = g + k * (b + 1), h = d + 1, n = d + (b + 1), l = n + 1, m[c] = d, m[c + 1] = h, m[c + 2] = n, m[c + 3] = h, m[c + 4] = l, m[c + 5] = n, c += 6;
                return new p(6 * b * b, e, f, m)
            }

            function q(a) {
                var c = ga;
                null == a && (a = {
                    have: !1,
                    fb: null,
                    tex: null,
                    w: 0,
                    h: 0,
                    alpha: 1,
                    havepano: -1,
                    drawcalls: 0
                }, a.fb = c.createFramebuffer(), a.tex = c.createTexture(), c.bindTexture(ja, a.tex), c.texParameteri(ja, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE), c.texParameteri(ja, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE), c.texParameteri(ja, c.TEXTURE_MAG_FILTER, Mb), c.texParameteri(ja, c.TEXTURE_MIN_FILTER, Mb), c.bindFramebuffer(mb, null), Oa = !1);
                var d = b.gl.width * Ga + .5 | 0,
                    e = b.gl.height * Ga + .5 | 0;
                if (a.w != d || a.h != e) a.w = d, a.h = e, c.bindTexture(ja, a.tex), c.texImage2D(ja, 0, Ub, d, e, 0, Ub, Sc, null), c.bindFramebuffer(mb, a.fb), c.framebufferTexture2D(mb, c.COLOR_ATTACHMENT0, ja, a.tex, 0), c.bindTexture(ja, null), c.bindFramebuffer(mb, null), Oa = !1;
                return a
            }

            function x(d, e, f) {
                var m = ga;
                if (0 >= d.drawcalls || null == e) return !1;
                var g = b.gl.width * Ga + .5 | 0,
                    k = b.gl.height * Ga + .5 | 0;
                if (0 < g && 0 < k) return ua(e.prg), m.viewport(0, 0, g, k), e.aa && (Ya && (f = 1 - Ya(1 - f, 0, 1), 0 > f ? f = 0 : 1 < f && (f = 1)), m.uniform1f(e.aa, f)), e.sz && m.uniform2f(e.sz, g, k), m.bindBuffer(lb, a), m.vertexAttribPointer(e.vx, 2, ec, !1, 0, 0), m.bindBuffer(Tb, c), m.activeTexture(Tc), m.bindTexture(ja, d.tex), m.drawElements(bc, 6, Vb, 0), ia++, !0
            }

            function J(a, b, c, d, e, f) {
                var m = !1;
                0 == d && (b = c = d = 1024, kb = m = !0);
                this.type = 0;
                this.stereo = f;
                this.preview = !1;
                this.needsize = m;
                this.w = b;
                this.h = c;
                this.mp = b * c * a >> 20;
                this.tilesize = d;
                this.htiles = (b + d - 1) / d | 0;
                this.vtiles = (c + d - 1) / d | 0;
                this.loadedtiles = [0, 0];
                this.addedtiles = [0, 0];
                this.totaltiles = a * this.htiles * this.vtiles;
                this.i = e;
                this.planeurls = Array(a);
                this.planemapping = 6 == a ? [0, 1, 2, 3, 4, 5] : [1];
                this.invplanemapping = 6 == a ? [0, 1, 2, 3, 4, 5] : [0, 0, 0, 0, 0, 0];
                this.completelyadded = this.complete = !1;
                this.vfov = this.hfov = 90;
                this.voffset = this.hoffset = 0;
                this.vscale = 1
            }

            function B(a, b) {
                return a.preview ? -1 : b.preview ? 1 : a.w - b.w
            }

            function D(a, b, c, d, e, f, m) {
                f = 0 < f ? d * m / f : 1;
                0 >= d && (d = 1);
                0 >= e && (e = f);
                f = e / f;
                b.hfov = d;
                b.vfov = e;
                b.hoffset = 0;
                b.voffset = d / 2 - e / f / 2;
                b.vscale = 1;
                m = a.levels;
                c && m.push(b);
                m.sort(B);
                b = m.length - 1;
                for (c = e = 0; c <= b; c++) m[c].needsize || (e = m[c].vfov);
                if (0 < e) {
                    for (c = 0; c <= b; c++) m[c].needsize || (m[c].vscale = e / m[c].vfov * f);
                    a.fovlimits = [-d / 2, +d / 2, -e / 2, +e / 2]
                }
                A(a)
            }

            function A(a) {
                var b = null,
                    c = 0 == a.type,
                    d = c || null != a.fovlimits,
                    e = a.levels;
                if (e) {
                    var f = e.length;
                    0 < f && (e = e[f - 1], 0 == e.preview && 0 == e.needsize && d && (b = e))
                }
                b && a.done && 0 == a.ready && (a.ready = !0, a.hfov = c ? 360 : b.hfov, a.vfov = c ? 180 : b.vfov, a.hres = b.w, a.vres = b.h, fb.havepanosize(a))
            }

            function k() {
                this.h = this.w = 0;
                this.imgfov = null;
                this.loading = !0;
                this.texture = this.obj = null;
                this.texvalid = !1;
                this.mx = Ra()
            }

            function d() {
                this.layer = null;
                this.tiles = [];
                this.mx = this.texture = this.csobj = this.csobj0 = null
            }

            function G(a) {
                function c(a, b, e, f) {
                    m(a);
                    if (0 == a.type || 5 == a.type) {
                        var g = ga;
                        e || (e = [0, 1, 2, 3, 4, 5]);
                        var h, k, n, l;
                        if (b) {
                            h = b.naturalWidth;
                            k = b.naturalHeight;
                            l = 1;
                            if (3 * h == 2 * k) n = h / 2;
                            else if (2 * h == 3 * k) n = h / 3;
                            else if (1 * h == 6 * k) n = h / 6;
                            else if (6 * h == 1 * k) n = h / 1;
                            else {
                                0 == a.type && oa(2, _[259] + b.src + _[200]);
                                return
                            }
                            h /= n;
                            k /= n
                        } else f && (n = f.width, l = 0, h = 1, k = 6, b = f);
                        f = Pa ? 0 : ra;
                        var C = n,
                            p = new d,
                            Ee = new J(6, C, C, C, 1, !1),
                            q, r, t, u = [2, 0, 3, 1, 4, 5];
                        0 == Pa && (q = Ja(), q.style.position = _[0], q.style.pointerEvents = "none", p.layer = q);
                        p.tiles = Array(6);
                        for (r = 0; r < k; r++)
                            for (q = 0; q < h; q++) {
                                var v = e[r * h + q],
                                    w = new E("prev" + a.id + "s" + mc[v], 0, v, 0, 0, Ee, "", a);
                                t = u[v];
                                var I = 1 == v || 3 == v ? f : 0,
                                    z = 3 >= v ? f : 0,
                                    dc = Ja(2);
                                dc.width = C + 2 * I;
                                dc.height = C + 2 * z;
                                dc.style.position = _[0];
                                dc.style[Nc] = "0 0";
                                var x = dc.getContext("2d");
                                x && (0 < z && (x.drawImage(b, l * q * n, l * r * n, n, 1, I, 0, n, z), x.drawImage(b, l * q * n, l * r * n + n - 1, n, 1, I, C + z, n, z)), 0 < I && (x.drawImage(b, l * q * n + 0, l * r * n + 0, 1, n, 0, I, I, n), x.drawImage(b, l * q * n + n - 1, l * r * n + 0, 1, n, C + I, I, I, n)), x.drawImage(b, l * q * n, l * r * n, n, n, I, z, C, C), Ma && x.getImageData(C >> 1, C >> 1, 1, 1));
                                w.canvas = dc;
                                0 == Pa ? (w.elmt = dc, dc = -C / 2, w.transform = Lb[v] + _[70] + (dc - I) + "px," + (dc - z) + "px," + dc + "px) ") : (R(w, C, C), v = g.createTexture(), g.activeTexture(Tc), g.bindTexture(ja, v), g.texParameteri(ja, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE), g.texParameteri(ja, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE), g.texParameteri(ja, g.TEXTURE_MAG_FILTER, Mb), g.texParameteri(ja, g.TEXTURE_MIN_FILTER, Mb), g.texImage2D(ja, 0, Yb, Yb, Sc, dc), g.bindTexture(ja, null), w.texture = v, w.mem = 0);
                                w.state = 2;
                                p.tiles[t] = w
                            }
                        kb = !0;
                        a.cspreview = p
                    }
                }

                function e(a, b) {
                    h.imagefov = b;
                    var c = a.rppano,
                        d = c.w,
                        f = c.h;
                    a.stereo && (0 == a.stereoformat ? d >>= 1 : f >>= 1);
                    var m = b[0],
                        g = b[1],
                        k = b[2];
                    0 >= m && (m = 360);
                    if (0 >= g) {
                        var g = m,
                            n = d,
                            l = f,
                            C = 180,
                            C = 4 == a.type ? 2 * Math.atan(g / 2 * (l / n) * Y) / Y : _[145] == a.mapping ? l / n * (g / 2) * Ua : g * l / n;
                        180 < C && (C = 180);
                        g = C
                    }
                    a.hfov = m;
                    a.vfov = g;
                    a.hres = d;
                    a.vres = f;
                    c.imgfov = [m, g, k];
                    c = -g / 2 + k;
                    d = +g / 2 + k;
                    4 == a.type && (d = Math.tan(.5 * g * Y), k = Math.sin(k * Y), c = Math.atan(-d + k) / Y, d = Math.atan(+d + k) / Y);
                    a.fovlimits = [-m / 2, +m / 2, c, d]
                }

                function f(a, c, d, e) {
                    c = ga;
                    var m = a.rppano,
                        g = c.createTexture();
                    c.activeTexture(Tc);
                    c.bindTexture(ja, g);
                    c.texParameteri(ja, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
                    c.texParameteri(ja, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
                    c.texParameteri(ja, c.TEXTURE_MAG_FILTER, Mb);
                    c.texParameteri(ja, c.TEXTURE_MIN_FILTER, Mb);
                    if (d) {
                        var h;
                        e = d.naturalWidth;
                        h = d.naturalHeight;
                        m.w = e;
                        m.h = h;
                        var k = !1,
                            n = !1,
                            l = N(e) << 1 | N(h),
                            n = b.opera ? "" : F(la.mipmapping);
                        if (n = "force" == n || "auto" == n && 3 == l) 0 == (l & 2) && (k = !0, e = T(e)), 0 == (l & 1) && (k = !0, h = T(h)), c.texParameteri(ja, c.TEXTURE_MIN_FILTER, c.LINEAR_MIPMAP_LINEAR);
                        e > ta && (k = !0, e = ta);
                        h > ta && (k = !0, h = ta);
                        if (k) {
                            k = Ja(2);
                            k.width = e;
                            k.height = h;
                            l = k.getContext("2d");
                            l.drawImage(d, 0, 0, e, h);
                            if (b.ios) {
                                var C;
                                C = h;
                                for (var p = l.getImageData(0, 0, 1, C).data, q = 0, Ee = C, r = C; r > q;) 0 == p[4 * (r - 1) + 3] ? Ee = r : q = r, r = Ee + q >> 1;
                                C = r / C;
                                0 < C && 1 > C && l.drawImage(d, 0, 0, e, h / C)
                            }
                            c.texImage2D(ja, 0, Yb, Yb, Sc, k)
                        } else c.texImage2D(ja, 0, Yb, Yb, Sc, d);
                        n && c.generateMipmap(ja);
                        m.texvalid = !0
                    } else e && (m.videoplugin = e, m.videoready = !1);
                    c.bindTexture(ja, null);
                    m.texture = g;
                    a.rppano = m;
                    kb = !0
                }

                function m(a) {
                    var b = ga,
                        c = a.cspreview;
                    if (c)
                        if (a.cspreview = null, b)
                            for (a = 0; 6 > a; a++) {
                                var d = c.tiles[a],
                                    e = d.texture;
                                e && (b.deleteTexture(e), d.texture = null)
                            } else a.previewadded && (a.layer.removeChild(c.layer), a.previewadded = !1)
                }
                var g = ++Va,
                    h = this;
                h.id = g;
                h.image = a;
                h.panoview = null;
                h.type = 0;
                h.typeinfos = null;
                h.mapping = null;
                h.cubelabels = _[559].split("");
                h.stereo = !1;
                h.stereoformat = 0;
                h.stereolabels = ["1", "2"];
                h.done = !1;
                h.ready = !1;
                h.fovlimits = null;
                h.hfov = 0;
                h.vfov = 0;
                h.hres = 0;
                h.vres = 0;
                h.levels = [];
                h.frame = 0;
                h.currentlevel = -1;
                h.viewloaded = !1;
                h.stopped = !1;
                h.suspended = !1;
                h.suspended_h = 0;
                h.alpha = 1;
                h.cspreview = null;
                h.rppano = null;
                h.previewadded = !1;
                h.previewloading = !1;
                h.mjpegimage = null;
                h.mjpegdata = null;
                h.addToLayer = function(a) {
                    if (0 == Pa) {
                        var b = Ja(),
                            c = b.style;
                        c.position = _[0];
                        c.left = 0;
                        c.top = 0;
                        h.layer = b;
                        a.appendChild(b)
                    }
                };
                h.addGridPreview = function(a, d, e, f, m, g) {
                    var k;
                    a += 1;
                    var n = b.desktop ? 1023 : b.tablet || b.webgl ? 511 : 255;
                    k = a < n ? a : n;
                    var l = Ja(2);
                    l.width = k;
                    l.height = k;
                    n = k / a;
                    e *= n;
                    d *= n;
                    n = l.getContext("2d");
                    n.fillStyle = f;
                    n.fillRect(0, 0, k, k);
                    n.fillStyle = m;
                    for (f = 0; f < a; f += e) n.fillRect(0, f, a, 1);
                    for (f = 0; f < a; f += d) n.fillRect(f, 0, 1, a);
                    if (g != m)
                        for (n.fillStyle = g, m = 0; m < a; m += e)
                            for (f = 0; f < a; f += d) n.fillRect(f, m, 1, 1);
                    setTimeout(function() {
                        c(h, null, null, l)
                    }, 10)
                };
                h.addCubestripPreview = function(a, b) {
                    h.previewloading = !0;
                    pa.loadimage(a, function(a) {
                        c(h, a, b);
                        h.previewloading = !1;
                        fb.previewdone()
                    }, function(b) {
                        pa.reportLoadingError(a);
                        h.previewloading = !1
                    })
                };
                h.addCubestripPano = function(a) {
                    pa.loadimage(a, function(a) {
                        c(h, a, null)
                    }, function() {
                        pa.reportLoadingError(a)
                    })
                };
                h.addCubeLevel = function(a, b, c, d) {
                    b = new J(6, b, b, c, d, h.stereo);
                    b.planeurls[0] = a[0];
                    b.planeurls[1] = a[1];
                    b.planeurls[2] = a[2];
                    b.planeurls[3] = a[3];
                    b.planeurls[4] = a[4];
                    b.planeurls[5] = a[5];
                    a = h.levels;
                    a.push(b);
                    a.sort(B);
                    A(h)
                };
                h.addFlatLevel = function(a, b, c, d, e, f, m, g) {
                    h.type = 1;
                    f = new J(1, d, e, f, m, h.stereo);
                    f.planeurls[0] = a;
                    f.type = 1;
                    f.preview = g;
                    D(h, f, !0, b, c, d, e)
                };
                h.addRoundPano = function(a, b, c, d, m) {
                    var g = !1,
                        n = F(m.mjpegstream);
                    "true" == n || "auto" == n ? (g = !0, h.mjpegdata = null) : (n = Number(n), !isNaN(n) && 0 < n && (g = !0, h.mjpegdata = {
                        delay: 1E3 / n,
                        lastupdate: 0
                    }));
                    h.mapping = m.mapping ? F(m.mapping) : "equi";
                    a = F(a);
                    _[35] == a ? h.type = 4 : _[81] == a ? (h.type = 5, h.stereo = !1, h.typeinfos = {
                        fov: m.fov,
                        align: m.align,
                        crop: m.crop,
                        lenscp: m.lenscp
                    }) : h.type = 3;
                    h.rppano = new k;
                    if (d) {
                        if (h.updateFOV = e, f(h, a, null, d), m = void 0 !== d._panoid, d._panoid = h.id, h.imagefov = c, d.onvideoreadyCB = function() {
                                var a = h.rppano;
                                a.w = d.videowidth;
                                a.h = d.videoheight;
                                e(h, h.imagefov);
                                u.updateView();
                                fb.havepanosize(h);
                                h.ready = !0;
                                h.rppano.loading = !1;
                                a.videoready = !0
                            }, !m && d.havevideosize) d.onvideoreadyCB()
                    } else b && pa.loadimage(b, function(b) {
                        g && (h.mjpegimage = b);
                        f(h, a, b);
                        e(h, c);
                        u.updateView();
                        fb.havepanosize(h);
                        h.rppano.loading = !1
                    }, function() {
                        pa.reportLoadingError(b)
                    })
                };
                h.finalize = function() {
                    h.done = !0;
                    A(h)
                };
                h.setblend = function(a) {
                    Pa ? h.alpha = a : h.layer && (h.layer.style.opacity = a)
                };
                h.removemainpano = function() {};
                h.stop = function() {
                    h.stopped = !0
                };
                h.destroy = function() {
                    var a = ga;
                    m(h);
                    if (a) {
                        var b = h.rppano;
                        if (b) {
                            var c = b.texture;
                            c && a.deleteTexture(c);
                            b.texture = null
                        }
                    }
                    for (var d in sa)(b = sa[d]) && b.pano === h && ea(b);
                    a || (h.layer.parentNode.removeChild(h.layer), h.layer = null)
                };
                h.previewcheck = function() {
                    var a = h.rppano;
                    return a && a.videoplugin ? a.texvalid : h.previewloading || 0 == h.type && null == h.cspreview && 0 < h.levels.length && !h.viewloaded ? !1 : !0
                };
                h.doloading = function() {
                    return !1
                };
                h.isloading = function() {
                    if (h.previewloading) return !0;
                    var a = h.levels,
                        b = a.length;
                    if (0 < b) {
                        if (0 == h.type && (b = a[0].preview && 1 < b ? 1 : 0, 9 > a[b].mp && !a[b].complete) || !h.viewloaded) return !0
                    } else if (a = h.rppano) return a.videoplugin ? !a.texvalid : a.loading;
                    return !1
                }
            }

            function E(a, b, c, d, e, f, m, g) {
                this.id = a;
                this.pano = g;
                this.cubeside = c;
                this.stereo = m;
                this.levelindex = b;
                this.level = f;
                this.h = d;
                this.v = e;
                this.draworder = f ? mc[c] * f.htiles * f.vtiles + e * f.htiles + d : mc[c];
                this.url = null;
                this.sh = this.ch = this.sv = 0;
                this.mx = this.texture = this.canvas = this.image = this.elmt = null;
                this.lastusage_on_frame = this.mem = this.retries = this.state = 0;
                this.overlap = this.transform = null;
                f && (a = 2 * ((d + .5) / f.htiles - .5), e = 2 * ((e + .5) / f.vtiles - .5), a += .5 / f.htiles, e += .5 / f.vtiles, 1 == g.type && (a *= Math.tan(.5 * f.hfov * Y), e *= Math.tan(.5 * f.vfov * Y)), 0 == c ? (c = 1, f = e, g = -a) : 1 == c ? (c = -a, f = e, g = -1) : 2 == c ? (c = -1, f = e, g = a) : 3 == c ? (c = a, f = e, g = 1) : 4 == c ? (c = -a, g = -e, f = -1) : (c = -a, g = e, f = 1), a = -Math.atan2(c, g), e = -Math.atan2(-f, Math.sqrt(c * c + g * g)), this.sv = Math.sin(e), e = Math.cos(e), this.ch = Math.cos(a) * e, this.sh = Math.sin(a) * e)
            }

            function R(a, b, c) {
                var d = jc[a.cubeside],
                    e = a.level,
                    f = e.w / 2,
                    m = e.tilesize,
                    g = 1E3 / f,
                    h = 1,
                    k = e.vscale;
                1 == e.type && (h = Math.tan(.5 * e.hfov * Y));
                var n = (-f + a.h * m + b / 2 + 2 * e.hoffset * f / 90) * g * h,
                    e = (-f + a.v * m + c / 2 + 2 * e.voffset * f / e.hfov) * g * h * k,
                    f = f * g;
                Pb(Bd, b / 1E3 * h, 0, 0, 0, c / 1E3 * h * k, 0, 0, 0, 1);
                $e(Ob, n, e, f);
                ic(Bd, Ob);
                b = Ob;
                h = d[1];
                k = -d[0] * Y;
                d = Math.cos(k);
                c = Math.sin(k);
                k = -h * Y;
                h = Math.cos(k);
                k = Math.sin(k);
                Pb(b, h, 0, -k, c * k, d, c * h, d * k, -c, d * h);
                ic(Bd, Ob);
                d = Ra();
                Pb(d, g, 0, 0, 0, g, 0, 0, 0, g);
                ic(d, Bd);
                a.mx = d
            }

            function Q(a, b, c, d, e, f) {
                var m = [],
                    g = a.length,
                    h, k = !1,
                    n = 0,
                    l;
                for (h = 0; h < g; h++) {
                    var C = a.charAt(h),
                        p = C.charCodeAt(0);
                    if (37 == p) k = !0, n = 0;
                    else if (48 == p) k ? n++ : m.push(C);
                    else if (k) {
                        k = !1;
                        l = null;
                        65 <= p && 84 >= p && (p += 32);
                        if (108 == p) l = c;
                        else if (115 == p) l = b;
                        else if (116 == p) l = f;
                        else if (117 == p || 120 == p || 99 == p || 104 == p) l = d;
                        else if (118 == p || 121 == p || 114 == p) l = e;
                        if (null != l) {
                            for (; l.length <= n;) l = "0" + l;
                            m.push(l)
                        } else m.push("%" + C)
                    } else k = !1, m.push(C)
                }
                return m.join("")
            }

            function N(a) {
                return 0 == (a & a - 1)
            }

            function T(a) {
                a--;
                a |= a >> 1;
                a |= a >> 2;
                a |= a >> 4;
                a |= a >> 8;
                a |= a >> 16;
                a++;
                return a
            }

            function H(a, b, c, d, e, f) {
                if (0 < f) setTimeout(function() {
                    try {
                        H(null, b, c, d, e, 0)
                    } catch (a) {}
                }, f);
                else {
                    null == a && (a = b.getContext("2d"));
                    f = e[0];
                    var m = e[1],
                        g = e[2],
                        h = e[3];
                    0 < f && a.drawImage(c, 0, 0, 1, d[1], 0, m, f, d[3]);
                    0 < m && a.drawImage(c, 0, 0, d[0], 1, f, 0, d[2], m);
                    0 < g && a.drawImage(c, d[0] - 1, 0, 1, d[1], f + d[2], m, g, d[3]);
                    0 < h && a.drawImage(c, 0, d[1] - 1, d[0], 1, f, m + d[3], d[2], h)
                }
            }

            function U(a) {
                function c(d) {
                    d ? a.image = d : d = a.image;
                    if (0 < qa) kb = !0, setTimeout(c, 0);
                    else if (wa--, null != d && null != d.naturalWidth) {
                        var e = d.naturalWidth,
                            f = d.naturalHeight,
                            m = e * f * 4,
                            g = !1;
                        0 == m && (g = !0);
                        if (g) a.state = 0, kb = !0;
                        else {
                            var h = a.level;
                            if (h) {
                                h.needsize && (h.w = e, h.h = f, h.tilesize = e > f ? e : f, h.needsize = !1, 1 == h.type ? D(a.pano, h, !1, L.hfov, L.vfov, e, f) : A(a.pano), h.preview && fb.previewdone());
                                h.loadedtiles[a.stereo - 1]++;
                                h.complete = h.stereo && la.stereo ? h.loadedtiles[0] == h.totaltiles && h.loadedtiles[1] == h.totaltiles : h.loadedtiles[0] == h.totaltiles;
                                g = 1 == h.htiles * h.vtiles;
                                a.state = 2;
                                a.lastusage_on_frame = fa;
                                if (Pa) {
                                    R(a, e, f);
                                    var k = ga,
                                        n = b.opera ? "" : F(la.mipmapping),
                                        l = "force" == n;
                                    if (n = l || "auto" == n) {
                                        if (!N(e) || !N(f)) {
                                            n = 1024;
                                            g ? (n = 0, l && (n = ta)) : l || N(h.tilesize) || (n = 0);
                                            var g = T(e),
                                                C = T(f);
                                            g < n && C < n && (h = Ja(2), h.width = g, h.height = C, n = h.getContext("2d"), n.drawImage(d, 0, 0, g, C), d = h, e = g, f = C)
                                        }
                                        n = N(e) && N(f)
                                    }
                                    n && 0 == l && !b.realDesktop && a.level && 2500 < a.level.h && (n = !1);
                                    e = k.createTexture();
                                    k.activeTexture(Tc);
                                    k.bindTexture(ja, e);
                                    k.texParameteri(ja, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE);
                                    k.texParameteri(ja, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE);
                                    k.texParameteri(ja, k.TEXTURE_MAG_FILTER, Mb);
                                    k.texParameteri(ja, k.TEXTURE_MIN_FILTER, n ? k.LINEAR_MIPMAP_LINEAR : Mb);
                                    k.texImage2D(ja, 0, Yb, Yb, Sc, d);
                                    n && k.generateMipmap(ja);
                                    k.bindTexture(ja, null);
                                    a.texture = e;
                                    a.image = null
                                } else {
                                    k = [e, f, e, f];
                                    l = !1;
                                    e == f && 1 == h.htiles && (n = la.hardwarelimit, e + 2 * ra > n && (h.w = h.h = k[2] = k[3] = e = f = n - 2 * ra, l = !0));
                                    var p = [0, 0, 0, 0],
                                        q = ra,
                                        r = a.h,
                                        t = a.v,
                                        h = a.cubeside,
                                        u = a.level,
                                        v = u.tilesize,
                                        n = u.vscale,
                                        w = -u.w / 2,
                                        I = C = 1;
                                    1 == u.type && (C = Math.tan(.5 * u.hfov * Y), h = 6, 2 < q && (q = 2), b.ie || b.desktop && b.safari) && (I = 252);
                                    1E3 < -w && 4 < q && (q = 4);
                                    var z = w,
                                        x = z;
                                    p[2] = q;
                                    p[3] = q;
                                    0 == h || 2 == h ? 0 == r && (p[0] = q) : 1 != h && 3 != h || r != u.vtiles - 1 || (p[2] = 0);
                                    0 <= h && 3 >= h ? 0 == t && (p[1] = q) : (r == u.htiles - 1 && (p[2] = 0), t == u.vtiles - 1 && (p[3] = 0));
                                    a.overlap = p;
                                    z -= p[0];
                                    x -= p[1];
                                    p = (z + r * v) * C;
                                    t = (x + t * v - 2 * u.voffset * w / u.hfov) * C * n;
                                    u = C;
                                    v = C * n;
                                    1 < I && (p *= I, t *= I, w *= I, u *= I, v *= I);
                                    I = "" + p;
                                    p = 0 < I.indexOf("e-") ? p = p.toFixed(18) : I;
                                    I = "" + t;
                                    t = 0 < I.indexOf("e-") ? t = t.toFixed(18) : I;
                                    I = "" + w;
                                    w = 0 < I.indexOf("e-") ? w = w.toFixed(18) : I;
                                    a.transform = Lb[h] + _[70] + p + "px," + t + "px," + w + "px) ";
                                    if (1 != C || 1 != n) a.transform += _[465] + u + "," + v + ",1) ";
                                    (C = a.overlap) ? (h = Ja(2), h.width = e + C[0] + C[2], h.height = f + C[1] + C[3], h.style.overflow = _[6], m = h.width * h.height * 4, w = I = 0, n = h.getContext("2d"), C && (I = C[0], w = C[1], H(n, h, d, k, C, g ? 0 : 250)), l ? n.drawImage(d, 0, 0, k[0], k[1], I, w, e, f) : n.drawImage(d, I, w), Ma && n.getImageData(k[0] >> 1, k[1] >> 1, 1, 1), a.canvas = h, a.elmt = h, a.image = null) : a.elmt = d;
                                    a.elmt.style.position = _[0];
                                    a.elmt.style[Nc] = "0 0"
                                }
                                a.mem = m;
                                na += m;
                                if (na > ub) {
                                    kb = !0;
                                    qa++;
                                    for (var S, m = null, e = 0;;) {
                                        for (S in sa) e++, d = sa[S], 0 < d.levelindex && 2 <= d.state && d.lastusage_on_frame < fa - 1 && (!m || d.lastusage_on_frame < m.lastusage_on_frame) && (m = d);
                                        if (m) {
                                            if (ea(m), m = null, na < ub - 2097152) break
                                        } else break
                                    }
                                    if (e > Math.max(2 * Ia.length, 100)) {
                                        m = {};
                                        for (S in sa)
                                            if (d = sa[S])(0 < d.levelindex || 8 < d.level.mp) && 0 == d.state && d.lastusage_on_frame < fa - 2 ? (d.pano = null, d.level = null) : m[S] = d;
                                        sa = m
                                    }
                                    na > ub && (va = !0)
                                }
                                kb = !0;
                                qa++
                            }
                        }
                    }
                }

                function d(b, c) {
                    wa--;
                    c ? a.state = 4 : a.retries < l.network.retrycount ? (a.retries++, a.state = 0, kb = !0) : (a.state = 4, pa.reportLoadingError(a.url))
                }
                null != a.pano && (null == a.url && (a.url = Q(a.level.planeurls[a.level.invplanemapping[a.cubeside]], a.pano.cubelabels[a.cubeside], a.levelindex, String(a.h + a.level.i), String(a.v + a.level.i), a.pano.stereolabels[a.stereo - 1])), a.state = 1, pa.loadimage(a.url, c, d, !0), wa++)
            }

            function ea(a) {
                var b = ga,
                    c = a.texture;
                b && c && b.deleteTexture(c);
                (b = a.elmt) && (c = b.parentNode) && c.removeChild(b);
                c = Ia.length;
                for (b = 0; b < c; b++)
                    if (Ia[b] == a) {
                        Ia.splice(b, 1);
                        break
                    }
                b = a.id;
                sa[b] = null;
                delete sa[b];
                if (b = a.level) b.addedtiles[a.stereo - 1]--, b.completelyadded = b.stereo && la.stereo ? b.addedtiles[0] == b.totaltiles && b.addedtiles[1] == b.totaltiles : b.addedtiles[0] == b.totaltiles;
                na -= a.mem;
                a.state = 0;
                a.image = null;
                a.canvas = null;
                a.texture = null;
                a.elmt = null;
                a.pano = null;
                a.level = null
            }

            function O(a) {
                if (Pa) {
                    var b = ga,
                        c = Na,
                        d = a.texture;
                    c && d && (b.uniformMatrix4fv(Ab, !1, a.mx), b.bindBuffer(lb, c.vx), b.vertexAttribPointer(pb, 3, ec, !1, 0, 0), b.bindBuffer(lb, c.tx), b.vertexAttribPointer(qb, 2, ec, !1, 0, 0), b.bindBuffer(Tb, c.ix), b.activeTexture(Tc), b.bindTexture(ja, d), b.drawElements(bc, c.tcnt, Vb, 0), ia++, ee && nd(c, .6))
                } else a.elmt.style[vb] = dd + a.transform
            }

            function Z(a, b) {
                var c = new uc;
                c.x = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
                c.y = a[0] * b[3] + a[1] * b[4] + a[2] * b[5];
                c.z = -2 * (a[0] * b[6] + a[1] * b[7] + a[2] * b[8]);
                return c
            }

            function P(a, c) {
                var d = a.panoview,
                    e = a.id,
                    f, g, h, k, n, q, r, w, z, x, B, A, D, H, ra, F, G, J, ea, T, K, N, Ma = !1,
                    R, M, nb, L, P, Q, Z, V, X, aa, W, Ha, ba, Ba, Va = !1,
                    pa = !1,
                    qa = !0,
                    ub = Ca();
                if (Pa) {
                    var na = ga,
                        Xb = Sa,
                        Pc = Da,
                        ta = a.panoview,
                        Aa = ta.z,
                        va = b.gl.width * Ga + .5 | 0,
                        Ea = b.gl.height * Ga + .5 | 0;
                    if (0 < c) {
                        var Oa = va,
                            va = va >> 1,
                            Xb = Xb >> 1;
                        na.viewport(2 == c ? va : 0, 0, 1 == c ? va : Oa - va, Ea)
                    } else na.viewport(0, 0, va, Ea);
                    var Ta = 1 / (.5 * Xb),
                        $a = -1 / (.5 * Pc),
                        Ka = ta.zf,
                        Xa = 0 < c ? Number(la.stereooverlap) * Xb * .5 * (1 == c ? 1 : -1) : 0,
                        ab = ta.yf,
                        fb = Math.min(Ka / 200, 1),
                        hb = 0 < Ka ? ta.ch : 0;
                    ye(ud, Ta, 0, 0, 0, 0, $a, 0, 0, 0, 0, 65535 / 65536, 1, 0, 0, 65535 / 65536 - 1, 0);
                    ye(me, Aa, 0, 0, 0, 0, Aa, 0, 0, Xa, ab, 1, 0, Ka * Xa, Ka * ab, Ka, 1);
                    ic(me, ud);
                    if (0 < c) {
                        var cb = l.webVR;
                        cb && cb.enabled && cb.prjmatrix(c, me)
                    }
                    5 == a.type && ya ? (ua(ya), pb = ya.vx, qb = ya.tx, yb = ya.sh, Eb = ya.ch, xb = ya.aa, Gb = ya.mx, Ab = ya.ot, Kb = ya.tm) : (ua(za), pb = za.vx, qb = za.tx, yb = za.sh, Eb = za.ch, xb = za.aa, Gb = za.mx, Ab = za.ot, Kb = za.tm);
                    na.uniform1f(xb, 1);
                    na.uniform1f(yb, fb);
                    na.uniform1f(Eb, hb);
                    Nd(gd, Oc);
                    ic(gd, me);
                    na.uniformMatrix4fv(Gb, !1, gd);
                    na.uniformMatrix3fv(Kb, !1, nc);
                    var bb = xa.obj0,
                        eb = xa.obj;
                    null == bb && (bb = t(500, 1), eb = t(500, 19), v(bb), v(eb), xa.obj0 = bb, xa.obj = eb);
                    Na = 10 < Ka ? eb : bb
                }
                var Ya = c;
                0 == Ya && (Ya = 1);
                a.stereo && (e += "t" + Ya);
                f = +d.h;
                g = -d.v;
                h = d.z;
                k = Ua - f * Y;
                n = -g * Y;
                q = Math.sin(n);
                r = Math.cos(n);
                w = Math.cos(k) * r;
                z = Math.sin(k) * r;
                if (Td) {
                    var jb = [w, q, z];
                    Ce(Bd, Td);
                    be(Bd, jb);
                    w = jb[0];
                    q = jb[1];
                    z = jb[2]
                }
                x = a.levels;
                A = x.length;
                D = a.currentlevel;
                a.viewloaded = !1;
                if (5E3 > h) {
                    var rb = 1 / Math.max(100, h),
                        mb = Math.abs(Math.cos(f * Y)),
                        vb = Math.cos(.25 * Ua);
                    if (1E-14 > mb || mb > vb - 1E-14 && mb < vb + 1E-14 || mb > 1 - 1E-14 || 1E-14 > r || r > 1 - 1E-14) f += (.5 + .5 * Math.random()) * rb * (.5 > Math.random() ? -1 : 1), g += (.5 + .5 * Math.random()) * rb * (.5 > Math.random() ? -1 : 1);
                    b.firefox && (q < -(1 - 1E-14) && (g += .5), q > +(1 - 1E-14) && (g -= .5))
                }
                dd = _[70] + Sa / 2 + "px," + Da / 2 + _[221] + d.yf.toFixed(16) + _[252] + h.toFixed(16) + _[120] + (-d.r).toFixed(16) + _[107] + h.toFixed(16) + _[329] + g.toFixed(16) + _[306] + f.toFixed(16) + "deg) " + Kc;
                if (0 < A) {
                    var ob = 1 == ma(la.loadwhilemoving) ? !0 : 0 == a.hasmoved || xc,
                        Ad = D;
                    7 <= wa && (ob = !1);
                    if (a.stopped) ob = !1;
                    else {
                        9 > x[0].mp && (0 == x[0].complete && (Ad = 0, Ma = !0), 0 == ob && 0 == x[0].completelyadded && (Ad = 0, ob = Ma = !0));
                        var Db = l.lockmultireslevel | 0;
                        l.downloadlockedlevel && 0 <= Db && Db < A && (Ma = !0, 0 == x[Db].complete && (ob = !0))
                    }
                    zd && 5 < Ad && (Ad -= 3, zd = !1, kb = !0);
                    if (ob) {
                        ca = ub;
                        xc = !1;
                        Ha = null;
                        Ba = 1E6;
                        for (H = Ad; 0 <= H; H--) {
                            B = x[H];
                            G = B.w;
                            J = B.h;
                            ea = B.tilesize;
                            T = B.htiles;
                            K = B.vtiles;
                            var Va = !0,
                                Ub = B.planeurls.length;
                            for (F = 0; F < Ub; F++)
                                if (ra = B.planemapping[F], N = Ma ? [0, 0, 1, 1] : d.vr[ra]) {
                                    aa = "p" + e + "l" + H + "s" + mc[ra] + "h";
                                    var Mb = 1,
                                        Pb = 1;
                                    1 == a.type && (Mb = 1 / Math.tan(.5 * B.hfov * Y), Pb = 1 / Math.tan(.5 * B.vfov * Y));
                                    R = Math.floor((Mb * (N[0] - .5) + .5) * G / ea);
                                    M = Math.ceil((Mb * (N[2] - .5) + .5) * G / ea);
                                    0 > R && (R = 0);
                                    M > T && (M = T);
                                    nb = Math.floor((Pb * (N[1] - .5) + .5) * J / ea);
                                    L = Math.ceil((Pb * (N[3] - .5) + .5) * J / ea);
                                    0 > nb && (nb = 0);
                                    L > K && (L = K);
                                    for (V = nb; V < L; V++)
                                        for (Z = R; Z < M; Z++) {
                                            X = aa + Z + "v" + V;
                                            W = sa[X];
                                            W || (W = new E(X, H, ra, Z, V, B, Ya, a), sa[X] = W, Va = !1);
                                            if (0 == W.state) ba = Math.acos(w * W.ch + z * W.sh + q * W.sv), ba < Ba && (Ha = W, Ba = ba), Va = !1;
                                            else if (1 == W.state) Va = !1;
                                            else if (2 == W.state) {
                                                0 == Pa && O(W);
                                                var wb = W,
                                                    Bb = null,
                                                    Ob = null;
                                                0 == Pa && (Bb = wb.elmt, Ob = a.layer);
                                                if (0 != Pa || Bb.parentNode != Ob) {
                                                    for (var kc = Ia.length, Qb = -1, Rb = void 0, Lb = void 0, wc = wb.pano, yc = wb.levelindex, zc = wb.draworder, tc = 0, vc = 0, Lb = 0; Lb < kc; Lb++)
                                                        if (Rb = Ia[Lb], Rb.pano === wc && (tc = Rb.levelindex, vc = Rb.draworder, tc >= yc && vc >= zc)) {
                                                            Qb = Lb;
                                                            break
                                                        }
                                                    0 > Qb ? (Bb && Ob.appendChild(Bb), Ia.push(wb)) : (Bb && Ob.insertBefore(Bb, Ia[Qb].elmt), Ia.splice(Qb, 0, wb));
                                                    var Uc = wb.level;
                                                    Uc.addedtiles[wb.stereo - 1]++;
                                                    Uc.completelyadded = Uc.stereo && la.stereo ? Uc.addedtiles[0] == Uc.totaltiles && Uc.addedtiles[1] == Uc.totaltiles : Uc.addedtiles[0] == Uc.totaltiles
                                                }
                                                W.state = 3
                                            }
                                            W.lastusage_on_frame = fa
                                        }
                                }
                            0 == zd && 0 == Va && H == Ad && 1E3 < ub - ha && (zd = !0, ha = ub);
                            if (Va) {
                                a.viewloaded = !0;
                                break
                            }
                        }
                        Ha && U(Ha)
                    }
                }
                1 != a.viewloaded ? (pa = !0, lc = ub) : 0 < lc && 200 > ub - lc && (pa = !0);
                Pa && 10 < d.zf && (pa = !0);
                if (pa) {
                    var Wb = a.cspreview;
                    if (Wb) {
                        var hf = Wb.layer;
                        for (P = 0; 6 > P; P++) {
                            var cc = Wb.tiles[P];
                            O(cc);
                            0 == Pa && 2 == cc.state && (hf.appendChild(cc.elmt), cc.state = 3)
                        }
                        0 != Pa || a.previewadded || (0 == a.layer.childNodes.length ? a.layer.appendChild(hf) : a.layer.insertBefore(hf, a.layer.childNodes[0]), a.previewadded = !0)
                    }
                } else 0 == Pa && a.previewadded && ((Wb = a.cspreview) && a.layer.removeChild(Wb.layer), a.previewadded = !1);
                a.previewloading && (qa = !1);
                if (qa)
                    for (Q = Ia.length, P = 0; P < Q; P++)
                        if (W = Ia[P], !(W.pano !== a || a.stereo && W.stereo != Ya))
                            if (W.levelindex > D) {
                                0 == Pa && W.pano.layer.removeChild(W.elmt);
                                W.state = 2;
                                Ia.splice(P, 1);
                                P--;
                                Q--;
                                var Vc = W.level;
                                Vc.addedtiles[W.stereo - 1]--;
                                Vc.completelyadded = Vc.stereo && la.stereo ? Vc.addedtiles[0] == Vc.totaltiles && Vc.addedtiles[1] == Vc.totaltiles : Vc.addedtiles[0] == Vc.totaltiles
                            } else O(W);
                if (0 == A && Pa) {
                    var Hb = a.rppano;
                    if (2 < a.type && Hb) {
                        var Ic = Hb.texture,
                            jc = Hb.imgfov,
                            Bc = Hb.videoplugin,
                            od = null,
                            Ac = !1;
                        Bc && (Bc._panoid != a.id ? Bc = Hb.videoplugin = null : kb = u.haschanged = !0);
                        if (Ic && jc) {
                            var Qc = jc[0],
                                ed = jc[1],
                                ld = jc[2];
                            Ac = Bc ? (od = Bc.videoDOM) ? Hb.videoready : Hb.texvalid : !0;
                            if (Ac) {
                                var Wc = xa.objS,
                                    Hc = a.type + "/" + Qc + "x" + ed + "/" + ld + "/" + a.mapping;
                                5 == a.type && (Hc += "/" + a.hres + "x" + a.vres);
                                if (Hc != xa.objS_i) {
                                    var ne = Qc,
                                        pd = ed,
                                        Cc = ld,
                                        Xc = Wc,
                                        md = a.type,
                                        fc = 15453,
                                        Dc = 10302,
                                        oc = 3E4;
                                    Xc && Xc.tcnt != oc && (Xc = null);
                                    var Cd = Xc ? Xc.vxd : new Float32Array(fc),
                                        oe = Xc ? Xc.txd : new Float32Array(Dc),
                                        Dd = Xc ? Xc.ixd : new Uint16Array(oc),
                                        Zb, $b, Ed, qd, Fd, Mc, Gd, gc, Hd, Nc, Fe, Ge, pe, He, ne = ne * Y,
                                        pd = pd * Y,
                                        Cc = Cc * Y;
                                    4 == md ? (pd = 1E3 * Math.tan(.5 * pd), Cc = 500 * Math.sin(1 * Cc)) : Cc = -Cc + .5 * Ua;
                                    var fc = Dc = 0,
                                        Zd = _[145] === a.mapping;
                                    if (5 == md) {
                                        var Ie = Ra(),
                                            Cb = new uc,
                                            Je = a.typeinfos,
                                            qe = Number(Je.fov),
                                            vd = ("" + Je.align).split("|"),
                                            wd = Number(vd[0]),
                                            xd = Number(vd[1]),
                                            yd = Number(vd[2]),
                                            ib = ("" + Je.lenscp).split("|");
                                        isNaN(qe) && (qe = 180);
                                        isNaN(xd) && (xd = 0);
                                        isNaN(wd) && (wd = 0);
                                        isNaN(yd) && (yd = 0);
                                        isNaN(ib[0]) && (ib[0] = 0);
                                        isNaN(ib[1]) && (ib[1] = 0);
                                        isNaN(ib[2]) && (ib[2] = 0);
                                        isNaN(ib[3]) && (ib[3] = 0);
                                        isNaN(ib[4]) && (ib[4] = 0);
                                        ib[5] = 1 - ib[0] - ib[1] - ib[2];
                                        ib[3] /= a.hres;
                                        ib[4] /= a.vres;
                                        var Yc = 1,
                                            Ke = 0,
                                            Le = 0,
                                            Pd = a.vres / a.hres,
                                            Id = ("" + Je.crop).split("|");
                                        if (1 == Id.length) Yc = Number(Id[0]), isNaN(Yc) && (Yc = 1);
                                        else if (4 == Id.length) {
                                            var Qd = Number(Id[0]),
                                                Rd = Number(Id[1]),
                                                he = Number(Id[2]),
                                                ie = Number(Id[3]),
                                                Yc = (Rd - Qd) / 2;
                                            if (isNaN(Yc)) Yc = 1;
                                            else var ke = (he + ie) / 2,
                                                Ke = a.hres / 2 - (Qd + Rd) / 2,
                                                Le = a.vres / 2 - ke,
                                                Yc = Yc / (a.vres / 2),
                                                Ke = Ke / a.vres,
                                                Le = Le / a.vres
                                        }
                                        var Sd = Ra(),
                                            $d = Ra(),
                                            ae = Ra();
                                        bf(Sd, 1, -wd);
                                        bf($d, 0, yd);
                                        bf(ae, 2, -xd);
                                        ic(Ie, $d);
                                        ic(Ie, ae);
                                        ic(Ie, Sd);
                                        ne = 360 * Y;
                                        pd = .5 * qe * Y;
                                        Cc = (180 - .25 * qe) * Y;
                                        for ($b = 0; 50 >= $b; $b++)
                                            for (gc = ($b / 50 - .5) * pd + Cc, Hd = Math.sin(gc), Nc = Math.cos(gc), Zb = 0; 100 >= Zb; Zb++) {
                                                gc = (Zb / 100 - .5) * ne + Ua;
                                                Fe = Math.sin(gc);
                                                Ge = Math.cos(gc);
                                                qd = -500 * Ge * Hd;
                                                Ed = 500 * Nc;
                                                Fd = 500 * Fe * Hd;
                                                var xe = Ed,
                                                    Ae = qd,
                                                    De = Fd;
                                                Cb.x = Ed;
                                                Cb.y = qd;
                                                Cb.z = Fd;
                                                Od(Ie, Cb);
                                                Ed = Cb.x;
                                                qd = Cb.y;
                                                Fd = Cb.z;
                                                Cb.x = De;
                                                Cb.y = -xe;
                                                Cb.z = Ae;
                                                var ce = Math.atan2(Cb.z, Cb.x),
                                                    Nb = Math.atan2(Math.sqrt(Cb.x * Cb.x + Cb.z * Cb.z), Cb.y),
                                                    Nb = 2 / (qe * Math.PI / 180) * Nb,
                                                    Nb = Yc * (ib[0] * Nb * Nb * Nb * Nb + ib[1] * Nb * Nb * Nb + ib[2] * Nb * Nb + ib[5] * Nb);
                                                Mc = .5 - Ke * Pd + .5 * Pd * Nb * Math.cos(ce) + ib[3];
                                                Gd = .5 - Le + .5 * Nb * Math.sin(ce) + ib[4];
                                                Cd[fc] = Ed;
                                                Cd[fc + 1] = qd;
                                                Cd[fc + 2] = Fd;
                                                fc += 3;
                                                oe[Dc] = Mc;
                                                oe[Dc + 1] = Gd;
                                                Dc += 2
                                            }
                                    } else
                                        for ($b = 0; 50 >= $b; $b++)
                                            for (Gd = 1 - $b / 50, 4 == md ? (Hd = 1, qd = pd * (Gd - .5) + Cc) : (gc = ($b / 50 - .5) * pd + Cc, Hd = Math.sin(gc), Nc = Math.cos(gc), qd = 500 * Nc, Zd && (Gd = .5 * Math.sin((Gd - .5) * Ua) + .5)), Zb = 0; 100 >= Zb; Zb++) gc = (Zb / 100 - .5) * ne + Ua, Fe = Math.sin(gc), Ge = Math.cos(gc), Ed = 500 * Ge * Hd, Fd = 500 * Fe * Hd, Mc = 1 - Zb / 100, Cd[fc] = Ed, Cd[fc + 1] = qd, Cd[fc + 2] = Fd, fc += 3, oe[Dc] = Mc, oe[Dc + 1] = Gd, Dc += 2;
                                    for ($b = oc = 0; 50 > $b; $b++)
                                        for (Zb = 0; 100 > Zb; Zb++) pe = 101 * $b + Zb, He = pe + 101, Dd[oc] = pe, Dd[oc + 1] = pe + 1, Dd[oc + 2] = He, Dd[oc + 3] = He, Dd[oc + 4] = pe + 1, Dd[oc + 5] = He + 1, oc += 6;
                                    var Wc = new p(3E4, Cd, oe, Dd),
                                        Jd = xa.objS,
                                        pc = Wc;
                                    if (Jd && Jd.tcnt == pc.tcnt) {
                                        pc.vx = Jd.vx;
                                        pc.tx = Jd.tx;
                                        pc.ix = Jd.ix;
                                        var Ud = ga;
                                        Ud.bindBuffer(lb, pc.vx);
                                        Ud.bufferData(lb, pc.vxd, Rc);
                                        Ud.bindBuffer(lb, pc.tx);
                                        Ud.bufferData(lb, pc.txd, Rc);
                                        Ud.bindBuffer(Tb, pc.ix);
                                        Ud.bufferData(Tb, pc.ixd, Rc)
                                    } else Jd && y(Jd), v(pc);
                                    xa.objS = Wc;
                                    xa.objS_i = Hc
                                }
                                var Ec = ga;
                                Ec.uniformMatrix4fv(Ab, !1, Hb.mx);
                                a.stereo && Ec.uniformMatrix3fv(Kb, !1, 0 == a.stereoformat ? 1 >= Ya ? id : jd : 1 >= Ya ? Jc : hd);
                                Ec.bindBuffer(lb, Wc.vx);
                                Ec.vertexAttribPointer(pb, 3, ec, !1, 0, 0);
                                Ec.bindBuffer(lb, Wc.tx);
                                Ec.vertexAttribPointer(qb, 2, ec, !1, 0, 0);
                                Ec.bindBuffer(Tb, Wc.ix);
                                var Kd = null;
                                if (od && 0 == ka) {
                                    ka++;
                                    var jf = Bc.posterDOM,
                                        de = jf && jf.complete,
                                        ge = (4 <= od.readyState || !0 === Bc.iPhoneMode) && 0 < od.videoWidth;
                                    de && b.chromemobile && 0 == od.currentTime && (ge = !1);
                                    if (ge) {
                                        var je = od.currentTime;
                                        if (Bc.lastCurrentTime != je && (Bc.lastCurrentTime = je, Kd = od, b.ie && !b.edge && b.desktop)) {
                                            null == sb && (sb = Ja(2));
                                            if (sb.width != Hb.w || sb.height != Hb.h) sb.width = Hb.w, sb.height = Hb.h;
                                            sb.getContext("2d").drawImage(od, 0, 0, Hb.w, Hb.h);
                                            Kd = sb
                                        }
                                    } else de && (Kd = jf)
                                } else a.mjpegimage && (Za = !0, null == a.mjpegdata ? 0 == a.hasmoved && (Kd = a.mjpegimage) : ub - a.mjpegdata.lastupdate > a.mjpegdata.delay && (a.mjpegdata.lastupdate = ub, Kd = a.mjpegimage));
                                Ec.activeTexture(Tc);
                                Ec.bindTexture(ja, Ic);
                                if (Kd) {
                                    var kf = Bc,
                                        le = !0;
                                    try {
                                        ga.texImage2D(ja, 0, Yb, Yb, Sc, Kd)
                                    } catch (re) {
                                        le = !1, re = "" + re, kf && kf.error != re && (kf.error = re, oa(3, re))
                                    }
                                    le && (Hb.texvalid = !0)
                                }
                                Hb.texvalid && (Ec.drawElements(bc, Wc.tcnt, Vb, 0), ia++, ee && nd(Wc, .25))
                            }
                        }
                    }
                }
                if (Pa) {
                    var Qa = ga,
                        se = Na,
                        Me = l.webVR,
                        lf = Me && Me.enabled,
                        mf = lf ? Me.getcursor() : null,
                        Fc = a.panoview,
                        Xf = Fc.h,
                        We = Fc.v,
                        Xe = Fc.r,
                        Ye = Fc.z / (lf ? 2E3 : Da) * 2,
                        nf = Fc.zf,
                        Ze = Math.min(Fc.zf / 200, 1),
                        cf = 1 + nf / 1E3,
                        vf = Bd;
                    Be(vf, 0, -Fc.h + 90, Fc.v, !1);
                    var wf = db.getArray(),
                        df = wf.length,
                        Ne, Fa, Wa, Vd, te = 2 > c,
                        of = null;
                    if (0 < c) {
                        var ef = lf ? Me.eyetranslt(c) : 0;
                        $e(ue, -ef, 0, 0);
                        Nd(Lc, rd);
                        ic(Lc, ue);
                        $e(ue, -u.tz, u.ty, -u.tx);
                        uf(Lc, ue);
                        of = Lc
                    }
                    Qa.uniformMatrix4fv(Gb, !1, me);
                    var Ld = !1;
                    Qa.bindBuffer(lb, se.vx);
                    Qa.vertexAttribPointer(pb, 3, ec, !1, 0, 0);
                    Qa.bindBuffer(lb, se.tx);
                    Qa.vertexAttribPointer(qb, 2, ec, !1, 0, 0);
                    Qa.bindBuffer(Tb, se.ix);
                    for (Ne = 0; Ne < df; Ne++)
                        if ((Fa = wf[Ne]) && Fa._ready && (te && 0 != Fa.haschanged_flags && Fa.processUpdates(), Fa.loaded && (Fa.keep || !a.suspended) && (Wa = Fa.DATA, Wa.visible)))
                            if (Wa.webGL) {
                                var Zc = Fa.GL;
                                Zc || (Zc = Fa.GL = new da);
                                var xf = !0,
                                    ve = Wa.depth,
                                    qc = 1;
                                isNaN(ve) && (ve = 1E3, xf = !1);
                                Fa === mf && (ve = mf.hit_depth, qc *= ve / 1E3);
                                var Md = Fa.getparsed(),
                                    Oe = Md.flags;
                                if (te) {
                                    var yf = Wa.scale,
                                        qc = qc * yf;
                                    Wa.scale = 1;
                                    Fa.renderer_flags & zf && Fa.API_calcsize();
                                    Wa.scale = yf;
                                    Zc.state = 1;
                                    Fa.renderer_flags = 0;
                                    var $c = Wa.flying,
                                        pf = (1 - $c) * Wa.ath,
                                        qf = (1 - $c) * Wa.atv,
                                        rf = (1 - $c) * Wa.rotate;
                                    0 < $c && (pf += $c * fd(Xf, Wa.ath), qf += $c * fd(We, Wa.atv), rf += $c * fd(Xe, Wa.rotate));
                                    var Af = 0 == Wa.distorted && 0 == Wa.zoom;
                                    1 != Fa.scaleflying || Af || (qc = qc * (1 - $c) + qc / Ye * $c * cf);
                                    var Wd = Fa.getrenderer(),
                                        Bf = Wa.distorted ? null : vf,
                                        Cf = Oe,
                                        ad = tb,
                                        ff = Wa.mx_RR,
                                        Df = 2 * (Oe & 64 ? Md.ox * Wd.w : Md.ox),
                                        Ef = 2 * (Oe & 128 ? Md.oy * Wd.h : Md.oy),
                                        Pe = ve,
                                        Ff = -rf,
                                        we = -pf + 90,
                                        Xd = qf,
                                        Qe = -Fa.tz,
                                        Re = Fa.ty,
                                        Se = Fa.tx,
                                        Gf = ue;
                                    ye(ad, 2 * Wd.w / 1E3 * qc, 0, 0, 0, 0, 2 * Wd.h / 1E3 * qc, 0, 0, 0, 0, 1, 0, -(Md.ex - .5) * Wd.w * 2 * qc, -(Md.ey - .5) * Wd.h * 2 * qc, 0, 1);
                                    if (Bf) {
                                        ze(ad, Df, Ef, 0);
                                        var Ib = ad,
                                            Te = Ff,
                                            bd = void 0,
                                            cd = void 0,
                                            Te = -Te * Y,
                                            bd = Math.cos(Te),
                                            cd = Math.sin(Te),
                                            rc = Ib[0],
                                            sc = Ib[1];
                                        Ib[0] = rc * bd - sc * cd;
                                        Ib[1] = rc * cd + sc * bd;
                                        rc = Ib[4];
                                        sc = Ib[5];
                                        Ib[4] = rc * bd - sc * cd;
                                        Ib[5] = rc * cd + sc * bd;
                                        rc = Ib[8];
                                        sc = Ib[9];
                                        Ib[8] = rc * bd - sc * cd;
                                        Ib[9] = rc * cd + sc * bd;
                                        rc = Ib[12];
                                        sc = Ib[13];
                                        Ib[12] = rc * bd - sc * cd;
                                        Ib[13] = rc * cd + sc * bd;
                                        af(ad, Bf);
                                        we = (we + 90) * Y;
                                        Xd *= Y;
                                        Qe += Pe * Math.cos(Xd) * Math.cos(we);
                                        Se += Pe * Math.cos(Xd) * Math.sin(we);
                                        Re += Pe * Math.sin(Xd);
                                        ze(ad, Qe, Re, Se)
                                    } else Cf & 1024 && af(ad, ff), ze(ad, Df, Ef, Pe), Be(Gf, Ff, we, Xd, !1), af(ad, Gf), Cf & 2048 && ze(ad, Qe, Re, Se);
                                    if (Af) {
                                        var hc = (tb[8] + tb[12]) * rd[2] + (tb[9] + tb[13]) * rd[6] + (tb[10] + tb[14]) * rd[10] + (tb[11] + tb[15]) * rd[14],
                                            hc = hc + Fc.zf,
                                            hc = .5 / Fc.z * hc,
                                            Jb = tb,
                                            sd = hc;
                                        Jb[0] *= sd;
                                        Jb[1] *= sd;
                                        Jb[2] *= sd;
                                        Jb[3] *= sd;
                                        Jb[4] *= sd;
                                        Jb[5] *= sd;
                                        Jb[6] *= sd;
                                        Jb[7] *= sd
                                    }
                                    Nd(Fa.MX, tb)
                                } else Nd(tb, Fa.MX);
                                if (!(.01 > Wa.alpha)) {
                                    of && xf ? ic(tb, of) : ic(tb, rd);
                                    if (te) {
                                        if (Oe & 3072) {
                                            if (Ld = !0, 0 < nf) {
                                                var Hf = tb[8] + tb[12],
                                                    If = tb[9] + tb[13],
                                                    hc = tb[10] + tb[14],
                                                    hc = hc * (1E3 / Math.sqrt(Hf * Hf + If * If + hc * hc)); - 800 > hc && (Ld = !1);
                                                if (hc < (1E3 < nf ? -100 : -950)) {
                                                    Zc.state = 0;
                                                    continue
                                                }
                                            }
                                        } else Ld = !1;
                                        Zc.state = Ld ? 2 : 1
                                    } else {
                                        if (0 == Zc.state) continue;
                                        Ld = 2 == Zc.state
                                    }
                                    if (Vd = Zc.tex) {
                                        if (Qa.activeTexture(Tc), Qa.bindTexture(ja, Vd), 1 != Zc.tex_type) a: {
                                            var ac = Fa,
                                                Jf = !1;
                                            if (2 == ac.GL.tex_type) {
                                                kb = !0;
                                                var sf = ac.posterDOM,
                                                    td = ac.videoDOM,
                                                    gf = sf && sf.complete,
                                                    tf = td && (4 <= td.readyState || !0 === ac.iPhoneMode) && 0 < td.videoWidth;
                                                td && b.chromemobile && 0 == td.currentTime && (tf = !1);
                                                var Ue = tf ? td : gf ? sf : null;
                                                if (Ue !== ac.GL.tex_src) {
                                                    if (null == td) {
                                                        S(ac);
                                                        ac.lastCurrentTime = -1;
                                                        Vd = null;
                                                        break a
                                                    }
                                                    Ue && (ac.GL.tex_src = Ue, ac.lastCurrentTime = -1)
                                                }
                                                if (tf) {
                                                    var Kf = td.currentTime;
                                                    Kf !== ac.lastCurrentTime && (Jf = !0, ac.lastCurrentTime = Kf)
                                                }
                                                Jf && C(ac, Yb, Ue)
                                            }
                                            Vd = ac.GL.tex
                                        }
                                    } else Vd = m(Fa);
                                    if (null != Vd) {
                                        Qa.uniformMatrix4fv(Ab, !1, tb);
                                        var Gc = nc,
                                            Yd = Wa.crop;
                                        Fa.pressed && Wa.ondowncrop ? Yd = Wa.ondowncrop : Fa.hovering && Wa.onovercrop && (Yd = Wa.onovercrop);
                                        if (Yd)
                                            if (Yd != Fa.C_crop) {
                                                Fa.C_crop = Yd;
                                                var Ve = ("" + Yd).split("|"),
                                                    Lf = Fa.loader.naturalWidth,
                                                    Mf = Fa.loader.naturalHeight,
                                                    Gc = [1, 0, 0, 0, 1, 0, 0, 0, 0];
                                                Gc[0] = (1 * Ve[2] - 1) / Lf;
                                                Gc[2] = (1 * Ve[0] + .5) / Lf;
                                                Gc[4] = (1 * Ve[3] - 1) / Mf;
                                                Gc[5] = (1 * Ve[1] + .5) / Mf;
                                                Fa.C_crop_matrix = Gc
                                            } else Gc = Fa.C_crop_matrix;
                                        else switch (Wa.stereo) {
                                            case "SBS":
                                                Gc = [.5, 0, 2 > c ? 0 : .5, 0, 1, 0, 0, 0, 0];
                                                break;
                                            case "TB":
                                                Gc = [1, 0, 0, 0, .5, 2 > c ? 0 : .5, 0, 0, 0]
                                        }
                                        Qa.uniformMatrix3fv(Kb, !1, Gc);
                                        Qa.uniform1f(xb, Wa.alpha);
                                        0 == Wa.distorted && Qa.uniform1f(yb, 0);
                                        Ld && Qa.disable(Qa.CULL_FACE);
                                        var Nf = !1;
                                        "add" == Fa.blendmode && (Nf = !0, Qa.blendFunc(Qa.SRC_ALPHA, Qa.ONE));
                                        Qa.drawElements(bc, se.tcnt, Vb, 0);
                                        ia++;
                                        Nf && (La ? Qa.blendFuncSeparate(Qa.SRC_ALPHA, Qa.ONE_MINUS_SRC_ALPHA, Qa.ONE, Qa.ONE) : Qa.blendFunc(Qa.SRC_ALPHA, Qa.ONE_MINUS_SRC_ALPHA));
                                        Ld && Qa.enable(Qa.CULL_FACE);
                                        fe && nd(se, 1);
                                        0 == Wa.distorted && Qa.uniform1f(yb, Ze)
                                    }
                                }
                            } else te && 0 < c && Fa.sprite && "none" != Fa.sprite.style.display && (Fa.sprite.style.display = "none");
                    te && (mf || 1 == gb.mouse || b.ie) && I.hittesthotspots(null)
                }
            }

            function da() {
                this.state = 0;
                this.tex_uid = null;
                this.tex_type = 0;
                this.destroy = this.tex = this.tex_src = null
            }

            function W(a, b) {
                this.uid = a;
                this.cnt = 1;
                this.tex = b
            }

            function m(a) {
                var c = 0,
                    d = null,
                    e = a.loader,
                    f = Ub;
                if (a.jsplugin) {
                    var d = a.getfullpath(),
                        e = a.posterDOM,
                        m = a.videoDOM;
                    e || m ? (kb = !0, c = 2, f = Yb, e && m && b.chromemobile && 0 == m.currentTime && (m = null), m && (2 <= m.readyState || !0 === a.iPhoneMode) && 0 < m.videoWidth ? e = m : e && e.complete || (e = null, a.requestUpdate())) : a._istextfield ? (e = null, c = 3) : e = null
                } else e && (d = e.src, !d || 1 > e.naturalWidth || 1 > e.naturalHeight ? e = null : c = 1);
                if (!e) return null;
                var m = ga,
                    g = null;
                if (g = Hc[d]) g.cnt++, g = g.tex;
                else {
                    m.activeTexture(Tc);
                    g = m.createTexture();
                    m.bindTexture(ja, g);
                    m.texParameteri(ja, m.TEXTURE_WRAP_T, m.CLAMP_TO_EDGE);
                    m.texParameteri(ja, m.TEXTURE_WRAP_S, m.CLAMP_TO_EDGE);
                    m.texParameteri(ja, m.TEXTURE_MAG_FILTER, Mb);
                    m.texParameteri(ja, m.TEXTURE_MIN_FILTER, Mb);
                    try {
                        C(a, f, e), Hc[d] = new W(d, g)
                    } catch (h) {
                        oa(3, h)
                    }
                }
                a.GL.tex = g;
                a.GL.tex_uid = d;
                a.GL.tex_type = c;
                a.GL.tex_src = e;
                a.GL.destroy || (a.GL.destroy = function() {
                    S(a)
                });
                return g
            }

            function C(a, c, d) {
                if (b.ie && !b.edge && "video" == d.localName) {
                    var e = d.videoWidth,
                        f = d.videoHeight,
                        m = a.DATA.tmpIECanvas;
                    null == m && (m = a.DATA.tmpIECanvas = Ja(2));
                    if (m.width != e || m.height != f) m.width = e, m.height = f;
                    m.getContext("2d").drawImage(d, 0, 0);
                    d = m
                }
                ga.texImage2D(ja, 0, c, c, Sc, d)
            }

            function S(a) {
                if (a.GL) {
                    a.DATA.tmpIECanvas && (a.DATA.tmpIECanvas.width = a.DATA.tmpIECanvas.height = 1, a.DATA.tmpIECanvas = null);
                    var b = a.GL.tex_uid,
                        c = Hc[b];
                    c && 0 == --c.cnt && (ga.deleteTexture(c.tex), c.tex = null, Hc[b] = null, delete Hc[b]);
                    a.GL.tex = null;
                    a.GL.tex_uid = null;
                    a.GL.tex_type = 0;
                    a.GL.tex_src = null;
                    a.GL.destroy = null;
                    a.GL = null
                }
            }
            var I = cb,
                ra = 0,
                Ma = !1,
                nb = 0,
                ca = 0,
                xc = !1,
                zd = !1,
                ha = 0,
                lc = 0,
                kb = !1,
                fa = 0,
                ka = 0,
                ia = 0,
                qa = 0,
                Va = 0,
                wa = 0,
                Xb = 0,
                Pc = 16.666,
                sa = {},
                Ia = [],
                na = 0,
                ub = 52428800,
                va = !1,
                sb = null,
                Pa = !1,
                Ba = null,
                ga = null,
                xa = null,
                ta = 0,
                Na = null,
                za = null,
                ya = null,
                La = !1,
                Ga = 1,
                Xa = !1,
                Ea = null,
                Ta = null;
            c = a = null;
            var Ka = [],
                Aa = null,
                Ya = null,
                bb = !1,
                ab = null,
                rb = null,
                Oa = !1,
                jb = [],
                pb, qb, yb, Eb, xb, Gb, Ab, Kb, nc = [1, 0, 0, 0, 1, 0, 0, 0, 0],
                Jc = [1, 0, 0, 0, .5, 0, 0, 0, 0],
                hd = [1, 0, 0, 0, .5, .5, 0, 0, 0],
                id = [.5, 0, 0, 0, 1, 0, 0, 0, 0],
                jd = [.5, 0, .5, 0, 1, 0, 0, 0, 0],
                ja, tc, mb, Tc, lb, Tb, Ub, Yb, Sc, Vb, ec, bc, Rc, Mb, mc = [1, 3, 0, 2, 4, 5, 6],
                Lb = "rotateY(90deg) ;;rotateY(-90deg) ;rotateY(180deg) ;rotateX(-90deg) ;rotateX(90deg) ;".split(";"),
                dd = "",
                Kc = "",
                Td = null;
            I.requiereredraw = !1;
            I.isloading = !1;
            I.setup = function(a) {
                var c, d = null;
                if (2 == a) {
                    var e = {};
                    if (0 <= F(zc.so.html5).indexOf(_[207]) || b.mac && b.firefox) e.preserveDrawingBuffer = !0;
                    b.mobile && (e.antialias = !1);
                    e.depth = !1;
                    e.stencil = !1;
                    var m = zc.so.webglsettings;
                    m && (!0 === m.preserveDrawingBuffer && (e.preserveDrawingBuffer = !0), !0 === m.depth && (e.depth = !0), !0 === m.stencil && (e.stencil = !0));
                    m = F(zc.so.wmode);
                    _[13] == m || _[154] == m ? (La = !0, e.alpha = !0, e.premultipliedAlpha = !0) : e.alpha = !1;
                    try {
                        for (Ba = Ja(2), Ba.style.position = _[0], Ba.style.left = 0, c = Ba.style.top = 0; 4 > c && !(d = Ba.getContext([_[65], _[100], _[130], _[131]][c], e)); c++);
                    } catch (k) {}
                    Ba && d && (ga = d, xa = {}, ja = d.TEXTURE_2D, tc = d.COLOR_BUFFER_BIT | d.DEPTH_BUFFER_BIT | d.STENCIL_BUFFER_BIT, mb = d.FRAMEBUFFER, Tc = d.TEXTURE0, lb = d.ARRAY_BUFFER, Tb = d.ELEMENT_ARRAY_BUFFER, Ub = d.RGBA, Yb = d.RGB, Sc = d.UNSIGNED_BYTE, Vb = d.UNSIGNED_SHORT, ec = d.FLOAT, bc = d.TRIANGLES, Rc = d.STATIC_DRAW, Mb = d.LINEAR, r() && (La ? d.clearColor(0, 0, 0, 0) : w(1), d.disable(d.DEPTH_TEST), d.depthFunc(d.NEVER), d.enable(d.BLEND), d.blendFunc(d.SRC_ALPHA, d.ONE_MINUS_SRC_ALPHA), d.enable(d.CULL_FACE), d.cullFace(d.FRONT), ta = d.getParameter(d.MAX_TEXTURE_SIZE), !b.desktop && 4096 < ta && (ta = 4096), 2048 >= ta && b.firefox && !b.mac && !b.android && (b.css3d = !1), b.ios && (ta = 2048), V.panolayer.appendChild(Ba), I.infoString = _[473], l.webGL = {
                        canvas: Ba,
                        context: d,
                        ppShaderArray: jb,
                        createShader: g,
                        createPostProcessingShader: z,
                        deleteShader: h,
                        useShader: ua,
                        ppshaders: jb,
                        createppshader: z,
                        useProgram: ua
                    }, Pa = !0));
                    0 == Pa && (xa = ga = Ba = null, a = 1)
                }
                1 == a && (I.infoString = _[477], b.webgl = !1);
                ra = b.browser.css.tileoverlap | 0;
                if (6 < b.iosversion || b.mac && "7" <= b.safariversion) Ma = !0;
                b.multiressupport = b.androidstock && 0 == b.webgl ? !1 : !0;
                (a = b.webgl) && b.android && b.androidstock && (a = !1);
                9 <= b.iosversion && document.addEventListener(_[43], f, !1);
                b.panovideosupport = a;
                b.buildList()
            };
            I.reset = function() {
                fa = 0
            };
            var kc = {},
                wb = null,
                Qc = null;
            I.unload = function() {
                var b;
                l.webGL && (l.webGL.canvas = null, l.webGL.context = null, l.webGL = null);
                var d = ga;
                if (d && xa) {
                    d.bindTexture(ja, null);
                    d.bindBuffer(lb, null);
                    d.bindBuffer(Tb, null);
                    d.bindFramebuffer(mb, null);
                    Oa = !1;
                    h(za);
                    h(ya);
                    ya = za = null;
                    xa.obj0 && (y(xa.obj0), y(xa.obj));
                    xa.objS && y(xa.objS);
                    xa = null;
                    for (b = 0; 6 > b; b++) Ka[b] && Ka[b].prg && (d.deleteProgram(Ka[b].prg), Ka[b].prg = null, Ka[b] = null);
                    d.deleteBuffer(a);
                    d.deleteBuffer(c);
                    var e = [Ea, Ta, ab, rb];
                    for (b = 0; b < e.length; b++) e[b] && (e[b].fb && d.deleteFramebuffer(e[b].fb), e[b].tex && d.deleteTexture(e[b].tex), e[b] = null)
                }
                Pa = !1;
                ga = Ba = null
            };
            I.size = function(a, c) {
                if (Pa) {
                    var d = (b.android && 0 == b.androidstock || b.blackberry || b.silk || b.mac) && 0 == b.hidpi ? b.pixelratio : 1;
                    if (b.desktop || b.ios || b.ie) d = M.devicePixelRatio;
                    isNaN(d) && (d = 1);
                    if (!b.desktop && 1 != d) a: {
                        var e = d,
                            d = [320, 360, 400, 480, 640, 720, 768, 800, 1024, 1080, 1280, 1366, 1440, 1920, 2560],
                            f, m, g = a * e;m = d.length;
                        for (f = 0; f < m; f++)
                            if (2 > Math.abs(d[f] - g)) {
                                d = d[f] / a;
                                break a
                            }
                        d = e
                    }
                    d *= 1;
                    e = a * d + .25 | 0;
                    d = c * d + .25 | 0;
                    if (f = l.webVR)
                        if (f = f.getsize(e, d)) e = f.w, d = f.h;
                    e *= la.framebufferscale;
                    d *= la.framebufferscale;
                    Ba.style.width = a + "px";
                    Ba.style.height = c + "px";
                    if (Ba.width != e || Ba.height != d) {
                        Ba.width = e;
                        Ba.height = d;
                        f = ga.drawingBufferWidth | 0;
                        m = ga.drawingBufferHeight | 0;
                        b.desktop && b.chrome && 300 == f && 150 == m && (f = m = 0);
                        if (0 >= f || 0 >= m) f = e, m = d;
                        ga.viewport(0, 0, f, m);
                        b.gl = {
                            width: f,
                            height: m
                        }
                    }
                } else b.gl = {
                    width: 0,
                    height: 0
                }
            };
            I.fps = function() {
                var a = Ca();
                if (0 < Xb) {
                    var b = a - Xb;
                    if (5 < b && 500 > b) {
                        var c = Math.min(b / 160, .75);
                        Pc = Pc * (1 - c) + b * c;
                        0 < Pc && (he = 1E3 / Pc, la.currentfps = he)
                    }
                    0 == qa && (la.r_ft = .9 * la.r_ft + .1 * b)
                }
                Xb = a
            };
            var Ic = !1;
            I.startFrame = function() {
                kb = !1;
                ia = ka = 0;
                Ic = !0;
                ub = l.memory.maxmem << 20;
                if (Pa) {
                    var a = ga;
                    (bb = 0 < jb.length) ? (a.clear(tc), ab = q(ab), 0 == Oa && (Oa = !0, a.bindFramebuffer(mb, ab.fb)), a.clear(tc), ia = 0) : (Oa && (Oa = !1, a.bindFramebuffer(mb, null)), a.clear(tc))
                }
            };
            I.finishFrame = function() {
                fa++;
                qa = 0;
                if (Pa) {
                    var a = ga;
                    if (bb) {
                        var c, d = jb.length,
                            e = ab,
                            f = null;
                        1 < d && (f = rb = q(rb));
                        a.disable(a.BLEND);
                        for (c = 0; c < d; c++) e.drawcalls = ia, ia = 0, f ? (a.bindFramebuffer(mb, f.fb), Oa = !0) : (a.bindFramebuffer(mb, null), Oa = !1), a.clear(tc), x(e, jb[c], 1), e = f, f = c + 1 == d - 1 ? null : c & 1 ? rb : ab;
                        a.enable(a.BLEND);
                        a.bindFramebuffer(mb, ab.fb);
                        Oa = !0
                    } else Oa && (Oa = !1, a.bindFramebuffer(mb, null));
                    b.androidstock && a.finish()
                }
                l.memory.usage = na >> 20;
                Ic = !1
            };
            I.createPano = function(a) {
                return new G(a)
            };
            var wc = 0,
                yc = 0,
                Qb = 0,
                rd = Ra(),
                Db = Ra(),
                Wb = Ra(),
                Oc = Ra(),
                cc = Ra(),
                ud = Ra(),
                me = Ra(),
                gd = Ra(),
                Lc = Ra(),
                Bd = Ra(),
                Ob = Ra();
            I.setblendmode = function(a) {
                if (Pa) {
                    var c = ga;
                    Aa = null;
                    var d = !0,
                        e = null,
                        f = null,
                        m = 1,
                        g = X.parseFunction(a);
                    if (g) switch (g[0].toUpperCase()) {
                        case "BLEND":
                            (e = g[2]) || (e = _[359]);
                            Aa = Ka[0];
                            break;
                        case _[388]:
                            f = Number(g[2]);
                            m = Number(g[3]);
                            (e = g[4]) || (e = _[372]);
                            isNaN(f) && (f = 16777215);
                            isNaN(m) && (m = 2);
                            Aa = Ka[1];
                            ua(Aa.prg);
                            break;
                        case _[381]:
                            f = Number(g[2]);
                            (e = g[3]) || (e = _[368]);
                            isNaN(f) && (f = 0);
                            Aa = Ka[2];
                            ua(Aa.prg);
                            break;
                        case _[393]:
                            var d = !1,
                                h = Number(g[2]);
                            a = Number(g[3]);
                            e = g[4];
                            isNaN(h) && (h = 0);
                            isNaN(a) && (a = .2);
                            a = 0 > a ? 0 : 1 < a ? 1 : a;
                            e || (e = _[57]);
                            var k = g = 0,
                                n = Math.cos(h * Y),
                                l = Math.sin(h * Y);
                            0 > l && (k = 1, h += 90);
                            0 > n && (g = 1, h += 0 > l ? 90 : -90);
                            h = Math.sqrt(2) * Math.cos((45 - h) * Y);
                            n *= h;
                            l *= h;
                            h = 1 / (n * n + l * l);
                            Aa = Ka[4];
                            ua(Aa.prg);
                            c.uniform3f(Aa.fp, n * h, l * h, (-g * n - k * l) * h);
                            c.uniform1f(Aa.bl, .5 * a);
                            break;
                        case _[428]:
                            d = !1;
                            a = Number(g[2]);
                            (e = g[3]) || (e = _[319]);
                            isNaN(a) && (a = 2);
                            Aa = Ka[3];
                            ua(Aa.prg);
                            c.uniform2f(Aa.ct, .5, .5);
                            c.uniform1f(Aa.zf, a);
                            break;
                        case _[426]:
                            d = !1, a = Number(g[2]), h = Number(g[3]), k = Number(g[4]), (e = g[5]) || (e = _[57]), isNaN(a) && (a = .2), isNaN(h) && (h = .2), isNaN(k) && (k = 0), a = -1 > a ? -1 : 1 < a ? 1 : a, h = 0 > h ? 0 : 1 < h ? 1 : h, k = 0 > k ? 0 : 1 < k ? 1 : k, g = b.gl.width / b.gl.height, n = 1, isNaN(g) && (g = 1), g *= g, 0 > a ? g *= 1 + a : n *= 1 - a, Aa = Ka[5], ua(Aa.prg), c.uniform2f(Aa.ap, g, n), c.uniform1f(Aa.bl, .5 * h), c.uniform1f(Aa.zf, k)
                    }
                    if (null == Aa || 0 == d && la.stereo) Aa = Ka[0], f = null;
                    null !== f && c.uniform3f(Aa.cc, m * (f >> 16 & 255) / 255, m * (f >> 8 & 255) / 255, m * (f & 255) / 255);
                    null == e && (e = _[57]);
                    Ya = ld.getTweenfu(e);
                    Xa = 0 == b.realDesktop && 1 < b.pixelratio || 33 < la.r_ft
                }
            };
            I.snapshot = function(a, c) {
                if (Pa) {
                    var d = ga;
                    if (!b.gl) return null;
                    if (a) {
                        var e = Ea;
                        Ea = Ta;
                        Ta = e
                    }
                    Xa && (Ga = .707);
                    Ta = q(Ta);
                    d.bindFramebuffer(mb, Ta.fb);
                    Oa = !0;
                    ia = 0;
                    La && w(1);
                    d.clear(tc);
                    e = 0;
                    c && (e = Ic, Ic = !0, I.renderpano(c, 1), Ic = e, e = 1 - c.alpha);
                    a && x(Ea, Aa, c ? 1 - c.alpha : a.alpha) && ia++;
                    Ta.drawcalls = ia;
                    bb ? (d.bindFramebuffer(mb, ab.fb), Oa = !0) : (d.bindFramebuffer(mb, null), Oa = !1);
                    Ga = 1;
                    null == a && (a = {});
                    a.alpha = e;
                    return a
                }
                return null
            };
            I.rendersnapshot = function(a, b) {
                if (0 == Ic) return a;
                if (null == ga || null == Ta || b && 1 <= b.alpha) return null;
                var c = a.alpha = b ? 1 - b.alpha : a.alpha;
                x(Ta, Aa, c);
                return a
            };
            I.renderpano = function(a, c) {
                if (0 != Ic) {
                    a.frame = fa;
                    var d = !1,
                        e = ga;
                    if (2 == c && e) {
                        if (a.stopped && Ea && Ea.done && Ea.pano == a.id) {
                            Ea.have = !0;
                            return
                        }
                        Xa && (Ga = .707);
                        if (Ea = q(Ea)) d = !0, Ea.have = !0, Ea.pano = a.id, Ea.done = !1, Ea.alpha = a.alpha, Ea.drawcalls = 0, e.bindFramebuffer(mb, Ea.fb), Oa = !0, w(1), e.clear(tc)
                    }
                    var f = a.panoview = a.stopped && a.panoview ? a.panoview : u.getState(a.panoview),
                        m = f.h,
                        g = f.v,
                        h = f.r,
                        k = f.z,
                        n = a.hasmoved = m != wc || g != yc || k != Qb;
                    k != Qb && (va = !1);
                    var C = Ca();
                    if (n) {
                        if ("auto" == F(la.loadwhilemoving)) {
                            var p = C - hb;
                            200 < C - ca && 0 == K.down && 200 < p && (xc = !0)
                        }
                        nb = C
                    } else 10 > C - nb && (a.hasmoved = n = !0);
                    kb = n;
                    wc = m;
                    yc = g;
                    Qb = k;
                    n = rd;
                    k = Db;
                    Ae(n, m, g, h);
                    Nd(Oc, n);
                    Kc = "";
                    Td = null;
                    a.image && a.image.prealign && (h = ("" + a.image.prealign).split("|"), 3 == h.length && (m = Number(h[0]), g = -Number(h[1]), h = -Number(h[2]), isNaN(m) || isNaN(g) || isNaN(h) || (Kc = _[141] + g.toFixed(4) + _[315] + h.toFixed(4) + _[314] + m.toFixed(4) + "deg) ", Td = Wb, Ce(k, n), n = Oc, k = cc, Nd(n, rd), Be(Td, m, g, h, !1), uf(n, Td))));
                    Ce(k, n);
                    m = (b.android && 0 == b.androidstock || b.blackberry || b.ios) && 0 == b.hidpi ? b.pixelratio : 1;
                    b.ios && b.retina && (m = 1.5);
                    1.4 < m && (m = 1.4);
                    h = 1 / (f.z / (.5 * Da));
                    g = f.zf;
                    200 < g && (h = Math.atan(h), g = Math.min(h + Math.asin(g / 1E3 * Math.sin(h)), 1), isNaN(g) && (g = 1), h = Math.tan(g));
                    .5 > h && (m = 1);
                    b.desktop && (m = b.pixelratio);
                    m = .25 * Ua * (Sa * m / Math.sin(Math.atan(Sa / Da * h)) + Da * m / h);
                    0 == a.type ? m *= 2 / Ua : 1 == a.type && (g = a.levels, m *= 2 / Ua, m *= Math.tan(.5 * g[g.length - 1].vfov * Y));
                    h = m;
                    m = 0;
                    n = a.levels;
                    g = n.length;
                    C = 1 + (L ? parseFloat(L.multiresthreshold) : 0);
                    isNaN(C) && (C = 1);
                    .1 > C && (C = .1);
                    h = Math.ceil(h * C);
                    if (0 < g) {
                        for (; !(0 == n[m].preview && n[m].h >= h);)
                            if (m++, m >= g) {
                                m = g - 1;
                                break
                            }
                        va && 0 < m && --m;
                        h = l.lockmultireslevel;
                        _[514] == F(h) && (l.lockmultireslevel = h = "" + m);
                        h |= 0;
                        0 <= h && h < g && (m = h);
                        a.currentlevel != m && (a.currentlevel = m)
                    }
                    1 == c && (m = a.currentlevel, l.multireslevel = 0 < m && a.levels[0].preview ? m - 1 : m);
                    a: {
                        n = k;k = f.zf;h = 1 / (f.z / (.5 * Ac));
                        if (0 < k && (m = Math.atan(h), h = Math.tan(m + Math.asin(k / 1E3 * Math.sin(m))), isNaN(h) || 0 >= h)) {
                            f.vr = ed;
                            break a
                        }
                        C = h * Da / Sa;p = f.yf / Da * 2 * C;k = [h, C + p, -1];m = [-h, C + p, -1];g = [-h, -C + p, -1];h = [h, -C + p, -1];be(n, k);be(n, m);be(n, g);be(n, h);
                        for (var r, C = 1, t = null, p = Array(40), v = [null, null, null, null, null, null], n = 0; 6 > n; n++) {
                            var I = [],
                                z = [];
                            I.push(Z(k, Rb[n]));
                            I.push(Z(m, Rb[n]));
                            I.push(Z(g, Rb[n]));
                            I.push(Z(h, Rb[n]));
                            var S = 0,
                                y = 0,
                                B = 0,
                                A = 0;
                            for (r = y = 0; 4 > r; r++) t = I[r], y = t.x, B = t.y, A = t.z / 2, y = 1 * (y > -A) + 8 * (y < A) + 64 * (B < A) + 512 * (B > -A) + 4096 * (-.1 > -A), p[r] = y, S += y;
                            r = 0 != (S & 18724);
                            if (0 == S)
                                for (r = 0; 4 > r; r++) t = I[r], z.push(t.x / t.z), z.push(t.y / t.z);
                            else if (r) continue;
                            else {
                                for (var S = 4, t = p, H = 0, ra = [], D = [], E, G = 0, G = 0; 5 > G; G++) {
                                    var J = 1 << 3 * G;
                                    for (r = 0; r < S; r++) {
                                        var B = (r + S - 1) % S,
                                            y = I[B],
                                            O = I[r],
                                            B = t[B],
                                            ea = t[r],
                                            T = 0;
                                        0 == (ea & J) ? (T |= 2, B & J && (T |= 1)) : 0 == (B & J) && (T |= 1);
                                        T & 1 && (4 == G ? C = (.1 - y.z / 2) / (O.z - y.z) / 2 : 3 == G ? C = (-y.y - y.z / 2) / (O.y - y.y + (O.z - y.z) / 2) : 2 == G ? C = (y.z / 2 - y.y) / (O.y - y.y - (O.z - y.z) / 2) : 1 == G ? C = (y.z / 2 - y.x) / (O.x - y.x - (O.z - y.z) / 2) : 0 == G && (C = (-y.z / 2 - y.x) / (O.x - y.x + (O.z - y.z) / 2)), E = new uc, E.x = y.x + (O.x - y.x) * C, E.y = y.y + (O.y - y.y) * C, E.z = y.z + (O.z - y.z) * C, y = E.x, B = E.y, A = E.z / 2, y = 1 * (y > -A) + 8 * (y < A) + 64 * (B < A) + 512 * (B > -A) + 4096 * (-.1 > -A), ra.push(E), D.push(y), H++);
                                        T & 2 && (ra.push(O), D.push(ea), H++)
                                    }
                                    S = H;
                                    I = ra;
                                    t = D;
                                    H = 0;
                                    ra = [];
                                    D = []
                                }
                                for (r = 0; r < S; r++) t = I[r], z.push(t.x / t.z), z.push(t.y / t.z)
                            }
                            I = S = 9;
                            H = t = -9;
                            ra = z.length;
                            if (4 < ra) {
                                for (r = 0; r < ra; r++) z[r] += .5;
                                for (r = 0; r < ra; r += 2) z[r + 0] < S && (S = z[r + 0]), z[r + 1] < I && (I = z[r + 1]), z[r + 0] > t && (t = z[r + 0]), z[r + 1] > H && (H = z[r + 1]);
                                S > t || 0 > S && 0 > t || 1 < S && 1 < t || I > H || 0 > I && 0 > H || 1 < I && 1 < H || (0 > S && (S = 0), 0 > I && (I = 0), 1 < t && (t = 1), 1 < H && (H = 1), v[n] = [S, I, t, H])
                            }
                        }
                        f.vr = v
                    }
                    xa && (La ? (e.clearColor(0, 0, 0, 0), e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD), e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE)) : e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA));
                    la.stereo ? (P(a, 1), P(a, 2)) : P(a, 0);
                    f = 0;
                    k = a.levels;
                    m = k.length;
                    l.downloadlockedlevel && 0 < (l.lockmultireslevel | 0) && (f = l.lockmultireslevel | 0, f >= m && (f = m - 1));
                    0 < m && (f = k[f], Mc.progress = f.stereo && la.stereo ? (f.loadedtiles[0] + f.loadedtiles[1]) / (2 * f.totaltiles) : f.loadedtiles[0] / f.totaltiles);
                    d && (bb ? (e.bindFramebuffer(mb, ab.fb), Oa = !0) : (e.bindFramebuffer(mb, null), Oa = !1), e.clear(tc), Ea.drawcalls = ia, Ea.done = !0, Ga = 1);
                    1 == c && e && Ea && 0 < Ea.drawcalls && Ea.done && Ea.have && (Ea.have = !1, x(Ea, Aa, 1 - vc))
                }
            };
            I.handleloading = function() {
                return kb ? 2 : 0
            };
            var jc = [
                    [0, 180],
                    [0, 90],
                    [0, 0],
                    [0, 270],
                    [-90, 90],
                    [90, 90]
                ],
                nd = function() {
                    function a(b, c) {
                        var d, e = 8 * (c + 1);
                        d = 4 * (c + 1);
                        var f = new Float32Array(12 * (c + 1)),
                            m = new Float32Array(e),
                            g = new Uint16Array(d),
                            h, k, n, l;
                        b *= 2;
                        for (h = d = e = 0; 4 > h; h++)
                            for (k = 0; k <= c; k++) 0 == h ? (n = k, l = 0) : 1 == h ? (n = c, l = k) : 2 == h ? (n = c - k, l = c) : (n = 0, l = c - k), n /= c, l /= c, m[e] = n, m[e + 1] = l, e += 2, f[d] = b * (n - .5), f[d + 1] = b * (l - .5), f[d + 2] = 0, d += 3;
                        for (k = d = 0; k < 4 * (c + 1); k++) g[d] = k, d += 1;
                        return new p(d, f, m, g)
                    }
                    var b = null,
                        c = null,
                        d = null;
                    return function(e, f) {
                        var m = ga;
                        null == b && (b = m.createTexture(), m.bindTexture(ja, b), m.texParameteri(ja, m.TEXTURE_WRAP_T, m.CLAMP_TO_EDGE), m.texParameteri(ja, m.TEXTURE_WRAP_S, m.CLAMP_TO_EDGE), m.texParameteri(ja, m.TEXTURE_MAG_FILTER, m.NEAREST), m.texParameteri(ja, m.TEXTURE_MIN_FILTER, m.NEAREST), m.texImage2D(ja, 0, m.RGB, 1, 1, 0, m.RGB, Sc, new Uint8Array([0, 255, 0])), c = a(500, 1), d = a(500, 19), v(c), v(d), kb = !0);
                        var g = null;
                        if (g = e === xa.obj0 ? c : e === xa.obj ? d : e) m.bindBuffer(lb, g.vx), m.vertexAttribPointer(pb, 3, ec, !1, 0, 0), m.bindBuffer(lb, g.tx), m.vertexAttribPointer(qb, 2, ec, !1, 0, 0), m.bindBuffer(Tb, g.ix), m.uniform1f(xb, f), m.bindTexture(ja, b), m.drawElements(m.LINE_LOOP, g.tcnt, Vb, 0), m.bindBuffer(lb, e.vx), m.vertexAttribPointer(pb, 3, ec, !1, 0, 0), m.bindBuffer(lb, e.tx), m.vertexAttribPointer(qb, 2, ec, !1, 0, 0), m.bindBuffer(Tb, e.ix), m.uniform1f(xb, 1)
                    }
                }(),
                Rb = [
                    [-1, 0, 0, 0, 1, 0, 0, 0, 1],
                    [0, 0, 1, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 0, 0, -1],
                    [0, 0, -1, 0, 1, 0, -1, 0, 0],
                    [0, 0, 1, -1, 0, 0, 0, 1, 0],
                    [0, 0, 1, 1, 0, 0, 0, -1, 0]
                ],
                ed = [
                    [0, 0, 1, 1],
                    [0, 0, 1, 1],
                    [0, 0, 1, 1],
                    [0, 0, 1, 1],
                    [0, 0, 1, 1],
                    [0, 0, 1, 1]
                ],
                Hc = {},
                tb = Ra(),
                ue = Ra();
            I.hittesthotspots = function(a) {
                if (_[32] == a) {
                    if (Bb) return Bb.process_onup(Bb, !0), Bb = null, !0
                } else if (_[37] == a && Bb) return Bb.process_onup(Bb, !1), Bb = null, !0;
                var b = l.webVR,
                    c = b && b.enabled,
                    b = c ? b.getcursor() : null,
                    d = db.getArray(),
                    e = d.length,
                    f, m = [0, 0, 1],
                    g = !1,
                    h = !1,
                    k = b ? b.depth : 2E3,
                    n = b && b.enabled;
                if (!c) {
                    n = !0;
                    c = K.x * aa;
                    f = K.y * aa;
                    if (la.stereo) {
                        var m = Sa >> 1,
                            C = m * Number(la.stereooverlap);
                        c < m ? c = c + (m >> 1) - (C >> 1) : (c -= m >> 1, c += C >> 1)
                    }
                    m = u.inverseProject(c, f);
                    m = [-m.x, -m.y, -m.z];
                    if (eb) {
                        if (C = eb.hovering) a: {
                            C = eb;
                            if (ba.elementsFromPoint && (c = ba.elementsFromPoint(c, f))) {
                                var p = c.length;
                                for (f = 0; f < p; f++)
                                    if (c[f].kobject === C) {
                                        C = !0;
                                        break a
                                    }
                                C = !1;
                                break a
                            }
                            C = !0
                        }
                        0 == C && (eb = null)
                    }
                }
                c = m;
                f = c[0];
                C = c[1];
                p = c[2];
                c[0] = f * Db[0] + C * Db[4] + p * Db[8] + Db[12];
                c[1] = f * Db[1] + C * Db[5] + p * Db[9] + Db[13];
                c[2] = f * Db[2] + C * Db[6] + p * Db[10] + Db[14];
                if (null == eb)
                    for (--e; 0 <= e; e--)
                        if ((c = d[e]) && c._ready && (0 != c.haschanged_flags && c.processUpdates(), f = c.DATA, f.visible && c.loaded && c.GL && 0 != c.GL.state && c !== b && n && f.enabled)) {
                            var q = c.MX,
                                C = 0,
                                p = 1E3,
                                r = m[0],
                                t = m[1],
                                I = m[2],
                                w = p * q[0],
                                v = p * q[1],
                                z = p * q[2],
                                x = p * q[4],
                                S = p * q[5],
                                y = p * q[6],
                                B = q[12] - (w + x) / 2,
                                A = q[13] - (v + S) / 2,
                                q = q[14] - (z + y) / 2,
                                H = t * y - I * S,
                                ra = I * x - r * y,
                                D = r * S - t * x,
                                E = w * H + v * ra + z * D;
                            if (-1E-6 > E || 1E-6 < E) E = 1 / E, p = (B * H + A * ra + q * D) * -E, 0 <= p && 1 >= p && (H = q * v - A * z, ra = B * z - q * w, D = A * w - B * v, p = (r * H + t * ra + I * D) * E, 0 <= p && 1 >= p && (C = (x * H + S * ra + y * D) * E));
                            if (1 < C) {
                                null == a && c != $a && (null != $a && ($a.hovering = !1, X.callaction($a.onout, $a), b && X.callaction(b.onout, $a), $a.DATA.onovercrop && (Za = !0), $a = null), $a = c, c.hovering = !0, f.onovercrop && (Za = !0), X.isblocked() || (X.callaction(c.onover, c), b && X.callaction(b.onover, c)));
                                g = !0;
                                k = C;
                                _[46] == a && (Bb = c, c.process_ondown(c), c.capture && (h = !0));
                                break
                            }
                        }
                null == a && (b && (k = Math.max(k, 200) - 100, b.hit_depth = k), 0 == g && null != $a && ($a.DATA.onovercrop && (Za = !0), $a.hovering = !1, X.callaction($a.onout, $a), b && X.callaction(b.onout, $a), $a = null), md.update());
                return g && h
            }
        })();
        var Qf = function() {
                function a(a, b, f) {
                    a = F(a).charCodeAt(0);
                    return 118 == a ? f : 104 == a ? b : 100 == a ? Math.sqrt(b * b + f * f) : Math.max(b, f * c.mfovratio)
                }
                var c = this;
                c.haschanged = !1;
                c.r_rmatrix = Ra();
                (function() {
                    var a = "hlookat vlookat camroll fov maxpixelzoom fisheye fisheyefovlink architectural tx ty tz".split(" "),
                        b = [_[311], _[204]],
                        f;
                    for (f in a) ta(c, a[f], 0);
                    for (f in b) ta(c, b[f], !1);
                    ta(c, _[522], "VFOV");
                    c.continuousupdates = !1;
                    va(c, _[523], function() {
                        return "" + c._pannini
                    }, function(a) {
                        var b = Number(a),
                            b = isNaN(b) ? ma(a) ? 1 : 0 : 0 > b ? 0 : 1 < b ? 1 : b;
                        c._pannini = b;
                        c.haschanged = !0
                    });
                    va(c, _[382], function() {
                        return c._fisheye
                    }, function(a) {
                        c.fisheye = a
                    });
                    va(c, _[243], function() {
                        return c._fisheyefovlink
                    }, function(a) {
                        c.fisheyefovlink = a
                    });
                    va(c, _[339], function() {
                        if ("off" == F(c.limitview)) return 360;
                        var a = c.hlookatmax,
                            b = c.hlookatmin,
                            e = U && U.fovlimits;
                        isNaN(b) && (b = e ? e[0] : -180);
                        isNaN(a) && (a = e ? e[1] : 180);
                        return a - b
                    }, function(a) {});
                    va(c, _[343], function() {
                        if ("off" == F(c.limitview)) return 180;
                        var a = c.vlookatmax,
                            b = c.vlookatmin,
                            e = U && U.fovlimits;
                        isNaN(b) && (b = e ? e[2] : -90);
                        isNaN(a) && (a = e ? e[3] : 90);
                        return a - b
                    }, function(a) {})
                })();
                c.defaults = function() {
                    c._hlookat = 0;
                    c._vlookat = 0;
                    c._architectural = 0;
                    c._architecturalonlymiddle = !0;
                    c._fov = 90;
                    c._fovtype = b.desktop ? "VFOV" : "MFOV";
                    c._camroll = 0;
                    c.mfovratio = 4 / 3;
                    c._maxpixelzoom = Number.NaN;
                    c._stereographic = !0;
                    c._pannini = 0;
                    c._fisheye = 0;
                    c._fisheyefovlink = .5;
                    c.fovmin = 1;
                    c.fovmax = 179;
                    c.r_zoom = 1;
                    c.r_yoff = 0;
                    c.r_zoff = 0;
                    c.haschanged = !1;
                    c.limitview = "auto";
                    c.hlookatmin = Number.NaN;
                    c.hlookatmax = Number.NaN;
                    c.vlookatmin = Number.NaN;
                    c.vlookatmax = Number.NaN;
                    c._limits = null
                };
                c.inverseProject = function(a, b) {
                    var f, g, l, u, r, w, p, v;
                    l = -1E3;
                    r = l / c.r_zoom;
                    f = (a - Sa / 2) * r;
                    g = (b - Da / 2 - c.r_yoff) * r;
                    r = 1 / Math.sqrt(f * f + g * g + l * l);
                    f *= r;
                    g *= r;
                    l *= r;
                    u = c.r_zoff;
                    0 < u && (w = c._pannini, 0 < w && (r = f * f + l * l, 0 != r && (r = 1 + w * (1 / Math.sqrt(r) - 1), f *= r, g *= r, l *= r)), 0 == c._stereographic && (v = Math.atan(1E3 / u) / Y - 1, (1 > -l ? Math.acos(-l) / Y : 0) > v && (w = -g, p = f, r = w * w + p * p, 0 < r && (r = 1 / Math.sqrt(r), w *= r, p *= r), v *= Y, r = Math.sin(v), f = r * p, g = -r * w, l = -Math.cos(v))), w = u * l, p = w * w - (u * u - 1E6), 0 < p && (r = -w + Math.sqrt(p), f *= r, g *= r, l = l * r - -u, r = 1 / Math.sqrt(f * f + g * g + l * l), f *= r, g *= r, l *= r));
                    u = new uc;
                    u.x = f;
                    u.y = g;
                    u.z = l;
                    return u
                };
                var l = c.fovRemap = function(b, c, f, g, l) {
                        g || (g = Sa);
                        l || (l = Da);
                        b = Math.tan(b / 360 * Ua);
                        c = a(c, g, l);
                        f = a(f, g, l);
                        return b = 360 * Math.atan(b * f / c) / Ua
                    },
                    f = Ra();
                c.screentosphere = function(a, b) {
                    var h = new uc;
                    if (la.stereo) {
                        var g = Sa / 2,
                            l = g / 2 * (1 - Number(la.stereooverlap));
                        a = a < g ? a + l : a - l
                    }
                    g = c.inverseProject(a * aa, b * aa);
                    Ce(f, c.r_rmatrix);
                    Od(f, g);
                    g = [Math.atan2(g.x, g.z) / Y + 270, Math.atan2(-g.y, Math.sqrt(g.x * g.x + g.z * g.z)) / Y];
                    180 < g[0] && (g[0] -= 360);
                    h.x = g[0];
                    h.y = g[1];
                    h.z = 0;
                    return h
                };
                c.spheretoscreen = function(a, b, f) {
                    var g = new uc;
                    a = (180 - a) * Y;
                    b *= Y;
                    g.x = 1E3 * Math.cos(b) * Math.cos(a);
                    g.z = 1E3 * Math.cos(b) * Math.sin(a);
                    g.y = 1E3 * Math.sin(b);
                    Od(c.r_rmatrix, g);
                    b = g.z + c.r_zoff;
                    var l = a = Qb;
                    10 <= b && (b = c.r_zoom / b, a = (g.x * b + .5 * Sa) / aa, l = (g.y * b + .5 * Da) / aa + c.r_yoff, la.stereo && f && ("l" == f ? a -= Sa / 4 * (1 - Number(la.stereooverlap)) : "r" == f && (a += Sa / 4 * (1 - Number(la.stereooverlap)))));
                    g.x = a;
                    g.y = l;
                    return g
                };
                c.updateView = function() {
                    var a = c._maxpixelzoom;
                    if (!isNaN(a) && 0 != a) {
                        var f = 1E-6;
                        if (U && U.ready) {
                            var h = U.vres,
                                g = U.vfov;
                            0 == U.type && (h = h * Math.PI * .5);
                            if (50 < h && 0 < g) {
                                var f = Sa,
                                    z = Da,
                                    a = 360 / Math.PI * Math.atan(Math.tan(2 * Math.atan(1 / (2 / Math.PI * h * a / (g / 180) / (.5 * f)))) / (f / z));
                                if (isNaN(a) || 1E-4 > a) a = c.fovmax;
                                90 < a && (a = 90);
                                f = l(a, "VFOV", c._fovtype)
                            }
                        }
                        c.fovmin = f
                    }
                    var a = c._fov,
                        h = c._hlookat,
                        g = c._vlookat,
                        f = c._camroll,
                        K = b.webgl ? c._fisheye : 0,
                        r = c._fisheyefovlink,
                        y = c._stereographic,
                        z = 0,
                        p = 0 == ha.bouncinglimits || 0 == gb.isBouncing();
                    p && (a < c.fovmin && (a = c.fovmin), a > c.fovmax && (a = c.fovmax));
                    179 < a && (a = 179);
                    if (0 < K) {
                        var v = l(a, c._fovtype, "VFOV");
                        y ? (170 < a && (a = 170), z = 1E3 * K * Math.sin(Math.pow(Math.min(v / 130, 1), 2 * r) * Ua * .5)) : (K += Math.pow(Math.min(K, 1), 10) / 10, z = K * Math.sin(Math.pow(v / 180, r) * Ua * .5), z *= 3E3 * z)
                    }
                    var t = F(c.limitview),
                        q = U && U.fovlimits,
                        x = 0,
                        J = 0,
                        B = 0,
                        r = Number(c.hlookatmin),
                        v = Number(c.hlookatmax),
                        D = Number(c.vlookatmin),
                        A = Number(c.vlookatmax);
                    "auto" == t && (r = v = D = A = Number.NaN);
                    isNaN(r) && (r = q ? q[0] : -180);
                    isNaN(v) && (v = q ? q[1] : 180);
                    isNaN(D) && (D = q ? q[2] : -90);
                    isNaN(A) && (A = q ? q[3] : 90);
                    "auto" == t && (u.hlookatmin = r, u.hlookatmax = v, u.vlookatmin = D, u.vlookatmax = A, t = "range");
                    A < D && (q = D, D = A, A = q);
                    v < r && (q = r, r = v, v = q);
                    var k = !1,
                        d = !1,
                        G = _[137] != t,
                        E = !0,
                        E = 180,
                        q = v - r,
                        R = A - D;
                    switch (t) {
                        case "off":
                        case _[25]:
                            q = 360;
                            r = -180;
                            v = 180;
                            D = -1E5;
                            A = 1E5;
                            G = !1;
                            break;
                        case _[442]:
                            G = !0;
                        case _[137]:
                            d = !0;
                        case "range":
                            if ((k = 360 > q) || 180 > R) B = l(a, c._fovtype, "HFOV"), B > q && (E = !0, d && l(q, "HFOV", "VFOV") < R && (E = k = !1), B = q, G && E && (a = l(B, "HFOV", c._fovtype))), x = l(a, c._fovtype, "VFOV"), x > R && (E = !0, d && l(R, "VFOV", "HFOV") < q && (E = k = !1), x = R, G && E && (a = l(x, "VFOV", c._fovtype))), l(a, c._fovtype, "HFOV"), E = x, J = x *= .5, B *= .5, -89.9 >= D && (x = 0), 89.9 <= A && (J = 0)
                    }
                    t = [360, -180, 180, x + J, D + x, A - J];
                    p && (g - x < D ? (g = D + x, gb.stopFrictions(2)) : g + J > A && (g = A - J, gb.stopFrictions(2)));
                    k && (B = -g * Y, J = .5 * Sa, x = .5 * Da, D = x / Math.tan(E * Y * .5), 0 < B && (x = -x), J = 1 / Math.sqrt(1 + (J * J + x * x) / (D * D)), x = x / D * J, D = Math.acos(-J * Math.sin(B) + x * Math.cos(B)) - Ua / 2, isNaN(D) && (D = -Ua / 2), J = Math.acos((J * Math.cos(B) + x * Math.sin(B)) / Math.sin(D + Ua / 2)), isNaN(J) && (J = 0), B = 180 * J / Ua, 2 * B >= q && (G && (B = l(q, "HFOV", c._fovtype), B < a && (a = B)), B = q / 2));
                    360 > q && (G = !1, t[0] = q, t[1] = r + B, t[2] = v - B, p && (h - B < r ? (h = r + B, G = !0) : h + B > v && (h = v - B, G = !0)), G && (gb.stopFrictions(1), 0 != Ab.currentmovingspeed && (Ab.currentmovingspeed = 0, Ab.speed *= -1)));
                    c._limits = t;
                    c._fov = a;
                    c._hlookat = h;
                    c._vlookat = g;
                    a = l(a, c._fovtype, "MFOV");
                    0 < K && 0 == y ? (v = l(a, "MFOV", "VFOV"), K = Math.asin(1E3 * Math.sin(v * Y * .5) / (1E3 + .72 * z)), K = .5 * Da / Math.tan(K)) : K = .5 * Ac / Math.tan(a / 114.591559);
                    c.hfov = l(a, "MFOV", "HFOV");
                    c.vfov = l(a, "MFOV", "VFOV");
                    c.r_fov = a;
                    c.r_zoom = K;
                    c.r_zoff = z;
                    c.r_vlookat = g;
                    y = Number(c._architectural);
                    p = 0;
                    0 < y && (1 == c._architecturalonlymiddle && (p = Math.abs(g / 90), 1 < p && (p = 1), p = Math.tan(p * Ua * .25), y *= 1 - p), p = y * (-g * (Da / Math.tan(l(a, "MFOV", "VFOV") / 114.591559)) / 90), g *= 1 - y);
                    c.r_yoff = p;
                    Ae(c.r_rmatrix, h, g, f);
                    c.r_hlookat = h;
                    c.r_vlookatA = g;
                    c.r_roll = f;
                    kc = 0 == b.simulator && (b.iphone || b.ipad) ? .25 : 1;
                    b.ie && (kc = u.r_zoom / 1E3 * 10);
                    if (b.androidstock || b.android && b.chrome || b.blackberry) kc = u.r_zoom / 1E3 / 4;
                    de = _[345] + K + _[120] + -f + _[107] + (K - z / 2 * kc) + "px) ";
                    c.haschanged = !1
                };
                c.getState = function(a) {
                    null == a && (a = {
                        h: 0,
                        v: 0,
                        z: 0,
                        r: 0,
                        zf: 0,
                        yf: 0,
                        ch: 0,
                        vr: null
                    });
                    a.h = c._hlookat;
                    a.v = c.r_vlookatA;
                    a.z = c.r_zoom;
                    a.r = c._camroll;
                    a.zf = c.r_zoff;
                    a.yf = c.r_yoff;
                    a.ch = c._pannini;
                    return a
                };
                c.defaults()
            },
            Sf = function() {
                var a = this;
                a.defaults = function() {
                    a.usercontrol = "all";
                    a.mouse = "drag";
                    a.touch = "drag";
                    a.drag_oldmode = !1;
                    a.dragrelative = !0;
                    a.draginertia = .1;
                    a.dragfriction = .9;
                    a.movetorelative = !0;
                    a.movetoaccelerate = 1;
                    a.movetospeed = 10;
                    a.movetofriction = .8;
                    a.movetoyfriction = 1;
                    a.keybaccelerate = .5;
                    a.keybspeed = 10;
                    a.keybfriction = .9;
                    a.keybinvert = !1;
                    a.keybfovchange = .75;
                    a.mousefovchange = 1;
                    a.fovspeed = 3;
                    a.fovfriction = .9;
                    a.camrollreset = !0;
                    a.keycodesleft = "37";
                    a.keycodesright = "39";
                    a.keycodesup = "38";
                    a.keycodesdown = "40";
                    a.keycodesin = "";
                    a.keycodesout = "";
                    a.touchzoom = !0;
                    a.zoomtocursor = !1;
                    a.zoomoutcursor = !0;
                    a.disablewheel = !1;
                    a.keydownrepeat = !0;
                    a.bouncinglimits = !1;
                    a.preventTouchEvents = !0
                };
                a.defaults();
                Eb(a, _[443], _[19]);
                Eb(a, _[441], "touch");
                Eb(a, _[272], _[247]);
                Eb(a, _[394], _[348]);
                Eb(a, _[305], _[288]);
                Eb(a, _[287], _[277]);
                Eb(a, _[308], _[328])
            },
            Tf = function() {
                var a = this;
                a.standard = _[5];
                a.dragging = "move";
                a.moving = "move";
                a.hit = _[10];
                a.update = function() {
                    var b = K.down,
                        l = !1,
                        f = $a,
                        e = Bb;
                    e ? f ? (l = f.DATA.handcursor, f == e ? (b = !1, f.capture || (b = K.down && K.moved)) : b = e.capture ? !1 : K.down && K.moved) : b = !e.capture : f && 0 == b && (l = f.DATA.handcursor);
                    f = F(ha.mousetype);
                    V.controllayer.style.cursor = b ? _[17] == f ? a.moving : a.dragging : l ? a.hit : a.standard
                }
            },
            Pf = function() {
                var a = this;
                a.haschanged = !1;
                a.mode = _[64];
                a.pixelx = 0;
                a.pixely = 0;
                a.pixelwidth = 0;
                a.pixelheight = 0;
                ta(a, _[64], _[82]);
                ta(a, "x", "0");
                ta(a, "y", "0");
                ta(a, _[63], "100%");
                ta(a, _[18], "100%");
                ta(a, "left", "0");
                ta(a, "top", "0");
                ta(a, _[3], "0");
                ta(a, _[4], "0");
                a.calc = function(b, l) {
                    var f = 1 / aa,
                        e = _[90] == F(a.mode),
                        n = e ? a._left : a._x,
                        h = e ? a._top : a._y,
                        g = e ? a._right : a._width,
                        u = e ? a._bottom : a._height,
                        n = 0 < n.indexOf("%") ? parseFloat(n) / 100 * b * f : Number(n),
                        g = 0 < g.indexOf("%") ? parseFloat(g) / 100 * b * f : Number(g),
                        h = 0 < h.indexOf("%") ? parseFloat(h) / 100 * l * f : Number(h),
                        u = 0 < u.indexOf("%") ? parseFloat(u) / 100 * l * f : Number(u),
                        n = n / f,
                        h = h / f,
                        g = g / f,
                        u = u / f;
                    e ? (g = b - n - g, u = l - h - u) : (e = F(a._align), 0 <= e.indexOf("left") || (n = 0 <= e.indexOf(_[3]) ? b - g - n : (b - g) / 2 + n), 0 <= e.indexOf("top") || (h = 0 <= e.indexOf(_[4]) ? l - u - h : (l - u) / 2 + h));
                    a.pixelx = Math.round(n * f);
                    a.pixely = Math.round(h * f);
                    e = !1;
                    n = Math.round(g);
                    g = Math.round(u);
                    if (Sa != n || Da != g) e = !0, Sa = n, Da = g;
                    a.pixelwidth = n * f;
                    a.pixelheight = g * f;
                    a.haschanged = !1;
                    return e
                }
            },
            zf = 1,
            dd = zf | 2,
            jc = !1,
            Yf = function() {
                this.ey = this.ex = this.asy = this.asx = this.ay = this.ax = this.oy = this.ox = this.y = this.x = this.h = this.w = this.flags = 0
            },
            Zf = function() {
                this.h = this.w = 0
            },
            yc = function() {
                function a(a, b, c) {
                    G[a] = b;
                    d.__defineGetter__(a, function() {
                        return G[a]
                    });
                    d.__defineSetter__(a, function(b) {
                        b != G[a] && (G[a] = b, d.haschanged_flags |= c, d.GL && (Za = !0))
                    })
                }

                function c() {
                    var a = G.alpha;
                    d.ishotspot && (a *= vc);
                    var b = 255 * a | 0;
                    b == d._aa || d.GL || (d.sprite && (d.sprite.style.opacity = a, d._aa = b), d._poly && (d._poly.style.opacity = a, d._aa = b));
                    G.autoalpha && (a = 0 < a, a != G.visible && (d.visible = a))
                }

                function u() {
                    if (d.sprite && null != G.zorder) {
                        var a = parseInt(G.zorder);
                        !isNaN(a) && 0 <= a ? (d.sprite.style.zIndex = Q + a, d._zdeep = a, d._deepscale = 100 / (200 + a)) : (d._zdeep = 0, d._deepscale = .5)
                    }
                    d.ishotspot && (jc = !0)
                }

                function f() {
                    d.sprite && (d.sprite.style.overflow = G.maskchildren ? _[6] : _[16], U && b.safari && x())
                }

                function e(a, b) {
                    var c = b;
                    b && (c = b = a.DATA.enabled) && _[21] == a.type && (c = 0 != a.DATA.bgcapture);
                    if (a.sprite) {
                        var d = a.sprite.style;
                        d.cursor = c && a.DATA.handcursor ? _[10] : _[5];
                        d.pointerEvents = c ? "auto" : "none";
                        0 == c && a.hovering && (a.hovering = !1, eb === a && (eb = null))
                    }
                    if (c = a._childs) {
                        var f, g;
                        f = c.length;
                        for (d = 0; d < f; d++)(g = c[d]) && g.sprite && e(g, b)
                    }
                }

                function n() {
                    if (d.sprite) {
                        var a = G.enabled;
                        if (a && d._parent) a: {
                            for (a = h(d._parent); a;) {
                                if (0 == a.DATA.enabled || 0 == a.children) {
                                    a = !1;
                                    break a
                                }
                                if (a._parent) a = h(a._parent);
                                else break
                            }
                            a = !0
                        }
                        e(d, a, !0)
                    }
                }

                function h(a) {
                    var b = null;
                    if (a) {
                        var b = a = F(a),
                            c = La,
                            d = a.indexOf("[");
                        0 < d && (b = a.slice(0, d), _[7] == b && (c = db), a = a.slice(d + 1, a.indexOf("]")));
                        if ("stage" == b) return null == Ta.sprite && (Ta.sprite = V.viewerlayer, Ta.loaded = !0), Ta;
                        if (_[533] == b) return null == rb.sprite && (a = Ja(), b = a.style, b.position = _[0], b.width = "100%", b.height = "100%", b.overflow = _[6], b.zIndex = "0", b.pointerEvents = "none", V.controllayer.parentNode.insertBefore(a, V.controllayer), rb.sprite = a, rb.loaded = !0), rb;
                        b = c.getItem(a)
                    }
                    return b
                }

                function g(a) {
                    if (d._parent != a && !d._destroyed) {
                        if (d._parent) {
                            var b = h(d._parent);
                            if (b) {
                                var c = b._childs;
                                if (c) {
                                    var e, f;
                                    f = c.length;
                                    for (e = 0; e < f; e++)
                                        if (c[e] === d) {
                                            c.splice(e, 1);
                                            f--;
                                            break
                                        }
                                    0 == f && (c = null);
                                    b._childs = c;
                                    b.requestUpdate()
                                }
                            }
                        }
                        if (a)
                            if (b = h(a))
                                if (b.sprite) null == b._childs && (b._childs = []), b._use_css_scale = !1, d._use_css_scale = !1, b._childs.push(d), b.sprite.appendChild(d.sprite), b.requestUpdate(), b.haschanged_flags |= 4096;
                                else {
                                    if (b.GL || b.ishotspot && _[65] == b.renderer) {
                                        b.renderer = _[24];
                                        b.processUpdatesHS();
                                        b.requestUpdate();
                                        g(a);
                                        return
                                    }
                                    setTimeout(function() {
                                        d._parent = null;
                                        g(a)
                                    }, 16)
                                }
                        else a = null;
                        null == a && V.pluginlayer.appendChild(d.sprite);
                        d._parent = a;
                        d.requestUpdate();
                        d.haschanged_flags |= 4096
                    }
                }

                function z(a) {
                    (a = this.kobject) && 0 == H && ((a = a.loadingurl) && _[92] == a.slice(0, 5) && 50 < a.length && (a = a.slice(0, 50) + "..."), oa(3, d.getfullpath() + _[106] + a))
                }

                function L() {
                    var a = d.jsplugin,
                        b = d.GL;
                    a && a.unloadplugin && a.unloadplugin();
                    b && b.destroy && b.destroy();
                    d.jsplugin = null;
                    d.GL = null
                }

                function r(a) {
                    P && (hb = Ca(), K.down = !1, gb.trackTouch(a), ka(M, a.type, r, !0), _[2] == a.type ? (ba.body.style.webkitUserSelect = ba.body.style.backupUserSelect, ka(M, _[8], y, !0), ka(M, _[2], r, !0)) : (ka(M, b.browser.events.touchmove, y, !0), ka(M, b.browser.events.touchend, r, !0)), d.process_onup(P, T))
                }

                function y(a, c) {
                    hb = Ca();
                    var d = a.changedTouches && 0 < a.changedTouches.length ? a.changedTouches[0] : a,
                        e = d.pageX,
                        d = d.pageY;
                    !0 === c ? Z = [e, d] : Z ? 0 == T && (e -= Z[0], d -= Z[1], Math.sqrt(e * e + d * d) >= (b.touchdevice ? 11 : 4) && (T = !0)) : (Z = null, ka(M, a.type, y, !0))
                }

                function p(a, c) {
                    var e = a.timeStamp | 0,
                        f = !0;
                    switch (a.type) {
                        case _[44]:
                        case _[12]:
                        case _[22]:
                            1 == c && (e = _[21] == P.type, t(P) && (!e || e && P.DATA.bgcapture) && P.DATA.handcursor && (d.sprite.style.cursor = _[10]));
                            e = P.sprite || P._poly;
                            for (f = 0; e;) {
                                var g = e.kobject;
                                if (g) {
                                    var h = g.DATA.enabled;
                                    0 == b.pointerEvents && (h = t(g));
                                    if (0 == h || 0 < f && 0 == g.children) return;
                                    f++;
                                    e = e.parentNode
                                } else break
                            }
                            for (f = P.sprite || P._poly; f;) {
                                if (g = f.kobject) g.enabled && 0 == g.hovering && (g.hovering = !0, eb = g, 0 == g.pressed && g.DATA.onovercrop && D(g, g.DATA.onovercrop), X.isblocked() || X.callaction(g.onover, g));
                                else break;
                                f = f.parentNode
                            }
                            break;
                        case _[45]:
                        case _[14]:
                        case _[23]:
                            for (e = (f = a.relatedTarget) ? f.kobject : null; f && null == e;)
                                if (f = f.parentNode) e = f.kobject;
                                else break;
                            for (f = P.sprite || P._poly; f;) {
                                if (g = f.kobject) {
                                    for (var h = !1, k = e; k;) {
                                        if (g == k) {
                                            h = !0;
                                            break
                                        }
                                        if (k.sprite && k.sprite.parentNode) k = k.sprite.parentNode.kobject;
                                        else break
                                    }
                                    if (0 == h) 1 == g.hovering && (g.hovering = !1, eb === g && (eb = null), 0 == g.pressed && g.DATA.onovercrop && D(g, g.DATA.crop), X.callaction(g.onout, g));
                                    else break
                                } else break;
                                f = f.parentNode
                            }
                            break;
                        case _[9]:
                            V.focus(2);
                            hb = Ca();
                            if (500 < e && 500 > e - Kb) {
                                Kb = 0;
                                break
                            }
                            if (f = 0 == (a.button | 0)) ba.body.style.backupUserSelect = ba.body.style.webkitUserSelect, ba.body.style.webkitUserSelect = "none", K.down = !0, y(a, !0), ca(M, _[2], r, !0), ca(M, _[8], y, !0), d.process_ondown(P);
                            break;
                        case b.browser.events.touchstart:
                            V.focus(2);
                            hb = Ca();
                            Kb = e;
                            gb.trackTouch(a);
                            if (gb.isMultiTouch()) break;
                            T = !1;
                            if (f = 0 == (a.button | 0)) y(a, !0), ca(M, b.browser.events.touchend, r, !0), ca(M, b.browser.events.touchmove, y, !0), P.pressed = !0, P.DATA.ondowncrop && D(P, P.DATA.ondowncrop), X.isblocked() || X.callaction(P.ondown, P)
                    }
                }

                function v(a, b) {
                    if (a === b) return !1;
                    for (; b && b !== a;) b = b.parentNode;
                    return b === a
                }

                function t(a) {
                    if (a.DATA.enabled) {
                        for (a = a.sprite; a;)
                            if ((a = a.parentNode) && a.kobject && 0 == a.kobject.DATA.enabled) return !1;
                        return !0
                    }
                    return !1
                }

                function q(a) {
                    var c = a.type;
                    if (_[9] != c && c != b.browser.events.touchstart || !X.isblocked()) {
                        var e = a.target.kobject;
                        _[44] == c ? c = _[12] : _[45] == c && (c = _[14]);
                        null == e && (e = d);
                        if ((_[12] != c && _[14] != c || 4 == a.pointerType || _[19] == a.pointerType) && e) {
                            var e = a.timeStamp,
                                f = d._eP;
                            e != d._eT && (f = 0);
                            if (_[22] == c || _[12] == c) {
                                var g = a.relatedTarget;
                                if (this === g || v(this, g)) return
                            } else if (_[23] == c || _[14] == c)
                                if (g = a.relatedTarget, this === g || v(this, g)) return;
                            _[22] == c && 0 == d.hovering ? f = 0 : _[23] == c && 1 == d.hovering && (f = 0);
                            c = G.enabled;
                            0 == b.pointerEvents && (c = t(d));
                            if (c && (!U || U && G.bgcapture)) 0 == d.children && a.stopPropagation(), 0 == f && (0 == d.children && 1 == a.eventPhase || 2 <= a.eventPhase) && (f = 1, d.jsplugin && d.jsplugin.hittest && (c = V.getMousePos(a.changedTouches ? a.changedTouches[0] : a, d.sprite), d.jsplugin.hittest(c.x * d.imagewidth / d.pixelwidth, c.y * d.imageheight / d.pixelheight) || (f = 2)), 1 == f && (P = d, p(a), d.capture && (null != d.jsplugin && v(V.controllayer, d.sprite) || 0 == (a.target && "A" == a.target.nodeName) && na(a), a.stopPropagation())));
                            else if (0 == b.pointerEvents && ba.msElementsFromPoint && 0 == f && 2 == a.eventPhase && (g = a.type, c = _[2] == g || _[23] == g || _[45] == g || _[14] == g || g == b.browser.events.touchend, _[9] == g || _[22] == g || _[44] == g || _[12] == g || g == b.browser.events.touchstart || c) && (g = ba.msElementsFromPoint(a.clientX, a.clientY))) {
                                var h = [],
                                    k, l, q = null,
                                    q = null;
                                for (k = 0; k < g.length; k++)
                                    if (q = g[k], q = q.kobject) h.push(q);
                                    else break;
                                c && n();
                                if (c && Y)
                                    for (k = 0; k < Y.length; k++) {
                                        var q = Y[k],
                                            r = !1;
                                        for (l = 0; l < h.length; l++) h[l] === q && (r = !0);
                                        0 == r && (f = 1, P = q, p(a, !0), q.capture && (null == d.jsplugin && na(a), a.stopPropagation()))
                                    }
                                for (k = 0; k < g.length; k++)
                                    if (q = g[k], q = q.kobject) {
                                        if (l = _[21] == q.type, 1 == (t(q) && (!l || l && q.DATA.bgcapture)) || c)
                                            if (f = 1, P = q, p(a, !0), q.capture) {
                                                null == d.jsplugin && na(a);
                                                a.stopPropagation();
                                                break
                                            }
                                    } else break;
                                Y = h
                            }
                            d._eT = e;
                            d._eP = f
                        }
                    }
                }

                function x() {
                    var a = d.sprite;
                    if (a) {
                        var a = a.style,
                            c = Number(G.bgcolor),
                            e = Number(G.bgalpha),
                            f = aa;
                        isNaN(c) && (c = 0);
                        isNaN(e) && (e = 0);
                        var g = ("" + G.bgborder).split(" "),
                            h = Vb(g[0], f, ","),
                            k = g[1] | 0,
                            g = Number(g[2]);
                        isNaN(g) && (g = 1);
                        if (h[0] != ea[0] || h[3] != ea[3]) ea = h, d.requestUpdate();
                        0 == e ? a.background = "none" : a.backgroundColor = wa(c, e);
                        var c = Vb(d.bgroundedge, f * G.scale, " "),
                            e = "",
                            n = d.bgshadow;
                        if (n) {
                            var l = ("" + n).split(","),
                                p, q;
                            q = l.length;
                            for (p = 0; p < q; p++) {
                                var r = ya(l[p]).split(" "),
                                    t = r.length;
                                if (4 < t) {
                                    var u = 5 < t ? 1 : 0;
                                    "" != e && (e += ", ");
                                    e += r[0] * f + "px " + r[1] * f + "px " + r[2] * f + "px " + (u ? r[3] * f : 0) + "px " + wa(r[3 + u] | 0, r[4 + u]) + (6 < t ? " " + r[6] : "")
                                }
                            }
                        }
                        if (b.safari || b.ios) a.webkitMaskImage = G.maskchildren && !n && 0 < c[0] + c[1] + c[2] + c[3] ? _[177] : "";
                        a[jd] = e;
                        a.borderStyle = "solid";
                        a.borderColor = wa(k, g);
                        a.borderWidth = h.join("px ") + "px";
                        a.borderRadius = c.join("px ") + "px"
                    }
                }

                function J(a) {
                    this.ss = aa;
                    this.onresize = function(b, c) {
                        a.imagewidth = a.pixelwidth / a.DATA.scale;
                        a.imageheight = a.pixelheight / a.DATA.scale;
                        var d = 65536;
                        this.ss != aa && (this.ss = aa, d |= 16384);
                        a.haschanged_flags |= d;
                        return !1
                    }
                }

                function B() {
                    if (d._ready) {
                        var a = pa.parsePath(G.url),
                            b = a,
                            c = "";
                        if (!(d.loading && d.loadingurl == a || d.loadedurl == a)) {
                            var e = b.indexOf("?");
                            0 < e && (b = b.slice(0, e));
                            e = b.indexOf("#");
                            0 < e && (b = b.slice(0, e));
                            e = b.lastIndexOf(".");
                            0 < e && (c = F(b.slice(e + 1)));
                            L();
                            H = !1;
                            d.loading = !0;
                            d.loaded = !1;
                            d.loadedurl = null;
                            d.createLoader();
                            if (_[74] == b) U = H = !0, d.loading = !1, d.loaded = !0, d.loadedurl = a, d.createVars([_[513], d.bgcolor ? Number(d.bgcolor) : 0, 16384, _[512], d.bgalpha ? Number(d.bgalpha) : 0, 16384, _[358], d.bgroundedge ? d.bgroundedge : "0", 16384, _[467], d.bgborder ? d.bgborder : "0", 16384, _[468], d.bgshadow ? d.bgshadow : "", 16384, _[430], ma(d.bgcapture), 4096]), d.haschanged_flags |= 4096, d.haschanged_flags |= 16384, d.jsplugin = new J(d), A();
                            else if (0 <= a.indexOf(_[313])) {
                                H = !0;
                                d.loading = !1;
                                d.loaded = !0;
                                d.loadedurl = a;
                                var f = new $f;
                                f.registerplugin(l, d.getfullpath(), d);
                                d.jsplugin = f;
                                0 == d._dyn ? A() : setTimeout(function() {
                                    f.updatehtml();
                                    A()
                                }, 7)
                            } else "js" == c ? (H = !0, d.loadingurl = a, pa.loadfile2(a, _[108], function(b) {
                                d.loading = !1;
                                d.loaded = !0;
                                d.loadedurl = a;
                                b = b.data;
                                if (null != b) {
                                    var c = 'the file "' + a + '" is not a krpano plugin!';
                                    try {
                                        eval(b + ";")
                                    } catch (e) {
                                        c = 'parsing "' + a + '" failed: ' + e
                                    }
                                    _[15] == typeof krpanoplugin ? (b = new krpanoplugin, b.registerplugin(l, d.getfullpath(), d), d.jsplugin = b, A()) : oa(3, c)
                                }
                            })) : "swf" == c ? (d.loading = !1, d.loaded = !1, oa(2, d.getfullpath() + _[208] + ed(a))) : (d.loaded && d.preload && (d._ispreload = !0, d.preload = !1, d.onloaded = null), pa.DMcheck(a) ? (d.loading = !0, d.loaded = !1, d.loadingurl = a, d.loader.src = a) : (d.loading = !1, oa(3, d.getfullpath() + _[106] + a)))
                        }
                    }
                }

                function D(a, b) {
                    var c = 0,
                        e = 0,
                        f = a.loader;
                    if (f && (c = f.naturalWidth, e = f.naturalHeight, a.ishotspot)) switch (a.stereo) {
                        case "SBS":
                            c >>= 1;
                            break;
                        case "TB":
                            e >>= 1
                    }
                    b && (b = String(b).split("|"), 4 == b.length && (c = b[2], e = b[3]));
                    null == a.jsplugin && 0 == a._isNE() && (a.imagewidth = c, a.imageheight = e, f = a._gOSF(), f & 1 && (a.DATA.width = String(c)), f & 2 && (a.DATA.height = String(e)));
                    a.haschanged_flags |= 128;
                    d.GL && (Za = !0)
                }

                function A() {
                    1 != d._destroyed && (d.loading = !1, d.loaded = !0, 0 == H && (d.loadedurl = d.loadingurl), d.jsplugin ? k() : d.haschanged_flags |= 2, Za = !0)
                }

                function k() {
                    d.sprite && (0 == H ? d.sprite.style.backgroundImage = 'url("' + d.loader.src + '")' : d.sprite.style.background = "none");
                    D(d, G.crop);
                    d.requestUpdate(dd);
                    O = !0;
                    0 == H && null == d.parent && null == d._childs && (d._use_css_scale = !0);
                    d.ishotspot || d.updatepluginpos();
                    X.callaction(null != d.altonloaded ? d.altonloaded : d.onloaded, d, !0)
                }
                var d = this;
                d.prototype = id;
                this.prototype.call(this);
                var G = d.DATA = {};
                d._type = _[60];
                d.layer = d.plugin = new pb(yc);
                d.haschanged_flags = 0;
                d.renderer_flags = 0;
                var E = new Yf,
                    R = new Zf;
                d.createVars = function(b) {
                    var c, d = b.length;
                    for (c = 0; c < d; c += 3) a(b[c], b[c + 1], b[c + 2])
                };
                var Q = 0,
                    N = 3,
                    T = !1,
                    H = !1,
                    U = !1,
                    ea = [0, 0, 0, 0],
                    O = !1,
                    Z = null,
                    P = null,
                    Y = null,
                    W = null;
                d._isNE = function() {
                    return H
                };
                d._gOSF = function() {
                    return N
                };
                d.haveUserWidth = function() {
                    return 0 == (N & 1) || 0 != (d.haschanged_flags & 32)
                };
                d.haveUserHeight = function() {
                    return 0 == (N & 2) || 0 != (d.haschanged_flags & 64)
                };
                d.__defineGetter__("type", function() {
                    return _[74] == d.url ? _[21] : _[94]
                });
                d.__defineSetter__("type", function(a) {
                    _[21] == F(a) && (d.url = _[74])
                });
                d.sprite = null;
                d.loader = null;
                d.jsplugin = null;
                d.ishotspot = !1;
                d._ready = !1;
                d._dyn = !1;
                d._use_css_scale = !1;
                d._hszscale = 1;
                d._eT = 0;
                d._eP = 0;
                d._pCD = !1;
                d._deepscale = .5;
                d._zdeep = 0;
                d._childs = null;
                d._parent = null;
                d.__defineGetter__(_[159], function() {
                    return d._parent
                });
                d.__defineSetter__(_[159], function(a) {
                    if (null == a || "" == a || "null" == F(a)) a = null;
                    d.sprite ? g(a) : d._parent = a
                });
                d.MX = Ra();
                d.GL = null;
                d.imagewidth = 0;
                d.imageheight = 0;
                d.forceresize = !1;
                d.pixelwidth = 0;
                d.pixelheight = 0;
                d.pixelx = 0;
                d.pixely = 0;
                d._pxw = 0;
                d._pxh = 0;
                d._finalxscale = 1;
                d._finalyscale = 1;
                d._ispreload = !1;
                d.loading = !1;
                d.loaded = !1;
                d.loadingurl = null;
                d.loadedurl = null;
                d.pressed = !1;
                d.hovering = !1;
                d.preload = !1;
                d.keep = !1;
                d.style = null;
                d.capture = !0;
                d.children = !0;
                d.accuracy = 0;
                d.onloaded = null;
                d.altonloaded = null;
                d.maxwidth = 0;
                d.minwidth = 0;
                d.maxheight = 0;
                d.minheight = 0;
                d.onover = null;
                d.onhover = null;
                d.onout = null;
                d.onclick = null;
                d.ondown = null;
                d.onup = null;
                d.onloaded = null;
                d.createVars(["url", null, 1, _[16], !0, 4, _[63], null, 32, _[18], null, 64, "scale", 1, 16, _[568], 0, 8, "x", null, 512, "y", null, 512, "ox", null, 256, "oy", null, 256, _[64], null, 1024, "edge", null, 1024, _[567], null, 2048, _[326], !1, 32768, _[309], !1, 65536, "alpha", 1, 8192, _[440], !1, 8192, "crop", null, 128, _[377], null, 0, _[376], null, 0, _[494], !0, 4096, _[374], !0, 4096]);
                d.getrenderer = function() {
                    return R
                };
                d.getparsed = function() {
                    return E
                };
                d.API_calcsize = function(a) {
                    a = d.ishotspot;
                    var b = aa,
                        c = Sa,
                        e = Da;
                    a && (b = 1, c = e = 1E3);
                    var f = d.imagewidth,
                        g = d.imageheight,
                        h = E.flags,
                        k = G.scale,
                        n = E.w,
                        l = E.h;
                    0 == (h & 3) ? n = f : 2 == (h & 3) && (n *= c / b / 1);
                    0 == (h & 12) ? l = g : 8 == (h & 12) && (l *= e / b / 1);
                    n *= b;
                    l *= b;
                    0 > n && (n = c / 1 + n, 0 > n && (n = 0));
                    0 > l && (l = e / 1 + l, 0 > l && (l = 0));
                    3 == (h & 3) ? n = 0 != g ? l * f / g : 0 : 12 == (h & 12) && (l = 0 != f ? n * g / f : 0);
                    0 < d.maxwidth && n > b * d.maxwidth && (n = b * d.maxwidth);
                    0 < d.minwidth && n < b * d.minwidth && (n = b * d.minwidth);
                    0 < d.maxheight && l > b * d.maxheight && (l = b * d.maxheight);
                    0 < d.minheight && l < b * d.minheight && (l = b * d.minheight);
                    n = n * k * 1;
                    l = l * k * 1;
                    a || 0 != d.accuracy || (n = Ub(n), l = Ub(l));
                    R.w = n;
                    R.h = l;
                    return R
                };
                d.loadstyle = function(a) {
                    X.assignstyle(d.getfullpath(), a)
                };
                d.getmouse = function(a) {
                    var b = 0,
                        c = 0;
                    if (c = d.sprite) {
                        var e = V.controllayer,
                            f = e.getBoundingClientRect(),
                            g = c.getBoundingClientRect(),
                            b = K.x - g.left - c.clientLeft + f.left + e.clientLeft,
                            c = K.y - g.top - c.clientTop + f.top + e.clientTop;
                        a && (b = b * d.imagewidth / d.pixelwidth, c = c * d.imageheight / d.pixelheight);
                        return {
                            x: b,
                            y: c
                        }
                    }
                    return null
                };
                d._assignEvents = function(a, c) {
                    c || (c = "add");
                    gb.touch && (jb(c, a, b.browser.events.touchstart, q, !0), jb(c, a, b.browser.events.touchstart, q, !1));
                    gb.mouse && (jb(c, a, _[9], q, !0), jb(c, a, _[9], q, !1));
                    b.desktop && (gb.mouse || b.ie) && (0 == gb.mouse && b.ie ? (jb(c, a, b.browser.events.pointerover, q, !0), jb(c, a, b.browser.events.pointerover, q, !1), jb(c, a, b.browser.events.pointerout, q, !0), jb(c, a, b.browser.events.pointerout, q, !1)) : (jb(c, a, _[22], q, !0), jb(c, a, _[22], q, !1), jb(c, a, _[23], q, !0), jb(c, a, _[23], q, !1)))
                };
                d.createLoader = function() {
                    var a = d.loader;
                    a && "" != a.src && (d.destroyLoader(), a = null);
                    a || (a = Ja(1), a.kobject = d, ca(a, _[40], z, !0), ca(a, "load", A, !1), d.loader = a)
                };
                d.destroyLoader = function() {
                    var a = d.loader;
                    a && (a.kobject = null, ka(a, _[40], z, !0), ka(a, "load", A, !1), d.loader = null)
                };
                d.createSprite = function() {
                    if (!d.sprite) {
                        var a = Ja(),
                            b = a.style;
                        a.kobject = d;
                        b.display = "none";
                        b.position = _[0];
                        Wb && (b.outline = _[95]);
                        b.zIndex = Q;
                        d.sprite = a;
                        d._assignEvents(a);
                        f();
                        c();
                        u();
                        d.haschanged_flags |= 4096;
                        ge++
                    }
                };
                d.destroySprite = function() {
                    var a = d.sprite;
                    a && (a.parentNode && a.parentNode.removeChild(a), a.style.background = "none", d._assignEvents(a, _[565]), a.kobject = null, d.sprite = null, ge--)
                };
                d.create = function() {
                    d._pCD = !0;
                    Q = d.ishotspot ? 2001 : 3001;
                    d.alturl && (d.url = d.alturl, delete d.alturl);
                    d.altscale && (d.scale = d.altscale, delete d.altscale);
                    d.createLoader();
                    d.ishotspot || d.createSprite();
                    var a = d._parent;
                    a && (d._parent = null, g(a));
                    d._ready = !0
                };
                d.destroy = function() {
                    eb === d && (eb = null);
                    L();
                    d.destroyLoader();
                    d.jsplugin = null;
                    d.loaded = !1;
                    d._destroyed = !0;
                    d.parent = null;
                    var a = d._childs;
                    if (a) {
                        var b, c, a = a.slice();
                        c = a.length;
                        for (b = 0; b < c; b++) a[b].parent = null;
                        d._childs = null
                    }
                    d.destroySprite()
                };
                d.getfullpath = function() {
                    return d._type + "[" + d.name + "]"
                };
                d.changeorigin = function() {
                    var a = arguments,
                        b = null,
                        c = null;
                    if (0 < a.length) {
                        var e = null,
                            f = 0,
                            g = 0,
                            k = 0,
                            n = 0,
                            l = aa,
                            p = Sa / l,
                            q = Da / l,
                            r = d._parent;
                        r && (r = h(r)) && (0 == d._use_css_scale ? (p = r._pxw * l, q = r._pxh * l) : (p = r.imagewidth * l, q = r.imageheight * l));
                        l = d.imagewidth;
                        r = d.imageheight;
                        b = 0;
                        e = String(G.width);
                        "" != e && null != e && (0 < e.indexOf("%") ? l = parseFloat(e) / 100 * p : "prop" == e.toLowerCase() ? b = 1 : l = e);
                        e = String(G.height);
                        "" != e && null != e && (0 < e.indexOf("%") ? r = parseFloat(e) / 100 * q : "prop" == e.toLowerCase() ? b = 2 : r = e);
                        1 == b ? l = r * d.imagewidth / d.imageheight : 2 == b && (r = l * d.imageheight / d.imagewidth);
                        b = c = F(a[0]);
                        1 < a.length && (c = F(a[1]));
                        var a = String(G.align),
                            t = G.edge ? F(G.edge) : "null";
                        if ("null" == t || _[564] == t) t = a;
                        (e = String(G.x)) && (f = 0 < e.indexOf("%") ? parseFloat(e) / 100 * p : parseFloat(e));
                        isNaN(f) && (f = 0);
                        (e = String(G.y)) && (g = 0 < e.indexOf("%") ? parseFloat(e) / 100 * q : parseFloat(e));
                        isNaN(g) && (g = 0);
                        if (e = a) k = 0 <= e.indexOf("left") ? 0 + f : 0 <= e.indexOf(_[3]) ? p - f : p / 2 + f, n = 0 <= e.indexOf("top") ? 0 + g : 0 <= e.indexOf(_[4]) ? q - g : q / 2 + g;
                        1 != G.scale && (l *= G.scale, r *= G.scale);
                        k = 0 <= t.indexOf("left") ? k + 0 : 0 <= t.indexOf(_[3]) ? k + -l : k + -l / 2;
                        n = 0 <= t.indexOf("top") ? n + 0 : 0 <= t.indexOf(_[4]) ? n + -r : n + -r / 2;
                        e = a = 0;
                        a = 0 <= b.indexOf("left") ? 0 + f : 0 <= b.indexOf(_[3]) ? p - f : p / 2 + f;
                        e = 0 <= b.indexOf("top") ? 0 + g : 0 <= b.indexOf(_[4]) ? q - g : q / 2 + g;
                        a = 0 <= c.indexOf("left") ? a + 0 : 0 <= c.indexOf(_[3]) ? a + -l : a + -l / 2;
                        e = 0 <= c.indexOf("top") ? e + 0 : 0 <= c.indexOf(_[4]) ? e + -r : e + -r / 2;
                        d.align = b;
                        d.edge = c;
                        0 <= b.indexOf(_[3]) ? d.x = String(f + a - k) : d.x = String(f - a + k);
                        0 <= b.indexOf(_[4]) ? d.y = String(g + e - n) : d.y = String(g - e + n)
                    }
                };
                d.requestUpdate = function(a) {
                    d.poschanged = !0;
                    a && (d.renderer_flags |= a);
                    d.GL && (Za = !0)
                };
                d.resetsize = function() {
                    if (d.loaded) {
                        var a = d.imagewidth,
                            b = d.imageheight;
                        G.width = String(a);
                        G.height = String(b);
                        N = 3;
                        var c = G.crop;
                        d.pressed && G.ondowncrop ? c = G.ondowncrop : d.hovering && G.onovercrop && (c = G.onovercrop);
                        c && (D(d, c), a = d.imagewidth, b = d.imageheight);
                        E.w = a;
                        E.h = b;
                        E.flags = E.flags & -16 | 5;
                        d.requestUpdate(dd)
                    }
                };
                d.registersize = function(a, b) {
                    null != a && (G.width = String(a), E.w = Number(a), E.flags = E.flags & -4 | 1);
                    null != b && (G.height = String(b), E.h = Number(b), E.flags = E.flags & -13 | 4);
                    d.requestUpdate(dd)
                };
                d.registercontentsize = function(a, b) {
                    null != a && (d.ishotspot && "SBS" == d.stereo && (a *= .5), d.imagewidth = Number(a), N & 1 && 0 == (d.haschanged_flags & 32) && (G.width = String(a), E.w = Number(a), E.flags = E.flags & -4 | 1));
                    null != b && (d.ishotspot && "TB" == d.stereo && (b *= .5), d.imageheight = Number(b), N & 2 && 0 == (d.haschanged_flags & 64) && (G.height = String(b), E.h = Number(b), E.flags = E.flags & -13 | 4));
                    d.requestUpdate(dd)
                };
                d.process_ondown = function(a) {
                    a || (a = d);
                    T = !1;
                    a.pressed = !0;
                    a.DATA.ondowncrop && D(a, a.DATA.ondowncrop);
                    X.isblocked() || X.callaction(a.ondown, a)
                };
                d.process_onup = function(a, b) {
                    a || (a = d);
                    if (a.pressed) {
                        a.pressed = !1;
                        if (a.DATA.ondowncrop || a.DATA.onovercrop) a.hovering && a.DATA.onovercrop ? D(a, a.DATA.onovercrop) : D(a, a.DATA.crop);
                        X.callaction(a.onup, a);
                        b || X.isblocked() || X.callaction(a.onclick, a)
                    }
                };
                d.updateCrop = D;
                d.processUpdates = function() {
                    if (d.haschanged_flags & 96) {
                        var a = d.haschanged_flags;
                        if (a & 32) {
                            var b = G.width,
                                e = 0,
                                g = _[1] === typeof b,
                                h = parseFloat(b);
                            0 == 0 * h ? (N &= -2, g && 0 < b.indexOf("%") ? (h /= 100, e = 2) : e = 1) : g && "prop" == b.toLowerCase() ? (h = 0, e = 3, N &= -2) : (G.width = null, N |= 1, h = 0);
                            E.w = h;
                            E.flags = E.flags & -4 | e
                        }
                        a & 64 && (a = G.height, b = 0, e = _[1] === typeof a, g = parseFloat(a), 0 == 0 * g ? (N &= -3, e && 0 < a.indexOf("%") ? (g /= 100, b = 8) : b = 4) : e && "prop" == a.toLowerCase() ? (g = 0, b = 12, N &= -3) : (G.height = null, N |= 2, g = 0), E.h = g, E.flags = E.flags & -13 | b);
                        d.requestUpdate(dd);
                        U && x();
                        d.haschanged_flags &= -97
                    }
                    if (d.haschanged_flags & 1) {
                        d.haschanged_flags &= -2;
                        a = G.url;
                        if ("" == a || "null" == a) G.url = a = null;
                        null != a ? B() : (L(), d.jsplugin = null, d.loadedurl = null, d.loadingurl = null, d.loading = !1, d.loaded = !1)
                    }
                    d.haschanged_flags & 2 && (d.haschanged_flags &= -3, k());
                    d.haschanged_flags & 4 && (d.haschanged_flags &= -5, (a = G.visible) && d.ishotspot && (Za = !0), 0 == a && eb === d && (eb = null), d._poly && (d._poly.style.visibility = a ? _[16] : _[6]), d.sprite && (b = !0, d.jsplugin && d.jsplugin.onvisibilitychanged && (b = !0 !== d.jsplugin.onvisibilitychanged(a)), b && (0 == a ? d.sprite.style.display = "none" : d.requestUpdate())));
                    d.haschanged_flags & 16 && (d.haschanged_flags &= -17, d.requestUpdate());
                    d.haschanged_flags & 8 && (d.haschanged_flags &= -9, d.requestUpdate());
                    d.haschanged_flags & 128 && (D(d, G.crop), d.requestUpdate(dd), d.haschanged_flags &= -129);
                    if (d.haschanged_flags & 256) {
                        d.haschanged_flags &= -257;
                        var a = G.ox,
                            b = G.oy,
                            e = _[1] === typeof a,
                            g = _[1] === typeof b,
                            h = 0,
                            l = parseFloat(a),
                            p = parseFloat(b);
                        0 == 0 * l ? e && 0 < a.indexOf("%") && (l /= 100, h |= 64) : (l = 0, G.ox = null);
                        0 == 0 * p ? g && 0 < b.indexOf("%") && (p /= 100, h |= 128) : (p = 0, G.oy = null);
                        E.ox = l;
                        E.oy = p;
                        E.flags = E.flags & -193 | h;
                        d.requestUpdate(2)
                    }
                    d.haschanged_flags & 512 && (d.haschanged_flags &= -513, a = G.x, b = G.y, e = _[1] === typeof a, g = _[1] === typeof b, h = 0, l = parseFloat(a), p = parseFloat(b), 0 == 0 * l ? e && 0 < a.indexOf("%") && (l /= 100, h |= 16) : (l = 0, G.x = null), 0 == 0 * p ? g && 0 < b.indexOf("%") && (p /= 100, h |= 32) : (p = 0, G.y = null), E.x = l, E.y = p, E.flags = E.flags & -49 | h, d.requestUpdate(2));
                    if (d.haschanged_flags & 1024) {
                        d.haschanged_flags &= -1025;
                        a = G.align;
                        b = G.edge;
                        a && "" != a || (a = _[82]);
                        b && "" != b || (b = a);
                        var a = F(a),
                            b = F(b),
                            g = e = .5,
                            l = h = 1,
                            q = p = .5;
                        0 <= a.indexOf("left") ? e = 0 : 0 <= a.indexOf(_[3]) && (e = 1, h = -1);
                        0 <= a.indexOf("top") ? g = 0 : 0 <= a.indexOf(_[4]) && (g = 1, l = -1);
                        0 <= b.indexOf("left") ? p = 0 : 0 <= b.indexOf(_[3]) && (p = 1);
                        0 <= b.indexOf("top") ? q = 0 : 0 <= b.indexOf(_[4]) && (q = 1);
                        E.ax = e;
                        E.ay = g;
                        E.asx = h;
                        E.asy = l;
                        E.ex = p;
                        E.ey = q;
                        d.requestUpdate(2)
                    }
                    d.haschanged_flags & 2048 && (d.haschanged_flags &= -2049, u());
                    d.haschanged_flags & 4096 && (d.haschanged_flags &= -4097, n());
                    d.haschanged_flags & 8192 && (d.haschanged_flags &= -8193, c());
                    d.haschanged_flags & 32768 && (d.haschanged_flags &= -32769, f());
                    d.haschanged_flags & 16384 && (d.haschanged_flags &= -16385, x());
                    d.haschanged_flags & 65536 && (d.haschanged_flags &= -65537, O = !0, d.requestUpdate());
                    d.ishotspot && d.processUpdatesHS()
                };
                d.updatepluginpos = d.updatepos = function(a) {
                    if (!(1 > Ya) && (a = d.sprite)) {
                        var c = aa,
                            e = Sa,
                            f = Da;
                        0 != d.haschanged_flags && d.processUpdates();
                        var g = d.loader;
                        if (g && 0 == d.loaded) a.style.display = "none";
                        else if (d.poschanged = !1, a && (g || 0 != H)) {
                            H && (g = null);
                            var k = d.ishotspot,
                                n = G.scale,
                                l = d._use_css_scale,
                                p = d.imagewidth,
                                q = d.imageheight;
                            if (g && (0 >= p || 0 >= q)) a.style.display = "none";
                            else {
                                var r = !1,
                                    t = G.crop;
                                d.pressed && G.ondowncrop ? t = G.ondowncrop : d.hovering && G.onovercrop && (t = G.onovercrop);
                                t && (t = String(t).split("|"), 4 == t.length ? (t[0] |= 0, t[1] |= 0, t[2] |= 0, t[3] |= 0) : t = null);
                                var u = d.scale9grid;
                                u && (u = String(u).split("|"), 4 <= u.length ? (u[0] |= 0, u[1] |= 0, u[2] |= 0, u[3] |= 0, l = d._use_css_scale = !1, G.scalechildren = !1) : u = null);
                                k && d.distorted && (c = 1, e = f = 1E3);
                                var v = 1,
                                    w = 1,
                                    x = d._parent,
                                    z = !0;
                                if (x) {
                                    var y = h(x);
                                    y ? (y.poschanged && y.updatepos(d.getfullpath() + _[493]), 0 == l ? (e = y._pxw * c, f = y._pxh * c) : (e = y.imagewidth * c, f = y.imageheight * c), y.DATA.scalechildren ? (v = 0 != y.imagewidth ? e / c / y.imagewidth : 1, w = 0 != y.imageheight ? f / c / y.imageheight : 1) : (v *= y._finalxscale, w *= y._finalyscale), 0 == y.loaded && (z = !1, a.style.display = "none")) : oa(3, 'no parent "' + x + '" found')
                                }
                                var B = E.flags,
                                    A = E.w,
                                    D = E.h,
                                    F = E.x,
                                    J = E.y,
                                    x = E.ox,
                                    K = E.oy;
                                0 == (B & 3) ? A = p : 2 == (B & 3) && (A *= e / c / v);
                                0 == (B & 12) ? D = q : 8 == (B & 12) && (D *= f / c / w);
                                A *= c;
                                D *= c;
                                0 > A && (A = e / v + A, 0 > A && (A = 0));
                                0 > D && (D = f / w + D, 0 > D && (D = 0));
                                3 == (B & 3) ? A = 0 != q ? D * p / q : 0 : 12 == (B & 12) && (D = 0 != p ? A * q / p : 0);
                                0 < d.maxwidth && A > c * d.maxwidth && (A = c * d.maxwidth);
                                0 < d.minwidth && A < c * d.minwidth && (A = c * d.minwidth);
                                0 < d.maxheight && D > c * d.maxheight && (D = c * d.maxheight);
                                0 < d.minheight && D < c * d.minheight && (D = c * d.minheight);
                                A = A * v * n;
                                D = D * w * n;
                                k || 0 != d.accuracy || (A = Ub(A), D = Ub(D));
                                F *= B & 16 ? e : c * v;
                                J *= B & 32 ? f : c * w;
                                n = d._hszscale;
                                x *= B & 64 ? A * n : v * c;
                                K *= B & 128 ? D * n : w * c;
                                d._oxpix = x;
                                d._oypix = K;
                                var T = 0 != p ? A / p : 0,
                                    N = 0 != q ? D / q : 0,
                                    n = T,
                                    B = N,
                                    R = A / c,
                                    L = D / c;
                                if (R != d._pxw || L != d._pxh) d._pxw = R, d._pxh = L, d.pixelwidth = R / v, d.pixelheight = L / w, r = !0;
                                G.scalechildren ? (d._finalxscale = T, d._finalyscale = N) : (d._finalxscale = v, d._finalyscale = w);
                                l ? (a.style.width = p + "px", a.style.height = q + "px", T = N = 1) : (a.style.width = A + "px", a.style.height = D + "px");
                                if (g)
                                    if (u) {
                                        var T = u,
                                            N = A,
                                            R = D,
                                            P = t,
                                            t = d.sprite,
                                            p = d.loader,
                                            Q, L = aa;
                                        5 == T.length && (L *= Number(T[4]));
                                        Q = p.naturalWidth;
                                        g = p.naturalHeight;
                                        null == P && (P = [0, 0, Q, g]);
                                        p = 'url("' + p.src + '")';
                                        if (null == W)
                                            for (W = Array(9), u = 0; 9 > u; u++) q = Ja(), q.kobject = d, q.imgurl = null, q.style.position = _[0], q.style.overflow = _[6], W[u] = q, t.appendChild(q);
                                        for (var u = [P[0] + 0, P[0] + T[0], P[0] + T[0] + T[2], P[0] + P[2]], v = [P[1] + 0, P[1] + T[1], P[1] + T[1] + T[3], P[1] + P[3]], w = [T[0], T[2], P[2] - T[0] - T[2]], T = [T[1], T[3], P[3] - T[1] - T[3]], N = [w[0] * L | 0, N - ((w[0] + w[2]) * L | 0), w[2] * L | 0], Z = [T[0] * L | 0, R - ((T[0] + T[2]) * L | 0), T[2] * L | 0], U = [0, N[0], N[0] + N[1]], V = [0, Z[0], Z[0] + Z[1]], X, Y, P = 0; 3 > P; P++)
                                            for (L = 0; 3 > L; L++) q = W[3 * P + L], R = q.style, X = 0 != w[L] ? N[L] / w[L] : 0, Y = 0 != T[P] ? Z[P] / T[P] : 0, q.imgurl != p && (q.imgurl = p, R.backgroundImage = p), q = b.mac && b.firefox ? M.devicePixelRatio : 1, R[ke] = (Q * X * q | 0) / q + "px " + (g * Y * q | 0) / q + "px", R.backgroundPosition = (-u[L] * X * q | 0) / q + "px " + (-v[P] * Y * q | 0) / q + "px", R.left = U[L] + "px", R.top = V[P] + "px", R.width = N[L] + "px", R.height = Z[P] + "px";
                                        t.style.background = "none"
                                    } else {
                                        if (W && (p = d.sprite)) {
                                            try {
                                                for (Q = 0; 9 > Q; Q++) W[Q].kobject = null, p.removeChild(W[Q])
                                            } catch (ba) {}
                                            W = null;
                                            d.loader && (p.style.backgroundImage = 'url("' + d.loader.src + '")')
                                        }
                                        a.style.backgroundPosition = t ? -t[0] * T + "px " + -t[1] * N + "px" : "0 0";
                                        a.style[ke] = g.naturalWidth * T + "px " + g.naturalHeight * N + "px"
                                    }
                                d.jsplugin && d.jsplugin.onresize && (d._pxw != d.imagewidth || d._pxh != d.imageheight || d.forceresize) && (t = [d.imagewidth, d.imageheight], d.imagewidth = 0 < d._pxw ? d._pxw : 1, d.imageheight = 0 < d._pxh ? d._pxh : 1, d.forceresize = !1, !0 === d.jsplugin.onresize(d._pxw, d._pxh) && (d.imagewidth = t[0], d.imageheight = t[1]));
                                p = "";
                                Q = t = 0;
                                0 == k && (k = E.ex * -A, g = E.ey * -D, t = E.ax * e + E.asx * F + k, Q = E.ay * f + E.asy * J + g, d.pixelx = (t + x) / c, d.pixely = (Q + K) / c, t -= ea[3], Q -= ea[0], 0 == d.accuracy && (t = Ub(t), Q = Ub(Q)), c = A / 2 + k, e = D / 2 + g, l && (f = l = 1, D = d.imagewidth / 2, A = d.imageheight / 2, J = F = 0, y && 0 == y.DATA.scalechildren && (l /= y.pixelwidth / y.imagewidth, f /= y.pixelheight / y.imageheight, F = -k * (1 - l), J = -g * (1 - f)), p = _[77] + (F - D) + "px," + (J - A) + _[375] + n * l + "," + B * f + _[331] + D + "px," + A + "px) ", 0 != n && (c /= n, x /= n), 0 != B && (e /= B, K /= B)), p = _[77] + t + "px," + Q + "px) " + p + _[77] + -c + "px," + -e + _[369] + G.rotate + _[283] + (c + x) + "px," + (e + K) + "px)", wc && 2 > wb && !0 !== b.opera ? p = _[195] + p : b.androidstock && (p = _[216] + p), vb ? a.style[vb] = p : (a.style.left = t + "px", a.style.top = Q + "px"), y = G.visible && z ? "" : "none", y != a.style.display && (a.style.display = y));
                                if (r || O) {
                                    if (a = d._childs)
                                        for (y = a.length, r = 0; r < y; r++) a[r].updatepos(d.getfullpath() + _[492] + r + "]");
                                    O = !1
                                }
                            }
                        }
                    }
                }
            },
            $f = function() {
                function a(a, b, d, e) {
                    r.registerattribute(b, d, function(d) {
                        y[b] != d && (y[b] = d, null != e ? e(b, d) : c(a))
                    }, function() {
                        return y[b]
                    })
                }

                function c(a) {
                    v |= a;
                    r && null == p && (p = setTimeout(l, 0))
                }

                function l() {
                    p = null;
                    if (r) {
                        var a = !1;
                        2 == v && (a = g());
                        0 == a && u();
                        v = 0
                    }
                }

                function f(a) {
                    a && 0 == a.indexOf(_[92]) && ((a = Q("data[" + a.slice(5) + _[78])) || (a = ""));
                    return a
                }

                function e(a) {
                    if (a && a.parentNode) try {
                        a.parentNode.removeChild(a)
                    } catch (b) {}
                }

                function n(a) {
                    a && (a.style.left = _[139], a.style.visibility = _[6], V.viewerlayer.appendChild(a), a.childNodes[0].getBoundingClientRect())
                }

                function h(a) {
                    a.ontouchend = function() {
                        a.click()
                    }
                }

                function g() {
                    var a = !1;
                    if (M) {
                        var c = M.childNodes[0];
                        if (c) {
                            var a = c.style,
                                c = ma(y.background),
                                d = ma(y.border),
                                e = parseInt(y.backgroundcolor),
                                f = parseFloat(y.backgroundalpha);
                            isNaN(f) && (f = 1);
                            var g = parseFloat(y.borderwidth);
                            isNaN(g) && (g = 1);
                            var h = y.bordercolor,
                                h = h ? parseInt(h) : 0,
                                k = parseFloat(y.borderalpha);
                            isNaN(k) && (k = 1);
                            var n = Number(y.shadow);
                            isNaN(n) && (n = 0);
                            var m = Number(y.textshadow);
                            isNaN(m) && (m = 0);
                            var l = b.firefox ? .78 : .8,
                                p = y.shadowangle * Y,
                                q = y.textshadowangle * Y;
                            a.backgroundColor = c ? wa(e, f) : "";
                            a.borderColor = d && 0 < g ? wa(h, f * k) : "";
                            a.borderRadius = 0 < B[0] + B[1] + B[2] + B[3] ? B.join("px ") + "px" : "";
                            a[jd] = 0 < n ? Math.round(n * Math.cos(p)) + "px " + Math.round(n * Math.sin(p)) + "px " + l * y.shadowrange + "px " + wa(y.shadowcolor, f * y.shadowalpha) : "";
                            a.textShadow = 0 < m ? Math.round(m * Math.cos(q)) + "px " + Math.round(m * Math.sin(q)) + "px " + l * y.textshadowrange + "px " + wa(y.textshadowcolor, f * y.textshadowalpha) : "";
                            a = !0
                        }
                    }
                    return a
                }

                function u() {
                    if (r) {
                        p && (clearTimeout(p), p = null);
                        0 != r.haschanged_flags && r.processUpdates();
                        var a = 2 == t || 1 == t && 0 == r.haveUserWidth(),
                            c = 2 == q || 1 == q && 0 == r.haveUserHeight(),
                            e = y.html,
                            k = y.css,
                            e = e ? f(e) : "",
                            k = k ? f(k) : "";
                        ma(y.background);
                        var l = ma(y.border),
                            w = parseFloat(y.borderwidth);
                        isNaN(w) && (w = 1);
                        var e = $d(e),
                            k = k.split("0x").join("#"),
                            z = k.split("}").join("{").split("{");
                        if (1 < z.length) {
                            for (var B = [], k = 1; k < z.length; k += 2) {
                                var E = ya(z[k - 1]),
                                    m = z[k],
                                    C = "p" == F(E) ? "div" : E,
                                    e = e.split("<" + E).join("<" + C + _[482] + m + "' "),
                                    e = e.split("</" + E + ">").join("</" + C + ">");
                                B.push(z[k])
                            }
                            k = ""
                        }
                        e = _[220] + J[0] + "px " + J[1] + "px " + J[2] + "px " + J[3] + "px;" + k + "'>" + e + _[85];
                        1 == y.vcenter && 0 == c && (e = "<table style='width:100%;height:100%;border-collapse:collapse;text-decoration:inherit;'><tr style='vertical-align:middle;'><td style='padding:0;'>" + e + _[232]);
                        e = e.split("<p").join(_[173]);
                        e = e.split("</p>").join(_[85]);
                        k = _[231];
                        if (1 == a || 0 == ma(y.wordwrap)) k += _[218];
                        0 == c && (k += _[341]);
                        D = 1;
                        l && 0 < w ? (D = w * aa, k += _[506] + Math.ceil(w) + _[209]) : D = 0;
                        0 == a && (k += _[561] + r.imagewidth + _[222]);
                        e = unescape(e);
                        e = '<div style="' + k + '">' + e + _[85];
                        M && M.parentNode == r.sprite && (L = M, M = null);
                        null == M && (M = Ja(), N = M.style, ma(y.selectable) && (N.webkitUserSelect = N.MozUserSelect = N.msUserSelect = N.oUserSelect = N.userSelect = "text", N.cursor = "text"), N.position = _[0], N.left = N.top = -D + "px", _[7] == r._type && 1 == r.DATA.distorted ? (N.width = "100%", N.height = "100%", N[vb] = "") : (N[Nc] = "0 0", N[vb] = _[152] + aa + ")", N.width = 100 / aa + "%", N.height = 100 / aa + "%"), N.fontSize = "12px", N.fontFamily = "Arial", N.lineHeight = _[58]);
                        M.innerHTML = e;
                        g();
                        a = r.interactivecontent;
                        if (c = M.getElementsByTagName("a"))
                            if (e = c.length, 0 < e)
                                for (a = !0, k = 0; k < e; k++)
                                    if (l = c[k]) w = "" + l.href, _[560] == w.toLowerCase().slice(0, 6) && (l.href = _[184] + V.viewerlayer.id + _[414] + w.slice(6).split("'").join('"') + "','" + r.getfullpath() + "');"), b.touch && h(l);
                        0 < M.getElementsByTagName(_[558]).length && (a = !0);
                        M.style.pointerEvents = a ? "auto" : "none";
                        _[7] == r._type && (r.forceupdate = !0);
                        n(M);
                        x = !1;
                        r.loaded = !0;
                        k = r.DATA.scalechildren;
                        r.DATA.scalechildren = !k;
                        r.scalechildren = k;
                        d = 0;
                        G = Ya;
                        null == A && (A = setTimeout(K, 10));
                        v = 0
                    }
                }

                function K() {
                    A = null;
                    x = !1;
                    if (r && M) {
                        var a = 2 == t || 1 == t && 0 == r.haveUserWidth(),
                            b = 2 == q || 1 == q && 0 == r.haveUserHeight();
                        k = !0;
                        var c = M && M.parentNode == r.sprite,
                            f = 0,
                            g = 0;
                        if (0 == a && 0 == b) g = r.imageheight, 1 > g && (g = 1);
                        else {
                            try {
                                if (f = M.childNodes[0].clientWidth, g = M.childNodes[0].clientHeight, 0 == f || 3 > g) g = 0
                            } catch (h) {}
                            if (1 > g && c && M.parentNode && 1 > M.parentNode.clientHeight) {
                                n(M);
                                d = 0;
                                G = Ya;
                                null == A && (A = setTimeout(K, 10));
                                k = !1;
                                return
                            }
                        }
                        if (0 < g) {
                            if (c = r.DATA.enabled, r.DATA.enabled = !c, r.enabled = c, N.top = N.left = -D + "px", x = !0, L && L.parentNode == r.sprite ? (N.visibility = _[16], r.sprite.replaceChild(M, L), L = null) : (e(L), L = null, N.visibility = _[16], r.sprite.appendChild(M)), 0 != a || 0 != b)
                                if (f = a ? Math.round(f) : r.imagewidth, g = b ? Math.round(g) : r.imageheight, f != r.DATA.width || g != r.DATA.height) a && b ? r.registersize(f, g) : a ? r.registersize(f, null) : b && r.registersize(null, g), r.updatepluginpos(_[410]), r.onautosized && X.callaction(r.onautosized, r, !0)
                        } else d++, 3 > d || Ya < G + 1 ? null == A && (A = setTimeout(K, 20)) : (L && L.parentNode == r.sprite && (r.sprite.replaceChild(M, L), L = null), r.DATA.height = 0);
                        k = !1
                    }
                }
                var r = null,
                    y = {},
                    p = null,
                    v = 0,
                    t = 1,
                    q = 1,
                    x = !1,
                    J = [0, 0, 0, 0],
                    B = [0, 0, 0, 0],
                    D = 1,
                    A = null,
                    k = !1,
                    d = 0,
                    G = 0,
                    E = aa,
                    L = null,
                    M = null,
                    N = null;
                this.registerplugin = function(b, d, e) {
                    r = e;
                    b = r.html;
                    d = r.css;
                    delete r.html;
                    delete r.css;
                    r._istextfield = !0;
                    r.ishotspot && _[24] != r.renderer && (r.renderer = _[24], r.processUpdatesHS(131072), r.haschanged_flags &= -131073);
                    r.accuracy = 0;
                    r.registerattribute(_[419], "auto", function(a) {
                        t = "auto" == F(a) ? 1 : 2 * ma(a);
                        c(1)
                    }, function() {
                        return 1 == t ? "auto" : 2 == t ? "true" : _[25]
                    });
                    r.registerattribute(_[401], "auto", function(a) {
                        q = "auto" == F(a) ? 1 : 2 * ma(a);
                        c(1)
                    }, function() {
                        return 1 == q ? "auto" : 2 == q ? "true" : _[25]
                    });
                    r.registerattribute(_[226], !1);
                    a(1, _[507], !1);
                    a(1, _[53], "2", function(a, b) {
                        Vb(b, 1, " ", J);
                        c(1)
                    });
                    a(2, _[126], !0);
                    a(2, _[275], 1);
                    a(2, _[274], 16777215);
                    a(1, _[90], !1);
                    a(1, _[122], 1);
                    a(2, _[124], 1);
                    a(2, _[125], 0);
                    a(2, _[445], "0", function(a, b) {
                        Vb(b, 1, " ", B);
                        c(2)
                    });
                    a(2, _[553], 0);
                    a(2, _[363], 4);
                    a(2, _[362], 45);
                    a(2, _[357], 0);
                    a(2, _[356], 1);
                    a(2, _[408], 0);
                    a(2, _[267], 4);
                    a(2, _[264], 45);
                    a(2, _[260], 0);
                    a(2, _[284], 1);
                    a(1, _[400], !1);
                    a(1, _[458], !0);
                    a(1, _[549], "");
                    r.registerattribute("blur", 0);
                    r.registerattribute(_[454], 0);
                    r.registerattribute(_[452], null, function(a) {
                        null != a && "" != a && "none" != ("" + a).toLowerCase() && (q = 2, c(1))
                    }, function() {
                        return 2 == q ? _[87] : "none"
                    });
                    0 != t && 0 != q || r.registercontentsize(400, 300);
                    r.sprite && (r.sprite.style.color = _[38], r.sprite.style[_[66]] = "none", r.sprite.style.pointerEvents = "none");
                    a(1, "html", b ? b : "");
                    a(1, "css", d ? d : "")
                };
                this.unloadplugin = function() {
                    r && (r.loaded = !1, A && clearTimeout(A), p && clearTimeout(p), e(L), e(M));
                    r = p = A = N = M = L = null
                };
                this.onvisibilitychanged = function(a) {
                    a && _[7] == r._type && (r.forceupdate = !0);
                    return !1
                };
                this.onresize = function(a, b) {
                    if (E != aa) return E = aa, Vb(y.padding, 1, " ", J), Vb(y.roundedge, 1, " ", B), u(), !1;
                    if (k) return !1;
                    if (r) {
                        var c = 2 == t || 1 == t && 0 == r.haveUserWidth(),
                            e = 2 == q || 1 == q && 0 == r.haveUserHeight();
                        r.registercontentsize(a, b);
                        M && (_[7] != r._type || 1 != r.DATA.distorted ? (N[vb] = _[152] + aa + ")", N.width = 100 / aa + "%", N.height = 100 / aa + "%") : (N[vb] = "", N.width = "100%", N.height = "100%"), x && (N.left = N.top = -D + "px"), 0 == c && (M.childNodes[0].style.width = a + "px"), 0 == e && (M.childNodes[0].style.height = b + "px"), c || e ? (x = !1, r.sprite && (c && (r.sprite.style.width = 0), e && (r.sprite.style.height = 0)), d = 0, G = Ya, null == A && (A = setTimeout(K, 10))) : (0 == c && (N.width = a + 2 * D + "px"), 0 == e && (N.height = b + "px")))
                    }
                    return !1
                };
                this.updatehtml = u
            },
            vc = 1,
            Uf = function() {
                function a() {
                    var a = F(l.renderer),
                        f = l.webGL,
                        f = _[24] == a ? !1 : b.webgl;
                    if (l.webGL = f) {
                        if (c.sprite) {
                            try {
                                V.hotspotlayer.removeChild(c.sprite)
                            } catch (h) {}
                            c.destroySprite();
                            Za = c.renderToBitmap = !0
                        }
                    } else c.sprite || (c.renderToBitmap = !1, c.createSprite(), V.hotspotlayer.appendChild(c.sprite), c.videoDOM && c.sprite.appendChild(c.videoDOM), c.posterDOM && c.sprite.appendChild(c.posterDOM), 0 == c._isNE() && c.loaded && (c.sprite.style.backgroundImage = 'url("' + c.loader.src + '")'), Za = !0)
                }
                var c = this;
                c.prototype = yc;
                this.prototype.call(this);
                c._type = _[7];
                c.ishotspot = !0;
                var l = c.DATA;
                l.webGL = b.webgl;
                l.mx_RR = Ra();
                c.createVars([_[447], l.webGL ? _[65] : _[24], 131072, "ath", 0, 8, "atv", 0, 8, "zoom", !1, 1048576, _[416], !1, 1048576, _[158], "", 8, "depth", 1E3, 2048, _[547], 0, 8, "rx", 0, 262144, "ry", 0, 262144, "rz", 0, 262144, _[266], !1, 262144, "tx", 0, 524288, "ty", 0, 524288, "tz", 0, 524288]);
                c.edge = _[87];
                c.accuracy = 1;
                c.scaleflying = !0;
                c.zorder2 = 0;
                c.forceupdate = !1;
                c.renderToBitmap = b.webgl;
                jc = !0;
                c.point = new pb(null);
                var f = c.create;
                c.create = function() {
                    f();
                    c.createVars([_[138], c.polyline ? ma(c.polyline) : !1, 2097152, _[444], c.fillcolor ? Number(c.fillcolor) : 11184810, 2097152, _[438], c.fillalpha ? Number(c.fillalpha) : .5, 2097152, _[122], c.borderwidth ? Number(c.borderwidth) : 3, 2097152, _[125], c.bordercolor ? Number(c.bordercolor) : 11184810, 2097152, _[124], c.borderalpha ? Number(c.borderalpha) : 1, 2097152]);
                    a()
                };
                c.processUpdatesHS = function() {
                    c.haschanged_flags & 131072 && (c.haschanged_flags &= -131073, a());
                    if (c.haschanged_flags & 262144) {
                        c.haschanged_flags &= -262145;
                        var b = l.rx,
                            f = l.ry,
                            h = l.rz,
                            g = c.getparsed();
                        0 != b || 0 != f || 0 != h ? (g.flags |= 1024, Be(l.mx_RR, h, f, b, !l.inverserotation)) : g.flags &= -1025;
                        c.requestUpdate()
                    }
                    c.haschanged_flags & 524288 && (c.haschanged_flags &= -524289, b = l.tx, f = l.ty, h = l.tz, g = c.getparsed(), g.flags = 0 != b || 0 != f || 0 != h ? g.flags | 2048 : g.flags & -2049, c.requestUpdate());
                    c.haschanged_flags & 1048576 && (c.haschanged_flags &= -1048577, c.requestUpdate());
                    c.haschanged_flags & 2097152 && (c.haschanged_flags &= -2097153, De(c), c.requestUpdate())
                };
                c.updatepos = function() {
                    c.requestUpdate()
                };
                c.getcenter = function() {
                    var a = 0,
                        b = 0,
                        f = 25;
                    if (c.DATA.url) a = c.DATA.ath, b = c.DATA.atv, f = 25 * Number(c.DATA.scale);
                    else {
                        for (var g = c.point.getArray(), l = 0, u = g.length, r, w, p, v = 5E4, t = -5E4, q = 5E4, x = -5E4, F = 5E4, B = -5E4, D = 0, A = 0, k = 0, l = 0; l < u; l++) w = g[l], r = Number(w.ath), p = Number(w.atv), w = 0 > r ? r + 360 : r, r < v && (v = r), r > t && (t = r), w < q && (q = w), w > x && (x = w), p < F && (F = p), p > B && (B = p), r = (180 - r) * Y, p *= Y, D += Math.cos(p) * Math.cos(r), k += Math.cos(p) * Math.sin(r), A += Math.sin(p);
                        0 < u && (D /= u, A /= u, k /= u, a = 90 + Math.atan2(D, k) / Y, b = -Math.atan2(-A, Math.sqrt(D * D + k * k)) / Y, 180 < a && (a -= 360), r = t - v, p = B - F, 170 < r && (r = x - q), f = r > p ? r : p)
                    }
                    1 > f ? f = 1 : 90 < f && (f = 90);
                    g = new uc;
                    g.x = a;
                    g.y = b;
                    g.z = f;
                    f = arguments;
                    2 == f.length && (da(f[0], a, !1, this), da(f[1], b, !1, this));
                    return g
                }
            },
            de = "",
            kc = 1,
            ef = "translate3D(;;px,;;px,0px) ;;rotateX(;;deg) rotateY(;;deg) ;;deg) rotateX(;;deg) scale3D(;;) translateZ(;;px) rotate(;;deg) translate(;;px,;;px) rotate;;deg) rotate;;deg) rotate;;deg) scale(;;,;;) translate(;;px,;;px)".split(";"),
            ff = "translate(;;px,;;px) translate(;;px,;;px) rotate(;;deg) translate(;;px,;;px) scale(;;,;;) translate(;;px,;;px)".split(";"),
            Rf = function() {
                this.fullscreen = b.fullscreensupport;
                this.touch = this.versioninfo = !0;
                this.customstyle = null;
                this.enterfs = _[384];
                this.exitfs = _[278];
                this.item = new pb(function() {
                    this.visible = this.enabled = !0;
                    this.caption = null;
                    this.separator = !1;
                    this.onclick = null
                })
            },
            Vf = function() {
                function a() {
                    f = u.hlookat;
                    n = l.speed;
                    h = 0;
                    l.isrotating = !0;
                    l.ispaused = !1;
                    Na(_[241])
                }

                function b() {
                    l.currentmovingspeed = 0;
                    l.isrotating = !1;
                    l.ispaused = !1;
                    Na(_[255])
                }
                var l = this;
                l.enabled = !1;
                l.waittime = 1.5;
                l.accel = 1;
                l.speed = 10;
                l.horizon = 0;
                l.tofov = Number.NaN;
                l.isrotating = !1;
                l.ispaused = !1;
                var f = l.currentmovingspeed = 0,
                    e = 0,
                    n = 1,
                    h = 0,
                    g = !1;
                l.start = function() {
                    l.enabled = !0;
                    e = Ca();
                    a()
                };
                l.stop = function() {
                    l.enabled = !1
                };
                l.pause = function() {
                    l.ispaused = !0
                };
                l.resume = function() {
                    l.ispaused = !1
                };
                l.interrupt = function() {
                    hb = Ca()
                };
                l.checkIdletime = function(z, F) {
                    var r = l.enabled;
                    g != r && (g = r, l.ispaused = !1, Na(_[227]));
                    if (r) {
                        if (!l.isrotating) {
                            if (l.ispaused) return hb = Ca(), !1;
                            (z - F) / 1E3 > l.waittime && (e = z, a())
                        }
                        if (l.isrotating)
                            if (F > e) b();
                            else {
                                if (l.ispaused) return !1;
                                var y = u._hlookat,
                                    p = u._vlookat,
                                    r = u._fov,
                                    v = Math.tan(Math.min(.5 * r, 45) * Y),
                                    t = l.accel,
                                    q = l.speed,
                                    x = l.currentmovingspeed,
                                    t = t / 60,
                                    q = q / 60;
                                0 < q ? (x += t * t, x > q && (x = q)) : (x -= t * t, x < q && (x = q));
                                l.currentmovingspeed = x;
                                y += v * x;
                                if (0 < x && 0 > n || 0 > x && 0 < n) n = x, h++;
                                if (360 <= Math.abs(y - f) || 2 == h && (0 < x ? 0 < y : 0 > y)) f = y, h = 0, Na(_[210]);
                                v = Math.abs(v * x);
                                u._hlookat = y;
                                y = parseFloat(l.horizon);
                                isNaN(y) || (y = (y - p) / 60, t = Math.abs(y), 0 < t && (t > v && (y = v * y / t), p += y, u._vlookat = p));
                                p = parseFloat(l.tofov);
                                isNaN(p) || (p < u.fovmin && (p = u.fovmin), p > u.fovmax && (p = u.fovmax), p = (p - r) / 60, y = Math.abs(p), 0 < y && (y > v && (p = v * p / y), u._fov = r + p));
                                return !0
                            }
                    } else l.isrotating && b();
                    return !1
                }
            },
            xe = function() {
                function a(a) {
                    var b = la.FRM,
                        c = l.webVR;
                    c && c.enabled && c.requestframe && c.requestframe(a) || (0 == b && n ? n(a) : (0 == b && (b = 60), c = 1E3 / b, b = (new Date).getTime(), c = Math.max(0, c - (b - e)), M.setTimeout(a, c), e = b + c))
                }

                function c() {
                    u && (f(), a(c))
                }
                var u = !0,
                    f = null,
                    e = 0,
                    n = M.requestAnimationFrame || M.webkitRequestAnimationFrame || M.mozRequestAnimationFrame || M.oRequestAnimationFrame || M.msRequestAnimationFrame;
                return {
                    start: function(e) {
                        if (b.ios && 9 > b.iosversion || b.linux && b.chrome || b.desktop && b.safari) n = null;
                        u = !0;
                        f = e;
                        a(c)
                    },
                    stop: function() {
                        u = !1;
                        f = null
                    }
                }
            }();
        zc.init = function(a) {
            zc.so = a;
            b.runDetection(a);
            if (b.css3d || b.webgl) vb = b.browser.css.transform, je = vb + "Style", Nc = vb + _[89];
            ke = b.browser.css.backgroundsize;
            jd = b.browser.css.boxshadow;
            var c = 0;
            b.ios && 0 == b.simulator ? 5 <= b.iosversion && 1 != Rd && (c = 4) : b.android ? (wb = 2, c = 4, b.firefox && (c = 0)) : (c = 2, b.desktop && b.safari && (c = 8), b.ie && (c = 8));
            b.browser.css.tileoverlap = c;
            Of();
            if (!V.build(a)) return !1;
            ha.layer = V.controllayer;
            ha.panoControl = gb;
            ha.getMousePos = V.getMousePos;
            la.htmltarget = V.htmltarget;
            la.viewerlayer = V.viewerlayer;
            oa(1, _[143] + l.version + _[475] + l.build + (l.debugmode ? _[501] : ")"));
            c = !0;
            a.html5 && 0 <= F(a.html5).indexOf(_[24]) && (c = !1);
            cb.setup(b.webgl && c ? 2 : 1);
            oa(1, b.infoString + cb.infoString);
            a && a.basepath && "" != a.basepath && (pa.swfpath = a.basepath);
            V.onResize(null);
            gb.registerControls(V.controllayer);
            xe.start(Wf);
            if (!b.css3d && !b.webgl && 0 > F(a.html5).indexOf(_[542])) Ga(_[166]);
            else {
                var w, f, e = [],
                    c = !0,
                    n = 0,
                    h = [],
                    g = _[161].split(" "),
                    z = _[162].split(" "),
                    K = null,
                    r = null,
                    y = nd(100),
                    p = F(_[171]).split(";"),
                    v, t;
                if (null != Jc && "" != Jc) {
                    var q = pa.b64u8(Jc),
                        x = q.split(";");
                    if (v = x[0] == p[0])
                        if (q = F(q), 0 <= q.indexOf(p[6]) || 0 <= q.indexOf(p[7]) || 0 <= q.indexOf(p[8])) v = !1;
                    var q = Jc = null,
                        q = x.length,
                        q = q - 2,
                        J = x[q],
                        B = 0;
                    0 == J.indexOf("ck=") ? J = J.slice(3) : v = !1;
                    if (v)
                        for (v = 0; v < q; v++) {
                            var D = x[v],
                                A = D.length;
                            for (t = 0; t < A; t++) B += D.charCodeAt(t) & 255;
                            if (!(4 > A) && (t = D.slice(3), "" != t)) switch (_[186].indexOf(D.slice(0, 3)) / 3 | 0) {
                                case 1:
                                    Xa = parseInt(t);
                                    c = 0 == (Xa & 1);
                                    break;
                                case 2:
                                    w = t;
                                    e.push(p[1] + "=" + t);
                                    break;
                                case 3:
                                    f = t;
                                    e.push(p[2] + t);
                                    break;
                                case 4:
                                    h.push(t);
                                    e.push(p[3] + "=" + t);
                                    break;
                                case 5:
                                    D = parseInt(t);
                                    K = new Date;
                                    K.setFullYear(D >> 16, (D >> 8 & 15) - 1, D & 63);
                                    break;
                                case 6:
                                    r = t;
                                    break;
                                case 7:
                                    A = D = t.length;
                                    if (128 > D)
                                        for (; 128 > A;) t += t.charAt(A % D), A++;
                                    ie = t;
                                    break;
                                case 8:
                                    break;
                                case 9:
                                    za = t.split("|");
                                    4 != za.length && (za = null);
                                    break;
                                case 10:
                                    break;
                                default:
                                    e.push(D)
                            }
                        }
                    B != parseInt(J) && (n = 1);
                    v = ba.location;
                    v = F(v.search || v.hash);
                    if (0 < v.indexOf(_[110])) {
                        Ga(e.join(", "), F(_[110]).toUpperCase());
                        return
                    }
                    0 < v.indexOf(_[276]) && (null == a.vars && (a.vars = {}), a.vars.consolelog = !0, Xa = Xa & 1 | 14);
                    x = null
                }
                Rb = e = F(ba[p[3]]);
                try {
                    throw Error("path");
                } catch (k) {
                    v = "" + k.stack, x = v.indexOf("://"), 0 < x && (x += 3, q = v.indexOf("/", x), v = v.slice(x, q), q = v.indexOf(":"), 0 < q && (v = v.slice(0, q)), Rb = v)
                }
                0 == e.indexOf(_[579]) && (e = e.slice(4));
                p = "" == e || _[422] == e || _[433] == e || 0 == e.indexOf(p[4]);
                b.browser.domain = p ? null : e;
                if (0 == (Xa & 2) && p) n = 3;
                else if (!p) {
                    v = e.indexOf(".") + 1;
                    0 > e.indexOf(".", v) && (v = 0);
                    p = e;
                    e = e.slice(v);
                    0 == e.indexOf(_[526]) && _[127] != e && (n = 2);
                    for (v = 0; v < g.length; v++)
                        if (g[v] == e) {
                            n = 2;
                            break
                        }
                    if (0 == n && 0 < h.length)
                        for (n = 2, v = 0; v < h.length; v++)
                            if (e == h[v] || Zd(h[v], p)) {
                                n = 0;
                                break
                            }
                }
                if (w || f)
                    for (f = ("." + w + "." + f).toLowerCase(), v = 0; v < z.length; v++) 0 <= f.indexOf(z[v]) && (n = 1);
                if (null != K && new Date > K) Ga(_[269]), null != r && setTimeout(function() {
                    M.location = r
                }, 500);
                else if (0 < n) Ga(_[116] + ["", _[262], _[240]][n - 1]);
                else {
                    za && (Xa &= -129, oa(1, za[0]));
                    0 == c && (w ? oa(1, _[257] + w) : c = !0);
                    (c || 0 == (Xa & 1)) && V.log(y);
                    w = null;
                    a.xml && (w = a.xml);
                    a.vars && (a.vars.xml && (w = a.vars.xml), w || (w = a.vars.pano));
                    0 == (Xa & 4) && (a.vars = null);
                    Xa & 16 && (l[bc[0]] = l[bc[1]] = !1);
                    f = V.viewerlayer;
                    Xa & 8 ? (f.get = Kc(Q), f.set = Kc(da), f.call = We) : (f.set = function() {
                        oa(2, _[192])
                    }, f.get = za ? Kc(Q) : f.set, f.call = Kc(X.SAcall));
                    f.screentosphere = u.screentosphere;
                    f.spheretoscreen = u.spheretoscreen;
                    f.unload = Xe;
                    a.initvars && ae(a.initvars);
                    X.loadpano(w, a.vars);
                    if (a.onready) a.onready(f);
                    return !0
                }
            }
        }
    }
    var _ = function() {
        var F = Jc;
        Jc = null;
        var ya = F.length - 3,
            ma, qa, sa, va = "",
            Eb = "",
            ta = 1,
            na = 0,
            ca = [],
            ka = [1, 48, 55, 53, 38, 51, 52, 3];
        sa = F.charCodeAt(4);
        for (ma = 5; ma < ya; ma++) qa = F.charCodeAt(ma), 92 <= qa && qa--, 34 <= qa && qa--, qa -= 32, qa = (qa + 3 * ma + 59 + ka[ma & 7] + sa) % 93, sa = (23 * sa + qa) % 32749, qa += 32, 124 == qa ? 0 == ta ? na ^= 1 : 1 == na ? na = 0 : (ca.push(va), va = "", ta = 0) : (qa = String.fromCharCode(qa), 0 == na ? va += qa : Eb += qa, ta++);
        0 < ta && ca.push(va);
        qa = 0;
        for (ya += 3; ma < ya;) qa = qa << 5 | F.charCodeAt(ma++) - 53;
        qa != sa && (ca = null);
        Jc = Eb;
        return ca
    }();
    _ && _[134] != typeof krpanoJS && (new Zd).init(ed)
};
    
    embedhtml5(p, "krp:8hjaV`g'BMDxq+#.:_xFY;.)^['!j1fz2;:&bGRMv'&$.?| P[Tccg+vg*yWd.xs=n%MeR>dT$ &7E`E8poz4vA+OU==nwTMoFqIG|P)>OEUAOGi-s,0wWN<OI&$^gGt6GWih8/=_e'*fE=id(c7D/9^K$|9_m6`fG/C'`l*eD6'n^{0btO`#/z}#d<')Ea8cJYdwXWxd)8{RK/u!)N4 <UKC$Ub~i}8;Z7Q/S|FEYc61dXk5Kypi[GhR`#otBF+F9@P8aV.k'm*N78a$x@>?#2jL v@u&CZ_Hw/kvT,0k]??baYg!Y>ot'<[vNr`Hs.()7YH=r3KB@~j4o(6w5!}!F L<Z[~i~`2ZcG~*^roGlhFX[I[;b/h&bS%(=SF[387;MHW+(zWbBMn7c!:qaA|2iYj<0OLA!4B+l2|lm/syVvk-xcA+v3u!vSaw|tIe&KIj?`j%x6c7:,ZG57jcI$[0QiX}ok4-Iqa:&(#keVe[%`Br3Q{</|h(znIeCq7)x<E'-*-|fODUinZPm21*cAf[',W]sf.M00yBh~0oHLSAx?-{WS;{GZ}=5~]g*{cp)$Sm<#r*O'~bmV{^Bq]!5f{u&K_#9'Q!A$}eC*l|e(Rd]b<'cGE|1gpZ<OnexLH3${>afDg3<h$$gz*.Q%Kei=F<']r3'E@/@Lp*EG3 d6NLdSg]yFWyfSAvugkfv0]YKbhBkL4l|ab[agEhb})g^7w3t@Uq%QkY#6{z?J~*!%jtNq|26(`F]gWmdWc/sX/gK{/-mEL+Wlxvh;]~K]E'C+= xi.aGUPStiWn%)A*&}'*1L)^:y-v:{OvLN~QW~:a?ac,%LNB*jCn 1rlT.?<pFdllW$ScANP@<aUz_iLX(XA#@2AVoYcL[:CD1_iSn(;57PMV*N+LB3+^+H8;np%EoA3Ownhj:S<0cFYrl'h=O/UKG+'EJ>G_i8mn{eNd(H2Z4Aq_Gwta-K3L`dS}qvq#7g5GX<:A~E+B)qB[w5,a0{.xtzfb9M+g;}0i;^20H8t/4FZ(}31:PK?,-=/?s.HWw>o9AlGF4%m47X)6TCvBLE2yiL@Pl_i(z's`Y!>i{8EAi7F,_54I$Ve3m+Z_m+urVa%>/JqX-MB21$YNDV TluKKzp}/-J%eMNRf5` 'zzI?FCW.C>u8#KS;r'&*^|IFT%C'KIs-sf2HU%Ndl]pe).P^n'1-0P T,].VZ?<]C26=(pbzhI[&G69pm<bE]I7@4(7-WnNM)a6u*VaUgPEui xSS1B2P05E.&'x7~HyXS3hRyBZ@e)*-g&GasU0YgmU!VXhenPh%x+tgwRxb8.>j;ka@tp'B)}Nhd`jA$0R,dmbdJarteM`eL.WUP=C&FSn+J~.nU_b(XKPJlf37l-M?H3nS]}+[EnB -fG:N*o?c61'#J] OpA6U&y.[mk@]#qV%J7|0^7Xe:L^PT)!$}hi>UtDZ<]ZI'?uQ/~U5:BI3MnB;KZfICkS#E<Kd]kjS12UMWsC?vKk').B0s)dfCg0Ca[L7RBUT!_B8mPbw`PO@[_OE3#8LA.F1!JTR>O7UaU,YzFiV_V lt-{et7g_9}aU`r`Vz*2BGy,1l>f|-SG6!{s}24)0Ho2K8n~A]Y0@~'$B(e@ Zv6ZTeCAs7BpU}(Ks#71A(UH~VC;W((e%_MmD>I4A+]?0${G]iP[eyzyYaUg2i<wV%Ho$|6+.hh`)ri2o5/5jJ=fUnRXtF?#<vY,LB]{/o+o%RyT3)g@b]dJ>eS=c{WX'';765@<`hu}cH7C|_P*Z^Y+eq5b8%]q2y4Z{*7k/{AR9(/IK&O#KOX9U})@}qZS1ZP|n3Ufw!YOva4.Y+}$^ GBUf*B;^wWc#==#X!e)Eh8~vFjG;#U6enJT|n^4yGG1^T;$Ta~AZhVj%d~~8C_@J D;s t;s/}T[]`Iamz2OnV'L{Hcl~UEp^c|~tIlqWo1`xXK*eT 1P-oiV<;d$a34*_ pCUpGe6Tof0ht)j[m5/]`utC&<|vMib2'h}T[Yk68O{Kw%w,vN]Nl]NoKNv?82zk_8jLy]Zw#U5gU <)g,6L^;tRy7vx}u$gcGqL3?{@p/diP:nA?SnUGM!l;o<zE9`:wQpn~m& l%Isv!n{ pf_ H(=TZb0WsyvT6R2i=c(x>t`l:{Nq<JugL}IH%17,1s:/-_j7:f[@s7)oEm_wD_ARsuI{vzDISkF'x96~_^Ann}^onXRL3S7y)1Ed3hh8u$Bc^vQ{MAnco`YS-D~H3hs/KXa'19Q+ytb5_h8_,i$jfG8-YIHwyy~6[_&7BwZlWbx]_o'_6ND|&3V$[.<ZL>QG&*<t0^M!7E:7fMf?70=DicyU;/Lb~v5a[RR'A(2+`F(U;oe)]]`u<vYujaG)6|jLr5c,fL2K:8Y#VxG(SAw]0ti0vDZsFIlB4H9wFib[ncmaDbV wR8P^J6}z.PGKEUWU9]*z`tKn;E?;(a]c707ff/v<OyVh{E_:b>Y TqYvm?+gi7!VzWO<Glw]Xy!2z~*v39gbO1VWj/Sh.f.@Nx`H/'Tc~[']?]]zc68y6,_Mg`5b|/G7`+Qwy!$tk:iNlPn0/d}6sF3]YPX&xh?FmLtX~{y*=IXLciv=Z1[78R`~BnsyuAS3:68vBlcd1=~(H4|2MR+.SP1EX:6w;&U{btW!9(I~BQgU->b73a9E.yZ0 0H%S!4<]sL}c`i WD)_Cv!uewN|a`RhZ!m@-p%07 IKI/P90ceRosr0bdO=bQ:hC|,mO`H*Fz2~Kl%kKsAGB7+};{a4/x^Yno^'Jfa9_4=6QO /k3YB<''HnpM-Wbdy!(Qf~0@F=49wxO(t,mT,)/lx)v>6{`r>k4*J+]'+hSFi_$;7)P41a>OCP6V`pPm `=_!WFQl'i77B /=^f|{zb*.L|DReQ%SM0zXsA6BeVSM.556win%W{#QG/si($uIi1s`P?3gnY^?p<L+PzaNm]mr!IaJ?bCwG2$*sAeH[1zR=:o{aZ[EJ'GpU)Mp_D?Ed4 (ODcgV#MBVpkab'Y;z@d1t=T.;-.k('M}|Hw{`_)U/s'+R0?XP}-7LvW'Xsy=Ar93ycXuqP:Cm+9J[)h@z<tkxC|ZX5)%7SKf19p.?)8y}XXL//4Q(8Qy[5q5ISvwF^Zv',:2f?K~_A/y`|;YuQE- JhNH ~P[,B*m>!0xb,9^s/$hveit50CEQ+DhYB$QaCf%72tOa4{k4c!_98%SZ@x%dX2+pIW=sB^`Q8yVP}{:a>{M,|:nI@xn41V0=HB~n@my(iyc@6^6mZp~:]23v*,B7<%~GiLwB{X`}oT)?5FoKn^K-8e9Q-+V/D&qd:@S)>!d 1CeM%#)a)oG1xA$hy&fLq!q<4Izoy6{$7Q.`F9/]XiS^Z/,%]R@!9>#Tc][NwAvE8|FJ|Pk~!/i? 9RNdxFG,O_q<=4gGVCVFTy8C!<)qpWdWxRi.of9rY[6s7$EuP-dhO=5=B%1<=TM07$u.zd;UCm8&9wAf2nQ4cq!<wiYfsdl-90E2Ean,^j`T.od4!1hxrkJ9/j$NSsGXeMDQp&:]LqOSfg7HDc)Ic=co]wE9rUsXsq#9~d;i=@~FS-:n7(Y.Upy8qFfl0t'KWU_wp@GhZ&0Z>?{H4+CAM4x3`~Y#jo-9j|I{GRQdw_ViY<y2Cy681'jq)S.Nqcl/C>tf.,?(MS`k:HH9@|j0lPO8T~ZvB2&K<SCm2g Mn?1X[=Oj3^p#uZ6(AT_0,(G'r3^S|>FZ,AK jpgVy -pW'Jp,&s-t%QrRo4!is<&mI[q?`1(FPKj*Mb1^lBZMq+!/CJ%/=}Vsbs72s<xn%g/n(szeD=zv]8Jy]vx[h4cI7hFo<PsJO`-~>+n392c&-~CLjURdli=pN9yD#bgViERK!34/J8ykF`w$Lvw>U!ukQgA&-8ReL{pQksW6G$8lfvbFk_9R6k:_&>uP3r?0}wvM82V2j!_^0/t-gOmePy1)4;3j?/,]%>~lC$x[A$1#Z<v,Z/=zDip[q[Nvg q!4QA<wQ6WrFMy}cTi1X$oiRD-g+ixcyKVY3KbFBD%UXRsc)~NA|Ohw^2=0hR6(^w=m>6z{MwDyfI:)5]V:k:<P<F46%FU4`wP@+2^y8-E8u~eHr,*v$J2=T{2b (hV;788uIA5H4sDv&q6yY.AAq1XU6eW,M]pb9{avYPR)vHMRo_jyt9a<j?pQKqQoj9vr5lL(1:e%/w+/iX3t:3H<ANE~&c}Foz<5_,{R7+2acfx^A!q,g8>W+ >Hr]ym-sz:'+KL,1]%b%WTXPw8'vwGaP$9D< qINv~v:{r*w*|*eV'e.`Cs89NvDhyEL5]4aOUF50@qeQxGeB`s'dzP l|7%=~rnYt-jUewlCD-t|$3im@e{,Vs*MYbdtIDxI<L('b`lMXooMIlif1j.P/1Js@hZfbB{P`&_/ mrAPEB)pu,!m/Kdyzg,XQ))_,HR N'j/E'D]am6[;v.r5huKsP0,U!@dlLb=[usMYaMUgS<|3ySKO@_4V]b!TSe!J}{wqSgDd0_AUnL)4eAbTMbImFK^d~q9;S<yK[D;z?_2Mc+xMDk1$ SsiqZ1PKs>A`Y|Qoy0[#2p+fJ6 irEv*lb`;[}sd(kC}EK^@t%)0w0SRKF%a58%qgkzRfN*i~ukdkF9Er[4E2gx-k6c1c|[e'7AjPjKgV+DkLP6:slgmC2bV,oD8mF,nz>3An;]yQA!;3K&8q!Iy2HF} ZJP_dN~vm,EJ?2d};q!*)Hg'>?nx}p/Lbx3l3r*dOnEAf1X(9kP)2R79?<E[JgtY-~v80_AeB/?wm%:1~:T!IF+Z>t9H@0Q')o,M_)p~`=uL{2I1Z,rGh:u=tYn/;mcev;<TP!#QVuOP/i0v]4p=:I!nPZs~4#YLcT+0 0}c,aH}wI4)n4F(1V<!a}8`:(2s|RT+[fgD9'.gvIzOYjC`Dln=:dYC{t&aTQrbYqYy@ Bd3>VSQ1WVEm3r]vAk8jNAP/EdMi]*rr^Pd/OUx(KG]LI{'(^@;oLR7WNq'<BQB=![.0bX|]~bYQ4I3][zL#Zf%,wF+*fD]{frkOQ6&sRq<R-}&,zhQq-!#<Y>4TQYek{ 59ICLk}tSsz@fKX!yiw&#^>`y[IskAR6xc0[~(ec'~+4J[2jj3b-PY_xDU'hn$J SU&eG<$%.vdyqlgy)4N%,062d>NRa.f$h+~c61y;u#mbSJN]NtjmqyQOM9{|7Ub(ZC8bg&at>J+A6$Ow',FdgBP<BC9@K^EFB'>{^#F,{E'3Ns+5]gkfy#ZRgVT^w>cnw;0}IY@T+8?U3xQyv/`5:&Upo3x+1 O+ zJJgif69F5S_<XNh?E)?R_)_ng/m^+<5Vj^j8xvQ=ZE_xNv_R2+p'$E' &f%^!tHLxd1F4?{?x6@}~TLgT*NPXh-pbIk<1c?w%+TlE!Uj3PIZjOFhB8D!shnUC5=v&uIpk$6g2LnlR#ov;|b5O}/?1SVmd<E@%Hzuwo|JC)~`~UD)[uCiIP5<'w2)PzsF#X_rK`p.(F4+ChXHJOfQn( C>!s5&kUX|<{v_Olk-Lu7.T(x|KS%KaOn)]E~*rPQrl!<n6C54$tK6GyKi![B}Cb.|C5FWGj&~T#^5#~_{'fYYeR%}6vNz1poNTEjyCA/+aA<KXGu$ae,wzW)%P?+cU2$i)%-quWb-bP$enxoQTxCH=R{MqBUx@JTQ<3V2?+l+dy@_x|)A;yLu*k_=B1%<@-Z!dt8t2i,k~ifG4<.AbY_Hf?+AhtuS-tnK~}>wAak[]+;xQ@9{5P~OME?;_24lP>%hjg7e^E(4L&p-]vwZy4dfP+nzpoS7`o+jqg~YR^F'iZ|Y9M)^|BM>eakzPS[u_NP0c4*V(^E##PxE.1Op$sZy+[B2)PH,yXWm^375Wr4cbC-2g[GX54wjmLL]$ 5@)F_; b.zc3pt#C[ju>0-^?&a2%9,Wr#F>9'0zCx7EB:cri,<>h@RWbEs& ~Ow)8[q-BU}U.M-yvgA[fy#1K)ck[Densfya`_wW;qr@me69&oEl2F RX`: zWMV{rl?^n81'qF3]H!mo(w?LW-mkn7XQ;7`HS1lo7e3#jEc|J Z}8+KtH0;Pdq[;tI+/hfqDKD=:+A{RW{1-*V|Jr1U.W8h{h5moy8,~j7C+c^eCZ+/3%QM7L[@FX.]Q(}cZS6</f5R(p/lldZ$r( $Ns4m,uB)oH+jfR8[ #D?<#>>nRrvqv])|2GAqE] 1wHngq:iU^3!,;XBAP@`50fmxDYQ5NH3@0v)'],i[^n'&E,r|U3rs}29v1pb-<PAtXY1S!fMV{/uf!qPn802TCq*?2iGwIHO_Df.3W!Dk{_.+)[JwKwUXAXvjU nqV$%v]IjBBCvzlR3W%2oCkf')rxD^jZ{@==deT2eREkLn5 4#-(8F!}n{ICQ%-Y$'zl|[@_?~k^Q[` lxl''w[35k|wHD)J{jqWvh^H 9VLWcXJ(_z1l<rjXy3|eOBuNr@Ss>e3=%OeTar&=0-pQIHOE]JH4ba)p(7++x~8[$Q7t>:/C@$:_pu_#U0tr(r8&JTFhVt{Vsy|=fN5=QD%_mkoedXP>5iPU*T`<{lOOlJ`N86_@Jr,.`!A`[TW4,j3Zx(_7qRKqfA0'ubGe6cW:@o%ed7d8->rno^[8>W%[d]ZFnS=PYzwSECL$UD_U(gZRi..nC?$PWc1T'[[`7b.:<2YI<g)<QY!#f[4]i@d-z*&J5oC#C3L:t.$J!Zs@>^RWsH^?;42+E]yB<`@>>h)QSAq=pfP<8zjl)Rr&|y.{u[pt|>O+P#lfs_;/|@D#bHiNXWiY4p/1FPfnso,<v4ihnNAWloJ*gd/_gdp)[<?tML1E> FX+*,5-5:.sS?9Bt!ne'eD/o0FLM.VA5b_'<DQYBF[%8)T*]-+*?ifwDuOMQFaFT)CR,=b0g2K>=.jV4U8zYS$rXS.C|Ma#@tQ1H`BT&U-;~*zH'zt$!*geUX($u-2*L5*C?%3gmX4*<+uo VRsL~WB]vh}*qWcAes`J!{/856`+mbR'VBBel'V%*zq-92l7w~:a)egxr'1ha8*o=b>;bFrSFH!7uxHz)(!<c>'-v/6ZWr& )[+c2Hk,_n^n$ifsVu3@C{~&lY,9gdZd(&pG7bg:LifJS(U^U*|fI?!lO@dR/[DKv4i#!^C6J@G^P1+vHGaMf0`{~0$r]y[__M7S,kDt1c}M!`ByR<wYv=i1VEnrI/c'q[f[Et}2C0_n!H1KA _qa[NQ,(,-Z)W6O?l7TmFEV]Wmm.|@}BYL1F3#!{8B%XYBB*c[TtpLS^T[s?Ng(1`(w<No4j;-}I+'881wWPKQgi7Bu!';@Z<IaujIK&3<{_=1GaPN~~L`Tg%b8Xuxb0ZfcB;Cg0P5yP~d(n*]ymE|'~AXwV}H*R9_u?HW^VIma[*4f~QZ$LvIaaM2[6s'8[z3mPTM$dCtH#^@bMh!SV~grD^ ]-RA@hTxSz{@K)~7d6pi[O?83#O;uZ8Vq&Ub_/ezY-`3*{dT&&+1+(rm}/TtPf~iv!6!n'jms_cK+?tOG27u^h+2CrDt75u}m>_c1u~W[I''ouswLB+{wDq9 N-_&wPD?Pghwe0QAmAD!3N HM?Y<EIM8(,$+~XiS)d2KjETt*TTK.[ka;-Jp$t{?%cec,:]~,Y=:>}/c9d;qi3+8ekby8hZ'E<FJ3w#mtErDmC77(.#qb%m==XHo9>s{T4#?#/KI`E<W#e+k(cy3+w,r))2ETzf}'V|MN0[z/OX;2~q{O=%mNbS`1MX$^P&X+SJB7~R14R(F_D_5>g4^QXX#EaGasRjF)t%G.1u@?L-L3;21ycS:>bex@1#O}LKQ9(_P2yNB`S^#=^3:~'y8`CeQ]:3eL`~7FxZmH^;K83-lA{_YAQjrSo5^af9W|,L hjh%Q`..hITeGTETAC;&=MBr'8@e{8hE9lb)7(8slGV(ijgJ~B|tDLl$X:f'A-f $e=t4k(wMF-^2gQ +H)`xxlcXAzx`'Xb,.Z2ZdCe]PnyL!G.c89a17|Q[bd5R/IoczgP;Ni@xHt$7<gLcg|Q)zQ:~:p)Kiq]MH^Y'@%KLr@5C$:If&RY5a>5|9h^7Ur nIfC+Let!jv:sLl%Iye{j72!q._TCN^$KDr^]%&u#ZR*617$HG> <&_{;/lC#$`y|lH%wc16a _i7zf6M}E+j{:UVM>zpkKdPj6Pp(5v%y-#RptDUU*n*qlD$Ty>Ls'8ps(_wZ(?3Dlgc[H%JMb[JtC7P`>SlR4*?c@Gg{wCIQ?,sb&Xg>h0fL[GH8%r)ULd!N~w_$tu(-[GM{^<rq1}PIM+xJ|o&#*Ba9+L~w;Xg.De~ JHch)m# D4IuB(w2[O#FnXrD6f@;E-DNR)nh`dwsIg0a;%s5t`0Wd6<O5C<GyCB./hi.F:uQ#h).G]Bf`2b?Ll~iKA;G*R^&[y117MsbL{IiU0Na>dg6M7l-[egWVCKdK#.Uax^m`OI* cR&]<n[mjUEe$F|$!PFXw$6G=bYoIJZbj7|}&dCn7H7|i^u6kUeP-0uR'0PPkt[1!(Y@omNBw-t{{AUh@9P[1ag@/~,%8v`GpyR-ly2X^PGmsJ7[x.(!vOqV)`0e+H#`)oQvM&b.K8kLZS|cD.$43LSrC@E9 JkD1R?1u31c&wBUVC*oMV2?e'N!%Sk{10tJ``:QD%lK{A`iI'ukS#&:v K]]lFV+HoIZ+6Xr{M<opP[n{R);y a4UE.RaYk.BaSc~H_5u>$2;fQ3A JR7")
};