用js控制ie弹窗
1.alert prompt confirm
    重写方法:
    window.alert=function(a){
      return true;
    }
2. showModalDialog
    重写方法:
    var  show1=window.showModalDialog
    window.showModalDialog=function(url,arg,css){
        var url1="debug.html"//自己的html
        return show1(url1,[arg,url],css);
    }
    在debug.html中:
    获取 arg,url
    var win=window.open(url,"window_name_1")
    window.returnValue=win.returnValue;
    
    
3. showModelessDialog
    返回的是window对象
    用定时setTimeout或事件onload或readystate进行操作
    
https://blog.csdn.net/yangchaofeng1229/article/details/6723244
    vReturnValue = window.showModalDialog(sURL [, vArguments] [,sFeatures])
    vReturnValue = window.showModelessDialog(sURL [, vArguments] [,sFeatures])
    重写方法
    window.showModalDialog=function(url,arg,css){
        var win=window.open(url,"window_name_1")
        
        return 
    }
    
    
    
用js控制ie表单
1. 主页面
    document.forms对象
    遍历forms
    添加onsubmit事件监听
    获取表单内容
2. iframe页面中
    获取document.frames对象
    [判断是否跨域]
    遍历iframe
    同1
3. 弹窗中
    重写方法
    同1
4. ajax
    重写xmlhttp
	

实现方法
1. 遍历iframe
	var ifr=win