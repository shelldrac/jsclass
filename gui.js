/****************************************************************************
****************************************************************************/
function Button (w, h, b, be) {
	this.delU = {style : {}};
	this.delD = {style : {}};
	this.ini(w, h, b, be);
}
Button.prototype = {
	w    : 30,
	h    : 30,
	b    : 1,
	be   : 2,
	dx   : 1,
	dy   : 1,
	elm : null, 
	ini   : function (w, h, b, be) {
		var btn0, btn1, btn2, cmd1, cmd2, this_ = this;
		cmd1 = {className : 'btn0', style : {}};
		cmd2 = [
			[
				'div', {className : 'btn1', style : {}}, [
					['div', {className : 'btn2', style : {}}]
				]
			]
		];
		btn0 = cmd1.style;
		btn1 = cmd2[0][1].style;
		btn2 = cmd2[0][2][0][1].style;
		if (be != null) {
			this.be = be;
			btn0.borderWidth = this.be + 'px';
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
		this.elm = $dom.elm('div', cmd1);
		$dom.tree(this.elm, cmd2);
		function mw() {
			btn0.width      = this_.w + 'px';
			btn1.width      = this_.getW1() + 'px';
			btn2.width      = this_.getW2() + 'px';
		}
		function mh() {
			btn0.height     = this_.h + 'px';
			btn1.height     = this_.getH1() + 'px';
			btn2.height     = this_.getH2() + 'px';
		}
	},
	getW1 : function () {return this.w - 2 * this.b},
	getH1 : function () {return this.h - 2 * this.b},
	getW2 : function () {return this.w - 4 * this.b},
	getH2 : function () {return this.h - 4 * this.b}
	
};
/****************************************************************************
****************************************************************************/
function ButtonImg (w, h, b, be, iw, ih, dx, dy, imgU, imgD) {
	Button.call(this, w, h, b, be);
	this.imgU = imgU;
	this.imgD = imgD;
	this.cat = 'src';
	this.iniImg(iw, ih, dx, dy);
}
ButtonImg.prototype = {
	iw : 20,
	ih : 20,
	iniImg : function (iw, ih, dx, dy) {
		$c(dx+':'+dy);
		var img, this_ = this, l, t, pro = Button.prototype, ml, mt;
		cmd3 = {className : 'icon', src : this.imgU, style : {}};
		if (iw != null) {this.iw = iw; cmd3.style.width  = this_.iw + 'px';}
		if (ih != null) {this.ih = ih; cmd3.style.height = this_.ih + 'px';}
		if (dx != null || dy != null || pro.be != this.be || pro.b != this.b) {
			if (dx != null) this.dx = dx;
			if (dy != null) this.dy = dy;
			ml(); mt();
		} else {
			if (this.w != pro.w || this.iw != ButtonImg.prototype.iw) ml();
			if (this.h != pro.h || this.ih != ButtonImg.prototype.ih) mt();
		}
		function ml() {
			var l = this_.getL();
			this_.delU.style.marginLeft =  l + 'px';
			this_.delD.style.marginLeft = (l + this_.dx) + 'px';
		}
		function mt() {
			var t = this_.getT();
			this_.delU.style.marginTop =  t + 'px';
			this_.delD.style.marginTop = (t + this_.dy) + 'px';
		}
		$obj.inheritPlus(cmd3, this.delU);
		this.img = $dom.elm('img', cmd3);
		$dom.go(this.elm, [1,1]).appendChild(this.img);
	},
	getL : function () {return Math.round((this.getW2() - this.iw) / 2)},
	getT : function () {return Math.round((this.getH2() - this.ih) / 2)}
};
/****************************************************************************
****************************************************************************/
function ButtonImgPush(  w, h, b, be, iw, ih, dx, dy, imgU, imgD, callbackU, callbackD) {
	ButtonImg.call(this, w, h, b, be, iw, ih, dx, dy, imgU, imgD);
	this.iniPush(callbackU, callbackD);
}
function ButtonLabPush(  w, h, b, be,         dx, dy, imgU, imgD, callbackU, callbackD) {
	ButtonLab.call(this, w, h, b, be,         dx, dy, imgU, imgD);
	this.iniPush(callbackU, callbackD);
}
ButtonImgPush.prototype = {
	iniPush : function (callbackU, callbackD) {
		this.callbackU = callbackU;
		this.callbackD = callbackD;
		if (this.imgD != null) {
			this.delD[this.cat] = this.imgD;
			this.delU[this.cat] = this.imgU;
		}
		var this_ = this, oU, oD;
		this_.elm.onmousedown = function () {
			this_.elm.className = 'btnD';
			$obj.inheritPlus(this_.img, this_.delD);
			this_.callbackD();
			document.onmouseup = function () {
				this_.callbackU();
				this_.elm.className = 'btn0';
				$obj.inheritPlus(this_.img, this_.delU);
				document.onmouseup = null;
				return false;
			}
			return false;
		}
	}
};
/****************************************************************************
****************************************************************************/
function ButtonImgToggle(w, h, b, be, dx, dy, iw, ih, imgU, imgD, callbackU, callbackD, state) {
	ButtonImg.call(this, w, h, b, be, dx, dy, iw, ih, imgU, imgD);
	this.iniToggle(callbackU, callbackD, state);
}
function ButtonLabToggle(w, h, b, be, dx, dy, imgU, imgD, callbackU, callbackD, state) {
	ButtonLab.call(this, w, h, b, be, dx, dy, imgU, imgD);
	this.iniToggle(callbackU, callbackD, state);
}
ButtonImgToggle.prototype = {
	iniToggle : function (callbackU, callbackD, state) {
		this.state = state;
		this.callbackU = callbackU;
		this.callbackD = callbackD;
		var this_ = this;
		if (this.imgD) {
			this.fEnable = this.fEnable1;
			this.fDisable = this.fDisable1;
		} else {
			this.fEnable = this.fEnable0;
			this.fDisable = this.fDisable0;
		}
		this.state ? this.fEnable() : this.fDisable();
		this_.elm.onmousedown = function () {return this_.mousedown();};
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
				this_.elm.onmousedown = function () {return this_.mousedown();};
			}
			return false;
		}
		return false;
	},
	fEnable   : function () {},
	fDisable  : function () {},
	fEnable0  : function () {this.elm.className = 'btnM';},
	fDisable0 : function () {this.elm.className = 'btn0';},
	fEnable1  : function () {this.fEnable0();  this.img[this.cat] = this.imgD;},
	fDisable1 : function () {this.fDisable0(); this.img[this.cat] = this.imgU;}
};
/****************************************************************************
****************************************************************************/
function ButtonLab(w, h, b, be, dx, dy, imgU, imgD) {
	Button.call(this, w, h, b, be);
	this.imgU = imgU;
	this.imgD = imgD;
	this.cat  = 'innerHTML';
	this.iniLab(dx, dy);
}
ButtonLab.prototype = {
	iniLab : function (dx, dy) {
		var pro = ButtonLab.prototype, this_ = this, cmd3 = {className : 'labe', innerHTML : this.imgU, style : {}}, style = cmd3.style;
		if (dx != null || dy != null) {
			if (dx != null) this.dx = dx;
			if (dy != null) this.dy = dy;
			this.delU['style'] = {marginLeft : 0 + 'px', marginTop : 0 + 'px'};
			this.delD['style'] = {marginLeft : this.dx + 'px', marginTop : this.dy + 'px'};
		}
		if (this.b != pro.b) {
			mx(); my();
		} else {
			if (this.w != pro.w) mx();
			if (this.w != pro.y) my();
		}
		this.img = $dom.elm('div', cmd3);
		$dom.go(this.elm, [1,1]).appendChild(this.img);
		function mx() {$obj.inheritPlus(style, {width  : this_.getW2() + 'px'});}
		function my() {$obj.inheritPlus(style, {height : this_.getH2() + 'px'}); style.lineHeight = style.height;}
	}
};
/****************************************************************************
****************************************************************************/
function CursorX(wc, w, h, b, be, x, callbackD, callbackU, callbackM, iw, ih, dx, dy, val, min, max, ste, pre, extra) {
	Button.call(this, w, h, b, be);
	this.x = x;
	this.min = min;
	this.max = max;
	this.ste = ste;
	this.pre = pre;
	this.wc = wc;
	this.callbackD = callbackD;
	this.callbackU = callbackU;
	this.callbackM = callbackM;
	this.iniCur( wc, w, h, b, be, x, callbackD, callbackU, callbackM, iw, ih, dx, dy, val, pre, extra);
}
CursorX.prototype = {
	imgLU : 'img/gray/caret-left-8x.png',
	imgLD : 'img/caret-left-8x.png',
	imgRU : 'img/gray/caret-right-8x.png',
	imgRD : 'img/caret-right-8x.png',
	count : null,
	durMax : 500,
	durMin : 50,
	durSte : 50,
	iniCur : function (wc, w, h, b, be, x, callbackD, callbackU, callbackM, iw, ih, dx, dy, val, pre, extra) {
		var this_ = this, wel, wer, he, wc, cur, rai, envL, envR, envElm = [[], []], obj, i, c, stepMin = Math.pow(10, - pre);
		if (this.ste < stepMin) this.ste = stepMin;
		obj = {
			c : function (arg1) {
				this_.btnC = new ButtonLabPush(w, h, b, be, null, null, '', null, $obj.bind(this_, this_.prompt, []) , function () {});
				envElm[arg1[0]].push(this_.btnC);
				this_.extendM = function () {
					this_.callbackM();
					this_.cap = $num.fix(this_.display(), this.pre);
					this_.btnC.img.innerHTML = this_.cap;
				};
				if (arg1[1]) {
					this_.extendU = function () {$c('nnnnnnnnnnn');
						this_.movePer(this_.toPer(this_.cap));
						this_.callbackU();
					};
				}
			},
			l : function (arg1) {envElm[arg1].push(new ButtonImgPush(w, h, b, be, iw, ih, dx, dy, this_.imgLU, this_.imgLD, $obj.bind(this_, this_.up, []), $obj.bind(this_, this_.down, [this_.durMax, - this_.toPer(this_.min + this_.ste)])));},
			r : function (arg1) {envElm[arg1].push(new ButtonImgPush(w, h, b, be, iw, ih, dx, dy, this_.imgRU, this_.imgRD, $obj.bind(this_, this_.up, []), $obj.bind(this_, this_.down, [this_.durMax,   this_.toPer(this_.min + this_.ste)])));},
			u : function (arg1) {envElm[arg1[0]].push(new ButtonLab (w, h, b, be, null, null, arg1[1], null));},
			i : function (arg1) {envElm[arg1].push(new ButtonLabPush(w, h, b, be, null, null, this_.min, null, function () {if (this_.x != 0) this_.movePer(0);}, function () {}));},
			a : function (arg1) {envElm[arg1].push(new ButtonLabPush(w, h, b, be, null, null, this_.max, null, function () {if (this_.x != 1) this_.movePer(1);}, function () {}));}
		};
		for (i in extra) obj[i](extra[i]);
		wel = getWE(envElm[0].length);
		wer = getWE(envElm[1].length);
		he = getHE();
		wr = getWC();
		rai  = $dom.elm('div', {className : 'rai', style : {width : wc + 'px'}});
		envL = $dom.elm('div', {className : 'env', style : {float : 'left',  width : wel + 'px'}});
		envR = $dom.elm('div', {className : 'env', style : {float : 'right', width : wer + 'px'}});
		this.rub = $dom.elm('div', {className : 'rub', style : {}});
		this.railW = wr - this.w;
		this.elm.style.width = wr + 'px';
		this.elm.style.float = 'left';
		if (b != null || be != null) {
			fh();
		} else {
			if (h != null) fh();
		}
		$c(envElm);
		for (i = 0, c = envElm[0].length; i < c; i++) {
			envL.appendChild(envElm[0][i].elm);
		}
		for (i = 0, c = envElm[1].length; i < c; i++) {
			envR.appendChild(envElm[1][i].elm);
		}
		rai.appendChild(envL);
		rai.appendChild(this.elm);
		rai.appendChild(envR);
		this.cur = $dom.go(this.elm, [1]);
		$dom.insertFirst(this.rub, this.elm);
		this.rai = rai;
		this.moveVal(val);
		this.cur.onmousedown = function (e) {return this_.moveD(e)};
		function fh() {
			envL.style.height = he + 'px';
			envR.style.height = he + 'px';
			rai.style.height  = he + 'px';
			this_.rub.style.height = this_.h + 'px';
		}
		function getWE(arg1) {return (arg1 * (this_.w + (2 * this_.be)));}
		function getHE()     {return       this_.h + (2 * this_.be);}
		function getWC()     {return this_.wc - wel - wer - (2 * this_.be);}
	},
	getWE : function () {return (4 * (this.w + (2 * this.be)));},
	getHE : function () {return       this.h + (2 * this.be);},
	getWC : function () {return this.wc - this.getWE() - (2 * this.be);},
	down  : function (c, d) {
		var this_ = this;
		this.callbackD();
		this.move(c - this_.durSte, d);
	},
	move : function (c, d) {
		var this_ = this;
		if (c < this.durMin) c = this.durMin;
		this.movePer(this.x + d);
		this.count = setTimeout(function(){this_.move(c - this_.durSte, d);},c);
	},
	up   : function () {$c('ccccccccc');
		clearTimeout(this.count);
		this.extendU();
	},
	movePer : function (arg1) {
		if (arg1 < 0) {arg1 = 0;} else if (arg1 > 1) {arg1 = 1;}
		this.x = arg1;
		this.rub.style.width = Math.round(arg1 * this.railW) + 'px';
		this.extendM();
	},
	extendM  : function () {this.callbackM()},
	extendU  : function () {this.callbackU()},
	display : function () {return this.toVal(this.x);},
	moveVal : function (arg1) {this.movePer(this.toPer(arg1))},
	toPer   : function (arg1) {return (arg1 - this.min) / (this.max - this.min);},
	toVal   : function (arg1) {return (arg1 * this.max) - this.min * (arg1 - 1)},
	moveD   : function (ei) {
		ei = ei || window.event;
		var this_ = this, xi = ei.clientX, pi = this.x;
		this.cur.onmousedown = null;
		document.onmouseup = function () {
			this_.extendU();
			document.onmouseup = null;
			document.onmousemove = null;
			this_.cur.onmousedown = function (e) {return this_.moveD(e)};
			return false
		};
		document.onmousemove = function (ef) {
			ef = ef || window.event;
			this_.movePer(pi + ((ef.clientX - xi) / this_.railW));
			return false;
		}
		return false;
	},
	prompt : function () {
		var this_ = this, c = 0, l = 'Range : ' + this.min + ' to ' + this.max, val = this.toVal(this.x);
		f(l);
		function f(arg1) {
			val = window.prompt(arg1,val);
			if (val === null) return void(0);
			var v = parseInt(val, 10)
			if (!isNaN(v) && v >= this_.min && v <= this_.max) {
				this_.moveVal(v);
				this_.extendU();
				return void(0);
			} else {
				c++; f(l + ' <<< verify [' + c + ']');
			}
		}
	}
};
/****************************************************************************
****************************************************************************/
$obj.inherit(ButtonLabToggle.prototype, ButtonImgToggle.prototype);
$obj.inherit(ButtonLabPush.prototype,   ButtonImgPush.prototype);
$obj.inherit(ButtonImg.prototype,       Button.prototype);
$obj.inherit(ButtonImgPush.prototype,   ButtonImg.prototype);
$obj.inherit(ButtonImgToggle.prototype, ButtonImg.prototype);
$obj.inherit(ButtonLab.prototype,       Button.prototype);
$obj.inherit(ButtonLabPush.prototype,   ButtonLab.prototype);
$obj.inherit(ButtonLabToggle.prototype, ButtonLab.prototype);
$obj.inherit(CursorX.prototype,         Button.prototype);
/****************************************************************************
****************************************************************************/
var $$gui = {
	css : {
		'.ico0, .ico2' : {'border-style' : 'solid'},
		'.btn0,.btnD,.btnM,.btnT,.btnU,.btn1,.btn2' : {'overflow' : 'hidden', 'border-style': 'solid'},
		'.btn0,.btnD,.btnM,.btnT,.btnU' : {},
		'.btn1,.btn2' : {},
		'.btn1' : {'border-color' : 'red'},
		'.btn2' : {'border-color' : 'blue','cursor' : 'default'},
		'.btnD' : {'border-color' : 'rgb(0,0,0)'},
		'.btnT' : {'border-color' : 'rgb(128,128,128)'},
		'.btnU' : {'border-color' : 'rgb(0,255,255)', 'color' : 'rgb(0,255,255)'},
		'.btnD .btn1' : {'border-color' : 'rgb(64,64,64) rgb(255,255,255) rgb(255,255,255) rgb(64,64,64)'},
		'.btnD .btn2' : {'border-color' : 'rgb(128,128,128) rgb(212,208,200) rgb(212,208,200) rgb(128,128,128)', 'background-color' : 'rgb(255,255,255)'},
		'.btnT .btn1' : {'border-color' : 'rgb(64,64,64) rgb(255,255,255) rgb(255,255,255) rgb(64,64,64)'},
		'.btnT .btn2' : {'border-color' : 'rgb(128,128,128) rgb(212,208,200) rgb(212,208,200) rgb(128,128,128)', 'background-color' : 'rgb(255,255,255)'},
		'.btnU .btn1' : {'border-color' : 'rgb(64,64,64) rgb(255,255,255) rgb(255,255,255) rgb(64,64,64)'},
		'.btnU .btn2' : {'border-color' : 'rgb(128,128,128) rgb(212,208,200) rgb(212,208,200) rgb(128,128,128)', 'background-color' : 'rgb(255,255,255)'},
		'.btn0' : {'border-color' : 'rgb(128,128,128)'},
		'.btn0 .btn1' : {'border-color' : 'rgb(255,255,255) rgb(64,64,64) rgb(64,64,64) rgb(255,255,255)'},
		'.btn0 .btn2' : {'border-color' : 'rgb(212,208,200) rgb(128,128,128) rgb(128,128,128) rgb(212,208,200)', 'background-color' : 'rgb(212,208,200)'},
		'.btnM' : {'border-color' : 'rgb(0,255,255)', 'color' : 'rgb(0,255,255)'},
		'.btnM .btn1' : {'border-color' : 'rgb(64,64,64)'},
		'.btnM .btn2' : {'border-color' : 'rgb(128,128,128)', 'background-color' : 'rgb(212,208,200)'},
		'.icon' : {},
		'.labe' : {'overflow' : 'hidden', 'text-align' : 'center', 'font-family' : 'courier new'},
		'.btn0 .icon, .btnM .icon' : {},
		'.btn0 .labe, .btnM .labe' : {},
		'.btnD .icon,.btnT .icon,.btnU .icon' : {},
		'.btnD .labe,.btnT .labe,.btnU .labe' : {},
		'.rai': {'overflow' : 'hidden'},
		'.rai .env' : {'overflow' : 'hidden', 'float' : 'left'},
		'.env .btn0, .env .btnD' : {'float' : 'left'},
		'.rai .rub' : {'float' : 'left', 'overflow' : 'hidden', 'background-color' : 'rgb(223,223,223)'}
	},
	init : function () {
		var o = new ButtonImg(null, null, null, null, null, null, null, null, null, null, null);
		var w1 = o.getW1(), h1 = o.getH1(), w2 = o.getW2(), h2 = o.getH2(), l = o.getL(), t = o.getT();
		$obj.inherit(this.css['.btn0,.btnD,.btnM,.btnT,.btnU'], {
			'border-width': o.be + 'px',
			'width'       : o.w + 'px',
			'height'      : o.h + 'px'
		});
		$obj.inherit(this.css['.btn1,.btn2'], {
			'border-width': o.b + 'px'
		});
		$obj.inherit(this.css['.btn1'], {
			'width'       : w1 + 'px',
			'height'      : h1 + 'px'
		});
		$obj.inherit(this.css['.btn2'], {
			'width'       : w2 + 'px',
			'height'      : h2 + 'px'
		});
		$obj.inherit(this.css['.labe'], {
			'width'       : w2 + 'px',
			'height'      : h2 + 'px',
			'line-height' : h2 + 'px'
		});
		$obj.inherit(this.css['.btnD .labe,.btnT .labe,.btnU .labe'], {
			'margin-left'        : o.dx + 'px',
			'margin-top'       : o.dy + 'px'
		});
		$obj.inherit(this.css['.icon'], {
			'width'       : o.iw + 'px',
			'height'      : o.ih + 'px'
		});
		$obj.inherit(this.css['.btn0 .icon, .btnM .icon'], {
			'margin-left' : l + 'px',
			'margin-top'  : t + 'px'
		});
		$obj.inherit(this.css['.btnD .icon,.btnT .icon,.btnU .icon'], {
			'margin-left' : (l + o.dx) + 'px',
			'margin-top'  : (t + o.dy) + 'px'
		});
		$obj.inherit(this.css['.rai'], {
			'height' :      (o.h + 2 * o.be)  + 'px'
		});
		$obj.inherit(this.css['.rai .env'], {
			'height' :      (o.h + 2 * o.be)  + 'px'
		});
		$obj.inherit(this.css['.rai .rub'], {
			'height' : o.h  + 'px'
		});
		this.integrCss();
	},
	integrCss : function () {
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
		for (sel in $$gui.css) {
			this.insertRule(she, sel, f1($$gui.css[sel])+';', i++);
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
};