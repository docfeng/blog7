test.wsc
```
<?Component error=true debug="true"?>
<Component id="test">
	<registration description="test" version="1.00" progid="hello.world" 
	clsid="{46dac711-0b77-43b2-b195-1ee912dcb322}">
	</registration>
	<public>
		<property name="testStr" />
		<method name="add">
			<parameter name="x" />
			<parameter name="y" />
		</method>
		<method name="obj">
			<parameter name="x" />
			<parameter name="y" />
		</method>
	</public>
	<script>
		var testStr="默认值";
		
		obj=function(){
			return function(x,y){
				this.y=y;
				this.x=x;
				return add(x, y);
			}
		}
		
		function add(x, y)
		{
 			return x+" + "+y+" = "+(x+y);
		}
	</script>
</Component>
```
使用方法1.
```
var com=GetObject("script:E:\\其他文件\\wsc\\test.wsc");

var b=com.obj()
alert(b(2,7))

alert(com.add(2,7))
```
使用方法2.
```
右键>注册
var com=new ActiveXObject("hello.world");

alert(com.add(2,7))

```


wsc.hta
```
<html>
<head>
<meta http-equiv="Content-Type" content="application/xhtml+xml;charset=utf-8" />
<script src="wsc1.js"></script>
<script>
	//var com=new ActiveXObject("hello.world");
	//com=GetObject("script:E:\\其他文件\\wsc\\test.wsc#hello.world")
	window.onload=function(){
		//alert("script:E:/其他文件/wsc/test.wsc")
		//com=GetObject("script:E:/其他文件/wsc/test.wsc");
	}
	
	com=GetObject("script:E:\\其他文件\\wsc\\test.wsc")
	fun1=function(){
		var b=com.obj()
		alert(b(2,7))
	}
	var fun2=function(){
		alert(com.add(2,7))
	}
	var fun3=function(){
		//无效
		var b=com.obj()
		b(2,7);
		alert(window.y + window.x);
	}
	var fun4=function(){
		var b=com.obj();
		var a=new b(2,7)
		alert(a.y + a.x);
	}
</script>
</head>
<body >

	<input type=button value="eval" onclick="eval(t1.innerHTML)" />
	<input type=button value="add1" onclick="fun1()" />
	<input type=button value="add2" onclick="fun2()" />
	<input type=button value="add3" onclick="fun3()" />
	<input type=button value="add4" onclick="fun4()" /><br/>
	<textarea id=t1 style="height:1000px;width:500px"></textarea><br/>
</body>
</html>
```
wsc.js
```
//var com=new ActiveXObject("hello.world");
com=GetObject("script:E:\\其他文件\\wsc\\test.wsc")
//com=GetObject("script:E:\\其他文件\\wsc\\test.wsc#hello.world")
//a=new (com.obj())(2,7)
//a=new a(2,4)

//alert(a.y + a.x);
//alert(com.add(84,25));


//WSH.Echo(a.y + a.x);
//WSH.Echo(com.add(84,25));
```



