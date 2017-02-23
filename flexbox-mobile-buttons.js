/**
 * @author Marty Boggs / http://www.threejsworld.com
 */
function FlexboxMobileButtons(args) {
	this.args = args || {};
	var defaults = {
		mobileOnly: false,
		onclick: onclick,
		offclick: offclick,
		parent: document.body
	};
	this.args = Object.assign(defaults, this.args);
	if (this.args.mobileOnly)
		this.isMobile = checkMobile();
	this.element = document.createElement('div');
	this.element.className = this.element.id = 'fmb-container';
	this.args.parent.append(this.element);

	this.containers = [];
	this.container = this.element;
	this.clicking = {};
	var self = this;

	this.element.addEventListener('mousedown', buttonOnClick);

	this.element.addEventListener('touchstart', buttonOnClick);
	document.addEventListener('touchend', buttonOffClick);

	function checkMobile() {
		return n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i) || n.match(/Windows Phone/i);
	}

	function isButton(target) {
		return target.className.indexOf('fmb-button') !== -1;
	}

	function onclick(value) {
		self.clicking[value] = true;
	}
	function offclick(value) {
		self.clicking[value] = false;
	}

	function buttonOnClick(e) {
		e.preventDefault();
		if (e.type === 'touchstart') {
			for (var i = 0; i < e.touches.length; i += 1) {
				if (isButton(e.touches[i].target)) {
					self.args.onclick(e.touches[i].target.value);
				}
			}
		} else {
			document.addEventListener('mouseup', buttonOffClick);
			document.addEventListener('mouseout', buttonOffClick);
			if (isButton(e.target)) {
				self.args.onclick(e.target.value);
			}
		}
	}

	function buttonOffClick(e) {
		if (e.type === 'touchend') {
			for (var i = 0; i < e.changedTouches.length; i += 1) {
				if (isButton(e.changedTouches[i].target)) {
					self.args.offclick(e.changedTouches[i].target.value);
				}
			}
			e.touches
		} else {
			document.removeEventListener('mouseup', buttonOffClick);
			document.removeEventListener('mouseout', buttonOffClick);
			self.args.offclick(e.target.value);
		}
	}
}

FlexboxMobileButtons.prototype = {
	button: function (value, display, type) {
		if (!value) return;
		this.clicking[value] = false;
		var button = document.createElement('button');
		button.className = 'fmb-button';
		if (value) button.value = value;
		if (display) button.innerHTML = display;
		if (value && !display) {
			switch (value) {
				case 'UP': button.innerHTML = '<svg viewBox="0 0 100 100" xml:space="preserve"><polygon points="27,64 50,40 73,64" fill="#000000"/></svg>'; break;
				case 'DOWN': button.innerHTML = '<svg viewBox="0 0 100 100" xml:space="preserve"><polygon transform="rotate(180, 50, 50)" points="27,64 50,40 73,64" fill="#000000"/></svg>'; break;
				case 'LEFT': button.innerHTML = '<svg viewBox="0 0 100 100" xml:space="preserve"><polygon transform="rotate(270, 50, 50)" points="27,64 50,40 73,64" fill="#000000"/></svg>'; break;
				case 'RIGHT': button.innerHTML = '<svg viewBox="0 0 100 100" xml:space="preserve"><polygon transform="rotate(90, 50, 50)" points="27,64 50,40 73,64" fill="#000000"/></svg>'; break;
			}
		}
		if (!button.innerHTML && value) button.innerHTML = value;
		if (type === 'wide') button.className += ' fmb-wide';
		this.container.appendChild(button);
		return this;
	},
	fullscreen: function (element, display) {
		this.clicking.fullscreen = false;
		var button = document.createElement('button');
		button.className = 'fmb-button fmb-fullscreen';
		button.innerHTML = '<svg viewBox="0 0 100 100"><polygon points="70,100 100,100 100,70" fill="#000000"/><polygon style="" points="0,70 0,100 30,100" fill="#000000"/><polygon points="30,0 0,0 0,30" fill="#000000"/><polygon points="100,0 70,0 100,30" fill="#000000"/></svg>';
		if (display) button.innerHTML = display;
		this.container.appendChild(button);
		if (!element) element = document.getElementsByTagName('canvas')[0];
		if (!element) return;

		var self = this;

		var prefix = getPrefix(element);
		var fullscreen = {
			none: {request: element.requestFullscreen, event: 'fullscreenchange'},
			webkit: {request: element.webkitRequestFullscreen, event: 'webkitfullscreenchange'},
			moz: {request: element.mozRequestFullScreen, event: 'mozfullscreenchange'},
			ms: {request: element.msRequestFullscreen, event: 'MSFullscreenChange'}
		};

		button.addEventListener('mousedown', function (e) {
			self.clicking.fullscreen = true;
		});
		button.addEventListener('touchstart', function (e) {
			self.clicking.fullscreen = true;
		});
		button.addEventListener('mouseup', toggleFullscreen);
		button.addEventListener('touchend', toggleFullscreen);
		document.addEventListener(fullscreen[prefix].event, toggleFullscreen);

		function toggleFullscreen(e) {
			if (e.type === 'mouseup' || e.type === 'touchend') {
				if (!self.clicking.fullscreen) return;
				self.clicking.fullscreen = false;
			}
			fullscreen[prefix].request.call(element, function () {});
		}
		function getPrefix(i) {
			if (i.requestFullscreen) return 'none';
			else if (i.webkitRequestFullscreen) return 'webkit';
			else if (i.mozRequestFullScreen) return 'moz';
			else if (i.msRequestFullscreen) return 'ms';
		}
		return this;
	},

	pointerLock: function (element, display) {
		this.clicking.pointerLock = false;
		var button = document.createElement('button');
		button.className = 'fmb-button fmb-pointerLock';
		button.innerHTML = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" stroke="black" stroke-width="5" fill="none" /><path transform="translate(33, 33) scale(0.05, 0.05)" d="M4.338,3.988l-0.3,0.3c-3.8,3.8-5,9.6-3.1,14.6l262.2,682.1c2,5.2,7,8.7,12.601,8.8c5.6,0.101,10.699-3.3,12.8-8.399 l83.3-200.2l259.4,259.4c7.8,7.8,20.5,7.8,28.3,0c27.8-27.801,73.2-73.2,101-101c7.8-7.801,7.8-20.5,0-28.301l-259.3-259.399 l200.1-83.3c5.2-2.2,8.5-7.2,8.4-12.8l0,0c-0.101-5.6-3.601-10.6-8.801-12.6l-682-262.3C13.838-1.012,8.138,0.188,4.338,3.988z"/></svg>';
		if (display) button.innerHTML = display;
		this.container.appendChild(button);
		if (!element) element = document.getElementsByTagName('canvas')[0];
		if (!element) return;

		var self = this;

		var prefix = getPrefix(element);
		var pointerLock = {
			none: {request: element.requestPointerLock, event: 'pointerlockchange'},
			moz: {request: element.mozRequestPointerLock, event: 'mozpointerlockchange'}
		};

		button.addEventListener('click', togglePointerLock);
		document.addEventListener(pointerLock[prefix].event, pointerLockChanged);

		function togglePointerLock(e) {
			pointerLock[prefix].request.call(element);
			document.addEventListener('mousemove', moveCallback);
		}
		function pointerLockChanged(e) {
			if (!document.pointerLockElement && !document.mozPointerLockElement) {
				document.removeEventListener('mousemove', moveCallback);
			}
		}
		function moveCallback(e) {
			self.clicking.pointerLock = e;
		}
		function getPrefix(i) {
			if (i.requestPointerLock) return 'none';
			else if (i.mozRequestPointerLock) return 'moz';
		}
		return this;
	},
	row: function () {
		this.container = document.createElement('div');
		this.container.className = 'fmb-row';
		this.containers.push(this.container);
		return this;
	},
	init: function () {
		if (this.args.mobileOnly && !this.isMobile) return;
		for (var i = 0; i < this.containers.length; i += 1) {
			this.element.appendChild(this.containers[i]);
		}
		return this;
	}
};
