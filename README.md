Load the script and css files.

```html
<link type="text/css" rel="stylesheet" href="flexbox-mobile-buttons.js">
<script src="flexbox-mobile-buttons.css"></script>
```

Create a new instance and include the location for the buttons to embed.

```javascript
var fmb = new FlexboxMobileButtons({
	parent: document.getElementById('canvases'),
	mobileOnly: false
});
```

Create your buttons by chaining the optional `row()` method and `button()`.

Special keywords `*UP` `*DOWN` `*LEFT` and `*RIGHT` will load super fast svg arrows.

Include a second parameter to display something besides a string.

The `fullscreen()` method adds a fullscreen API integration. Include the element you wish to fill your screen.

```javascript
fmb.row().button('*UP')
	.row().button('*LEFT')
	.button('*DOWN')
	.button('*RIGHT')
	.row().button('J', 'FIRE!', 'wide')
	.fullscreen(renderer.domElement)
	.init();
```
