

## Installation

![Flexbox Mobile Buttons](https://www.github.com/martyboggs/flexbox-mobile-buttons/blob/master/screenshot.jpg?raw=true "flexbox mobile buttons")

Load the script and css files.

```html
<link type="text/css" rel="stylesheet" href="flexbox-mobile-buttons.css">
<script src="flexbox-mobile-buttons.js"></script>
```

Create a new instance and include the location for the buttons to embed. Optionally display mobile only and include custom callbacks.

```javascript
var fmb = new FlexboxMobileButtons({
	parent: document.getElementById('canvases'),
	mobileOnly: false,
	onclick: function (value) {},
	offclick: function (value) {}
});
```

Create your buttons by chaining the optional `row()` method and `button()`.

Special values `UP`, `DOWN`, `LEFT` and `RIGHT` will load super fast svg arrows, but you can override the display with the second parameter.

The `fullscreen()` method adds a Fullscreen API integration. Include the element you wish to fill your screen.

```javascript
fmb.row().button('UP')
	.row().button('LEFT')
	.button('DOWN')
	.button('RIGHT')
	.row().button('J', 'FIRE!', 'wide')
	.fullscreen(renderer.domElement)
	.init();
```

By default, the fmb.clicking object will track which buttons are being pressed. Use event delegation in your render function to control your objects.

```javascript
function render() {
	if (fmb.clicking.UP) {
		octopus.position.y += 0.1;
	}

	updateScene();
	requestAnimationFrame(render);
}
render();
```
