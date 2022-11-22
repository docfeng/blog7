var get_frames=function(win){
	var get_sub=function(ifr,windows){
		var win=ifr.contentWindow||ifr.window
		if(!win)return 0;
		windows.push(win)
		var ifr=win.frames
		for (var i = 0; i < ifr.length; i++) {
			get_sub(ifr[i],windows)
		}
	}
	var ifr=win.frames
	var windows=[]
	windows.push(win)
	for (var i = 0; i < ifr.length; i++) {
		get_sub(ifr[i],windows)
	}
	return windows;
}
//var windows=get_frames(window);

/* alert(windows.length)
for (var i = 0; i < windows.length; i++) {
	alert(windows[i].location)
	//alert(windows[i].document.documentElement.innerHTML)
} */
var get_forms=function(win){
	var windows=get_frames(win);
	var forms2=[];
	for (var i = 0; i < windows.length; i++) {
		var fs=windows[i].document.forms;
		for (var i2 = 0; i2 < fs.length; i2++) {
			forms2.push(fs[i2]);
		}
		//alert(windows[i].document.documentElement.innerHTML)
	}
	return forms2;
}
var forms2=get_forms(IE.ie.document.parentWindow);
alert(forms2.length)
for (var i = 0; i < forms2.length; i++) {
	var eles=forms2[i].elements;
	alert(eles.length)
	var re=""
	for (var i2 = 0; i2 < eles.length; i2++) {
		var ele =eles[i2];
		re+="type:"+ele.type +";name:"+ele.name +";value:"+ele.value+"\n"
	}
	alert(re)
}
alert(IE.ie.document.parentWindow.document.forms.length)