// **********************************************************************************************************************
//
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
//
// File:			testjs.js
// Created:			11/10/2011
// Author:			Mike
// Project:			HTML5
// Description:		Loading bar replacement sample!
//
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 11/10/2011		V1.0		MJD		1st version.
//
// **********************************************************************************************************************

function Deg2Rad(_deg) { return _deg * (Math.PI / 180.0); }


// #############################################################################################
/// Function:<summary>
///          	Simple function to center some text
///          </summary>
///
/// In:		<param name="_graphics">2D Graphics context</param>
/// In:		<param name="x">X coordinate</param>
///			<param name="y">Y coordinate</param>
///			<param name="colour">Colour of text</param>
///			<param name="text">text to draw!</param>
///				
// ############################## ###############################################################
function jsDrawCenteredText(_graphics, x, y, colour, text) {
	_graphics.fillStyle = colour;
	_graphics.lineStyle = colour;
	_graphics.font = "14px Verdana"; ;
	_graphics.textAlign = "center";
	_graphics.fillText(text, x, y);
	_graphics.textAlign = "left";
}


// #############################################################################################
/// Function:<summary>
///          	Draw the "standard" loading bar!
///          </summary>
///
/// In:		<param name="_graphics">Handle to the graphics context</param>
///			<param name="_width">width of canvas</param>
///			<param name="_height">height of canvas</param>
///			<param name="_total">Total number of files being loaded</param>
///			<param name="_current">Current count to have loaded</param>
///			<param name="_loadingscreen">The loading screen "image" handle</param>
///				
// #############################################################################################
function RenderLoadingBar_Standard(_graphics, _width,_height, _total, _current, _loadingscreen) {
		// Clear screen
		_graphics.fillStyle = "rgba(21,21,21,255)";
		_graphics.fillRect(0, 0, _width, _height);
		
	// If we have a loading screen, draw that instead of the loading bar.
		var barwidth = (_width / 100) * 50;				// Loading bar 50% width of screen
		var barheight = 5;                              // Loading bar only 2 pixels high
		var x = (_width - barwidth) / 2;				// center the loading bar
		var y = 10 + 7*(_height - barheight) / 8;			// and the move it down fro the text a little
		var w = (barwidth / _total) * _current;

		// Clear screen
		_graphics.fillStyle = "rgba(21,21,21,255)";
		_graphics.fillRect(0, 0, _width, _height);

		_graphics.drawImage(_loadingscreen, 0, 0, _width, _height);

		// Only draw the bar once "something" has loaded in.
		if (_current != 0)
		{
			// Draw the dark gray bar
			_graphics.fillStyle = "rgba(64,64,64,255)";
			_graphics.fillRect(x, y, barwidth, barheight);

			// Now draw the loaded files bar over the top.
			_graphics.fillStyle = "rgba(128,48,255,255)";
			_graphics.fillRect(x, y, w, barheight);
		}

		// Finally, draw the text.
		var pct = Math.round((100 * _current / _total));

		jsDrawCenteredText(_graphics, _width / 2, 7*(_height / 8), "rgba(0,0,0,255)", "Loading..."+pct.toFixed()+"%");
}




// #############################################################################################
/// Function:<summary>
///          	Draw the "custom" loading bar!
///          </summary>
///
/// In:		<param name="_graphics">Handle to the graphics context</param>
///			<param name="_width">width of canvas</param>
///			<param name="_height">height of canvas</param>
///			<param name="_total">Total number of files being loaded</param>
///			<param name="_current">Current count to have loaded</param>
///			<param name="_loadingscreen">The loading screen "image" handle</param>
///				
// #############################################################################################
function RenderLoadingBar_Custom(_graphics, _width, _height, _total, _current, _loadingscreen) {
		// Clear screen
		_graphics.fillStyle = "rgba(21,21,21,255)";
		_graphics.fillRect(0, 0, _width, _height);

		 _width = 640;
		 _height = 320;
		 
	// If we have a loading screen, draw that instead of the loading bar.
		var barwidth = (_width / 100) * 50;				// Loading bar 50% width of screen
		var barheight = 5;                              // Loading bar only 2 pixels high
		var x = (_width - barwidth) / 2;				// center the loading bar
		var y = 10 + 3 * (_height - barheight) / 4;			// and the move it down fro the text a little
		var w = (barwidth / _total) * _current;


		//_graphics.drawImage(_loadingscreen, 0, 0, _width, _height);

		// Only draw the bar once "something" has loaded in.
		if (_current != 0)
		{
			// Draw the dark gray bar
			_graphics.fillStyle = "rgba(64,64,64,255)";
			_graphics.fillRect(x, y, barwidth, barheight);

			// Now draw the loaded files bar over the top.
			_graphics.fillStyle = "rgba(141,143,144,255)";
			_graphics.fillRect(x, y, w, barheight);
		}

		// Finally, draw the text.
		var pct = Math.round((100 * _current / _total));
		jsDrawCenteredText(_graphics, _width / 2, 3*(_height / 4), "rgba(141,143,144,255)", "Loading..."+pct.toFixed()+"%");

}

