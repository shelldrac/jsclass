<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>r&eacute;servation</title>
	<meta http-equiv="content-type" content="text/html;charset=utf-8">
<link rel="stylesheet" href="iu.css">
<style>
.btn0 {
	border:12px solid red;
	width:50px;
	height:30px;
	overflow:hidden;
}
</style>
<script language="javascript" src="library.js"></script>
<script language="javascript">
function Button (w, h, b, be, dx, dy) {
	if (dx != null) this.dx = dx;
	if (dy != null) this.dy = dy;
	this.ini(w, h, b, be);
}
Button.prototype = {
	w    : 50,
	h    : 30,
	b    : 1,
	be   : 2,
	dx   : 1,
	dy   : 1,
	delU  : null,
	delD  : null,
	com1 : {className : 'btn0', style : {}},
	com2 : [
		[
			'div', {className : 'btn1', style : {}}, [
				['div', {className : 'btn2', style : {}}]
			]
		]
	],
	elm : null, 
	ini   : function (w, h, b, be) {
		var btn0, btn1, btn2, this_ = this;
		btn0 = this.com1.style;
		btn1 = this.com2[0][1].style;
		btn2 = this.com2[0][2][0][1].style;
		if (be != null) {
			btn0.borderWidth = this.be + 'px';
			this.be = be;
		}
		if (b != null) {
			this.b = b;
			if (w != null) this.w = w;
			if (h != null) this.h = h;
			btn1.borderWidth = this.b + 'px';
			btn2.borderWidth = this.b + 'px';
			mw(); mh();
		} else {
			if (w != null) {this.w = w; mw();}
			if (h != null) {this.h = h; mh();}
		}
		this.elm = $dom.elm('div', this.com1);
		function mw() {
			btn0.width      = this_.w + 'px';
			btn1.width      = this_.getW1() + 'px';
			btn2.width      = this_.getW2() + 'px';
		}
		function mh() {
			btn0.height     = this_.h + 'px';
			btn1.height     = this_.getH1() + 'px';
			btn2.height     = this_.getH2() + 'px';
			//btn2.lineHeight = this_.getH2() + 'px';
		}
	},
	append : function () {
		$dom.tree(this.elm, this.com2);
	},
	getW1 : function () {return this.w - 2 * this.b},
	getH1 : function () {return this.h - 2 * this.b},
	getW2 : function () {return this.w - 4 * this.b},
	getH2 : function () {return this.h - 4 * this.b}
	
};
function ButtonImg (w, h, b, be, dx, dy, iw, ih, ib, imgU, imgD) {
	Button.call(this, w, h, b, be, dx, dy);
	this.imgU = imgU;
	this.imgD = imgD;
	this.iniImg(iw, ih, ib);
}
ButtonImg.prototype = {
	iw : 20,
	ih : 20,
	ib : 0,
	iniImg : function (iw, ih, ib) {
		var img, style, this_ = this, l, t;
		img = [
			['img', {className : 'icon', src : this.imgU, style : {}}]
		];
		style = img[0][1].style;
		if (ib != null) {
			this.ib = ib;
			style.borderWidth  = this.ib + 'px';
			if (iw != null) this.iw = iw;
			if (ih != null) this.ih = ih;
			mw(); mh();
		} else {
			if (iw != null) {this.iw = iw; mw();}
			if (ih != null) {this.ih = ih; mh();}
		}
		function mw() {
			style.width  = this_.iw + 'px';
		}
		function mh() {
			style.height = this_.ih + 'px';
		}
		l = Math.round(this.getL()); t = Math.round(this.getT());
		this.delU = {style : {marginLeft : l + 'px', marginTop : t + 'px'}};
		this.delD = {style : {marginLeft : (l + this.dx) + 'px', marginTop : (t + this.dy) + 'px'}};
		$obj.inheritPlus(img[0][1], this.delU);
		this.com2[0][2][0][2] = img;
	},
	getL : function () {return (this.getW2() - this.iw - 2 * this.ib) / 2},
	getT : function () {return (this.getH2() - this.ih - 2 * this.ib) / 2}
};
function ButtonImgPush(w, h, b, be, dx, dy, iw, ih, ib, imgU, imgD, callbackU, callbackD) {
	ButtonImg.call(this, w, h, b, be, dx, dy, iw, ih, ib, imgU, imgD);
	this.callbackU = callbackU;
	this.callbackD = callbackD;
	this.iniPush();
}
ButtonImgPush.prototype = {
	iniPush : function () {
		if (this.imgD != null) {
			this.delD.src = this.imgD; this.delU.src = this.imgU;
		}
		this.append();
		var this_ = this, img = $dom.go(this.elm, [1, 1, 1]), oU, oD;
		this_.elm.onmousedown = function () {
			this_.elm.className = 'btnD';
			$obj.inheritPlus(img, this_.delD);
			this_.callbackD();
			document.onmouseup = function () {
				this_.callbackU();
				this_.elm.className = 'btn0';
				$obj.inheritPlus(img, this_.delU);
				document.onmouseup = function(){};
			}
		}
	}
};
function ButtonImgToggle(w, h, b, be, dx, dy, iw, ih, ib, imgU, imgD, callbackU, callbackD, state) {
	ButtonImg.call(this, w, h, b, be, dx, dy, iw, ih, ib, imgU, imgD);
	this.state = state;
	this.callbackU = callbackU;
	this.callbackD = callbackD;
	this.iniToggle();
}
ButtonImgToggle.prototype = {
	iniToggle : function () {
		var this_ = this;
		this.append();
		this.img = $dom.go(this.elm, [1, 1, 1]);
		if (this.imgD) {
			this.fEnable = this.fEnable1;
			this.fDisable = this.fDisable1;
		} else {
			this.fEnable = this.fEnable0;
			this.fDisable = this.fDisable0;
		}
		if (this.state) {
			this.fEnable();
		} else {
			this.fDisable();
		}
		this_.elm.onmousedown = function () {this_.mousedown();};
	},
	mousedown : function () {
		var this_ = this;
		this_.elm.onmousedown = null;
		if (this_.state) {
			this_.elm.className = 'btnU';
		} else {
			this_.elm.className = 'btnT';
		}
		$obj.inheritPlus(this_.img, this_.delD);
		document.onmouseup = function () {
			document.onmouseup = null;
			this_.state = ! this_.state;
			if (this_.state) {
				this_.callbackD(function () {this_.fEnable();f();});
			} else {
				this_.callbackU(function () {this_.fDisable();f();});
			}
			function f() {
				$obj.inheritPlus(this_.img, this_.delU);
				this_.elm.onmousedown = function () {this_.mousedown();};
			}
		}
	},
	fEnable   : function () {},
	fDisable  : function () {},
	fEnable0  : function () {this.elm.className = 'btnM';},
	fDisable0 : function () {this.elm.className = 'btn0';},
	fEnable1  : function () {this.fEnable0(); $obj.inheritPlus(this.img, {src : this.imgD});},
	fDisable1 : function () {this.fDisable0();$obj.inheritPlus(this.img, {src : this.imgU});}
};
$obj.inherit(ButtonImg.prototype, Button.prototype);
$obj.inherit(ButtonImgPush.prototype, ButtonImg.prototype);
$obj.inherit(ButtonImgToggle.prototype, ButtonImg.prototype);



function fGetDir(a) {
	var i, dir = a.split('/'), n = dir.length, rs = "";
	if (n > 1) {
		for (i = 0, n--; i < n; i++) {
			rs += dir[i] + '/';
		}
		return [rs, dir[n]];
	}
}
function fGetValue(style, selector, key) {
}
var $$plan = {
	'.btn0,.btnD,.btnM,.btnT,.btnU,.btn1,.btn2' : {'overflow' : 'hidden', 'border-style': 'solid'},
	'.btn0,.btnD,.btnM,.btnT,.btnU' : {},
	'.btn1,.btn2' : {},
	'.btn1' : {'border-color' : 'red'},
	'.btn2' : {'border-color' : 'blue','cursor' : 'default'},
	'.btnD' : {'border-color' : 'rgb(0,0,255)'},
	'.btnT' : {'border-color' : 'rgb(212,208,200)'},
	'.btnU' : {'border-color' : 'rgb(0,255,255)'},
	'.btnD .btn1' : {'border-color' : 'rgb(64,64,64) rgb(255,255,255) rgb(255,255,255) rgb(64,64,64)'},
	'.btnD .btn2' : {'border-color' : 'rgb(128,128,128) rgb(212,208,200) rgb(212,208,200) rgb(128,128,128)', 'background-color' : 'rgb(255,255,255)'},
	'.btnT .btn1' : {'border-color' : 'rgb(64,64,64) rgb(255,255,255) rgb(255,255,255) rgb(64,64,64)'},
	'.btnT .btn2' : {'border-color' : 'rgb(128,128,128) rgb(212,208,200) rgb(212,208,200) rgb(128,128,128)', 'background-color' : 'rgb(255,255,255)'},
	'.btnU .btn1' : {'border-color' : 'rgb(64,64,64) rgb(255,255,255) rgb(255,255,255) rgb(64,64,64)'},
	'.btnU .btn2' : {'border-color' : 'rgb(128,128,128) rgb(212,208,200) rgb(212,208,200) rgb(128,128,128)', 'background-color' : 'rgb(255,255,255)'},
	'.btn0' : {'border-color' : 'rgb(212,208,200)'},
	'.btn0 .btn1' : {'border-color' : 'rgb(255,255,255) rgb(64,64,64) rgb(64,64,64) rgb(255,255,255)'},
	'.btn0 .btn2' : {'border-color' : 'rgb(212,208,200) rgb(128,128,128) rgb(128,128,128) rgb(212,208,200)', 'background-color' : 'rgb(212,208,200)'},
	'.btnM' : {'border-color' : 'rgb(0,255,255)'},
	'.btnM .btn1' : {'border-color' : 'rgb(64,64,64)'},
	'.btnM .btn2' : {'border-color' : 'rgb(128,128,128)', 'background-color' : 'rgb(212,208,200)'},
	'.btn2 .icon' : {'border-style' : 'solid'}
}
var Init = {
	init : function () {
		var btn = Button.prototype, o = new ButtonImg();
		$obj.inherit($$plan['.btn0,.btnD,.btnM,.btnT,.btnU'], {
			'border-width': btn.be + 'px',
			'width'       : o.w + 'px',
			'height'      : o.h + 'px'
		});
		$obj.inherit($$plan['.btn1,.btn2'], {
			'border-width': btn.b + 'px'
		});
		$obj.inherit($$plan['.btn1'], {
			'width'       : o.getW1() + 'px',
			'height'      : o.getH1() + 'px'
		});
		$obj.inherit($$plan['.btn2'], {
			'width'       : o.getW2() + 'px',
			'height'      : o.getH2() + 'px',
			'line-height' : o.getH2() + 'px'
		});
		$obj.inherit($$plan['.btn2 .icon'], {
			'width'       : o.iw + 'px',
			'height'      : o.ih + 'px',
			'margin-left' : o.getL() + 'px',
			'margin-top'  : o.getT() + 'px',
			'border-width': o.ib + 'px'
		});
		this.integrer();
	},
	integrer : function () {
		var parent, elm = document.createElement('style'), she;
		if (document.styleSheets.length != 0) {
			parent = document.styleSheets[document.styleSheets.length - 1];
			parent = parent.ownerNode || parent.owningElement;
			parent = parent.parentNode;
		} else {
			parent = document.getElementsByTagName('head')[0];
		}
		parent.appendChild(elm);
		if ('sheet' in elm && 'insertRule' in elm.sheet) {
			this.insertRule = this.insertRuleFF;
			she = elm.sheet;
		} else {
			this.insertRule = this.insertRuleIE;
			she = elm.styleSheet;
		}
		var sel, i = 0;
		for (sel in $$plan) {
			this.insertRule(she, sel, f1($$plan[sel])+';', i++);
		}
		function f1 (a) {
			var i, j = 0, rs = [];
			for (i in a) rs[j++] = i + ':' +a[i];
			return rs.join(';');
		}
	},
	insertRule   : function () {},
	insertRuleFF : function (a, s, p, i) {
		var tab = [s + '{' + p + '}'];
		if (i != null) tab.push(i);
		a.insertRule.apply(a, tab);
	},
	insertRuleIE : function (a, s, p, i) {
		var tab = [s, p];
		if (i != null) tab.push(i);
		for (var i = 0, tab = s.split(','), c = tab.length; i < c; i++) {
			a.addRule(tab[i], p, i);
		}
	}
}
window.onload = function () {Init.init();};
</script>
</head>
<body>
<div class="btn0"><div class="btn1"><div class="btn2">OK</div></div></div>
</body>
</html>
