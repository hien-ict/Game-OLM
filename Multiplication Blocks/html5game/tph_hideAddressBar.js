function browserHasWebGLSupport()
{
	try {
	  canvas = document.getElementById('canvas');
	  ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	  return (ctx!==undefined);
	}
	catch (e) {
	  return 0;
	}
	return 1;
}

// Hide the address bar
function jchtml5_hide_address_bar(){
	if(!window.location.hash){
		var divh = document.getElementById('gm4html5_div_id').style.height;
		if (divh < (window.outerHeight + 200)){
			document.getElementById('gm4html5_div_id').style.height = (window.outerHeight + 200) + 'px';
		}
		setTimeout ( function(){ window.scrollTo(0,1); },50);
	}
}