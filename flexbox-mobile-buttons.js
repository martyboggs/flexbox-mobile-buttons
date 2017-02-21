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
		this.clicking[value] = false;
		var button = document.createElement('button');
		button.className = 'fmb-button';
		if (value) button.value = value;
		if (display) button.innerHTML = display;
		if (!button.innerHTML && value) button.innerHTML = value;
		if (type === 'wide') button.className += ' fmb-wide';
		this.container.appendChild(button);
		return this;
	},
	fullscreen: function (element, display) {
		this.clicking.fullscreen = false;
		var button = document.createElement('button');
		button.className = 'fmb-button fmb-fullscreen';
		button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><polygon points="70,100 100,100 100,70" fill="#000000"/><polygon style="" points="0,70 0,100 30,100" fill="#000000"/><polygon points="30,0 0,0 0,30" fill="#000000"/><polygon points="100,0 70,0 100,30" fill="#000000"/></svg>';
		if (display) button.innerHTML = display;
		this.container.appendChild(button);
		if (!element) element = document.getElementsByTagName('canvas')[0];

		var self = this;

		button.addEventListener('click', toggleFullscreen);
		button.addEventListener('touchstart', function (e) {
			self.clicking.fullscreen = true;
		});
		button.addEventListener('touchend', toggleFullscreen);

		// document.addEventListener('fullscreenchange', toggleFullscreen);
		// document.addEventListener('webkitfullscreenchange', toggleFullscreen);
		// document.addEventListener('mozfullscreenchange', toggleFullscreen);
		// document.addEventListener('MSFullscreenChange', toggleFullscreen);
		function toggleFullscreen(e) {
			if (e.type === 'touchend') {
				if (!self.clicking.fullscreen) return;
				self.clicking.fullscreen = false;
			}
			var i = element;
			if (i.requestFullscreen) i.requestFullscreen();
			else if (i.webkitRequestFullscreen) i.webkitRequestFullscreen();
			else if (i.mozRequestFullScreen) i.mozRequestFullScreen();
			else if (i.msRequestFullscreen) i.msRequestFullscreen();
		}
		// function isFullscreen() {
		// 	return document.fullscreenElement ||
		// 	document.webkitFullscreenElement ||
		// 	document.mozFullScreenElement ||
		// 	document.msFullscreenElement;
		// }

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
