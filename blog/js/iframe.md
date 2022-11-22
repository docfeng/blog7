# iframe动态创建及释放内存


/**
 * 动态创建iframe
 * @param dom 创建iframe的容器，即在dom中创建iframe。dom能够是div、span或者其它标签。
 * @param src iframe中打开的网页路径
 * @param onload iframe载入完后触发该事件。能够为空
 * @return 返回创建的iframe对象
*/
function createIframe(dom, src, onload){
	//在document中创建iframe
	var iframe = document.createElement("iframe");
	
	//设置iframe的样式
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.margin = '0';
	iframe.style.padding = '0';
	iframe.style.overflow = 'hidden';
	iframe.style.border = 'none';
	
	//绑定iframe的onload事件
	if(onload && Object.prototype.toString.call(onload) === '[object Function]'){
		if(iframe.attachEvent){
			iframe.attachEvent('onload', onload);
		}else if(iframe.addEventListener){
			iframe.addEventListener('load', onload);
		}else{
			iframe.onload = onload;
		}
	}
	
	iframe.src = src;
	//把iframe载入到dom以下
	dom.appendChild(iframe);
	return iframe;
}

/**
 * 销毁iframe，释放iframe所占用的内存。

 * @param iframe 须要销毁的iframe对象
*/
function destroyIframe(iframe){
	//把iframe指向空白页面，这样能够释放大部分内存。
	iframe.src = 'about:blank';
	try{
		iframe.contentWindow.document.write('');
		iframe.contentWindow.document.clear();
	}catch(e){}
	//把iframe从页面移除
	iframe.parentNode.removeChild(iframe);
}
function createIframe(){
        const iframe = document.createElement("iframe");
        iframe.src = "iframe.html";
        iframe.id = "ifr";
        document.getElementById("content").appendChild(iframe);
        console.log("创建iframe完成");
    }
    
    function closeIframe(){
        let iframe = document.getElementById("ifr");
        iframe.src = "about:blank";
        iframe.contentWindow.document.write('')
        iframe.contentWindow.document.clear();
        iframe.contentWindow.close();
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }
