/**
 * @license jqGrid  4.6.0 - jQuery Grid
 * Copyright (c) 2008, Tony Tomov, tony@trirand.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * Date: 2014-02-20
 */
function tableToGrid(a, b) {
    jQuery(a).each(function() {
        if (!this.grid) {
            jQuery(this).width("99%");
            var a = jQuery(this).width(),
                c = jQuery("tr td:first-child input[type=checkbox]:first", jQuery(this)),
                d = jQuery("tr td:first-child input[type=radio]:first", jQuery(this)),
                e = c.length > 0,
                f = !e && d.length > 0,
                g = e || f,
                h = [],
                i = [];
            jQuery("th", jQuery(this)).each(function() {
                0 === h.length && g ? (h.push({
                    "name": "__selection__",
                    "index": "__selection__",
                    "width": 0,
                    "hidden": !0
                }), i.push("__selection__")) : (h.push({
                    "name": jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(" ").join("_"),
                    "index": jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(" ").join("_"),
                    "width": jQuery(this).width() || 150
                }), i.push(jQuery(this).html()))
            });
            var j = [],
                k = [],
                l = [];
            jQuery("tbody > tr", jQuery(this)).each(function() {
                var a = {},
                    b = 0;
                jQuery("td", jQuery(this)).each(function() {
                    if (0 === b && g) {
                        var c = jQuery("input", jQuery(this)),
                            d = c.attr("value");
                        k.push(d || j.length), c.is(":checked") && l.push(d), a[h[b].name] = c.attr("value")
                    } else a[h[b].name] = jQuery(this).html();
                    b++
                }), b > 0 && j.push(a)
            }), jQuery(this).empty(), jQuery(this).addClass("scroll"), jQuery(this).jqGrid(jQuery.extend({
                "datatype": "local",
                "width": a,
                "colNames": i,
                "colModel": h,
                "multiselect": e
            }, b || {}));
            var m;
            for (m = 0; m < j.length; m++) {
                var n = null;
                k.length > 0 && (n = k[m], n && n.replace && (n = encodeURIComponent(n).replace(/[.\-%]/g, "_"))), null === n && (n = m + 1), jQuery(this).jqGrid("addRowData", n, j[m])
            }
            for (m = 0; m < l.length; m++) jQuery(this).jqGrid("setSelection", l[m])
        }
    })
}! function($) {
    "use strict";
    $.jgrid = $.jgrid || {}, $.extend($.jgrid, {
        "version": "4.6.0",
        "htmlDecode": function(a) {
            return a && ("&nbsp;" === a || "&#160;" === a || 1 === a.length && 160 === a.charCodeAt(0)) ? "" : a ? String(a).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : a
        },
        "htmlEncode": function(a) {
            return a ? String(a).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : a
        },
        "format": function(a) {
            var b = $.makeArray(arguments).slice(1);
            return null == a && (a = ""), a.replace(/\{(\d+)\}/g, function(a, c) {
                return b[c]
            })
        },
        "msie": "Microsoft Internet Explorer" === navigator.appName,
        "msiever": function() {
            var a = -1,
                b = navigator.userAgent,
                c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            return null != c.exec(b) && (a = parseFloat(RegExp.$1)), a
        },
        "getCellIndex": function(a) {
            var b = $(a);
            return b.is("tr") ? -1 : (b = (b.is("td") || b.is("th") ? b : b.closest("td,th"))[0], $.jgrid.msie ? $.inArray(b, b.parentNode.cells) : b.cellIndex)
        },
        "stripHtml": function(a) {
            a = String(a);
            var b = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
            return a ? (a = a.replace(b, ""), a && "&nbsp;" !== a && "&#160;" !== a ? a.replace(/\"/g, "'") : "") : a
        },
        "stripPref": function(a, b) {
            var c = $.type(a);
            return ("string" === c || "number" === c) && (a = String(a), b = "" !== a ? String(b).replace(String(a), "") : b), b
        },
        "parse": function(jsonString) {
            var js = jsonString;
            return "while(1);" === js.substr(0, 9) && (js = js.substr(9)), "/*" === js.substr(0, 2) && (js = js.substr(2, js.length - 4)), js || (js = "{}"), $.jgrid.useJSON === !0 && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(js) : eval("(" + js + ")")
        },
        "parseDate": function(a, b, c, d) {
            var e, f, g, h = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
                i = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                j = /[^-+\dA-Z]/g,
                k = new RegExp("^/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)/$"),
                l = "string" == typeof b ? b.match(k) : null,
                m = function(a, b) {
                    for (a = String(a), b = parseInt(b, 10) || 2; a.length < b;) a = "0" + a;
                    return a
                },
                n = {
                    "m": 1,
                    "d": 1,
                    "y": 1970,
                    "h": 0,
                    "i": 0,
                    "s": 0,
                    "u": 0
                },
                o = 0,
                p = function(a, b) {
                    return 0 === a ? 12 === b && (b = 0) : 12 !== b && (b += 12), b
                };
            if (void 0 === d && (d = $.jgrid.formatter.date), void 0 === d.parseRe && (d.parseRe = /[#%\\\/:_;.,\t\s-]/), d.masks.hasOwnProperty(a) && (a = d.masks[a]), b && null != b)
                if (isNaN(b - 0) || "u" !== String(a).toLowerCase())
                    if (b.constructor === Date) o = b;
                    else if (null !== l) {
                if (o = new Date(parseInt(l[1], 10)), l[3]) {
                    var q = 60 * Number(l[5]) + Number(l[6]);
                    q *= "-" === l[4] ? 1 : -1, q -= o.getTimezoneOffset(), o.setTime(Number(Number(o) + 60 * q * 1e3))
                }
            } else {
                var q = 0;
                for ("ISO8601Long" === d.srcformat && "Z" === b.charAt(b.length - 1) && (q -= (new Date).getTimezoneOffset()), b = String(b).replace(/\T/g, "#").replace(/\t/, "%").split(d.parseRe), a = a.replace(/\T/g, "#").replace(/\t/, "%").split(d.parseRe), f = 0, g = a.length; g > f; f++) "M" === a[f] && (e = $.inArray(b[f], d.monthNames), -1 !== e && 12 > e && (b[f] = e + 1, n.m = b[f])), "F" === a[f] && (e = $.inArray(b[f], d.monthNames, 12), -1 !== e && e > 11 && (b[f] = e + 1 - 12, n.m = b[f])), "a" === a[f] && (e = $.inArray(b[f], d.AmPm), -1 !== e && 2 > e && b[f] === d.AmPm[e] && (b[f] = e, n.h = p(b[f], n.h))), "A" === a[f] && (e = $.inArray(b[f], d.AmPm), -1 !== e && e > 1 && b[f] === d.AmPm[e] && (b[f] = e - 2, n.h = p(b[f], n.h))), "g" === a[f] && (n.h = parseInt(b[f], 10)), void 0 !== b[f] && (n[a[f].toLowerCase()] = parseInt(b[f], 10));
                if (n.f && (n.m = n.f), 0 === n.m && 0 === n.y && 0 === n.d) return "&#160;";
                n.m = parseInt(n.m, 10) - 1;
                var r = n.y;
                r >= 70 && 99 >= r ? n.y = 1900 + n.y : r >= 0 && 69 >= r && (n.y = 2e3 + n.y), o = new Date(n.y, n.m, n.d, n.h, n.i, n.s, n.u), q > 0 && o.setTime(Number(Number(o) + 60 * q * 1e3))
            } else o = new Date(1e3 * parseFloat(b));
            else o = new Date(n.y, n.m, n.d, n.h, n.i, n.s, n.u);
            if (void 0 === c) return o;
            d.masks.hasOwnProperty(c) ? c = d.masks[c] : c || (c = "Y-m-d");
            var s = o.getHours(),
                t = o.getMinutes(),
                u = o.getDate(),
                v = o.getMonth() + 1,
                w = o.getTimezoneOffset(),
                x = o.getSeconds(),
                y = o.getMilliseconds(),
                z = o.getDay(),
                A = o.getFullYear(),
                B = (z + 6) % 7 + 1,
                C = (new Date(A, v - 1, u) - new Date(A, 0, 1)) / 864e5,
                D = {
                    "d": m(u),
                    "D": d.dayNames[z],
                    "j": u,
                    "l": d.dayNames[z + 7],
                    "N": B,
                    "S": d.S(u),
                    "w": z,
                    "z": C,
                    "W": 5 > B ? Math.floor((C + B - 1) / 7) + 1 : Math.floor((C + B - 1) / 7) || ((new Date(A - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
                    "F": d.monthNames[v - 1 + 12],
                    "m": m(v),
                    "M": d.monthNames[v - 1],
                    "n": v,
                    "t": "?",
                    "L": "?",
                    "o": "?",
                    "Y": A,
                    "y": String(A).substring(2),
                    "a": 12 > s ? d.AmPm[0] : d.AmPm[1],
                    "A": 12 > s ? d.AmPm[2] : d.AmPm[3],
                    "B": "?",
                    "g": s % 12 || 12,
                    "G": s,
                    "h": m(s % 12 || 12),
                    "H": m(s),
                    "i": m(t),
                    "s": m(x),
                    "u": y,
                    "e": "?",
                    "I": "?",
                    "O": (w > 0 ? "-" : "+") + m(100 * Math.floor(Math.abs(w) / 60) + Math.abs(w) % 60, 4),
                    "P": "?",
                    "T": (String(o).match(i) || [""]).pop().replace(j, ""),
                    "Z": "?",
                    "c": "?",
                    "r": "?",
                    "U": Math.floor(o / 1e3)
                };
            return c.replace(h, function(a) {
                return D.hasOwnProperty(a) ? D[a] : a.substring(1)
            })
        },
        "jqID": function(a) {
            return String(a).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&")
        },
        "guid": 1,
        "uidPref": "jqg",
        "randId": function(a) {
            return (a || $.jgrid.uidPref) + $.jgrid.guid++
        },
        "getAccessor": function(a, b) {
            var c, d, e, f = [];
            if ("function" == typeof b) return b(a);
            if (c = a[b], void 0 === c) try {
                if ("string" == typeof b && (f = b.split(".")), e = f.length)
                    for (c = a; c && e--;) d = f.shift(), c = c[d]
            } catch (g) {}
            return c
        },
        "getXmlData": function(a, b, c) {
            var d, e = "string" == typeof b ? b.match(/^(.*)\[(\w+)\]$/) : null;
            return "function" == typeof b ? b(a) : e && e[2] ? e[1] ? $(e[1], a).attr(e[2]) : $(a).attr(e[2]) : (d = $(b, a), c ? d : d.length > 0 ? $(d).text() : void 0)
        },
        "cellWidth": function() {
            var a = $("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>"),
                b = a.appendTo("body").find("td").width();
            return a.remove(), Math.abs(b - 5) > .1
        },
        "cell_width": !0,
        "ajaxOptions": {},
        "from": function(source) {
            var QueryObject = function(d, q) {
                "string" == typeof d && (d = $.data(d));
                var self = this,
                    _data = d,
                    _usecase = !0,
                    _trim = !1,
                    _query = q,
                    _stripNum = /[\$,%]/g,
                    _lastCommand = null,
                    _lastField = null,
                    _orDepth = 0,
                    _negate = !1,
                    _queuedOperator = "",
                    _sorting = [],
                    _useProperties = !0;
                if ("object" != typeof d || !d.push) throw "data provides is not an array";
                return d.length > 0 && (_useProperties = "object" != typeof d[0] ? !1 : !0), this._hasData = function() {
                    return null === _data ? !1 : 0 === _data.length ? !1 : !0
                }, this._getStr = function(a) {
                    var b = [];
                    return _trim && b.push("jQuery.trim("), b.push("String(" + a + ")"), _trim && b.push(")"), _usecase || b.push(".toLowerCase()"), b.join("")
                }, this._strComp = function(a) {
                    return "string" == typeof a ? ".toString()" : ""
                }, this._group = function(a, b) {
                    return {
                        "field": a.toString(),
                        "unique": b,
                        "items": []
                    }
                }, this._toStr = function(a) {
                    return _trim && (a = $.trim(a)), a = a.toString().replace(/\\/g, "\\\\").replace(/\"/g, '\\"'), _usecase ? a : a.toLowerCase()
                }, this._funcLoop = function(a) {
                    var b = [];
                    return $.each(_data, function(c, d) {
                        b.push(a(d))
                    }), b
                }, this._append = function(a) {
                    var b;
                    for (null === _query ? _query = "" : _query += "" === _queuedOperator ? " && " : _queuedOperator, b = 0; _orDepth > b; b++) _query += "(";
                    _negate && (_query += "!"), _query += "(" + a + ")", _negate = !1, _queuedOperator = "", _orDepth = 0
                }, this._setCommand = function(a, b) {
                    _lastCommand = a, _lastField = b
                }, this._resetNegate = function() {
                    _negate = !1
                }, this._repeatCommand = function(a, b) {
                    return null === _lastCommand ? self : null !== a && null !== b ? _lastCommand(a, b) : null === _lastField ? _lastCommand(a) : _useProperties ? _lastCommand(_lastField, a) : _lastCommand(a)
                }, this._equals = function(a, b) {
                    return 0 === self._compare(a, b, 1)
                }, this._compare = function(a, b, c) {
                    var d = Object.prototype.toString;
                    return void 0 === c && (c = 1), void 0 === a && (a = null), void 0 === b && (b = null), null === a && null === b ? 0 : null === a && null !== b ? 1 : null !== a && null === b ? -1 : "[object Date]" === d.call(a) && "[object Date]" === d.call(b) ? b > a ? -c : a > b ? c : 0 : (_usecase || "number" == typeof a || "number" == typeof b || (a = String(a), b = String(b)), b > a ? -c : a > b ? c : 0)
                }, this._performSort = function() {
                    0 !== _sorting.length && (_data = self._doSort(_data, 0))
                }, this._doSort = function(a, b) {
                    var c = _sorting[b].by,
                        d = _sorting[b].dir,
                        e = _sorting[b].type,
                        f = _sorting[b].datefmt,
                        g = _sorting[b].sfunc;
                    if (b === _sorting.length - 1) return self._getOrder(a, c, d, e, f, g);
                    b++;
                    var h, i, j, k = self._getGroup(a, c, d, e, f),
                        l = [];
                    for (h = 0; h < k.length; h++)
                        for (j = self._doSort(k[h].items, b), i = 0; i < j.length; i++) l.push(j[i]);
                    return l
                }, this._getOrder = function(a, b, c, d, e, f) {
                    var g, h, i, j, k = [],
                        l = [],
                        m = "a" === c ? 1 : -1;
                    void 0 === d && (d = "text"), j = "float" === d || "number" === d || "currency" === d || "numeric" === d ? function(a) {
                        var b = parseFloat(String(a).replace(_stripNum, ""));
                        return isNaN(b) ? 0 : b
                    } : "int" === d || "integer" === d ? function(a) {
                        return a ? parseFloat(String(a).replace(_stripNum, "")) : 0
                    } : "date" === d || "datetime" === d ? function(a) {
                        return $.jgrid.parseDate(e, a).getTime()
                    } : $.isFunction(d) ? d : function(a) {
                        return a = a ? $.trim(String(a)) : "", _usecase ? a : a.toLowerCase()
                    }, $.each(a, function(a, c) {
                        h = "" !== b ? $.jgrid.getAccessor(c, b) : c, void 0 === h && (h = ""), h = j(h, c), l.push({
                            "vSort": h,
                            "index": a
                        })
                    }), $.isFunction(f) ? l.sort(function(a, b) {
                        return a = a.vSort, b = b.vSort, f.call(this, a, b, m)
                    }) : l.sort(function(a, b) {
                        return a = a.vSort, b = b.vSort, self._compare(a, b, m)
                    }), i = 0;
                    for (var n = a.length; n > i;) g = l[i].index, k.push(a[g]), i++;
                    return k
                }, this._getGroup = function(a, b, c, d, e) {
                    var f, g = [],
                        h = null,
                        i = null;
                    return $.each(self._getOrder(a, b, c, d, e), function(a, c) {
                        f = $.jgrid.getAccessor(c, b), null == f && (f = ""), self._equals(i, f) || (i = f, null !== h && g.push(h), h = self._group(b, f)), h.items.push(c)
                    }), null !== h && g.push(h), g
                }, this.ignoreCase = function() {
                    return _usecase = !1, self
                }, this.useCase = function() {
                    return _usecase = !0, self
                }, this.trim = function() {
                    return _trim = !0, self
                }, this.noTrim = function() {
                    return _trim = !1, self
                }, this.execute = function() {
                    var match = _query,
                        results = [];
                    return null === match ? self : ($.each(_data, function() {
                        eval(match) && results.push(this)
                    }), _data = results, self)
                }, this.data = function() {
                    return _data
                }, this.select = function(a) {
                    if (self._performSort(), !self._hasData()) return [];
                    if (self.execute(), $.isFunction(a)) {
                        var b = [];
                        return $.each(_data, function(c, d) {
                            b.push(a(d))
                        }), b
                    }
                    return _data
                }, this.hasMatch = function() {
                    return self._hasData() ? (self.execute(), _data.length > 0) : !1
                }, this.andNot = function(a, b, c) {
                    return _negate = !_negate, self.and(a, b, c)
                }, this.orNot = function(a, b, c) {
                    return _negate = !_negate, self.or(a, b, c)
                }, this.not = function(a, b, c) {
                    return self.andNot(a, b, c)
                }, this.and = function(a, b, c) {
                    return _queuedOperator = " && ", void 0 === a ? self : self._repeatCommand(a, b, c)
                }, this.or = function(a, b, c) {
                    return _queuedOperator = " || ", void 0 === a ? self : self._repeatCommand(a, b, c)
                }, this.orBegin = function() {
                    return _orDepth++, self
                }, this.orEnd = function() {
                    return null !== _query && (_query += ")"), self
                }, this.isNot = function(a) {
                    return _negate = !_negate, self.is(a)
                }, this.is = function(a) {
                    return self._append("this." + a), self._resetNegate(), self
                }, this._compareValues = function(a, b, c, d, e) {
                    var f;
                    f = _useProperties ? "jQuery.jgrid.getAccessor(this,'" + b + "')" : "this", void 0 === c && (c = null);
                    var g = c,
                        h = void 0 === e.stype ? "text" : e.stype;
                    if (null !== c) switch (h) {
                        case "int":
                        case "integer":
                            g = isNaN(Number(g)) || "" === g ? "0" : g, f = "parseInt(" + f + ",10)", g = "parseInt(" + g + ",10)";
                            break;
                        case "float":
                        case "number":
                        case "numeric":
                            g = String(g).replace(_stripNum, ""), g = isNaN(Number(g)) || "" === g ? "0" : g, f = "parseFloat(" + f + ")", g = "parseFloat(" + g + ")";
                            break;
                        case "date":
                        case "datetime":
                            g = String($.jgrid.parseDate(e.newfmt || "Y-m-d", g).getTime()), f = 'jQuery.jgrid.parseDate("' + e.srcfmt + '",' + f + ").getTime()";
                            break;
                        default:
                            f = self._getStr(f), g = self._getStr('"' + self._toStr(g) + '"')
                    }
                    return self._append(f + " " + d + " " + g), self._setCommand(a, b), self._resetNegate(), self
                }, this.equals = function(a, b, c) {
                    return self._compareValues(self.equals, a, b, "==", c)
                }, this.notEquals = function(a, b, c) {
                    return self._compareValues(self.equals, a, b, "!==", c)
                }, this.isNull = function(a, b, c) {
                    return self._compareValues(self.equals, a, null, "===", c)
                }, this.greater = function(a, b, c) {
                    return self._compareValues(self.greater, a, b, ">", c)
                }, this.less = function(a, b, c) {
                    return self._compareValues(self.less, a, b, "<", c)
                }, this.greaterOrEquals = function(a, b, c) {
                    return self._compareValues(self.greaterOrEquals, a, b, ">=", c)
                }, this.lessOrEquals = function(a, b, c) {
                    return self._compareValues(self.lessOrEquals, a, b, "<=", c)
                }, this.startsWith = function(a, b) {
                    var c = null == b ? a : b,
                        d = _trim ? $.trim(c.toString()).length : c.toString().length;
                    return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(0," + d + ") == " + self._getStr('"' + self._toStr(b) + '"')) : (null != b && (d = _trim ? $.trim(b.toString()).length : b.toString().length), self._append(self._getStr("this") + ".substr(0," + d + ") == " + self._getStr('"' + self._toStr(a) + '"'))), self._setCommand(self.startsWith, a), self._resetNegate(), self
                }, this.endsWith = function(a, b) {
                    var c = null == b ? a : b,
                        d = _trim ? $.trim(c.toString()).length : c.toString().length;
                    return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(" + self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".length-" + d + "," + d + ') == "' + self._toStr(b) + '"') : self._append(self._getStr("this") + ".substr(" + self._getStr("this") + '.length-"' + self._toStr(a) + '".length,"' + self._toStr(a) + '".length) == "' + self._toStr(a) + '"'), self._setCommand(self.endsWith, a), self._resetNegate(), self
                }, this.contains = function(a, b) {
                    return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + '.indexOf("' + self._toStr(b) + '",0) > -1') : self._append(self._getStr("this") + '.indexOf("' + self._toStr(a) + '",0) > -1'), self._setCommand(self.contains, a), self._resetNegate(), self
                }, this.groupBy = function(a, b, c, d) {
                    return self._hasData() ? self._getGroup(_data, a, b, c, d) : null
                }, this.orderBy = function(a, b, c, d, e) {
                    return b = null == b ? "a" : $.trim(b.toString().toLowerCase()), null == c && (c = "text"), null == d && (d = "Y-m-d"), null == e && (e = !1), ("desc" === b || "descending" === b) && (b = "d"), ("asc" === b || "ascending" === b) && (b = "a"), _sorting.push({
                        "by": a,
                        "dir": b,
                        "type": c,
                        "datefmt": d,
                        "sfunc": e
                    }), self
                }, self
            };
            return new QueryObject(source, null)
        },
        "getMethod": function(a) {
            return this.getAccessor($.fn.jqGrid, a)
        },
        "extend": function(a) {
            $.extend($.fn.jqGrid, a), this.no_legacy_api || $.fn.extend(a)
        }
    }), $.fn.jqGrid = function(a) {
        if ("string" == typeof a) {
            var b = $.jgrid.getMethod(a);
            if (!b) throw "jqGrid - No such method: " + a;
            var c = $.makeArray(arguments).slice(1);
            return b.apply(this, c)
        }
        return this.each(function() {
            if (!this.grid) {
                var b = $.extend(!0, {
                        "url": "",
                        "height": 150,
                        "page": 1,
                        "rowNum": 20,
                        "rowTotal": null,
                        "records": 0,
                        "pager": "",
                        "pgbuttons": !0,
                        "pginput": !0,
                        "colModel": [],
                        "rowList": [],
                        "colNames": [],
                        "sortorder": "asc",
                        "sortname": "",
                        "datatype": "xml",
                        "mtype": "GET",
                        "altRows": !1,
                        "selarrrow": [],
                        "savedRow": [],
                        "shrinkToFit": !0,
                        "xmlReader": {},
                        "jsonReader": {},
                        "subGrid": !1,
                        "subGridModel": [],
                        "reccount": 0,
                        "lastpage": 0,
                        "lastsort": 0,
                        "selrow": null,
                        "beforeSelectRow": null,
                        "onSelectRow": null,
                        "onSortCol": null,
                        "ondblClickRow": null,
                        "onRightClickRow": null,
                        "onPaging": null,
                        "onSelectAll": null,
                        "onInitGrid": null,
                        "loadComplete": null,
                        "gridComplete": null,
                        "loadError": null,
                        "loadBeforeSend": null,
                        "afterInsertRow": null,
                        "beforeRequest": null,
                        "beforeProcessing": null,
                        "onHeaderClick": null,
                        "viewrecords": !1,
                        "loadonce": !1,
                        "multiselect": !1,
                        "multikey": !1,
                        "editurl": null,
                        "search": !1,
                        "caption": "",
                        "hidegrid": !0,
                        "hiddengrid": !1,
                        "postData": {},
                        "userData": {},
                        "treeGrid": !1,
                        "treeGridModel": "nested",
                        "treeReader": {},
                        "treeANode": -1,
                        "ExpandColumn": null,
                        "tree_root_level": 0,
                        "prmNames": {
                            "page": "page",
                            "rows": "rows",
                            "sort": "sidx",
                            "order": "sord",
                            "search": "_search",
                            "nd": "nd",
                            "id": "id",
                            "oper": "oper",
                            "editoper": "edit",
                            "addoper": "add",
                            "deloper": "del",
                            "subgridid": "id",
                            "npage": null,
                            "totalrows": "totalrows"
                        },
                        "forceFit": !1,
                        "gridstate": "visible",
                        "cellEdit": !1,
                        "cellsubmit": "remote",
                        "nv": 0,
                        "loadui": "enable",
                        "toolbar": [!1, ""],
                        "scroll": !1,
                        "multiboxonly": !1,
                        "deselectAfterSort": !0,
                        "scrollrows": !1,
                        "autowidth": !1,
                        "scrollOffset": 18,
                        "cellLayout": 5,
                        "subGridWidth": 20,
                        "multiselectWidth": 20,
                        "gridview": !1,
                        "rownumWidth": 25,
                        "rownumbers": !1,
                        "pagerpos": "center",
                        "recordpos": "right",
                        "footerrow": !1,
                        "userDataOnFooter": !1,
                        "hoverrows": !0,
                        "altclass": "ui-priority-secondary",
                        "viewsortcols": [!1, "vertical", !0],
                        "resizeclass": "",
                        "autoencode": !1,
                        "remapColumns": [],
                        "ajaxGridOptions": {},
                        "direction": "ltr",
                        "toppager": !1,
                        "headertitles": !1,
                        "scrollTimeout": 40,
                        "data": [],
                        "_index": {},
                        "grouping": !1,
                        "groupingView": {
                            "groupField": [],
                            "groupOrder": [],
                            "groupText": [],
                            "groupColumnShow": [],
                            "groupSummary": [],
                            "showSummaryOnHide": !1,
                            "sortitems": [],
                            "sortnames": [],
                            "summary": [],
                            "summaryval": [],
                            "plusicon": "ui-icon-circlesmall-plus",
                            "minusicon": "ui-icon-circlesmall-minus",
                            "displayField": [],
                            "groupSummaryPos": [],
                            "formatDisplayField": [],
                            "_locgr": !1
                        },
                        "ignoreCase": !1,
                        "cmTemplate": {},
                        "idPrefix": "",
                        "multiSort": !1
                    }, $.jgrid.defaults, a || {}),
                    c = this,
                    d = {
                        "headers": [],
                        "cols": [],
                        "footers": [],
                        "dragStart": function(a, d, e) {
                            var f = $(this.bDiv).offset().left;
                            this.resizing = {
                                "idx": a,
                                "startX": d.clientX,
                                "sOL": d.clientX - f
                            }, this.hDiv.style.cursor = "col-resize", this.curGbox = $("#rs_m" + $.jgrid.jqID(b.id), "#gbox_" + $.jgrid.jqID(b.id)), this.curGbox.css({
                                "display": "block",
                                "left": d.clientX - f,
                                "top": e[1],
                                "height": e[2]
                            }), $(c).triggerHandler("jqGridResizeStart", [d, a]), $.isFunction(b.resizeStart) && b.resizeStart.call(c, d, a), document.onselectstart = function() {
                                return !1
                            }
                        },
                        "dragMove": function(a) {
                            if (this.resizing) {
                                var c, d, e = a.clientX - this.resizing.startX,
                                    f = this.headers[this.resizing.idx],
                                    g = "ltr" === b.direction ? f.width + e : f.width - e;
                                g > 33 && (this.curGbox.css({
                                    "left": this.resizing.sOL + e
                                }), b.forceFit === !0 ? (c = this.headers[this.resizing.idx + b.nv], d = "ltr" === b.direction ? c.width - e : c.width + e, d > 33 && (f.newWidth = g, c.newWidth = d)) : (this.newWidth = "ltr" === b.direction ? b.tblwidth + e : b.tblwidth - e, f.newWidth = g))
                            }
                        },
                        "dragEnd": function() {
                            if (this.hDiv.style.cursor = "default", this.resizing) {
                                var a = this.resizing.idx,
                                    d = this.headers[a].newWidth || this.headers[a].width;
                                d = parseInt(d, 10), this.resizing = !1, $("#rs_m" + $.jgrid.jqID(b.id)).css("display", "none"), b.colModel[a].width = d, this.headers[a].width = d, this.headers[a].el.style.width = d + "px", this.cols[a].style.width = d + "px", this.footers.length > 0 && (this.footers[a].style.width = d + "px"), b.forceFit === !0 ? (d = this.headers[a + b.nv].newWidth || this.headers[a + b.nv].width, this.headers[a + b.nv].width = d, this.headers[a + b.nv].el.style.width = d + "px", this.cols[a + b.nv].style.width = d + "px", this.footers.length > 0 && (this.footers[a + b.nv].style.width = d + "px"), b.colModel[a + b.nv].width = d) : (b.tblwidth = this.newWidth || b.tblwidth, $("table:first", this.bDiv).css("width", b.tblwidth + "px"), $("table:first", this.hDiv).css("width", b.tblwidth + "px"), this.hDiv.scrollLeft = this.bDiv.scrollLeft, b.footerrow && ($("table:first", this.sDiv).css("width", b.tblwidth + "px"), this.sDiv.scrollLeft = this.bDiv.scrollLeft)), $(c).triggerHandler("jqGridResizeStop", [d, a]), $.isFunction(b.resizeStop) && b.resizeStop.call(c, d, a)
                            }
                            this.curGbox = null, document.onselectstart = function() {
                                return !0
                            }
                        },
                        "populateVisible": function() {
                            d.timer && clearTimeout(d.timer), d.timer = null;
                            var a = $(d.bDiv).height();
                            if (a) {
                                var c, e, f = $("table:first", d.bDiv);
                                if (f[0].rows.length) try {
                                    c = f[0].rows[1], e = c ? $(c).outerHeight() || d.prevRowHeight : d.prevRowHeight
                                } catch (g) {
                                    e = d.prevRowHeight
                                }
                                if (e) {
                                    d.prevRowHeight = e;
                                    var h, i, j, k = b.rowNum,
                                        l = d.scrollTop = d.bDiv.scrollTop,
                                        m = Math.round(f.position().top) - l,
                                        n = m + f.height(),
                                        o = e * k;
                                    if (a > n && 0 >= m && (void 0 === b.lastpage || parseInt((n + l + o - 1) / o, 10) <= b.lastpage) && (i = parseInt((a - n + o - 1) / o, 10), n >= 0 || 2 > i || b.scroll === !0 ? (h = Math.round((n + l) / o) + 1, m = -1) : m = 1), m > 0 && (h = parseInt(l / o, 10) + 1, i = parseInt((l + a) / o, 10) + 2 - h, j = !0), i) {
                                        if (b.lastpage && (h > b.lastpage || 1 === b.lastpage || h === b.page && h === b.lastpage)) return;
                                        d.hDiv.loading ? d.timer = setTimeout(d.populateVisible, b.scrollTimeout) : (b.page = h, j && (d.selectionPreserver(f[0]), d.emptyRows.call(f[0], !1, !1)), d.populate(i))
                                    }
                                }
                            }
                        },
                        "scrollGrid": function(a) {
                            if (b.scroll) {
                                var c = d.bDiv.scrollTop;
                                void 0 === d.scrollTop && (d.scrollTop = 0), c !== d.scrollTop && (d.scrollTop = c, d.timer && clearTimeout(d.timer), d.timer = setTimeout(d.populateVisible, b.scrollTimeout))
                            }
                            d.hDiv.scrollLeft = d.bDiv.scrollLeft, b.footerrow && (d.sDiv.scrollLeft = d.bDiv.scrollLeft), a && a.stopPropagation()
                        },
                        "selectionPreserver": function(a) {
                            var b = a.p,
                                c = b.selrow,
                                d = b.selarrrow ? $.makeArray(b.selarrrow) : null,
                                e = a.grid.bDiv.scrollLeft,
                                f = function() {
                                    var g;
                                    if (b.selrow = null, b.selarrrow = [], b.multiselect && d && d.length > 0)
                                        for (g = 0; g < d.length; g++) d[g] !== c && $(a).jqGrid("setSelection", d[g], !1, null);
                                    c && $(a).jqGrid("setSelection", c, !1, null), a.grid.bDiv.scrollLeft = e, $(a).unbind(".selectionPreserver", f)
                                };
                            $(a).bind("jqGridGridComplete.selectionPreserver", f)
                        }
                    };
                if ("TABLE" !== this.tagName.toUpperCase()) return void alert("Element is not a table");
                if (void 0 !== document.documentMode && document.documentMode <= 5) return void alert("Grid can not be used in this ('quirks') mode!");
                $(this).empty().attr("tabindex", "0"), this.p = b, this.p.useProp = !!$.fn.prop;
                var e, f;
                if (0 === this.p.colNames.length)
                    for (e = 0; e < this.p.colModel.length; e++) this.p.colNames[e] = this.p.colModel[e].label || this.p.colModel[e].name;
                if (this.p.colNames.length !== this.p.colModel.length) return void alert($.jgrid.errors.model);
                var g = $("<div class='ui-jqgrid-view'></div>"),
                    h = $.jgrid.msie;
                c.p.direction = $.trim(c.p.direction.toLowerCase()), -1 === $.inArray(c.p.direction, ["ltr", "rtl"]) && (c.p.direction = "ltr"), f = c.p.direction, $(g).insertBefore(this), $(this).removeClass("scroll").appendTo(g);
                var i = $("<div class='ui-jqgrid ui-widget ui-widget-content ui-corner-all'></div>");
                $(i).attr({
                    "id": "gbox_" + this.id,
                    "dir": f
                }).insertBefore(g), $(g).attr("id", "gview_" + this.id).appendTo(i), $("<div class='ui-widget-overlay jqgrid-overlay' id='lui_" + this.id + "'></div>").insertBefore(g), $("<div class='loading ui-state-default ui-state-active' id='load_" + this.id + "'>" + this.p.loadtext + "</div>").insertBefore(g), $(this).attr({
                    "cellspacing": "0",
                    "cellpadding": "0",
                    "border": "0",
                    "role": "grid",
                    "aria-multiselectable": !!this.p.multiselect,
                    "aria-labelledby": "gbox_" + this.id
                });
                var j = ["shiftKey", "altKey", "ctrlKey"],
                    k = function(a, b) {
                        return a = parseInt(a, 10), isNaN(a) ? b || 0 : a
                    },
                    l = function(a, b, e, f, g, h) {
                        var i, j = c.p.colModel[a],
                            k = j.align,
                            l = 'style="',
                            m = j.classes,
                            n = j.name,
                            o = [];
                        return k && (l += "text-align:" + k + ";"), j.hidden === !0 && (l += "display:none;"), 0 === b ? l += "width: " + d.headers[a].width + "px;" : j.cellattr && $.isFunction(j.cellattr) && (i = j.cellattr.call(c, g, e, f, j, h), i && "string" == typeof i && (i = i.replace(/style/i, "style").replace(/title/i, "title"), i.indexOf("title") > -1 && (j.title = !1), i.indexOf("class") > -1 && (m = void 0), o = i.replace("-style", "-sti").split(/style/), 2 === o.length ? (o[1] = $.trim(o[1].replace("-sti", "-style").replace("=", "")), (0 === o[1].indexOf("'") || 0 === o[1].indexOf('"')) && (o[1] = o[1].substring(1)), l += o[1].replace(/'/gi, '"')) : l += '"')), o.length || (o[0] = "", l += '"'), l += (void 0 !== m ? ' class="' + m + '"' : "") + (j.title && e ? ' title="' + $.jgrid.stripHtml(e) + '"' : ""), l += ' aria-describedby="' + c.p.id + "_" + n + '"', l + o[0]
                    },
                    m = function(a) {
                        return null == a || "" === a ? "&#160;" : c.p.autoencode ? $.jgrid.htmlEncode(a) : String(a)
                    },
                    n = function(a, b, d, e, f) {
                        var g, h = c.p.colModel[d];
                        if (void 0 !== h.formatter) {
                            a = "" !== String(c.p.idPrefix) ? $.jgrid.stripPref(c.p.idPrefix, a) : a;
                            var i = {
                                "rowId": a,
                                "colModel": h,
                                "gid": c.p.id,
                                "pos": d
                            };
                            g = $.isFunction(h.formatter) ? h.formatter.call(c, b, i, e, f) : $.fmatter ? $.fn.fmatter.call(c, h.formatter, b, i, e, f) : m(b)
                        } else g = m(b);
                        return g
                    },
                    o = function(a, b, c, d, e, f) {
                        var g, h;
                        return g = n(a, b, c, e, "add"), h = l(c, d, g, e, a, f), '<td role="gridcell" ' + h + ">" + g + "</td>"
                    },
                    p = function(a, b, d, e) {
                        var f = '<input role="checkbox" type="checkbox" id="jqg_' + c.p.id + "_" + a + '" class="cbox" name="jqg_' + c.p.id + "_" + a + '"' + (e ? 'checked="checked"' : "") + "/>",
                            g = l(b, d, "", null, a, !0);
                        return '<td role="gridcell" ' + g + ">" + f + "</td>"
                    },
                    q = function(a, b, c, d) {
                        var e = (parseInt(c, 10) - 1) * parseInt(d, 10) + 1 + b,
                            f = l(a, b, e, null, b, !0);
                        return '<td role="gridcell" class="ui-state-default jqgrid-rownum" ' + f + ">" + e + "</td>"
                    },
                    r = function(a) {
                        var b, d, e = [],
                            f = 0;
                        for (d = 0; d < c.p.colModel.length; d++) b = c.p.colModel[d], "cb" !== b.name && "subgrid" !== b.name && "rn" !== b.name && (e[f] = "local" === a ? b.name : "xml" === a || "xmlstring" === a ? b.xmlmap || b.name : b.jsonmap || b.name, c.p.keyIndex !== !1 && b.key === !0 && (c.p.keyName = e[f]), f++);
                        return e
                    },
                    s = function(a) {
                        var b = c.p.remapColumns;
                        return b && b.length || (b = $.map(c.p.colModel, function(a, b) {
                            return b
                        })), a && (b = $.map(b, function(b) {
                            return a > b ? null : b - a
                        })), b
                    },
                    t = function(a, b) {
                        var c;
                        this.p.deepempty ? $(this.rows).slice(1).remove() : (c = this.rows.length > 0 ? this.rows[0] : null, $(this.firstChild).empty().append(c)), a && this.p.scroll && ($(this.grid.bDiv.firstChild).css({
                            "height": "auto"
                        }), $(this.grid.bDiv.firstChild.firstChild).css({
                            "height": 0,
                            "display": "none"
                        }), 0 !== this.grid.bDiv.scrollTop && (this.grid.bDiv.scrollTop = 0)), b === !0 && this.p.treeGrid && (this.p.data = [], this.p._index = {})
                    },
                    u = function() {
                        var a, b, d, e = c.p.data.length,
                            f = c.p.rownumbers === !0 ? 1 : 0,
                            g = c.p.multiselect === !0 ? 1 : 0,
                            h = c.p.subGrid === !0 ? 1 : 0;
                        for (a = c.p.keyIndex === !1 || c.p.loadonce === !0 ? c.p.localReader.id : c.p.colModel[c.p.keyIndex + g + h + f].name, b = 0; e > b; b++) d = $.jgrid.getAccessor(c.p.data[b], a), void 0 === d && (d = String(b + 1)), c.p._index[d] = b
                    },
                    v = function(a, b, d, e, f, g) {
                        var h, i = "-1",
                            j = "",
                            k = b ? "display:none;" : "",
                            l = "ui-widget-content jqgrow ui-row-" + c.p.direction + (d ? " " + d : "") + (g ? " ui-state-highlight" : ""),
                            m = $(c).triggerHandler("jqGridRowAttr", [e, f, a]);
                        if ("object" != typeof m && (m = $.isFunction(c.p.rowattr) ? c.p.rowattr.call(c, e, f, a) : {}), !$.isEmptyObject(m)) {
                            m.hasOwnProperty("id") && (a = m.id, delete m.id), m.hasOwnProperty("tabindex") && (i = m.tabindex, delete m.tabindex), m.hasOwnProperty("style") && (k += m.style, delete m.style), m.hasOwnProperty("class") && (l += " " + m["class"], delete m["class"]);
                            try {
                                delete m.role
                            } catch (n) {}
                            for (h in m) m.hasOwnProperty(h) && (j += " " + h + "=" + m[h])
                        }
                        return '<tr role="row" id="' + a + '" tabindex="' + i + '" class="' + l + '"' + ("" === k ? "" : ' style="' + k + '"') + j + ">"
                    },
                    w = function(a, b, d, e, f) {
                        var g = new Date,
                            h = "local" !== c.p.datatype && c.p.loadonce || "xmlstring" === c.p.datatype,
                            i = "_id_",
                            j = c.p.xmlReader,
                            l = "local" === c.p.datatype ? "local" : "xml";
                        if (h && (c.p.data = [], c.p._index = {}, c.p.localReader.id = i), c.p.reccount = 0, $.isXMLDoc(a)) {
                            -1 !== c.p.treeANode || c.p.scroll ? d = d > 1 ? d : 1 : (t.call(c, !1, !0), d = 1);
                            var m, n, u, w, x, y, z, A, B, C, D = $(c),
                                E = 0,
                                F = c.p.multiselect === !0 ? 1 : 0,
                                G = 0,
                                H = c.p.rownumbers === !0 ? 1 : 0,
                                I = [],
                                J = {},
                                K = [],
                                L = c.p.altRows === !0 ? c.p.altclass : "";
                            c.p.subGrid === !0 && (G = 1, w = $.jgrid.getMethod("addSubGridCell")), j.repeatitems || (I = r(l)), x = c.p.keyIndex === !1 ? $.isFunction(j.id) ? j.id.call(c, a) : j.id : c.p.keyIndex, I.length > 0 && !isNaN(x) && (x = c.p.keyName), y = -1 === String(x).indexOf("[") ? I.length ? function(a, b) {
                                return $(x, a).text() || b
                            } : function(a, b) {
                                return $(j.cell, a).eq(x).text() || b
                            } : function(a, b) {
                                return a.getAttribute(x.replace(/[\[\]]/g, "")) || b
                            }, c.p.userData = {}, c.p.page = k($.jgrid.getXmlData(a, j.page), c.p.page), c.p.lastpage = k($.jgrid.getXmlData(a, j.total), 1), c.p.records = k($.jgrid.getXmlData(a, j.records)), $.isFunction(j.userdata) ? c.p.userData = j.userdata.call(c, a) || {} : $.jgrid.getXmlData(a, j.userdata, !0).each(function() {
                                c.p.userData[this.getAttribute("name")] = $(this).text()
                            });
                            var M = $.jgrid.getXmlData(a, j.root, !0);
                            M = $.jgrid.getXmlData(M, j.row, !0), M || (M = []);
                            var N, O = M.length,
                                P = 0,
                                Q = [],
                                R = parseInt(c.p.rowNum, 10),
                                S = c.p.scroll ? $.jgrid.randId() : 1;
                            if (O > 0 && c.p.page <= 0 && (c.p.page = 1), M && O) {
                                f && (R *= f + 1);
                                var T, U = $.isFunction(c.p.afterInsertRow),
                                    V = !1;
                                for (c.p.grouping && (V = c.p.groupingView.groupCollapse === !0, T = $.jgrid.getMethod("groupingPrepare")); O > P;) {
                                    A = M[P], B = y(A, S + P), B = c.p.idPrefix + B, N = 0 === d ? 0 : d + 1, C = (N + P) % 2 === 1 ? L : "";
                                    var W = K.length;
                                    if (K.push(""), H && K.push(q(0, P, c.p.page, c.p.rowNum)), F && K.push(p(B, H, P, !1)), G && K.push(w.call(D, F + H, P + d)), j.repeatitems) {
                                        z || (z = s(F + G + H));
                                        var X = $.jgrid.getXmlData(A, j.cell, !0);
                                        $.each(z, function(a) {
                                            var b = X[this];
                                            return b ? (u = b.textContent || b.text, J[c.p.colModel[a + F + G + H].name] = u, void K.push(o(B, u, a + F + G + H, P + d, A, J))) : !1
                                        })
                                    } else
                                        for (m = 0; m < I.length; m++) u = $.jgrid.getXmlData(A, I[m]), J[c.p.colModel[m + F + G + H].name] = u, K.push(o(B, u, m + F + G + H, P + d, A, J));
                                    if (K[W] = v(B, V, C, J, A, !1), K.push("</tr>"), c.p.grouping && (Q.push(K), c.p.groupingView._locgr || T.call(D, J, P), K = []), (h || c.p.treeGrid === !0) && (J[i] = $.jgrid.stripPref(c.p.idPrefix, B), c.p.data.push(J), c.p._index[J[i]] = c.p.data.length - 1), c.p.gridview === !1 && ($("tbody:first", b).append(K.join("")), D.triggerHandler("jqGridAfterInsertRow", [B, J, A]), U && c.p.afterInsertRow.call(c, B, J, A), K = []), J = {}, E++, P++, E === R) break
                                }
                            }
                            if (c.p.gridview === !0 && (n = c.p.treeANode > -1 ? c.p.treeANode : 0, c.p.grouping ? (h || D.jqGrid("groupingRender", Q, c.p.colModel.length, c.p.page, R), Q = null) : c.p.treeGrid === !0 && n > 0 ? $(c.rows[n]).after(K.join("")) : $("tbody:first", b).append(K.join(""))), c.p.subGrid === !0) try {
                                D.jqGrid("addSubGrid", F + H)
                            } catch (Y) {}
                            if (c.p.totaltime = new Date - g, E > 0 && 0 === c.p.records && (c.p.records = O), K = null, c.p.treeGrid === !0) try {
                                D.jqGrid("setTreeNode", n + 1, E + n + 1)
                            } catch (Z) {}
                            if (c.p.treeGrid || c.p.scroll || (c.grid.bDiv.scrollTop = 0), c.p.reccount = E, c.p.treeANode = -1, c.p.userDataOnFooter && D.jqGrid("footerData", "set", c.p.userData, !0), h && (c.p.records = O, c.p.lastpage = Math.ceil(O / R)), e || c.updatepager(!1, !0), h) {
                                for (; O > E;) {
                                    if (A = M[E], B = y(A, E + S), B = c.p.idPrefix + B, j.repeatitems) {
                                        z || (z = s(F + G + H));
                                        var _ = $.jgrid.getXmlData(A, j.cell, !0);
                                        $.each(z, function(a) {
                                            var b = _[this];
                                            return b ? (u = b.textContent || b.text, void(J[c.p.colModel[a + F + G + H].name] = u)) : !1
                                        })
                                    } else
                                        for (m = 0; m < I.length; m++) u = $.jgrid.getXmlData(A, I[m]), J[c.p.colModel[m + F + G + H].name] = u;
                                    J[i] = $.jgrid.stripPref(c.p.idPrefix, B), c.p.grouping && T.call(D, J, E), c.p.data.push(J), c.p._index[J[i]] = c.p.data.length - 1, J = {}, E++
                                }
                                c.p.grouping && (c.p.groupingView._locgr = !0, D.jqGrid("groupingRender", Q, c.p.colModel.length, c.p.page, R), Q = null)
                            }
                        }
                    },
                    x = function(a, b, d, e, f) {
                        var g = new Date;
                        if (a) {
                            -1 !== c.p.treeANode || c.p.scroll ? d = d > 1 ? d : 1 : (t.call(c, !1, !0), d = 1);
                            var h, i, j = "_id_",
                                l = "local" !== c.p.datatype && c.p.loadonce || "jsonstring" === c.p.datatype;
                            l && (c.p.data = [], c.p._index = {}, c.p.localReader.id = j), c.p.reccount = 0, "local" === c.p.datatype ? (h = c.p.localReader, i = "local") : (h = c.p.jsonReader, i = "json");
                            var m, n, u, w, x, y, z, A, B, C, D, E, F = $(c),
                                G = 0,
                                H = [],
                                I = c.p.multiselect ? 1 : 0,
                                J = c.p.subGrid === !0 ? 1 : 0,
                                K = c.p.rownumbers === !0 ? 1 : 0,
                                L = s(I + J + K),
                                M = r(i),
                                N = {},
                                O = [],
                                P = c.p.altRows === !0 ? c.p.altclass : "";
                            c.p.page = k($.jgrid.getAccessor(a, h.page), c.p.page), c.p.lastpage = k($.jgrid.getAccessor(a, h.total), 1), c.p.records = k($.jgrid.getAccessor(a, h.records)), c.p.userData = $.jgrid.getAccessor(a, h.userdata) || {}, J && (x = $.jgrid.getMethod("addSubGridCell")), B = c.p.keyIndex === !1 ? $.isFunction(h.id) ? h.id.call(c, a) : h.id : c.p.keyIndex, h.repeatitems || (H = M, H.length > 0 && !isNaN(B) && (B = c.p.keyName)), A = $.jgrid.getAccessor(a, h.root), null == A && $.isArray(a) && (A = a), A || (A = []), z = A.length, n = 0, z > 0 && c.p.page <= 0 && (c.p.page = 1);
                            var Q, R, S = parseInt(c.p.rowNum, 10),
                                T = c.p.scroll ? $.jgrid.randId() : 1,
                                U = !1;
                            f && (S *= f + 1), "local" !== c.p.datatype || c.p.deselectAfterSort || (U = !0);
                            var V, W = $.isFunction(c.p.afterInsertRow),
                                X = [],
                                Y = !1;
                            for (c.p.grouping && (Y = c.p.groupingView.groupCollapse === !0, V = $.jgrid.getMethod("groupingPrepare")); z > n;) {
                                if (w = A[n], D = $.jgrid.getAccessor(w, B), void 0 === D && ("number" == typeof B && null != c.p.colModel[B + I + J + K] && (D = $.jgrid.getAccessor(w, c.p.colModel[B + I + J + K].name)), void 0 === D && (D = T + n, 0 === H.length && h.cell))) {
                                    var Z = $.jgrid.getAccessor(w, h.cell) || w;
                                    D = null != Z && void 0 !== Z[B] ? Z[B] : D, Z = null
                                }
                                D = c.p.idPrefix + D, Q = 1 === d ? 0 : d, E = (Q + n) % 2 === 1 ? P : "", U && (R = c.p.multiselect ? -1 !== $.inArray(D, c.p.selarrrow) : D === c.p.selrow);
                                var _ = O.length;
                                for (O.push(""), K && O.push(q(0, n, c.p.page, c.p.rowNum)), I && O.push(p(D, K, n, R)), J && O.push(x.call(F, I + K, n + d)), y = M, h.repeatitems && (h.cell && (w = $.jgrid.getAccessor(w, h.cell) || w), $.isArray(w) && (y = L)), u = 0; u < y.length; u++) m = $.jgrid.getAccessor(w, y[u]), N[c.p.colModel[u + I + J + K].name] = m, O.push(o(D, m, u + I + J + K, n + d, w, N));
                                if (O[_] = v(D, Y, E, N, w, R), O.push("</tr>"), c.p.grouping && (X.push(O), c.p.groupingView._locgr || V.call(F, N, n), O = []), (l || c.p.treeGrid === !0) && (N[j] = $.jgrid.stripPref(c.p.idPrefix, D),
                                        c.p.data.push(N), c.p._index[N[j]] = c.p.data.length - 1), c.p.gridview === !1 && ($("#" + $.jgrid.jqID(c.p.id) + " tbody:first").append(O.join("")), F.triggerHandler("jqGridAfterInsertRow", [D, N, w]), W && c.p.afterInsertRow.call(c, D, N, w), O = []), N = {}, G++, n++, G === S) break
                            }
                            if (c.p.gridview === !0 && (C = c.p.treeANode > -1 ? c.p.treeANode : 0, c.p.grouping ? l || (F.jqGrid("groupingRender", X, c.p.colModel.length, c.p.page, S), X = null) : c.p.treeGrid === !0 && C > 0 ? $(c.rows[C]).after(O.join("")) : $("#" + $.jgrid.jqID(c.p.id) + " tbody:first").append(O.join(""))), c.p.subGrid === !0) try {
                                F.jqGrid("addSubGrid", I + K)
                            } catch (aa) {}
                            if (c.p.totaltime = new Date - g, G > 0 && 0 === c.p.records && (c.p.records = z), O = null, c.p.treeGrid === !0) try {
                                F.jqGrid("setTreeNode", C + 1, G + C + 1)
                            } catch (ba) {}
                            if (c.p.treeGrid || c.p.scroll || (c.grid.bDiv.scrollTop = 0), c.p.reccount = G, c.p.treeANode = -1, c.p.userDataOnFooter && F.jqGrid("footerData", "set", c.p.userData, !0), l && (c.p.records = z, c.p.lastpage = Math.ceil(z / S)), e || c.updatepager(!1, !0), l) {
                                for (; z > G && A[G];) {
                                    if (w = A[G], D = $.jgrid.getAccessor(w, B), void 0 === D && ("number" == typeof B && null != c.p.colModel[B + I + J + K] && (D = $.jgrid.getAccessor(w, c.p.colModel[B + I + J + K].name)), void 0 === D && (D = T + G, 0 === H.length && h.cell))) {
                                        var ca = $.jgrid.getAccessor(w, h.cell) || w;
                                        D = null != ca && void 0 !== ca[B] ? ca[B] : D, ca = null
                                    }
                                    if (w) {
                                        for (D = c.p.idPrefix + D, y = M, h.repeatitems && (h.cell && (w = $.jgrid.getAccessor(w, h.cell) || w), $.isArray(w) && (y = L)), u = 0; u < y.length; u++) N[c.p.colModel[u + I + J + K].name] = $.jgrid.getAccessor(w, y[u]);
                                        N[j] = $.jgrid.stripPref(c.p.idPrefix, D), c.p.grouping && V.call(F, N, G), c.p.data.push(N), c.p._index[N[j]] = c.p.data.length - 1, N = {}
                                    }
                                    G++
                                }
                                c.p.grouping && (c.p.groupingView._locgr = !0, F.jqGrid("groupingRender", X, c.p.colModel.length, c.p.page, S), X = null)
                            }
                        }
                    },
                    y = function() {
                        function a(b) {
                            var c, d, e, f, g, h = 0;
                            if (null != b.groups) {
                                for (d = b.groups.length && "OR" === b.groupOp.toString().toUpperCase(), d && p.orBegin(), c = 0; c < b.groups.length; c++) {
                                    h > 0 && d && p.or();
                                    try {
                                        a(b.groups[c])
                                    } catch (j) {
                                        alert(j)
                                    }
                                    h++
                                }
                                d && p.orEnd()
                            }
                            if (null != b.rules) try {
                                for (e = b.rules.length && "OR" === b.groupOp.toString().toUpperCase(), e && p.orBegin(), c = 0; c < b.rules.length; c++) g = b.rules[c], f = b.groupOp.toString().toUpperCase(), o[g.op] && g.field && (h > 0 && f && "OR" === f && (p = p.or()), p = o[g.op](p, f)(g.field, g.data, i[g.field])), h++;
                                e && p.orEnd()
                            } catch (k) {
                                alert(k)
                            }
                        }
                        var b, d, e, f = c.p.multiSort ? [] : "",
                            g = [],
                            h = !1,
                            i = {},
                            j = [],
                            k = [];
                        if ($.isArray(c.p.data)) {
                            var l, m, n = c.p.grouping ? c.p.groupingView : !1;
                            if ($.each(c.p.colModel, function() {
                                    if (d = this.sorttype || "text", "date" === d || "datetime" === d ? (this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? (b = this.formatoptions && this.formatoptions.srcformat ? this.formatoptions.srcformat : $.jgrid.formatter.date.srcformat, e = this.formatoptions && this.formatoptions.newformat ? this.formatoptions.newformat : $.jgrid.formatter.date.newformat) : b = e = this.datefmt || "Y-m-d", i[this.name] = {
                                            "stype": d,
                                            "srcfmt": b,
                                            "newfmt": e,
                                            "sfunc": this.sortfunc || null
                                        }) : i[this.name] = {
                                            "stype": d,
                                            "srcfmt": "",
                                            "newfmt": "",
                                            "sfunc": this.sortfunc || null
                                        }, c.p.grouping)
                                        for (m = 0, l = n.groupField.length; l > m; m++)
                                            if (this.name === n.groupField[m]) {
                                                var a = this.name;
                                                this.index && (a = this.index), j[m] = i[a], k[m] = a
                                            }
                                    if (c.p.multiSort) {
                                        if (this.lso) {
                                            f.push(this.name);
                                            var o = this.lso.split("-");
                                            g.push(o[o.length - 1])
                                        }
                                    } else h || this.index !== c.p.sortname && this.name !== c.p.sortname || (f = this.name, h = !0)
                                }), c.p.treeGrid) return void $(c).jqGrid("SortTree", f, c.p.sortorder, i[f].stype || "text", i[f].srcfmt || "");
                            var o = {
                                    "eq": function(a) {
                                        return a.equals
                                    },
                                    "ne": function(a) {
                                        return a.notEquals
                                    },
                                    "lt": function(a) {
                                        return a.less
                                    },
                                    "le": function(a) {
                                        return a.lessOrEquals
                                    },
                                    "gt": function(a) {
                                        return a.greater
                                    },
                                    "ge": function(a) {
                                        return a.greaterOrEquals
                                    },
                                    "cn": function(a) {
                                        return a.contains
                                    },
                                    "nc": function(a, b) {
                                        return "OR" === b ? a.orNot().contains : a.andNot().contains
                                    },
                                    "bw": function(a) {
                                        return a.startsWith
                                    },
                                    "bn": function(a, b) {
                                        return "OR" === b ? a.orNot().startsWith : a.andNot().startsWith
                                    },
                                    "en": function(a, b) {
                                        return "OR" === b ? a.orNot().endsWith : a.andNot().endsWith
                                    },
                                    "ew": function(a) {
                                        return a.endsWith
                                    },
                                    "ni": function(a, b) {
                                        return "OR" === b ? a.orNot().equals : a.andNot().equals
                                    },
                                    "in": function(a) {
                                        return a.equals
                                    },
                                    "nu": function(a) {
                                        return a.isNull
                                    },
                                    "nn": function(a, b) {
                                        return "OR" === b ? a.orNot().isNull : a.andNot().isNull
                                    }
                                },
                                p = $.jgrid.from(c.p.data);
                            if (c.p.ignoreCase && (p = p.ignoreCase()), c.p.search === !0) {
                                var q = c.p.postData.filters;
                                if (q) "string" == typeof q && (q = $.jgrid.parse(q)), a(q);
                                else try {
                                    p = o[c.p.postData.searchOper](p)(c.p.postData.searchField, c.p.postData.searchString, i[c.p.postData.searchField])
                                } catch (r) {}
                            }
                            if (c.p.grouping)
                                for (m = 0; l > m; m++) p.orderBy(k[m], n.groupOrder[m], j[m].stype, j[m].srcfmt);
                            c.p.multiSort ? $.each(f, function(a) {
                                p.orderBy(this, g[a], i[this].stype, i[this].srcfmt, i[this].sfunc)
                            }) : f && c.p.sortorder && h && ("DESC" === c.p.sortorder.toUpperCase() ? p.orderBy(c.p.sortname, "d", i[f].stype, i[f].srcfmt, i[f].sfunc) : p.orderBy(c.p.sortname, "a", i[f].stype, i[f].srcfmt, i[f].sfunc));
                            var s = p.select(),
                                t = parseInt(c.p.rowNum, 10),
                                u = s.length,
                                v = parseInt(c.p.page, 10),
                                w = Math.ceil(u / t),
                                x = {};
                            if ((c.p.search || c.p.resetsearch) && c.p.grouping && c.p.groupingView._locgr) {
                                c.p.groupingView.groups = [];
                                var y, z, A, B = $.jgrid.getMethod("groupingPrepare");
                                if (c.p.footerrow && c.p.userDataOnFooter) {
                                    for (z in c.p.userData) c.p.userData.hasOwnProperty(z) && (c.p.userData[z] = 0);
                                    A = !0
                                }
                                for (y = 0; u > y; y++) {
                                    if (A)
                                        for (z in c.p.userData) c.p.userData[z] += parseFloat(s[y][z] || 0);
                                    B.call($(c), s[y], y, t)
                                }
                            }
                            return s = s.slice((v - 1) * t, v * t), p = null, i = null, x[c.p.localReader.total] = w, x[c.p.localReader.page] = v, x[c.p.localReader.records] = u, x[c.p.localReader.root] = s, x[c.p.localReader.userdata] = c.p.userData, s = null, x
                        }
                    },
                    z = function(a, b) {
                        var d, e, f, g, h, i, j, l, m = "",
                            n = c.p.pager ? "_" + $.jgrid.jqID(c.p.pager.substr(1)) : "",
                            o = c.p.toppager ? "_" + c.p.toppager.substr(1) : "";
                        if (f = parseInt(c.p.page, 10) - 1, 0 > f && (f = 0), f *= parseInt(c.p.rowNum, 10), h = f + c.p.reccount, c.p.scroll) {
                            var p = $("tbody:first > tr:gt(0)", c.grid.bDiv);
                            f = h - p.length, c.p.reccount = p.length;
                            var q = p.outerHeight() || c.grid.prevRowHeight;
                            if (q) {
                                var r = f * q,
                                    s = parseInt(c.p.records, 10) * q;
                                $(">div:first", c.grid.bDiv).css({
                                    "height": s
                                }).children("div:first").css({
                                    "height": r,
                                    "display": r ? "" : "none"
                                }), 0 == c.grid.bDiv.scrollTop && c.p.page > 1 && (c.grid.bDiv.scrollTop = c.p.rowNum * (c.p.page - 1) * q)
                            }
                            c.grid.bDiv.scrollLeft = c.grid.hDiv.scrollLeft
                        }
                        m = c.p.pager || "", m += c.p.toppager ? m ? "," + c.p.toppager : c.p.toppager : "", m && (j = $.jgrid.formatter.integer || {}, d = k(c.p.page), e = k(c.p.lastpage), $(".selbox", m)[this.p.useProp ? "prop" : "attr"]("disabled", !1), c.p.pginput === !0 && ($(".ui-pg-input", m).val(c.p.page), l = c.p.toppager ? "#sp_1" + n + ",#sp_1" + o : "#sp_1" + n, $(l).html($.fmatter ? $.fmatter.util.NumberFormat(c.p.lastpage, j) : c.p.lastpage)), c.p.viewrecords && (0 === c.p.reccount ? $(".ui-paging-info", m).html(c.p.emptyrecords) : (g = f + 1, i = c.p.records, $.fmatter && (g = $.fmatter.util.NumberFormat(g, j), h = $.fmatter.util.NumberFormat(h, j), i = $.fmatter.util.NumberFormat(i, j)), $(".ui-paging-info", m).html($.jgrid.format(c.p.recordtext, g, h, i)))), c.p.pgbuttons === !0 && (0 >= d && (d = e = 0), 1 === d || 0 === d ? ($("#first" + n + ", #prev" + n).addClass("ui-state-disabled").removeClass("ui-state-hover"), c.p.toppager && $("#first_t" + o + ", #prev_t" + o).addClass("ui-state-disabled").removeClass("ui-state-hover")) : ($("#first" + n + ", #prev" + n).removeClass("ui-state-disabled"), c.p.toppager && $("#first_t" + o + ", #prev_t" + o).removeClass("ui-state-disabled")), d === e || 0 === d ? ($("#next" + n + ", #last" + n).addClass("ui-state-disabled").removeClass("ui-state-hover"), c.p.toppager && $("#next_t" + o + ", #last_t" + o).addClass("ui-state-disabled").removeClass("ui-state-hover")) : ($("#next" + n + ", #last" + n).removeClass("ui-state-disabled"), c.p.toppager && $("#next_t" + o + ", #last_t" + o).removeClass("ui-state-disabled")))), a === !0 && c.p.rownumbers === !0 && $(">td.jqgrid-rownum", c.rows).each(function(a) {
                            $(this).html(f + 1 + a)
                        }), b && c.p.jqgdnd && $(c).jqGrid("gridDnD", "updateDnD"), $(c).triggerHandler("jqGridGridComplete"), $.isFunction(c.p.gridComplete) && c.p.gridComplete.call(c), $(c).triggerHandler("jqGridAfterGridComplete")
                    },
                    A = function() {
                        if (c.grid.hDiv.loading = !0, !c.p.hiddengrid) switch (c.p.loadui) {
                            case "disable":
                                break;
                            case "enable":
                                $("#load_" + $.jgrid.jqID(c.p.id)).show();
                                break;
                            case "block":
                                $("#lui_" + $.jgrid.jqID(c.p.id)).show(), $("#load_" + $.jgrid.jqID(c.p.id)).show()
                        }
                    },
                    B = function() {
                        switch (c.grid.hDiv.loading = !1, c.p.loadui) {
                            case "disable":
                                break;
                            case "enable":
                                $("#load_" + $.jgrid.jqID(c.p.id)).hide();
                                break;
                            case "block":
                                $("#lui_" + $.jgrid.jqID(c.p.id)).hide(), $("#load_" + $.jgrid.jqID(c.p.id)).hide()
                        }
                    },
                    C = function(a) {
                        if (!c.grid.hDiv.loading) {
                            var b, d, e = c.p.scroll && a === !1,
                                f = {},
                                g = c.p.prmNames;
                            c.p.page <= 0 && (c.p.page = Math.min(1, c.p.lastpage)), null !== g.search && (f[g.search] = c.p.search), null !== g.nd && (f[g.nd] = (new Date).getTime()), null !== g.rows && (f[g.rows] = c.p.rowNum), null !== g.page && (f[g.page] = c.p.page), null !== g.sort && (f[g.sort] = c.p.sortname), null !== g.order && (f[g.order] = c.p.sortorder), null !== c.p.rowTotal && null !== g.totalrows && (f[g.totalrows] = c.p.rowTotal);
                            var h = $.isFunction(c.p.loadComplete),
                                i = h ? c.p.loadComplete : null,
                                j = 0;
                            if (a = a || 1, a > 1 ? null !== g.npage ? (f[g.npage] = a, j = a - 1, a = 1) : i = function(b) {
                                    c.p.page++, c.grid.hDiv.loading = !1, h && c.p.loadComplete.call(c, b), C(a - 1)
                                } : null !== g.npage && delete c.p.postData[g.npage], c.p.grouping) {
                                $(c).jqGrid("groupingSetup");
                                var k, l = c.p.groupingView,
                                    m = "";
                                for (k = 0; k < l.groupField.length; k++) {
                                    var n = l.groupField[k];
                                    $.each(c.p.colModel, function(a, b) {
                                        b.name === n && b.index && (n = b.index)
                                    }), m += n + " " + l.groupOrder[k] + ", "
                                }
                                f[g.sort] = m + f[g.sort]
                            }
                            $.extend(c.p.postData, f);
                            var o = c.p.scroll ? c.rows.length - 1 : 1,
                                p = $(c).triggerHandler("jqGridBeforeRequest");
                            if (p === !1 || "stop" === p) return;
                            if ($.isFunction(c.p.datatype)) return void c.p.datatype.call(c, c.p.postData, "load_" + c.p.id, o, a, j);
                            if ($.isFunction(c.p.beforeRequest) && (p = c.p.beforeRequest.call(c), void 0 === p && (p = !0), p === !1)) return;
                            switch (b = c.p.datatype.toLowerCase()) {
                                case "json":
                                case "jsonp":
                                case "xml":
                                case "script":
                                    $.ajax($.extend({
                                        "url": c.p.url,
                                        "type": c.p.mtype,
                                        "dataType": b,
                                        "data": $.isFunction(c.p.serializeGridData) ? c.p.serializeGridData.call(c, c.p.postData) : c.p.postData,
                                        "success": function(d, f, g) {
                                            return $.isFunction(c.p.beforeProcessing) && c.p.beforeProcessing.call(c, d, f, g) === !1 ? void B() : ("xml" === b ? w(d, c.grid.bDiv, o, a > 1, j) : x(d, c.grid.bDiv, o, a > 1, j), $(c).triggerHandler("jqGridLoadComplete", [d]), i && i.call(c, d), $(c).triggerHandler("jqGridAfterLoadComplete", [d]), e && c.grid.populateVisible(), (c.p.loadonce || c.p.treeGrid) && (c.p.datatype = "local"), d = null, void(1 === a && B()))
                                        },
                                        "error": function(b, d, e) {
                                            $.isFunction(c.p.loadError) && c.p.loadError.call(c, b, d, e), 1 === a && B(), b = null
                                        },
                                        "beforeSend": function(a, b) {
                                            var d = !0;
                                            return $.isFunction(c.p.loadBeforeSend) && (d = c.p.loadBeforeSend.call(c, a, b)), void 0 === d && (d = !0), d === !1 ? !1 : void A()
                                        }
                                    }, $.jgrid.ajaxOptions, c.p.ajaxGridOptions));
                                    break;
                                case "xmlstring":
                                    A(), d = "string" != typeof c.p.datastr ? c.p.datastr : $.parseXML(c.p.datastr), w(d, c.grid.bDiv), $(c).triggerHandler("jqGridLoadComplete", [d]), h && c.p.loadComplete.call(c, d), $(c).triggerHandler("jqGridAfterLoadComplete", [d]), c.p.datatype = "local", c.p.datastr = null, B();
                                    break;
                                case "jsonstring":
                                    A(), d = "string" == typeof c.p.datastr ? $.jgrid.parse(c.p.datastr) : c.p.datastr, x(d, c.grid.bDiv), $(c).triggerHandler("jqGridLoadComplete", [d]), h && c.p.loadComplete.call(c, d), $(c).triggerHandler("jqGridAfterLoadComplete", [d]), c.p.datatype = "local", c.p.datastr = null, B();
                                    break;
                                case "local":
                                case "clientside":
                                    A(), c.p.datatype = "local";
                                    var q = y();
                                    x(q, c.grid.bDiv, o, a > 1, j), $(c).triggerHandler("jqGridLoadComplete", [q]), i && i.call(c, q), $(c).triggerHandler("jqGridAfterLoadComplete", [q]), e && c.grid.populateVisible(), B()
                            }
                        }
                    },
                    D = function(a) {
                        $("#cb_" + $.jgrid.jqID(c.p.id), c.grid.hDiv)[c.p.useProp ? "prop" : "attr"]("checked", a);
                        var b = c.p.frozenColumns ? c.p.id + "_frozen" : "";
                        b && $("#cb_" + $.jgrid.jqID(c.p.id), c.grid.fhDiv)[c.p.useProp ? "prop" : "attr"]("checked", a)
                    },
                    E = function(a, b) {
                        var d, e, g, h, i, j, l, m = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>",
                            n = "",
                            o = "<table cellspacing='0' cellpadding='0' border='0' style='table-layout:auto;' class='ui-pg-table'><tbody><tr>",
                            p = "",
                            q = function(a) {
                                var b;
                                return $.isFunction(c.p.onPaging) && (b = c.p.onPaging.call(c, a)), "stop" === b ? !1 : (c.p.selrow = null, c.p.multiselect && (c.p.selarrrow = [], D(!1)), c.p.savedRow = [], !0)
                            };
                        if (a = a.substr(1), b += "_" + a, d = "pg_" + a, e = a + "_left", g = a + "_center", h = a + "_right", $("#" + $.jgrid.jqID(a)).append("<div id='" + d + "' class='ui-pager-control' role='group'><table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='width:100%;table-layout:fixed;height:100%;' role='row'><tbody><tr><td id='" + e + "' align='left'></td><td id='" + g + "' align='center' style='white-space:pre;'></td><td id='" + h + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr"), c.p.rowList.length > 0) {
                            for (p = "<td dir='" + f + "'>", p += "<select class='ui-pg-selbox' role='listbox'>", l = 0; l < c.p.rowList.length; l++) p += '<option role="option" value="' + c.p.rowList[l] + '"' + (c.p.rowNum === c.p.rowList[l] ? ' selected="selected"' : "") + ">" + c.p.rowList[l] + "</option>";
                            p += "</select></td>"
                        }
                        if ("rtl" === f && (o += p), c.p.pginput === !0 && (n = "<td dir='" + f + "'>" + $.jgrid.format(c.p.pgtext || "", "<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(a) + "'></span>") + "</td>"), c.p.pgbuttons === !0) {
                            var r = ["first" + b, "prev" + b, "next" + b, "last" + b];
                            "rtl" === f && r.reverse(), o += "<td id='" + r[0] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-first'></span></td>", o += "<td id='" + r[1] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-prev'></span></td>", o += "" !== n ? m + n + m : "", o += "<td id='" + r[2] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-next'></span></td>", o += "<td id='" + r[3] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-end'></span></td>"
                        } else "" !== n && (o += n);
                        "ltr" === f && (o += p), o += "</tr></tbody></table>", c.p.viewrecords === !0 && $("td#" + a + "_" + c.p.recordpos, "#" + d).append("<div dir='" + f + "' style='text-align:" + c.p.recordpos + "' class='ui-paging-info'></div>"), $("td#" + a + "_" + c.p.pagerpos, "#" + d).append(o), j = $(".ui-jqgrid").css("font-size") || "11px", $(document.body).append("<div id='testpg' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:" + j + ";visibility:hidden;' ></div>"), i = $(o).clone().appendTo("#testpg").width(), $("#testpg").remove(), i > 0 && ("" !== n && (i += 50), $("td#" + a + "_" + c.p.pagerpos, "#" + d).width(i)), c.p._nvtd = [], c.p._nvtd[0] = i ? Math.floor((c.p.width - i) / 2) : Math.floor(c.p.width / 3), c.p._nvtd[1] = 0, o = null, $(".ui-pg-selbox", "#" + d).bind("change", function() {
                            return q("records") ? (c.p.page = Math.round(c.p.rowNum * (c.p.page - 1) / this.value - .5) + 1, c.p.rowNum = this.value, c.p.pager && $(".ui-pg-selbox", c.p.pager).val(this.value), c.p.toppager && $(".ui-pg-selbox", c.p.toppager).val(this.value), C(), !1) : !1
                        }), c.p.pgbuttons === !0 && ($(".ui-pg-button", "#" + d).hover(function() {
                            $(this).hasClass("ui-state-disabled") ? this.style.cursor = "default" : ($(this).addClass("ui-state-hover"), this.style.cursor = "pointer")
                        }, function() {
                            $(this).hasClass("ui-state-disabled") || ($(this).removeClass("ui-state-hover"), this.style.cursor = "default")
                        }), $("#first" + $.jgrid.jqID(b) + ", #prev" + $.jgrid.jqID(b) + ", #next" + $.jgrid.jqID(b) + ", #last" + $.jgrid.jqID(b)).click(function() {
                            if ($(this).hasClass("ui-state-disabled")) return !1;
                            var a = k(c.p.page, 1),
                                d = k(c.p.lastpage, 1),
                                e = !1,
                                f = !0,
                                g = !0,
                                h = !0,
                                i = !0;
                            return 0 === d || 1 === d ? (f = !1, g = !1, h = !1, i = !1) : d > 1 && a >= 1 ? 1 === a ? (f = !1, g = !1) : a === d && (h = !1, i = !1) : d > 1 && 0 === a && (h = !1, i = !1, a = d - 1), q(this.id) ? (this.id === "first" + b && f && (c.p.page = 1, e = !0), this.id === "prev" + b && g && (c.p.page = a - 1, e = !0), this.id === "next" + b && h && (c.p.page = a + 1, e = !0), this.id === "last" + b && i && (c.p.page = d, e = !0), e && C(), !1) : !1
                        })), c.p.pginput === !0 && $("input.ui-pg-input", "#" + d).keypress(function(a) {
                            var b = a.charCode || a.keyCode || 0;
                            return 13 === b ? q("user") ? ($(this).val(k($(this).val(), 1)), c.p.page = $(this).val() > 0 ? $(this).val() : c.p.page, C(), !1) : !1 : this
                        })
                    },
                    F = function(a, b) {
                        var d, e, f = "",
                            g = c.p.colModel,
                            h = !1,
                            i = c.p.frozenColumns ? b : c.grid.headers[a].el,
                            j = "";
                        $("span.ui-grid-ico-sort", i).addClass("ui-state-disabled"), $(i).attr("aria-selected", "false"), g[a].lso ? "asc" === g[a].lso ? (g[a].lso += "-desc", j = "desc") : "desc" === g[a].lso ? (g[a].lso += "-asc", j = "asc") : ("asc-desc" === g[a].lso || "desc-asc" === g[a].lso) && (g[a].lso = "") : g[a].lso = j = g[a].firstsortorder || "asc", j ? ($("span.s-ico", i).show(), $("span.ui-icon-" + j, i).removeClass("ui-state-disabled"), $(i).attr("aria-selected", "true")) : c.p.viewsortcols[0] || $("span.s-ico", i).hide(), c.p.sortorder = "", $.each(g, function(a) {
                            this.lso && (a > 0 && h && (f += ", "), d = this.lso.split("-"), f += g[a].index || g[a].name, f += " " + d[d.length - 1], h = !0, c.p.sortorder = d[d.length - 1])
                        }), e = f.lastIndexOf(c.p.sortorder), f = f.substring(0, e), c.p.sortname = f
                    },
                    G = function(a, b, d, e, f) {
                        if (c.p.colModel[b].sortable && !(c.p.savedRow.length > 0)) {
                            if (d || (c.p.lastsort === b ? "asc" === c.p.sortorder ? c.p.sortorder = "desc" : "desc" === c.p.sortorder && (c.p.sortorder = "asc") : c.p.sortorder = c.p.colModel[b].firstsortorder || "asc", c.p.page = 1), c.p.multiSort) F(b, f);
                            else {
                                if (e) {
                                    if (c.p.lastsort === b && c.p.sortorder === e && !d) return;
                                    c.p.sortorder = e
                                }
                                var g = c.grid.headers[c.p.lastsort].el,
                                    h = c.p.frozenColumns ? f : c.grid.headers[b].el;
                                $("span.ui-grid-ico-sort", g).addClass("ui-state-disabled"), $(g).attr("aria-selected", "false"), c.p.frozenColumns && (c.grid.fhDiv.find("span.ui-grid-ico-sort").addClass("ui-state-disabled"), c.grid.fhDiv.find("th").attr("aria-selected", "false")), $("span.ui-icon-" + c.p.sortorder, h).removeClass("ui-state-disabled"), $(h).attr("aria-selected", "true"), c.p.viewsortcols[0] || c.p.lastsort !== b && (c.p.frozenColumns && c.grid.fhDiv.find("span.s-ico").hide(), $("span.s-ico", g).hide(), $("span.s-ico", h).show()), a = a.substring(5 + c.p.id.length + 1), c.p.sortname = c.p.colModel[b].index || a
                            }
                            if ("stop" === $(c).triggerHandler("jqGridSortCol", [c.p.sortname, b, c.p.sortorder])) return void(c.p.lastsort = b);
                            if ($.isFunction(c.p.onSortCol) && "stop" === c.p.onSortCol.call(c, c.p.sortname, b, c.p.sortorder)) return void(c.p.lastsort = b);
                            if ("local" === c.p.datatype ? c.p.deselectAfterSort && $(c).jqGrid("resetSelection") : (c.p.selrow = null, c.p.multiselect && D(!1), c.p.selarrrow = [], c.p.savedRow = []), c.p.scroll) {
                                var i = c.grid.bDiv.scrollLeft;
                                t.call(c, !0, !1), c.grid.hDiv.scrollLeft = i
                            }
                            c.p.subGrid && "local" === c.p.datatype && $("td.sgexpanded", "#" + $.jgrid.jqID(c.p.id)).each(function() {
                                $(this).trigger("click")
                            }), C(), c.p.lastsort = b, c.p.sortname !== a && b && (c.p.lastsort = b)
                        }
                    },
                    H = function() {
                        var a, b, e, f, g = 0,
                            h = $.jgrid.cell_width ? 0 : k(c.p.cellLayout, 0),
                            i = 0,
                            j = k(c.p.scrollOffset, 0),
                            l = !1,
                            m = 0;
                        $.each(c.p.colModel, function() {
                            if (void 0 === this.hidden && (this.hidden = !1), c.p.grouping && c.p.autowidth) {
                                var a = $.inArray(this.name, c.p.groupingView.groupField);
                                a >= 0 && c.p.groupingView.groupColumnShow.length > a && (this.hidden = !c.p.groupingView.groupColumnShow[a])
                            }
                            this.widthOrg = b = k(this.width, 0), this.hidden === !1 && (g += b + h, this.fixed ? m += b + h : i++)
                        }), isNaN(c.p.width) && (c.p.width = g + (c.p.shrinkToFit !== !1 || isNaN(c.p.height) ? 0 : j)), d.width = c.p.width, c.p.tblwidth = g, c.p.shrinkToFit === !1 && c.p.forceFit === !0 && (c.p.forceFit = !1), c.p.shrinkToFit === !0 && i > 0 && (e = d.width - h * i - m, isNaN(c.p.height) || (e -= j, l = !0), g = 0, $.each(c.p.colModel, function(d) {
                            this.hidden !== !1 || this.fixed || (b = Math.round(e * this.width / (c.p.tblwidth - h * i - m)), this.width = b, g += b, a = d)
                        }), f = 0, l ? d.width - m - (g + h * i) !== j && (f = d.width - m - (g + h * i) - j) : l || 1 === Math.abs(d.width - m - (g + h * i)) || (f = d.width - m - (g + h * i)), c.p.colModel[a].width += f, c.p.tblwidth = g + f + h * i + m, c.p.tblwidth > c.p.width && (c.p.colModel[a].width -= c.p.tblwidth - parseInt(c.p.width, 10), c.p.tblwidth = c.p.width))
                    },
                    I = function(a) {
                        var b, d = a,
                            e = a;
                        for (b = a + 1; b < c.p.colModel.length; b++)
                            if (c.p.colModel[b].hidden !== !0) {
                                e = b;
                                break
                            }
                        return e - d
                    },
                    J = function(a) {
                        var b = $(c.grid.headers[a].el),
                            d = [b.position().left + b.outerWidth()];
                        return "rtl" === c.p.direction && (d[0] = c.p.width - d[0]), d[0] -= c.grid.bDiv.scrollLeft, d.push($(c.grid.hDiv).position().top), d.push($(c.grid.bDiv).offset().top - $(c.grid.hDiv).offset().top + $(c.grid.bDiv).height()), d
                    },
                    K = function(a) {
                        var b, d = c.grid.headers,
                            e = $.jgrid.getCellIndex(a);
                        for (b = 0; b < d.length; b++)
                            if (a === d[b].el) {
                                e = b;
                                break
                            }
                        return e
                    };
                for (this.p.id = this.id, -1 === $.inArray(c.p.multikey, j) && (c.p.multikey = !1), c.p.keyIndex = !1, c.p.keyName = !1, e = 0; e < c.p.colModel.length; e++) c.p.colModel[e] = $.extend(!0, {}, c.p.cmTemplate, c.p.colModel[e].template || {}, c.p.colModel[e]), c.p.keyIndex === !1 && c.p.colModel[e].key === !0 && (c.p.keyIndex = e);
                if (c.p.sortorder = c.p.sortorder.toLowerCase(), $.jgrid.cell_width = $.jgrid.cellWidth(), c.p.grouping === !0 && (c.p.scroll = !1, c.p.rownumbers = !1, c.p.treeGrid = !1, c.p.gridview = !0), this.p.treeGrid === !0) {
                    try {
                        $(this).jqGrid("setTreeGrid")
                    } catch (L) {}
                    "local" !== c.p.datatype && (c.p.localReader = {
                        "id": "_id_"
                    })
                }
                if (this.p.subGrid) try {
                    $(c).jqGrid("setSubGrid")
                } catch (M) {}
                this.p.multiselect && (this.p.colNames.unshift("<input role='checkbox' id='cb_" + this.p.id + "' class='cbox' type='checkbox'/>"), this.p.colModel.unshift({
                    "name": "cb",
                    "width": $.jgrid.cell_width ? c.p.multiselectWidth + c.p.cellLayout : c.p.multiselectWidth,
                    "sortable": !1,
                    "resizable": !1,
                    "hidedlg": !0,
                    "search": !1,
                    "align": "center",
                    "fixed": !0
                })), this.p.rownumbers && (this.p.colNames.unshift(""), this.p.colModel.unshift({
                    "name": "rn",
                    "width": c.p.rownumWidth,
                    "sortable": !1,
                    "resizable": !1,
                    "hidedlg": !0,
                    "search": !1,
                    "align": "center",
                    "fixed": !0
                })), c.p.xmlReader = $.extend(!0, {
                    "root": "rows",
                    "row": "row",
                    "page": "rows>page",
                    "total": "rows>total",
                    "records": "rows>records",
                    "repeatitems": !0,
                    "cell": "cell",
                    "id": "[id]",
                    "userdata": "userdata",
                    "subgrid": {
                        "root": "rows",
                        "row": "row",
                        "repeatitems": !0,
                        "cell": "cell"
                    }
                }, c.p.xmlReader), c.p.jsonReader = $.extend(!0, {
                    "root": "rows",
                    "page": "page",
                    "total": "total",
                    "records": "records",
                    "repeatitems": !0,
                    "cell": "cell",
                    "id": "id",
                    "userdata": "userdata",
                    "subgrid": {
                        "root": "rows",
                        "repeatitems": !0,
                        "cell": "cell"
                    }
                }, c.p.jsonReader), c.p.localReader = $.extend(!0, {
                    "root": "rows",
                    "page": "page",
                    "total": "total",
                    "records": "records",
                    "repeatitems": !1,
                    "cell": "cell",
                    "id": "id",
                    "userdata": "userdata",
                    "subgrid": {
                        "root": "rows",
                        "repeatitems": !0,
                        "cell": "cell"
                    }
                }, c.p.localReader), c.p.scroll && (c.p.pgbuttons = !1, c.p.pginput = !1, c.p.rowList = []), c.p.data.length && u();
                var N, O, P, Q, R, S, T, U, V, W = "<thead><tr class='ui-jqgrid-labels' role='rowheader'>",
                    X = "",
                    Y = "",
                    Z = [],
                    _ = [],
                    aa = [];
                if (c.p.shrinkToFit === !0 && c.p.forceFit === !0)
                    for (e = c.p.colModel.length - 1; e >= 0; e--)
                        if (!c.p.colModel[e].hidden) {
                            c.p.colModel[e].resizable = !1;
                            break
                        }
                if ("horizontal" === c.p.viewsortcols[1] && (X = " ui-i-asc", Y = " ui-i-desc"), N = h ? "class='ui-th-div-ie'" : "", V = "<span class='s-ico' style='display:none'><span sort='asc' class='ui-grid-ico-sort ui-icon-asc" + X + " ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-" + f + "'></span>", V += "<span sort='desc' class='ui-grid-ico-sort ui-icon-desc" + Y + " ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-" + f + "'></span></span>", c.p.multiSort)
                    for (Z = c.p.sortname.split(","), e = 0; e < Z.length; e++) aa = $.trim(Z[e]).split(" "), Z[e] = $.trim(aa[0]), _[e] = aa[1] ? $.trim(aa[1]) : c.p.sortorder || "asc";
                for (e = 0; e < this.p.colNames.length; e++) {
                    var ba = c.p.headertitles ? ' title="' + $.jgrid.stripHtml(c.p.colNames[e]) + '"' : "";
                    W += "<th id='" + c.p.id + "_" + c.p.colModel[e].name + "' role='columnheader' class='ui-state-default ui-th-column ui-th-" + f + "'" + ba + ">", O = c.p.colModel[e].index || c.p.colModel[e].name, W += "<div id='jqgh_" + c.p.id + "_" + c.p.colModel[e].name + "' " + N + ">" + c.p.colNames[e], c.p.colModel[e].width ? c.p.colModel[e].width = parseInt(c.p.colModel[e].width, 10) : c.p.colModel[e].width = 150, "boolean" != typeof c.p.colModel[e].title && (c.p.colModel[e].title = !0), c.p.colModel[e].lso = "", O === c.p.sortname && (c.p.lastsort = e), c.p.multiSort && (aa = $.inArray(O, Z), -1 !== aa && (c.p.colModel[e].lso = _[aa])), W += V + "</div></th>"
                }
                if (W += "</tr></thead>", V = null, $(this).append(W), $("thead tr:first th", this).hover(function() {
                        $(this).addClass("ui-state-hover")
                    }, function() {
                        $(this).removeClass("ui-state-hover")
                    }), this.p.multiselect) {
                    var ca, da = [];
                    $("#cb_" + $.jgrid.jqID(c.p.id), this).bind("click", function() {
                        c.p.selarrrow = [];
                        var a = c.p.frozenColumns === !0 ? c.p.id + "_frozen" : "";
                        this.checked ? ($(c.rows).each(function(b) {
                            b > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass("ui-state-disabled") || ($("#jqg_" + $.jgrid.jqID(c.p.id) + "_" + $.jgrid.jqID(this.id))[c.p.useProp ? "prop" : "attr"]("checked", !0), $(this).addClass("ui-state-highlight").attr("aria-selected", "true"), c.p.selarrrow.push(this.id), c.p.selrow = this.id, a && ($("#jqg_" + $.jgrid.jqID(c.p.id) + "_" + $.jgrid.jqID(this.id), c.grid.fbDiv)[c.p.useProp ? "prop" : "attr"]("checked", !0), $("#" + $.jgrid.jqID(this.id), c.grid.fbDiv).addClass("ui-state-highlight"))))
                        }), ca = !0, da = []) : ($(c.rows).each(function(b) {
                            b > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("ui-state-disabled") || ($("#jqg_" + $.jgrid.jqID(c.p.id) + "_" + $.jgrid.jqID(this.id))[c.p.useProp ? "prop" : "attr"]("checked", !1), $(this).removeClass("ui-state-highlight").attr("aria-selected", "false"), da.push(this.id), a && ($("#jqg_" + $.jgrid.jqID(c.p.id) + "_" + $.jgrid.jqID(this.id), c.grid.fbDiv)[c.p.useProp ? "prop" : "attr"]("checked", !1), $("#" + $.jgrid.jqID(this.id), c.grid.fbDiv).removeClass("ui-state-highlight"))))
                        }), c.p.selrow = null, ca = !1), $(c).triggerHandler("jqGridSelectAll", [ca ? c.p.selarrrow : da, ca]), $.isFunction(c.p.onSelectAll) && c.p.onSelectAll.call(c, ca ? c.p.selarrrow : da, ca)
                    })
                }
                if (c.p.autowidth === !0) {
                    var ea = $(i).innerWidth();
                    c.p.width = ea > 0 ? ea : "nw"
                }
                H(), $(i).css("width", d.width + "px").append("<div class='ui-jqgrid-resize-mark' id='rs_m" + c.p.id + "'>&#160;</div>"), $(g).css("width", d.width + "px"), W = $("thead:first", c).get(0);
                var fa = "";
                c.p.footerrow && (fa += "<table role='grid' style='width:" + c.p.tblwidth + "px' class='ui-jqgrid-ftable' cellspacing='0' cellpadding='0' border='0'><tbody><tr role='row' class='ui-widget-content footrow footrow-" + f + "'>");
                var ga = $("tr:first", W),
                    ha = "<tr class='jqgfirstrow' role='row' style='height:auto'>";
                if (c.p.disableClick = !1, $("th", ga).each(function(a) {
                        P = c.p.colModel[a].width, void 0 === c.p.colModel[a].resizable && (c.p.colModel[a].resizable = !0), c.p.colModel[a].resizable ? (Q = document.createElement("span"), $(Q).html("&#160;").addClass("ui-jqgrid-resize ui-jqgrid-resize-" + f).css("cursor", "col-resize"), $(this).addClass(c.p.resizeclass)) : Q = "", $(this).css("width", P + "px").prepend(Q), Q = null;
                        var b = "";
                        c.p.colModel[a].hidden && ($(this).css("display", "none"), b = "display:none;"), ha += "<td role='gridcell' style='height:0px;width:" + P + "px;" + b + "'></td>", d.headers[a] = {
                            "width": P,
                            "el": this
                        }, R = c.p.colModel[a].sortable, "boolean" != typeof R && (c.p.colModel[a].sortable = !0, R = !0);
                        var e = c.p.colModel[a].name;
                        "cb" !== e && "subgrid" !== e && "rn" !== e && c.p.viewsortcols[2] && $(">div", this).addClass("ui-jqgrid-sortable"), R && (c.p.multiSort ? c.p.viewsortcols[0] ? ($("div span.s-ico", this).show(), c.p.colModel[a].lso && $("div span.ui-icon-" + c.p.colModel[a].lso, this).removeClass("ui-state-disabled")) : c.p.colModel[a].lso && ($("div span.s-ico", this).show(), $("div span.ui-icon-" + c.p.colModel[a].lso, this).removeClass("ui-state-disabled")) : c.p.viewsortcols[0] ? ($("div span.s-ico", this).show(), a === c.p.lastsort && $("div span.ui-icon-" + c.p.sortorder, this).removeClass("ui-state-disabled")) : a === c.p.lastsort && ($("div span.s-ico", this).show(), $("div span.ui-icon-" + c.p.sortorder, this).removeClass("ui-state-disabled"))), c.p.footerrow && (fa += "<td role='gridcell' " + l(a, 0, "", null, "", !1) + ">&#160;</td>")
                    }).mousedown(function(a) {
                        if (1 === $(a.target).closest("th>span.ui-jqgrid-resize").length) {
                            var b = K(this);
                            return c.p.forceFit === !0 && (c.p.nv = I(b)), d.dragStart(b, a, J(b)), !1
                        }
                    }).click(function(a) {
                        if (c.p.disableClick) return c.p.disableClick = !1, !1;
                        var b, d, e = "th>div.ui-jqgrid-sortable";
                        c.p.viewsortcols[2] || (e = "th>div>span>span.ui-grid-ico-sort");
                        var f = $(a.target).closest(e);
                        if (1 === f.length) {
                            var g;
                            if (c.p.frozenColumns) {
                                var h = $(this)[0].id.substring(c.p.id.length + 1);
                                $(c.p.colModel).each(function(a) {
                                    return this.name === h ? (g = a, !1) : void 0
                                })
                            } else g = K(this);
                            return c.p.viewsortcols[2] || (b = !0, d = f.attr("sort")), null != g && G($("div", this)[0].id, g, b, d, this), !1
                        }
                    }), c.p.sortable && $.fn.sortable) try {
                    $(c).jqGrid("sortableColumns", ga)
                } catch (ia) {}
                c.p.footerrow && (fa += "</tr></tbody></table>"), ha += "</tr>", U = document.createElement("tbody"), this.appendChild(U), $(this).addClass("ui-jqgrid-btable").append(ha), ha = null;
                var ja = $("<table class='ui-jqgrid-htable' style='width:" + c.p.tblwidth + "px' role='grid' aria-labelledby='gbox_" + this.id + "' cellspacing='0' cellpadding='0' border='0'></table>").append(W),
                    ka = c.p.caption && c.p.hiddengrid === !0 ? !0 : !1,
                    la = $("<div class='ui-jqgrid-hbox" + ("rtl" === f ? "-rtl" : "") + "'></div>");
                W = null, d.hDiv = document.createElement("div"), $(d.hDiv).css({
                    "width": d.width + "px"
                }).addClass("ui-state-default ui-jqgrid-hdiv").append(la), $(la).append(ja), ja = null, ka && $(d.hDiv).hide(), c.p.pager && ("string" == typeof c.p.pager ? "#" !== c.p.pager.substr(0, 1) && (c.p.pager = "#" + c.p.pager) : c.p.pager = "#" + $(c.p.pager).attr("id"), $(c.p.pager).css({
                    "width": d.width + "px"
                }).addClass("ui-state-default ui-jqgrid-pager ui-corner-bottom").appendTo(i), ka && $(c.p.pager).hide(), E(c.p.pager, "")), c.p.cellEdit === !1 && c.p.hoverrows === !0 && $(c).bind("mouseover", function(a) {
                    T = $(a.target).closest("tr.jqgrow"), "ui-subgrid" !== $(T).attr("class") && $(T).addClass("ui-state-hover")
                }).bind("mouseout", function(a) {
                    T = $(a.target).closest("tr.jqgrow"), $(T).removeClass("ui-state-hover")
                });
                var ma, na, oa;
                $(c).before(d.hDiv).click(function(a) {
                    if (S = a.target, T = $(S, c.rows).closest("tr.jqgrow"), 0 === $(T).length || T[0].className.indexOf("ui-state-disabled") > -1 || ($(S, c).closest("table.ui-jqgrid-btable").attr("id") || "").replace("_frozen", "") !== c.id) return this;
                    var b = $(S).hasClass("cbox"),
                        d = $(c).triggerHandler("jqGridBeforeSelectRow", [T[0].id, a]);
                    if (d = d === !1 || "stop" === d ? !1 : !0, d && $.isFunction(c.p.beforeSelectRow) && (d = c.p.beforeSelectRow.call(c, T[0].id, a)), "A" !== S.tagName && ("INPUT" !== S.tagName && "TEXTAREA" !== S.tagName && "OPTION" !== S.tagName && "SELECT" !== S.tagName || b) && d === !0)
                        if (ma = T[0].id, na = $.jgrid.getCellIndex(S), oa = $(S).closest("td,th").html(), $(c).triggerHandler("jqGridCellSelect", [ma, na, oa, a]), $.isFunction(c.p.onCellSelect) && c.p.onCellSelect.call(c, ma, na, oa, a), c.p.cellEdit === !0)
                            if (c.p.multiselect && b) $(c).jqGrid("setSelection", ma, !0, a);
                            else {
                                ma = T[0].rowIndex;
                                try {
                                    $(c).jqGrid("editCell", ma, na, !0)
                                } catch (e) {}
                            } else if (c.p.multikey) a[c.p.multikey] ? $(c).jqGrid("setSelection", ma, !0, a) : c.p.multiselect && b && (b = $("#jqg_" + $.jgrid.jqID(c.p.id) + "_" + ma).is(":checked"), $("#jqg_" + $.jgrid.jqID(c.p.id) + "_" + ma)[c.p.useProp ? "prop" : "attr"]("checked", b));
                    else if (c.p.multiselect && c.p.multiboxonly)
                        if (b) $(c).jqGrid("setSelection", ma, !0, a);
                        else {
                            var f = c.p.frozenColumns ? c.p.id + "_frozen" : "";
                            $(c.p.selarrrow).each(function(a, b) {
                                var d = $(c).jqGrid("getGridRowById", b);
                                $(d).removeClass("ui-state-highlight"), $("#jqg_" + $.jgrid.jqID(c.p.id) + "_" + $.jgrid.jqID(b))[c.p.useProp ? "prop" : "attr"]("checked", !1), f && ($("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(f)).removeClass("ui-state-highlight"), $("#jqg_" + $.jgrid.jqID(c.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(f))[c.p.useProp ? "prop" : "attr"]("checked", !1))
                            }), c.p.selarrrow = [], $(c).jqGrid("setSelection", ma, !0, a)
                        } else $(c).jqGrid("setSelection", ma, !0, a)
                }).bind("reloadGrid", function(a, b) {
                    if (c.p.treeGrid === !0 && (c.p.datatype = c.p.treedatatype), b && b.current && c.grid.selectionPreserver(c), "local" === c.p.datatype ? ($(c).jqGrid("resetSelection"), c.p.data.length && u()) : c.p.treeGrid || (c.p.selrow = null, c.p.multiselect && (c.p.selarrrow = [], D(!1)), c.p.savedRow = []), c.p.scroll && t.call(c, !0, !1), b && b.page) {
                        var d = b.page;
                        d > c.p.lastpage && (d = c.p.lastpage), 1 > d && (d = 1), c.p.page = d, c.grid.prevRowHeight ? c.grid.bDiv.scrollTop = (d - 1) * c.grid.prevRowHeight * c.p.rowNum : c.grid.bDiv.scrollTop = 0
                    }
                    return c.grid.prevRowHeight && c.p.scroll ? (delete c.p.lastpage, c.grid.populateVisible()) : c.grid.populate(), c.p._inlinenav === !0 && $(c).jqGrid("showAddEditButtons"), !1
                }).dblclick(function(a) {
                    S = a.target, T = $(S, c.rows).closest("tr.jqgrow"), 0 !== $(T).length && (ma = T[0].rowIndex, na = $.jgrid.getCellIndex(S), $(c).triggerHandler("jqGridDblClickRow", [$(T).attr("id"), ma, na, a]), $.isFunction(c.p.ondblClickRow) && c.p.ondblClickRow.call(c, $(T).attr("id"), ma, na, a))
                }).bind("contextmenu", function(a) {
                    S = a.target, T = $(S, c.rows).closest("tr.jqgrow"), 0 !== $(T).length && (c.p.multiselect || $(c).jqGrid("setSelection", T[0].id, !0, a), ma = T[0].rowIndex, na = $.jgrid.getCellIndex(S), $(c).triggerHandler("jqGridRightClickRow", [$(T).attr("id"), ma, na, a]), $.isFunction(c.p.onRightClickRow) && c.p.onRightClickRow.call(c, $(T).attr("id"), ma, na, a))
                }), d.bDiv = document.createElement("div"), h && "auto" === String(c.p.height).toLowerCase() && (c.p.height = "100%"), $(d.bDiv).append($('<div style="position:relative;' + (h && $.jgrid.msiever() < 8 ? "height:0.01%;" : "") + '"></div>').append("<div></div>").append(this)).addClass("ui-jqgrid-bdiv").css({
                    "height": c.p.height + (isNaN(c.p.height) ? "" : "px"),
                    "width": d.width + "px"
                }).scroll(d.scrollGrid), $("table:first", d.bDiv).css({
                    "width": c.p.tblwidth + "px"
                }), $.support.tbody || 2 === $("tbody", this).length && $("tbody:gt(0)", this).remove(), c.p.multikey && ($.jgrid.msie ? $(d.bDiv).bind("selectstart", function() {
                    return !1
                }) : $(d.bDiv).bind("mousedown", function() {
                    return !1
                })), ka && $(d.bDiv).hide(), d.cDiv = document.createElement("div");
                var pa = c.p.hidegrid === !0 ? $("<a role='link' class='ui-jqgrid-titlebar-close ui-corner-all HeaderButton' />").hover(function() {
                    pa.addClass("ui-state-hover")
                }, function() {
                    pa.removeClass("ui-state-hover")
                }).append("<span class='ui-icon ui-icon-circle-triangle-n'></span>").css("rtl" === f ? "left" : "right", "0px") : "";
                if ($(d.cDiv).append(pa).append("<span class='ui-jqgrid-title'>" + c.p.caption + "</span>").addClass("ui-jqgrid-titlebar ui-jqgrid-caption" + ("rtl" === f ? "-rtl" : "") + " ui-widget-header ui-corner-top ui-helper-clearfix"), $(d.cDiv).insertBefore(d.hDiv), c.p.toolbar[0] && (d.uDiv = document.createElement("div"), "top" === c.p.toolbar[1] ? $(d.uDiv).insertBefore(d.hDiv) : "bottom" === c.p.toolbar[1] && $(d.uDiv).insertAfter(d.hDiv), "both" === c.p.toolbar[1] ? (d.ubDiv = document.createElement("div"), $(d.uDiv).addClass("ui-userdata ui-state-default").attr("id", "t_" + this.id).insertBefore(d.hDiv), $(d.ubDiv).addClass("ui-userdata ui-state-default").attr("id", "tb_" + this.id).insertAfter(d.hDiv), ka && $(d.ubDiv).hide()) : $(d.uDiv).width(d.width).addClass("ui-userdata ui-state-default").attr("id", "t_" + this.id), ka && $(d.uDiv).hide()), c.p.toppager && (c.p.toppager = $.jgrid.jqID(c.p.id) + "_toppager", d.topDiv = $("<div id='" + c.p.toppager + "'></div>")[0], c.p.toppager = "#" + c.p.toppager, $(d.topDiv).addClass("ui-state-default ui-jqgrid-toppager").width(d.width).insertBefore(d.hDiv), E(c.p.toppager, "_t")), c.p.footerrow && (d.sDiv = $("<div class='ui-jqgrid-sdiv'></div>")[0], la = $("<div class='ui-jqgrid-hbox" + ("rtl" === f ? "-rtl" : "") + "'></div>"), $(d.sDiv).append(la).width(d.width).insertAfter(d.hDiv), $(la).append(fa), d.footers = $(".ui-jqgrid-ftable", d.sDiv)[0].rows[0].cells, c.p.rownumbers && (d.footers[0].className = "ui-state-default jqgrid-rownum"), ka && $(d.sDiv).hide()), la = null, c.p.caption) {
                    var qa = c.p.datatype;
                    c.p.hidegrid === !0 && ($(".ui-jqgrid-titlebar-close", d.cDiv).click(function(a) {
                        var b, e = $.isFunction(c.p.onHeaderClick),
                            f = ".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-pager, .ui-jqgrid-sdiv",
                            g = this;
                        return c.p.toolbar[0] === !0 && ("both" === c.p.toolbar[1] && (f += ", #" + $(d.ubDiv).attr("id")), f += ", #" + $(d.uDiv).attr("id")), b = $(f, "#gview_" + $.jgrid.jqID(c.p.id)).length, "visible" === c.p.gridstate ? $(f, "#gbox_" + $.jgrid.jqID(c.p.id)).slideUp("fast", function() {
                            b--, 0 === b && ($("span", g).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s"), c.p.gridstate = "hidden", $("#gbox_" + $.jgrid.jqID(c.p.id)).hasClass("ui-resizable") && $(".ui-resizable-handle", "#gbox_" + $.jgrid.jqID(c.p.id)).hide(), $(c).triggerHandler("jqGridHeaderClick", [c.p.gridstate, a]), e && (ka || c.p.onHeaderClick.call(c, c.p.gridstate, a)))
                        }) : "hidden" === c.p.gridstate && $(f, "#gbox_" + $.jgrid.jqID(c.p.id)).slideDown("fast", function() {
                            b--, 0 === b && ($("span", g).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n"), ka && (c.p.datatype = qa, C(), ka = !1), c.p.gridstate = "visible", $("#gbox_" + $.jgrid.jqID(c.p.id)).hasClass("ui-resizable") && $(".ui-resizable-handle", "#gbox_" + $.jgrid.jqID(c.p.id)).show(), $(c).triggerHandler("jqGridHeaderClick", [c.p.gridstate, a]), e && (ka || c.p.onHeaderClick.call(c, c.p.gridstate, a)))
                        }), !1
                    }), ka && (c.p.datatype = "local", $(".ui-jqgrid-titlebar-close", d.cDiv).trigger("click")))
                } else $(d.cDiv).hide();
                $(d.hDiv).after(d.bDiv).mousemove(function(a) {
                    return d.resizing ? (d.dragMove(a), !1) : void 0
                }), $(".ui-jqgrid-labels", d.hDiv).bind("selectstart", function() {
                    return !1
                }), $(document).bind("mouseup.jqGrid" + c.p.id, function() {
                    return d.resizing ? (d.dragEnd(), !1) : !0
                }), c.formatCol = l, c.sortData = G, c.updatepager = z, c.refreshIndex = u, c.setHeadCheckBox = D, c.constructTr = v, c.formatter = function(a, b, c, d, e) {
                    return n(a, b, c, d, e)
                }, $.extend(d, {
                    "populate": C,
                    "emptyRows": t,
                    "beginReq": A,
                    "endReq": B
                }), this.grid = d, c.addXmlData = function(a) {
                    w(a, c.grid.bDiv)
                }, c.addJSONData = function(a) {
                    x(a, c.grid.bDiv)
                }, this.grid.cols = this.rows[0].cells, $(c).triggerHandler("jqGridInitGrid"), $.isFunction(c.p.onInitGrid) && c.p.onInitGrid.call(c), C(), c.p.hiddengrid = !1
            }
        })
    }, $.jgrid.extend({
        "getGridParam": function(a) {
            var b = this[0];
            if (b && b.grid) return a ? void 0 !== b.p[a] ? b.p[a] : null : b.p
        },
        "setGridParam": function(a) {
            return this.each(function() {
                this.grid && "object" == typeof a && $.extend(!0, this.p, a)
            })
        },
        "getGridRowById": function(a) {
            var b;
            return this.each(function() {
                try {
                    for (var c = this.rows.length; c--;)
                        if (a.toString() === this.rows[c].id) {
                            b = this.rows[c];
                            break
                        }
                } catch (d) {
                    b = $(this.grid.bDiv).find("#" + $.jgrid.jqID(a))
                }
            }), b
        },
        "getDataIDs": function() {
            var a, b = [],
                c = 0,
                d = 0;
            return this.each(function() {
                if (a = this.rows.length, a && a > 0)
                    for (; a > c;) $(this.rows[c]).hasClass("jqgrow") && (b[d] = this.rows[c].id, d++), c++
            }), b
        },
        "setSelection": function(a, b, c) {
            return this.each(function() {
                function d(a) {
                    var b = $(k.grid.bDiv)[0].clientHeight,
                        c = $(k.grid.bDiv)[0].scrollTop,
                        d = $(k.rows[a]).position().top,
                        e = k.rows[a].clientHeight;
                    d + e >= b + c ? $(k.grid.bDiv)[0].scrollTop = d - (b + c) + e + c : b + c > d && c > d && ($(k.grid.bDiv)[0].scrollTop = d)
                }
                var e, f, g, h, i, j, k = this;
                void 0 !== a && (b = b === !1 ? !1 : !0, f = $(k).jqGrid("getGridRowById", a), !f || !f.className || f.className.indexOf("ui-state-disabled") > -1 || (k.p.scrollrows === !0 && (g = $(k).jqGrid("getGridRowById", a).rowIndex, g >= 0 && d(g)), k.p.frozenColumns === !0 && (j = k.p.id + "_frozen"), k.p.multiselect ? (k.setHeadCheckBox(!1), k.p.selrow = f.id, h = $.inArray(k.p.selrow, k.p.selarrrow), -1 === h ? ("ui-subgrid" !== f.className && $(f).addClass("ui-state-highlight").attr("aria-selected", "true"), e = !0, k.p.selarrrow.push(k.p.selrow)) : ("ui-subgrid" !== f.className && $(f).removeClass("ui-state-highlight").attr("aria-selected", "false"), e = !1, k.p.selarrrow.splice(h, 1), i = k.p.selarrrow[0], k.p.selrow = void 0 === i ? null : i), $("#jqg_" + $.jgrid.jqID(k.p.id) + "_" + $.jgrid.jqID(f.id))[k.p.useProp ? "prop" : "attr"]("checked", e), j && (-1 === h ? $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).addClass("ui-state-highlight") : $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).removeClass("ui-state-highlight"), $("#jqg_" + $.jgrid.jqID(k.p.id) + "_" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j))[k.p.useProp ? "prop" : "attr"]("checked", e)), b && ($(k).triggerHandler("jqGridSelectRow", [f.id, e, c]), k.p.onSelectRow && k.p.onSelectRow.call(k, f.id, e, c))) : "ui-subgrid" !== f.className && (k.p.selrow !== f.id ? ($($(k).jqGrid("getGridRowById", k.p.selrow)).removeClass("ui-state-highlight").attr({
                    "aria-selected": "false",
                    "tabindex": "-1"
                }), $(f).addClass("ui-state-highlight").attr({
                    "aria-selected": "true",
                    "tabindex": "0"
                }), j && ($("#" + $.jgrid.jqID(k.p.selrow), "#" + $.jgrid.jqID(j)).removeClass("ui-state-highlight"), $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).addClass("ui-state-highlight")), e = !0) : e = !1, k.p.selrow = f.id, b && ($(k).triggerHandler("jqGridSelectRow", [f.id, e, c]), k.p.onSelectRow && k.p.onSelectRow.call(k, f.id, e, c)))))
            })
        },
        "resetSelection": function(a) {
            return this.each(function() {
                var b, c, d = this;
                d.p.frozenColumns === !0 && (c = d.p.id + "_frozen"), void 0 !== a ? (b = a === d.p.selrow ? d.p.selrow : a, $("#" + $.jgrid.jqID(d.p.id) + " tbody:first tr#" + $.jgrid.jqID(b)).removeClass("ui-state-highlight").attr("aria-selected", "false"), c && $("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c)).removeClass("ui-state-highlight"), d.p.multiselect && ($("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(d.p.id))[d.p.useProp ? "prop" : "attr"]("checked", !1), c && $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c))[d.p.useProp ? "prop" : "attr"]("checked", !1), d.setHeadCheckBox(!1)), b = null) : d.p.multiselect ? ($(d.p.selarrrow).each(function(a, b) {
                    $($(d).jqGrid("getGridRowById", b)).removeClass("ui-state-highlight").attr("aria-selected", "false"), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b))[d.p.useProp ? "prop" : "attr"]("checked", !1), c && ($("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c)).removeClass("ui-state-highlight"), $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c))[d.p.useProp ? "prop" : "attr"]("checked", !1))
                }), d.setHeadCheckBox(!1), d.p.selarrrow = [], d.p.selrow = null) : d.p.selrow && ($("#" + $.jgrid.jqID(d.p.id) + " tbody:first tr#" + $.jgrid.jqID(d.p.selrow)).removeClass("ui-state-highlight").attr("aria-selected", "false"), c && $("#" + $.jgrid.jqID(d.p.selrow), "#" + $.jgrid.jqID(c)).removeClass("ui-state-highlight"), d.p.selrow = null), d.p.cellEdit === !0 && parseInt(d.p.iCol, 10) >= 0 && parseInt(d.p.iRow, 10) >= 0 && ($("td:eq(" + d.p.iCol + ")", d.rows[d.p.iRow]).removeClass("edit-cell ui-state-highlight"), $(d.rows[d.p.iRow]).removeClass("selected-row ui-state-hover")), d.p.savedRow = []
            })
        },
        "getRowData": function(a) {
            var b, c, d = {},
                e = !1,
                f = 0;
            return this.each(function() {
                var g, h, i = this;
                if (void 0 === a) e = !0, b = [], c = i.rows.length;
                else {
                    if (h = $(i).jqGrid("getGridRowById", a), !h) return d;
                    c = 2
                }
                for (; c > f;) e && (h = i.rows[f]), $(h).hasClass("jqgrow") && ($('td[role="gridcell"]', h).each(function(a) {
                    if (g = i.p.colModel[a].name, "cb" !== g && "subgrid" !== g && "rn" !== g)
                        if (i.p.treeGrid === !0 && g === i.p.ExpandColumn) d[g] = $.jgrid.htmlDecode($("span:first", this).html());
                        else try {
                            d[g] = $.unformat.call(i, this, {
                                "rowId": h.id,
                                "colModel": i.p.colModel[a]
                            }, a)
                        } catch (b) {
                            d[g] = $.jgrid.htmlDecode($(this).html())
                        }
                }), e && (b.push(d), d = {})), f++
            }), b || d
        },
        "delRowData": function(a) {
            var b, c, d = !1;
            return this.each(function() {
                console.log("Entró");
                var e = this;
                if (b = $(e).jqGrid("getGridRowById", a), !b) return !1;
                if ($(b).remove(), e.p.records--, e.p.reccount--, e.updatepager(!0, !1), d = !0, e.p.multiselect && (c = $.inArray(a, e.p.selarrrow), -1 !== c && e.p.selarrrow.splice(c, 1)), e.p.multiselect && e.p.selarrrow.length > 0 ? e.p.selrow = e.p.selarrrow[e.p.selarrrow.length - 1] : e.p.selrow = null, "local" === e.p.datatype) {
                    var f = $.jgrid.stripPref(e.p.idPrefix, a),
                        g = e.p._index[f];
                    void 0 !== g && (e.p.data.splice(g, 1), e.refreshIndex())
                }
                if (e.p.altRows === !0 && d) {
                    var h = e.p.altclass;
                    $(e.rows).each(function(a) {
                        a % 2 === 1 ? $(this).addClass(h) : $(this).removeClass(h)
                    })
                }
            }), d
        },
        "setRowData": function(a, b, c) {
            var d, e, f = !0;
            return this.each(function() {
                if (!this.grid) return !1;
                var g, h, i = this,
                    j = typeof c,
                    k = {};
                if (h = $(this).jqGrid("getGridRowById", a), !h) return !1;
                if (b) try {
                    if ($(this.p.colModel).each(function(c) {
                            d = this.name;
                            var f = $.jgrid.getAccessor(b, d);
                            void 0 !== f && (k[d] = this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? $.unformat.date.call(i, f, this) : f, g = i.formatter(a, f, c, b, "edit"), e = this.title ? {
                                "title": $.jgrid.stripHtml(g)
                            } : {}, i.p.treeGrid === !0 && d === i.p.ExpandColumn ? $("td[role='gridcell']:eq(" + c + ") > span:first", h).html(g).attr(e) : $("td[role='gridcell']:eq(" + c + ")", h).html(g).attr(e))
                        }), "local" === i.p.datatype) {
                        var l, m = $.jgrid.stripPref(i.p.idPrefix, a),
                            n = i.p._index[m];
                        if (i.p.treeGrid)
                            for (l in i.p.treeReader) i.p.treeReader.hasOwnProperty(l) && delete k[i.p.treeReader[l]];
                        void 0 !== n && (i.p.data[n] = $.extend(!0, i.p.data[n], k)), k = null
                    }
                } catch (o) {
                    f = !1
                }
                f && ("string" === j ? $(h).addClass(c) : null !== c && "object" === j && $(h).css(c), $(i).triggerHandler("jqGridAfterGridComplete"))
            }), f
        },
        "addRowData": function(a, b, c, d) {
            c || (c = "last");
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s = !1,
                t = "";
            return b && ($.isArray(b) ? (m = !0, c = "last", n = a) : (b = [b], m = !1), this.each(function() {
                var u = this,
                    v = b.length;
                i = u.p.rownumbers === !0 ? 1 : 0, g = u.p.multiselect === !0 ? 1 : 0, h = u.p.subGrid === !0 ? 1 : 0, m || (void 0 !== a ? a = String(a) : (a = $.jgrid.randId(), u.p.keyIndex !== !1 && (n = u.p.colModel[u.p.keyIndex + g + h + i].name, void 0 !== b[0][n] && (a = b[0][n])))), o = u.p.altclass;
                for (var w = 0, x = "", y = {}, z = $.isFunction(u.p.afterInsertRow) ? !0 : !1; v > w;) {
                    if (p = b[w], f = [], m) {
                        try {
                            a = p[n], void 0 === a && (a = $.jgrid.randId())
                        } catch (A) {
                            a = $.jgrid.randId()
                        }
                        x = u.p.altRows === !0 && (u.rows.length - 1) % 2 === 0 ? o : ""
                    }
                    for (r = a, a = u.p.idPrefix + a, i && (t = u.formatCol(0, 1, "", null, a, !0), f[f.length] = '<td role="gridcell" class="ui-state-default jqgrid-rownum" ' + t + ">0</td>"), g && (l = '<input role="checkbox" type="checkbox" id="jqg_' + u.p.id + "_" + a + '" class="cbox"/>', t = u.formatCol(i, 1, "", null, a, !0), f[f.length] = '<td role="gridcell" ' + t + ">" + l + "</td>"), h && (f[f.length] = $(u).jqGrid("addSubGridCell", g + i, 1)), k = g + h + i; k < u.p.colModel.length; k++) q = u.p.colModel[k], e = q.name, y[e] = p[e], l = u.formatter(a, $.jgrid.getAccessor(p, e), k, p), t = u.formatCol(k, 1, l, p, a, y), f[f.length] = '<td role="gridcell" ' + t + ">" + l + "</td>";
                    if (f.unshift(u.constructTr(a, !1, x, y, p, !1)), f[f.length] = "</tr>", 0 === u.rows.length) $("table:first", u.grid.bDiv).append(f.join(""));
                    else switch (c) {
                        case "last":
                            $(u.rows[u.rows.length - 1]).after(f.join("")), j = u.rows.length - 1;
                            break;
                        case "first":
                            $(u.rows[0]).after(f.join("")), j = 1;
                            break;
                        case "after":
                            j = $(u).jqGrid("getGridRowById", d), j && ($(u.rows[j.rowIndex + 1]).hasClass("ui-subgrid") ? $(u.rows[j.rowIndex + 1]).after(f) : $(j).after(f.join("")), j = j.rowIndex + 1);
                            break;
                        case "before":
                            j = $(u).jqGrid("getGridRowById", d), j && ($(j).before(f.join("")), j = j.rowIndex - 1)
                    }
                    u.p.subGrid === !0 && $(u).jqGrid("addSubGrid", g + i, j), u.p.records++, u.p.reccount++, $(u).triggerHandler("jqGridAfterInsertRow", [a, p, p]), z && u.p.afterInsertRow.call(u, a, p, p), w++, "local" === u.p.datatype && (y[u.p.localReader.id] = r, u.p._index[r] = u.p.data.length, u.p.data.push(y), y = {})
                }
                u.p.altRows !== !0 || m || ("last" === c ? (u.rows.length - 1) % 2 === 1 && $(u.rows[u.rows.length - 1]).addClass(o) : $(u.rows).each(function(a) {
                    a % 2 === 1 ? $(this).addClass(o) : $(this).removeClass(o)
                })), u.updatepager(!0, !0), s = !0
            })), s
        },
        "footerData": function(a, b, c) {
            function d(a) {
                var b;
                for (b in a)
                    if (a.hasOwnProperty(b)) return !1;
                return !0
            }
            var e, f, g = !1,
                h = {};
            return void 0 == a && (a = "get"), "boolean" != typeof c && (c = !0), a = a.toLowerCase(), this.each(function() {
                var i, j = this;
                return j.grid && j.p.footerrow ? "set" === a && d(b) ? !1 : (g = !0, void $(this.p.colModel).each(function(d) {
                    e = this.name, "set" === a ? void 0 !== b[e] && (i = c ? j.formatter("", b[e], d, b, "edit") : b[e], f = this.title ? {
                        "title": $.jgrid.stripHtml(i)
                    } : {}, $("tr.footrow td:eq(" + d + ")", j.grid.sDiv).html(i).attr(f), g = !0) : "get" === a && (h[e] = $("tr.footrow td:eq(" + d + ")", j.grid.sDiv).html())
                })) : !1
            }), "get" === a ? h : g
        },
        "showHideCol": function(a, b) {
            return this.each(function() {
                var c, d = this,
                    e = !1,
                    f = $.jgrid.cell_width ? 0 : d.p.cellLayout;
                if (d.grid) {
                    "string" == typeof a && (a = [a]), b = "none" !== b ? "" : "none";
                    var g = "" === b ? !0 : !1,
                        h = d.p.groupHeader && ("object" == typeof d.p.groupHeader || $.isFunction(d.p.groupHeader));
                    h && $(d).jqGrid("destroyGroupHeader", !1), $(this.p.colModel).each(function(h) {
                        if (-1 !== $.inArray(this.name, a) && this.hidden === g) {
                            if (d.p.frozenColumns === !0 && this.frozen === !0) return !0;
                            $("tr[role=rowheader]", d.grid.hDiv).each(function() {
                                $(this.cells[h]).css("display", b)
                            }), $(d.rows).each(function() {
                                $(this).hasClass("jqgroup") || $(this.cells[h]).css("display", b)
                            }), d.p.footerrow && $("tr.footrow td:eq(" + h + ")", d.grid.sDiv).css("display", b), c = parseInt(this.width, 10), "none" === b ? d.p.tblwidth -= c + f : d.p.tblwidth += c + f, this.hidden = !g, e = !0, $(d).triggerHandler("jqGridShowHideCol", [g, this.name, h])
                        }
                    }), e === !0 && (d.p.shrinkToFit !== !0 || isNaN(d.p.height) || (d.p.tblwidth += parseInt(d.p.scrollOffset, 10)), $(d).jqGrid("setGridWidth", d.p.shrinkToFit === !0 ? d.p.tblwidth : d.p.width)), h && $(d).jqGrid("setGroupHeaders", d.p.groupHeader)
                }
            })
        },
        "hideCol": function(a) {
            return this.each(function() {
                $(this).jqGrid("showHideCol", a, "none")
            })
        },
        "showCol": function(a) {
            return this.each(function() {
                $(this).jqGrid("showHideCol", a, "")
            })
        },
        "remapColumns": function(a, b, c) {
            function d(b) {
                var c;
                c = b.length ? $.makeArray(b) : $.extend({}, b), $.each(a, function(a) {
                    b[a] = c[this]
                })
            }

            function e(b, c) {
                $(">tr" + (c || ""), b).each(function() {
                    var b = this,
                        c = $.makeArray(b.cells);
                    $.each(a, function() {
                        var a = c[this];
                        a && b.appendChild(a)
                    })
                })
            }
            var f = this.get(0);
            d(f.p.colModel), d(f.p.colNames), d(f.grid.headers), e($("thead:first", f.grid.hDiv), c && ":not(.ui-jqgrid-labels)"), b && e($("#" + $.jgrid.jqID(f.p.id) + " tbody:first"), ".jqgfirstrow, tr.jqgrow, tr.jqfoot"), f.p.footerrow && e($("tbody:first", f.grid.sDiv)), f.p.remapColumns && (f.p.remapColumns.length ? d(f.p.remapColumns) : f.p.remapColumns = $.makeArray(a)), f.p.lastsort = $.inArray(f.p.lastsort, a), f.p.treeGrid && (f.p.expColInd = $.inArray(f.p.expColInd, a)), $(f).triggerHandler("jqGridRemapColumns", [a, b, c])
        },
        "setGridWidth": function(a, b) {
            return this.each(function() {
                if (this.grid) {
                    var c, d, e, f, g = this,
                        h = 0,
                        i = $.jgrid.cell_width ? 0 : g.p.cellLayout,
                        j = 0,
                        k = !1,
                        l = g.p.scrollOffset,
                        m = 0;
                    if ("boolean" != typeof b && (b = g.p.shrinkToFit), !isNaN(a)) {
                        if (a = parseInt(a, 10), g.grid.width = g.p.width = a, $("#gbox_" + $.jgrid.jqID(g.p.id)).css("width", a + "px"), $("#gview_" + $.jgrid.jqID(g.p.id)).css("width", a + "px"), $(g.grid.bDiv).css("width", a + "px"), $(g.grid.hDiv).css("width", a + "px"), g.p.pager && $(g.p.pager).css("width", a + "px"), g.p.toppager && $(g.p.toppager).css("width", a + "px"), g.p.toolbar[0] === !0 && ($(g.grid.uDiv).css("width", a + "px"), "both" === g.p.toolbar[1] && $(g.grid.ubDiv).css("width", a + "px")), g.p.footerrow && $(g.grid.sDiv).css("width", a + "px"), b === !1 && g.p.forceFit === !0 && (g.p.forceFit = !1), b === !0) {
                            if ($.each(g.p.colModel, function() {
                                    this.hidden === !1 && (c = this.widthOrg, h += c + i, this.fixed ? m += c + i : j++)
                                }), 0 === j) return;
                            g.p.tblwidth = h, e = a - i * j - m, isNaN(g.p.height) || ($(g.grid.bDiv)[0].clientHeight < $(g.grid.bDiv)[0].scrollHeight || 1 === g.rows.length) && (k = !0, e -= l), h = 0;
                            var n = g.grid.cols.length > 0;
                            if ($.each(g.p.colModel, function(a) {
                                    if (this.hidden === !1 && !this.fixed) {
                                        if (c = this.widthOrg, c = Math.round(e * c / (g.p.tblwidth - i * j - m)), 0 > c) return;
                                        this.width = c, h += c, g.grid.headers[a].width = c, g.grid.headers[a].el.style.width = c + "px", g.p.footerrow && (g.grid.footers[a].style.width = c + "px"), n && (g.grid.cols[a].style.width = c + "px"), d = a
                                    }
                                }), !d) return;
                            if (f = 0, k ? a - m - (h + i * j) !== l && (f = a - m - (h + i * j) - l) : 1 !== Math.abs(a - m - (h + i * j)) && (f = a - m - (h + i * j)), g.p.colModel[d].width += f, g.p.tblwidth = h + f + i * j + m, g.p.tblwidth > a) {
                                var o = g.p.tblwidth - parseInt(a, 10);
                                g.p.tblwidth = a, c = g.p.colModel[d].width = g.p.colModel[d].width - o
                            } else c = g.p.colModel[d].width;
                            g.grid.headers[d].width = c, g.grid.headers[d].el.style.width = c + "px", n && (g.grid.cols[d].style.width = c + "px"), g.p.footerrow && (g.grid.footers[d].style.width = c + "px")
                        }
                        g.p.tblwidth && ($("table:first", g.grid.bDiv).css("width", g.p.tblwidth + "px"), $("table:first", g.grid.hDiv).css("width", g.p.tblwidth + "px"), g.grid.hDiv.scrollLeft = g.grid.bDiv.scrollLeft, g.p.footerrow && $("table:first", g.grid.sDiv).css("width", g.p.tblwidth + "px"))
                    }
                }
            })
        },
        "setGridHeight": function(a) {
            return this.each(function() {
                var b = this;
                if (b.grid) {
                    var c = $(b.grid.bDiv);
                    c.css({
                        "height": a + (isNaN(a) ? "" : "px")
                    }), b.p.frozenColumns === !0 && $("#" + $.jgrid.jqID(b.p.id) + "_frozen").parent().height(c.height() - 16), b.p.height = a, b.p.scroll && b.grid.populateVisible()
                }
            })
        },
        "setCaption": function(a) {
            return this.each(function() {
                this.p.caption = a, $("span.ui-jqgrid-title, span.ui-jqgrid-title-rtl", this.grid.cDiv).html(a), $(this.grid.cDiv).show()
            })
        },
        "setLabel": function(a, b, c, d) {
            return this.each(function() {
                var e = this,
                    f = -1;
                if (e.grid && void 0 !== a && ($(e.p.colModel).each(function(b) {
                        return this.name === a ? (f = b, !1) : void 0
                    }), f >= 0)) {
                    var g = $("tr.ui-jqgrid-labels th:eq(" + f + ")", e.grid.hDiv);
                    if (b) {
                        var h = $(".s-ico", g);
                        $("[id^=jqgh_]", g).empty().html(b).append(h), e.p.colNames[f] = b
                    }
                    c && ("string" == typeof c ? $(g).addClass(c) : $(g).css(c)), "object" == typeof d && $(g).attr(d)
                }
            })
        },
        "setCell": function(a, b, c, d, e, f) {
            return this.each(function() {
                var g, h, i = this,
                    j = -1;
                if (i.grid && (isNaN(b) ? $(i.p.colModel).each(function(a) {
                        return this.name === b ? (j = a, !1) : void 0
                    }) : j = parseInt(b, 10), j >= 0)) {
                    var k = $(i).jqGrid("getGridRowById", a);
                    if (k) {
                        var l = $("td:eq(" + j + ")", k);
                        if (("" !== c || f === !0) && (g = i.formatter(a, c, j, k, "edit"), h = i.p.colModel[j].title ? {
                                "title": $.jgrid.stripHtml(g)
                            } : {}, i.p.treeGrid && $(".tree-wrap", $(l)).length > 0 ? $("span", $(l)).html(g).attr(h) : $(l).html(g).attr(h), "local" === i.p.datatype)) {
                            var m, n = i.p.colModel[j];
                            c = n.formatter && "string" == typeof n.formatter && "date" === n.formatter ? $.unformat.date.call(i, c, n) : c, m = i.p._index[$.jgrid.stripPref(i.p.idPrefix, a)], void 0 !== m && (i.p.data[m][n.name] = c)
                        }
                        "string" == typeof d ? $(l).addClass(d) : d && $(l).css(d), "object" == typeof e && $(l).attr(e)
                    }
                }
            })
        },
        "getCell": function(a, b) {
            var c = !1;
            return this.each(function() {
                var d = this,
                    e = -1;
                if (d.grid && (isNaN(b) ? $(d.p.colModel).each(function(a) {
                        return this.name === b ? (e = a, !1) : void 0
                    }) : e = parseInt(b, 10), e >= 0)) {
                    var f = $(d).jqGrid("getGridRowById", a);
                    if (f) try {
                        c = $.unformat.call(d, $("td:eq(" + e + ")", f), {
                            "rowId": f.id,
                            "colModel": d.p.colModel[e]
                        }, e)
                    } catch (g) {
                        c = $.jgrid.htmlDecode($("td:eq(" + e + ")", f).html())
                    }
                }
            }), c
        },
        "getCol": function(a, b, c) {
            var d, e, f, g, h = [],
                i = 0;
            return b = "boolean" != typeof b ? !1 : b, void 0 === c && (c = !1), this.each(function() {
                var j = this,
                    k = -1;
                if (j.grid && (isNaN(a) ? $(j.p.colModel).each(function(b) {
                        return this.name === a ? (k = b, !1) : void 0
                    }) : k = parseInt(a, 10), k >= 0)) {
                    var l = j.rows.length,
                        m = 0,
                        n = 0;
                    if (l && l > 0) {
                        for (; l > m;) {
                            if ($(j.rows[m]).hasClass("jqgrow")) {
                                try {
                                    d = $.unformat.call(j, $(j.rows[m].cells[k]), {
                                        "rowId": j.rows[m].id,
                                        "colModel": j.p.colModel[k]
                                    }, k)
                                } catch (o) {
                                    d = $.jgrid.htmlDecode(j.rows[m].cells[k].innerHTML)
                                }
                                c ? (g = parseFloat(d), isNaN(g) || (i += g, void 0 === f && (f = e = g), e = Math.min(e, g), f = Math.max(f, g), n++)) : b ? h.push({
                                    "id": j.rows[m].id,
                                    "value": d
                                }) : h.push(d)
                            }
                            m++
                        }
                        if (c) switch (c.toLowerCase()) {
                            case "sum":
                                h = i;
                                break;
                            case "avg":
                                h = i / n;
                                break;
                            case "count":
                                h = l - 1;
                                break;
                            case "min":
                                h = e;
                                break;
                            case "max":
                                h = f
                        }
                    }
                }
            }), h
        },
        "clearGridData": function(a) {
            return this.each(function() {
                var b = this;
                if (b.grid) {
                    if ("boolean" != typeof a && (a = !1), b.p.deepempty) $("#" + $.jgrid.jqID(b.p.id) + " tbody:first tr:gt(0)").remove();
                    else {
                        var c = $("#" + $.jgrid.jqID(b.p.id) + " tbody:first tr:first")[0];
                        $("#" + $.jgrid.jqID(b.p.id) + " tbody:first").empty().append(c)
                    }
                    b.p.footerrow && a && $(".ui-jqgrid-ftable td", b.grid.sDiv).html("&#160;"), b.p.selrow = null, b.p.selarrrow = [], b.p.savedRow = [], b.p.records = 0, b.p.page = 1, b.p.lastpage = 0, b.p.reccount = 0, b.p.data = [], b.p._index = {}, b.updatepager(!0, !1)
                }
            })
        },
        "getInd": function(a, b) {
            var c, d = !1;
            return this.each(function() {
                c = $(this).jqGrid("getGridRowById", a), c && (d = b === !0 ? c : c.rowIndex)
            }), d
        },
        "bindKeys": function(a) {
            var b = $.extend({
                "onEnter": null,
                "onSpace": null,
                "onLeftKey": null,
                "onRightKey": null,
                "scrollingRows": !0
            }, a || {});
            return this.each(function() {
                var a = this;
                $("body").is("[role]") || $("body").attr("role", "application"), a.p.scrollrows = b.scrollingRows, $(a).keydown(function(c) {
                    var d, e, f, g = $(a).find("tr[tabindex=0]")[0],
                        h = a.p.treeReader.expanded_field;
                    if (g)
                        if (f = a.p._index[$.jgrid.stripPref(a.p.idPrefix, g.id)], 37 === c.keyCode || 38 === c.keyCode || 39 === c.keyCode || 40 === c.keyCode) {
                            if (38 === c.keyCode) {
                                if (e = g.previousSibling, d = "", e)
                                    if ($(e).is(":hidden")) {
                                        for (; e;)
                                            if (e = e.previousSibling, !$(e).is(":hidden") && $(e).hasClass("jqgrow")) {
                                                d = e.id;
                                                break
                                            }
                                    } else d = e.id;
                                $(a).jqGrid("setSelection", d, !0, c), c.preventDefault()
                            }
                            if (40 === c.keyCode) {
                                if (e = g.nextSibling, d = "", e)
                                    if ($(e).is(":hidden")) {
                                        for (; e;)
                                            if (e = e.nextSibling, !$(e).is(":hidden") && $(e).hasClass("jqgrow")) {
                                                d = e.id;
                                                break
                                            }
                                    } else d = e.id;
                                $(a).jqGrid("setSelection", d, !0, c), c.preventDefault()
                            }
                            37 === c.keyCode && (a.p.treeGrid && a.p.data[f][h] && $(g).find("div.treeclick").trigger("click"), $(a).triggerHandler("jqGridKeyLeft", [a.p.selrow]), $.isFunction(b.onLeftKey) && b.onLeftKey.call(a, a.p.selrow)), 39 === c.keyCode && (a.p.treeGrid && !a.p.data[f][h] && $(g).find("div.treeclick").trigger("click"), $(a).triggerHandler("jqGridKeyRight", [a.p.selrow]), $.isFunction(b.onRightKey) && b.onRightKey.call(a, a.p.selrow))
                        } else 13 === c.keyCode ? ($(a).triggerHandler("jqGridKeyEnter", [a.p.selrow]), $.isFunction(b.onEnter) && b.onEnter.call(a, a.p.selrow)) : 32 === c.keyCode && ($(a).triggerHandler("jqGridKeySpace", [a.p.selrow]), $.isFunction(b.onSpace) && b.onSpace.call(a, a.p.selrow))
                })
            })
        },
        "unbindKeys": function() {
            return this.each(function() {
                $(this).unbind("keydown")
            })
        },
        "getLocalRow": function(a) {
            var b, c = !1;
            return this.each(function() {
                void 0 !== a && (b = this.p._index[$.jgrid.stripPref(this.p.idPrefix, a)], b >= 0 && (c = this.p.data[b]))
            }), c
        }
    })
}(jQuery),
function(a) {
    "use strict";
    a.jgrid.extend({
        "getColProp": function(a) {
            var b = {},
                c = this[0];
            if (!c.grid) return !1;
            var d, e = c.p.colModel;
            for (d = 0; d < e.length; d++)
                if (e[d].name === a) {
                    b = e[d];
                    break
                }
            return b
        },
        "setColProp": function(b, c) {
            return this.each(function() {
                if (this.grid && c) {
                    var d, e = this.p.colModel;
                    for (d = 0; d < e.length; d++)
                        if (e[d].name === b) {
                            a.extend(!0, this.p.colModel[d], c);
                            break
                        }
                }
            })
        },
        "sortGrid": function(a, b, c) {
            return this.each(function() {
                var d, e = this,
                    f = -1,
                    g = !1;
                if (e.grid) {
                    for (a || (a = e.p.sortname), d = 0; d < e.p.colModel.length; d++)
                        if (e.p.colModel[d].index === a || e.p.colModel[d].name === a) {
                            f = d, e.p.frozenColumns === !0 && e.p.colModel[d].frozen === !0 && (g = e.grid.fhDiv.find("#" + e.p.id + "_" + a));
                            break
                        }
                    if (-1 !== f) {
                        var h = e.p.colModel[f].sortable;
                        g || (g = e.grid.headers[f].el), "boolean" != typeof h && (h = !0), "boolean" != typeof b && (b = !1), h && e.sortData("jqgh_" + e.p.id + "_" + a, f, b, c, g)
                    }
                }
            })
        },
        "clearBeforeUnload": function() {
            return this.each(function() {
                var b = this.grid;
                a.isFunction(b.emptyRows) && b.emptyRows.call(this, !0, !0), a(document).unbind("mouseup.jqGrid" + this.p.id), a(b.hDiv).unbind("mousemove"), a(this).unbind(), b.dragEnd = null, b.dragMove = null, b.dragStart = null, b.emptyRows = null, b.populate = null, b.populateVisible = null, b.scrollGrid = null, b.selectionPreserver = null, b.bDiv = null, b.cDiv = null, b.hDiv = null, b.cols = null;
                var c, d = b.headers.length;
                for (c = 0; d > c; c++) b.headers[c].el = null;
                this.formatCol = null, this.sortData = null, this.updatepager = null, this.refreshIndex = null, this.setHeadCheckBox = null, this.constructTr = null, this.formatter = null, this.addXmlData = null, this.addJSONData = null, this.grid = null
            })
        },
        "GridDestroy": function() {
            return this.each(function() {
                if (this.grid) {
                    this.p.pager && a(this.p.pager).remove();
                    try {
                        a(this).jqGrid("clearBeforeUnload"), a("#gbox_" + a.jgrid.jqID(this.id)).remove()
                    } catch (b) {}
                }
            })
        },
        "GridUnload": function() {
            return this.each(function() {
                if (this.grid) {
                    var b = {
                        "id": a(this).attr("id"),
                        "cl": a(this).attr("class")
                    };
                    this.p.pager && a(this.p.pager).empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
                    var c = document.createElement("table");
                    a(c).attr({
                        "id": b.id
                    }), c.className = b.cl;
                    var d = a.jgrid.jqID(this.id);
                    a(c).removeClass("ui-jqgrid-btable"), 1 === a(this.p.pager).parents("#gbox_" + d).length ? (a(c).insertBefore("#gbox_" + d).show(), a(this.p.pager).insertBefore("#gbox_" + d)) : a(c).insertBefore("#gbox_" + d).show(), a(this).jqGrid("clearBeforeUnload"), a("#gbox_" + d).remove()
                }
            })
        },
        "setGridState": function(b) {
            return this.each(function() {
                if (this.grid) {
                    var c = this;
                    "hidden" === b ? (a(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + a.jgrid.jqID(c.p.id)).slideUp("fast"), c.p.pager && a(c.p.pager).slideUp("fast"), c.p.toppager && a(c.p.toppager).slideUp("fast"), c.p.toolbar[0] === !0 && ("both" === c.p.toolbar[1] && a(c.grid.ubDiv).slideUp("fast"), a(c.grid.uDiv).slideUp("fast")), c.p.footerrow && a(".ui-jqgrid-sdiv", "#gbox_" + a.jgrid.jqID(c.p.id)).slideUp("fast"), a(".ui-jqgrid-titlebar-close span", c.grid.cDiv).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s"), c.p.gridstate = "hidden") : "visible" === b && (a(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + a.jgrid.jqID(c.p.id)).slideDown("fast"), c.p.pager && a(c.p.pager).slideDown("fast"), c.p.toppager && a(c.p.toppager).slideDown("fast"), c.p.toolbar[0] === !0 && ("both" === c.p.toolbar[1] && a(c.grid.ubDiv).slideDown("fast"), a(c.grid.uDiv).slideDown("fast")), c.p.footerrow && a(".ui-jqgrid-sdiv", "#gbox_" + a.jgrid.jqID(c.p.id)).slideDown("fast"), a(".ui-jqgrid-titlebar-close span", c.grid.cDiv).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n"), c.p.gridstate = "visible")
                }
            })
        },
        "filterToolbar": function(b) {
            return b = a.extend({
                "autosearch": !0,
                "searchOnEnter": !0,
                "beforeSearch": null,
                "afterSearch": null,
                "beforeClear": null,
                "afterClear": null,
                "searchurl": "",
                "stringResult": !1,
                "groupOp": "AND",
                "defaultSearch": "bw",
                "searchOperators": !1,
                "resetIcon": "x",
                "operands": {
                    "eq": "==",
                    "ne": "!",
                    "lt": "<",
                    "le": "<=",
                    "gt": ">",
                    "ge": ">=",
                    "bw": "^",
                    "bn": "!^",
                    "in": "=",
                    "ni": "!=",
                    "ew": "|",
                    "en": "!@",
                    "cn": "~",
                    "nc": "!~",
                    "nu": "#",
                    "nn": "!#"
                }
            }, a.jgrid.search, b || {}), this.each(function() {
                var c = this;
                if (!this.ftoolbar) {
                    var d, e = function() {
                            var d, e, f, g = {},
                                h = 0,
                                i = {};
                            a.each(c.p.colModel, function() {
                                var j = a("#gs_" + a.jgrid.jqID(this.name), this.frozen === !0 && c.p.frozenColumns === !0 ? c.grid.fhDiv : c.grid.hDiv);
                                if (e = this.index || this.name, f = b.searchOperators ? j.parent().prev().children("a").attr("soper") || b.defaultSearch : this.searchoptions && this.searchoptions.sopt ? this.searchoptions.sopt[0] : "select" === this.stype ? "eq" : b.defaultSearch, d = "custom" === this.stype && a.isFunction(this.searchoptions.custom_value) && j.length > 0 && "SPAN" === j[0].nodeName.toUpperCase() ? this.searchoptions.custom_value.call(c, j.children(".customelement:first"), "get") : j.val(), d || "nu" === f || "nn" === f) g[e] = d, i[e] = f, h++;
                                else try {
                                    delete c.p.postData[e]
                                } catch (k) {}
                            });
                            var j = h > 0 ? !0 : !1;
                            if (b.stringResult === !0 || "local" === c.p.datatype) {
                                var k = '{"groupOp":"' + b.groupOp + '","rules":[',
                                    l = 0;
                                a.each(g, function(a, b) {
                                    l > 0 && (k += ","), k += '{"field":"' + a + '",', k += '"op":"' + i[a] + '",', b += "", k += '"data":"' + b.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}', l++
                                }), k += "]}", a.extend(c.p.postData, {
                                    "filters": k
                                }), a.each(["searchField", "searchString", "searchOper"], function(a, b) {
                                    c.p.postData.hasOwnProperty(b) && delete c.p.postData[b]
                                })
                            } else a.extend(c.p.postData, g);
                            var m;
                            c.p.searchurl && (m = c.p.url, a(c).jqGrid("setGridParam", {
                                "url": c.p.searchurl
                            }));
                            var n = "stop" === a(c).triggerHandler("jqGridToolbarBeforeSearch") ? !0 : !1;
                            !n && a.isFunction(b.beforeSearch) && (n = b.beforeSearch.call(c)), n || a(c).jqGrid("setGridParam", {
                                "search": j
                            }).trigger("reloadGrid", [{
                                "page": 1
                            }]), m && a(c).jqGrid("setGridParam", {
                                "url": m
                            }), a(c).triggerHandler("jqGridToolbarAfterSearch"), a.isFunction(b.afterSearch) && b.afterSearch.call(c)
                        },
                        f = function(d) {
                            var e, f = {},
                                g = 0;
                            d = "boolean" != typeof d ? !0 : d, a.each(c.p.colModel, function() {
                                var b, d = a("#gs_" + a.jgrid.jqID(this.name), this.frozen === !0 && c.p.frozenColumns === !0 ? c.grid.fhDiv : c.grid.hDiv);
                                switch (this.searchoptions && void 0 !== this.searchoptions.defaultValue && (b = this.searchoptions.defaultValue), e = this.index || this.name, this.stype) {
                                    case "select":
                                        if (d.find("option").each(function(c) {
                                                return 0 === c && (this.selected = !0), a(this).val() === b ? (this.selected = !0, !1) : void 0
                                            }), void 0 !== b) f[e] = b, g++;
                                        else try {
                                            delete c.p.postData[e]
                                        } catch (h) {}
                                        break;
                                    case "text":
                                        if (d.val(b || ""), void 0 !== b) f[e] = b, g++;
                                        else try {
                                            delete c.p.postData[e]
                                        } catch (i) {}
                                        break;
                                    case "custom":
                                        a.isFunction(this.searchoptions.custom_value) && d.length > 0 && "SPAN" === d[0].nodeName.toUpperCase() && this.searchoptions.custom_value.call(c, d.children(".customelement:first"), "set", b || "")
                                }
                            });
                            var h = g > 0 ? !0 : !1;
                            if (c.p.resetsearch = !0, b.stringResult === !0 || "local" === c.p.datatype) {
                                var i = '{"groupOp":"' + b.groupOp + '","rules":[',
                                    j = 0;
                                a.each(f, function(a, b) {
                                    j > 0 && (i += ","), i += '{"field":"' + a + '",', i += '"op":"eq",', b += "", i += '"data":"' + b.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}', j++
                                }), i += "]}", a.extend(c.p.postData, {
                                    "filters": i
                                }), a.each(["searchField", "searchString", "searchOper"], function(a, b) {
                                    c.p.postData.hasOwnProperty(b) && delete c.p.postData[b]
                                })
                            } else a.extend(c.p.postData, f);
                            var k;
                            c.p.searchurl && (k = c.p.url, a(c).jqGrid("setGridParam", {
                                "url": c.p.searchurl
                            }));
                            var l = "stop" === a(c).triggerHandler("jqGridToolbarBeforeClear") ? !0 : !1;
                            !l && a.isFunction(b.beforeClear) && (l = b.beforeClear.call(c)), l || d && a(c).jqGrid("setGridParam", {
                                "search": h
                            }).trigger("reloadGrid", [{
                                "page": 1
                            }]), k && a(c).jqGrid("setGridParam", {
                                "url": k
                            }), a(c).triggerHandler("jqGridToolbarAfterClear"), a.isFunction(b.afterClear) && b.afterClear()
                        },
                        g = function() {
                            var b = a("tr.ui-search-toolbar", c.grid.hDiv),
                                d = c.p.frozenColumns === !0 ? a("tr.ui-search-toolbar", c.grid.fhDiv) : !1;
                            "none" === b.css("display") ? (b.show(), d && d.show()) : (b.hide(), d && d.hide())
                        },
                        h = function(d, f, g) {
                            a("#sopt_menu").remove(), f = parseInt(f, 10), g = parseInt(g, 10) + 18;
                            for (var h, i, j = a(".ui-jqgrid-view").css("font-size") || "11px", k = '<ul id="sopt_menu" class="ui-search-menu" role="menu" tabindex="0" style="font-size:' + j + ";left:" + f + "px;top:" + g + 'px;">', l = a(d).attr("soper"), m = [], n = 0, o = a(d).attr("colname"), p = c.p.colModel.length; p > n && c.p.colModel[n].name !== o;) n++;
                            var q = c.p.colModel[n],
                                r = a.extend({}, q.searchoptions);
                            for (r.sopt || (r.sopt = [], r.sopt[0] = "select" === q.stype ? "eq" : b.defaultSearch), a.each(b.odata, function() {
                                    m.push(this.oper)
                                }), n = 0; n < r.sopt.length; n++) i = a.inArray(r.sopt[n], m), -1 !== i && (h = l === b.odata[i].oper ? "ui-state-highlight" : "", k += '<li class="ui-menu-item ' + h + '" role="presentation"><a class="ui-corner-all g-menu-item" tabindex="0" role="menuitem" value="' + b.odata[i].oper + '" oper="' + b.operands[b.odata[i].oper] + '"><table cellspacing="0" cellpadding="0" border="0"><tr><td width="25px">' + b.operands[b.odata[i].oper] + "</td><td>" + b.odata[i].text + "</td></tr></table></a></li>");
                            k += "</ul>", a("body").append(k), a("#sopt_menu").addClass("ui-menu ui-widget ui-widget-content ui-corner-all"), a("#sopt_menu > li > a").hover(function() {
                                a(this).addClass("ui-state-hover")
                            }, function() {
                                a(this).removeClass("ui-state-hover")
                            }).click(function(f) {
                                var g = a(this).attr("value"),
                                    h = a(this).attr("oper");
                                if (a(c).triggerHandler("jqGridToolbarSelectOper", [g, h, d]), a("#sopt_menu").hide(), a(d).text(h).attr("soper", g),
                                    b.autosearch === !0) {
                                    var i = a(d).parent().next().children()[0];
                                    (a(i).val() || "nu" === g || "nn" === g) && e()
                                }
                            })
                        },
                        i = a("<tr class='ui-search-toolbar' role='rowheader'></tr>");
                    a.each(c.p.colModel, function(f) {
                        var g, h, j, k, l, m = this,
                            n = "",
                            o = "=",
                            p = a("<th role='columnheader' class='ui-state-default ui-th-column ui-th-" + c.p.direction + "'></th>"),
                            q = a("<div style='position:relative;height:100%;padding-right:0.3em;padding-left:0.3em;'></div>"),
                            r = a("<table class='ui-search-table' cellspacing='0'><tr><td class='ui-search-oper'></td><td class='ui-search-input'></td><td class='ui-search-clear'></td></tr></table>");
                        if (this.hidden === !0 && a(p).css("display", "none"), this.search = this.search === !1 ? !1 : !0, void 0 === this.stype && (this.stype = "text"), g = a.extend({}, this.searchoptions || {}), this.search) {
                            if (b.searchOperators) {
                                for (k = g.sopt ? g.sopt[0] : "select" === m.stype ? "eq" : b.defaultSearch, l = 0; l < b.odata.length; l++)
                                    if (b.odata[l].oper === k) {
                                        o = b.operands[k] || "";
                                        break
                                    }
                                var s = null != g.searchtitle ? g.searchtitle : b.operandTitle;
                                n = "<a title='" + s + "' style='padding-right: 0.5em;' soper='" + k + "' class='soptclass' colname='" + this.name + "'>" + o + "</a>"
                            }
                            if (a("td:eq(0)", r).attr("colindex", f).append(n), void 0 === g.clearSearch && (g.clearSearch = !0), g.clearSearch) {
                                var t = b.resetTitle || "Clear Search Value";
                                a("td:eq(2)", r).append("<a title='" + t + "' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>" + b.resetIcon + "</a>")
                            } else a("td:eq(2)", r).hide();
                            switch (this.stype) {
                                case "select":
                                    if (h = this.surl || g.dataUrl) j = q, a(j).append(r), a.ajax(a.extend({
                                        "url": h,
                                        "dataType": "html",
                                        "success": function(d) {
                                            if (void 0 !== g.buildSelect) {
                                                var f = g.buildSelect(d);
                                                f && a("td:eq(1)", r).append(f)
                                            } else a("td:eq(1)", r).append(d);
                                            void 0 !== g.defaultValue && a("select", j).val(g.defaultValue), a("select", j).attr({
                                                "name": m.index || m.name,
                                                "id": "gs_" + m.name
                                            }), g.attr && a("select", j).attr(g.attr), a("select", j).css({
                                                "width": "100%"
                                            }), a.jgrid.bindEv.call(c, a("select", j)[0], g), b.autosearch === !0 && a("select", j).change(function() {
                                                return e(), !1
                                            }), d = null
                                        }
                                    }, a.jgrid.ajaxOptions, c.p.ajaxSelectOptions || {}));
                                    else {
                                        var u, v, w;
                                        if (m.searchoptions ? (u = void 0 === m.searchoptions.value ? "" : m.searchoptions.value, v = void 0 === m.searchoptions.separator ? ":" : m.searchoptions.separator, w = void 0 === m.searchoptions.delimiter ? ";" : m.searchoptions.delimiter) : m.editoptions && (u = void 0 === m.editoptions.value ? "" : m.editoptions.value, v = void 0 === m.editoptions.separator ? ":" : m.editoptions.separator, w = void 0 === m.editoptions.delimiter ? ";" : m.editoptions.delimiter), u) {
                                            var x = document.createElement("select");
                                            x.style.width = "100%", a(x).attr({
                                                "name": m.index || m.name,
                                                "id": "gs_" + m.name
                                            });
                                            var y, z, A, B;
                                            if ("string" == typeof u)
                                                for (k = u.split(w), B = 0; B < k.length; B++) y = k[B].split(v), z = document.createElement("option"), z.value = y[0], z.innerHTML = y[1], x.appendChild(z);
                                            else if ("object" == typeof u)
                                                for (A in u) u.hasOwnProperty(A) && (z = document.createElement("option"), z.value = A, z.innerHTML = u[A], x.appendChild(z));
                                            void 0 !== g.defaultValue && a(x).val(g.defaultValue), g.attr && a(x).attr(g.attr), a(q).append(r), a.jgrid.bindEv.call(c, x, g), a("td:eq(1)", r).append(x), b.autosearch === !0 && a(x).change(function() {
                                                return e(), !1
                                            })
                                        }
                                    }
                                    break;
                                case "text":
                                    var C = void 0 !== g.defaultValue ? g.defaultValue : "";
                                    a("td:eq(1)", r).append("<input type='text' style='width:100%;padding:0px;' name='" + (m.index || m.name) + "' id='gs_" + m.name + "' value='" + C + "'/>"), a(q).append(r), g.attr && a("input", q).attr(g.attr), a.jgrid.bindEv.call(c, a("input", q)[0], g), b.autosearch === !0 && (b.searchOnEnter ? a("input", q).keypress(function(a) {
                                        var b = a.charCode || a.keyCode || 0;
                                        return 13 === b ? (e(), !1) : this
                                    }) : a("input", q).keydown(function(a) {
                                        var b = a.which;
                                        switch (b) {
                                            case 13:
                                                return !1;
                                            case 9:
                                            case 16:
                                            case 37:
                                            case 38:
                                            case 39:
                                            case 40:
                                            case 27:
                                                break;
                                            default:
                                                d && clearTimeout(d), d = setTimeout(function() {
                                                    e()
                                                }, 500)
                                        }
                                    }));
                                    break;
                                case "custom":
                                    a("td:eq(1)", r).append("<span style='width:95%;padding:0px;' name='" + (m.index || m.name) + "' id='gs_" + m.name + "'/>"), a(q).append(r);
                                    try {
                                        if (!a.isFunction(g.custom_element)) throw "e1";
                                        var D = g.custom_element.call(c, void 0 !== g.defaultValue ? g.defaultValue : "", g);
                                        if (!D) throw "e2";
                                        D = a(D).addClass("customelement"), a(q).find(">span").append(D)
                                    } catch (E) {
                                        "e1" === E && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === E ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, "string" == typeof E ? E : E.message, a.jgrid.edit.bClose)
                                    }
                            }
                        }
                        a(p).append(q), a(i).append(p), b.searchOperators || a("td:eq(0)", r).hide()
                    }), a("table thead", c.grid.hDiv).append(i), b.searchOperators && (a(".soptclass", i).click(function(b) {
                        var c = a(this).offset(),
                            d = c.left,
                            e = c.top;
                        h(this, d, e), b.stopPropagation()
                    }), a("body").on("click", function(b) {
                        "soptclass" !== b.target.className && a("#sopt_menu").hide()
                    })), a(".clearsearchclass", i).click(function(d) {
                        var f = a(this).parents("tr:first"),
                            g = parseInt(a("td.ui-search-oper", f).attr("colindex"), 10),
                            h = a.extend({}, c.p.colModel[g].searchoptions || {}),
                            i = h.defaultValue ? h.defaultValue : "";
                        "select" === c.p.colModel[g].stype ? i ? a("td.ui-search-input select", f).val(i) : a("td.ui-search-input select", f)[0].selectedIndex = 0 : a("td.ui-search-input input", f).val(i), b.autosearch === !0 && e()
                    }), this.ftoolbar = !0, this.triggerToolbar = e, this.clearToolbar = f, this.toggleToolbar = g
                }
            })
        },
        "destroyFilterToolbar": function() {
            return this.each(function() {
                this.ftoolbar && (this.triggerToolbar = null, this.clearToolbar = null, this.toggleToolbar = null, this.ftoolbar = !1, a(this.grid.hDiv).find("table thead tr.ui-search-toolbar").remove())
            })
        },
        "destroyGroupHeader": function(b) {
            return void 0 === b && (b = !0), this.each(function() {
                var c, d, e, f, g, h, i, j = this,
                    k = j.grid,
                    l = a("table.ui-jqgrid-htable thead", k.hDiv),
                    m = j.p.colModel;
                if (k) {
                    for (a(this).unbind(".setGroupHeaders"), c = a("<tr>", {
                            "role": "rowheader"
                        }).addClass("ui-jqgrid-labels"), f = k.headers, d = 0, e = f.length; e > d; d++) {
                        i = m[d].hidden ? "none" : "", g = a(f[d].el).width(f[d].width).css("display", i);
                        try {
                            g.removeAttr("rowSpan")
                        } catch (n) {
                            g.attr("rowSpan", 1)
                        }
                        c.append(g), h = g.children("span.ui-jqgrid-resize"), h.length > 0 && (h[0].style.height = ""), g.children("div")[0].style.top = ""
                    }
                    a(l).children("tr.ui-jqgrid-labels").remove(), a(l).prepend(c), b === !0 && a(j).jqGrid("setGridParam", {
                        "groupHeader": null
                    })
                }
            })
        },
        "setGroupHeaders": function(b) {
            return b = a.extend({
                "useColSpanStyle": !1,
                "groupHeaders": []
            }, b || {}), this.each(function() {
                this.p.groupHeader = b;
                var c, d, e, f, g, h, i, j, k, l, m, n, o, p = this,
                    q = 0,
                    r = p.p.colModel,
                    s = r.length,
                    t = p.grid.headers,
                    u = a("table.ui-jqgrid-htable", p.grid.hDiv),
                    v = u.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header"),
                    w = u.children("thead"),
                    x = u.find(".jqg-first-row-header");
                void 0 === x[0] ? x = a("<tr>", {
                    "role": "row",
                    "aria-hidden": "true"
                }).addClass("jqg-first-row-header").css("height", "auto") : x.empty();
                var y, z = function(a, b) {
                    var c, d = b.length;
                    for (c = 0; d > c; c++)
                        if (b[c].startColumnName === a) return c;
                    return -1
                };
                for (a(p).prepend(w), e = a("<tr>", {
                        "role": "rowheader"
                    }).addClass("ui-jqgrid-labels jqg-third-row-header"), c = 0; s > c; c++)
                    if (g = t[c].el, h = a(g), d = r[c], i = {
                            "height": "0px",
                            "width": t[c].width + "px",
                            "display": d.hidden ? "none" : ""
                        }, a("<th>", {
                            "role": "gridcell"
                        }).css(i).addClass("ui-first-th-" + p.p.direction).appendTo(x), g.style.width = "", j = z(d.name, b.groupHeaders), j >= 0) {
                        for (k = b.groupHeaders[j], l = k.numberOfColumns, m = k.titleText, n = 0, j = 0; l > j && s > c + j; j++) r[c + j].hidden || n++;
                        f = a("<th>").attr({
                            "role": "columnheader"
                        }).addClass("ui-state-default ui-th-column-header ui-th-" + p.p.direction).css({
                            "height": "22px",
                            "border-top": "0 none"
                        }).html(m), n > 0 && f.attr("colspan", String(n)), p.p.headertitles && f.attr("title", f.text()), 0 === n && f.hide(), h.before(f), e.append(g), q = l - 1
                    } else 0 === q ? b.useColSpanStyle ? h.attr("rowspan", "2") : (a("<th>", {
                        "role": "columnheader"
                    }).addClass("ui-state-default ui-th-column-header ui-th-" + p.p.direction).css({
                        "display": d.hidden ? "none" : "",
                        "border-top": "0 none"
                    }).insertBefore(h), e.append(g)) : (e.append(g), q--);
                o = a(p).children("thead"), o.prepend(x), e.insertAfter(v), u.append(o), b.useColSpanStyle && (u.find("span.ui-jqgrid-resize").each(function() {
                    var b = a(this).parent();
                    b.is(":visible") && (this.style.cssText = "height: " + b.height() + "px !important; cursor: col-resize;")
                }), u.find("div.ui-jqgrid-sortable").each(function() {
                    var b = a(this),
                        c = b.parent();
                    c.is(":visible") && c.is(":has(span.ui-jqgrid-resize)") && b.css("top", (c.height() - b.outerHeight()) / 2 + "px")
                })), y = o.find("tr.jqg-first-row-header"), a(p).bind("jqGridResizeStop.setGroupHeaders", function(a, b, c) {
                    y.find("th").eq(c).width(b)
                })
            })
        },
        "setFrozenColumns": function() {
            return this.each(function() {
                if (this.grid) {
                    var b = this,
                        c = b.p.colModel,
                        d = 0,
                        e = c.length,
                        f = -1,
                        g = !1;
                    if (b.p.subGrid !== !0 && b.p.treeGrid !== !0 && b.p.cellEdit !== !0 && !b.p.sortable && !b.p.scroll) {
                        for (b.p.rownumbers && d++, b.p.multiselect && d++; e > d && c[d].frozen === !0;) g = !0, f = d, d++;
                        if (f >= 0 && g) {
                            var h = b.p.caption ? a(b.grid.cDiv).outerHeight() : 0,
                                i = a(".ui-jqgrid-htable", "#gview_" + a.jgrid.jqID(b.p.id)).height();
                            b.p.toppager && (h += a(b.grid.topDiv).outerHeight()), b.p.toolbar[0] === !0 && "bottom" !== b.p.toolbar[1] && (h += a(b.grid.uDiv).outerHeight()), b.grid.fhDiv = a('<div style="position:absolute;left:0px;top:' + h + "px;height:" + i + 'px;" class="frozen-div ui-state-default ui-jqgrid-hdiv"></div>'), b.grid.fbDiv = a('<div style="position:absolute;left:0px;top:' + (parseInt(h, 10) + parseInt(i, 10) + 1) + 'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>'), a("#gview_" + a.jgrid.jqID(b.p.id)).append(b.grid.fhDiv);
                            var j = a(".ui-jqgrid-htable", "#gview_" + a.jgrid.jqID(b.p.id)).clone(!0);
                            if (b.p.groupHeader) {
                                a("tr.jqg-first-row-header, tr.jqg-third-row-header", j).each(function() {
                                    a("th:gt(" + f + ")", this).remove()
                                });
                                var k, l, m = -1,
                                    n = -1;
                                a("tr.jqg-second-row-header th", j).each(function() {
                                    return k = parseInt(a(this).attr("colspan"), 10), l = parseInt(a(this).attr("rowspan"), 10), l && (m++, n++), k && (m += k, n++), m === f ? !1 : void 0
                                }), m !== f && (n = f), a("tr.jqg-second-row-header", j).each(function() {
                                    a("th:gt(" + n + ")", this).remove()
                                })
                            } else a("tr", j).each(function() {
                                a("th:gt(" + f + ")", this).remove()
                            });
                            a(j).width(1), a(b.grid.fhDiv).append(j).mousemove(function(a) {
                                return b.grid.resizing ? (b.grid.dragMove(a), !1) : void 0
                            }), a(b).bind("jqGridResizeStop.setFrozenColumns", function(c, d, e) {
                                var f = a(".ui-jqgrid-htable", b.grid.fhDiv);
                                a("th:eq(" + e + ")", f).width(d);
                                var g = a(".ui-jqgrid-btable", b.grid.fbDiv);
                                a("tr:first td:eq(" + e + ")", g).width(d)
                            }), a(b).bind("jqGridSortCol.setFrozenColumns", function(c, d, e) {
                                var f = a("tr.ui-jqgrid-labels:last th:eq(" + b.p.lastsort + ")", b.grid.fhDiv),
                                    g = a("tr.ui-jqgrid-labels:last th:eq(" + e + ")", b.grid.fhDiv);
                                a("span.ui-grid-ico-sort", f).addClass("ui-state-disabled"), a(f).attr("aria-selected", "false"), a("span.ui-icon-" + b.p.sortorder, g).removeClass("ui-state-disabled"), a(g).attr("aria-selected", "true"), b.p.viewsortcols[0] || b.p.lastsort !== e && (a("span.s-ico", f).hide(), a("span.s-ico", g).show())
                            }), a("#gview_" + a.jgrid.jqID(b.p.id)).append(b.grid.fbDiv), a(b.grid.bDiv).scroll(function() {
                                a(b.grid.fbDiv).scrollTop(a(this).scrollTop())
                            }), b.p.hoverrows === !0 && a("#" + a.jgrid.jqID(b.p.id)).unbind("mouseover").unbind("mouseout"), a(b).bind("jqGridAfterGridComplete.setFrozenColumns", function() {
                                a("#" + a.jgrid.jqID(b.p.id) + "_frozen").remove(), a(b.grid.fbDiv).height(a(b.grid.bDiv).height() - 16);
                                var c = a("#" + a.jgrid.jqID(b.p.id)).clone(!0);
                                a("tr[role=row]", c).each(function() {
                                    a("td[role=gridcell]:gt(" + f + ")", this).remove()
                                }), a(c).width(1).attr("id", b.p.id + "_frozen"), a(b.grid.fbDiv).append(c), b.p.hoverrows === !0 && (a("tr.jqgrow", c).hover(function() {
                                    a(this).addClass("ui-state-hover"), a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(b.p.id)).addClass("ui-state-hover")
                                }, function() {
                                    a(this).removeClass("ui-state-hover"), a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(b.p.id)).removeClass("ui-state-hover")
                                }), a("tr.jqgrow", "#" + a.jgrid.jqID(b.p.id)).hover(function() {
                                    a(this).addClass("ui-state-hover"), a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(b.p.id) + "_frozen").addClass("ui-state-hover")
                                }, function() {
                                    a(this).removeClass("ui-state-hover"), a("#" + a.jgrid.jqID(this.id), "#" + a.jgrid.jqID(b.p.id) + "_frozen").removeClass("ui-state-hover")
                                })), c = null
                            }), b.grid.hDiv.loading || a(b).triggerHandler("jqGridAfterGridComplete"), b.p.frozenColumns = !0
                        }
                    }
                }
            })
        },
        "destroyFrozenColumns": function() {
            return this.each(function() {
                if (this.grid && this.p.frozenColumns === !0) {
                    var b = this;
                    if (a(b.grid.fhDiv).remove(), a(b.grid.fbDiv).remove(), b.grid.fhDiv = null, b.grid.fbDiv = null, a(this).unbind(".setFrozenColumns"), b.p.hoverrows === !0) {
                        var c;
                        a("#" + a.jgrid.jqID(b.p.id)).bind("mouseover", function(b) {
                            c = a(b.target).closest("tr.jqgrow"), "ui-subgrid" !== a(c).attr("class") && a(c).addClass("ui-state-hover")
                        }).bind("mouseout", function(b) {
                            c = a(b.target).closest("tr.jqgrow"), a(c).removeClass("ui-state-hover")
                        })
                    }
                    this.p.frozenColumns = !1
                }
            })
        }
    })
}(jQuery),
function(a) {
    a.fn.jqm = function(d) {
        var f = {
            "overlay": 50,
            "closeoverlay": !0,
            "overlayClass": "jqmOverlay",
            "closeClass": "jqmClose",
            "trigger": ".jqModal",
            "ajax": e,
            "ajaxText": "",
            "target": e,
            "modal": e,
            "toTop": e,
            "onShow": e,
            "onHide": e,
            "onLoad": e
        };
        return this.each(function() {
            return this._jqm ? c[this._jqm].c = a.extend({}, c[this._jqm].c, d) : (b++, this._jqm = b, c[b] = {
                "c": a.extend(f, a.jqm.params, d),
                "a": e,
                "w": a(this).addClass("jqmID" + b),
                "s": b
            }, void(f.trigger && a(this).jqmAddTrigger(f.trigger)))
        })
    }, a.fn.jqmAddClose = function(a) {
        return j(this, a, "jqmHide")
    }, a.fn.jqmAddTrigger = function(a) {
        return j(this, a, "jqmShow")
    }, a.fn.jqmShow = function(b) {
        return this.each(function() {
            a.jqm.open(this._jqm, b)
        })
    }, a.fn.jqmHide = function(b) {
        return this.each(function() {
            a.jqm.close(this._jqm, b)
        })
    }, a.jqm = {
        "hash": {},
        "open": function(b, g) {
            var i = c[b],
                j = i.c,
                k = "." + j.closeClass,
                l = parseInt(i.w.css("z-index"));
            l = l > 0 ? l : 3e3;
            var m = a("<div></div>").css({
                "height": "100%",
                "width": "100%",
                "position": "fixed",
                "left": 0,
                "top": 0,
                "z-index": l - 1,
                "opacity": j.overlay / 100
            });
            if (i.a) return e;
            if (i.t = g, i.a = !0, i.w.css("z-index", l), j.modal ? (d[0] || setTimeout(function() {
                    h("bind")
                }, 1), d.push(b)) : j.overlay > 0 ? j.closeoverlay && i.w.jqmAddClose(m) : m = e, i.o = m ? m.addClass(j.overlayClass).prependTo("body") : e, j.ajax) {
                var n = j.target || i.w,
                    o = j.ajax;
                n = "string" == typeof n ? a(n, i.w) : a(n), o = "@" == o.substr(0, 1) ? a(g).attr(o.substring(1)) : o, n.html(j.ajaxText).load(o, function() {
                    j.onLoad && j.onLoad.call(this, i), k && i.w.jqmAddClose(a(k, i.w)), f(i)
                })
            } else k && i.w.jqmAddClose(a(k, i.w));
            return j.toTop && i.o && i.w.before('<span id="jqmP' + i.w[0]._jqm + '"></span>').insertAfter(i.o), j.onShow ? j.onShow(i) : i.w.show(), f(i), e
        },
        "close": function(b) {
            var f = c[b];
            return f.a ? (f.a = e, d[0] && (d.pop(), d[0] || h("unbind")), f.c.toTop && f.o && a("#jqmP" + f.w[0]._jqm).after(f.w).remove(), f.c.onHide ? f.c.onHide(f) : (f.w.hide(), f.o && f.o.remove()), e) : e
        },
        "params": {}
    };
    var b = 0,
        c = a.jqm.hash,
        d = [],
        e = !1,
        f = function(a) {
            g(a)
        },
        g = function(b) {
            try {
                a(":input:visible", b.w)[0].focus()
            } catch (c) {}
        },
        h = function(b) {
            a(document)[b]("keypress", i)[b]("keydown", i)[b]("mousedown", i)
        },
        i = function(b) {
            var e = c[d[d.length - 1]],
                f = !a(b.target).parents(".jqmID" + e.s)[0];
            return f && (a(".jqmID" + e.s).each(function() {
                var c = a(this),
                    d = c.offset();
                return d.top <= b.pageY && b.pageY <= d.top + c.height() && d.left <= b.pageX && b.pageX <= d.left + c.width() ? (f = !1, !1) : void 0
            }), g(e)), !f
        },
        j = function(b, d, f) {
            return b.each(function() {
                var b = this._jqm;
                a(d).each(function() {
                    this[f] || (this[f] = [], a(this).click(function() {
                        for (var a in {
                                "jqmShow": 1,
                                "jqmHide": 1
                            })
                            for (var b in this[a]) c[this[a][b]] && c[this[a][b]].w[a](this);
                        return e
                    })), this[f].push(b)
                })
            })
        }
}(jQuery),
function(a) {
    a.fn.jqDrag = function(a) {
        return g(this, a, "d")
    }, a.fn.jqResize = function(a, b) {
        return g(this, a, "r", b)
    }, a.jqDnR = {
        "dnr": {},
        "e": 0,
        "drag": function(a) {
            return "d" == e.k ? f.css({
                "left": e.X + a.pageX - e.pX,
                "top": e.Y + a.pageY - e.pY
            }) : (f.css({
                "width": Math.max(a.pageX - e.pX + e.W, 0),
                "height": Math.max(a.pageY - e.pY + e.H, 0)
            }), c && b.css({
                "width": Math.max(a.pageX - c.pX + c.W, 0),
                "height": Math.max(a.pageY - c.pY + c.H, 0)
            })), !1
        },
        "stop": function() {
            a(document).unbind("mousemove", d.drag).unbind("mouseup", d.stop)
        }
    };
    var b, c, d = a.jqDnR,
        e = d.dnr,
        f = d.e,
        g = function(d, g, j, k) {
            return d.each(function() {
                g = g ? a(g, d) : d, g.bind("mousedown", {
                    "e": d,
                    "k": j
                }, function(d) {
                    var g = d.data,
                        j = {};
                    if (f = g.e, b = k ? a(k) : !1, "relative" != f.css("position")) try {
                        f.position(j)
                    } catch (l) {}
                    if (e = {
                            "X": j.left || h("left") || 0,
                            "Y": j.top || h("top") || 0,
                            "W": h("width") || f[0].scrollWidth || 0,
                            "H": h("height") || f[0].scrollHeight || 0,
                            "pX": d.pageX,
                            "pY": d.pageY,
                            "k": g.k
                        }, c = b && "d" != g.k ? {
                            "X": j.left || i("left") || 0,
                            "Y": j.top || i("top") || 0,
                            "W": b[0].offsetWidth || i("width") || 0,
                            "H": b[0].offsetHeight || i("height") || 0,
                            "pX": d.pageX,
                            "pY": d.pageY,
                            "k": g.k
                        } : !1, a("input.hasDatepicker", f[0])[0]) try {
                        a("input.hasDatepicker", f[0]).datepicker("hide")
                    } catch (m) {}
                    return a(document).mousemove(a.jqDnR.drag).mouseup(a.jqDnR.stop), !1
                })
            })
        },
        h = function(a) {
            return parseInt(f.css(a), 10) || !1
        },
        i = function(a) {
            return parseInt(b.css(a), 10) || !1
        }
}(jQuery);
var xmlJsonClass = {
    "xml2json": function(a, b) {
        9 === a.nodeType && (a = a.documentElement);
        var c = this.removeWhite(a),
            d = this.toObj(c),
            e = this.toJson(d, a.nodeName, "	");
        return "{\n" + b + (b ? e.replace(/\t/g, b) : e.replace(/\t|\n/g, "")) + "\n}"
    },
    "json2xml": function(a, b) {
        var c, d = function(a, b, c) {
                var e, f, g = "";
                if (a instanceof Array)
                    if (0 === a.length) g += c + "<" + b + ">__EMPTY_ARRAY_</" + b + ">\n";
                    else
                        for (e = 0, f = a.length; f > e; e += 1) {
                            var h = c + d(a[e], b, c + "	") + "\n";
                            g += h
                        } else if ("object" == typeof a) {
                            var i = !1;
                            g += c + "<" + b;
                            var j;
                            for (j in a) a.hasOwnProperty(j) && ("@" === j.charAt(0) ? g += " " + j.substr(1) + '="' + a[j].toString() + '"' : i = !0);
                            if (g += i ? ">" : "/>", i) {
                                for (j in a) a.hasOwnProperty(j) && ("#text" === j ? g += a[j] : "#cdata" === j ? g += "<![CDATA[" + a[j] + "]]>" : "@" !== j.charAt(0) && (g += d(a[j], j, c + "	")));
                                g += ("\n" === g.charAt(g.length - 1) ? c : "") + "</" + b + ">"
                            }
                        } else "function" == typeof a ? g += c + "<" + b + "><![CDATA[" + a + "]]></" + b + ">" : (void 0 === a && (a = ""), g += '""' === a.toString() || 0 === a.toString().length ? c + "<" + b + ">__EMPTY_STRING_</" + b + ">" : c + "<" + b + ">" + a.toString() + "</" + b + ">");
                return g
            },
            e = "";
        for (c in a) a.hasOwnProperty(c) && (e += d(a[c], c, ""));
        return b ? e.replace(/\t/g, b) : e.replace(/\t|\n/g, "")
    },
    "toObj": function(a) {
        var b = {},
            c = /function/i;
        if (1 === a.nodeType) {
            if (a.attributes.length) {
                var d;
                for (d = 0; d < a.attributes.length; d += 1) b["@" + a.attributes[d].nodeName] = (a.attributes[d].nodeValue || "").toString()
            }
            if (a.firstChild) {
                var e, f = 0,
                    g = 0,
                    h = !1;
                for (e = a.firstChild; e; e = e.nextSibling) 1 === e.nodeType ? h = !0 : 3 === e.nodeType && e.nodeValue.match(/[^ \f\n\r\t\v]/) ? f += 1 : 4 === e.nodeType && (g += 1);
                if (h)
                    if (2 > f && 2 > g)
                        for (this.removeWhite(a), e = a.firstChild; e; e = e.nextSibling) 3 === e.nodeType ? b["#text"] = this.escape(e.nodeValue) : 4 === e.nodeType ? c.test(e.nodeValue) ? b[e.nodeName] = [b[e.nodeName], e.nodeValue] : b["#cdata"] = this.escape(e.nodeValue) : b[e.nodeName] ? b[e.nodeName] instanceof Array ? b[e.nodeName][b[e.nodeName].length] = this.toObj(e) : b[e.nodeName] = [b[e.nodeName], this.toObj(e)] : b[e.nodeName] = this.toObj(e);
                    else a.attributes.length ? b["#text"] = this.escape(this.innerXml(a)) : b = this.escape(this.innerXml(a));
                else if (f) a.attributes.length ? b["#text"] = this.escape(this.innerXml(a)) : (b = this.escape(this.innerXml(a)), "__EMPTY_ARRAY_" === b ? b = "[]" : "__EMPTY_STRING_" === b && (b = ""));
                else if (g)
                    if (g > 1) b = this.escape(this.innerXml(a));
                    else
                        for (e = a.firstChild; e; e = e.nextSibling) {
                            if (c.test(a.firstChild.nodeValue)) {
                                b = a.firstChild.nodeValue;
                                break
                            }
                            b["#cdata"] = this.escape(e.nodeValue)
                        }
            }
            a.attributes.length || a.firstChild || (b = null)
        } else 9 === a.nodeType ? b = this.toObj(a.documentElement) : alert("unhandled node type: " + a.nodeType);
        return b
    },
    "toJson": function(a, b, c, d) {
        void 0 === d && (d = !0);
        var e = b ? '"' + b + '"' : "",
            f = "	",
            g = "\n";
        if (d || (f = "", g = ""), "[]" === a) e += b ? ":[]" : "[]";
        else if (a instanceof Array) {
            var h, i, j = [];
            for (i = 0, h = a.length; h > i; i += 1) j[i] = this.toJson(a[i], "", c + f, d);
            e += (b ? ":[" : "[") + (j.length > 1 ? g + c + f + j.join("," + g + c + f) + g + c : j.join("")) + "]"
        } else if (null === a) e += (b && ":") + "null";
        else if ("object" == typeof a) {
            var k, l = [];
            for (k in a) a.hasOwnProperty(k) && (l[l.length] = this.toJson(a[k], k, c + f, d));
            e += (b ? ":{" : "{") + (l.length > 1 ? g + c + f + l.join("," + g + c + f) + g + c : l.join("")) + "}"
        } else e += "string" == typeof a ? (b && ":") + '"' + a.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"' : (b && ":") + a.toString();
        return e
    },
    "innerXml": function(a) {
        var b = "";
        if ("innerHTML" in a) b = a.innerHTML;
        else
            for (var c = function(a) {
                    var b, d = "";
                    if (1 === a.nodeType) {
                        for (d += "<" + a.nodeName, b = 0; b < a.attributes.length; b += 1) d += " " + a.attributes[b].nodeName + '="' + (a.attributes[b].nodeValue || "").toString() + '"';
                        if (a.firstChild) {
                            d += ">";
                            for (var e = a.firstChild; e; e = e.nextSibling) d += c(e);
                            d += "</" + a.nodeName + ">"
                        } else d += "/>"
                    } else 3 === a.nodeType ? d += a.nodeValue : 4 === a.nodeType && (d += "<![CDATA[" + a.nodeValue + "]]>");
                    return d
                }, d = a.firstChild; d; d = d.nextSibling) b += c(d);
        return b
    },
    "escape": function(a) {
        return a.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, "\\n").replace(/[\r]/g, "\\r")
    },
    "removeWhite": function(a) {
        a.normalize();
        var b;
        for (b = a.firstChild; b;)
            if (3 === b.nodeType)
                if (b.nodeValue.match(/[^ \f\n\r\t\v]/)) b = b.nextSibling;
                else {
                    var c = b.nextSibling;
                    a.removeChild(b), b = c
                } else 1 === b.nodeType ? (this.removeWhite(b), b = b.nextSibling) : b = b.nextSibling;
        return a
    }
};
! function(a) {
    "use strict";
    a.fmatter = {}, a.extend(a.fmatter, {
        "isBoolean": function(a) {
            return "boolean" == typeof a
        },
        "isObject": function(b) {
            return b && ("object" == typeof b || a.isFunction(b)) || !1
        },
        "isString": function(a) {
            return "string" == typeof a
        },
        "isNumber": function(a) {
            return "number" == typeof a && isFinite(a)
        },
        "isValue": function(a) {
            return this.isObject(a) || this.isString(a) || this.isNumber(a) || this.isBoolean(a)
        },
        "isEmpty": function(b) {
            return !this.isString(b) && this.isValue(b) ? !1 : this.isValue(b) ? (b = a.trim(b).replace(/\&nbsp\;/gi, "").replace(/\&#160\;/gi, ""), "" === b) : !0
        }
    }), a.fn.fmatter = function(b, c, d, e, f) {
        var g = c;
        d = a.extend({}, a.jgrid.formatter, d);
        try {
            g = a.fn.fmatter[b].call(this, c, d, e, f)
        } catch (h) {}
        return g
    }, a.fmatter.util = {
        "NumberFormat": function(b, c) {
            if (a.fmatter.isNumber(b) || (b *= 1), a.fmatter.isNumber(b)) {
                var d, e = 0 > b,
                    f = String(b),
                    g = c.decimalSeparator || ".";
                if (a.fmatter.isNumber(c.decimalPlaces)) {
                    var h = c.decimalPlaces,
                        i = Math.pow(10, h);
                    if (f = String(Math.round(b * i) / i), d = f.lastIndexOf("."), h > 0)
                        for (0 > d ? (f += g, d = f.length - 1) : "." !== g && (f = f.replace(".", g)); f.length - 1 - d < h;) f += "0"
                }
                if (c.thousandsSeparator) {
                    var j = c.thousandsSeparator;
                    d = f.lastIndexOf(g), d = d > -1 ? d : f.length;
                    var k, l = f.substring(d),
                        m = -1;
                    for (k = d; k > 0; k--) m++, m % 3 === 0 && k !== d && (!e || k > 1) && (l = j + l), l = f.charAt(k - 1) + l;
                    f = l
                }
                return f = c.prefix ? c.prefix + f : f, f = c.suffix ? f + c.suffix : f
            }
            return b
        }
    }, a.fn.fmatter.defaultFormat = function(b, c) {
        return a.fmatter.isValue(b) && "" !== b ? b : c.defaultValue || "&#160;"
    }, a.fn.fmatter.email = function(b, c) {
        return a.fmatter.isEmpty(b) ? a.fn.fmatter.defaultFormat(b, c) : '<a href="mailto:' + b + '">' + b + "</a>"
    }, a.fn.fmatter.checkbox = function(b, c) {
        var d, e = a.extend({}, c.checkbox);
        void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (e = a.extend({}, e, c.colModel.formatoptions)), d = e.disabled === !0 ? 'disabled="disabled"' : "", (a.fmatter.isEmpty(b) || void 0 === b) && (b = a.fn.fmatter.defaultFormat(b, e)), b = String(b), b = (b + "").toLowerCase();
        var f = b.search(/(false|f|0|no|n|off|undefined)/i) < 0 ? " checked='checked' " : "";
        return '<input type="checkbox" ' + f + ' value="' + b + '" offval="no" ' + d + "/>"
    }, a.fn.fmatter.link = function(b, c) {
        var d = {
                "target": c.target
            },
            e = "";
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (d = a.extend({}, d, c.colModel.formatoptions)), d.target && (e = "target=" + d.target), a.fmatter.isEmpty(b) ? a.fn.fmatter.defaultFormat(b, c) : "<a " + e + ' href="' + b + '">' + b + "</a>"
    }, a.fn.fmatter.showlink = function(b, c) {
        var d, e = {
                "baseLinkUrl": c.baseLinkUrl,
                "showAction": c.showAction,
                "addParam": c.addParam || "",
                "target": c.target,
                "idName": c.idName
            },
            f = "";
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (e = a.extend({}, e, c.colModel.formatoptions)), e.target && (f = "target=" + e.target), d = e.baseLinkUrl + e.showAction + "?" + e.idName + "=" + c.rowId + e.addParam, a.fmatter.isString(b) || a.fmatter.isNumber(b) ? "<a " + f + ' href="' + d + '">' + b + "</a>" : a.fn.fmatter.defaultFormat(b, c)
    }, a.fn.fmatter.integer = function(b, c) {
        var d = a.extend({}, c.integer);
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (d = a.extend({}, d, c.colModel.formatoptions)), a.fmatter.isEmpty(b) ? d.defaultValue : a.fmatter.util.NumberFormat(b, d)
    }, a.fn.fmatter.number = function(b, c) {
        var d = a.extend({}, c.number);
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (d = a.extend({}, d, c.colModel.formatoptions)), a.fmatter.isEmpty(b) ? d.defaultValue : a.fmatter.util.NumberFormat(b, d)
    }, a.fn.fmatter.currency = function(b, c) {
        var d = a.extend({}, c.currency);
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (d = a.extend({}, d, c.colModel.formatoptions)), a.fmatter.isEmpty(b) ? d.defaultValue : a.fmatter.util.NumberFormat(b, d)
    }, a.fn.fmatter.date = function(b, c, d, e) {
        var f = a.extend({}, c.date);
        return void 0 !== c.colModel && void 0 !== c.colModel.formatoptions && (f = a.extend({}, f, c.colModel.formatoptions)), f.reformatAfterEdit || "edit" !== e ? a.fmatter.isEmpty(b) ? a.fn.fmatter.defaultFormat(b, c) : a.jgrid.parseDate(f.srcformat, b, f.newformat, f) : a.fn.fmatter.defaultFormat(b, c)
    }, a.fn.fmatter.select = function(b, c) {
        b = String(b);
        var d, e, f = !1,
            g = [];
        if (void 0 !== c.colModel.formatoptions ? (f = c.colModel.formatoptions.value, d = void 0 === c.colModel.formatoptions.separator ? ":" : c.colModel.formatoptions.separator, e = void 0 === c.colModel.formatoptions.delimiter ? ";" : c.colModel.formatoptions.delimiter) : void 0 !== c.colModel.editoptions && (f = c.colModel.editoptions.value, d = void 0 === c.colModel.editoptions.separator ? ":" : c.colModel.editoptions.separator, e = void 0 === c.colModel.editoptions.delimiter ? ";" : c.colModel.editoptions.delimiter), f) {
            var h, i = c.colModel.editoptions.multiple === !0 ? !0 : !1,
                j = [];
            if (i && (j = b.split(","), j = a.map(j, function(b) {
                    return a.trim(b)
                })), a.fmatter.isString(f)) {
                var k, l = f.split(e),
                    m = 0;
                for (k = 0; k < l.length; k++)
                    if (h = l[k].split(d), h.length > 2 && (h[1] = a.map(h, function(a, b) {
                            return b > 0 ? a : void 0
                        }).join(d)), i) a.inArray(h[0], j) > -1 && (g[m] = h[1], m++);
                    else if (a.trim(h[0]) === a.trim(b)) {
                    g[0] = h[1];
                    break
                }
            } else a.fmatter.isObject(f) && (i ? g = a.map(j, function(a) {
                return f[a]
            }) : g[0] = f[b] || "")
        }
        return b = g.join(", "), "" === b ? a.fn.fmatter.defaultFormat(b, c) : b
    }, a.fn.fmatter.rowactions = function(b) {
        var c = a(this).closest("tr.jqgrow"),
            d = c.attr("id"),
            e = a(this).closest("table.ui-jqgrid-btable").attr("id").replace(/_frozen([^_]*)$/, "$1"),
            f = a("#" + e),
            g = f[0],
            h = g.p,
            i = h.colModel[a.jgrid.getCellIndex(this)],
            j = i.frozen ? a("tr#" + d + " td:eq(" + a.jgrid.getCellIndex(this) + ") > div", f) : a(this).parent(),
            k = {
                "extraparam": {}
            },
            l = function(b, c) {
                a.isFunction(k.afterSave) && k.afterSave.call(g, b, c), j.find("div.ui-inline-edit,div.ui-inline-del").show(), j.find("div.ui-inline-save,div.ui-inline-cancel").hide()
            },
            m = function(b) {
                a.isFunction(k.afterRestore) && k.afterRestore.call(g, b), j.find("div.ui-inline-edit,div.ui-inline-del").show(), j.find("div.ui-inline-save,div.ui-inline-cancel").hide()
            };
        void 0 !== i.formatoptions && (k = a.extend(k, i.formatoptions)), void 0 !== h.editOptions && (k.editOptions = h.editOptions), void 0 !== h.delOptions && (k.delOptions = h.delOptions), c.hasClass("jqgrid-new-row") && (k.extraparam[h.prmNames.oper] = h.prmNames.addoper);
        var n = {
            "keys": k.keys,
            "oneditfunc": k.onEdit,
            "successfunc": k.onSuccess,
            "url": k.url,
            "extraparam": k.extraparam,
            "aftersavefunc": l,
            "errorfunc": k.onError,
            "afterrestorefunc": m,
            "restoreAfterError": k.restoreAfterError,
            "mtype": k.mtype
        };
        switch (b) {
            case "edit":
                f.jqGrid("editRow", d, n), j.find("div.ui-inline-edit,div.ui-inline-del").hide(), j.find("div.ui-inline-save,div.ui-inline-cancel").show(), f.triggerHandler("jqGridAfterGridComplete");
                break;
            case "save":
                f.jqGrid("saveRow", d, n) && (j.find("div.ui-inline-edit,div.ui-inline-del").show(), j.find("div.ui-inline-save,div.ui-inline-cancel").hide(), f.triggerHandler("jqGridAfterGridComplete"));
                break;
            case "cancel":
                f.jqGrid("restoreRow", d, m), j.find("div.ui-inline-edit,div.ui-inline-del").show(), j.find("div.ui-inline-save,div.ui-inline-cancel").hide(), f.triggerHandler("jqGridAfterGridComplete");
                break;
            case "del":
                f.jqGrid("delGridRow", d, k.delOptions);
                break;
            case "formedit":
                f.jqGrid("setSelection", d), f.jqGrid("editGridRow", d, k.editOptions)
        }
    }, a.fn.fmatter.actions = function(b, c) {
        var d, e = {
                "keys": !1,
                "editbutton": !0,
                "delbutton": !0,
                "editformbutton": !1
            },
            f = c.rowId,
            g = "";
        return void 0 !== c.colModel.formatoptions && (e = a.extend(e, c.colModel.formatoptions)), void 0 === f || a.fmatter.isEmpty(f) ? "" : (e.editformbutton ? (d = "id='jEditButton_" + f + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'formedit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ", g += "<div title='" + a.jgrid.nav.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + d + "><span class='ui-icon ui-icon-pencil'></span></div>") : e.editbutton && (d = "id='jEditButton_" + f + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'edit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ", g += "<div title='" + a.jgrid.nav.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + d + "><span class='ui-icon ui-icon-pencil'></span></div>"), e.delbutton && (d = "id='jDeleteButton_" + f + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'del'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ", g += "<div title='" + a.jgrid.nav.deltitle + "' style='float:left;margin-left:5px;' class='ui-pg-div ui-inline-del' " + d + "><span class='ui-icon ui-icon-trash'></span></div>"), d = "id='jSaveButton_" + f + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'save'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ", g += "<div title='" + a.jgrid.edit.bSubmit + "' style='float:left;display:none' class='ui-pg-div ui-inline-save' " + d + "><span class='ui-icon ui-icon-disk'></span></div>", d = "id='jCancelButton_" + f + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'cancel'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ", g += "<div title='" + a.jgrid.edit.bCancel + "' style='float:left;display:none;margin-left:5px;' class='ui-pg-div ui-inline-cancel' " + d + "><span class='ui-icon ui-icon-cancel'></span></div>", "<div style='margin-left:8px;'>" + g + "</div>")
    }, a.unformat = function(b, c, d, e) {
        var f, g, h = c.colModel.formatter,
            i = c.colModel.formatoptions || {},
            j = /([\.\*\_\'\(\)\{\}\+\?\\])/g,
            k = c.colModel.unformat || a.fn.fmatter[h] && a.fn.fmatter[h].unformat;
        if (void 0 !== k && a.isFunction(k)) f = k.call(this, a(b).text(), c, b);
        else if (void 0 !== h && a.fmatter.isString(h)) {
            var l, m = a.jgrid.formatter || {};
            switch (h) {
                case "integer":
                    i = a.extend({}, m.integer, i), g = i.thousandsSeparator.replace(j, "\\$1"), l = new RegExp(g, "g"), f = a(b).text().replace(l, "");
                    break;
                case "number":
                    i = a.extend({}, m.number, i), g = i.thousandsSeparator.replace(j, "\\$1"), l = new RegExp(g, "g"), f = a(b).text().replace(l, "").replace(i.decimalSeparator, ".");
                    break;
                case "currency":
                    i = a.extend({}, m.currency, i), g = i.thousandsSeparator.replace(j, "\\$1"), l = new RegExp(g, "g"), f = a(b).text(), i.prefix && i.prefix.length && (f = f.substr(i.prefix.length)), i.suffix && i.suffix.length && (f = f.substr(0, f.length - i.suffix.length)), f = f.replace(l, "").replace(i.decimalSeparator, ".");
                    break;
                case "checkbox":
                    var n = c.colModel.editoptions ? c.colModel.editoptions.value.split(":") : ["Yes", "No"];
                    f = a("input", b).is(":checked") ? n[0] : n[1];
                    break;
                case "select":
                    f = a.unformat.select(b, c, d, e);
                    break;
                case "actions":
                    return "";
                default:
                    f = a(b).text()
            }
        }
        return void 0 !== f ? f : e === !0 ? a(b).text() : a.jgrid.htmlDecode(a(b).html())
    }, a.unformat.select = function(b, c, d, e) {
        var f = [],
            g = a(b).text();
        if (e === !0) return g;
        var h = a.extend({}, void 0 !== c.colModel.formatoptions ? c.colModel.formatoptions : c.colModel.editoptions),
            i = void 0 === h.separator ? ":" : h.separator,
            j = void 0 === h.delimiter ? ";" : h.delimiter;
        if (h.value) {
            var k, l = h.value,
                m = h.multiple === !0 ? !0 : !1,
                n = [];
            if (m && (n = g.split(","), n = a.map(n, function(b) {
                    return a.trim(b)
                })), a.fmatter.isString(l)) {
                var o, p = l.split(j),
                    q = 0;
                for (o = 0; o < p.length; o++)
                    if (k = p[o].split(i), k.length > 2 && (k[1] = a.map(k, function(a, b) {
                            return b > 0 ? a : void 0
                        }).join(i)), m) a.inArray(k[1], n) > -1 && (f[q] = k[0], q++);
                    else if (a.trim(k[1]) === a.trim(g)) {
                    f[0] = k[0];
                    break
                }
            } else(a.fmatter.isObject(l) || a.isArray(l)) && (m || (n[0] = g), f = a.map(n, function(b) {
                var c;
                return a.each(l, function(a, d) {
                    return d === b ? (c = a, !1) : void 0
                }), void 0 !== c ? c : void 0
            }));
            return f.join(", ")
        }
        return g || ""
    }, a.unformat.date = function(b, c) {
        var d = a.jgrid.formatter.date || {};
        return void 0 !== c.formatoptions && (d = a.extend({}, d, c.formatoptions)), a.fmatter.isEmpty(b) ? a.fn.fmatter.defaultFormat(b, c) : a.jgrid.parseDate(d.newformat, b, d.srcformat, d)
    }
}(jQuery),
function(a) {
    "use strict";
    a.extend(a.jgrid, {
        "showModal": function(a) {
            a.w.show()
        },
        "closeModal": function(a) {
            a.w.hide().attr("aria-hidden", "true"), a.o && a.o.remove()
        },
        "hideModal": function(b, c) {
            if (c = a.extend({
                    "jqm": !0,
                    "gb": ""
                }, c || {}), c.onClose) {
                var d = c.gb && "string" == typeof c.gb && "#gbox_" === c.gb.substr(0, 6) ? c.onClose.call(a("#" + c.gb.substr(6))[0], b) : c.onClose(b);
                if ("boolean" == typeof d && !d) return
            }
            if (a.fn.jqm && c.jqm === !0) a(b).attr("aria-hidden", "true").jqmHide();
            else {
                if ("" !== c.gb) try {
                    a(".jqgrid-overlay:first", c.gb).hide()
                } catch (e) {}
                a(b).hide().attr("aria-hidden", "true")
            }
        },
        "findPos": function(a) {
            var b = 0,
                c = 0;
            if (a.offsetParent)
                do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
            return [b, c]
        },
        "createModal": function(b, c, d, e, f, g, h) {
            d = a.extend(!0, {}, a.jgrid.jqModal || {}, d);
            var i, j = document.createElement("div"),
                k = this;
            h = a.extend({}, h || {}), i = "rtl" === a(d.gbox).attr("dir") ? !0 : !1, j.className = "ui-widget ui-widget-content ui-corner-all ui-jqdialog", j.id = b.themodal;
            var l = document.createElement("div");
            l.className = "ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix", l.id = b.modalhead, a(l).append("<span class='ui-jqdialog-title'>" + d.caption + "</span>");
            var m = a("<a class='ui-jqdialog-titlebar-close ui-corner-all'></a>").hover(function() {
                m.addClass("ui-state-hover")
            }, function() {
                m.removeClass("ui-state-hover")
            }).append("<span class='ui-icon ui-icon-closethick'></span>");
            a(l).append(m), i ? (j.dir = "rtl", a(".ui-jqdialog-title", l).css("float", "right"), a(".ui-jqdialog-titlebar-close", l).css("left", "0.3em")) : (j.dir = "ltr", a(".ui-jqdialog-title", l).css("float", "left"), a(".ui-jqdialog-titlebar-close", l).css("right", "0.3em"));
            var n = document.createElement("div");
            a(n).addClass("ui-jqdialog-content ui-widget-content").attr("id", b.modalcontent), a(n).append(c), j.appendChild(n), a(j).prepend(l), g === !0 ? a("body").append(j) : "string" == typeof g ? a(g).append(j) : a(j).insertBefore(e), a(j).css(h), void 0 === d.jqModal && (d.jqModal = !0);
            var o = {};
            if (a.fn.jqm && d.jqModal === !0) {
                if (0 === d.left && 0 === d.top && d.overlay) {
                    var p = [];
                    p = a.jgrid.findPos(f), d.left = p[0] + 4, d.top = p[1] + 4
                }
                o.top = d.top + "px", o.left = d.left
            } else(0 !== d.left || 0 !== d.top) && (o.left = d.left, o.top = d.top + "px");
            if (a("a.ui-jqdialog-titlebar-close", l).click(function() {
                    var c = a("#" + a.jgrid.jqID(b.themodal)).data("onClose") || d.onClose,
                        e = a("#" + a.jgrid.jqID(b.themodal)).data("gbox") || d.gbox;
                    return k.hideModal("#" + a.jgrid.jqID(b.themodal), {
                        "gb": e,
                        "jqm": d.jqModal,
                        "onClose": c
                    }), !1
                }), 0 !== d.width && d.width || (d.width = 300), 0 !== d.height && d.height || (d.height = 200), !d.zIndex) {
                var q = a(e).parents("*[role=dialog]").filter(":first").css("z-index");
                q ? d.zIndex = parseInt(q, 10) + 2 : d.zIndex = 950
            }
            var r = 0;
            if (i && o.left && !g && (r = a(d.gbox).width() - (isNaN(d.width) ? 0 : parseInt(d.width, 10)) - 8, o.left = parseInt(o.left, 10) + parseInt(r, 10)), o.left && (o.left += "px"), a(j).css(a.extend({
                    "width": isNaN(d.width) ? "auto" : d.width + "px",
                    "height": isNaN(d.height) ? "auto" : d.height + "px",
                    "zIndex": d.zIndex,
                    "overflow": "hidden"
                }, o)).attr({
                    "tabIndex": "-1",
                    "role": "dialog",
                    "aria-labelledby": b.modalhead,
                    "aria-hidden": "true"
                }), void 0 === d.drag && (d.drag = !0), void 0 === d.resize && (d.resize = !0), d.drag)
                if (a(l).css("cursor", "move"), a.fn.jqDrag) a(j).jqDrag(l);
                else try {
                    a(j).draggable({
                        "handle": a("#" + a.jgrid.jqID(l.id))
                    })
                } catch (s) {}
                if (d.resize)
                    if (a.fn.jqResize) a(j).append("<div class='jqResize ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se'></div>"), a("#" + a.jgrid.jqID(b.themodal)).jqResize(".jqResize", b.scrollelm ? "#" + a.jgrid.jqID(b.scrollelm) : !1);
                    else try {
                        a(j).resizable({
                            "handles": "se, sw",
                            "alsoResize": b.scrollelm ? "#" + a.jgrid.jqID(b.scrollelm) : !1
                        })
                    } catch (t) {}
                    d.closeOnEscape === !0 && a(j).keydown(function(c) {
                if (27 == c.which) {
                    var e = a("#" + a.jgrid.jqID(b.themodal)).data("onClose") || d.onClose;
                    k.hideModal("#" + a.jgrid.jqID(b.themodal), {
                        "gb": d.gbox,
                        "jqm": d.jqModal,
                        "onClose": e
                    })
                }
            })
        },
        "viewModal": function(b, c) {
            if (c = a.extend({
                    "toTop": !0,
                    "overlay": 10,
                    "modal": !1,
                    "overlayClass": "ui-widget-overlay",
                    "onShow": a.jgrid.showModal,
                    "onHide": a.jgrid.closeModal,
                    "gbox": "",
                    "jqm": !0,
                    "jqM": !0
                }, c || {}), a.fn.jqm && c.jqm === !0) c.jqM ? a(b).attr("aria-hidden", "false").jqm(c).jqmShow() : a(b).attr("aria-hidden", "false").jqmShow();
            else {
                "" !== c.gbox && (a(".jqgrid-overlay:first", c.gbox).show(), a(b).data("gbox", c.gbox)), a(b).show().attr("aria-hidden", "false");
                try {
                    a(":input:visible", b)[0].focus()
                } catch (d) {}
            }
        },
        "info_dialog": function(b, c, d, e) {
            var f = {
                "width": 290,
                "height": "auto",
                "dataheight": "auto",
                "drag": !0,
                "resize": !1,
                "left": 250,
                "top": 170,
                "zIndex": 1e3,
                "jqModal": !0,
                "modal": !1,
                "closeOnEscape": !0,
                "align": "center",
                "buttonalign": "center",
                "buttons": []
            };
            a.extend(!0, f, a.jgrid.jqModal || {}, {
                "caption": "<b>" + b + "</b>"
            }, e || {});
            var g = f.jqModal,
                h = this;
            a.fn.jqm && !g && (g = !1);
            var i, j = "";
            if (f.buttons.length > 0)
                for (i = 0; i < f.buttons.length; i++) void 0 === f.buttons[i].id && (f.buttons[i].id = "info_button_" + i), j += "<a id='" + f.buttons[i].id + "' class='fm-button ui-state-default ui-corner-all'>" + f.buttons[i].text + "</a>";
            var k = isNaN(f.dataheight) ? f.dataheight : f.dataheight + "px",
                l = "text-align:" + f.align + ";",
                m = "<div id='info_id'>";
            m += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + k + ";" + l + "'>" + c + "</div>", m += d ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:" + f.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a id='closedialog' class='fm-button ui-state-default ui-corner-all'>" + d + "</a>" + j + "</div>" : "" !== j ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:" + f.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>" + j + "</div>" : "", m += "</div>";
            try {
                "false" === a("#info_dialog").attr("aria-hidden") && a.jgrid.hideModal("#info_dialog", {
                    "jqm": g
                }), a("#info_dialog").remove()
            } catch (n) {}
            a.jgrid.createModal({
                "themodal": "info_dialog",
                "modalhead": "info_head",
                "modalcontent": "info_content",
                "scrollelm": "infocnt"
            }, m, f, "", "", !0), j && a.each(f.buttons, function(b) {
                a("#" + a.jgrid.jqID(this.id), "#info_id").bind("click", function() {
                    return f.buttons[b].onClick.call(a("#info_dialog")), !1
                })
            }), a("#closedialog", "#info_id").click(function() {
                return h.hideModal("#info_dialog", {
                    "jqm": g,
                    "onClose": a("#info_dialog").data("onClose") || f.onClose,
                    "gb": a("#info_dialog").data("gbox") || f.gbox
                }), !1
            }), a(".fm-button", "#info_dialog").hover(function() {
                a(this).addClass("ui-state-hover")
            }, function() {
                a(this).removeClass("ui-state-hover")
            }), a.isFunction(f.beforeOpen) && f.beforeOpen(), a.jgrid.viewModal("#info_dialog", {
                "onHide": function(a) {
                    a.w.hide().remove(), a.o && a.o.remove()
                },
                "modal": f.modal,
                "jqm": g
            }), a.isFunction(f.afterOpen) && f.afterOpen();
            try {
                a("#info_dialog").focus()
            } catch (o) {}
        },
        "bindEv": function(b, c) {
            var d = this;
            a.isFunction(c.dataInit) && c.dataInit.call(d, b, c), c.dataEvents && a.each(c.dataEvents, function() {
                void 0 !== this.data ? a(b).bind(this.type, this.data, this.fn) : a(b).bind(this.type, this.fn)
            })
        },
        "createEl": function(b, c, d, e, f) {
            function g(b, c, d) {
                var e = ["dataInit", "dataEvents", "dataUrl", "buildSelect", "sopt", "searchhidden", "defaultValue", "attr", "custom_element", "custom_value"];
                void 0 !== d && a.isArray(d) && a.merge(e, d), a.each(c, function(c, d) {
                    -1 === a.inArray(c, e) && a(b).attr(c, d)
                }), c.hasOwnProperty("id") || a(b).attr("id", a.jgrid.randId())
            }
            var h = "",
                i = this;
            switch (b) {
                case "textarea":
                    h = document.createElement("textarea"), e ? c.cols || a(h).css({
                        "width": "98%"
                    }) : c.cols || (c.cols = 20), c.rows || (c.rows = 2), ("&nbsp;" === d || "&#160;" === d || 1 === d.length && 160 === d.charCodeAt(0)) && (d = ""), h.value = d, g(h, c), a(h).attr({
                        "role": "textbox",
                        "multiline": "true"
                    });
                    break;
                case "checkbox":
                    if (h = document.createElement("input"), h.type = "checkbox", c.value) {
                        var j = c.value.split(":");
                        d === j[0] && (h.checked = !0, h.defaultChecked = !0), h.value = j[0], a(h).attr("offval", j[1])
                    } else {
                        var k = (d + "").toLowerCase();
                        k.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== k ? (h.checked = !0, h.defaultChecked = !0, h.value = d) : h.value = "on", a(h).attr("offval", "off")
                    }
                    g(h, c, ["value"]), a(h).attr("role", "checkbox");
                    break;
                case "select":
                    h = document.createElement("select"), h.setAttribute("role", "select");
                    var l, m = [];
                    if (c.multiple === !0 ? (l = !0, h.multiple = "multiple", a(h).attr("aria-multiselectable", "true")) : l = !1, void 0 !== c.dataUrl) {
                        var n = c.name ? String(c.id).substring(0, String(c.id).length - String(c.name).length - 1) : String(c.id),
                            o = c.postData || f.postData;
                        i.p && i.p.idPrefix && (n = a.jgrid.stripPref(i.p.idPrefix, n)), a.ajax(a.extend({
                            "url": a.isFunction(c.dataUrl) ? c.dataUrl.call(i, n, d, String(c.name)) : c.dataUrl,
                            "type": "GET",
                            "dataType": "html",
                            "data": a.isFunction(o) ? o.call(i, n, d, String(c.name)) : o,
                            "context": {
                                "elem": h,
                                "options": c,
                                "vl": d
                            },
                            "success": function(b) {
                                var c = [],
                                    d = this.elem,
                                    e = this.vl,
                                    f = a.extend({}, this.options),
                                    h = f.multiple === !0,
                                    j = a.isFunction(f.buildSelect) ? f.buildSelect.call(i, b) : b;
                                "string" == typeof j && (j = a(a.trim(j)).html()), j && (a(d).append(j), g(d, f, o ? ["postData"] : void 0), void 0 === f.size && (f.size = h ? 3 : 1), h ? (c = e.split(","), c = a.map(c, function(b) {
                                    return a.trim(b)
                                })) : c[0] = a.trim(e), setTimeout(function() {
                                    a("option", d).each(function(b) {
                                        0 === b && d.multiple && (this.selected = !1), a(this).attr("role", "option"), (a.inArray(a.trim(a(this).text()), c) > -1 || a.inArray(a.trim(a(this).val()), c) > -1) && (this.selected = "selected")
                                    })
                                }, 0))
                            }
                        }, f || {}))
                    } else if (c.value) {
                        var p;
                        void 0 === c.size && (c.size = l ? 3 : 1), l && (m = d.split(","), m = a.map(m, function(b) {
                            return a.trim(b)
                        })), "function" == typeof c.value && (c.value = c.value());
                        var q, r, s, t = void 0 === c.separator ? ":" : c.separator,
                            u = void 0 === c.delimiter ? ";" : c.delimiter;
                        if ("string" == typeof c.value)
                            for (q = c.value.split(u), p = 0; p < q.length; p++) r = q[p].split(t), r.length > 2 && (r[1] = a.map(r, function(a, b) {
                                return b > 0 ? a : void 0
                            }).join(t)), s = document.createElement("option"), s.setAttribute("role", "option"), s.value = r[0], s.innerHTML = r[1], h.appendChild(s), l || a.trim(r[0]) !== a.trim(d) && a.trim(r[1]) !== a.trim(d) || (s.selected = "selected"), l && (a.inArray(a.trim(r[1]), m) > -1 || a.inArray(a.trim(r[0]), m) > -1) && (s.selected = "selected");
                        else if ("object" == typeof c.value) {
                            var v, w = c.value;
                            for (v in w) w.hasOwnProperty(v) && (s = document.createElement("option"), s.setAttribute("role", "option"), s.value = v, s.innerHTML = w[v], h.appendChild(s), l || a.trim(v) !== a.trim(d) && a.trim(w[v]) !== a.trim(d) || (s.selected = "selected"), l && (a.inArray(a.trim(w[v]), m) > -1 || a.inArray(a.trim(v), m) > -1) && (s.selected = "selected"))
                        }
                        g(h, c, ["value"])
                    }
                    break;
                case "text":
                case "password":
                case "button":
                    var x;
                    x = "button" === b ? "button" : "textbox", h = document.createElement("input"), h.type = b, h.value = d, g(h, c), "button" !== b && (e ? c.size || a(h).css({
                        "width": "98%"
                    }) : c.size || (c.size = 20)), a(h).attr("role", x);
                    break;
                case "image":
                case "file":
                    h = document.createElement("input"), h.type = b, g(h, c);
                    break;
                case "custom":
                    h = document.createElement("span");
                    try {
                        if (!a.isFunction(c.custom_element)) throw "e1";
                        var y = c.custom_element.call(i, d, c);
                        if (!y) throw "e2";
                        y = a(y).addClass("customelement").attr({
                            "id": c.id,
                            "name": c.name
                        }), a(h).empty().append(y)
                    } catch (z) {
                        "e1" === z && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === z ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_element' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, "string" == typeof z ? z : z.message, a.jgrid.edit.bClose)
                    }
            }
            return h
        },
        "checkDate": function(a, b) {
            var c, d = function(a) {
                    return a % 4 !== 0 || a % 100 === 0 && a % 400 !== 0 ? 28 : 29
                },
                e = {};
            if (a = a.toLowerCase(), c = -1 !== a.indexOf("/") ? "/" : -1 !== a.indexOf("-") ? "-" : -1 !== a.indexOf(".") ? "." : "/", a = a.split(c), b = b.split(c), 3 !== b.length) return !1;
            var f, g, h = -1,
                i = -1,
                j = -1;
            for (g = 0; g < a.length; g++) {
                var k = isNaN(b[g]) ? 0 : parseInt(b[g], 10);
                e[a[g]] = k, f = a[g], -1 !== f.indexOf("y") && (h = g), -1 !== f.indexOf("m") && (j = g), -1 !== f.indexOf("d") && (i = g)
            }
            f = "y" === a[h] || "yyyy" === a[h] ? 4 : "yy" === a[h] ? 2 : -1;
            var l, m = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return -1 === h ? !1 : (l = e[a[h]].toString(), 2 === f && 1 === l.length && (f = 1), l.length !== f || 0 === e[a[h]] && "00" !== b[h] ? !1 : -1 === j ? !1 : (l = e[a[j]].toString(), l.length < 1 || e[a[j]] < 1 || e[a[j]] > 12 ? !1 : -1 === i ? !1 : (l = e[a[i]].toString(), l.length < 1 || e[a[i]] < 1 || e[a[i]] > 31 || 2 === e[a[j]] && e[a[i]] > d(e[a[h]]) || e[a[i]] > m[e[a[j]]] ? !1 : !0)))
        },
        "isEmpty": function(a) {
            return a.match(/^\s+$/) || "" === a ? !0 : !1
        },
        "checkTime": function(b) {
            var c, d = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/;
            if (!a.jgrid.isEmpty(b)) {
                if (c = b.match(d), !c) return !1;
                if (c[3]) {
                    if (c[1] < 1 || c[1] > 12) return !1
                } else if (c[1] > 23) return !1;
                if (c[2] > 59) return !1
            }
            return !0
        },
        "checkValues": function(b, c, d, e) {
            var f, g, h, i, j, k = this,
                l = k.p.colModel;
            if (void 0 === d)
                if ("string" == typeof c) {
                    for (g = 0, j = l.length; j > g; g++)
                        if (l[g].name === c) {
                            f = l[g].editrules, c = g, null != l[g].formoptions && (h = l[g].formoptions.label);
                            break
                        }
                } else c >= 0 && (f = l[c].editrules);
            else f = d, h = void 0 === e ? "_" : e;
            if (f) {
                if (h || (h = null != k.p.colNames ? k.p.colNames[c] : l[c].label), f.required === !0 && a.jgrid.isEmpty(b)) return [!1, h + ": " + a.jgrid.edit.msg.required, ""];
                var m = f.required === !1 ? !1 : !0;
                if (f.number === !0 && (m !== !1 || !a.jgrid.isEmpty(b)) && isNaN(b)) return [!1, h + ": " + a.jgrid.edit.msg.number, ""];
                if (void 0 !== f.minValue && !isNaN(f.minValue) && parseFloat(b) < parseFloat(f.minValue)) return [!1, h + ": " + a.jgrid.edit.msg.minValue + " " + f.minValue, ""];
                if (void 0 !== f.maxValue && !isNaN(f.maxValue) && parseFloat(b) > parseFloat(f.maxValue)) return [!1, h + ": " + a.jgrid.edit.msg.maxValue + " " + f.maxValue, ""];
                var n;
                if (f.email === !0 && !(m === !1 && a.jgrid.isEmpty(b) || (n = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, n.test(b)))) return [!1, h + ": " + a.jgrid.edit.msg.email, ""];
                if (f.integer === !0 && (m !== !1 || !a.jgrid.isEmpty(b))) {
                    if (isNaN(b)) return [!1, h + ": " + a.jgrid.edit.msg.integer, ""];
                    if (b % 1 !== 0 || -1 !== b.indexOf(".")) return [!1, h + ": " + a.jgrid.edit.msg.integer, ""]
                }
                if (f.date === !0 && !(m === !1 && a.jgrid.isEmpty(b) || (l[c].formatoptions && l[c].formatoptions.newformat ? (i = l[c].formatoptions.newformat, a.jgrid.formatter.date.masks.hasOwnProperty(i) && (i = a.jgrid.formatter.date.masks[i])) : i = l[c].datefmt || "Y-m-d", a.jgrid.checkDate(i, b)))) return [!1, h + ": " + a.jgrid.edit.msg.date + " - " + i, ""];
                if (f.time === !0 && !(m === !1 && a.jgrid.isEmpty(b) || a.jgrid.checkTime(b))) return [!1, h + ": " + a.jgrid.edit.msg.date + " - hh:mm (am/pm)", ""];
                if (f.url === !0 && !(m === !1 && a.jgrid.isEmpty(b) || (n = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i, n.test(b)))) return [!1, h + ": " + a.jgrid.edit.msg.url, ""];
                if (f.custom === !0 && (m !== !1 || !a.jgrid.isEmpty(b))) {
                    if (a.isFunction(f.custom_func)) {
                        var o = f.custom_func.call(k, b, h, c);
                        return a.isArray(o) ? o : [!1, a.jgrid.edit.msg.customarray, ""]
                    }
                    return [!1, a.jgrid.edit.msg.customfcheck, ""]
                }
            }
            return [!0, "", ""]
        }
    })
}(jQuery),
function(a) {
    "use strict";
    a.fn.jqFilter = function(b) {
        if ("string" == typeof b) {
            var c = a.fn.jqFilter[b];
            if (!c) throw "jqFilter - No such method: " + b;
            var d = a.makeArray(arguments).slice(1);
            return c.apply(this, d)
        }
        var e = a.extend(!0, {
            "filter": null,
            "columns": [],
            "onChange": null,
            "afterRedraw": null,
            "checkValues": null,
            "error": !1,
            "errmsg": "",
            "errorcheck": !0,
            "showQuery": !0,
            "sopt": null,
            "ops": [],
            "operands": null,
            "numopts": ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"],
            "stropts": ["eq", "ne", "bw", "bn", "ew", "en", "cn", "nc", "nu", "nn", "in", "ni"],
            "strarr": ["text", "string", "blob"],
            "groupOps": [{
                "op": "AND",
                "text": "AND"
            }, {
                "op": "OR",
                "text": "OR"
            }],
            "groupButton": !0,
            "ruleButtons": !0,
            "direction": "ltr"
        }, a.jgrid.filter, b || {});
        return this.each(function() {
            if (!this.filter) {
                this.p = e, (null === this.p.filter || void 0 === this.p.filter) && (this.p.filter = {
                    "groupOp": this.p.groupOps[0].op,
                    "rules": [],
                    "groups": []
                });
                var b, c, d = this.p.columns.length,
                    f = /msie/i.test(navigator.userAgent) && !window.opera;
                if (this.p.initFilter = a.extend(!0, {}, this.p.filter), d) {
                    for (b = 0; d > b; b++) c = this.p.columns[b], c.stype ? c.inputtype = c.stype : c.inputtype || (c.inputtype = "text"), c.sorttype ? c.searchtype = c.sorttype : c.searchtype || (c.searchtype = "string"), void 0 === c.hidden && (c.hidden = !1), c.label || (c.label = c.name), c.index && (c.name = c.index), c.hasOwnProperty("searchoptions") || (c.searchoptions = {}), c.hasOwnProperty("searchrules") || (c.searchrules = {});
                    this.p.showQuery && a(this).append("<table class='queryresult ui-widget ui-widget-content' style='display:block;max-width:440px;border:0px none;' dir='" + this.p.direction + "'><tbody><tr><td class='query'></td></tr></tbody></table>");
                    var g = function() {
                            return a("#" + a.jgrid.jqID(e.id))[0] || null
                        },
                        h = function(b, c) {
                            var d = [!0, ""],
                                f = g();
                            if (a.isFunction(c.searchrules)) d = c.searchrules.call(f, b, c);
                            else if (a.jgrid && a.jgrid.checkValues) try {
                                d = a.jgrid.checkValues.call(f, b, -1, c.searchrules, c.label)
                            } catch (h) {}
                            d && d.length && d[0] === !1 && (e.error = !d[0], e.errmsg = d[1])
                        };
                    this.onchange = function() {
                        return this.p.error = !1, this.p.errmsg = "", a.isFunction(this.p.onChange) ? this.p.onChange.call(this, this.p) : !1
                    }, this.reDraw = function() {
                        a("table.group:first", this).remove();
                        var b = this.createTableForGroup(e.filter, null);
                        a(this).append(b), a.isFunction(this.p.afterRedraw) && this.p.afterRedraw.call(this, this.p)
                    }, this.createTableForGroup = function(b, c) {
                        var d, f = this,
                            g = a("<table class='group ui-widget ui-widget-content' style='border:0px none;'><tbody></tbody></table>"),
                            h = "left";
                        "rtl" === this.p.direction && (h = "right", g.attr("dir", "rtl")), null === c && g.append("<tr class='error' style='display:none;'><th colspan='5' class='ui-state-error' align='" + h + "'></th></tr>");
                        var i = a("<tr></tr>");
                        g.append(i);
                        var j = a("<th colspan='5' align='" + h + "'></th>");
                        if (i.append(j), this.p.ruleButtons === !0) {
                            var k = a("<select class='opsel'></select>");
                            j.append(k);
                            var l, m = "";
                            for (d = 0; d < e.groupOps.length; d++) l = b.groupOp === f.p.groupOps[d].op ? " selected='selected'" : "", m += "<option value='" + f.p.groupOps[d].op + "'" + l + ">" + f.p.groupOps[d].text + "</option>";
                            k.append(m).bind("change", function() {
                                b.groupOp = a(k).val(), f.onchange()
                            })
                        }
                        var n = "<span></span>";
                        if (this.p.groupButton && (n = a("<input type='button' value='+ {}' title='Add subgroup' class='add-group'/>"), n.bind("click", function() {
                                return void 0 === b.groups && (b.groups = []), b.groups.push({
                                    "groupOp": e.groupOps[0].op,
                                    "rules": [],
                                    "groups": []
                                }), f.reDraw(), f.onchange(), !1
                            })), j.append(n), this.p.ruleButtons === !0) {
                            var o, p = a("<input type='button' value='+' title='Add rule' class='add-rule ui-add'/>");
                            p.bind("click", function() {
                                for (void 0 === b.rules && (b.rules = []), d = 0; d < f.p.columns.length; d++) {
                                    var c = void 0 === f.p.columns[d].search ? !0 : f.p.columns[d].search,
                                        e = f.p.columns[d].hidden === !0,
                                        g = f.p.columns[d].searchoptions.searchhidden === !0;
                                    if (g && c || c && !e) {
                                        o = f.p.columns[d];
                                        break
                                    }
                                }
                                var h;
                                return h = o.searchoptions.sopt ? o.searchoptions.sopt : f.p.sopt ? f.p.sopt : -1 !== a.inArray(o.searchtype, f.p.strarr) ? f.p.stropts : f.p.numopts, b.rules.push({
                                    "field": o.name,
                                    "op": h[0],
                                    "data": ""
                                }), f.reDraw(), !1
                            }), j.append(p)
                        }
                        if (null !== c) {
                            var q = a("<input type='button' value='-' title='Delete group' class='delete-group'/>");
                            j.append(q), q.bind("click", function() {
                                for (d = 0; d < c.groups.length; d++)
                                    if (c.groups[d] === b) {
                                        c.groups.splice(d, 1);
                                        break
                                    }
                                return f.reDraw(), f.onchange(), !1
                            })
                        }
                        if (void 0 !== b.groups)
                            for (d = 0; d < b.groups.length; d++) {
                                var r = a("<tr></tr>");
                                g.append(r);
                                var s = a("<td class='first'></td>");
                                r.append(s);
                                var t = a("<td colspan='4'></td>");
                                t.append(this.createTableForGroup(b.groups[d], b)), r.append(t)
                            }
                        if (void 0 === b.groupOp && (b.groupOp = f.p.groupOps[0].op), void 0 !== b.rules)
                            for (d = 0; d < b.rules.length; d++) g.append(this.createTableRowForRule(b.rules[d], b));
                        return g
                    }, this.createTableRowForRule = function(b, c) {
                        var d, h, i, j, k, l = this,
                            m = g(),
                            n = a("<tr></tr>"),
                            o = "";
                        n.append("<td class='first'></td>");
                        var p = a("<td class='columns'></td>");
                        n.append(p);
                        var q, r = a("<select></select>"),
                            s = [];
                        p.append(r), r.bind("change", function() {
                            for (b.field = a(r).val(), i = a(this).parents("tr:first"), d = 0; d < l.p.columns.length; d++)
                                if (l.p.columns[d].name === b.field) {
                                    j = l.p.columns[d];
                                    break
                                }
                            if (j) {
                                j.searchoptions.id = a.jgrid.randId(), f && "text" === j.inputtype && (j.searchoptions.size || (j.searchoptions.size = 10));
                                var c = a.jgrid.createEl.call(m, j.inputtype, j.searchoptions, "", !0, l.p.ajaxSelectOptions || {}, !0);
                                a(c).addClass("input-elm"), h = j.searchoptions.sopt ? j.searchoptions.sopt : l.p.sopt ? l.p.sopt : -1 !== a.inArray(j.searchtype, l.p.strarr) ? l.p.stropts : l.p.numopts;
                                var e = "",
                                    g = 0;
                                for (s = [], a.each(l.p.ops, function() {
                                        s.push(this.oper)
                                    }), d = 0; d < h.length; d++) q = a.inArray(h[d], s), -1 !== q && (0 === g && (b.op = l.p.ops[q].oper), e += "<option value='" + l.p.ops[q].oper + "'>" + l.p.ops[q].text + "</option>", g++);
                                if (a(".selectopts", i).empty().append(e), a(".selectopts", i)[0].selectedIndex = 0, a.jgrid.msie && a.jgrid.msiever() < 9) {
                                    var k = parseInt(a("select.selectopts", i)[0].offsetWidth, 10) + 1;
                                    a(".selectopts", i).width(k), a(".selectopts", i).css("width", "auto")
                                }
                                a(".data", i).empty().append(c), a.jgrid.bindEv.call(m, c, j.searchoptions), a(".input-elm", i).bind("change", function(c) {
                                    var d = c.target;
                                    b.data = "SPAN" === d.nodeName.toUpperCase() && j.searchoptions && a.isFunction(j.searchoptions.custom_value) ? j.searchoptions.custom_value.call(m, a(d).children(".customelement:first"), "get") : d.value, l.onchange()
                                }), setTimeout(function() {
                                    b.data = a(c).val(), l.onchange()
                                }, 0)
                            }
                        });
                        var t = 0;
                        for (d = 0; d < l.p.columns.length; d++) {
                            var u = void 0 === l.p.columns[d].search ? !0 : l.p.columns[d].search,
                                v = l.p.columns[d].hidden === !0,
                                w = l.p.columns[d].searchoptions.searchhidden === !0;
                            (w && u || u && !v) && (k = "", b.field === l.p.columns[d].name && (k = " selected='selected'", t = d), o += "<option value='" + l.p.columns[d].name + "'" + k + ">" + l.p.columns[d].label + "</option>")
                        }
                        r.append(o);
                        var x = a("<td class='operators'></td>");
                        n.append(x), j = e.columns[t], j.searchoptions.id = a.jgrid.randId(), f && "text" === j.inputtype && (j.searchoptions.size || (j.searchoptions.size = 10));
                        var y = a.jgrid.createEl.call(m, j.inputtype, j.searchoptions, b.data, !0, l.p.ajaxSelectOptions || {}, !0);
                        ("nu" === b.op || "nn" === b.op) && (a(y).attr("readonly", "true"), a(y).attr("disabled", "true"));
                        var z = a("<select class='selectopts'></select>");
                        for (x.append(z), z.bind("change", function() {
                                b.op = a(z).val(), i = a(this).parents("tr:first");
                                var c = a(".input-elm", i)[0];
                                "nu" === b.op || "nn" === b.op ? (b.data = "", "SELECT" !== c.tagName.toUpperCase() && (c.value = ""), c.setAttribute("readonly", "true"), c.setAttribute("disabled", "true")) : ("SELECT" === c.tagName.toUpperCase() && (b.data = c.value), c.removeAttribute("readonly"), c.removeAttribute("disabled")), l.onchange()
                            }), h = j.searchoptions.sopt ? j.searchoptions.sopt : l.p.sopt ? l.p.sopt : -1 !== a.inArray(j.searchtype, l.p.strarr) ? l.p.stropts : l.p.numopts, o = "", a.each(l.p.ops, function() {
                                s.push(this.oper)
                            }), d = 0; d < h.length; d++) q = a.inArray(h[d], s), -1 !== q && (k = b.op === l.p.ops[q].oper ? " selected='selected'" : "", o += "<option value='" + l.p.ops[q].oper + "'" + k + ">" + l.p.ops[q].text + "</option>");
                        z.append(o);
                        var A = a("<td class='data'></td>");
                        n.append(A), A.append(y), a.jgrid.bindEv.call(m, y, j.searchoptions), a(y).addClass("input-elm").bind("change", function() {
                            b.data = "custom" === j.inputtype ? j.searchoptions.custom_value.call(m, a(this).children(".customelement:first"), "get") : a(this).val(), l.onchange()
                        });
                        var B = a("<td></td>");
                        if (n.append(B), this.p.ruleButtons === !0) {
                            var C = a("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del'/>");
                            B.append(C), C.bind("click", function() {
                                for (d = 0; d < c.rules.length; d++)
                                    if (c.rules[d] === b) {
                                        c.rules.splice(d, 1);
                                        break
                                    }
                                return l.reDraw(), l.onchange(), !1
                            })
                        }
                        return n
                    }, this.getStringForGroup = function(a) {
                        var b, c = "(";
                        if (void 0 !== a.groups)
                            for (b = 0; b < a.groups.length; b++) {
                                c.length > 1 && (c += " " + a.groupOp + " ");
                                try {
                                    c += this.getStringForGroup(a.groups[b])
                                } catch (d) {
                                    alert(d)
                                }
                            }
                        if (void 0 !== a.rules) try {
                            for (b = 0; b < a.rules.length; b++) c.length > 1 && (c += " " + a.groupOp + " "), c += this.getStringForRule(a.rules[b])
                        } catch (e) {
                            alert(e)
                        }
                        return c += ")", "()" === c ? "" : c
                    }, this.getStringForRule = function(b) {
                        var c, d, f, g, i = "",
                            j = "",
                            k = ["int", "integer", "float", "number", "currency"];
                        for (c = 0; c < this.p.ops.length; c++)
                            if (this.p.ops[c].oper === b.op) {
                                i = this.p.operands.hasOwnProperty(b.op) ? this.p.operands[b.op] : "", j = this.p.ops[c].oper;
                                break
                            }
                        for (c = 0; c < this.p.columns.length; c++)
                            if (this.p.columns[c].name === b.field) {
                                d = this.p.columns[c];
                                break
                            }
                        return void 0 == d ? "" : (g = b.data, ("bw" === j || "bn" === j) && (g += "%"), ("ew" === j || "en" === j) && (g = "%" + g), ("cn" === j || "nc" === j) && (g = "%" + g + "%"), ("in" === j || "ni" === j) && (g = " (" + g + ")"), e.errorcheck && h(b.data, d), f = -1 !== a.inArray(d.searchtype, k) || "nn" === j || "nu" === j ? b.field + " " + i + " " + g : b.field + " " + i + ' "' + g + '"')
                    }, this.resetFilter = function() {
                        this.p.filter = a.extend(!0, {}, this.p.initFilter), this.reDraw(), this.onchange()
                    }, this.hideError = function() {
                        a("th.ui-state-error", this).html(""), a("tr.error", this).hide()
                    }, this.showError = function() {
                        a("th.ui-state-error", this).html(this.p.errmsg), a("tr.error", this).show()
                    }, this.toUserFriendlyString = function() {
                        return this.getStringForGroup(e.filter)
                    }, this.toString = function() {
                        function a(a) {
                            if (c.p.errorcheck) {
                                var b, d;
                                for (b = 0; b < c.p.columns.length; b++)
                                    if (c.p.columns[b].name === a.field) {
                                        d = c.p.columns[b];
                                        break
                                    }
                                d && h(a.data, d)
                            }
                            return a.op + "(item." + a.field + ",'" + a.data + "')"
                        }

                        function b(c) {
                            var d, e = "(";
                            if (void 0 !== c.groups)
                                for (d = 0; d < c.groups.length; d++) e.length > 1 && (e += "OR" === c.groupOp ? " || " : " && "), e += b(c.groups[d]);
                            if (void 0 !== c.rules)
                                for (d = 0; d < c.rules.length; d++) e.length > 1 && (e += "OR" === c.groupOp ? " || " : " && "), e += a(c.rules[d]);
                            return e += ")", "()" === e ? "" : e
                        }
                        var c = this;
                        return b(this.p.filter)
                    }, this.reDraw(), this.p.showQuery && this.onchange(), this.filter = !0
                }
            }
        })
    }, a.extend(a.fn.jqFilter, {
        "toSQLString": function() {
            var a = "";
            return this.each(function() {
                a = this.toUserFriendlyString()
            }), a
        },
        "filterData": function() {
            var a;
            return this.each(function() {
                a = this.p.filter
            }), a
        },
        "getParameter": function(a) {
            return void 0 !== a && this.p.hasOwnProperty(a) ? this.p[a] : this.p
        },
        "resetFilter": function() {
            return this.each(function() {
                this.resetFilter()
            })
        },
        "addFilter": function(b) {
            "string" == typeof b && (b = a.jgrid.parse(b)), this.each(function() {
                this.p.filter = b, this.reDraw(), this.onchange()
            })
        }
    })
}(jQuery),
function(a) {
    "use strict";
    var b = {};
    a.jgrid.extend({
        "searchGrid": function(b) {
            return b = a.extend(!0, {
                "recreateFilter": !1,
                "drag": !0,
                "sField": "searchField",
                "sValue": "searchString",
                "sOper": "searchOper",
                "sFilter": "filters",
                "loadDefaults": !0,
                "beforeShowSearch": null,
                "afterShowSearch": null,
                "onInitializeSearch": null,
                "afterRedraw": null,
                "afterChange": null,
                "closeAfterSearch": !1,
                "closeAfterReset": !1,
                "closeOnEscape": !1,
                "searchOnEnter": !1,
                "multipleSearch": !1,
                "multipleGroup": !1,
                "top": 0,
                "left": 0,
                "jqModal": !0,
                "modal": !1,
                "resize": !0,
                "width": 450,
                "height": "auto",
                "dataheight": "auto",
                "showQuery": !1,
                "errorcheck": !0,
                "sopt": null,
                "stringResult": void 0,
                "onClose": null,
                "onSearch": null,
                "onReset": null,
                "toTop": !0,
                "overlay": 30,
                "columns": [],
                "tmplNames": null,
                "tmplFilters": null,
                "tmplLabel": " Template: ",
                "showOnLoad": !1,
                "layer": null,
                "operands": {
                    "eq": "=",
                    "ne": "<>",
                    "lt": "<",
                    "le": "<=",
                    "gt": ">",
                    "ge": ">=",
                    "bw": "LIKE",
                    "bn": "NOT LIKE",
                    "in": "IN",
                    "ni": "NOT IN",
                    "ew": "LIKE",
                    "en": "NOT LIKE",
                    "cn": "LIKE",
                    "nc": "NOT LIKE",
                    "nu": "IS NULL",
                    "nn": "ISNOT NULL"
                }
            }, a.jgrid.search, b || {}), this.each(function() {
                function c(c) {
                    f = a(d).triggerHandler("jqGridFilterBeforeShow", [c]), void 0 === f && (f = !0), f && a.isFunction(b.beforeShowSearch) && (f = b.beforeShowSearch.call(d, c)), f && (a.jgrid.viewModal("#" + a.jgrid.jqID(h.themodal), {
                        "gbox": "#gbox_" + a.jgrid.jqID(e),
                        "jqm": b.jqModal,
                        "modal": b.modal,
                        "overlay": b.overlay,
                        "toTop": b.toTop
                    }), a(d).triggerHandler("jqGridFilterAfterShow", [c]), a.isFunction(b.afterShowSearch) && b.afterShowSearch.call(d, c))
                }
                var d = this;
                if (d.grid) {
                    var e = "fbox_" + d.p.id,
                        f = !0,
                        g = !0,
                        h = {
                            "themodal": "searchmod" + e,
                            "modalhead": "searchhd" + e,
                            "modalcontent": "searchcnt" + e,
                            "scrollelm": e
                        },
                        i = d.p.postData[b.sFilter];
                    if ("string" == typeof i && (i = a.jgrid.parse(i)), b.recreateFilter === !0 && a("#" + a.jgrid.jqID(h.themodal)).remove(), void 0 !== a("#" + a.jgrid.jqID(h.themodal))[0]) c(a("#fbox_" + a.jgrid.jqID(+d.p.id)));
                    else {
                        var j = a("<div><div id='" + e + "' class='searchFilter' style='overflow:auto'></div></div>").insertBefore("#gview_" + a.jgrid.jqID(d.p.id)),
                            k = "left",
                            l = "";
                        "rtl" === d.p.direction && (k = "right", l = " style='text-align:left'", j.attr("dir", "rtl"));
                        var m, n, o = a.extend([], d.p.colModel),
                            p = "<a id='" + e + "_search' class='fm-button ui-state-default ui-corner-all fm-button-icon-right ui-reset'><span class='ui-icon ui-icon-search'></span>" + b.Find + "</a>",
                            q = "<a id='" + e + "_reset' class='fm-button ui-state-default ui-corner-all fm-button-icon-left ui-search'><span class='ui-icon ui-icon-arrowreturnthick-1-w'></span>" + b.Reset + "</a>",
                            r = "",
                            s = "",
                            t = !1,
                            u = -1;
                        if (b.showQuery && (r = "<a id='" + e + "_query' class='fm-button ui-state-default ui-corner-all fm-button-icon-left'><span class='ui-icon ui-icon-comment'></span>Query</a>"), b.columns.length ? (o = b.columns, u = 0, m = o[0].index || o[0].name) : a.each(o, function(a, b) {
                                if (b.label || (b.label = d.p.colNames[a]), !t) {
                                    var c = void 0 === b.search ? !0 : b.search,
                                        e = b.hidden === !0,
                                        f = b.searchoptions && b.searchoptions.searchhidden === !0;
                                    (f && c || c && !e) && (t = !0, m = b.index || b.name, u = a)
                                }
                            }), !i && m || b.multipleSearch === !1) {
                            var v = "eq";
                            u >= 0 && o[u].searchoptions && o[u].searchoptions.sopt ? v = o[u].searchoptions.sopt[0] : b.sopt && b.sopt.length && (v = b.sopt[0]), i = {
                                "groupOp": "AND",
                                "rules": [{
                                    "field": m,
                                    "op": v,
                                    "data": ""
                                }]
                            }
                        }
                        t = !1, b.tmplNames && b.tmplNames.length && (t = !0, s = b.tmplLabel, s += "<select class='ui-template'>", s += "<option value='default'>Default</option>", a.each(b.tmplNames, function(a, b) {
                            s += "<option value='" + a + "'>" + b + "</option>"
                        }), s += "</select>"), n = "<table class='EditTable' style='border:0px none;margin-top:5px' id='" + e + "_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='EditButton' style='text-align:" + k + "'>" + q + s + "</td><td class='EditButton' " + l + ">" + r + p + "</td></tr></tbody></table>", e = a.jgrid.jqID(e), a("#" + e).jqFilter({
                            "columns": o,
                            "filter": b.loadDefaults ? i : null,
                            "showQuery": b.showQuery,
                            "errorcheck": b.errorcheck,
                            "sopt": b.sopt,
                            "groupButton": b.multipleGroup,
                            "ruleButtons": b.multipleSearch,
                            "afterRedraw": b.afterRedraw,
                            "ops": b.odata,
                            "operands": b.operands,
                            "ajaxSelectOptions": d.p.ajaxSelectOptions,
                            "groupOps": b.groupOps,
                            "onChange": function() {
                                this.p.showQuery && a(".query", this).html(this.toUserFriendlyString()), a.isFunction(b.afterChange) && b.afterChange.call(d, a("#" + e), b)
                            },
                            "direction": d.p.direction,
                            "id": d.p.id
                        }), j.append(n), t && b.tmplFilters && b.tmplFilters.length && a(".ui-template", j).bind("change", function() {
                            var c = a(this).val();
                            return "default" === c ? a("#" + e).jqFilter("addFilter", i) : a("#" + e).jqFilter("addFilter", b.tmplFilters[parseInt(c, 10)]), !1
                        }), b.multipleGroup === !0 && (b.multipleSearch = !0), a(d).triggerHandler("jqGridFilterInitialize", [a("#" + e)]), a.isFunction(b.onInitializeSearch) && b.onInitializeSearch.call(d, a("#" + e)), b.gbox = "#gbox_" + e, b.layer ? a.jgrid.createModal(h, j, b, "#gview_" + a.jgrid.jqID(d.p.id), a("#gbox_" + a.jgrid.jqID(d.p.id))[0], "#" + a.jgrid.jqID(b.layer), {
                            "position": "relative"
                        }) : a.jgrid.createModal(h, j, b, "#gview_" + a.jgrid.jqID(d.p.id), a("#gbox_" + a.jgrid.jqID(d.p.id))[0]), (b.searchOnEnter || b.closeOnEscape) && a("#" + a.jgrid.jqID(h.themodal)).keydown(function(c) {
                            var d = a(c.target);
                            return !b.searchOnEnter || 13 !== c.which || d.hasClass("add-group") || d.hasClass("add-rule") || d.hasClass("delete-group") || d.hasClass("delete-rule") || d.hasClass("fm-button") && d.is("[id$=_query]") ? b.closeOnEscape && 27 === c.which ? (a("#" + a.jgrid.jqID(h.modalhead)).find(".ui-jqdialog-titlebar-close").click(), !1) : void 0 : (a("#" + e + "_search").click(), !1)
                        }), r && a("#" + e + "_query").bind("click", function() {
                            return a(".queryresult", j).toggle(), !1
                        }), void 0 === b.stringResult && (b.stringResult = b.multipleSearch), a("#" + e + "_search").bind("click", function() {
                            var c, f, i = a("#" + e),
                                j = {};
                            if (i.find(".input-elm:focus").change(), f = i.jqFilter("filterData"), b.errorcheck && (i[0].hideError(), b.showQuery || i.jqFilter("toSQLString"), i[0].p.error)) return i[0].showError(), !1;
                            if (b.stringResult) {
                                try {
                                    c = xmlJsonClass.toJson(f, "", "", !1)
                                } catch (k) {
                                    try {
                                        c = JSON.stringify(f)
                                    } catch (l) {}
                                }
                                "string" == typeof c && (j[b.sFilter] = c, a.each([b.sField, b.sValue, b.sOper], function() {
                                    j[this] = ""
                                }))
                            } else b.multipleSearch ? (j[b.sFilter] = f, a.each([b.sField, b.sValue, b.sOper], function() {
                                j[this] = ""
                            })) : (j[b.sField] = f.rules[0].field, j[b.sValue] = f.rules[0].data, j[b.sOper] = f.rules[0].op, j[b.sFilter] = "");
                            return d.p.search = !0, a.extend(d.p.postData, j), g = a(d).triggerHandler("jqGridFilterSearch"), void 0 === g && (g = !0), g && a.isFunction(b.onSearch) && (g = b.onSearch.call(d, d.p.filters)), g !== !1 && a(d).trigger("reloadGrid", [{
                                "page": 1
                            }]), b.closeAfterSearch && a.jgrid.hideModal("#" + a.jgrid.jqID(h.themodal), {
                                "gb": "#gbox_" + a.jgrid.jqID(d.p.id),
                                "jqm": b.jqModal,
                                "onClose": b.onClose
                            }), !1
                        }), a("#" + e + "_reset").bind("click", function() {
                            var c = {},
                                f = a("#" + e);
                            return d.p.search = !1, d.p.resetsearch = !0, b.multipleSearch === !1 ? c[b.sField] = c[b.sValue] = c[b.sOper] = "" : c[b.sFilter] = "", f[0].resetFilter(), t && a(".ui-template", j).val("default"), a.extend(d.p.postData, c), g = a(d).triggerHandler("jqGridFilterReset"), void 0 === g && (g = !0), g && a.isFunction(b.onReset) && (g = b.onReset.call(d)), g !== !1 && a(d).trigger("reloadGrid", [{
                                "page": 1
                            }]), b.closeAfterReset && a.jgrid.hideModal("#" + a.jgrid.jqID(h.themodal), {
                                "gb": "#gbox_" + a.jgrid.jqID(d.p.id),
                                "jqm": b.jqModal,
                                "onClose": b.onClose
                            }), !1
                        }), c(a("#" + e)), a(".fm-button:not(.ui-state-disabled)", j).hover(function() {
                            a(this).addClass("ui-state-hover")
                        }, function() {
                            a(this).removeClass("ui-state-hover")
                        })
                    }
                }
            })
        },
        "editGridRow": function(c, d) {
            return d = a.extend(!0, {
                "top": 0,
                "left": 0,
                "width": 300,
                "datawidth": "auto",
                "height": "auto",
                "dataheight": "auto",
                "modal": !1,
                "overlay": 30,
                "drag": !0,
                "resize": !0,
                "url": null,
                "mtype": "POST",
                "clearAfterAdd": !0,
                "closeAfterEdit": !1,
                "reloadAfterSubmit": !0,
                "onInitializeForm": null,
                "beforeInitData": null,
                "beforeShowForm": null,
                "afterShowForm": null,
                "beforeSubmit": null,
                "afterSubmit": null,
                "onclickSubmit": null,
                "afterComplete": null,
                "onclickPgButtons": null,
                "afterclickPgButtons": null,
                "editData": {},
                "recreateForm": !1,
                "jqModal": !0,
                "closeOnEscape": !1,
                "addedrow": "first",
                "topinfo": "",
                "bottominfo": "",
                "saveicon": [],
                "closeicon": [],
                "savekey": [!1, 13],
                "navkeys": [!1, 38, 40],
                "checkOnSubmit": !1,
                "checkOnUpdate": !1,
                "_savedData": {},
                "processing": !1,
                "onClose": null,
                "ajaxEditOptions": {},
                "serializeEditData": null,
                "viewPagerButtons": !0,
                "overlayClass": "ui-widget-overlay"
            }, a.jgrid.edit, d || {}), b[a(this)[0].p.id] = d, this.each(function() {
                function e() {
                    return a(v + " > tbody > tr > td > .FormElement").each(function() {
                        var b = a(".customelement", this);
                        if (b.length) {
                            var c = b[0],
                                d = a(c).attr("name");
                            a.each(o.p.colModel, function() {
                                if (this.name === d && this.editoptions && a.isFunction(this.editoptions.custom_value)) {
                                    try {
                                        if (p[d] = this.editoptions.custom_value.call(o, a("#" + a.jgrid.jqID(d), v), "get"), void 0 === p[d]) throw "e1"
                                    } catch (b) {
                                        "e1" === b ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, b.message, a.jgrid.edit.bClose)
                                    }
                                    return !0
                                }
                            })
                        } else {
                            switch (a(this).get(0).type) {
                                case "checkbox":
                                    if (a(this).is(":checked")) p[this.name] = a(this).val();
                                    else {
                                        var e = a(this).attr("offval");
                                        p[this.name] = e
                                    }
                                    break;
                                case "select-one":
                                    p[this.name] = a("option:selected", this).val();
                                    break;
                                case "select-multiple":
                                    p[this.name] = a(this).val(), p[this.name] ? p[this.name] = p[this.name].join(",") : p[this.name] = "";
                                    var f = [];
                                    a("option:selected", this).each(function(b, c) {
                                        f[b] = a(c).text()
                                    });
                                    break;
                                case "password":
                                case "text":
                                case "textarea":
                                case "button":
                                    p[this.name] = a(this).val()
                            }
                            o.p.autoencode && (p[this.name] = a.jgrid.htmlEncode(p[this.name]))
                        }
                    }), !0
                }

                function f(c, d, e, f) {
                    var g, h, i, j, k, l, m, n = 0,
                        p = [],
                        q = !1,
                        r = "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>",
                        s = "";
                    for (m = 1; f >= m; m++) s += r;
                    if ("_empty" !== c && (q = a(d).jqGrid("getInd", c)), a(d.p.colModel).each(function(m) {
                            if (g = this.name, h = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, k = h ? "style='display:none'" : "", "cb" !== g && "subgrid" !== g && this.editable === !0 && "rn" !== g) {
                                if (q === !1) j = "";
                                else if (g === d.p.ExpandColumn && d.p.treeGrid === !0) j = a("td[role='gridcell']:eq(" + m + ")", d.rows[q]).text();
                                else {
                                    try {
                                        j = a.unformat.call(d, a("td[role='gridcell']:eq(" + m + ")", d.rows[q]), {
                                            "rowId": c,
                                            "colModel": this
                                        }, m)
                                    } catch (r) {
                                        j = this.edittype && "textarea" === this.edittype ? a("td[role='gridcell']:eq(" + m + ")", d.rows[q]).text() : a("td[role='gridcell']:eq(" + m + ")", d.rows[q]).html()
                                    }(!j || "&nbsp;" === j || "&#160;" === j || 1 === j.length && 160 === j.charCodeAt(0)) && (j = "")
                                }
                                var u = a.extend({}, this.editoptions || {}, {
                                        "id": g,
                                        "name": g
                                    }),
                                    v = a.extend({}, {
                                        "elmprefix": "",
                                        "elmsuffix": "",
                                        "rowabove": !1,
                                        "rowcontent": ""
                                    }, this.formoptions || {}),
                                    w = parseInt(v.rowpos, 10) || n + 1,
                                    x = parseInt(2 * (parseInt(v.colpos, 10) || 1), 10);
                                if ("_empty" === c && u.defaultValue && (j = a.isFunction(u.defaultValue) ? u.defaultValue.call(o) : u.defaultValue), this.edittype || (this.edittype = "text"), o.p.autoencode && (j = a.jgrid.htmlDecode(j)), l = a.jgrid.createEl.call(o, this.edittype, u, j, !1, a.extend({}, a.jgrid.ajaxOptions, d.p.ajaxSelectOptions || {})), (b[o.p.id].checkOnSubmit || b[o.p.id].checkOnUpdate) && (b[o.p.id]._savedData[g] = j), a(l).addClass("FormElement"), a.inArray(this.edittype, ["text", "textarea", "password", "select"]) > -1 && a(l).addClass("ui-widget-content ui-corner-all"), i = a(e).find("tr[rowpos=" + w + "]"), v.rowabove) {
                                    var y = a("<tr><td class='contentinfo' colspan='" + 2 * f + "'>" + v.rowcontent + "</td></tr>");
                                    a(e).append(y), y[0].rp = w
                                }
                                0 === i.length && (i = a("<tr " + k + " rowpos='" + w + "'></tr>").addClass("FormData").attr("id", "tr_" + g), a(i).append(s), a(e).append(i), i[0].rp = w), a("td:eq(" + (x - 2) + ")", i[0]).html(void 0 === v.label ? d.p.colNames[m] : v.label), a("td:eq(" + (x - 1) + ")", i[0]).append(v.elmprefix).append(l).append(v.elmsuffix), "custom" === this.edittype && a.isFunction(u.custom_value) && u.custom_value.call(o, a("#" + g, "#" + t), "set", j), a.jgrid.bindEv.call(o, l, u), p[n] = m, n++
                            }
                        }), n > 0) {
                        var u = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * f - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + d.p.id + "_id' value='" + c + "'/></td></tr>");
                        u[0].rp = n + 999, a(e).append(u), (b[o.p.id].checkOnSubmit || b[o.p.id].checkOnUpdate) && (b[o.p.id]._savedData[d.p.id + "_id"] = c)
                    }
                    return p
                }

                function g(c, d, e) {
                    var f, g, h, i, j, k, l = 0;
                    (b[o.p.id].checkOnSubmit || b[o.p.id].checkOnUpdate) && (b[o.p.id]._savedData = {}, b[o.p.id]._savedData[d.p.id + "_id"] = c);
                    var m = d.p.colModel;
                    if ("_empty" === c) return a(m).each(function() {
                        f = this.name, i = a.extend({}, this.editoptions || {}), h = a("#" + a.jgrid.jqID(f), "#" + e), h && h.length && null !== h[0] && (j = "", "custom" === this.edittype && a.isFunction(i.custom_value) ? i.custom_value.call(o, a("#" + f, "#" + e), "set", j) : i.defaultValue ? (j = a.isFunction(i.defaultValue) ? i.defaultValue.call(o) : i.defaultValue, "checkbox" === h[0].type ? (k = j.toLowerCase(), k.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== k ? (h[0].checked = !0, h[0].defaultChecked = !0, h[0].value = j) : (h[0].checked = !1, h[0].defaultChecked = !1)) : h.val(j)) : "checkbox" === h[0].type ? (h[0].checked = !1, h[0].defaultChecked = !1, j = a(h).attr("offval")) : h[0].type && "select" === h[0].type.substr(0, 6) ? h[0].selectedIndex = 0 : h.val(j), (b[o.p.id].checkOnSubmit === !0 || b[o.p.id].checkOnUpdate) && (b[o.p.id]._savedData[f] = j))
                    }), void a("#id_g", "#" + e).val(c);
                    var n = a(d).jqGrid("getInd", c, !0);
                    n && (a('td[role="gridcell"]', n).each(function(h) {
                        if (f = m[h].name, "cb" !== f && "subgrid" !== f && "rn" !== f && m[h].editable === !0) {
                            if (f === d.p.ExpandColumn && d.p.treeGrid === !0) g = a(this).text();
                            else try {
                                g = a.unformat.call(d, a(this), {
                                    "rowId": c,
                                    "colModel": m[h]
                                }, h)
                            } catch (i) {
                                g = "textarea" === m[h].edittype ? a(this).text() : a(this).html()
                            }
                            switch (o.p.autoencode && (g = a.jgrid.htmlDecode(g)), (b[o.p.id].checkOnSubmit === !0 || b[o.p.id].checkOnUpdate) && (b[o.p.id]._savedData[f] = g), f = a.jgrid.jqID(f), m[h].edittype) {
                                case "password":
                                case "text":
                                case "button":
                                case "image":
                                case "textarea":
                                    ("&nbsp;" === g || "&#160;" === g || 1 === g.length && 160 === g.charCodeAt(0)) && (g = ""), a("#" + f, "#" + e).val(g);
                                    break;
                                case "select":
                                    var j = g.split(",");
                                    j = a.map(j, function(b) {
                                        return a.trim(b)
                                    }), a("#" + f + " option", "#" + e).each(function() {
                                        m[h].editoptions.multiple || a.trim(g) !== a.trim(a(this).text()) && j[0] !== a.trim(a(this).text()) && j[0] !== a.trim(a(this).val()) ? m[h].editoptions.multiple && (a.inArray(a.trim(a(this).text()), j) > -1 || a.inArray(a.trim(a(this).val()), j) > -1) ? this.selected = !0 : this.selected = !1 : this.selected = !0
                                    });
                                    break;
                                case "checkbox":
                                    if (g = String(g), m[h].editoptions && m[h].editoptions.value) {
                                        var k = m[h].editoptions.value.split(":");
                                        k[0] === g ? a("#" + f, "#" + e)[o.p.useProp ? "prop" : "attr"]({
                                            "checked": !0,
                                            "defaultChecked": !0
                                        }) : a("#" + f, "#" + e)[o.p.useProp ? "prop" : "attr"]({
                                            "checked": !1,
                                            "defaultChecked": !1
                                        })
                                    } else g = g.toLowerCase(), g.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== g ? (a("#" + f, "#" + e)[o.p.useProp ? "prop" : "attr"]("checked", !0), a("#" + f, "#" + e)[o.p.useProp ? "prop" : "attr"]("defaultChecked", !0)) : (a("#" + f, "#" + e)[o.p.useProp ? "prop" : "attr"]("checked", !1), a("#" + f, "#" + e)[o.p.useProp ? "prop" : "attr"]("defaultChecked", !1));
                                    break;
                                case "custom":
                                    try {
                                        if (!m[h].editoptions || !a.isFunction(m[h].editoptions.custom_value)) throw "e1";
                                        m[h].editoptions.custom_value.call(o, a("#" + f, "#" + e), "set", g)
                                    } catch (n) {
                                        "e1" === n ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, n.message, a.jgrid.edit.bClose)
                                    }
                            }
                            l++
                        }
                    }), l > 0 && a("#id_g", v).val(c))
                }

                function h() {
                    a.each(o.p.colModel, function(a, b) {
                        b.editoptions && b.editoptions.NullIfEmpty === !0 && p.hasOwnProperty(b.name) && "" === p[b.name] && (p[b.name] = "null")
                    })
                }

                function i() {
                    var c, e, f, i, j, k, l = [!0, "", ""],
                        m = {},
                        n = o.p.prmNames,
                        q = a(o).triggerHandler("jqGridAddEditBeforeCheckValues", [a("#" + t), r]);
                    q && "object" == typeof q && (p = q), a.isFunction(b[o.p.id].beforeCheckValues) && (q = b[o.p.id].beforeCheckValues.call(o, p, a("#" + t), r), q && "object" == typeof q && (p = q));
                    for (i in p)
                        if (p.hasOwnProperty(i) && (l = a.jgrid.checkValues.call(o, p[i], i), l[0] === !1)) break;
                    if (h(), l[0] && (m = a(o).triggerHandler("jqGridAddEditClickSubmit", [b[o.p.id], p, r]), void 0 === m && a.isFunction(b[o.p.id].onclickSubmit) && (m = b[o.p.id].onclickSubmit.call(o, b[o.p.id], p, r) || {}), l = a(o).triggerHandler("jqGridAddEditBeforeSubmit", [p, a("#" + t), r]), void 0 === l && (l = [!0, "", ""]), l[0] && a.isFunction(b[o.p.id].beforeSubmit) && (l = b[o.p.id].beforeSubmit.call(o, p, a("#" + t), r))), l[0] && !b[o.p.id].processing) {
                        if (b[o.p.id].processing = !0, a("#sData", v + "_2").addClass("ui-state-active"), f = n.oper, e = n.id, p[f] = "_empty" === a.trim(p[o.p.id + "_id"]) ? n.addoper : n.editoper, p[f] !== n.addoper ? p[e] = p[o.p.id + "_id"] : void 0 === p[e] && (p[e] = p[o.p.id + "_id"]), delete p[o.p.id + "_id"], p = a.extend(p, b[o.p.id].editData, m), o.p.treeGrid === !0) {
                            if (p[f] === n.addoper) {
                                j = a(o).jqGrid("getGridParam", "selrow");
                                var u = "adjacency" === o.p.treeGridModel ? o.p.treeReader.parent_id_field : "parent_id";
                                p[u] = j
                            }
                            for (k in o.p.treeReader)
                                if (o.p.treeReader.hasOwnProperty(k)) {
                                    var x = o.p.treeReader[k];
                                    if (p.hasOwnProperty(x)) {
                                        if (p[f] === n.addoper && "parent_id_field" === k) continue;
                                        delete p[x]
                                    }
                                }
                        }
                        p[e] = a.jgrid.stripPref(o.p.idPrefix, p[e]);
                        var y = a.extend({
                            "url": b[o.p.id].url || a(o).jqGrid("getGridParam", "editurl"),
                            "type": b[o.p.id].mtype,
                            "data": a.isFunction(b[o.p.id].serializeEditData) ? b[o.p.id].serializeEditData.call(o, p) : p,
                            "complete": function(h, i) {
                                var k;
                                if (p[e] = o.p.idPrefix + p[e], h.status >= 300 && 304 !== h.status ? (l[0] = !1, l[1] = a(o).triggerHandler("jqGridAddEditErrorTextFormat", [h, r]), a.isFunction(b[o.p.id].errorTextFormat) ? l[1] = b[o.p.id].errorTextFormat.call(o, h, r) : l[1] = i + " Status: '" + h.statusText + "'. Error code: " + h.status) : (l = a(o).triggerHandler("jqGridAddEditAfterSubmit", [h, p, r]), void 0 === l && (l = [!0, "", ""]), l[0] && a.isFunction(b[o.p.id].afterSubmit) && (l = b[o.p.id].afterSubmit.call(o, h, p, r))), l[0] === !1) a("#FormError>td", v).html(l[1]), a("#FormError", v).show();
                                else if (o.p.autoencode && a.each(p, function(b, c) {
                                        p[b] = a.jgrid.htmlDecode(c)
                                    }), p[f] === n.addoper ? (l[2] || (l[2] = a.jgrid.randId()), p[e] = l[2], b[o.p.id].reloadAfterSubmit ? a(o).trigger("reloadGrid") : o.p.treeGrid === !0 ? a(o).jqGrid("addChildNode", l[2], j, p) : a(o).jqGrid("addRowData", l[2], p, d.addedrow), b[o.p.id].closeAfterAdd ? (o.p.treeGrid !== !0 && a(o).jqGrid("setSelection", l[2]), a.jgrid.hideModal("#" + a.jgrid.jqID(w.themodal), {
                                        "gb": "#gbox_" + a.jgrid.jqID(s),
                                        "jqm": d.jqModal,
                                        "onClose": b[o.p.id].onClose
                                    })) : b[o.p.id].clearAfterAdd && g("_empty", o, t)) : (b[o.p.id].reloadAfterSubmit ? (a(o).trigger("reloadGrid"), b[o.p.id].closeAfterEdit || setTimeout(function() {
                                        a(o).jqGrid("setSelection", p[e])
                                    }, 1e3)) : o.p.treeGrid === !0 ? a(o).jqGrid("setTreeRow", p[e], p) : a(o).jqGrid("setRowData", p[e], p), b[o.p.id].closeAfterEdit && a.jgrid.hideModal("#" + a.jgrid.jqID(w.themodal), {
                                        "gb": "#gbox_" + a.jgrid.jqID(s),
                                        "jqm": d.jqModal,
                                        "onClose": b[o.p.id].onClose
                                    })), a.isFunction(b[o.p.id].afterComplete) && (c = h, setTimeout(function() {
                                        a(o).triggerHandler("jqGridAddEditAfterComplete", [c, p, a("#" + t), r]), b[o.p.id].afterComplete.call(o, c, p, a("#" + t), r), c = null
                                    }, 500)), (b[o.p.id].checkOnSubmit || b[o.p.id].checkOnUpdate) && (a("#" + t).data("disabled", !1), "_empty" !== b[o.p.id]._savedData[o.p.id + "_id"]))
                                    for (k in b[o.p.id]._savedData) b[o.p.id]._savedData.hasOwnProperty(k) && p[k] && (b[o.p.id]._savedData[k] = p[k]);
                                b[o.p.id].processing = !1, a("#sData", v + "_2").removeClass("ui-state-active");
                                try {
                                    a(":input:visible", "#" + t)[0].focus()
                                } catch (m) {}
                            }
                        }, a.jgrid.ajaxOptions, b[o.p.id].ajaxEditOptions);
                        if (y.url || b[o.p.id].useDataProxy || (a.isFunction(o.p.dataProxy) ? b[o.p.id].useDataProxy = !0 : (l[0] = !1, l[1] += " " + a.jgrid.errors.nourl)), l[0])
                            if (b[o.p.id].useDataProxy) {
                                var z = o.p.dataProxy.call(o, y, "set_" + o.p.id);
                                void 0 === z && (z = [!0, ""]), z[0] === !1 ? (l[0] = !1, l[1] = z[1] || "Error deleting the selected row!") : (y.data.oper === n.addoper && b[o.p.id].closeAfterAdd && a.jgrid.hideModal("#" + a.jgrid.jqID(w.themodal), {
                                    "gb": "#gbox_" + a.jgrid.jqID(s),
                                    "jqm": d.jqModal,
                                    "onClose": b[o.p.id].onClose
                                }), y.data.oper === n.editoper && b[o.p.id].closeAfterEdit && a.jgrid.hideModal("#" + a.jgrid.jqID(w.themodal), {
                                    "gb": "#gbox_" + a.jgrid.jqID(s),
                                    "jqm": d.jqModal,
                                    "onClose": b[o.p.id].onClose
                                }))
                            } else a.ajax(y)
                    }
                    l[0] === !1 && (a("#FormError>td", v).html(l[1]), a("#FormError", v).show())
                }

                function j(a, b) {
                    var c, d = !1;
                    for (c in a)
                        if (a.hasOwnProperty(c) && a[c] != b[c]) {
                            d = !0;
                            break
                        }
                    return d
                }

                function k() {
                    var c = !0;
                    return a("#FormError", v).hide(), b[o.p.id].checkOnUpdate && (p = {}, e(), q = j(p, b[o.p.id]._savedData), q && (a("#" + t).data("disabled", !0), a(".confirm", "#" + w.themodal).show(), c = !1)), c
                }

                function l() {
                    var b;
                    if ("_empty" !== c && void 0 !== o.p.savedRow && o.p.savedRow.length > 0 && a.isFunction(a.fn.jqGrid.restoreRow))
                        for (b = 0; b < o.p.savedRow.length; b++)
                            if (o.p.savedRow[b].id == c) {
                                a(o).jqGrid("restoreRow", c);
                                break
                            }
                }

                function m(b, c) {
                    var d = c[1].length - 1;
                    0 === b ? a("#pData", v + "_2").addClass("ui-state-disabled") : void 0 !== c[1][b - 1] && a("#" + a.jgrid.jqID(c[1][b - 1])).hasClass("ui-state-disabled") ? a("#pData", v + "_2").addClass("ui-state-disabled") : a("#pData", v + "_2").removeClass("ui-state-disabled"), b === d ? a("#nData", v + "_2").addClass("ui-state-disabled") : void 0 !== c[1][b + 1] && a("#" + a.jgrid.jqID(c[1][b + 1])).hasClass("ui-state-disabled") ? a("#nData", v + "_2").addClass("ui-state-disabled") : a("#nData", v + "_2").removeClass("ui-state-disabled")
                }

                function n() {
                    var b = a(o).jqGrid("getDataIDs"),
                        c = a("#id_g", v).val(),
                        d = a.inArray(c, b);
                    return [d, b]
                }
                var o = this;
                if (o.grid && c) {
                    var p, q, r, s = o.p.id,
                        t = "FrmGrid_" + s,
                        u = "TblGrid_" + s,
                        v = "#" + a.jgrid.jqID(u),
                        w = {
                            "themodal": "editmod" + s,
                            "modalhead": "edithd" + s,
                            "modalcontent": "editcnt" + s,
                            "scrollelm": t
                        },
                        x = a.isFunction(b[o.p.id].beforeShowForm) ? b[o.p.id].beforeShowForm : !1,
                        y = a.isFunction(b[o.p.id].afterShowForm) ? b[o.p.id].afterShowForm : !1,
                        z = a.isFunction(b[o.p.id].beforeInitData) ? b[o.p.id].beforeInitData : !1,
                        A = a.isFunction(b[o.p.id].onInitializeForm) ? b[o.p.id].onInitializeForm : !1,
                        B = !0,
                        C = 1,
                        D = 0;
                    t = a.jgrid.jqID(t), "new" === c ? (c = "_empty", r = "add", d.caption = b[o.p.id].addCaption) : (d.caption = b[o.p.id].editCaption, r = "edit"), d.recreateForm || a(o).data("formProp") && a.extend(b[a(this)[0].p.id], a(o).data("formProp"));
                    var E = !0;
                    d.checkOnUpdate && d.jqModal && !d.modal && (E = !1);
                    var F = isNaN(b[a(this)[0].p.id].dataheight) ? b[a(this)[0].p.id].dataheight : b[a(this)[0].p.id].dataheight + "px",
                        G = isNaN(b[a(this)[0].p.id].datawidth) ? b[a(this)[0].p.id].datawidth : b[a(this)[0].p.id].datawidth + "px",
                        H = a("<form name='FormPost' id='" + t + "' class='FormGrid' onSubmit='return false;' style='width:" + G + ";overflow:auto;position:relative;height:" + F + ";'></form>").data("disabled", !1),
                        I = a("<table id='" + u + "' class='EditTable' cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>");
                    if (B = a(o).triggerHandler("jqGridAddEditBeforeInitData", [a("#" + t), r]), void 0 === B && (B = !0), B && z && (B = z.call(o, a("#" + t), r)), B !== !1) {
                        l(), a(o.p.colModel).each(function() {
                            var a = this.formoptions;
                            C = Math.max(C, a ? a.colpos || 0 : 0), D = Math.max(D, a ? a.rowpos || 0 : 0)
                        }), a(H).append(I);
                        var J = a("<tr id='FormError' style='display:none'><td class='ui-state-error' colspan='" + 2 * C + "'></td></tr>");
                        J[0].rp = 0, a(I).append(J), J = a("<tr style='display:none' class='tinfo'><td class='topinfo' colspan='" + 2 * C + "'>" + b[o.p.id].topinfo + "</td></tr>"), J[0].rp = 0, a(I).append(J);
                        var K = "rtl" === o.p.direction ? !0 : !1,
                            L = K ? "nData" : "pData",
                            M = K ? "pData" : "nData";
                        f(c, o, I, C);
                        var N = "<a id='" + L + "' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>",
                            O = "<a id='" + M + "' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>",
                            P = "<a id='sData' class='fm-button ui-state-default ui-corner-all'>" + d.bSubmit + "</a>",
                            Q = "<a id='cData' class='fm-button ui-state-default ui-corner-all'>" + d.bCancel + "</a>",
                            R = "<table border='0' cellspacing='0' cellpadding='0' class='EditTable' id='" + u + "_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>" + (K ? O + N : N + O) + "</td><td class='EditButton'>" + P + Q + "</td></tr>";
                        if (R += "<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>" + b[o.p.id].bottominfo + "</td></tr>", R += "</tbody></table>", D > 0) {
                            var S = [];
                            a.each(a(I)[0].rows, function(a, b) {
                                S[a] = b
                            }), S.sort(function(a, b) {
                                return a.rp > b.rp ? 1 : a.rp < b.rp ? -1 : 0
                            }), a.each(S, function(b, c) {
                                a("tbody", I).append(c)
                            })
                        }
                        d.gbox = "#gbox_" + a.jgrid.jqID(s);
                        var T = !1;
                        d.closeOnEscape === !0 && (d.closeOnEscape = !1, T = !0);
                        var U = a("<div></div>").append(H).append(R);
                        if (a.jgrid.createModal(w, U, b[a(this)[0].p.id], "#gview_" + a.jgrid.jqID(o.p.id), a("#gbox_" + a.jgrid.jqID(o.p.id))[0]), K && (a("#pData, #nData", v + "_2").css("float", "right"), a(".EditButton", v + "_2").css("text-align", "left")), b[o.p.id].topinfo && a(".tinfo", v).show(), b[o.p.id].bottominfo && a(".binfo", v + "_2").show(), U = null, R = null, a("#" + a.jgrid.jqID(w.themodal)).keydown(function(c) {
                                var e = c.target;
                                if (a("#" + t).data("disabled") === !0) return !1;
                                if (b[o.p.id].savekey[0] === !0 && c.which === b[o.p.id].savekey[1] && "TEXTAREA" !== e.tagName) return a("#sData", v + "_2").trigger("click"), !1;
                                if (27 === c.which) return k() ? (T && a.jgrid.hideModal("#" + a.jgrid.jqID(w.themodal), {
                                    "gb": d.gbox,
                                    "jqm": d.jqModal,
                                    "onClose": b[o.p.id].onClose
                                }), !1) : !1;
                                if (b[o.p.id].navkeys[0] === !0) {
                                    if ("_empty" === a("#id_g", v).val()) return !0;
                                    if (c.which === b[o.p.id].navkeys[1]) return a("#pData", v + "_2").trigger("click"), !1;
                                    if (c.which === b[o.p.id].navkeys[2]) return a("#nData", v + "_2").trigger("click"), !1
                                }
                            }), d.checkOnUpdate && (a("a.ui-jqdialog-titlebar-close span", "#" + a.jgrid.jqID(w.themodal)).removeClass("jqmClose"), a("a.ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(w.themodal)).unbind("click").click(function() {
                                return k() ? (a.jgrid.hideModal("#" + a.jgrid.jqID(w.themodal), {
                                    "gb": "#gbox_" + a.jgrid.jqID(s),
                                    "jqm": d.jqModal,
                                    "onClose": b[o.p.id].onClose
                                }), !1) : !1
                            })), d.saveicon = a.extend([!0, "left", "ui-icon-disk"], d.saveicon), d.closeicon = a.extend([!0, "left", "ui-icon-close"], d.closeicon), d.saveicon[0] === !0 && a("#sData", v + "_2").addClass("right" === d.saveicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + d.saveicon[2] + "'></span>"), d.closeicon[0] === !0 && a("#cData", v + "_2").addClass("right" === d.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + d.closeicon[2] + "'></span>"), b[o.p.id].checkOnSubmit || b[o.p.id].checkOnUpdate) {
                            P = "<a id='sNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + d.bYes + "</a>", O = "<a id='nNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + d.bNo + "</a>", Q = "<a id='cNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + d.bExit + "</a>";
                            var V = d.zIndex || 999;
                            V++, a("<div class='" + d.overlayClass + " jqgrid-overlay confirm' style='z-index:" + V + ";display:none;'>&#160;</div><div class='confirm ui-widget-content ui-jqconfirm' style='z-index:" + (V + 1) + "'>" + d.saveData + "<br/><br/>" + P + O + Q + "</div>").insertAfter("#" + t), a("#sNew", "#" + a.jgrid.jqID(w.themodal)).click(function() {
                                return i(), a("#" + t).data("disabled", !1), a(".confirm", "#" + a.jgrid.jqID(w.themodal)).hide(), !1
                            }), a("#nNew", "#" + a.jgrid.jqID(w.themodal)).click(function() {
                                return a(".confirm", "#" + a.jgrid.jqID(w.themodal)).hide(), a("#" + t).data("disabled", !1), setTimeout(function() {
                                    a(":input:visible", "#" + t)[0].focus()
                                }, 0), !1
                            }), a("#cNew", "#" + a.jgrid.jqID(w.themodal)).click(function() {
                                return a(".confirm", "#" + a.jgrid.jqID(w.themodal)).hide(), a("#" + t).data("disabled", !1), a.jgrid.hideModal("#" + a.jgrid.jqID(w.themodal), {
                                    "gb": "#gbox_" + a.jgrid.jqID(s),
                                    "jqm": d.jqModal,
                                    "onClose": b[o.p.id].onClose
                                }), !1
                            })
                        }
                        a(o).triggerHandler("jqGridAddEditInitializeForm", [a("#" + t), r]), A && A.call(o, a("#" + t), r), "_empty" !== c && b[o.p.id].viewPagerButtons ? a("#pData,#nData", v + "_2").show() : a("#pData,#nData", v + "_2").hide(), a(o).triggerHandler("jqGridAddEditBeforeShowForm", [a("#" + t), r]), x && x.call(o, a("#" + t), r), a("#" + a.jgrid.jqID(w.themodal)).data("onClose", b[o.p.id].onClose), a.jgrid.viewModal("#" + a.jgrid.jqID(w.themodal), {
                            "gbox": "#gbox_" + a.jgrid.jqID(s),
                            "jqm": d.jqModal,
                            "overlay": d.overlay,
                            "modal": d.modal,
                            "overlayClass": d.overlayClass,
                            "onHide": function(b) {
                                a(o).data("formProp", {
                                    "top": parseFloat(a(b.w).css("top")),
                                    "left": parseFloat(a(b.w).css("left")),
                                    "width": a(b.w).width(),
                                    "height": a(b.w).height(),
                                    "dataheight": a("#" + t).height(),
                                    "datawidth": a("#" + t).width()
                                }), b.w.remove(), b.o && b.o.remove()
                            }
                        }), E || a("." + a.jgrid.jqID(d.overlayClass)).click(function() {
                            return k() ? (a.jgrid.hideModal("#" + a.jgrid.jqID(w.themodal), {
                                "gb": "#gbox_" + a.jgrid.jqID(s),
                                "jqm": d.jqModal,
                                "onClose": b[o.p.id].onClose
                            }), !1) : !1
                        }), a(".fm-button", "#" + a.jgrid.jqID(w.themodal)).hover(function() {
                            a(this).addClass("ui-state-hover")
                        }, function() {
                            a(this).removeClass("ui-state-hover")
                        }), a("#sData", v + "_2").click(function() {
                            return p = {}, a("#FormError", v).hide(), e(), "_empty" === p[o.p.id + "_id"] ? i() : d.checkOnSubmit === !0 ? (q = j(p, b[o.p.id]._savedData), q ? (a("#" + t).data("disabled", !0), a(".confirm", "#" + a.jgrid.jqID(w.themodal)).show()) : i()) : i(), !1
                        }), a("#cData", v + "_2").click(function() {
                            return k() ? (a.jgrid.hideModal("#" + a.jgrid.jqID(w.themodal), {
                                "gb": "#gbox_" + a.jgrid.jqID(s),
                                "jqm": d.jqModal,
                                "onClose": b[o.p.id].onClose
                            }), !1) : !1
                        }), a("#nData", v + "_2").click(function() {
                            if (!k()) return !1;
                            a("#FormError", v).hide();
                            var b = n();
                            if (b[0] = parseInt(b[0], 10), -1 !== b[0] && b[1][b[0] + 1]) {
                                a(o).triggerHandler("jqGridAddEditClickPgButtons", ["next", a("#" + t), b[1][b[0]]]);
                                var c;
                                if (a.isFunction(d.onclickPgButtons) && (c = d.onclickPgButtons.call(o, "next", a("#" + t), b[1][b[0]]), void 0 !== c && c === !1)) return !1;
                                if (a("#" + a.jgrid.jqID(b[1][b[0] + 1])).hasClass("ui-state-disabled")) return !1;
                                g(b[1][b[0] + 1], o, t), a(o).jqGrid("setSelection", b[1][b[0] + 1]), a(o).triggerHandler("jqGridAddEditAfterClickPgButtons", ["next", a("#" + t), b[1][b[0]]]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(o, "next", a("#" + t), b[1][b[0] + 1]), m(b[0] + 1, b)
                            }
                            return !1
                        }), a("#pData", v + "_2").click(function() {
                            if (!k()) return !1;
                            a("#FormError", v).hide();
                            var b = n();
                            if (-1 !== b[0] && b[1][b[0] - 1]) {
                                a(o).triggerHandler("jqGridAddEditClickPgButtons", ["prev", a("#" + t), b[1][b[0]]]);
                                var c;
                                if (a.isFunction(d.onclickPgButtons) && (c = d.onclickPgButtons.call(o, "prev", a("#" + t), b[1][b[0]]), void 0 !== c && c === !1)) return !1;
                                if (a("#" + a.jgrid.jqID(b[1][b[0] - 1])).hasClass("ui-state-disabled")) return !1;
                                g(b[1][b[0] - 1], o, t), a(o).jqGrid("setSelection", b[1][b[0] - 1]), a(o).triggerHandler("jqGridAddEditAfterClickPgButtons", ["prev", a("#" + t), b[1][b[0]]]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(o, "prev", a("#" + t), b[1][b[0] - 1]), m(b[0] - 1, b)
                            }
                            return !1
                        }), a(o).triggerHandler("jqGridAddEditAfterShowForm", [a("#" + t), r]), y && y.call(o, a("#" + t), r);
                        var W = n();
                        m(W[0], W)
                    }
                }
            })
        },
        "viewGridRow": function(c, d) {
            return d = a.extend(!0, {
                "top": 0,
                "left": 0,
                "width": 0,
                "datawidth": "auto",
                "height": "auto",
                "dataheight": "auto",
                "modal": !1,
                "overlay": 30,
                "drag": !0,
                "resize": !0,
                "jqModal": !0,
                "closeOnEscape": !1,
                "labelswidth": "30%",
                "closeicon": [],
                "navkeys": [!1, 38, 40],
                "onClose": null,
                "beforeShowForm": null,
                "beforeInitData": null,
                "viewPagerButtons": !0,
                "recreateForm": !1
            }, a.jgrid.view, d || {}), b[a(this)[0].p.id] = d, this.each(function() {
                function e() {
                    (b[j.p.id].closeOnEscape === !0 || b[j.p.id].navkeys[0] === !0) && setTimeout(function() {
                        a(".ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(p.modalhead)).focus()
                    }, 0)
                }

                function f(b, c, e, f) {
                    var g, h, i, j, k, l, m, n, o, p = 0,
                        q = [],
                        r = !1,
                        s = "<td class='CaptionTD form-view-label ui-widget-content' width='" + d.labelswidth + "'>&#160;</td><td class='DataTD form-view-data ui-helper-reset ui-widget-content'>&#160;</td>",
                        t = "",
                        u = "<td class='CaptionTD form-view-label ui-widget-content'>&#160;</td><td class='DataTD form-view-data ui-widget-content'>&#160;</td>",
                        v = ["integer", "number", "currency"],
                        w = 0,
                        x = 0;
                    for (l = 1; f >= l; l++) t += 1 === l ? s : u;
                    if (a(c.p.colModel).each(function() {
                            h = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, h || "right" !== this.align || (this.formatter && -1 !== a.inArray(this.formatter, v) ? w = Math.max(w, parseInt(this.width, 10)) : x = Math.max(x, parseInt(this.width, 10)))
                        }), m = 0 !== w ? w : 0 !== x ? x : 0, r = a(c).jqGrid("getInd", b), a(c.p.colModel).each(function(b) {
                            if (g = this.name, n = !1, h = this.editrules && this.editrules.edithidden === !0 ? !1 : this.hidden === !0 ? !0 : !1, k = h ? "style='display:none'" : "", o = "boolean" != typeof this.viewable ? !0 : this.viewable, "cb" !== g && "subgrid" !== g && "rn" !== g && o) {
                                j = r === !1 ? "" : g === c.p.ExpandColumn && c.p.treeGrid === !0 ? a("td:eq(" + b + ")", c.rows[r]).text() : a("td:eq(" + b + ")", c.rows[r]).html(), n = "right" === this.align && 0 !== m ? !0 : !1;
                                var d = a.extend({}, {
                                        "rowabove": !1,
                                        "rowcontent": ""
                                    }, this.formoptions || {}),
                                    l = parseInt(d.rowpos, 10) || p + 1,
                                    s = parseInt(2 * (parseInt(d.colpos, 10) || 1), 10);
                                if (d.rowabove) {
                                    var u = a("<tr><td class='contentinfo' colspan='" + 2 * f + "'>" + d.rowcontent + "</td></tr>");
                                    a(e).append(u), u[0].rp = l
                                }
                                i = a(e).find("tr[rowpos=" + l + "]"), 0 === i.length && (i = a("<tr " + k + " rowpos='" + l + "'></tr>").addClass("FormData").attr("id", "trv_" + g), a(i).append(t), a(e).append(i), i[0].rp = l), a("td:eq(" + (s - 2) + ")", i[0]).html("<b>" + (void 0 === d.label ? c.p.colNames[b] : d.label) + "</b>"), a("td:eq(" + (s - 1) + ")", i[0]).append("<span>" + j + "</span>").attr("id", "v_" + g), n && a("td:eq(" + (s - 1) + ") span", i[0]).css({
                                    "text-align": "right",
                                    "width": m + "px"
                                }), q[p] = b, p++
                            }
                        }), p > 0) {
                        var y = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * f - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + b + "'/></td></tr>");
                        y[0].rp = p + 99, a(e).append(y)
                    }
                    return q
                }

                function g(b, c) {
                    var d, e, f, g, h = 0;
                    g = a(c).jqGrid("getInd", b, !0), g && (a("td", g).each(function(b) {
                        d = c.p.colModel[b].name, e = c.p.colModel[b].editrules && c.p.colModel[b].editrules.edithidden === !0 ? !1 : c.p.colModel[b].hidden === !0 ? !0 : !1, "cb" !== d && "subgrid" !== d && "rn" !== d && (f = d === c.p.ExpandColumn && c.p.treeGrid === !0 ? a(this).text() : a(this).html(), d = a.jgrid.jqID("v_" + d), a("#" + d + " span", "#" + m).html(f), e && a("#" + d, "#" + m).parents("tr:first").hide(), h++)
                    }), h > 0 && a("#id_g", "#" + m).val(b))
                }

                function h(b, c) {
                    var d = c[1].length - 1;
                    0 === b ? a("#pData", "#" + m + "_2").addClass("ui-state-disabled") : void 0 !== c[1][b - 1] && a("#" + a.jgrid.jqID(c[1][b - 1])).hasClass("ui-state-disabled") ? a("#pData", m + "_2").addClass("ui-state-disabled") : a("#pData", "#" + m + "_2").removeClass("ui-state-disabled"), b === d ? a("#nData", "#" + m + "_2").addClass("ui-state-disabled") : void 0 !== c[1][b + 1] && a("#" + a.jgrid.jqID(c[1][b + 1])).hasClass("ui-state-disabled") ? a("#nData", m + "_2").addClass("ui-state-disabled") : a("#nData", "#" + m + "_2").removeClass("ui-state-disabled")
                }

                function i() {
                    var b = a(j).jqGrid("getDataIDs"),
                        c = a("#id_g", "#" + m).val(),
                        d = a.inArray(c, b);
                    return [d, b]
                }
                var j = this;
                if (j.grid && c) {
                    var k = j.p.id,
                        l = "ViewGrid_" + a.jgrid.jqID(k),
                        m = "ViewTbl_" + a.jgrid.jqID(k),
                        n = "ViewGrid_" + k,
                        o = "ViewTbl_" + k,
                        p = {
                            "themodal": "viewmod" + k,
                            "modalhead": "viewhd" + k,
                            "modalcontent": "viewcnt" + k,
                            "scrollelm": l
                        },
                        q = a.isFunction(b[j.p.id].beforeInitData) ? b[j.p.id].beforeInitData : !1,
                        r = !0,
                        s = 1,
                        t = 0;
                    d.recreateForm || a(j).data("viewProp") && a.extend(b[a(this)[0].p.id], a(j).data("viewProp"));
                    var u = isNaN(b[a(this)[0].p.id].dataheight) ? b[a(this)[0].p.id].dataheight : b[a(this)[0].p.id].dataheight + "px",
                        v = isNaN(b[a(this)[0].p.id].datawidth) ? b[a(this)[0].p.id].datawidth : b[a(this)[0].p.id].datawidth + "px",
                        w = a("<form name='FormPost' id='" + n + "' class='FormGrid' style='width:" + v + ";overflow:auto;position:relative;height:" + u + ";'></form>"),
                        x = a("<table id='" + o + "' class='EditTable' cellspacing='1' cellpadding='2' border='0' style='table-layout:fixed'><tbody></tbody></table>");
                    if (q && (r = q.call(j, a("#" + l)), void 0 === r && (r = !0)), r !== !1) {
                        a(j.p.colModel).each(function() {
                            var a = this.formoptions;
                            s = Math.max(s, a ? a.colpos || 0 : 0), t = Math.max(t, a ? a.rowpos || 0 : 0)
                        }), a(w).append(x), f(c, j, x, s);
                        var y = "rtl" === j.p.direction ? !0 : !1,
                            z = y ? "nData" : "pData",
                            A = y ? "pData" : "nData",
                            B = "<a id='" + z + "' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>",
                            C = "<a id='" + A + "' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>",
                            D = "<a id='cData' class='fm-button ui-state-default ui-corner-all'>" + d.bClose + "</a>";
                        if (t > 0) {
                            var E = [];
                            a.each(a(x)[0].rows, function(a, b) {
                                E[a] = b
                            }), E.sort(function(a, b) {
                                return a.rp > b.rp ? 1 : a.rp < b.rp ? -1 : 0
                            }), a.each(E, function(b, c) {
                                a("tbody", x).append(c)
                            })
                        }
                        d.gbox = "#gbox_" + a.jgrid.jqID(k);
                        var F = a("<div></div>").append(w).append("<table border='0' class='EditTable' id='" + m + "_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='" + d.labelswidth + "'>" + (y ? C + B : B + C) + "</td><td class='EditButton'>" + D + "</td></tr></tbody></table>");
                        a.jgrid.createModal(p, F, d, "#gview_" + a.jgrid.jqID(j.p.id), a("#gview_" + a.jgrid.jqID(j.p.id))[0]), y && (a("#pData, #nData", "#" + m + "_2").css("float", "right"), a(".EditButton", "#" + m + "_2").css("text-align", "left")), d.viewPagerButtons || a("#pData, #nData", "#" + m + "_2").hide(), F = null, a("#" + p.themodal).keydown(function(c) {
                            if (27 === c.which) return b[j.p.id].closeOnEscape && a.jgrid.hideModal("#" + a.jgrid.jqID(p.themodal), {
                                "gb": d.gbox,
                                "jqm": d.jqModal,
                                "onClose": d.onClose
                            }), !1;
                            if (d.navkeys[0] === !0) {
                                if (c.which === d.navkeys[1]) return a("#pData", "#" + m + "_2").trigger("click"), !1;
                                if (c.which === d.navkeys[2]) return a("#nData", "#" + m + "_2").trigger("click"), !1
                            }
                        }), d.closeicon = a.extend([!0, "left", "ui-icon-close"], d.closeicon), d.closeicon[0] === !0 && a("#cData", "#" + m + "_2").addClass("right" === d.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + d.closeicon[2] + "'></span>"), a.isFunction(d.beforeShowForm) && d.beforeShowForm.call(j, a("#" + l)), a.jgrid.viewModal("#" + a.jgrid.jqID(p.themodal), {
                            "gbox": "#gbox_" + a.jgrid.jqID(k),
                            "jqm": d.jqModal,
                            "overlay": d.overlay,
                            "modal": d.modal,
                            "onHide": function(b) {
                                a(j).data("viewProp", {
                                    "top": parseFloat(a(b.w).css("top")),
                                    "left": parseFloat(a(b.w).css("left")),
                                    "width": a(b.w).width(),
                                    "height": a(b.w).height(),
                                    "dataheight": a("#" + l).height(),
                                    "datawidth": a("#" + l).width()
                                }), b.w.remove(), b.o && b.o.remove()
                            }
                        }), a(".fm-button:not(.ui-state-disabled)", "#" + m + "_2").hover(function() {
                            a(this).addClass("ui-state-hover")
                        }, function() {
                            a(this).removeClass("ui-state-hover")
                        }), e(), a("#cData", "#" + m + "_2").click(function() {
                            return a.jgrid.hideModal("#" + a.jgrid.jqID(p.themodal), {
                                "gb": "#gbox_" + a.jgrid.jqID(k),
                                "jqm": d.jqModal,
                                "onClose": d.onClose
                            }), !1
                        }), a("#nData", "#" + m + "_2").click(function() {
                            a("#FormError", "#" + m).hide();
                            var b = i();
                            return b[0] = parseInt(b[0], 10), -1 !== b[0] && b[1][b[0] + 1] && (a.isFunction(d.onclickPgButtons) && d.onclickPgButtons.call(j, "next", a("#" + l), b[1][b[0]]), g(b[1][b[0] + 1], j), a(j).jqGrid("setSelection", b[1][b[0] + 1]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(j, "next", a("#" + l), b[1][b[0] + 1]), h(b[0] + 1, b)), e(), !1
                        }), a("#pData", "#" + m + "_2").click(function() {
                            a("#FormError", "#" + m).hide();
                            var b = i();
                            return -1 !== b[0] && b[1][b[0] - 1] && (a.isFunction(d.onclickPgButtons) && d.onclickPgButtons.call(j, "prev", a("#" + l), b[1][b[0]]), g(b[1][b[0] - 1], j), a(j).jqGrid("setSelection", b[1][b[0] - 1]), a.isFunction(d.afterclickPgButtons) && d.afterclickPgButtons.call(j, "prev", a("#" + l), b[1][b[0] - 1]), h(b[0] - 1, b)), e(), !1
                        });
                        var G = i();
                        h(G[0], G)
                    }
                }
            })
        },
        "delGridRow": function(c, d) {
            return d = a.extend(!0, {
                    "top": 0,
                    "left": 0,
                    "width": 240,
                    "height": "auto",
                    "dataheight": "auto",
                    "modal": !1,
                    "overlay": 30,
                    "drag": !0,
                    "resize": !0,
                    "url": "",
                    "mtype": "POST",
                    "reloadAfterSubmit": !0,
                    "beforeShowForm": null,
                    "beforeInitData": null,
                    "afterShowForm": null,
                    "beforeSubmit": null,
                    "onclickSubmit": null,
                    "afterSubmit": null,
                    "jqModal": !0,
                    "closeOnEscape": !1,
                    "delData": {},
                    "delicon": [],
                    "cancelicon": [],
                    "onClose": null,
                    "ajaxDelOptions": {},
                    "processing": !1,
                    "serializeDelData": null,
                    "useDataProxy": !1
                }, a.jgrid.del, d || {}), b[a(this)[0].p.id] = d,
                this.each(function() {
                    var e = this;
                    if (e.grid && c) {
                        var f, g, h, i, j = a.isFunction(b[e.p.id].beforeShowForm),
                            k = a.isFunction(b[e.p.id].afterShowForm),
                            l = a.isFunction(b[e.p.id].beforeInitData) ? b[e.p.id].beforeInitData : !1,
                            m = e.p.id,
                            n = {},
                            o = !0,
                            p = "DelTbl_" + a.jgrid.jqID(m),
                            q = "DelTbl_" + m,
                            r = {
                                "themodal": "delmod" + m,
                                "modalhead": "delhd" + m,
                                "modalcontent": "delcnt" + m,
                                "scrollelm": p
                            };
                        if (a.isArray(c) && (c = c.join()), void 0 !== a("#" + a.jgrid.jqID(r.themodal))[0]) {
                            if (l && (o = l.call(e, a("#" + p)), void 0 === o && (o = !0)), o === !1) return;
                            a("#DelData>td", "#" + p).text(c), a("#DelError", "#" + p).hide(), b[e.p.id].processing === !0 && (b[e.p.id].processing = !1, a("#dData", "#" + p).removeClass("ui-state-active")), j && b[e.p.id].beforeShowForm.call(e, a("#" + p)), a.jgrid.viewModal("#" + a.jgrid.jqID(r.themodal), {
                                "gbox": "#gbox_" + a.jgrid.jqID(m),
                                "jqm": b[e.p.id].jqModal,
                                "jqM": !1,
                                "overlay": b[e.p.id].overlay,
                                "modal": b[e.p.id].modal
                            }), k && b[e.p.id].afterShowForm.call(e, a("#" + p))
                        } else {
                            var s = isNaN(b[e.p.id].dataheight) ? b[e.p.id].dataheight : b[e.p.id].dataheight + "px",
                                t = isNaN(d.datawidth) ? d.datawidth : d.datawidth + "px",
                                u = "<div id='" + q + "' class='formdata' style='width:" + t + ";overflow:auto;position:relative;height:" + s + ";'>";
                            u += "<table class='DelTable'><tbody>", u += "<tr id='DelError' style='display:none'><td class='ui-state-error'></td></tr>", u += "<tr id='DelData' style='display:none'><td >" + c + "</td></tr>", u += '<tr><td class="delmsg" style="white-space:pre;">' + b[e.p.id].msg + "</td></tr><tr><td >&#160;</td></tr>", u += "</tbody></table></div>";
                            var v = "<a id='dData' class='fm-button ui-state-default ui-corner-all'>" + d.bSubmit + "</a>",
                                w = "<a id='eData' class='fm-button ui-state-default ui-corner-all'>" + d.bCancel + "</a>";
                            if (u += "<table cellspacing='0' cellpadding='0' border='0' class='EditTable' id='" + p + "_2'><tbody><tr><td><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton'>" + v + "&#160;" + w + "</td></tr></tbody></table>", d.gbox = "#gbox_" + a.jgrid.jqID(m), a.jgrid.createModal(r, u, d, "#gview_" + a.jgrid.jqID(e.p.id), a("#gview_" + a.jgrid.jqID(e.p.id))[0]), l && (o = l.call(e, a("#" + p)), void 0 === o && (o = !0)), o === !1) return;
                            a(".fm-button", "#" + p + "_2").hover(function() {
                                a(this).addClass("ui-state-hover")
                            }, function() {
                                a(this).removeClass("ui-state-hover")
                            }), d.delicon = a.extend([!0, "left", "ui-icon-scissors"], b[e.p.id].delicon), d.cancelicon = a.extend([!0, "left", "ui-icon-cancel"], b[e.p.id].cancelicon), d.delicon[0] === !0 && a("#dData", "#" + p + "_2").addClass("right" === d.delicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + d.delicon[2] + "'></span>"), d.cancelicon[0] === !0 && a("#eData", "#" + p + "_2").addClass("right" === d.cancelicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='ui-icon " + d.cancelicon[2] + "'></span>"), a("#dData", "#" + p + "_2").click(function() {
                                var c, j = [!0, ""],
                                    k = a("#DelData>td", "#" + p).text();
                                if (n = {}, a.isFunction(b[e.p.id].onclickSubmit) && (n = b[e.p.id].onclickSubmit.call(e, b[e.p.id], k) || {}), a.isFunction(b[e.p.id].beforeSubmit) && (j = b[e.p.id].beforeSubmit.call(e, k)), j[0] && !b[e.p.id].processing) {
                                    if (b[e.p.id].processing = !0, h = e.p.prmNames, f = a.extend({}, b[e.p.id].delData, n), i = h.oper, f[i] = h.deloper, g = h.id, k = String(k).split(","), !k.length) return !1;
                                    for (c in k) k.hasOwnProperty(c) && (k[c] = a.jgrid.stripPref(e.p.idPrefix, k[c]));
                                    f[g] = k.join(), a(this).addClass("ui-state-active");
                                    ruta = a(e).context.outerText.split('\t');
                                    var ruta = a(e).jqGrid("getGridRowById", e.p.selrow);
                                    //EL PUNTO
                                    var l = a.extend({
                                        "url": b[e.p.id].url || a(e).jqGrid("getGridParam", "deleteurl")+ruta,
                                        "type": b[e.p.id].mtype,
                                        "data": a.isFunction(b[e.p.id].serializeDelData) ? b[e.p.id].serializeDelData.call(e, f) : f,
                                        "complete": function(c, g) {
                                            var h;
                                            if (c.status >= 300 && 304 !== c.status ? (j[0] = !1, a.isFunction(b[e.p.id].errorTextFormat) ? j[1] = b[e.p.id].errorTextFormat.call(e, c) : j[1] = g + " Status: '" + c.statusText + "'. Error code: " + c.status) : a.isFunction(b[e.p.id].afterSubmit) && (j = b[e.p.id].afterSubmit.call(e, c, f)), j[0] === !1) a("#DelError>td", "#" + p).html(j[1]), a("#DelError", "#" + p).show();
                                            else {
                                                if (b[e.p.id].reloadAfterSubmit && "local" !== e.p.datatype) a(e).trigger("reloadGrid");
                                                else {
                                                    if (e.p.treeGrid === !0) try {
                                                        a(e).jqGrid("delTreeNode", e.p.idPrefix + k[0])
                                                    } catch (i) {} else
                                                        for (h = 0; h < k.length; h++) a(e).jqGrid("delRowData", e.p.idPrefix + k[h]);
                                                    e.p.selrow = null, e.p.selarrrow = []
                                                }
                                                a.isFunction(b[e.p.id].afterComplete) && setTimeout(function() {
                                                    b[e.p.id].afterComplete.call(e, c, k)
                                                }, 500)
                                            }
                                            b[e.p.id].processing = !1, a("#dData", "#" + p + "_2").removeClass("ui-state-active"), j[0] && a.jgrid.hideModal("#" + a.jgrid.jqID(r.themodal), {
                                                "gb": "#gbox_" + a.jgrid.jqID(m),
                                                "jqm": d.jqModal,
                                                "onClose": b[e.p.id].onClose
                                            })
                                        }
                                    }, a.jgrid.ajaxOptions, b[e.p.id].ajaxDelOptions);
                                    if (l.url || b[e.p.id].useDataProxy || (a.isFunction(e.p.dataProxy) ? b[e.p.id].useDataProxy = !0 : (j[0] = !1, j[1] += " " + a.jgrid.errors.nourl)), j[0])
                                        if (b[e.p.id].useDataProxy) {
                                            var o = e.p.dataProxy.call(e, l, "del_" + e.p.id);
                                            void 0 === o && (o = [!0, ""]), o[0] === !1 ? (j[0] = !1, j[1] = o[1] || "Error deleting the selected row!") : a.jgrid.hideModal("#" + a.jgrid.jqID(r.themodal), {
                                                "gb": "#gbox_" + a.jgrid.jqID(m),
                                                "jqm": d.jqModal,
                                                "onClose": b[e.p.id].onClose
                                            })
                                        } else a.ajax(l)
                                }
                                return j[0] === !1 && (a("#DelError>td", "#" + p).html(j[1]), a("#DelError", "#" + p).show()), !1
                            }), a("#eData", "#" + p + "_2").click(function() {
                                return a.jgrid.hideModal("#" + a.jgrid.jqID(r.themodal), {
                                    "gb": "#gbox_" + a.jgrid.jqID(m),
                                    "jqm": b[e.p.id].jqModal,
                                    "onClose": b[e.p.id].onClose
                                }), !1
                            }), j && b[e.p.id].beforeShowForm.call(e, a("#" + p)), a.jgrid.viewModal("#" + a.jgrid.jqID(r.themodal), {
                                "gbox": "#gbox_" + a.jgrid.jqID(m),
                                "jqm": b[e.p.id].jqModal,
                                "overlay": b[e.p.id].overlay,
                                "modal": b[e.p.id].modal
                            }), k && b[e.p.id].afterShowForm.call(e, a("#" + p))
                        }
                        b[e.p.id].closeOnEscape === !0 && setTimeout(function() {
                            a(".ui-jqdialog-titlebar-close", "#" + a.jgrid.jqID(r.modalhead)).focus()
                        }, 0)
                    }
                })
        },
        "navGrid": function(b, c, d, e, f, g, h) {
            return c = a.extend({
                "edit": !0,
                "editicon": "ui-icon-pencil",
                "add": !0,
                "addicon": "ui-icon-plus",
                "del": !0,
                "delicon": "ui-icon-trash",
                "search": !0,
                "searchicon": "ui-icon-search",
                "refresh": !0,
                "refreshicon": "ui-icon-refresh",
                "refreshstate": "firstpage",
                "view": !1,
                "viewicon": "ui-icon-document",
                "position": "left",
                "closeOnEscape": !0,
                "beforeRefresh": null,
                "afterRefresh": null,
                "cloneToTop": !1,
                "alertwidth": 200,
                "alertheight": "auto",
                "alerttop": null,
                "alertleft": null,
                "alertzIndex": null
            }, a.jgrid.nav, c || {}), this.each(function() {
                if (!this.nav) {
                    var i, j, k = {
                            "themodal": "alertmod_" + this.p.id,
                            "modalhead": "alerthd_" + this.p.id,
                            "modalcontent": "alertcnt_" + this.p.id
                        },
                        l = this;
                    if (l.grid && "string" == typeof b) {
                        void 0 === a("#" + k.themodal)[0] && (c.alerttop || c.alertleft || (void 0 !== window.innerWidth ? (c.alertleft = window.innerWidth, c.alerttop = window.innerHeight) : void 0 !== document.documentElement && void 0 !== document.documentElement.clientWidth && 0 !== document.documentElement.clientWidth ? (c.alertleft = document.documentElement.clientWidth, c.alerttop = document.documentElement.clientHeight) : (c.alertleft = 1024, c.alerttop = 768), c.alertleft = c.alertleft / 2 - parseInt(c.alertwidth, 10) / 2, c.alerttop = c.alerttop / 2 - 25), a.jgrid.createModal(k, "<div>" + c.alerttext + "</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>", {
                            "gbox": "#gbox_" + a.jgrid.jqID(l.p.id),
                            "jqModal": !0,
                            "drag": !0,
                            "resize": !0,
                            "caption": c.alertcap,
                            "top": c.alerttop,
                            "left": c.alertleft,
                            "width": c.alertwidth,
                            "height": c.alertheight,
                            "closeOnEscape": c.closeOnEscape,
                            "zIndex": c.alertzIndex
                        }, "#gview_" + a.jgrid.jqID(l.p.id), a("#gbox_" + a.jgrid.jqID(l.p.id))[0], !0));
                        var m, n = 1,
                            o = function() {
                                a(this).hasClass("ui-state-disabled") || a(this).addClass("ui-state-hover")
                            },
                            p = function() {
                                a(this).removeClass("ui-state-hover")
                            };
                        for (c.cloneToTop && l.p.toppager && (n = 2), m = 0; n > m; m++) {
                            var q, r, s, t = a("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table navtable' style='float:left;table-layout:auto;'><tbody><tr></tr></tbody></table>"),
                                u = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>";
                            0 === m ? (r = b, s = l.p.id, r === l.p.toppager && (s += "_top", n = 1)) : (r = l.p.toppager, s = l.p.id + "_top"), "rtl" === l.p.direction && a(t).attr("dir", "rtl").css("float", "right"), c.add && (e = e || {}, q = a("<td class='ui-pg-button ui-corner-all'></td>"), a(q).append("<div class='ui-pg-div'><span class='ui-icon " + c.addicon + "'></span>" + c.addtext + "</div>"), a("tr", t).append(q), a(q, t).attr({
                                "title": c.addtitle || "",
                                "id": e.id || "add_" + s
                            }).click(function() {
                                return a(this).hasClass("ui-state-disabled") || (a.isFunction(c.addfunc) ? c.addfunc.call(l) : a(l).jqGrid("editGridRow", "new", e)), !1
                            }).hover(o, p), q = null), c.edit && (q = a("<td class='ui-pg-button ui-corner-all'></td>"), d = d || {}, a(q).append("<div class='ui-pg-div'><span class='ui-icon " + c.editicon + "'></span>" + c.edittext + "</div>"), a("tr", t).append(q), a(q, t).attr({
                                "title": c.edittitle || "",
                                "id": d.id || "edit_" + s
                            }).click(function() {
                                if (!a(this).hasClass("ui-state-disabled")) {
                                    var b = l.p.selrow;
                                    b ? a.isFunction(c.editfunc) ? c.editfunc.call(l, b) : a(l).jqGrid("editGridRow", b, d) : (a.jgrid.viewModal("#" + k.themodal, {
                                        "gbox": "#gbox_" + a.jgrid.jqID(l.p.id),
                                        "jqm": !0
                                    }), a("#jqg_alrt").focus())
                                }
                                return !1
                            }).hover(o, p), q = null), c.view && (q = a("<td class='ui-pg-button ui-corner-all'></td>"), h = h || {}, a(q).append("<div class='ui-pg-div'><span class='ui-icon " + c.viewicon + "'></span>" + c.viewtext + "</div>"), a("tr", t).append(q), a(q, t).attr({
                                "title": c.viewtitle || "",
                                "id": h.id || "view_" + s
                            }).click(function() {
                                if (!a(this).hasClass("ui-state-disabled")) {
                                    var b = l.p.selrow;
                                    b ? a.isFunction(c.viewfunc) ? c.viewfunc.call(l, b) : a(l).jqGrid("viewGridRow", b, h) : (a.jgrid.viewModal("#" + k.themodal, {
                                        "gbox": "#gbox_" + a.jgrid.jqID(l.p.id),
                                        "jqm": !0
                                    }), a("#jqg_alrt").focus())
                                }
                                return !1
                            }).hover(o, p), q = null), c.del && (q = a("<td class='ui-pg-button ui-corner-all'></td>"), f = f || {}, a(q).append("<div class='ui-pg-div'><span class='ui-icon " + c.delicon + "'></span>" + c.deltext + "</div>"), a("tr", t).append(q), a(q, t).attr({
                                "title": c.deltitle || "",
                                "id": f.id || "del_" + s
                            }).click(function() {
                                if (!a(this).hasClass("ui-state-disabled")) {
                                    var b;
                                    l.p.multiselect ? (b = l.p.selarrrow, 0 === b.length && (b = null)) : b = l.p.selrow, b ? a.isFunction(c.delfunc) ? c.delfunc.call(l, b) : a(l).jqGrid("delGridRow", b, f) : (a.jgrid.viewModal("#" + k.themodal, {
                                        "gbox": "#gbox_" + a.jgrid.jqID(l.p.id),
                                        "jqm": !0
                                    }), a("#jqg_alrt").focus())
                                }
                                return !1
                            }).hover(o, p), q = null), (c.add || c.edit || c.del || c.view) && a("tr", t).append(u), c.search && (q = a("<td class='ui-pg-button ui-corner-all'></td>"), g = g || {}, a(q).append("<div class='ui-pg-div'><span class='ui-icon " + c.searchicon + "'></span>" + c.searchtext + "</div>"), a("tr", t).append(q), a(q, t).attr({
                                "title": c.searchtitle || "",
                                "id": g.id || "search_" + s
                            }).click(function() {
                                return a(this).hasClass("ui-state-disabled") || (a.isFunction(c.searchfunc) ? c.searchfunc.call(l, g) : a(l).jqGrid("searchGrid", g)), !1
                            }).hover(o, p), g.showOnLoad && g.showOnLoad === !0 && a(q, t).click(), q = null), c.refresh && (q = a("<td class='ui-pg-button ui-corner-all'></td>"), a(q).append("<div class='ui-pg-div'><span class='ui-icon " + c.refreshicon + "'></span>" + c.refreshtext + "</div>"), a("tr", t).append(q), a(q, t).attr({
                                "title": c.refreshtitle || "",
                                "id": "refresh_" + s
                            }).click(function() {
                                if (!a(this).hasClass("ui-state-disabled")) {
                                    a.isFunction(c.beforeRefresh) && c.beforeRefresh.call(l), l.p.search = !1, l.p.resetsearch = !0;
                                    try {
                                        var b = l.p.id;
                                        l.p.postData.filters = "";
                                        try {
                                            a("#fbox_" + a.jgrid.jqID(b)).jqFilter("resetFilter")
                                        } catch (d) {}
                                        a.isFunction(l.clearToolbar) && l.clearToolbar.call(l, !1)
                                    } catch (e) {}
                                    switch (c.refreshstate) {
                                        case "firstpage":
                                            a(l).trigger("reloadGrid", [{
                                                "page": 1
                                            }]);
                                            break;
                                        case "current":
                                            a(l).trigger("reloadGrid", [{
                                                "current": !0
                                            }])
                                    }
                                    a.isFunction(c.afterRefresh) && c.afterRefresh.call(l)
                                }
                                return !1
                            }).hover(o, p), q = null), j = a(".ui-jqgrid").css("font-size") || "11px", a("body").append("<div id='testpg2' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:" + j + ";visibility:hidden;' ></div>"), i = a(t).clone().appendTo("#testpg2").width(), a("#testpg2").remove(), a(r + "_" + c.position, r).append(t), l.p._nvtd && (i > l.p._nvtd[0] && (a(r + "_" + c.position, r).width(i), l.p._nvtd[0] = i), l.p._nvtd[1] = i), j = null, i = null, t = null, this.nav = !0
                        }
                    }
                }
            })
        },
        "navButtonAdd": function(b, c) {
            return c = a.extend({
                "caption": "newButton",
                "title": "",
                "buttonicon": "ui-icon-newwin",
                "onClickButton": null,
                "position": "last",
                "cursor": "pointer"
            }, c || {}), this.each(function() {
                if (this.grid) {
                    "string" == typeof b && 0 !== b.indexOf("#") && (b = "#" + a.jgrid.jqID(b));
                    var d = a(".navtable", b)[0],
                        e = this;
                    if (d) {
                        if (c.id && void 0 !== a("#" + a.jgrid.jqID(c.id), d)[0]) return;
                        var f = a("<td></td>");
                        "NONE" === c.buttonicon.toString().toUpperCase() ? a(f).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'>" + c.caption + "</div>") : a(f).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'><span class='ui-icon " + c.buttonicon + "'></span>" + c.caption + "</div>"), c.id && a(f).attr("id", c.id), "first" === c.position ? 0 === d.rows[0].cells.length ? a("tr", d).append(f) : a("tr td:eq(0)", d).before(f) : a("tr", d).append(f), a(f, d).attr("title", c.title || "").click(function(b) {
                            return a(this).hasClass("ui-state-disabled") || a.isFunction(c.onClickButton) && c.onClickButton.call(e, b), !1
                        }).hover(function() {
                            a(this).hasClass("ui-state-disabled") || a(this).addClass("ui-state-hover")
                        }, function() {
                            a(this).removeClass("ui-state-hover")
                        })
                    }
                }
            })
        },
        "navSeparatorAdd": function(b, c) {
            return c = a.extend({
                "sepclass": "ui-separator",
                "sepcontent": "",
                "position": "last"
            }, c || {}), this.each(function() {
                if (this.grid) {
                    "string" == typeof b && 0 !== b.indexOf("#") && (b = "#" + a.jgrid.jqID(b));
                    var d = a(".navtable", b)[0];
                    if (d) {
                        var e = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='" + c.sepclass + "'></span>" + c.sepcontent + "</td>";
                        "first" === c.position ? 0 === d.rows[0].cells.length ? a("tr", d).append(e) : a("tr td:eq(0)", d).before(e) : a("tr", d).append(e)
                    }
                }
            })
        },
        "GridToForm": function(b, c) {
            return this.each(function() {
                var d, e = this;
                if (e.grid) {
                    var f = a(e).jqGrid("getRowData", b);
                    if (f)
                        for (d in f) f.hasOwnProperty(d) && (a("[name=" + a.jgrid.jqID(d) + "]", c).is("input:radio") || a("[name=" + a.jgrid.jqID(d) + "]", c).is("input:checkbox") ? a("[name=" + a.jgrid.jqID(d) + "]", c).each(function() {
                            a(this).val() == f[d] ? a(this)[e.p.useProp ? "prop" : "attr"]("checked", !0) : a(this)[e.p.useProp ? "prop" : "attr"]("checked", !1)
                        }) : a("[name=" + a.jgrid.jqID(d) + "]", c).val(f[d]))
                }
            })
        },
        "FormToGrid": function(b, c, d, e) {
            return this.each(function() {
                var f = this;
                if (f.grid) {
                    d || (d = "set"), e || (e = "first");
                    var g = a(c).serializeArray(),
                        h = {};
                    a.each(g, function(a, b) {
                        h[b.name] = b.value
                    }), "add" === d ? a(f).jqGrid("addRowData", b, h, e) : "set" === d && a(f).jqGrid("setRowData", b, h)
                }
            })
        }
    })
}(jQuery),
function(a) {
    "use strict";
    a.jgrid.inlineEdit = a.jgrid.inlineEdit || {}, a.jgrid.extend({
        "editRow": function(b, c, d, e, f, g, h, i, j) {
            var k = {},
                l = a.makeArray(arguments).slice(1);
            return "object" === a.type(l[0]) ? k = l[0] : (void 0 !== c && (k.keys = c), a.isFunction(d) && (k.oneditfunc = d), a.isFunction(e) && (k.successfunc = e), void 0 !== f && (k.url = f), void 0 !== g && (k.extraparam = g), a.isFunction(h) && (k.aftersavefunc = h), a.isFunction(i) && (k.errorfunc = i), a.isFunction(j) && (k.afterrestorefunc = j)), k = a.extend(!0, {
                "keys": !1,
                "oneditfunc": null,
                "successfunc": null,
                "url": null,
                "extraparam": {},
                "aftersavefunc": null,
                "errorfunc": null,
                "afterrestorefunc": null,
                "restoreAfterError": !0,
                "mtype": "POST"
            }, a.jgrid.inlineEdit, k), this.each(function() {
                var c, d, e, f, g, h, i = this,
                    j = 0,
                    l = null,
                    m = {};
                i.grid && (f = a(i).jqGrid("getInd", b, !0), f !== !1 && (h = a.isFunction(k.beforeEditRow) ? k.beforeEditRow.call(i, k, b) : void 0, void 0 === h && (h = !0), h && (e = a(f).attr("editable") || "0", "0" !== e || a(f).hasClass("not-editable-row") || (g = i.p.colModel, a('td[role="gridcell"]', f).each(function(e) {
                    c = g[e].name;
                    var f = i.p.treeGrid === !0 && c === i.p.ExpandColumn;
                    if (f) d = a("span:first", this).html();
                    else try {
                        d = a.unformat.call(i, this, {
                            "rowId": b,
                            "colModel": g[e]
                        }, e)
                    } catch (h) {
                        d = g[e].edittype && "textarea" === g[e].edittype ? a(this).text() : a(this).html()
                    }
                    if ("cb" !== c && "subgrid" !== c && "rn" !== c && (i.p.autoencode && (d = a.jgrid.htmlDecode(d)), m[c] = d, g[e].editable === !0)) {
                        null === l && (l = e), f ? a("span:first", this).html("") : a(this).html("");
                        var k = a.extend({}, g[e].editoptions || {}, {
                            "id": b + "_" + c,
                            "name": c
                        });
                        g[e].edittype || (g[e].edittype = "text"), ("&nbsp;" === d || "&#160;" === d || 1 === d.length && 160 === d.charCodeAt(0)) && (d = "");
                        var n = a.jgrid.createEl.call(i, g[e].edittype, k, d, !0, a.extend({}, a.jgrid.ajaxOptions, i.p.ajaxSelectOptions || {}));
                        a(n).addClass("editable"), f ? a("span:first", this).append(n) : a(this).append(n), a.jgrid.bindEv.call(i, n, k), "select" === g[e].edittype && void 0 !== g[e].editoptions && g[e].editoptions.multiple === !0 && void 0 === g[e].editoptions.dataUrl && a.jgrid.msie && a(n).width(a(n).width()), j++
                    }
                }), j > 0 && (m.id = b, i.p.savedRow.push(m), a(f).attr("editable", "1"), setTimeout(function() {
                    a("td:eq(" + l + ") input", f).focus()
                }, 0), k.keys === !0 && a(f).bind("keydown", function(c) {
                    if (27 === c.keyCode) {
                        if (a(i).jqGrid("restoreRow", b, k.afterrestorefunc), i.p._inlinenav) try {
                            a(i).jqGrid("showAddEditButtons")
                        } catch (d) {}
                        return !1
                    }
                    if (13 === c.keyCode) {
                        var e = c.target;
                        if ("TEXTAREA" === e.tagName) return !0;
                        if (a(i).jqGrid("saveRow", b, k) && i.p._inlinenav) try {
                            a(i).jqGrid("showAddEditButtons")
                        } catch (f) {}
                        return !1
                    }
                }), a(i).triggerHandler("jqGridInlineEditRow", [b, k]), a.isFunction(k.oneditfunc) && k.oneditfunc.call(i, b))))))
            })
        },
        "saveRow": function(b, c, d, e, f, g, h) {
            var i = a.makeArray(arguments).slice(1),
                j = {};
            "object" === a.type(i[0]) ? j = i[0] : (a.isFunction(c) && (j.successfunc = c), void 0 !== d && (j.url = d), void 0 !== e && (j.extraparam = e), a.isFunction(f) && (j.aftersavefunc = f), a.isFunction(g) && (j.errorfunc = g), a.isFunction(h) && (j.afterrestorefunc = h)), j = a.extend(!0, {
                "successfunc": null,
                "url": null,
                "extraparam": {},
                "aftersavefunc": null,
                "errorfunc": null,
                "afterrestorefunc": null,
                "restoreAfterError": !0,
                "mtype": "POST"
            }, a.jgrid.inlineEdit, j);
            var k, l, m, n, o, p = !1,
                q = this[0],
                r = {},
                s = {},
                t = {};
            if (!q.grid) return p;
            if (o = a(q).jqGrid("getInd", b, !0), o === !1) return p;
            var u = a.isFunction(j.beforeSaveRow) ? j.beforeSaveRow.call(q, j, b) : void 0;
            if (void 0 === u && (u = !0), u) {
               //EL PUNTO 
               var ruta = a(o).context.cells[3].title;              
                if (l = a(o).attr("editable"), j.url = j.url || q.p.editurl+"/"+ruta, "1" === l) {
                    var v;                    
                    if (a('td[role="gridcell"]', o).each(function(b) {
                            if (v = q.p.colModel[b], k = v.name, "cb" !== k && "subgrid" !== k && v.editable === !0 && "rn" !== k && !a(this).hasClass("not-editable-cell")) {
                                switch (v.edittype) {
                                    case "checkbox":
                                        var c = ["Yes", "No"];
                                        v.editoptions && (c = v.editoptions.value.split(":")), r[k] = a("input", this).is(":checked") ? c[0] : c[1];
                                        break;
                                    case "text":
                                    case "password":
                                    case "textarea":
                                    case "button":
                                        r[k] = a("input, textarea", this).val();
                                        break;
                                    case "select":
                                        if (v.editoptions.multiple) {
                                            var d = a("select", this),
                                                e = [];
                                            r[k] = a(d).val(), r[k] ? r[k] = r[k].join(",") : r[k] = "", a("select option:selected", this).each(function(b, c) {
                                                e[b] = a(c).text()
                                            }), s[k] = e.join(",")
                                        } else r[k] = a("select option:selected", this).val(), s[k] = a("select option:selected", this).text();
                                        v.formatter && "select" === v.formatter && (s = {});
                                        break;
                                    case "custom":
                                        try {
                                            if (!v.editoptions || !a.isFunction(v.editoptions.custom_value)) throw "e1";
                                            if (r[k] = v.editoptions.custom_value.call(q, a(".customelement", this), "get"), void 0 === r[k]) throw "e2"
                                        } catch (f) {
                                            "e1" === f && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === f ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, f.message, a.jgrid.edit.bClose)
                                        }
                                }
                                if (n = a.jgrid.checkValues.call(q, r[k], b), n[0] === !1) return !1;
                                q.p.autoencode && (r[k] = a.jgrid.htmlEncode(r[k])), "clientArray" !== j.url && v.editoptions && v.editoptions.NullIfEmpty === !0 && "" === r[k] && (t[k] = "null")
                            }
                        }), n[0] === !1) {
                        try {
                            var w = a(q).jqGrid("getGridRowById", b),
                                x = a.jgrid.findPos(w);
                            a.jgrid.info_dialog(a.jgrid.errors.errcap, n[1], a.jgrid.edit.bClose, {
                                "left": x[0],
                                "top": x[1] + a(w).outerHeight()
                            })
                        } catch (y) {
                            alert(n[1])
                        }
                        return p
                    }
                    var z, A = q.p.prmNames,
                        B = b;
                    if (z = q.p.keyIndex === !1 ? A.id : q.p.colModel[q.p.keyIndex + (q.p.rownumbers === !0 ? 1 : 0) + (q.p.multiselect === !0 ? 1 : 0) + (q.p.subGrid === !0 ? 1 : 0)].name, r) {
                        if (r[A.oper] = A.editoper, void 0 === r[z] || "" === r[z]) r[z] = b;
                        else if (o.id !== q.p.idPrefix + r[z]) {
                            var C = a.jgrid.stripPref(q.p.idPrefix, b);
                            if (void 0 !== q.p._index[C] && (q.p._index[r[z]] = q.p._index[C], delete q.p._index[C]), b = q.p.idPrefix + r[z], a(o).attr("id", b), q.p.selrow === B && (q.p.selrow = b), a.isArray(q.p.selarrrow)) {
                                var D = a.inArray(B, q.p.selarrrow);
                                D >= 0 && (q.p.selarrrow[D] = b)
                            }
                            if (q.p.multiselect) {
                                var E = "jqg_" + q.p.id + "_" + b;
                                a("input.cbox", o).attr("id", E).attr("name", E)
                            }
                        }
                        void 0 === q.p.inlineData && (q.p.inlineData = {}), r = a.extend({}, r, q.p.inlineData, j.extraparam)
                    }
                    if ("clientArray" === j.url) {
                        r = a.extend({}, r, s), q.p.autoencode && a.each(r, function(b, c) {
                            r[b] = a.jgrid.htmlDecode(c)
                        });
                        var F, G = a(q).jqGrid("setRowData", b, r);
                        for (a(o).attr("editable", "0"), F = 0; F < q.p.savedRow.length; F++)
                            if (String(q.p.savedRow[F].id) === String(B)) {
                                m = F;
                                break
                            }
                        m >= 0 && q.p.savedRow.splice(m, 1), a(q).triggerHandler("jqGridInlineAfterSaveRow", [b, G, r, j]), a.isFunction(j.aftersavefunc) && j.aftersavefunc.call(q, b, G, j), p = !0, a(o).removeClass("jqgrid-new-row").unbind("keydown")
                    } else a("#lui_" + a.jgrid.jqID(q.p.id)).show(), t = a.extend({}, r, t), t[z] = a.jgrid.stripPref(q.p.idPrefix, t[z]), a.ajax(a.extend({
                        "url": j.url,
                        "data": a.isFunction(q.p.serializeRowData) ? q.p.serializeRowData.call(q, t) : t,
                        "type": j.mtype,
                        "async": !1,
                        "complete": function(c, d) {
                            if (a("#lui_" + a.jgrid.jqID(q.p.id)).hide(), "success" === d) {
                                var e, f, g = !0;
                                if (e = a(q).triggerHandler("jqGridInlineSuccessSaveRow", [c, b, j]), a.isArray(e) || (e = [!0, r]), e[0] && a.isFunction(j.successfunc) && (e = j.successfunc.call(q, c)), a.isArray(e) ? (g = e[0], r = e[1] || r) : g = e, g === !0) {
                                    for (q.p.autoencode && a.each(r, function(b, c) {
                                            r[b] = a.jgrid.htmlDecode(c)
                                        }), r = a.extend({}, r, s), a(q).jqGrid("setRowData", b, r), a(o).attr("editable", "0"), f = 0; f < q.p.savedRow.length; f++)
                                        if (String(q.p.savedRow[f].id) === String(b)) {
                                            m = f;
                                            break
                                        }
                                    m >= 0 && q.p.savedRow.splice(m, 1), a(q).triggerHandler("jqGridInlineAfterSaveRow", [b, c, r, j]), a.isFunction(j.aftersavefunc) && j.aftersavefunc.call(q, b, c), p = !0, a(o).removeClass("jqgrid-new-row").unbind("keydown")
                                } else a(q).triggerHandler("jqGridInlineErrorSaveRow", [b, c, d, null, j]), a.isFunction(j.errorfunc) && j.errorfunc.call(q, b, c, d, null), j.restoreAfterError === !0 && a(q).jqGrid("restoreRow", b, j.afterrestorefunc)
                            }
                        },
                        "error": function(c, d, e) {
                            if (a("#lui_" + a.jgrid.jqID(q.p.id)).hide(), a(q).triggerHandler("jqGridInlineErrorSaveRow", [b, c, d, e, j]), a.isFunction(j.errorfunc)) j.errorfunc.call(q, b, c, d, e);
                            else {
                                var f = c.responseText || c.statusText;
                                try {
                                    a.jgrid.info_dialog(a.jgrid.errors.errcap, '<div class="ui-state-error">' + f + "</div>", a.jgrid.edit.bClose, {
                                        "buttonalign": "right"
                                    })
                                } catch (g) {
                                    alert(f)
                                }
                            }
                            j.restoreAfterError === !0 && a(q).jqGrid("restoreRow", b, j.afterrestorefunc)
                        }
                    }, a.jgrid.ajaxOptions, q.p.ajaxRowOptions || {}))
                }
                return p
            }
        },
        "restoreRow": function(b, c) {
            var d = a.makeArray(arguments).slice(1),
                e = {};
            return "object" === a.type(d[0]) ? e = d[0] : a.isFunction(c) && (e.afterrestorefunc = c), e = a.extend(!0, {}, a.jgrid.inlineEdit, e), this.each(function() {
                var c, d, f = this,
                    g = -1,
                    h = {};
                if (f.grid && (c = a(f).jqGrid("getInd", b, !0), c !== !1)) {
                    var i = a.isFunction(e.beforeCancelRow) ? e.beforeCancelRow.call(f, e, sr) : void 0;
                    if (void 0 === i && (i = !0), i) {
                        for (d = 0; d < f.p.savedRow.length; d++)
                            if (String(f.p.savedRow[d].id) === String(b)) {
                                g = d;
                                break
                            }
                        if (g >= 0) {
                            if (a.isFunction(a.fn.datepicker)) try {
                                a("input.hasDatepicker", "#" + a.jgrid.jqID(c.id)).datepicker("hide")
                            } catch (j) {}
                            a.each(f.p.colModel, function() {
                                this.editable === !0 && f.p.savedRow[g].hasOwnProperty(this.name) && (h[this.name] = f.p.savedRow[g][this.name])
                            }), a(f).jqGrid("setRowData", b, h), a(c).attr("editable", "0").unbind("keydown"), f.p.savedRow.splice(g, 1), a("#" + a.jgrid.jqID(b), "#" + a.jgrid.jqID(f.p.id)).hasClass("jqgrid-new-row") && setTimeout(function() {
                                a(f).jqGrid("delRowData", b), a(f).jqGrid("showAddEditButtons")
                            }, 0)
                        }
                        a(f).triggerHandler("jqGridInlineAfterRestoreRow", [b]), a.isFunction(e.afterrestorefunc) && e.afterrestorefunc.call(f, b)
                    }
                }
            })
        },
        "addRow": function(b) {
            return b = a.extend(!0, {
                "rowID": null,
                "initdata": {},
                "position": "first",
                "useDefValues": !0,
                "useFormatter": !1,
                "addRowParams": {
                    "extraparam": {}
                }
            }, b || {}), this.each(function() {
                if (this.grid) {
                    var c = this,
                        d = a.isFunction(b.beforeAddRow) ? b.beforeAddRow.call(c, b.addRowParams) : void 0;
                    if (void 0 === d && (d = !0), d)
                        if (b.rowID = a.isFunction(b.rowID) ? b.rowID.call(c, b) : null != b.rowID ? b.rowID : a.jgrid.randId(), b.useDefValues === !0 && a(c.p.colModel).each(function() {
                                if (this.editoptions && this.editoptions.defaultValue) {
                                    var d = this.editoptions.defaultValue,
                                        e = a.isFunction(d) ? d.call(c) : d;
                                    b.initdata[this.name] = e
                                }
                            }), a(c).jqGrid("addRowData", b.rowID, b.initdata, b.position), b.rowID = c.p.idPrefix + b.rowID, a("#" + a.jgrid.jqID(b.rowID), "#" + a.jgrid.jqID(c.p.id)).addClass("jqgrid-new-row"), b.useFormatter) a("#" + a.jgrid.jqID(b.rowID) + " .ui-inline-edit", "#" + a.jgrid.jqID(c.p.id)).click();
                        else {
                            var e = c.p.prmNames,
                                f = e.oper;
                            b.addRowParams.extraparam[f] = e.addoper, a(c).jqGrid("editRow", b.rowID, b.addRowParams), a(c).jqGrid("setSelection", b.rowID)
                        }
                }
            })
        },
        "inlineNav": function(b, c) {
            return c = a.extend(!0, {
                "edit": !0,
                "editicon": "ui-icon-pencil",
                "add": !0,
                "addicon": "ui-icon-plus",
                "save": !0,
                "saveicon": "ui-icon-disk",
                "cancel": !0,
                "cancelicon": "ui-icon-cancel",
                "addParams": {
                    "addRowParams": {
                        "extraparam": {}
                    }
                },
                "editParams": {},
                "restoreAfterSelect": !0
            }, a.jgrid.nav, c || {}), this.each(function() {
                if (this.grid) {
                    var d, e = this,
                        f = a.jgrid.jqID(e.p.id);
                    if (e.p._inlinenav = !0, c.addParams.useFormatter === !0) {
                        var g, h = e.p.colModel;
                        for (g = 0; g < h.length; g++)
                            if (h[g].formatter && "actions" === h[g].formatter) {
                                if (h[g].formatoptions) {
                                    var i = {
                                            "keys": !1,
                                            "onEdit": null,
                                            "onSuccess": null,
                                            "afterSave": null,
                                            "onError": null,
                                            "afterRestore": null,
                                            "extraparam": {},
                                            "url": null
                                        },
                                        j = a.extend(i, h[g].formatoptions);
                                    c.addParams.addRowParams = {
                                        "keys": j.keys,
                                        "oneditfunc": j.onEdit,
                                        "successfunc": j.onSuccess,
                                        "url": j.url,
                                        "extraparam": j.extraparam,
                                        "aftersavefunc": j.afterSave,
                                        "errorfunc": j.onError,
                                        "afterrestorefunc": j.afterRestore
                                    }
                                }
                                break
                            }
                    }
                    c.add && a(e).jqGrid("navButtonAdd", b, {
                        "caption": c.addtext,
                        "title": c.addtitle,
                        "buttonicon": c.addicon,
                        "id": e.p.id + "_iladd",
                        "onClickButton": function() {
                            a(e).jqGrid("addRow", c.addParams), c.addParams.useFormatter || (a("#" + f + "_ilsave").removeClass("ui-state-disabled"), a("#" + f + "_ilcancel").removeClass("ui-state-disabled"), a("#" + f + "_iladd").addClass("ui-state-disabled"), a("#" + f + "_iledit").addClass("ui-state-disabled"))
                        }
                    }), c.edit && a(e).jqGrid("navButtonAdd", b, {
                        "caption": c.edittext,
                        "title": c.edittitle,
                        "buttonicon": c.editicon,
                        "id": e.p.id + "_iledit",
                        "onClickButton": function() {
                            var b = a(e).jqGrid("getGridParam", "selrow");
                            b ? (a(e).jqGrid("editRow", b, c.editParams), a("#" + f + "_ilsave").removeClass("ui-state-disabled"), a("#" + f + "_ilcancel").removeClass("ui-state-disabled"), a("#" + f + "_iladd").addClass("ui-state-disabled"), a("#" + f + "_iledit").addClass("ui-state-disabled")) : (a.jgrid.viewModal("#alertmod", {
                                "gbox": "#gbox_" + f,
                                "jqm": !0
                            }), a("#jqg_alrt").focus())
                        }
                    }), c.save && (a(e).jqGrid("navButtonAdd", b, {
                        "caption": c.savetext || "",
                        "title": c.savetitle || "Aprobar Usuario",
                        "buttonicon": c.saveicon,
                        "id": e.p.id + "_ilsave",
                        "onClickButton": function() {
                            var b = e.p.savedRow[0].id;
                            if (b) {
                                var d = e.p.prmNames,
                                    g = d.oper,
                                    h = c.editParams;
                                a("#" + a.jgrid.jqID(b), "#" + f).hasClass("jqgrid-new-row") ? (c.addParams.addRowParams.extraparam[g] = d.addoper, h = c.addParams.addRowParams) : (c.editParams.extraparam || (c.editParams.extraparam = {}), c.editParams.extraparam[g] = d.editoper), a(e).jqGrid("saveRow", b, h) && a(e).jqGrid("showAddEditButtons")
                            } else a.jgrid.viewModal("#alertmod", {
                                "gbox": "#gbox_" + f,
                                "jqm": !0
                            }), a("#jqg_alrt").focus()
                        }
                    }), a("#" + f + "_ilsave").addClass("ui-state-disabled")), c.cancel && (a(e).jqGrid("navButtonAdd", b, {
                        "caption": c.canceltext || "",
                        "title": c.canceltitle || "Cancelar",
                        "buttonicon": c.cancelicon,
                        "id": e.p.id + "_ilcancel",
                        "onClickButton": function() {
                            var b = e.p.savedRow[0].id,
                                d = c.editParams;
                            b ? (a("#" + a.jgrid.jqID(b), "#" + f).hasClass("jqgrid-new-row") && (d = c.addParams.addRowParams), a(e).jqGrid("restoreRow", b, d), a(e).jqGrid("showAddEditButtons")) : (a.jgrid.viewModal("#alertmod", {
                                "gbox": "#gbox_" + f,
                                "jqm": !0
                            }), a("#jqg_alrt").focus())
                        }
                    }), a("#" + f + "_ilcancel").addClass("ui-state-disabled")), c.restoreAfterSelect === !0 && (d = a.isFunction(e.p.beforeSelectRow) ? e.p.beforeSelectRow : !1, e.p.beforeSelectRow = function(b, f) {
                        var g = !0;
                        return e.p.savedRow.length > 0 && e.p._inlinenav === !0 && b !== e.p.selrow && null !== e.p.selrow && (e.p.selrow === c.addParams.rowID ? a(e).jqGrid("delRowData", e.p.selrow) : a(e).jqGrid("restoreRow", e.p.selrow, c.editParams), a(e).jqGrid("showAddEditButtons")), d && (g = d.call(e, b, f)), g
                    })
                }
            })
        },
        "showAddEditButtons": function() {
            return this.each(function() {
                if (this.grid) {
                    var b = a.jgrid.jqID(this.p.id);
                    a("#" + b + "_ilsave").addClass("ui-state-disabled"), a("#" + b + "_ilcancel").addClass("ui-state-disabled"), a("#" + b + "_iladd").removeClass("ui-state-disabled"), a("#" + b + "_iledit").removeClass("ui-state-disabled")
                }
            })
        }
    })
}(jQuery),
function(a) {
    "use strict";
    a.jgrid.extend({
        "editCell": function(b, c, d) {
            return this.each(function() {
                var e, f, g, h, i = this;
                if (i.grid && i.p.cellEdit === !0) {
                    if (c = parseInt(c, 10), i.p.selrow = i.rows[b].id, i.p.knv || a(i).jqGrid("GridNav"), i.p.savedRow.length > 0) {
                        if (d === !0 && b == i.p.iRow && c == i.p.iCol) return;
                        a(i).jqGrid("saveCell", i.p.savedRow[0].id, i.p.savedRow[0].ic)
                    } else window.setTimeout(function() {
                        a("#" + a.jgrid.jqID(i.p.knv)).attr("tabindex", "-1").focus()
                    }, 0);
                    if (h = i.p.colModel[c], e = h.name, "subgrid" !== e && "cb" !== e && "rn" !== e) {
                        if (g = a("td:eq(" + c + ")", i.rows[b]), h.editable !== !0 || d !== !0 || g.hasClass("not-editable-cell")) parseInt(i.p.iCol, 10) >= 0 && parseInt(i.p.iRow, 10) >= 0 && (a("td:eq(" + i.p.iCol + ")", i.rows[i.p.iRow]).removeClass("edit-cell ui-state-highlight"), a(i.rows[i.p.iRow]).removeClass("selected-row ui-state-hover")), g.addClass("edit-cell ui-state-highlight"), a(i.rows[b]).addClass("selected-row ui-state-hover"), f = g.html().replace(/\&#160\;/gi, ""), a(i).triggerHandler("jqGridSelectCell", [i.rows[b].id, e, f, b, c]), a.isFunction(i.p.onSelectCell) && i.p.onSelectCell.call(i, i.rows[b].id, e, f, b, c);
                        else {
                            parseInt(i.p.iCol, 10) >= 0 && parseInt(i.p.iRow, 10) >= 0 && (a("td:eq(" + i.p.iCol + ")", i.rows[i.p.iRow]).removeClass("edit-cell ui-state-highlight"), a(i.rows[i.p.iRow]).removeClass("selected-row ui-state-hover")), a(g).addClass("edit-cell ui-state-highlight"), a(i.rows[b]).addClass("selected-row ui-state-hover");
                            try {
                                f = a.unformat.call(i, g, {
                                    "rowId": i.rows[b].id,
                                    "colModel": h
                                }, c)
                            } catch (j) {
                                f = h.edittype && "textarea" === h.edittype ? a(g).text() : a(g).html()
                            }
                            if (i.p.autoencode && (f = a.jgrid.htmlDecode(f)), h.edittype || (h.edittype = "text"), i.p.savedRow.push({
                                    "id": b,
                                    "ic": c,
                                    "name": e,
                                    "v": f
                                }), ("&nbsp;" === f || "&#160;" === f || 1 === f.length && 160 === f.charCodeAt(0)) && (f = ""), a.isFunction(i.p.formatCell)) {
                                var k = i.p.formatCell.call(i, i.rows[b].id, e, f, b, c);
                                void 0 !== k && (f = k)
                            }
                            a(i).triggerHandler("jqGridBeforeEditCell", [i.rows[b].id, e, f, b, c]), a.isFunction(i.p.beforeEditCell) && i.p.beforeEditCell.call(i, i.rows[b].id, e, f, b, c);
                            var l = a.extend({}, h.editoptions || {}, {
                                    "id": b + "_" + e,
                                    "name": e
                                }),
                                m = a.jgrid.createEl.call(i, h.edittype, l, f, !0, a.extend({}, a.jgrid.ajaxOptions, i.p.ajaxSelectOptions || {}));
                            a(g).html("").append(m).attr("tabindex", "0"), a.jgrid.bindEv.call(i, m, l), window.setTimeout(function() {
                                a(m).focus()
                            }, 0), a("input, select, textarea", g).bind("keydown", function(d) {
                                if (27 === d.keyCode && (a("input.hasDatepicker", g).length > 0 ? a(".ui-datepicker").is(":hidden") ? a(i).jqGrid("restoreCell", b, c) : a("input.hasDatepicker", g).datepicker("hide") : a(i).jqGrid("restoreCell", b, c)), 13 === d.keyCode) return a(i).jqGrid("saveCell", b, c), !1;
                                if (9 === d.keyCode) {
                                    if (i.grid.hDiv.loading) return !1;
                                    d.shiftKey ? a(i).jqGrid("prevCell", b, c) : a(i).jqGrid("nextCell", b, c)
                                }
                                d.stopPropagation()
                            }), a(i).triggerHandler("jqGridAfterEditCell", [i.rows[b].id, e, f, b, c]), a.isFunction(i.p.afterEditCell) && i.p.afterEditCell.call(i, i.rows[b].id, e, f, b, c)
                        }
                        i.p.iCol = c, i.p.iRow = b
                    }
                }
            })
        },
        "saveCell": function(b, c) {
            return this.each(function() {
                var d, e = this;
                if (e.grid && e.p.cellEdit === !0) {
                    if (d = e.p.savedRow.length >= 1 ? 0 : null, null !== d) {
                        var f, g, h = a("td:eq(" + c + ")", e.rows[b]),
                            i = e.p.colModel[c],
                            j = i.name,
                            k = a.jgrid.jqID(j);
                        switch (i.edittype) {
                            case "select":
                                if (i.editoptions.multiple) {
                                    var l = a("#" + b + "_" + k, e.rows[b]),
                                        m = [];
                                    f = a(l).val(), f ? f.join(",") : f = "", a("option:selected", l).each(function(b, c) {
                                        m[b] = a(c).text()
                                    }), g = m.join(",")
                                } else f = a("#" + b + "_" + k + " option:selected", e.rows[b]).val(), g = a("#" + b + "_" + k + " option:selected", e.rows[b]).text();
                                i.formatter && (g = f);
                                break;
                            case "checkbox":
                                var n = ["Yes", "No"];
                                i.editoptions && (n = i.editoptions.value.split(":")), f = a("#" + b + "_" + k, e.rows[b]).is(":checked") ? n[0] : n[1], g = f;
                                break;
                            case "password":
                            case "text":
                            case "textarea":
                            case "button":
                                f = a("#" + b + "_" + k, e.rows[b]).val(), g = f;
                                break;
                            case "custom":
                                try {
                                    if (!i.editoptions || !a.isFunction(i.editoptions.custom_value)) throw "e1";
                                    if (f = i.editoptions.custom_value.call(e, a(".customelement", h), "get"), void 0 === f) throw "e2";
                                    g = f
                                } catch (o) {
                                    "e1" === o && a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.nodefined, a.jgrid.edit.bClose), "e2" === o ? a.jgrid.info_dialog(a.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.novalue, a.jgrid.edit.bClose) : a.jgrid.info_dialog(a.jgrid.errors.errcap, o.message, a.jgrid.edit.bClose);
                                }
                        }
                        if (g !== e.p.savedRow[d].v) {
                            var p = a(e).triggerHandler("jqGridBeforeSaveCell", [e.rows[b].id, j, f, b, c]);
                            if (p && (f = p, g = p), a.isFunction(e.p.beforeSaveCell)) {
                                var q = e.p.beforeSaveCell.call(e, e.rows[b].id, j, f, b, c);
                                q && (f = q, g = q)
                            }
                            var r = a.jgrid.checkValues.call(e, f, c);
                            if (r[0] === !0) {
                                var s = a(e).triggerHandler("jqGridBeforeSubmitCell", [e.rows[b].id, j, f, b, c]) || {};
                                if (a.isFunction(e.p.beforeSubmitCell) && (s = e.p.beforeSubmitCell.call(e, e.rows[b].id, j, f, b, c), s || (s = {})), a("input.hasDatepicker", h).length > 0 && a("input.hasDatepicker", h).datepicker("hide"), "remote" === e.p.cellsubmit)
                                    if (e.p.cellurl) {
                                        var t = {};
                                        e.p.autoencode && (f = a.jgrid.htmlEncode(f)), t[j] = f;
                                        var u, v, w;
                                        w = e.p.prmNames, u = w.id, v = w.oper, t[u] = a.jgrid.stripPref(e.p.idPrefix, e.rows[b].id), t[v] = w.editoper, t = a.extend(s, t), a("#lui_" + a.jgrid.jqID(e.p.id)).show(), e.grid.hDiv.loading = !0, a.ajax(a.extend({
                                            "url": e.p.cellurl,
                                            "data": a.isFunction(e.p.serializeCellData) ? e.p.serializeCellData.call(e, t) : t,
                                            "type": "POST",
                                            "complete": function(d, i) {
                                                if (a("#lui_" + e.p.id).hide(), e.grid.hDiv.loading = !1, "success" === i) {
                                                    var k = a(e).triggerHandler("jqGridAfterSubmitCell", [e, d, t.id, j, f, b, c]) || [!0, ""];
                                                    k[0] === !0 && a.isFunction(e.p.afterSubmitCell) && (k = e.p.afterSubmitCell.call(e, d, t.id, j, f, b, c)), k[0] === !0 ? (a(h).empty(), a(e).jqGrid("setCell", e.rows[b].id, c, g, !1, !1, !0), a(h).addClass("dirty-cell"), a(e.rows[b]).addClass("edited"), a(e).triggerHandler("jqGridAfterSaveCell", [e.rows[b].id, j, f, b, c]), a.isFunction(e.p.afterSaveCell) && e.p.afterSaveCell.call(e, e.rows[b].id, j, f, b, c), e.p.savedRow.splice(0, 1)) : (a.jgrid.info_dialog(a.jgrid.errors.errcap, k[1], a.jgrid.edit.bClose), a(e).jqGrid("restoreCell", b, c))
                                                }
                                            },
                                            "error": function(d, f, g) {
                                                a("#lui_" + a.jgrid.jqID(e.p.id)).hide(), e.grid.hDiv.loading = !1, a(e).triggerHandler("jqGridErrorCell", [d, f, g]), a.isFunction(e.p.errorCell) ? (e.p.errorCell.call(e, d, f, g), a(e).jqGrid("restoreCell", b, c)) : (a.jgrid.info_dialog(a.jgrid.errors.errcap, d.status + " : " + d.statusText + "<br/>" + f, a.jgrid.edit.bClose), a(e).jqGrid("restoreCell", b, c))
                                            }
                                        }, a.jgrid.ajaxOptions, e.p.ajaxCellOptions || {}))
                                    } else try {
                                        a.jgrid.info_dialog(a.jgrid.errors.errcap, a.jgrid.errors.nourl, a.jgrid.edit.bClose), a(e).jqGrid("restoreCell", b, c)
                                    } catch (o) {}
                                    "clientArray" === e.p.cellsubmit && (a(h).empty(), a(e).jqGrid("setCell", e.rows[b].id, c, g, !1, !1, !0), a(h).addClass("dirty-cell"), a(e.rows[b]).addClass("edited"), a(e).triggerHandler("jqGridAfterSaveCell", [e.rows[b].id, j, f, b, c]), a.isFunction(e.p.afterSaveCell) && e.p.afterSaveCell.call(e, e.rows[b].id, j, f, b, c), e.p.savedRow.splice(0, 1))
                            } else try {
                                window.setTimeout(function() {
                                    a.jgrid.info_dialog(a.jgrid.errors.errcap, f + " " + r[1], a.jgrid.edit.bClose)
                                }, 100), a(e).jqGrid("restoreCell", b, c)
                            } catch (o) {}
                        } else a(e).jqGrid("restoreCell", b, c)
                    }
                    window.setTimeout(function() {
                        a("#" + a.jgrid.jqID(e.p.knv)).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        },
        "restoreCell": function(b, c) {
            return this.each(function() {
                var d, e = this;
                if (e.grid && e.p.cellEdit === !0) {
                    if (d = e.p.savedRow.length >= 1 ? 0 : null, null !== d) {
                        var f = a("td:eq(" + c + ")", e.rows[b]);
                        if (a.isFunction(a.fn.datepicker)) try {
                            a("input.hasDatepicker", f).datepicker("hide")
                        } catch (g) {}
                        a(f).empty().attr("tabindex", "-1"), a(e).jqGrid("setCell", e.rows[b].id, c, e.p.savedRow[d].v, !1, !1, !0), a(e).triggerHandler("jqGridAfterRestoreCell", [e.rows[b].id, e.p.savedRow[d].v, b, c]), a.isFunction(e.p.afterRestoreCell) && e.p.afterRestoreCell.call(e, e.rows[b].id, e.p.savedRow[d].v, b, c), e.p.savedRow.splice(0, 1)
                    }
                    window.setTimeout(function() {
                        a("#" + e.p.knv).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        },
        "nextCell": function(b, c) {
            return this.each(function() {
                var d, e = this,
                    f = !1;
                if (e.grid && e.p.cellEdit === !0) {
                    for (d = c + 1; d < e.p.colModel.length; d++)
                        if (e.p.colModel[d].editable === !0) {
                            f = d;
                            break
                        }
                    f !== !1 ? a(e).jqGrid("editCell", b, f, !0) : e.p.savedRow.length > 0 && a(e).jqGrid("saveCell", b, c)
                }
            })
        },
        "prevCell": function(b, c) {
            return this.each(function() {
                var d, e = this,
                    f = !1;
                if (e.grid && e.p.cellEdit === !0) {
                    for (d = c - 1; d >= 0; d--)
                        if (e.p.colModel[d].editable === !0) {
                            f = d;
                            break
                        }
                    f !== !1 ? a(e).jqGrid("editCell", b, f, !0) : e.p.savedRow.length > 0 && a(e).jqGrid("saveCell", b, c)
                }
            })
        },
        "GridNav": function() {
            return this.each(function() {
                function b(b, c, e) {
                    if ("v" === e.substr(0, 1)) {
                        var f = a(d.grid.bDiv)[0].clientHeight,
                            g = a(d.grid.bDiv)[0].scrollTop,
                            h = d.rows[b].offsetTop + d.rows[b].clientHeight,
                            i = d.rows[b].offsetTop;
                        "vd" === e && h >= f && (a(d.grid.bDiv)[0].scrollTop = a(d.grid.bDiv)[0].scrollTop + d.rows[b].clientHeight), "vu" === e && g > i && (a(d.grid.bDiv)[0].scrollTop = a(d.grid.bDiv)[0].scrollTop - d.rows[b].clientHeight)
                    }
                    if ("h" === e) {
                        var j = a(d.grid.bDiv)[0].clientWidth,
                            k = a(d.grid.bDiv)[0].scrollLeft,
                            l = d.rows[b].cells[c].offsetLeft + d.rows[b].cells[c].clientWidth,
                            m = d.rows[b].cells[c].offsetLeft;
                        l >= j + parseInt(k, 10) ? a(d.grid.bDiv)[0].scrollLeft = a(d.grid.bDiv)[0].scrollLeft + d.rows[b].cells[c].clientWidth : k > m && (a(d.grid.bDiv)[0].scrollLeft = a(d.grid.bDiv)[0].scrollLeft - d.rows[b].cells[c].clientWidth)
                    }
                }

                function c(a, b) {
                    var c, e;
                    if ("lft" === b)
                        for (c = a + 1, e = a; e >= 0; e--)
                            if (d.p.colModel[e].hidden !== !0) {
                                c = e;
                                break
                            }
                    if ("rgt" === b)
                        for (c = a - 1, e = a; e < d.p.colModel.length; e++)
                            if (d.p.colModel[e].hidden !== !0) {
                                c = e;
                                break
                            }
                    return c
                }
                var d = this;
                if (d.grid && d.p.cellEdit === !0) {
                    d.p.knv = d.p.id + "_kn";
                    var e, f, g = a("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='" + d.p.knv + "'></div></div>");
                    a(g).insertBefore(d.grid.cDiv), a("#" + d.p.knv).focus().keydown(function(g) {
                        switch (f = g.keyCode, "rtl" === d.p.direction && (37 === f ? f = 39 : 39 === f && (f = 37)), f) {
                            case 38:
                                d.p.iRow - 1 > 0 && (b(d.p.iRow - 1, d.p.iCol, "vu"), a(d).jqGrid("editCell", d.p.iRow - 1, d.p.iCol, !1));
                                break;
                            case 40:
                                d.p.iRow + 1 <= d.rows.length - 1 && (b(d.p.iRow + 1, d.p.iCol, "vd"), a(d).jqGrid("editCell", d.p.iRow + 1, d.p.iCol, !1));
                                break;
                            case 37:
                                d.p.iCol - 1 >= 0 && (e = c(d.p.iCol - 1, "lft"), b(d.p.iRow, e, "h"), a(d).jqGrid("editCell", d.p.iRow, e, !1));
                                break;
                            case 39:
                                d.p.iCol + 1 <= d.p.colModel.length - 1 && (e = c(d.p.iCol + 1, "rgt"), b(d.p.iRow, e, "h"), a(d).jqGrid("editCell", d.p.iRow, e, !1));
                                break;
                            case 13:
                                parseInt(d.p.iCol, 10) >= 0 && parseInt(d.p.iRow, 10) >= 0 && a(d).jqGrid("editCell", d.p.iRow, d.p.iCol, !0);
                                break;
                            default:
                                return !0
                        }
                        return !1
                    })
                }
            })
        },
        "getChangedCells": function(b) {
            var c = [];
            return b || (b = "all"), this.each(function() {
                var d, e = this;
                e.grid && e.p.cellEdit === !0 && a(e.rows).each(function(f) {
                    var g = {};
                    a(this).hasClass("edited") && (a("td", this).each(function(c) {
                        if (d = e.p.colModel[c].name, "cb" !== d && "subgrid" !== d)
                            if ("dirty" === b) {
                                if (a(this).hasClass("dirty-cell")) try {
                                    g[d] = a.unformat.call(e, this, {
                                        "rowId": e.rows[f].id,
                                        "colModel": e.p.colModel[c]
                                    }, c)
                                } catch (h) {
                                    g[d] = a.jgrid.htmlDecode(a(this).html())
                                }
                            } else try {
                                g[d] = a.unformat.call(e, this, {
                                    "rowId": e.rows[f].id,
                                    "colModel": e.p.colModel[c]
                                }, c)
                            } catch (h) {
                                g[d] = a.jgrid.htmlDecode(a(this).html())
                            }
                    }), g.id = this.id, c.push(g))
                })
            }), c
        }
    })
}(jQuery),
function(a) {
    "use strict";
    a.jgrid.extend({
        "setSubGrid": function() {
            return this.each(function() {
                var b, c, d = this,
                    e = {
                        "plusicon": "ui-icon-plus",
                        "minusicon": "ui-icon-minus",
                        "openicon": "ui-icon-carat-1-sw",
                        "expandOnLoad": !1,
                        "delayOnLoad": 50,
                        "selectOnExpand": !1,
                        "selectOnCollapse": !1,
                        "reloadOnExpand": !0
                    };
                if (d.p.subGridOptions = a.extend(e, d.p.subGridOptions || {}), d.p.colNames.unshift(""), d.p.colModel.unshift({
                        "name": "subgrid",
                        "width": a.jgrid.cell_width ? d.p.subGridWidth + d.p.cellLayout : d.p.subGridWidth,
                        "sortable": !1,
                        "resizable": !1,
                        "hidedlg": !0,
                        "search": !1,
                        "fixed": !0
                    }), b = d.p.subGridModel, b[0])
                    for (b[0].align = a.extend([], b[0].align || []), c = 0; c < b[0].name.length; c++) b[0].align[c] = b[0].align[c] || "left"
            })
        },
        "addSubGridCell": function(a, b) {
            var c, d, e = "";
            return this.each(function() {
                e = this.formatCol(a, b), d = this.p.id, c = this.p.subGridOptions.plusicon
            }), '<td role="gridcell" aria-describedby="' + d + '_subgrid" class="ui-sgcollapsed sgcollapsed" ' + e + "><a style='cursor:pointer;'><span class='ui-icon " + c + "'></span></a></td>"
        },
        "addSubGrid": function(b, c) {
            return this.each(function() {
                var d = this;
                if (d.grid) {
                    var e, f, g, h, i, j = function(b, c, e) {
                            var f = a("<td align='" + d.p.subGridModel[0].align[e] + "'></td>").html(c);
                            a(b).append(f)
                        },
                        k = function(b, c) {
                            var e, f, g, h = a("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"),
                                i = a("<tr></tr>");
                            for (f = 0; f < d.p.subGridModel[0].name.length; f++) e = a("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-" + d.p.direction + "'></th>"), a(e).html(d.p.subGridModel[0].name[f]), a(e).width(d.p.subGridModel[0].width[f]), a(i).append(e);
                            a(h).append(i), b && (g = d.p.xmlReader.subgrid, a(g.root + " " + g.row, b).each(function() {
                                if (i = a("<tr class='ui-widget-content ui-subtblcell'></tr>"), g.repeatitems === !0) a(g.cell, this).each(function(b) {
                                    j(i, a(this).text() || "&#160;", b)
                                });
                                else {
                                    var b = d.p.subGridModel[0].mapping || d.p.subGridModel[0].name;
                                    if (b)
                                        for (f = 0; f < b.length; f++) j(i, a(b[f], this).text() || "&#160;", f)
                                }
                                a(h).append(i)
                            }));
                            var k = a("table:first", d.grid.bDiv).attr("id") + "_";
                            return a("#" + a.jgrid.jqID(k + c)).append(h), d.grid.hDiv.loading = !1, a("#load_" + a.jgrid.jqID(d.p.id)).hide(), !1
                        },
                        l = function(b, c) {
                            var e, f, g, h, i, k, l = a("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"),
                                m = a("<tr></tr>");
                            for (g = 0; g < d.p.subGridModel[0].name.length; g++) e = a("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-" + d.p.direction + "'></th>"), a(e).html(d.p.subGridModel[0].name[g]), a(e).width(d.p.subGridModel[0].width[g]), a(m).append(e);
                            if (a(l).append(m), b && (i = d.p.jsonReader.subgrid, f = a.jgrid.getAccessor(b, i.root), void 0 !== f))
                                for (g = 0; g < f.length; g++) {
                                    if (h = f[g], m = a("<tr class='ui-widget-content ui-subtblcell'></tr>"), i.repeatitems === !0)
                                        for (i.cell && (h = h[i.cell]), k = 0; k < h.length; k++) j(m, h[k] || "&#160;", k);
                                    else {
                                        var n = d.p.subGridModel[0].mapping || d.p.subGridModel[0].name;
                                        if (n.length)
                                            for (k = 0; k < n.length; k++) j(m, h[n[k]] || "&#160;", k)
                                    }
                                    a(l).append(m)
                                }
                            var o = a("table:first", d.grid.bDiv).attr("id") + "_";
                            return a("#" + a.jgrid.jqID(o + c)).append(l), d.grid.hDiv.loading = !1, a("#load_" + a.jgrid.jqID(d.p.id)).hide(), !1
                        },
                        m = function(b) {
                            var c, e, f, g;
                            if (c = a(b).attr("id"), e = {
                                    "nd_": (new Date).getTime()
                                }, e[d.p.prmNames.subgridid] = c, !d.p.subGridModel[0]) return !1;
                            if (d.p.subGridModel[0].params)
                                for (g = 0; g < d.p.subGridModel[0].params.length; g++)
                                    for (f = 0; f < d.p.colModel.length; f++) d.p.colModel[f].name === d.p.subGridModel[0].params[g] && (e[d.p.colModel[f].name] = a("td:eq(" + f + ")", b).text().replace(/\&#160\;/gi, ""));
                            if (!d.grid.hDiv.loading) switch (d.grid.hDiv.loading = !0, a("#load_" + a.jgrid.jqID(d.p.id)).show(), d.p.subgridtype || (d.p.subgridtype = d.p.datatype), a.isFunction(d.p.subgridtype) ? d.p.subgridtype.call(d, e) : d.p.subgridtype = d.p.subgridtype.toLowerCase(), d.p.subgridtype) {
                                case "xml":
                                case "json":
                                    a.ajax(a.extend({
                                        "type": d.p.mtype,
                                        "url": d.p.subGridUrl,
                                        "dataType": d.p.subgridtype,
                                        "data": a.isFunction(d.p.serializeSubGridData) ? d.p.serializeSubGridData.call(d, e) : e,
                                        "complete": function(b) {
                                            "xml" === d.p.subgridtype ? k(b.responseXML, c) : l(a.jgrid.parse(b.responseText), c), b = null
                                        }
                                    }, a.jgrid.ajaxOptions, d.p.ajaxSubgridOptions || {}))
                            }
                            return !1
                        },
                        n = 0;
                    a.each(d.p.colModel, function() {
                        (this.hidden === !0 || "rn" === this.name || "cb" === this.name) && n++
                    });
                    var o = d.rows.length,
                        p = 1;
                    for (void 0 !== c && c > 0 && (p = c, o = c + 1); o > p;) a(d.rows[p]).hasClass("jqgrow") && a(d.rows[p].cells[b]).bind("click", function() {
                        var c = a(this).parent("tr")[0];
                        if (i = c.nextSibling, a(this).hasClass("sgcollapsed")) {
                            if (f = d.p.id, e = c.id, d.p.subGridOptions.reloadOnExpand === !0 || d.p.subGridOptions.reloadOnExpand === !1 && !a(i).hasClass("ui-subgrid")) {
                                if (g = b >= 1 ? "<td colspan='" + b + "'>&#160;</td>" : "", h = a(d).triggerHandler("jqGridSubGridBeforeExpand", [f + "_" + e, e]), h = h === !1 || "stop" === h ? !1 : !0, h && a.isFunction(d.p.subGridBeforeExpand) && (h = d.p.subGridBeforeExpand.call(d, f + "_" + e, e)), h === !1) return !1;
                                a(c).after("<tr role='row' class='ui-subgrid'>" + g + "<td class='ui-widget-content subgrid-cell'><span class='ui-icon " + d.p.subGridOptions.openicon + "'></span></td><td colspan='" + parseInt(d.p.colNames.length - 1 - n, 10) + "' class='ui-widget-content subgrid-data'><div id=" + f + "_" + e + " class='tablediv'></div></td></tr>"), a(d).triggerHandler("jqGridSubGridRowExpanded", [f + "_" + e, e]), a.isFunction(d.p.subGridRowExpanded) ? d.p.subGridRowExpanded.call(d, f + "_" + e, e) : m(c)
                            } else a(i).show();
                            a(this).html("<a style='cursor:pointer;'><span class='ui-icon " + d.p.subGridOptions.minusicon + "'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded"), d.p.subGridOptions.selectOnExpand && a(d).jqGrid("setSelection", e)
                        } else if (a(this).hasClass("sgexpanded")) {
                            if (h = a(d).triggerHandler("jqGridSubGridRowColapsed", [f + "_" + e, e]), h = h === !1 || "stop" === h ? !1 : !0, e = c.id, h && a.isFunction(d.p.subGridRowColapsed) && (h = d.p.subGridRowColapsed.call(d, f + "_" + e, e)), h === !1) return !1;
                            d.p.subGridOptions.reloadOnExpand === !0 ? a(i).remove(".ui-subgrid") : a(i).hasClass("ui-subgrid") && a(i).hide(), a(this).html("<a style='cursor:pointer;'><span class='ui-icon " + d.p.subGridOptions.plusicon + "'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed"), d.p.subGridOptions.selectOnCollapse && a(d).jqGrid("setSelection", e)
                        }
                        return !1
                    }), p++;
                    d.p.subGridOptions.expandOnLoad === !0 && a(d.rows).filter(".jqgrow").each(function(b, c) {
                        a(c.cells[0]).click()
                    }), d.subGridXml = function(a, b) {
                        k(a, b)
                    }, d.subGridJson = function(a, b) {
                        l(a, b)
                    }
                }
            })
        },
        "expandSubGridRow": function(b) {
            return this.each(function() {
                var c = this;
                if ((c.grid || b) && c.p.subGrid === !0) {
                    var d = a(this).jqGrid("getInd", b, !0);
                    if (d) {
                        var e = a("td.sgcollapsed", d)[0];
                        e && a(e).trigger("click")
                    }
                }
            })
        },
        "collapseSubGridRow": function(b) {
            return this.each(function() {
                var c = this;
                if ((c.grid || b) && c.p.subGrid === !0) {
                    var d = a(this).jqGrid("getInd", b, !0);
                    if (d) {
                        var e = a("td.sgexpanded", d)[0];
                        e && a(e).trigger("click")
                    }
                }
            })
        },
        "toggleSubGridRow": function(b) {
            return this.each(function() {
                var c = this;
                if ((c.grid || b) && c.p.subGrid === !0) {
                    var d = a(this).jqGrid("getInd", b, !0);
                    if (d) {
                        var e = a("td.sgcollapsed", d)[0];
                        e ? a(e).trigger("click") : (e = a("td.sgexpanded", d)[0], e && a(e).trigger("click"))
                    }
                }
            })
        }
    })
}(jQuery),
function(a) {
    "use strict";
    a.jgrid.extend({
        "setTreeNode": function(b, c) {
            return this.each(function() {
                var d = this;
                if (d.grid && d.p.treeGrid)
                    for (var e, f, g, h, i, j, k, l, m = d.p.expColInd, n = d.p.treeReader.expanded_field, o = d.p.treeReader.leaf_field, p = d.p.treeReader.level_field, q = d.p.treeReader.icon_field, r = d.p.treeReader.loaded; c > b;) {
                        var s, t = a.jgrid.stripPref(d.p.idPrefix, d.rows[b].id),
                            u = d.p._index[t];
                        if (k = d.p.data[u], "nested" === d.p.treeGridModel && (k[o] || (e = parseInt(k[d.p.treeReader.left_field], 10), f = parseInt(k[d.p.treeReader.right_field], 10), k[o] = f === e + 1 ? "true" : "false", d.rows[b].cells[d.p._treeleafpos].innerHTML = k[o])), g = parseInt(k[p], 10), 0 === d.p.tree_root_level ? (h = g + 1, i = g) : (h = g, i = g - 1), j = "<div class='tree-wrap tree-wrap-" + d.p.direction + "' style='width:" + 18 * h + "px;'>", j += "<div style='" + ("rtl" === d.p.direction ? "right:" : "left:") + 18 * i + "px;' class='ui-icon ", void 0 !== k[r] && ("true" === k[r] || k[r] === !0 ? k[r] = !0 : k[r] = !1), "true" === k[o] || k[o] === !0 ? (j += (void 0 !== k[q] && "" !== k[q] ? k[q] : d.p.treeIcons.leaf) + " tree-leaf treeclick", k[o] = !0, l = "leaf") : (k[o] = !1, l = ""), k[n] = ("true" === k[n] || k[n] === !0 ? !0 : !1) && (k[r] || void 0 === k[r]), j += k[n] === !1 ? k[o] === !0 ? "'" : d.p.treeIcons.plus + " tree-plus treeclick'" : k[o] === !0 ? "'" : d.p.treeIcons.minus + " tree-minus treeclick'", j += "></div></div>", a(d.rows[b].cells[m]).wrapInner("<span class='cell-wrapper" + l + "'></span>").prepend(j), g !== parseInt(d.p.tree_root_level, 10)) {
                            var v = a(d).jqGrid("getNodeParent", k);
                            s = v && v.hasOwnProperty(n) ? v[n] : !0, s || a(d.rows[b]).css("display", "none")
                        }
                        a(d.rows[b].cells[m]).find("div.treeclick").bind("click", function(b) {
                            var c = b.target || b.srcElement,
                                e = a.jgrid.stripPref(d.p.idPrefix, a(c, d.rows).closest("tr.jqgrow")[0].id),
                                f = d.p._index[e];
                            return d.p.data[f][o] || (d.p.data[f][n] ? (a(d).jqGrid("collapseRow", d.p.data[f]), a(d).jqGrid("collapseNode", d.p.data[f])) : (a(d).jqGrid("expandRow", d.p.data[f]), a(d).jqGrid("expandNode", d.p.data[f]))), !1
                        }), d.p.ExpandColClick === !0 && a(d.rows[b].cells[m]).find("span.cell-wrapper").css("cursor", "pointer").bind("click", function(b) {
                            var c = b.target || b.srcElement,
                                e = a.jgrid.stripPref(d.p.idPrefix, a(c, d.rows).closest("tr.jqgrow")[0].id),
                                f = d.p._index[e];
                            return d.p.data[f][o] || (d.p.data[f][n] ? (a(d).jqGrid("collapseRow", d.p.data[f]), a(d).jqGrid("collapseNode", d.p.data[f])) : (a(d).jqGrid("expandRow", d.p.data[f]), a(d).jqGrid("expandNode", d.p.data[f]))), a(d).jqGrid("setSelection", e), !1
                        }), b++
                    }
            })
        },
        "setTreeGrid": function() {
            return this.each(function() {
                var b, c, d, e, f = this,
                    g = 0,
                    h = !1,
                    i = [];
                if (f.p.treeGrid) {
                    f.p.treedatatype || a.extend(f.p, {
                        "treedatatype": f.p.datatype
                    }), f.p.subGrid = !1, f.p.altRows = !1, f.p.pgbuttons = !1, f.p.pginput = !1, f.p.gridview = !0, null === f.p.rowTotal && (f.p.rowNum = 1e4), f.p.multiselect = !1, f.p.rowList = [], f.p.expColInd = 0, b = "ui-icon-triangle-1-" + ("rtl" === f.p.direction ? "w" : "e"), f.p.treeIcons = a.extend({
                        "plus": b,
                        "minus": "ui-icon-triangle-1-s",
                        "leaf": "ui-icon-radio-off"
                    }, f.p.treeIcons || {}), "nested" === f.p.treeGridModel ? f.p.treeReader = a.extend({
                        "level_field": "level",
                        "left_field": "lft",
                        "right_field": "rgt",
                        "leaf_field": "isLeaf",
                        "expanded_field": "expanded",
                        "loaded": "loaded",
                        "icon_field": "icon"
                    }, f.p.treeReader) : "adjacency" === f.p.treeGridModel && (f.p.treeReader = a.extend({
                        "level_field": "level",
                        "parent_id_field": "parent",
                        "leaf_field": "isLeaf",
                        "expanded_field": "expanded",
                        "loaded": "loaded",
                        "icon_field": "icon"
                    }, f.p.treeReader));
                    for (d in f.p.colModel)
                        if (f.p.colModel.hasOwnProperty(d)) {
                            c = f.p.colModel[d].name, c !== f.p.ExpandColumn || h || (h = !0, f.p.expColInd = g), g++;
                            for (e in f.p.treeReader) f.p.treeReader.hasOwnProperty(e) && f.p.treeReader[e] === c && i.push(c)
                        }
                    a.each(f.p.treeReader, function(b, c) {
                        c && -1 === a.inArray(c, i) && ("leaf_field" === b && (f.p._treeleafpos = g), g++, f.p.colNames.push(c), f.p.colModel.push({
                            "name": c,
                            "width": 1,
                            "hidden": !0,
                            "sortable": !1,
                            "resizable": !1,
                            "hidedlg": !0,
                            "editable": !0,
                            "search": !1
                        }))
                    })
                }
            })
        },
        "expandRow": function(b) {
            this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var d = a(c).jqGrid("getNodeChildren", b),
                        e = c.p.treeReader.expanded_field;
                    a(d).each(function() {
                        var b = c.p.idPrefix + a.jgrid.getAccessor(this, c.p.localReader.id);
                        a(a(c).jqGrid("getGridRowById", b)).css("display", ""), this[e] && a(c).jqGrid("expandRow", this)
                    })
                }
            })
        },
        "collapseRow": function(b) {
            this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var d = a(c).jqGrid("getNodeChildren", b),
                        e = c.p.treeReader.expanded_field;
                    a(d).each(function() {
                        var b = c.p.idPrefix + a.jgrid.getAccessor(this, c.p.localReader.id);
                        a(a(c).jqGrid("getGridRowById", b)).css("display", "none"), this[e] && a(c).jqGrid("collapseRow", this)
                    })
                }
            })
        },
        "getRootNodes": function() {
            var b = [];
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) switch (c.p.treeGridModel) {
                    case "nested":
                        var d = c.p.treeReader.level_field;
                        a(c.p.data).each(function() {
                            parseInt(this[d], 10) === parseInt(c.p.tree_root_level, 10) && b.push(this)
                        });
                        break;
                    case "adjacency":
                        var e = c.p.treeReader.parent_id_field;
                        a(c.p.data).each(function() {
                            (null === this[e] || "null" === String(this[e]).toLowerCase()) && b.push(this)
                        })
                }
            }), b
        },
        "getNodeDepth": function(b) {
            var c = null;
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var d = this;
                    switch (d.p.treeGridModel) {
                        case "nested":
                            var e = d.p.treeReader.level_field;
                            c = parseInt(b[e], 10) - parseInt(d.p.tree_root_level, 10);
                            break;
                        case "adjacency":
                            c = a(d).jqGrid("getNodeAncestors", b).length
                    }
                }
            }), c
        },
        "getNodeParent": function(b) {
            var c = null;
            return this.each(function() {
                var d = this;
                if (d.grid && d.p.treeGrid) switch (d.p.treeGridModel) {
                    case "nested":
                        var e = d.p.treeReader.left_field,
                            f = d.p.treeReader.right_field,
                            g = d.p.treeReader.level_field,
                            h = parseInt(b[e], 10),
                            i = parseInt(b[f], 10),
                            j = parseInt(b[g], 10);
                        a(this.p.data).each(function() {
                            return parseInt(this[g], 10) === j - 1 && parseInt(this[e], 10) < h && parseInt(this[f], 10) > i ? (c = this, !1) : void 0
                        });
                        break;
                    case "adjacency":
                        var k = d.p.treeReader.parent_id_field,
                            l = d.p.localReader.id;
                        a(this.p.data).each(function() {
                            return this[l] === a.jgrid.stripPref(d.p.idPrefix, b[k]) ? (c = this, !1) : void 0
                        })
                }
            }), c
        },
        "getNodeChildren": function(b) {
            var c = [];
            return this.each(function() {
                var d = this;
                if (d.grid && d.p.treeGrid) switch (d.p.treeGridModel) {
                    case "nested":
                        var e = d.p.treeReader.left_field,
                            f = d.p.treeReader.right_field,
                            g = d.p.treeReader.level_field,
                            h = parseInt(b[e], 10),
                            i = parseInt(b[f], 10),
                            j = parseInt(b[g], 10);
                        a(this.p.data).each(function() {
                            parseInt(this[g], 10) === j + 1 && parseInt(this[e], 10) > h && parseInt(this[f], 10) < i && c.push(this)
                        });
                        break;
                    case "adjacency":
                        var k = d.p.treeReader.parent_id_field,
                            l = d.p.localReader.id;
                        a(this.p.data).each(function() {
                            this[k] == a.jgrid.stripPref(d.p.idPrefix, b[l]) && c.push(this)
                        })
                }
            }), c
        },
        "getFullTreeNode": function(b) {
            var c = [];
            return this.each(function() {
                var d, e = this;
                if (e.grid && e.p.treeGrid) switch (e.p.treeGridModel) {
                    case "nested":
                        var f = e.p.treeReader.left_field,
                            g = e.p.treeReader.right_field,
                            h = e.p.treeReader.level_field,
                            i = parseInt(b[f], 10),
                            j = parseInt(b[g], 10),
                            k = parseInt(b[h], 10);
                        a(this.p.data).each(function() {
                            parseInt(this[h], 10) >= k && parseInt(this[f], 10) >= i && parseInt(this[f], 10) <= j && c.push(this)
                        });
                        break;
                    case "adjacency":
                        if (b) {
                            c.push(b);
                            var l = e.p.treeReader.parent_id_field,
                                m = e.p.localReader.id;
                            a(this.p.data).each(function(b) {
                                for (d = c.length, b = 0; d > b; b++)
                                    if (a.jgrid.stripPref(e.p.idPrefix, c[b][m]) === this[l]) {
                                        c.push(this);
                                        break
                                    }
                            })
                        }
                }
            }), c
        },
        "getNodeAncestors": function(b) {
            var c = [];
            return this.each(function() {
                if (this.grid && this.p.treeGrid)
                    for (var d = a(this).jqGrid("getNodeParent", b); d;) c.push(d), d = a(this).jqGrid("getNodeParent", d)
            }), c
        },
        "isVisibleNode": function(b) {
            var c = !0;
            return this.each(function() {
                var d = this;
                if (d.grid && d.p.treeGrid) {
                    var e = a(d).jqGrid("getNodeAncestors", b),
                        f = d.p.treeReader.expanded_field;
                    a(e).each(function() {
                        return c = c && this[f], c ? void 0 : !1
                    })
                }
            }), c
        },
        "isNodeLoaded": function(b) {
            var c;
            return this.each(function() {
                var d = this;
                if (d.grid && d.p.treeGrid) {
                    var e = d.p.treeReader.leaf_field,
                        f = d.p.treeReader.loaded;
                    c = void 0 !== b ? void 0 !== b[f] ? b[f] : b[e] || a(d).jqGrid("getNodeChildren", b).length > 0 ? !0 : !1 : !1
                }
            }), c
        },
        "expandNode": function(b) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var c = this.p.treeReader.expanded_field,
                        d = this.p.treeReader.parent_id_field,
                        e = this.p.treeReader.loaded,
                        f = this.p.treeReader.level_field,
                        g = this.p.treeReader.left_field,
                        h = this.p.treeReader.right_field;
                    if (!b[c]) {
                        var i = a.jgrid.getAccessor(b, this.p.localReader.id),
                            j = a("#" + this.p.idPrefix + a.jgrid.jqID(i), this.grid.bDiv)[0],
                            k = this.p._index[i];
                        a(this).jqGrid("isNodeLoaded", this.p.data[k]) ? (b[c] = !0, a("div.treeclick", j).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus")) : this.grid.hDiv.loading || (b[c] = !0, a("div.treeclick", j).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"), this.p.treeANode = j.rowIndex, this.p.datatype = this.p.treedatatype, "nested" === this.p.treeGridModel ? a(this).jqGrid("setGridParam", {
                            "postData": {
                                "nodeid": i,
                                "n_left": b[g],
                                "n_right": b[h],
                                "n_level": b[f]
                            }
                        }) : a(this).jqGrid("setGridParam", {
                            "postData": {
                                "nodeid": i,
                                "parentid": b[d],
                                "n_level": b[f]
                            }
                        }), a(this).trigger("reloadGrid"), b[e] = !0, "nested" === this.p.treeGridModel ? a(this).jqGrid("setGridParam", {
                            "postData": {
                                "nodeid": "",
                                "n_left": "",
                                "n_right": "",
                                "n_level": ""
                            }
                        }) : a(this).jqGrid("setGridParam", {
                            "postData": {
                                "nodeid": "",
                                "parentid": "",
                                "n_level": ""
                            }
                        }))
                    }
                }
            })
        },
        "collapseNode": function(b) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var c = this.p.treeReader.expanded_field;
                    if (b[c]) {
                        b[c] = !1;
                        var d = a.jgrid.getAccessor(b, this.p.localReader.id),
                            e = a("#" + this.p.idPrefix + a.jgrid.jqID(d), this.grid.bDiv)[0];
                        a("div.treeclick", e).removeClass(this.p.treeIcons.minus + " tree-minus").addClass(this.p.treeIcons.plus + " tree-plus")
                    }
                }
            })
        },
        "SortTree": function(b, c, d, e) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var f, g, h, i, j, k = [],
                        l = this,
                        m = a(this).jqGrid("getRootNodes");
                    for (i = a.jgrid.from(m), i.orderBy(b, c, d, e), j = i.select(), f = 0, g = j.length; g > f; f++) h = j[f], k.push(h), a(this).jqGrid("collectChildrenSortTree", k, h, b, c, d, e);
                    a.each(k, function(b) {
                        var c = a.jgrid.getAccessor(this, l.p.localReader.id);
                        a("#" + a.jgrid.jqID(l.p.id) + " tbody tr:eq(" + b + ")").after(a("tr#" + a.jgrid.jqID(c), l.grid.bDiv))
                    }), i = null, j = null, k = null
                }
            })
        },
        "collectChildrenSortTree": function(b, c, d, e, f, g) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var h, i, j, k, l, m;
                    for (k = a(this).jqGrid("getNodeChildren", c), l = a.jgrid.from(k), l.orderBy(d, e, f, g), m = l.select(), h = 0, i = m.length; i > h; h++) j = m[h], b.push(j), a(this).jqGrid("collectChildrenSortTree", b, j, d, e, f, g)
                }
            })
        },
        "setTreeRow": function(b, c) {
            var d = !1;
            return this.each(function() {
                var e = this;
                e.grid && e.p.treeGrid && (d = a(e).jqGrid("setRowData", b, c))
            }), d
        },
        "delTreeNode": function(b) {
            return this.each(function() {
                var c, d, e, f, g, h = this,
                    i = h.p.localReader.id,
                    j = h.p.treeReader.left_field,
                    k = h.p.treeReader.right_field;
                if (h.grid && h.p.treeGrid) {
                    var l = h.p._index[b];
                    if (void 0 !== l) {
                        d = parseInt(h.p.data[l][k], 10), e = d - parseInt(h.p.data[l][j], 10) + 1;
                        var m = a(h).jqGrid("getFullTreeNode", h.p.data[l]);
                        if (m.length > 0)
                            for (c = 0; c < m.length; c++) a(h).jqGrid("delRowData", m[c][i]);
                        if ("nested" === h.p.treeGridModel) {
                            if (f = a.jgrid.from(h.p.data).greater(j, d, {
                                    "stype": "integer"
                                }).select(), f.length)
                                for (g in f) f.hasOwnProperty(g) && (f[g][j] = parseInt(f[g][j], 10) - e);
                            if (f = a.jgrid.from(h.p.data).greater(k, d, {
                                    "stype": "integer"
                                }).select(), f.length)
                                for (g in f) f.hasOwnProperty(g) && (f[g][k] = parseInt(f[g][k], 10) - e)
                        }
                    }
                }
            })
        },
        "addChildNode": function(b, c, d, e) {
            var f = this[0];
            if (d) {
                var g, h, i, j, k, l, m, n, o = f.p.treeReader.expanded_field,
                    p = f.p.treeReader.leaf_field,
                    q = f.p.treeReader.level_field,
                    r = f.p.treeReader.parent_id_field,
                    s = f.p.treeReader.left_field,
                    t = f.p.treeReader.right_field,
                    u = f.p.treeReader.loaded,
                    v = 0,
                    w = c;
                if (void 0 === e && (e = !1), void 0 === b || null === b) {
                    if (k = f.p.data.length - 1, k >= 0)
                        for (; k >= 0;) v = Math.max(v, parseInt(f.p.data[k][f.p.localReader.id], 10)), k--;
                    b = v + 1
                }
                var x = a(f).jqGrid("getInd", c);
                if (m = !1, void 0 === c || null === c || "" === c) c = null, w = null, g = "last", j = f.p.tree_root_level, k = f.p.data.length + 1;
                else {
                    g = "after", h = f.p._index[c], i = f.p.data[h], c = i[f.p.localReader.id], j = parseInt(i[q], 10) + 1;
                    var y = a(f).jqGrid("getFullTreeNode", i);
                    y.length ? (k = y[y.length - 1][f.p.localReader.id], w = k, k = a(f).jqGrid("getInd", w) + 1) : k = a(f).jqGrid("getInd", c) + 1, i[p] && (m = !0, i[o] = !0, a(f.rows[x]).find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper").end().find("div.tree-leaf").removeClass(f.p.treeIcons.leaf + " tree-leaf").addClass(f.p.treeIcons.minus + " tree-minus"), f.p.data[h][p] = !1, i[u] = !0)
                }
                if (l = k + 1, void 0 === d[o] && (d[o] = !1), void 0 === d[u] && (d[u] = !1), d[q] = j, void 0 === d[p] && (d[p] = !0), "adjacency" === f.p.treeGridModel && (d[r] = c), "nested" === f.p.treeGridModel) {
                    var z, A, B;
                    if (null !== c) {
                        if (n = parseInt(i[t], 10), z = a.jgrid.from(f.p.data), z = z.greaterOrEquals(t, n, {
                                "stype": "integer"
                            }), A = z.select(), A.length)
                            for (B in A) A.hasOwnProperty(B) && (A[B][s] = A[B][s] > n ? parseInt(A[B][s], 10) + 2 : A[B][s], A[B][t] = A[B][t] >= n ? parseInt(A[B][t], 10) + 2 : A[B][t]);
                        d[s] = n, d[t] = n + 1
                    } else {
                        if (n = parseInt(a(f).jqGrid("getCol", t, !1, "max"), 10), A = a.jgrid.from(f.p.data).greater(s, n, {
                                "stype": "integer"
                            }).select(), A.length)
                            for (B in A) A.hasOwnProperty(B) && (A[B][s] = parseInt(A[B][s], 10) + 2);
                        if (A = a.jgrid.from(f.p.data).greater(t, n, {
                                "stype": "integer"
                            }).select(), A.length)
                            for (B in A) A.hasOwnProperty(B) && (A[B][t] = parseInt(A[B][t], 10) + 2);
                        d[s] = n + 1, d[t] = n + 2
                    }
                }(null === c || a(f).jqGrid("isNodeLoaded", i) || m) && (a(f).jqGrid("addRowData", b, d, g, w), a(f).jqGrid("setTreeNode", k, l)), i && !i[o] && e && a(f.rows[x]).find("div.treeclick").click()
            }
        }
    })
}(jQuery),
function(a) {
    "use strict";
    a.extend(a.jgrid, {
        "template": function(b) {
            var c, d = a.makeArray(arguments).slice(1),
                e = d.length;
            return null == b && (b = ""), b.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(b, f) {
                if (!isNaN(parseInt(f, 10))) return d[parseInt(f, 10)];
                for (c = 0; e > c; c++)
                    if (a.isArray(d[c]))
                        for (var g = d[c], h = g.length; h--;)
                            if (f === g[h].nm) return g[h].v
            })
        }
    }), a.jgrid.extend({
        "groupingSetup": function() {
            return this.each(function() {
                var b, c, d, e = this,
                    f = e.p.colModel,
                    g = e.p.groupingView;
                if (null === g || "object" != typeof g && !a.isFunction(g)) e.p.grouping = !1;
                else if (g.groupField.length) {
                    for (void 0 === g.visibiltyOnNextGrouping && (g.visibiltyOnNextGrouping = []), g.lastvalues = [], g._locgr || (g.groups = []), g.counters = [], b = 0; b < g.groupField.length; b++) g.groupOrder[b] || (g.groupOrder[b] = "asc"), g.groupText[b] || (g.groupText[b] = "{0}"), "boolean" != typeof g.groupColumnShow[b] && (g.groupColumnShow[b] = !0), "boolean" != typeof g.groupSummary[b] && (g.groupSummary[b] = !1), g.groupSummaryPos[b] || (g.groupSummaryPos[b] = "footer"), g.groupColumnShow[b] === !0 ? (g.visibiltyOnNextGrouping[b] = !0, a(e).jqGrid("showCol", g.groupField[b])) : (g.visibiltyOnNextGrouping[b] = a("#" + a.jgrid.jqID(e.p.id + "_" + g.groupField[b])).is(":visible"), a(e).jqGrid("hideCol", g.groupField[b]));
                    for (g.summary = [], g.hideFirstGroupCol && (g.formatDisplayField[0] = function(a) {
                            return a
                        }), c = 0, d = f.length; d > c; c++) g.hideFirstGroupCol && (f[c].hidden || g.groupField[0] !== f[c].name || (f[c].formatter = function() {
                        return ""
                    })), f[c].summaryType && (f[c].summaryDivider ? g.summary.push({
                        "nm": f[c].name,
                        "st": f[c].summaryType,
                        "v": "",
                        "sd": f[c].summaryDivider,
                        "vd": "",
                        "sr": f[c].summaryRound,
                        "srt": f[c].summaryRoundType || "round"
                    }) : g.summary.push({
                        "nm": f[c].name,
                        "st": f[c].summaryType,
                        "v": "",
                        "sr": f[c].summaryRound,
                        "srt": f[c].summaryRoundType || "round"
                    }))
                } else e.p.grouping = !1
            })
        },
        "groupingPrepare": function(b, c) {
            return this.each(function() {
                var d, e, f, g, h, i = this.p.groupingView,
                    j = this,
                    k = i.groupField.length,
                    l = 0;
                for (d = 0; k > d; d++) e = i.groupField[d], g = i.displayField[d], f = b[e], h = null == g ? null : b[g], null == h && (h = f), void 0 !== f && (0 === c ? (i.groups.push({
                    "idx": d,
                    "dataIndex": e,
                    "value": f,
                    "displayValue": h,
                    "startRow": c,
                    "cnt": 1,
                    "summary": []
                }), i.lastvalues[d] = f, i.counters[d] = {
                    "cnt": 1,
                    "pos": i.groups.length - 1,
                    "summary": a.extend(!0, [], i.summary)
                }, a.each(i.counters[d].summary, function() {
                    a.isFunction(this.st) ? this.v = this.st.call(j, this.v, this.nm, b) : (this.v = a(j).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, b), "avg" === this.st.toLowerCase() && this.sd && (this.vd = a(j).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, b)))
                }), i.groups[i.counters[d].pos].summary = i.counters[d].summary) : "object" == typeof f || (a.isArray(i.isInTheSameGroup) && a.isFunction(i.isInTheSameGroup[d]) ? i.isInTheSameGroup[d].call(j, i.lastvalues[d], f, d, i) : i.lastvalues[d] === f) ? 1 === l ? (i.groups.push({
                    "idx": d,
                    "dataIndex": e,
                    "value": f,
                    "displayValue": h,
                    "startRow": c,
                    "cnt": 1,
                    "summary": []
                }), i.lastvalues[d] = f, i.counters[d] = {
                    "cnt": 1,
                    "pos": i.groups.length - 1,
                    "summary": a.extend(!0, [], i.summary)
                }, a.each(i.counters[d].summary, function() {
                    a.isFunction(this.st) ? this.v = this.st.call(j, this.v, this.nm, b) : (this.v = a(j).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, b), "avg" === this.st.toLowerCase() && this.sd && (this.vd = a(j).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, b)))
                }), i.groups[i.counters[d].pos].summary = i.counters[d].summary) : (i.counters[d].cnt += 1, i.groups[i.counters[d].pos].cnt = i.counters[d].cnt, a.each(i.counters[d].summary, function() {
                    a.isFunction(this.st) ? this.v = this.st.call(j, this.v, this.nm, b) : (this.v = a(j).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, b), "avg" === this.st.toLowerCase() && this.sd && (this.vd = a(j).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, b)))
                }), i.groups[i.counters[d].pos].summary = i.counters[d].summary) : (i.groups.push({
                    "idx": d,
                    "dataIndex": e,
                    "value": f,
                    "displayValue": h,
                    "startRow": c,
                    "cnt": 1,
                    "summary": []
                }), i.lastvalues[d] = f, l = 1, i.counters[d] = {
                    "cnt": 1,
                    "pos": i.groups.length - 1,
                    "summary": a.extend(!0, [], i.summary)
                }, a.each(i.counters[d].summary, function() {
                    a.isFunction(this.st) ? this.v = this.st.call(j, this.v, this.nm, b) : (this.v = a(j).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, b), "avg" === this.st.toLowerCase() && this.sd && (this.vd = a(j).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, b)))
                }), i.groups[i.counters[d].pos].summary = i.counters[d].summary))
            }), this
        },
        "groupingToggle": function(b) {
            return this.each(function() {
                var c = this,
                    d = c.p.groupingView,
                    e = b.split("_"),
                    f = parseInt(e[e.length - 2], 10);
                e.splice(e.length - 2, 2);
                var g, h, i = e.join("_"),
                    j = d.minusicon,
                    k = d.plusicon,
                    l = a("#" + a.jgrid.jqID(b)),
                    m = l.length ? l[0].nextSibling : null,
                    n = a("#" + a.jgrid.jqID(b) + " span.tree-wrap-" + c.p.direction),
                    o = function(b) {
                        var c = a.map(b.split(" "), function(a) {
                            return a.substring(0, i.length + 1) === i + "_" ? parseInt(a.substring(i.length + 1), 10) : void 0
                        });
                        return c.length > 0 ? c[0] : void 0
                    },
                    p = !1,
                    q = c.p.frozenColumns ? c.p.id + "_frozen" : !1,
                    r = q ? a("#" + a.jgrid.jqID(b), "#" + a.jgrid.jqID(q)) : !1,
                    s = r && r.length ? r[0].nextSibling : null;
                if (n.hasClass(j)) {
                    if (d.showSummaryOnHide) {
                        if (m)
                            for (; m;) {
                                if (a(m).hasClass("jqfoot")) {
                                    var t = parseInt(a(m).attr("jqfootlevel"), 10);
                                    if (f >= t) break
                                }
                                a(m).hide(), m = m.nextSibling, q && (a(s).hide(), s = s.nextSibling)
                            }
                    } else if (m)
                        for (; m && (g = o(m.className), !(void 0 !== g && f >= g));) a(m).hide(), m = m.nextSibling, q && (a(s).hide(), s = s.nextSibling);
                    n.removeClass(j).addClass(k), p = !0
                } else {
                    if (m)
                        for (h = void 0; m;) {
                            if (g = o(m.className), void 0 === h && (h = void 0 === g), void 0 !== g) {
                                if (f >= g) break;
                                g === f + 1 && (a(m).show().find(">td>span.tree-wrap-" + c.p.direction).removeClass(j).addClass(k), q && a(s).show().find(">td>span.tree-wrap-" + c.p.direction).removeClass(j).addClass(k))
                            } else h && (a(m).show(), q && a(s).show());
                            m = m.nextSibling, q && (s = s.nextSibling)
                        }
                    n.removeClass(k).addClass(j)
                }
                a(c).triggerHandler("jqGridGroupingClickGroup", [b, p]), a.isFunction(c.p.onClickGroup) && c.p.onClickGroup.call(c, b, p)
            }), !1
        },
        "groupingRender": function(b, c, d, e) {
            return this.each(function() {
                function f(a, b, c) {
                    var d, e = !1;
                    if (0 === b) e = c[a];
                    else {
                        var f = c[a].idx;
                        if (0 === f) e = c[a];
                        else
                            for (d = a; d >= 0; d--)
                                if (c[d].idx === f - b) {
                                    e = c[d];
                                    break
                                }
                    }
                    return e
                }

                function g(b, d, e, g) {
                    var h, i, j = f(b, d, e),
                        l = k.p.colModel,
                        m = j.cnt,
                        n = "";
                    for (i = g; c > i; i++) {
                        var o = "<td " + k.formatCol(i, 1, "") + ">&#160;</td>",
                            p = "{0}";
                        a.each(j.summary, function() {
                            if (this.nm === l[i].name) {
                                l[i].summaryTpl && (p = l[i].summaryTpl), "string" == typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v = this.v / this.vd : this.v && m > 0 && (this.v = this.v / m));
                                try {
                                    this.groupCount = j.cnt, this.groupIndex = j.dataIndex, this.groupValue = j.value, h = k.formatter("", this.v, i, this)
                                } catch (b) {
                                    h = this.v
                                }
                                return o = "<td " + k.formatCol(i, 1, "") + ">" + a.jgrid.format(p, h) + "</td>", !1
                            }
                        }), n += o
                    }
                    return n
                }
                var h, i, j, k = this,
                    l = k.p.groupingView,
                    m = "",
                    n = "",
                    o = l.groupCollapse ? l.plusicon : l.minusicon,
                    p = [],
                    q = l.groupField.length;
                o += " tree-wrap-" + k.p.direction, a.each(k.p.colModel, function(a, b) {
                    var c;
                    for (c = 0; q > c; c++)
                        if (l.groupField[c] === b.name) {
                            p[c] = a;
                            break
                        }
                });
                var r = 0,
                    s = a.makeArray(l.groupSummary);
                s.reverse(), a.each(l.groups, function(f, t) {
                    if (l._locgr && !(t.startRow + t.cnt > (d - 1) * e && t.startRow < d * e)) return !0;
                    r++, i = k.p.id + "ghead_" + t.idx, h = i + "_" + f, n = "<span style='cursor:pointer;' class='ui-icon " + o + "' onclick=\"jQuery('#" + a.jgrid.jqID(k.p.id) + "').jqGrid('groupingToggle','" + h + "');return false;\"></span>";
                    try {
                        a.isArray(l.formatDisplayField) && a.isFunction(l.formatDisplayField[t.idx]) ? (t.displayValue = l.formatDisplayField[t.idx].call(k, t.displayValue, t.value, k.p.colModel[p[t.idx]], t.idx, l), j = t.displayValue) : j = k.formatter(h, t.displayValue, p[t.idx], t.value)
                    } catch (u) {
                        j = t.displayValue
                    }
                    "header" === l.groupSummaryPos[t.idx] ? (m += '<tr id="' + h + '"' + (l.groupCollapse && t.idx > 0 ? ' style="display:none;" ' : " ") + 'role="row" class= "ui-widget-content jqgroup ui-row-' + k.p.direction + " " + i + '"><td style="padding-left:' + 12 * t.idx + 'px;">' + n + a.jgrid.template(l.groupText[t.idx], j, t.cnt, t.summary) + "</td>", m += g(f, t.idx - 1, l.groups, 1), m += "</tr>") : m += '<tr id="' + h + '"' + (l.groupCollapse && t.idx > 0 ? ' style="display:none;" ' : " ") + 'role="row" class= "ui-widget-content jqgroup ui-row-' + k.p.direction + " " + i + '"><td style="padding-left:' + 12 * t.idx + 'px;" colspan="' + c + '">' + n + a.jgrid.template(l.groupText[t.idx], j, t.cnt, t.summary) + "</td></tr>";
                    var v = q - 1 === t.idx;
                    if (v) {
                        var w, x, y = l.groups[f + 1],
                            z = 0,
                            A = t.startRow,
                            B = void 0 !== y ? l.groups[f + 1].startRow : b.length;
                        for (l._locgr && (z = (d - 1) * e, z > t.startRow && (A = z)), w = A; B > w && b[w - z]; w++) m += b[w - z].join("");
                        if ("header" !== l.groupSummaryPos[t.idx]) {
                            var C;
                            if (void 0 !== y) {
                                for (C = 0; C < l.groupField.length && y.dataIndex !== l.groupField[C]; C++);
                                r = l.groupField.length - C
                            }
                            for (x = 0; r > x; x++)
                                if (s[x]) {
                                    var D = "";
                                    l.groupCollapse && !l.showSummaryOnHide && (D = ' style="display:none;"'), m += "<tr" + D + ' jqfootlevel="' + (t.idx - x) + '" role="row" class="ui-widget-content jqfoot ui-row-' + k.p.direction + '">', m += g(f, x, l.groups, 0), m += "</tr>"
                                }
                            r = C
                        }
                    }
                }), a("#" + a.jgrid.jqID(k.p.id) + " tbody:first").append(m), m = null
            })
        },
        "groupingGroupBy": function(b, c) {
            return this.each(function() {
                var d = this;
                "string" == typeof b && (b = [b]);
                var e = d.p.groupingView;
                d.p.grouping = !0, void 0 === e.visibiltyOnNextGrouping && (e.visibiltyOnNextGrouping = []);
                var f;
                for (f = 0; f < e.groupField.length; f++) !e.groupColumnShow[f] && e.visibiltyOnNextGrouping[f] && a(d).jqGrid("showCol", e.groupField[f]);
                for (f = 0; f < b.length; f++) e.visibiltyOnNextGrouping[f] = a("#" + a.jgrid.jqID(d.p.id) + "_" + a.jgrid.jqID(b[f])).is(":visible");
                d.p.groupingView = a.extend(d.p.groupingView, c || {}), e.groupField = b, a(d).trigger("reloadGrid")
            })
        },
        "groupingRemove": function(b) {
            return this.each(function() {
                var c = this;
                if (void 0 === b && (b = !0), c.p.grouping = !1, b === !0) {
                    var d, e = c.p.groupingView;
                    for (d = 0; d < e.groupField.length; d++) !e.groupColumnShow[d] && e.visibiltyOnNextGrouping[d] && a(c).jqGrid("showCol", e.groupField);
                    a("tr.jqgroup, tr.jqfoot", "#" + a.jgrid.jqID(c.p.id) + " tbody:first").remove(), a("tr.jqgrow:hidden", "#" + a.jgrid.jqID(c.p.id) + " tbody:first").show()
                } else a(c).trigger("reloadGrid")
            })
        },
        "groupingCalculations": {
            "handler": function(a, b, c, d, e, f) {
                var g = {
                    "sum": function() {
                        return parseFloat(b || 0) + parseFloat(f[c] || 0)
                    },
                    "min": function() {
                        return "" === b ? parseFloat(f[c] || 0) : Math.min(parseFloat(b), parseFloat(f[c] || 0))
                    },
                    "max": function() {
                        return "" === b ? parseFloat(f[c] || 0) : Math.max(parseFloat(b), parseFloat(f[c] || 0))
                    },
                    "count": function() {
                        return "" === b && (b = 0), f.hasOwnProperty(c) ? b + 1 : 0
                    },
                    "avg": function() {
                        return g.sum()
                    }
                };
                if (!g[a]) throw "jqGrid Grouping No such method: " + a;
                var h = g[a]();
                if (null != d)
                    if ("fixed" === e) h = h.toFixed(d);
                    else {
                        var i = Math.pow(10, d);
                        h = Math.round(h * i) / i
                    }
                return h
            }
        }
    })
}(jQuery),
function(a) {
    "use strict";
    a.jgrid.extend({
        "jqGridImport": function(b) {
            return b = a.extend({
                "imptype": "xml",
                "impstring": "",
                "impurl": "",
                "mtype": "GET",
                "impData": {},
                "xmlGrid": {
                    "config": "roots>grid",
                    "data": "roots>rows"
                },
                "jsonGrid": {
                    "config": "grid",
                    "data": "data"
                },
                "ajaxOptions": {}
            }, b || {}), this.each(function() {
                var c = this,
                    d = function(b, d) {
                        var e, f, g, h = a(d.xmlGrid.config, b)[0],
                            i = a(d.xmlGrid.data, b)[0];
                        if (xmlJsonClass.xml2json && a.jgrid.parse) {
                            e = xmlJsonClass.xml2json(h, " "), e = a.jgrid.parse(e);
                            for (g in e) e.hasOwnProperty(g) && (f = e[g]);
                            if (i) {
                                var j = e.grid.datatype;
                                e.grid.datatype = "xmlstring", e.grid.datastr = b, a(c).jqGrid(f).jqGrid("setGridParam", {
                                    "datatype": j
                                })
                            } else a(c).jqGrid(f);
                            e = null, f = null
                        } else alert("xml2json or parse are not present")
                    },
                    e = function(b, d) {
                        if (b && "string" == typeof b) {
                            var e = !1;
                            a.jgrid.useJSON && (a.jgrid.useJSON = !1, e = !0);
                            var f = a.jgrid.parse(b);
                            e && (a.jgrid.useJSON = !0);
                            var g = f[d.jsonGrid.config],
                                h = f[d.jsonGrid.data];
                            if (h) {
                                var i = g.datatype;
                                g.datatype = "jsonstring", g.datastr = h, a(c).jqGrid(g).jqGrid("setGridParam", {
                                    "datatype": i
                                })
                            } else a(c).jqGrid(g)
                        }
                    };
                switch (b.imptype) {
                    case "xml":
                        a.ajax(a.extend({
                            "url": b.impurl,
                            "type": b.mtype,
                            "data": b.impData,
                            "dataType": "xml",
                            "complete": function(e, f) {
                                "success" === f && (d(e.responseXML, b), a(c).triggerHandler("jqGridImportComplete", [e, b]), a.isFunction(b.importComplete) && b.importComplete(e)), e = null
                            }
                        }, b.ajaxOptions));
                        break;
                    case "xmlstring":
                        if (b.impstring && "string" == typeof b.impstring) {
                            var f = a.parseXML(b.impstring);
                            f && (d(f, b), a(c).triggerHandler("jqGridImportComplete", [f, b]), a.isFunction(b.importComplete) && b.importComplete(f), b.impstring = null), f = null
                        }
                        break;
                    case "json":
                        a.ajax(a.extend({
                            "url": b.impurl,
                            "type": b.mtype,
                            "data": b.impData,
                            "dataType": "json",
                            "complete": function(d) {
                                try {
                                    e(d.responseText, b), a(c).triggerHandler("jqGridImportComplete", [d, b]), a.isFunction(b.importComplete) && b.importComplete(d)
                                } catch (f) {}
                                d = null
                            }
                        }, b.ajaxOptions));
                        break;
                    case "jsonstring":
                        b.impstring && "string" == typeof b.impstring && (e(b.impstring, b), a(c).triggerHandler("jqGridImportComplete", [b.impstring, b]), a.isFunction(b.importComplete) && b.importComplete(b.impstring), b.impstring = null)
                }
            })
        },
        "jqGridExport": function(b) {
            b = a.extend({
                "exptype": "xmlstring",
                "root": "grid",
                "ident": "	"
            }, b || {});
            var c = null;
            return this.each(function() {
                if (this.grid) {
                    var d, e = a.extend(!0, {}, a(this).jqGrid("getGridParam"));
                    if (e.rownumbers && (e.colNames.splice(0, 1), e.colModel.splice(0, 1)), e.multiselect && (e.colNames.splice(0, 1), e.colModel.splice(0, 1)), e.subGrid && (e.colNames.splice(0, 1), e.colModel.splice(0, 1)), e.knv = null, e.treeGrid)
                        for (d in e.treeReader) e.treeReader.hasOwnProperty(d) && (e.colNames.splice(e.colNames.length - 1), e.colModel.splice(e.colModel.length - 1));
                    switch (b.exptype) {
                        case "xmlstring":
                            c = "<" + b.root + ">" + xmlJsonClass.json2xml(e, b.ident) + "</" + b.root + ">";
                            break;
                        case "jsonstring":
                            c = "{" + xmlJsonClass.toJson(e, b.root, b.ident, !1) + "}", void 0 !== e.postData.filters && (c = c.replace(/filters":"/, 'filters":'), c = c.replace(/}]}"/, "}]}"))
                    }
                }
            }), c
        },
        "excelExport": function(b) {
            return b = a.extend({
                "exptype": "remote",
                "url": null,
                "oper": "oper",
                "tag": "excel",
                "exportOptions": {}
            }, b || {}), this.each(function() {
                if (this.grid) {
                    var c;
                    if ("remote" === b.exptype) {
                        var d = a.extend({}, this.p.postData);
                        d[b.oper] = b.tag;
                        var e = jQuery.param(d);
                        c = -1 !== b.url.indexOf("?") ? b.url + "&" + e : b.url + "?" + e, window.location = c
                    }
                }
            })
        }
    })
}(jQuery),
function($) {
    "use strict";
    if ($.jgrid.msie && 8 === $.jgrid.msiever() && ($.expr[":"].hidden = function(a) {
            return 0 === a.offsetWidth || 0 === a.offsetHeight || "none" === a.style.display
        }), $.jgrid._multiselect = !1, $.ui && $.ui.multiselect) {
        if ($.ui.multiselect.prototype._setSelected) {
            var setSelected = $.ui.multiselect.prototype._setSelected;
            $.ui.multiselect.prototype._setSelected = function(a, b) {
                var c = setSelected.call(this, a, b);
                if (b && this.selectedList) {
                    var d = this.element;
                    this.selectedList.find("li").each(function() {
                        $(this).data("optionLink") && $(this).data("optionLink").remove().appendTo(d)
                    })
                }
                return c
            }
        }
        $.ui.multiselect.prototype.destroy && ($.ui.multiselect.prototype.destroy = function() {
            this.element.show(), this.container.remove(), void 0 === $.Widget ? $.widget.prototype.destroy.apply(this, arguments) : $.Widget.prototype.destroy.apply(this, arguments)
        }), $.jgrid._multiselect = !0
    }
    $.jgrid.extend({
        "sortableColumns": function(a) {
            return this.each(function() {
                function b() {
                    c.p.disableClick = !0
                }
                var c = this,
                    d = $.jgrid.jqID(c.p.id),
                    e = {
                        "tolerance": "pointer",
                        "axis": "x",
                        "scrollSensitivity": "1",
                        "items": ">th:not(:has(#jqgh_" + d + "_cb,#jqgh_" + d + "_rn,#jqgh_" + d + "_subgrid),:hidden)",
                        "placeholder": {
                            "element": function(a) {
                                var b = $(document.createElement(a[0].nodeName)).addClass(a[0].className + " ui-sortable-placeholder ui-state-highlight").removeClass("ui-sortable-helper")[0];
                                return b
                            },
                            "update": function(a, b) {
                                b.height(a.currentItem.innerHeight() - parseInt(a.currentItem.css("paddingTop") || 0, 10) - parseInt(a.currentItem.css("paddingBottom") || 0, 10)), b.width(a.currentItem.innerWidth() - parseInt(a.currentItem.css("paddingLeft") || 0, 10) - parseInt(a.currentItem.css("paddingRight") || 0, 10))
                            }
                        },
                        "update": function(a, b) {
                            var d = $(b.item).parent(),
                                e = $(">th", d),
                                f = c.p.colModel,
                                g = {},
                                h = c.p.id + "_";
                            $.each(f, function(a) {
                                g[this.name] = a
                            });
                            var i = [];
                            e.each(function() {
                                var a = $(">div", this).get(0).id.replace(/^jqgh_/, "").replace(h, "");
                                g.hasOwnProperty(a) && i.push(g[a])
                            }), $(c).jqGrid("remapColumns", i, !0, !0), $.isFunction(c.p.sortable.update) && c.p.sortable.update(i), setTimeout(function() {
                                c.p.disableClick = !1
                            }, 50)
                        }
                    };
                if (c.p.sortable.options ? $.extend(e, c.p.sortable.options) : $.isFunction(c.p.sortable) && (c.p.sortable = {
                        "update": c.p.sortable
                    }), e.start) {
                    var f = e.start;
                    e.start = function(a, c) {
                        b(), f.call(this, a, c)
                    }
                } else e.start = b;
                c.p.sortable.exclude && (e.items += ":not(" + c.p.sortable.exclude + ")"), a.sortable(e).data("sortable").floating = !0
            })
        },
        "columnChooser": function(a) {
            function b(a, b, c) {
                if (b >= 0) {
                    var d = a.slice(),
                        e = d.splice(b, Math.max(a.length - b, b));
                    return b > a.length && (b = a.length), d[b] = c, d.concat(e)
                }
            }

            function c(a, b) {
                a && ("string" == typeof a ? $.fn[a] && $.fn[a].apply(b, $.makeArray(arguments).slice(2)) : $.isFunction(a) && a.apply(b, $.makeArray(arguments).slice(2)))
            }
            var d = this;
            if (!$("#colchooser_" + $.jgrid.jqID(d[0].p.id)).length) {
                var e = $('<div id="colchooser_' + d[0].p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>'),
                    f = $("select", e);
                if (a = $.extend({
                        "width": 420,
                        "height": 240,
                        "classname": null,
                        "done": function(a) {
                            a && d.jqGrid("remapColumns", a, !0)
                        },
                        "msel": "multiselect",
                        "dlog": "dialog",
                        "dialog_opts": {
                            "minWidth": 470
                        },
                        "dlog_opts": function(a) {
                            var b = {};
                            return b[a.bSubmit] = function() {
                                a.apply_perm(), a.cleanup(!1)
                            }, b[a.bCancel] = function() {
                                a.cleanup(!0)
                            }, $.extend(!0, {
                                "buttons": b,
                                "close": function() {
                                    a.cleanup(!0)
                                },
                                "modal": a.modal || !1,
                                "resizable": a.resizable || !0,
                                "width": a.width + 20
                            }, a.dialog_opts || {})
                        },
                        "apply_perm": function() {
                            $("option", f).each(function() {
                                this.selected ? d.jqGrid("showCol", g[this.value].name) : d.jqGrid("hideCol", g[this.value].name)
                            });
                            var c = [];
                            $("option:selected", f).each(function() {
                                c.push(parseInt(this.value, 10))
                            }), $.each(c, function() {
                                delete i[g[parseInt(this, 10)].name]
                            }), $.each(i, function() {
                                var a = parseInt(this, 10);
                                c = b(c, a, a)
                            }), a.done && a.done.call(d, c)
                        },
                        "cleanup": function(b) {
                            c(a.dlog, e, "destroy"), c(a.msel, f, "destroy"), e.remove(), b && a.done && a.done.call(d)
                        },
                        "msel_opts": {}
                    }, $.jgrid.col, a || {}), $.ui && $.ui.multiselect && "multiselect" === a.msel) {
                    if (!$.jgrid._multiselect) return void alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
                    a.msel_opts = $.extend($.ui.multiselect.defaults, a.msel_opts)
                }
                a.caption && e.attr("title", a.caption), a.classname && (e.addClass(a.classname), f.addClass(a.classname)), a.width && ($(">div", e).css({
                    "width": a.width,
                    "margin": "0 auto"
                }), f.css("width", a.width)), a.height && ($(">div", e).css("height", a.height), f.css("height", a.height - 10));
                var g = d.jqGrid("getGridParam", "colModel"),
                    h = d.jqGrid("getGridParam", "colNames"),
                    i = {},
                    j = [];
                f.empty(), $.each(g, function(a) {
                    return i[this.name] = a, this.hidedlg ? void(this.hidden || j.push(a)) : void f.append("<option value='" + a + "' " + (this.hidden ? "" : "selected='selected'") + ">" + $.jgrid.stripHtml(h[a]) + "</option>")
                });
                var k = $.isFunction(a.dlog_opts) ? a.dlog_opts.call(d, a) : a.dlog_opts;
                c(a.dlog, e, k);
                var l = $.isFunction(a.msel_opts) ? a.msel_opts.call(d, a) : a.msel_opts;
                c(a.msel, f, l)
            }
        },
        "sortableRows": function(a) {
            return this.each(function() {
                var b = this;
                b.grid && (b.p.treeGrid || $.fn.sortable && (a = $.extend({
                    "cursor": "move",
                    "axis": "y",
                    "items": ".jqgrow"
                }, a || {}), a.start && $.isFunction(a.start) ? (a._start_ = a.start, delete a.start) : a._start_ = !1, a.update && $.isFunction(a.update) ? (a._update_ = a.update, delete a.update) : a._update_ = !1, a.start = function(c, d) {
                    if ($(d.item).css("border-width", "0"), $("td", d.item).each(function(a) {
                            this.style.width = b.grid.cols[a].style.width
                        }), b.p.subGrid) {
                        var e = $(d.item).attr("id");
                        try {
                            $(b).jqGrid("collapseSubGridRow", e)
                        } catch (f) {}
                    }
                    a._start_ && a._start_.apply(this, [c, d])
                }, a.update = function(c, d) {
                    $(d.item).css("border-width", ""), b.p.rownumbers === !0 && $("td.jqgrid-rownum", b.rows).each(function(a) {
                        $(this).html(a + 1 + (parseInt(b.p.page, 10) - 1) * parseInt(b.p.rowNum, 10))
                    }), a._update_ && a._update_.apply(this, [c, d])
                }, $("tbody:first", b).sortable(a), $("tbody:first", b).disableSelection()))
            })
        },
        "gridDnD": function(a) {
            return this.each(function() {
                function b() {
                    var a = $.data(e, "dnd");
                    $("tr.jqgrow:not(.ui-draggable)", e).draggable($.isFunction(a.drag) ? a.drag.call($(e), a) : a.drag)
                }
                var c, d, e = this;
                if (e.grid && !e.p.treeGrid && $.fn.draggable && $.fn.droppable) {
                    var f = "<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>";
                    if (void 0 === $("#jqgrid_dnd")[0] && $("body").append(f), "string" == typeof a && "updateDnD" === a && e.p.jqgdnd === !0) return void b();
                    if (a = $.extend({
                            "drag": function(a) {
                                return $.extend({
                                    "start": function(b, c) {
                                        var d, f;
                                        if (e.p.subGrid) {
                                            f = $(c.helper).attr("id");
                                            try {
                                                $(e).jqGrid("collapseSubGridRow", f)
                                            } catch (g) {}
                                        }
                                        for (d = 0; d < $.data(e, "dnd").connectWith.length; d++) 0 === $($.data(e, "dnd").connectWith[d]).jqGrid("getGridParam", "reccount") && $($.data(e, "dnd").connectWith[d]).jqGrid("addRowData", "jqg_empty_row", {});
                                        c.helper.addClass("ui-state-highlight"), $("td", c.helper).each(function(a) {
                                            this.style.width = e.grid.headers[a].width + "px"
                                        }), a.onstart && $.isFunction(a.onstart) && a.onstart.call($(e), b, c)
                                    },
                                    "stop": function(b, c) {
                                        var d, f;
                                        for (c.helper.dropped && !a.dragcopy && (f = $(c.helper).attr("id"), void 0 === f && (f = $(this).attr("id")), $(e).jqGrid("delRowData", f)), d = 0; d < $.data(e, "dnd").connectWith.length; d++) $($.data(e, "dnd").connectWith[d]).jqGrid("delRowData", "jqg_empty_row");
                                        a.onstop && $.isFunction(a.onstop) && a.onstop.call($(e), b, c)
                                    }
                                }, a.drag_opts || {})
                            },
                            "drop": function(a) {
                                return $.extend({
                                    "accept": function(a) {
                                        if (!$(a).hasClass("jqgrow")) return a;
                                        var b = $(a).closest("table.ui-jqgrid-btable");
                                        if (b.length > 0 && void 0 !== $.data(b[0], "dnd")) {
                                            var c = $.data(b[0], "dnd").connectWith;
                                            return -1 !== $.inArray("#" + $.jgrid.jqID(this.id), c) ? !0 : !1
                                        }
                                        return !1
                                    },
                                    "drop": function(b, c) {
                                        if ($(c.draggable).hasClass("jqgrow")) {
                                            var d = $(c.draggable).attr("id"),
                                                f = c.draggable.parent().parent().jqGrid("getRowData", d);
                                            if (!a.dropbyname) {
                                                var g, h, i = 0,
                                                    j = {},
                                                    k = $("#" + $.jgrid.jqID(this.id)).jqGrid("getGridParam", "colModel");
                                                try {
                                                    for (h in f) f.hasOwnProperty(h) && (g = k[i].name, "cb" !== g && "rn" !== g && "subgrid" !== g && f.hasOwnProperty(h) && k[i] && (j[g] = f[h]), i++);
                                                    f = j
                                                } catch (l) {}
                                            }
                                            if (c.helper.dropped = !0, a.beforedrop && $.isFunction(a.beforedrop)) {
                                                var m = a.beforedrop.call(this, b, c, f, $("#" + $.jgrid.jqID(e.p.id)), $(this));
                                                void 0 !== m && null !== m && "object" == typeof m && (f = m)
                                            }
                                            if (c.helper.dropped) {
                                                var n;
                                                a.autoid && ($.isFunction(a.autoid) ? n = a.autoid.call(this, f) : (n = Math.ceil(1e3 * Math.random()), n = a.autoidprefix + n)), $("#" + $.jgrid.jqID(this.id)).jqGrid("addRowData", n, f, a.droppos)
                                            }
                                            a.ondrop && $.isFunction(a.ondrop) && a.ondrop.call(this, b, c, f)
                                        }
                                    }
                                }, a.drop_opts || {})
                            },
                            "onstart": null,
                            "onstop": null,
                            "beforedrop": null,
                            "ondrop": null,
                            "drop_opts": {
                                "activeClass": "ui-state-active",
                                "hoverClass": "ui-state-hover"
                            },
                            "drag_opts": {
                                "revert": "invalid",
                                "helper": "clone",
                                "cursor": "move",
                                "appendTo": "#jqgrid_dnd",
                                "zIndex": 5e3
                            },
                            "dragcopy": !1,
                            "dropbyname": !1,
                            "droppos": "first",
                            "autoid": !0,
                            "autoidprefix": "dnd_"
                        }, a || {}), a.connectWith)
                        for (a.connectWith = a.connectWith.split(","), a.connectWith = $.map(a.connectWith, function(a) {
                                return $.trim(a)
                            }), $.data(e, "dnd", a), 0 === e.p.reccount || e.p.jqgdnd || b(), e.p.jqgdnd = !0, c = 0; c < a.connectWith.length; c++) d = a.connectWith[c], $(d).droppable($.isFunction(a.drop) ? a.drop.call($(e), a) : a.drop)
                }
            })
        },
        "gridResize": function(opts) {
            return this.each(function() {
                var $t = this,
                    gID = $.jgrid.jqID($t.p.id);
                if ($t.grid && $.fn.resizable) {
                    if (opts = $.extend({}, opts || {}), opts.alsoResize ? (opts._alsoResize_ = opts.alsoResize, delete opts.alsoResize) : opts._alsoResize_ = !1, opts.stop && $.isFunction(opts.stop) ? (opts._stop_ = opts.stop, delete opts.stop) : opts._stop_ = !1, opts.stop = function(a, b) {
                            $($t).jqGrid("setGridParam", {
                                "height": $("#gview_" + gID + " .ui-jqgrid-bdiv").height()
                            }), $($t).jqGrid("setGridWidth", b.size.width, opts.shrinkToFit), opts._stop_ && opts._stop_.call($t, a, b)
                        }, opts._alsoResize_) {
                        var optstest = "{'#gview_" + gID + " .ui-jqgrid-bdiv':true,'" + opts._alsoResize_ + "':true}";
                        opts.alsoResize = eval("(" + optstest + ")")
                    } else opts.alsoResize = $(".ui-jqgrid-bdiv", "#gview_" + gID);
                    delete opts._alsoResize_, $("#gbox_" + gID).resizable(opts)
                }
            })
        }
    })
}(jQuery),
function(a) {
    "use strict";

    function b(a, b) {
        var c, d, e, f = [];
        if (!this || "function" != typeof a || a instanceof RegExp) throw new TypeError;
        for (e = this.length, c = 0; e > c; c++)
            if (this.hasOwnProperty(c) && (d = this[c], a.call(b, d, c, this))) {
                f.push(d);
                break
            }
        return f
    }
    a.assocArraySize = function(a) {
        var b, c = 0;
        for (b in a) a.hasOwnProperty(b) && c++;
        return c
    }, a.jgrid.extend({
        "pivotSetup": function(c, d) {
            var e = [],
                f = [],
                g = [],
                h = [],
                i = {
                    "grouping": !0,
                    "groupingView": {
                        "groupField": [],
                        "groupSummary": [],
                        "groupSummaryPos": []
                    }
                },
                j = [],
                k = a.extend({
                    "rowTotals": !1,
                    "rowTotalsText": "Total",
                    "colTotals": !1,
                    "groupSummary": !0,
                    "groupSummaryPos": "header",
                    "frozenStaticCols": !1
                }, d || {});
            return this.each(function() {
                function d(a, c, d) {
                    var e;
                    return e = b.call(a, c, d), e.length > 0 ? e[0] : null
                }

                function l(a, b) {
                    var c, d = 0,
                        e = !0;
                    for (c in a) {
                        if (a[c] != this[d]) {
                            e = !1;
                            break
                        }
                        if (d++, d >= this.length) break
                    }
                    return e && (q = b), e
                }

                function m(a, b, c, d) {
                    var e;
                    switch (a) {
                        case "sum":
                            e = parseFloat(b || 0) + parseFloat(d[c] || 0);
                            break;
                        case "count":
                            ("" === b || null == b) && (b = 0), e = d.hasOwnProperty(c) ? b + 1 : 0;
                            break;
                        case "min":
                            e = "" === b || null == b ? parseFloat(d[c] || 0) : Math.min(parseFloat(b), parseFloat(d[c] || 0));
                            break;
                        case "max":
                            e = "" === b || null == b ? parseFloat(d[c] || 0) : Math.max(parseFloat(b), parseFloat(d[c] || 0))
                    }
                    return e
                }

                function n(b, c, d, e) {
                    var f, g, i, j, k = c.length;
                    for (j = a.isArray(d) ? d.length : 1, h = [], h.root = 0, i = 0; j > i; i++) {
                        var l, n = [];
                        for (f = 0; k > f; f++) {
                            if (null == d) g = a.trim(c[f].member) + "_" + c[f].aggregator, l = g;
                            else {
                                l = d[i].replace(/\s+/g, "");
                                try {
                                    g = 1 === k ? l : l + "_" + c[f].aggregator + "_" + f
                                } catch (o) {}
                            }
                            e[g] = n[g] = m(c[f].aggregator, e[g], c[f].member, b)
                        }
                        h[l] = n
                    }
                    return e
                }

                function o(a) {
                    var b, c, d, f, g;
                    for (d in a)
                        if (a.hasOwnProperty(d)) {
                            if ("object" != typeof a[d]) {
                                if ("level" === d) {
                                    if (void 0 === K[a.level] && (K[a.level] = "", a.level > 0 && "_r_Totals" !== a.text && (j[a.level - 1] = {
                                            "useColSpanStyle": !1,
                                            "groupHeaders": []
                                        })), K[a.level] !== a.text && a.children.length && "_r_Totals" !== a.text && a.level > 0) {
                                        j[a.level - 1].groupHeaders.push({
                                            "titleText": a.text
                                        });
                                        var h = j[a.level - 1].groupHeaders.length,
                                            i = 1 === h ? M : L + (h - 1) * u;
                                        j[a.level - 1].groupHeaders[h - 1].startColumnName = e[i].name, j[a.level - 1].groupHeaders[h - 1].numberOfColumns = e.length - i, L = e.length
                                    }
                                    K[a.level] = a.text
                                }
                                if (a.level === t && "level" === d && t > 0)
                                    if (u > 1) {
                                        var l = 1;
                                        for (b in a.fields) 1 === l && j[t - 1].groupHeaders.push({
                                            "startColumnName": b,
                                            "numberOfColumns": 1,
                                            "titleText": a.text
                                        }), l++;
                                        j[t - 1].groupHeaders[j[t - 1].groupHeaders.length - 1].numberOfColumns = l - 1
                                    } else j.splice(t - 1, 1)
                            }
                            if (null != a[d] && "object" == typeof a[d] && o(a[d]), "level" === d && a.level > 0) {
                                c = 0;
                                for (b in a.fields) {
                                    g = {};
                                    for (f in k.aggregates[c])
                                        if (k.aggregates[c].hasOwnProperty(f)) switch (f) {
                                            case "member":
                                            case "label":
                                            case "aggregator":
                                                break;
                                            default:
                                                g[f] = k.aggregates[c][f]
                                        }
                                        u > 1 ? (g.name = b, g.label = k.aggregates[c].label || b) : (g.name = a.text, g.label = "_r_Totals" === a.text ? k.rowTotalsText : a.text), e.push(g), c++
                                }
                            }
                        }
                }
                var p, q, r, s, t, u, v, w, x = c.length,
                    y = 0;
                if (k.rowTotals && k.yDimension.length > 0) {
                    var z = k.yDimension[0].dataName;
                    k.yDimension.splice(0, 0, {
                        "dataName": z
                    }), k.yDimension[0].converter = function() {
                        return "_r_Totals"
                    }
                }
                if (s = a.isArray(k.xDimension) ? k.xDimension.length : 0, t = k.yDimension.length, u = a.isArray(k.aggregates) ? k.aggregates.length : 0, 0 === s || 0 === u) throw "xDimension or aggregates optiona are not set!";
                var A;
                for (r = 0; s > r; r++) A = {
                    "name": k.xDimension[r].dataName,
                    "frozen": k.frozenStaticCols
                }, A = a.extend(!0, A, k.xDimension[r]), e.push(A);
                for (var B = s - 1, C = {}; x > y;) {
                    p = c[y];
                    var D = [],
                        E = [];
                    v = {}, r = 0;
                    do D[r] = a.trim(p[k.xDimension[r].dataName]), v[k.xDimension[r].dataName] = D[r], r++; while (s > r);
                    var F = 0;
                    if (q = -1, w = d(f, l, D)) {
                        if (q >= 0) {
                            if (F = 0, t >= 1) {
                                for (F = 0; t > F; F++) E[F] = a.trim(p[k.yDimension[F].dataName]), k.yDimension[F].converter && a.isFunction(k.yDimension[F].converter) && (E[F] = k.yDimension[F].converter.call(this, E[F], D, E));
                                w = n(p, k.aggregates, E, w)
                            } else 0 === t && (w = n(p, k.aggregates, null, w));
                            f[q] = w
                        }
                    } else {
                        if (F = 0, t >= 1) {
                            for (F = 0; t > F; F++) E[F] = a.trim(p[k.yDimension[F].dataName]), k.yDimension[F].converter && a.isFunction(k.yDimension[F].converter) && (E[F] = k.yDimension[F].converter.call(this, E[F], D, E));
                            v = n(p, k.aggregates, E, v)
                        } else 0 === t && (v = n(p, k.aggregates, null, v));
                        f.push(v)
                    }
                    var G, H = 0,
                        I = null,
                        J = null;
                    for (G in h) {
                        if (0 === H) C.children && void 0 !== C.children || (C = {
                            "text": G,
                            "level": 0,
                            "children": []
                        }), I = C.children;
                        else {
                            for (J = null, r = 0; r < I.length; r++)
                                if (I[r].text === G) {
                                    J = I[r];
                                    break
                                }
                            J ? I = J.children : (I.push({
                                "children": [],
                                "text": G,
                                "level": H,
                                "fields": h[G]
                            }), I = I[I.length - 1].children)
                        }
                        H++
                    }
                    y++
                }
                var K = [],
                    L = e.length,
                    M = L;
                t > 0 && (j[t - 1] = {
                    "useColSpanStyle": !1,
                    "groupHeaders": []
                }), o(C, 0);
                var N;
                if (k.colTotals)
                    for (var O = f.length; O--;)
                        for (r = s; r < e.length; r++) N = e[r].name, g[N] ? g[N] += parseFloat(f[O][N] || 0) : g[N] = parseFloat(f[O][N] || 0);
                if (B > 0)
                    for (r = 0; B > r; r++) i.groupingView.groupField[r] = e[r].name, i.groupingView.groupSummary[r] = k.groupSummary, i.groupingView.groupSummaryPos[r] = k.groupSummaryPos;
                else i.grouping = !1;
                i.sortname = e[B].name, i.groupingView.hideFirstGroupCol = !0
            }), {
                "colModel": e,
                "rows": f,
                "groupOptions": i,
                "groupHeaders": j,
                "summary": g
            }
        },
        "jqPivot": function(b, c, d, e) {
            return this.each(function() {
                function f(b) {
                    var e, f = jQuery(g).jqGrid("pivotSetup", b, c),
                        h = a.assocArraySize(f.summary) > 0 ? !0 : !1,
                        i = a.jgrid.from(f.rows);
                    for (e = 0; e < f.groupOptions.groupingView.groupField.length; e++) i.orderBy(f.groupOptions.groupingView.groupField[e], "a", "text", "");
                    jQuery(g).jqGrid(a.extend({
                        "datastr": a.extend(i.select(), h ? {
                            "userdata": f.summary
                        } : {}),
                        "datatype": "jsonstring",
                        "footerrow": h,
                        "userDataOnFooter": h,
                        "colModel": f.colModel,
                        "viewrecords": !0,
                        "sortname": c.xDimension[0].dataName
                    }, d || {}, f.groupOptions));
                    var j = f.groupHeaders;
                    if (j.length)
                        for (e = 0; e < j.length; e++) j[e] && j[e].groupHeaders.length && jQuery(g).jqGrid("setGroupHeaders", j[e]);
                    c.frozenStaticCols && jQuery(g).jqGrid("setFrozenColumns")
                }
                var g = this;
                "string" == typeof b ? a.ajax(a.extend({
                    "url": b,
                    "dataType": "json",
                    "success": function(b) {
                        f(a.jgrid.getAccessor(b, e && e.reader ? e.reader : "rows"))
                    }
                }, e || {})) : f(b)
            })
        }
    })
}(jQuery);