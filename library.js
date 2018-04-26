// console.log('library:open:'+window.document.readyState)
// alert('library:open:'+window.document.readyState)
function scrollValue(win, typ) {
	return maxi(win.document.documentElement[typ], win.document.body[typ]);
}
function addEvent(element, event, func) {
	if (element.addEventListener) {
		element.addEventListener(event, func, false);
	} else {
		element.attachEvent('on' + event, func);
	}
}
function maxi() {
	var i, c = arguments.length, m = arguments[0];
	for (i = 0; i < c; i++) {
		if (arguments[i] > m) m = arguments[i];
	}
	return m;
}
function cCookie() {
	var tb = new cTab();
	this.readCookie = function (arg1) {
		var tC = oStr.fSplit(document.cookie, ';'), n = tC.length, i, el;
		for (i = 0; i < n; i++) {
			el = oStr.fSplit(oStr.fRemLSp(tC[i]), '=');
			if (el[0] == arg1) return el[1];
		}
		return null;
	};
	this.createCookie = function (name, value, expire, domain, path) {
		var oDate, cname, cexpire, cdomain, cpath, tmp1;
		cname = name + '=' + value;
		if (tmp1 = parseInt(expire)) {
			oDate = new Date();
			oDate.setTime(oDate.getTime() + (parseInt(tmp1) * 24 * 60 * 60 * 1000));
			cexpire = 'expires=' + oDate.toGMTString();
		} else {
			cexpire = '';
		}
		domain ? cdomain = 'domain=' + domain : cdomain = '';
		path   ? cpath   = 'path='   + path   : cpath = '';
		document.cookie = oStr.fStrImplode(tb.fTabCompac([cname, cexpire, cdomain, cpath], [cname, cexpire, cdomain, cpath]), '; ');
	};
	this.eraseCookie = function (name) {
		this.createCookie(name, '', -1);
	};
}
function list(a, b, c) {
	if (b == c) return '';
	var i, rs = '', tb = oStr.strRepeat('\t-', b);
	var toString = Object.prototype.toString;
	for (i in a) {
		if (typeof(a[i]) === 'object') {
			rs += tb + i + ' : ' + toString.call(a[i]) + '-\r\n' + list(a[i], b + 1, c);
		} else {
			
			// Object.prototype.toString.call(a[i])
				// console.log(i);
				rs += tb + i + toString.call(a[i]) + ' -- <' + a[i] + '>\r\n';
			// if ($obj.exclude(d, ['filters', 'offsetParent'])) {
			// }
		}
	}
	return rs;
}
function enumer() {
	var i, c = arguments.length - 1, rs = '';
	for (i = 0; i < c; i++) {
		rs += arguments[i] + ';';
	}
	// alert(i+':'+arguments.length);
	rs += arguments[i];
	alert(rs);
}
function isSameObj(o1, o2) {
	var i, m = 0, n = 0;
	for (i in o1) m++;
	for (i in o2) n++;
	if (m != n) return false;
	for (i in o1) {
		if (!(i in o2)) return false;
		if (typeof o1[i] != typeof o2[i]) return false;
		if (typeof o1[i] != 'object') {
			if (o1[i] != o2[i]) return false;
		} else {
			if (!isSameObj(o1[i], o2[i])) {
				return false;
			}
		}
	}
	return true;
}
var cSty = {
	computed : {
		styleIE : function (elm, key) {return elm.currentStyle[key];},
		styleFF : function (elm, key) {return getComputedStyle(elm, null)[key];},
		style   : function (elm, key) {return this.style00(elm, key);},
		style00 : function (elm, key) {
			if (elm.currentStyle) {
				this.style = this.styleIE;
			} else {
				this.style = this.styleFF;
			}
			return this.style(elm, key);
		}
	},
	style : function (elm, k, v) {
		var sty = elm.style;
		if (sty[k] != v) sty[k] = v;
	}
};
var $num = {
	limit : function (vl, mn, mx) {
		var tr;
		if (mn > mx) {return mn;}
		if (vl < mn) {vl = mn;} else if (vl > mx) {vl = mx;}
		return vl;
	},
	isNum : function (arg1) {
		var i, c = arg1.length;
		for (i = 0; i < c; i++) {
			if (isNaN(arg1[i])) {
				return false;
			}
		}
		return true;
	},
	inf : function (a1, a2) {
		var i, c = arg1.length;
		for (i = 0; i < c; i++) {
			if (arg1[i] > a2) {
				return false;
			}
		}
		return true;
	},
	fix : function (arg1, arg2) {
		var s = Math.pow(10, arg2);
		return Math.round(arg1 * s) / s;
	},
	pre : function (arg1, arg2) {
		var str = this.fix(arg1, arg2);
		if (Math.round(str) == str) {
			str = str + '.' + oStr.strRepeat('0', arg2);
		}
		return str;
	}
};
var oElm = {
	w    : function (obj, w) {if (w < 0) w = 0; obj.style.width  = w + 'px';},
	h    : function (obj, h) {if (h < 0) h = 0; obj.style.height = h + 'px';},
	l    : function (obj, l) {obj.style.left  = l + 'px';},
	t    : function (obj, t) {obj.style.top   = t + 'px';},
	lt   : function (obj, l, t) {this.l(obj, l); this.t(obj, t);},
	wh   : function (obj, w, h) {this.w(obj, w); this.h(obj, h);},
	ltwh : function (obj, l, t, w, h) {this.lt(obj, l, t); this.wh(obj, w, h);},
	m    : function (obj, m) {obj.style.marginLeft  = m + 'px';},
	n    : function (obj, n) {obj.style.marginLeft  = n + 'px';},
	mn   : function (obj, m, n) {this.m(obj, m); this.m(obj, n);},
	z    : function (obj, z) {obj.style.zIndex  = z + '';}
};
	// CLASSE STRING
var oStr = {
	blank : [' ', '\t', '\r', '\n'],
	strNoBlk : function (ttab) {
		var i, c = ttab.length, trs = [];
		for (i = 0; i < c; i++) {
			trs[i] = this.remLRSp(ttab[i]);
		}
		return trs;
	},
	strInTab : function (ttab, str) {
		var i, n = ttab.length;
		for (i = 0; i < n; i++) {
			if (str === ttab[i]) return true;
		}
		return false;
	},
	strExistStr : function (ttab, sp) {
		var i, j, n = ttab.length;
		for (i = 0; i < n; i++) {
			if (ttab.charAt(i) == sp) return true;
		}
		return false;
	},
	strExistStrLst : function (ttab, sp) {
		var i, n = ttab.length;
		for (i = 0; i < n; i++) {
			if (this.strExistStr(sp, ttab.charAt(i))) return true;
		}
		return false;
	},
	strExistEqu : function (ttab, sp) {
		var i, j, n = ttab.length;
		for (i = 0; i < n; i++) {
			if (ttab[i] == sp) return true;
		}
		return false;
	},
	remLSp2 : function (ch) {
		var n = ch.length, i = 0;
		while (this.strExistEqu(this.blank, ch.charAt(i)))  i++;
		return ch.substring(i, n);
	},
	remRSp2 : function (ch) {
		var n = ch.length - 1, i = n;
		while (this.strExistEqu(this.blank, ch.charAt(i)))  i--;
		return ch.substring(0, i + 1);
	},
	remLSp : function (ch) {
		var n = ch.length, i = 0;
		while (ch.charAt(i) == ' ')  i++;
		return ch.substring(i, n);
	},
	remRSp : function (ch) {
		var n = ch.length - 1, i = n;
		while (ch.charAt(i) == ' ')  i--;
		return ch.substring(0, i + 1);
	},
	remLRSp : function (ch) {
		return this.remLSp(this.remRSp(ch));
	},
	remLRSp2 : function (ch) {
		return this.remLSp2(this.remRSp2(ch));
	},
	split : function (ch, sp) {
		var c = ch + '' + sp, chl = ch.length, spl = sp.length, max = c.length,i = 0, j = 0, res = [], k=0;
		while (i != max) {
			if (c.substr(i, spl) == sp) {
				res[k] = c.substring(j, i);
				i = i + spl;
				j = i;
				k++;
			} else {
				i++;
			}
		}
		return res;
	},
	splitBlank : function (ch) {
		var i = 0, c = ch.length, k = 0, trs = [], str, chr;
		while (i != c) {
			while ((i != c) && (ch.substr(i, 1) == ' ')) {
				i++;
			}
			str = '';
			while ((i != c) && ((chr = ch.substr(i, 1)) != ' ')) {
				str += chr;
				i++;
			}
			if (str !== '') {
				trs[k] = str; 
				k++;
			}
		}
		return trs;
	},
	splitBlankAlt : function (ch) {
		var i, elm = this.split(ch, ' '), c = elm.length, trs = [], k = 0;
		for (i = 0; i < c; i++) {
			if (elm[i] != '') {
				trs[k] = elm[i]; 
				k++;
			}
		}
		return trs;
	},
	strImplode : function (ttab, sep) {
		var i, n = ttab.length, rs = '';
		for (i = 0; i < n; i++) {
			rs += ttab[i] + '' + sep;
		}
		return rs.substr(0, rs.length - sep.length);
	},
	remDbSp : function (str) {
		var i = 0, j = 0, n = str.length, c, tm,  rs = '';
		while (i < n) {
			j = 0; tm = '';
			while (((i + j) < n) && ((c = str.charAt(i + j)) != ' ')) {
				tm = tm + c;
				j++;
			}
			if (j) {
				rs = rs + tm + ' ';
				i += j;
			} else {
				i++;
			}
		}
		return this.fRemRSp(rs);
	},
	toBase : function (a, b) {
		var rs = '', d = a, r;
		while (d >= b) {
			r = d % b;
			d = Math.floor(d / b);
			rs = ':' + r + rs;
		}
		return this.split(d + rs, ':');
	},
	toInt : function (a, b) {
		var rs = 0, n = a.length;
		for (i = 0; i < n; i++) {
			rs += a[i] * Math.pow(b, n - 1 - i);
		}
		return rs;
	},
	toHexa : function (a) {
		var i, c = a.length, hx = '0123456789ABCDEF', rs = '';
		for (i = 0; i < c; i++) {
			rs = rs + hx.charAt(a[i]);
		}
		return rs;
	},
	toHexaInv : function (a) {
		var i, c = a.length, hx = '0123456789ABCDEF', rs = [];
		for (i = 0; i < c; i++) {
			rs[i] = hx.indexOf(a.charAt(i));
		}
		return rs;
	},
	tablIndexOf : function (a, b) {
		var i, c1 = a.length, c2 = b.length, c0 = c1 - c2 + 1, mod = b.toUpperCase(), rs = [], k = 0;
		for (i = 0; i < c0; i++) {
			if (a.substr(i, c2).toUpperCase() == mod) {
				rs[k] = i; k++;
			}
		}
		return rs;
	},
	strRepeat : function (a, b) {
		var i, rs = '';
		for (i = 0; i < b; i++) {
			rs = rs + a;
		}
		return rs;
	},
	fill : function (pri, sec, ter) {
		var i, c = pri.length, rs = pri;
		for (i = c; i < ter; i++) {
			rs = sec + rs;
		}
		return rs;
	},
	fullInv : function (pri, sec) {
		var i = 0, c = pri.length, rs;
		while ((i < c) && (pri.charAt(i) == sec)) i++;
		return pri.substr(i, c);
	},
	firstUpc : function (arg1) {
		var c = arg1.length;
		return (c > 0) ? arg1.substring(0, 1).toUpperCase() + '' + arg1.substring(1, c) : arg1;
	},
	firstLwc : function (arg1) {
		var c = arg1.length;
		return (c > 0) ? arg1.substring(0, 1).toLowerCase() + '' + arg1.substring(1, c) : arg1;
	},
	jscss : function (arg1) {
		var i = 0, c = arg1.length, str = '', chr, t = false;
		while (i < c) {
			chr = arg1.charAt(i);
			if (chr == '-') {
				t = true;
			} else {
				if (t) {
					chr = chr.toUpperCase();
					t = false;
				}
				str += chr;
			}
			i++;
		}
		return str;
	}
};

	// OPERATION DOM
var $dom = {
	appendChildS : function () {
		var i, c = arguments.length - 1, p;
		for (i = 0; i < c; i++) arguments[i].appendChild(arguments[i + 1]);
	},
	appendChildP : function () {
		var i, c = arguments.length - 1, p;
		for (i = 0; i < c; i++) arguments[0].appendChild(arguments[i + 1]);
	},
	fLienIde : function (arg1) {return document.getElementById(arg1);},
	remChild : function (arg1) {arg1.parentNode.removeChild(arg1);},
	fLastElm : function (par) {
		return this.fEnlevPrev(par.lastChild);
	},
	fFirstElm : function (par) {
		return this.fEnlevNext(par.firstChild);
	},
	fEnlevNext : function (arg1) {
		while (arg1 && (arg1.nodeType != 1)) arg1 = arg1.nextSibling;
		return arg1;
	},
	fPassNext : function (arg1) {
		arg1 = arg1.nextSibling;
		return this.fEnlevNext(arg1);
	},
	fEnf : function (arg1) {
		arg1 = arg1.firstChild;
		return this.fEnlevNext(arg1);
	},
	fEnlevPrev : function (arg1) {
		while (arg1 && (arg1.nodeType != 1)) arg1 = arg1.previousSibling;
		return arg1;
	},
	fPassPrev : function (arg1) {
		arg1 = arg1.previousSibling;
		return this.fEnlevPrev(arg1);
	},
	fBatAttr : function (elmt, data, valu) {
		for (var i = 0, c = data.length; i < c; i++) {
			elmt.setAttribute(data[i], valu[i]);
		}
	},
	fPosAbsT : function (arg1) {
		var o1 = arg1, t = 0;
		do {
			t += o1.offsetTop;
		} while ((o1 = o1.parentNode) && (o1.nodeName.toLowerCase() != 'body'))
		return t;
	},
	fNjEnf : function (arg1) {
		var i = 0;
		while (arg1) {
			i++;
			arg1 = this.fPassPrev(arg1);
		}
		return i;
	},
	fLimitTest : function (vl, mn, mx) {
		return ((mn <= vl) && (vl <= mx));
	},
	fSup : function (ls, vl) {
		var i, c = ls.length;
		for (i = 0; i < c; i++) {
			if (ls[i] > vl) return i;
		}
		return c - 1;
	},
	fInf : function (ls, vl) {
		var i, c = ls.length - 1;
		for (i = c; i >= 0; i--) {
			if (ls[i] < vl) return i;
		}
		return 0;
	},
	fNiEnf : function (arg1, arg2) {
		var i, tmp = arg1.childNodes, n = 0;
		for (i = 0; i < tmp.length; i++) {
			if ((tmp[i].nodeName != '#text') && (tmp[i].nodeType == 1)) {
				n++;
				if (n == arg2) return tmp[i];
			}
		}
		return null;
	},
	moveAfter : function (cur, cib) {
		this.insertAfter(cur.parentNode.removeChild(cur), cib);
	},
	insertAfter : function (cur, cib) {
		var prCib = cib.parentNode, nx = this.fPassNext(cib);
		if (nx) {
			prCib.insertBefore(cur, nx);
		} else {
			prCib.appendChild(cur);
		}
	},
	insertFirst : function(cib, par) {
		par.insertBefore(cib, this.fFirstElm(par));
	},
	fNbEnf : function (arg1) {
		var i, chls = arg1.childNodes, n = chls.length, rs = 0;
		for (i = 0; i < n; i++) {
			if (chls[i].nodeType == 1) rs++;
		}
		return rs;
	},
	fNbEnfCls : function (arg1, arg2) {
		var i, j, chls = arg1.childNodes, n = chls.length, m = arg2.length, rs = 0;
		for (i = 0; i < n; i++) {
			if (chls[i].nodeType == 1) {
				for (j = 0; j < m; j++) {
					if (chls[i].className == arg2[j]) {
						rs++; break;
					}
				}
			}
		}
		return rs;
	},
	fListTabSty : function (env, sty) {
		var i, j, k = 0, objs = env.childNodes, c = objs.length, d = sty.length, rs = [];
		for (i = 0; i < c; i++) {
			if (objs[i].nodeType == 1) {
				for (j = 0; j < d; j++) {
					if (objs[i].className == sty[j]) {
						rs[k] = objs[i];
						k++; break;
					}
				}
			}
		}
		return rs;
	},
	tabChlds : function (arg1) {
		var all = arg1.childNodes, i, j = 0, c = all.length, rs = [];
		for (i = 0; i < c; i++) {
			if (all[i].nodeType == 1) {
				rs[j] = all[i];
				j++;
			}
		}
		return rs;
	},
	toLastIndex : function (obj) {
		var par = obj.parentNode, lst = this.tabChlds(par);
		var i, c = lst.length, z = obj.style.zIndex;
		for (i = 0; i < c; i++) {
			if (lst[i].style.zIndex > z) {
				lst[i].style.zIndex = (parseInt(lst[i].style.zIndex) - 1) + '';
			}
		}
		obj.style.zIndex = (c - 1) + '';
	},
	serIndex : function (obj) {
		var lst = this.tabChlds(obj);
		var i, j, c = lst.length, z;
		for (i = 0; i <= c; i++) {
			for (j = 0; j < c; j++) {
				if (lst[j].style.zIndex == i) break;
			}
			if (j == c) {
				z = i; break;
			}
		}
		return z;
	},
	updIndex : function (obj, z) {
		var lst = this.tabChlds(obj);
		var i, c = lst.length;
		for (i = 0; i < c; i++) {
			if (lst[i].style.zIndex > z) lst[i].style.zIndex = (parseInt(lst[i].style.zIndex) - 1) + '';
		}
	},
	maxIndex : function (obj) {
		var lst = this.tabChlds(obj);
		var i, c = lst.length;alert('j'+c);
		for (i = 0; i < c; i++) {
			if (lst[i].style.zIndex == (c - 1)) {
				return lst[i];
			}
		}
	},
	posIndex : function (arg1, arg2) {
		arg1.style.zIndex = (parseInt(arg1.style.zIndex) + arg2) + '';
	},
	elm : function (elm, nfo) {
		var elm = document.createElement(elm);
		$obj.inheritPlus(elm, nfo);
		return elm;
	},
	clearChilds : function (par) {
		var first;
		while (first = this.fFirstElm(par)) this.remChild(first);
	},
	go : function (par, loc) {
		var i, c, rs = par;
		for (i = 0, c = loc.length; i < c; i++) {
			rs = this.fNiEnf(rs, loc[i]);
		}
		return rs;
	},
	tree : function (par, tab) {
		var i, c, loo;
		for (i = 0, c = tab.length; i < c; i++) {
			loo = par.appendChild(document.createElement(tab[i][0]));
			$obj.inheritPlus(loo, tab[i][1]);
			if (tab[i].length === 3) {
				this.tree(loo, tab[i][2]);
			}
		}
		return par;
	},
	treeSimple : function (par, lst) {
		var i, c, n;
		for (i = 0, c = lst.length; i < c; i++) {
			par.appendChild(lst[i][0]);
			this.treeSimple(lst[i][0], lst[i][1]);
		}
	}
};
function fNiEnf(arg1, arg2) {
	var i, tmp = arg1.childNodes, n = 0;
	for (i = 0; i < tmp.length; i++) {
		if ((tmp[i].nodeName != '#text') && (tmp[i].nodeType == 1)) {
			n++;
			if (n == arg2) return tmp[i];
		}
	}
	return null;
}


	// CLASSE TABLEAU
var oTab = {
	resolOrd : function (ord, sta) {
		if (!this.verifOrd(ord, sta)) {
			return this.defInc(sta, 1, ord.length);
		}
		return ord;
	},
	fTabCompac : function (tco, tcm) {
		var n = tco.length, i, j = 0, trs = [];
		for (i = 0; i < n; i++) {
			if (tcm[i]) {
				trs[j] = tco[i];
				j++;
			}
		}
		return trs;
	},
	search : function (tab, k) {
		var i, n = tab.length;
		for (i = 0; i < n; i++) {
			if (tab[i] == k) {
				return i;
			}
		}
		return -1;
	},
	//
	fTabReord : function (ttab, tcom) {
		var i, n = ttab.length, trs = [];
		for (i = 0; i < n; i++) {
			trs[i] = ttab[tcom[i]];
		}
		return trs;
	},
	fTabBoolToInt : function (ttab) {
		var i, n = ttab.length, trs = [];
		for (i = 0; i < n; i++) {
			ttab[i] ? trs[i] = 1 : trs[i] = 0;
		}
		return trs;
	},
	fTabBoolToBin : function (ttab) {
		var i, n = ttab.length, trs = [], tBin = [false, true];
		for (i = 0; i < n; i++) {
			trs[i] = tBin[ttab[i]];
		}
		return trs;
	},
	//
	verifOrd : function (ttab, st) {
		var i, n = ttab.length + st, tBin = [false, true];
		for (i = st; i < n; i++) {
			if (this.search(ttab, i) == -1) return false;
		}
		return true;
	},
	fTabVerifEnb : function (ttab, en) {
		var i, n = ttab.length, m = 0;
		for (i = 0; i < n; i++) {
			if (ttab[i]) {
				m++;
				if (m == en) return true;
			}
		}
		return false;
	},
	fTabVerifMax : function (ttab, mx) {
		var i, n = ttab.length, m = 0;
		for (i = 0; i < n; i++) {
			m += ttab[i];
			if (m > mx) return false;
		}
		return true;
	},
	fTabToStr : function (ttab) {
		var i, n = ttab.length, trs = [];
		for (i = 0; i < n; i++) {
			trs[i] = ttab[i] + '';
		}
		return trs;
	},
	fTabToInt : function (ttab) {
		var i, n = ttab.length, trs = [];
		for (i = 0; i < n; i++) {
			trs[i] = parseInt(ttab[i]);
		}
		return trs;
	},
	//
	defInc : function (sta, ste, len) {
		var i, trs = [];
		for (i = 0; i < len; i++) {
			trs[i] = sta + (i * ste);
		}
		return trs;
	},
	fTabDefCns : function (mod, len) {
		var i, trs = [];
		for (i = 0; i < len; i++) {
			trs[i] = mod;
		}
		return trs;
	},
	fTabNElm : function (ttab, elm) {
		var i, n = ttab.length, rs = 0;
		for (i = 0; i < n; i++) {
			if (ttab[i] == elm) rs++;
		}
		return rs;
	},
	fTabMask : function (ttab, tCom) {
		var i, n = tCom.length, trs = [];
		for (i = 0; i < n; i++) {
			tCom[i] ? trs[i] = ttab[i] : trs[i] = 0;
		}
		return trs;
	},
	fTabSup : function (ttab, sp) {
		var i, n = ttab.length, trs = [];
		for (i = 0; i < n; i++) {
			trs[i] = ttab[i] > sp;
		}
		return trs;
	},
	fTabExistSup : function (ttab, sp) {
		var i, n = ttab.length, trs = [];
		for (i = 0; i < n; i++) {
			if (ttab[i] > sp) return true;
		}
		return false;
	},
	fTabExistInf : function (ttab, sp) {
		var i, n = ttab.length, trs = [];
		for (i = 0; i < n; i++) {
			if (ttab[i] < sp) return true;
		}
		return false;
	},
	indexMax : function (ttab) {
		var i, n = ttab.length, rs = 0;
		for (i = 1; i < n; i++) {
			if (ttab[i] > ttab[rs]) rs = i;
		}
		return rs;
	},
	indexMin : function (ttab) {
		var i, n = ttab.length, rs = 0;
		for (i = 1; i < n; i++) {
			if (ttab[i] < ttab[rs]) rs = i;
		}
		return rs;
	},
	fTabPercent : function (ttab) {
		var i, n = ttab.length, trs = [], tot = 0, det;
		for (i = 0; i < n; i++) {
			tot += ttab[i];
		}
		for (i = 0; i < n; i++) {
			trs[i] = Math.floor(ttab[i] / tot);
			det += ttab[i] - trs[i];
		}
		for (i = 0; i < det; i++) {
			trs[i]++;
		}
		return trs;
	},
	fTestVal : function (a, min, max) {
		var i, c = a.length, dom = new cDom();
		for (i = 0; i < c; i++) {
			if (!dom.fLimitTest(a[i], min, max)) {
				return false;
			}
		}
		return true;
	},
	isNum : function (arg1) {
		var i, c = arg1.length;
		for (i = 0; i < c; i++) {
			if (isNaN(arg1[i])) {
				return false;
			}
		}
		return true;
	},
	notNullLength : function (tab) {
		var i, n = tab.length, rs = 0;
		for (i = 0; i < n; i++) {
			if (!tab[i]) rs++;
		}
		return rs;
	},
	remNull : function (arg1) {
		var i, j = 0, c = arg1.length, rs = [];
		for (i = 0; i < c; i++) {
			if (arg1[i]) {
				rs[j] = arg1[i];
				j++;
			}
		}
		return rs;
	},
	reorg : function (arg1, arg2) {
		var rs, p1;
		rs = [];
		p1 = function (deb, fin) {
			for (var i = deb, j = 0; i < fin; i++) {
				rs[j++] = arg1[i];
			}
		};
		p1(0, arg2);
		p1(arg2 + 1, arg1.length);
		return rs;
	},
	test : function (a1, a2) {
		var i, c = arg1.length;
		for (i = 0; i < c; i++) {
			if (a2(arg1[i])) {
				return false;
			}
		}
		return true;
	},
	listRem : function (tab, pos) {
		var i, c = tab.length, d, rs = [];
		if ((pos < c) && (pos >= 0)) {
			for (i = pos, d = c - 1; i < d; i++) {
				tab[i] = tab[i + 1];
			}
			tab.pop();
		}
	},
	listAdd : function (tab, pos, val) {
		var i, c = tab.length, rs = [];
		if ((pos <= c) && (pos >= 0)) {
			for (i = c; i > pos; i--) {
				tab[i] = tab[i - 1];
			}
			tab[pos] = val;
		}
	},
	listEdi : function (tab, ps1, ps2) {
		var trs = tab[ps1], c = tab.length;
		if ((ps1 < c) && (ps2 < c) && (ps1 >= 0) && (ps2 >= 0)) {
			tab[ps1] = tab[ps2];
			tab[ps2] = trs;
		}
	},
	copy : function (arg1) {
		var i, c, rs;
		for (i = 0, c = arg1.length, rs = []; i < c; i++) {
			rs[i] = arg1[i];
		}
		return rs;
	}

};

function cCom(tbtn, telm, timg) {
	this.fClick = function (btn, elm) {
		(btn.className == tbtn[0]) ? k = 0: k = 1;
		elm.className = telm[k];
		btn.className = tbtn[k];
		fNiEnf(fNiEnf(btn, 1), 1).src = timg[k].src;
	};
}
function cRadio(env, std, ste, k) {
	var old = k, i, objs, c, $dom = new cDom();
	objs = $dom.fListTabSty(env, [std, ste]); c = objs.length;
	for (i = 0; i < c; i++) {
		objs[i].className = std;
		mAppli(i);
	}
	this.mMaj = function (arg1) {
		mChang(arg1);
	};
	function mChang(arg1) {
		objs[old].className  = std;
		objs[arg1].className = ste;
		old = arg1;
	}
	function mAppli(arg1) {
		objs[arg1].onclick = function () {mChang(arg1);};
	}
	mChang($dom.fLimit(old, 0, c - 1));
}
// function fInherit(s, d) {
	// for (var i in s) {
		// if (typeof(s[i]) == 'object') {
			// d[i] = {};
			// fInherit(s[i], d[i]);
		// } else {
			// d[i] = s[i];
		// }
	// }
// }
// var fff=function() {
	// alert('tt');
	// return 7;
// };
var $obj = {
	toString : Object.prototype.toString,
	getObj   : function (arg1) {return this.toString.call(arg1)},
	isObj    : function (arg1, arg2) {return (this.getObj(arg1) === '[object ' + arg2 + ']');},
	scan     : function (s, d) {
		for (var i in s) {
			if (this.isObj(s[i]), 'Object') {
				if (!d[i]) d[i] = {};
				this.inheritPlus(s[i], d[i]);
			} else {
				d[i] = s[i];
			}
		}
	},
	inherit : function (d, s) {
		for (var i in s) {
			d[i] = s[i];
		}
	},
	inheritPlus : function (d, s) {
		for (var i in s) {
			if (this.isObj(s[i], 'Object')) {
				if (!d[i]) d[i] = {};
				this.inheritPlus(d[i], s[i]);
			} else {
				d[i] = s[i];
			}
		}
	},
	exclude : function (obj, lst) {
		var i, c = lst.length;
		for (i = 0; i < c; i++) {
			if (lst[i] in obj) return false;
		}
		return true;
	},
	test : function (obj, arg1) {
		var i, c = arg1.length, loo = obj;
		for (i = 0; i < c; i++) {
			if (!((this.isObj(loo, Object)) && (arg1[i] in loo))) break;
			loo = loo[arg1[i]];
		}
		return i;
	},
	count : function (obj1, obj2) {
		var i, c = 0, t;
		for (i in obj1) c++;
		t = c; c = 0;
		for (i in obj2) c++;
		return (c === t);
	},
	enumer : function (arg1, arg2, str, arg4) {
		var i, c, s;
		if (arg4 == undefined) arg4 = '?';
		str += oStr.strRepeat('-', arg2) + arg4 + ':';
		if (this.isObj(arg1, 'Object')) {
			str += '<Object>\r\n';
			for (i in arg1) str = this.enumer(arg1[i], arg2 + 1, str, i);
		} else if (this.isObj(arg1, 'Array')) {
			str += '<Array>\r\n';
			for (i = 0, c = arg1.length; i < c; i++) str = this.enumer(arg1[i], arg2 + 1, str, i);
		} else {
			str += arg1+'\r\n';
		}
		return str;
	},
	equal : function (obj1, obj2) {
		var i, c, s = this.getObj(obj1);
		if (s === '[object Object]') {
			if (this.getObj(obj2) !== s) return;
			if (!this.count(obj1, obj2)) return;
			for (i in obj1) {
				if (!this.equal(obj1[i], obj2[i])) return;
			}
		} else if (s === '[object Array]') {
			if (this.getObj(obj2) !== s) return;
			if (obj1.length !== obj2.length) return;
			for (i = 0, c = obj1.length; i < c; i++) {
				if (!this.equal(obj1[i], obj2[i])) return;
			}
		} else {
			if (obj1 !== obj2) return;
		}
		return true;
	},
	bind : function (o, m, a) {
		return function () {
			return m.apply(o, a);
		};
	}
};

var $bat = {
	battery    : null,
	callback   : null,
	getBattery : function (callback) {
		var nav = window.navigator, bat;
		var f1  = function (bat) {
			this.battery  = bat;
			this.callback = callback;
			this.callback(bat);
		};
		if (nav.getBattery) {
			nav.getBattery().then(f1);
		} else if (bat = (nav.battery || nav.mozBattery || nav.webkitBattery)) {
			f1(bat);
		}
	}
};

var $url = {
	getVars : function (win) {
		var q = win.location.search, sp1, sp2, i, c, rs = [], t='';
		if (q != '') {
			sp1 = q.substr(1).split('&');
			c = sp1.length;
			for (i = 0; i < c; i++) {
				sp2 = sp1[i].split('=');
				if (sp2.length == 2) {
					rs.push([decodeURIComponent(sp2[0]), decodeURIComponent(sp2[1])]);
					t += decodeURIComponent(sp2[0])+':'+decodeURIComponent(sp2[1])+'\r\n';
				}
			}
		}
		console.log(this.serialize(rs));
		alert(t);
		return rs;
	},
	serialize : function (arr) {
		var i, j, c, cop = [], inc, rs = {}, key;
		for (i = 0, c = arr.length; i < c; i++) {
			cop[i] = arr[i];
		}
		while ((c = cop.length) != 0) {
			inc = [];
			key = cop[0][0];
			rs[key] = [];
			j = 0;
			for (i = 0; i < c; i++) {
				if (cop[i][0] === key) {
					rs[key][j] = cop[i][1];
					j++;
					inc[i] = false;
				} else {
					inc[i] = true;
				}
			}
			cop = oTab.fTabCompac(cop, inc);
		}
		console.log(list(rs,0));
		return rs;
	}
};


function $URL(url) {
	this.ini(url);
}
$URL.prototype = {
	ini : function (url) {
		var res = '[^/\\\\\\?:#]';
		var ret = '[^/\\\\\\?:]';
		var str = '^('+ret+'+:)//(?:('+ret+'*)(?::('+ret+'*))?@)?('+res+'*)(?::([\\d]+))?((?:(?:/|\\\\)'+res+'+)*(?:/|\\\\)?)?(\\?[^#]*)?(#.*)?$';
		var reg = new RegExp(str, 'gi');
		if (reg.test(url)) {
			var protocol = RegExp.$1;
			var username = encodeURIComponent(RegExp.$2);
			var password = encodeURIComponent(RegExp.$3);
			var hostname = encodeURI(RegExp.$4);
			var port     = RegExp.$5;
			var pathname = encodeURI(RegExp.$6);
			var search   = encodeURI(RegExp.$7);
			var hash     = RegExp.$8;
			var origin, host, href, usps;
			if (pathname == '') pathname = '/';
			if ((port == '80') || (port == '')) {
				port = '';
				host = hostname;
			} else {
				host = hostname+':'+port;
			}
			if ((username == '') && (password == '')) {
				usps = '';
			} else if ((username != '') && (password == '')) {
				usps = username + '@';
			} else if ((username == '') && (password != '')) {
				usps = username + ':' + password + '@';
			} else if ((username != '') && (password != '')) {
				usps = username + ':' + password + '@';
			}
			origin = protocol + '//' + host;
			href   = protocol + '//' + usps + '' + host + '' + pathname + '' + search + '' + hash;
			this.hash     = hash;
			this.host     = host;
			this.hostname = hostname;
			this.href     = href;
			this.origin   = origin;
			this.password = password;
			this.pathname = pathname;
			this.port     = port;
			this.protocol = protocol;
			this.search   = search;
			this.username = (username);
			
		} else {
			throw new Error('erreur format url');
		}
	}
};





function fWinSize() {
	var doc = document.documentElement;
	return {w: doc.clientWidth, h: doc.clientHeight};
}
// alert('library:close:'+window.document.readyState);
// console.log('library:close:'+window.document.readyState);
$c = function (a) {console.log(a);};
$p = function (a) {return parseInt(a, 10);};