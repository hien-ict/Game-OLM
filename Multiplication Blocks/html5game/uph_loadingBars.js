/***************************************

	JCHTML5 Loading Bars
	http://www.juicycraft.com/jchtml5
	Follow me! @SamWhillance

***************************************/

// The colours of the loading screen
// Get your HEX colours at http://www.colorpicker.com
var colourBackground = "rgba(0,0,0,255)";					// "#242424";	//"#3796E3";			//This is your base colour (Change this)
var colourText = "rgba(255,255,255,255)";								// shadeColor(colourBackground,70);			//This is calculated from your base colour (but can be a custom HEX)
var colourLoadingBack = "rgba(64,64,64,255)";				// shadeColor(colourBackground,-10);	//This is calculated from your base colour (but can be a custom HEX)
var colourLoadingFront = "rgba(128,48,255,255)";  			//shadeColor(colourBackground,70);	//This is calculated from your base colour (but can be a custom HEX)

// If 'loading_bar_smoother' is not defined, define it
if (typeof loading_bar_smoother === 'undefined') {
    var loading_bar_smoother = 0;
}

// Hide the loading bar image (called when the game has finished loading)
function jchtml5_hide_loading_image() {
	document.body.style.backgroundColor = colourBackground;

	//Hide the loading image
	var element = document.getElementById('loading_image_div');
	if (element != null) {
		element.style.display = 'none';
	}

	//Hide the canvas
	var _canvas = document.getElementById("gm4html5_div_id");
	if (_canvas != null) {
		_canvas.style.display = 'none';
	}
}

function jchtml5_show_canvas() {
	//Show the canvas
	var _canvas = document.getElementById("gm4html5_div_id");
	if (_canvas != null) {
		_canvas.style.display = 'block';
	}
}

function jsDrawCenteredText(_graphics, x, y, colour, text) {
	_graphics.fillStyle = colour;
	_graphics.lineStyle = colour;
	_graphics.font = "14px Verdana"; ;
	_graphics.textAlign = "center";
	_graphics.fillText(text, x, y);
	_graphics.textAlign = "left";
}

// Your Own Custom Loading Bar (Copy code from the loading bars below to make your own)
function jchtml5_custom_loading_bar(_graphics, _width, _height, _total, _current, _loadingscreen)
{
	var scaleLoadingImage = true;
	
	if(window.innerWidth < _width) 		_width = window.innerWidth;
	if(window.innerHeight < _height)	_height = window.innerHeight;
		
	_canvas = document.getElementById("canvas");

	var element = document.getElementById('GM4HTML5_loadingscreen');

	_graphics.fillStyle = colourBackground;
	_graphics.clearRect ( 0 , 0 , _width , _height );
/*

	if (_canvas.width != _width || _canvas.height != _height)
	{
		// Set the canvas size
		_canvas.width = _width;
		_canvas.height = _height;

		_graphics = _canvas.getContext("2d");
		
		// Fill entire screen with colour
		_graphics.fillStyle = colourBackground;
		_graphics.fillRect(0, 0, _width, _height);
	}
*/
	//_graphics = _canvas.getContext("2d");

	// Fill entire screen with colour
	_graphics.fillStyle = colourBackground;
	_graphics.fillRect(0, 0, _width, _height);

	//
	// check aspect ratio of the loading image
	//
	var ww = element.width;
	var hh = element.height;
	var xpos = 0;
	var ypos = 0;
	
	if(scaleLoadingImage) {
		ww = _width;
		hh = _height;

		if(abs( (element.width/element.height) - (ww/hh) )>0.05) {
			ww = parseInt(hh * (element.width/element.height));
			if(ww > _width) {
				ww = _width;
				hh = parseInt(ww / (element.width/element.height));
			}
		}
	}
	
	xpos = parseInt(_width-ww)/2;
	ypos = parseInt(_height-hh)/2;

	_graphics.drawImage(_loadingscreen, 0, 0, element.width, element.height, xpos, ypos, ww, hh);

	// Calculate loading bar position and size
	var barwidth = (_width / 100) * 50;				// Loading bar 50% width of screen
	var barheight = 4;                              // Loading bar only 2 pixels high
	var barX = (_width - barwidth) / 2;				// center the loading bar
	var barY = 10 + 7*(_height - barheight) / 8;			// and the move it down fro the text a little
	var w = (barwidth / _total) * _current;

	// Draw the loading bar (full)
	//_graphics.fillStyle = colourLoadingBack;
	//_graphics.fillRect(barX, barY, barW, barH);

	// Work out the completion status
	var fillW = Math.round((barwidth / _total) * _current);

	//Make the loading bar smooth
	//if (loading_bar_smoother < fillW){
	//	loading_bar_smoother += 4;
	//}

	// Draw the loading bar (current) if something has loaded
	if (_current != 0)
	{
		// Draw the dark gray bar
		_graphics.fillStyle = colourLoadingBack;
		_graphics.fillRect(barX, barY, barwidth, barheight);

		// Now draw the loaded files bar over the top.
		_graphics.fillStyle = colourLoadingFront;
		_graphics.fillRect(barX, barY, w, barheight);
	}

	// Finally, draw the text.
	var pct = Math.round((100 * _current / _total));

	jsDrawCenteredText(_graphics, _width / 2, 7*(_height / 8), colourText, "Loading..."+pct.toFixed()+"%");
}

// Full screen Loading Bar (WebGL OFF)
function jchtml5_fullscreen_loading_bar(_graphics, _width, _height, _total, _current, _loadingscreen){
	// Make the loading bar image visible
	var element = document.getElementById('loading_image_div');

	if (element != null) {
		element.style.display = 'block';
	}

	_width = window.innerWidth;
	_height = window.innerHeight;
	_canvas = document.getElementById("canvas");

	_graphics.clearRect ( 0 , 0 , _width , _height );

	if (_canvas.width !== _width || _canvas.height !== _height)
	{
		// Set the canvas size
		_canvas.width = _width;
		_canvas.height = _height;

		// Fill entire screen with colour
		_graphics.fillStyle = colourBackground;
		_graphics.fillRect(0, 0, _width, _height);
	}

	_graphics = _canvas.getContext("2d");

	// Fill entire screen with colour
	_graphics.fillStyle = colourBackground;
	_graphics.fillRect(0, 0, _width, _height);

	// Calculate loading bar position and size
	var barW = Math.round(_width / 4);
	var barH = Math.max(Math.round(_height / 40), 4);
	var barX = Math.round((_width - barW) / 2);
	var barY = Math.round((_height - barH) / 1.75);

	// Draw the loading bar (full)
	_graphics.fillStyle = colourLoadingBack;
	_graphics.fillRect(barX, barY, barW, barH);

	// Work out the completion status
	var fillW = Math.round((barW / _total) * _current);

	//Make the loading bar smooth
	if (loading_bar_smoother < fillW){
		loading_bar_smoother += 4;
	}

	// Draw the loading bar (current) if something has loaded
	if (_current !== 0){
		_graphics.fillStyle = colourLoadingFront;
		_graphics.fillRect(barX, barY, loading_bar_smoother, barH);
	}
}

// Loading Bar (WebGL ON)
function jchtml5_webgl_loading_bar(_graphics, _width, _height, _total, _current, _loadingscreen){
	_canvas = document.getElementById("canvas");
	_width = _canvas.width;
	_height = _canvas.height;

	_graphics.clearRect ( 0 , 0 , _width , _height );

	// Fill canvas with colour
	_graphics.fillStyle = colourBackground;
	_graphics.fillRect(0, 0, _width, _height);

	if (_current == 0){
		_graphics.font = "20px Arial";
		_graphics.fillStyle = colourText;
		_graphics.textAlign ="center";
		_graphics.fillText("Loading",_width / 2,(_height / 2) - 30);
	}

	// Calculate loading bar position and size
	var barW = Math.round(_width / 4);
	var barH = Math.max(Math.round(_height / 40), 4);
	var barX = Math.round((_width - barW) / 2);
	var barY = Math.round((_height - barH) / 2);

	// Draw the loading bar (full)
	_graphics.fillStyle = colourLoadingBack;
	_graphics.fillRect(barX, barY, barW, barH);

	// Work out the completion status
	var fillW = Math.round((barW / _total) * _current);

	if (loading_bar_smoother < fillW){
		loading_bar_smoother += 4;
	}

	// Draw the loading bar (current) if something has loaded
	if (_current !== 0){
		_graphics.fillStyle = colourLoadingFront;
		_graphics.fillRect(barX, barY, loading_bar_smoother, barH);

		_graphics.font = "20px Arial";
		_graphics.textAlign="center";
		_graphics.fillText("Loading",_width / 2,(_height / 2) - 30);
	}
}

//Shade a colour given to me
function shadeColor(color, percent) {
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}