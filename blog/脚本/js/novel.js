/*
 * @name: 小说阅读模式
 * @Author: 酷安@达蒙山
 * @version: 191014.16
 * @description: 小说阅读模式
 * @include: *
 * @createTime: 2019-10-14 00:00:00
 * @updateTime: 2019-10-14 16:00:00
 */
! function() {
	/*《小说阅读模式v3.3》【使用说明】：按钮开关“[Ξ]”是上滑隐藏、下滑显示的，进入阅读模式后的设置按钮“M”同。【参考】：阅读模式→酷安 fangsiyuan《纯文本阅读模式》；按钮隐藏→酷安 谷花泰《仿酷安回到顶部/底部（增强版）》；主题→话本小说网;酷安 石头VS影子 提供历史记录方法……感谢评论区的建议反馈*/
	var zhdx = 20; /*20为字体初始大小*/
	var zhcz = 6; /*6为字行差值，该值与字体大小之和作为行高*/
	var zhbj = 4; /*4为显示边距*/
	var djkh = 1; /*段落之间是否空行，0否1是*/
	var cszt = "#e3edcd-#000"; /*初始主题，主题格式：背景色-字体颜色。单独颜色值则为背景色且字体为黑色*/
	var ztss =
		"#FFCBE8-#C71585;#fce4ec-#880e4f;#CCE2BF-green;#e0f2f1-#004d40;#e1f5fe-#01579b;#494949-#C1C1C1;#1a1c23-#c6c7c8;#000000-#bbbbbb;#C7EDCC;#DCECD2;#f4f0e9;#fff"; 
		/*本脚本所有主题集，主题之间“;”隔开*/
	var $ = function(e) {
			return document.querySelector(e)
		};
	var	ydcss = "display:none;text-align:center !important;font-size:20px;width:28px;height:28px;line-height:28px;text-align:center;float:right;position:fixed;right:10px;top:70%;color:#000;opacity:0.8;background:#e3edcd;cursor:pointer;position:fixed !important;z-index:9999999999 !important;box-shadow:0px 1px 1px #000;border-radius:50%;";
	if (!$("#txtyd")) {
		var ydan = document.createElement("span");
		ydan.id = "txtyd";
		ydan.innerHTML = "[\u039e]";
		ydan.style.cssText = ydcss;
		ydan.addEventListener("click", function() {
			jryd()
		});
		$("body").appendChild(ydan);
	}
	var hdy1, hdy2;
	document.addEventListener("contextmenu", function(e) {
		jryd()
	});
	document.addEventListener("touchstart", function(e) {
		if(e.touches.length>1){
			jryd()
		}
		hdy1 = e.changedTouches[0].clientY
	});
	document.addEventListener("touchmove", function(e) {
		hdy2 = e.changedTouches[0].clientY;
		$("#txtyd").style.display = hdy2 - hdy1 > 0 ? "block" : "none"
	});

	function jryd() {
		var wybm = $("head").innerHTML.match(/<meta.*charset.*?=.*?([^"]+).*?>/i)[1];/* 网页编码 */
		var	wyt = `
		<html>
			<head>
				<meta charset="${ wybm}">
				<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
				<style type="text/css">
					html,body{
						height:100%;
						width:100%;
						overflow-x:hidden;
						overflow-y: hidden;
					}
					*{
						padding:0px 0px;
						margin:0px 0px;
					}
					body{
						text-align:center;
						word-wrap:break-word;
					}
					#container{
						height:100%;
						width:100%;
						position:fixed;
						display: -webkit-flex;
						display: flex;
						flex-direction: column;
						flex-wrap: wrap;
						justify-content: flex-start;
						align-items: flex-start;
						align-content: flex-start;
						
					}
					#novelTextBox p{
						padding:0px ${zhbj}px;
						text-align:justify;
						margin:0;
						text-indent:2em;
					}
					#novelTextBox{
						padding:0px 0px;
						margin:0px 0px;
						height:100%;
						/*调整显示区的宽*/
						column-width: 100vw;
						-moz-column-width: 100vw;
						/* Firefox */
						-webkit-column-width: 100vw;
						/* Safari and Chrome */
						column-gap: 0px;
						-webkit-column-gap: 0px;
					
						transition-property: scrollLeft;
						transition-duration: 1s;
						transition-timing-function: linear;
						transition-delay: 1s;

						overflow-x: scroll;
						overflow-y: scroll;
						Word-break: break-all;
						//white-space:pre-wrap;
						flex:1;
					}
					.wbt{
						font-weight:bold;
					}
					#novelHTMLBox{
						width:100%;
						height:1px;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
					}
					#mess {
						width: 100%;
						height: 14px;
						flex:0 0;
					}
				</style>
				<title></title>
				<script>
					var $=function(e){
						return document.querySelector(e)
					};
					var thisurl="${location.href}",
					ksqy="${document.documentElement.clientHeight}",
					Themes="${ztss}",
					originTheme="${cszt}",
					bool_blankLine="${djkh}";/* 段落空行 */
					var lineSpace=${zhcz};
					var fontSize="${zhdx}";
				</script>
			</head>
			<body>
				<div id="container">
					<div id="mess"></div>
					<div id="novelTextBox"></div>
				</div>
				
				<div id="novelHTMLBox"></div>
				
				<div id="control" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:100;">
					<div id="left" style="width:50%;height:100%;position:fixed;top:0;left:0;z-index:100;" onclick="UI.onShowUp()"></div>
					<div id="right" style="width:50%;height:100%;position:fixed;top:0;right:0;z-index:100;" onclick="UI.onShowNext()"></div>
					<div id="centen" style="width:30%;height:30%;position:fixed;top:30%;right:30%;z-index:100;" onclick="UI.onShowSetting()"></div>
				</div>
				<span id="enterButton" style="top:80%;">M</span>
				<div id="settingBox">
					<div id="setBox" >
						<p><span id="fontSmallButton">\u3000A-\u3000</span>\u3000<span id="fontBigButton">\u3000A+\u3000</span></p>
						<p id="bgBox"></p>
						<p><span onclick="location.reload();window.scrollTo(0,0);">\u9000\u51fa\u9605\u8bfb\u6a21\u5f0f</span></p>
					</div>
				</div>
				<script>
					var upUrl;
					var nexturl=thisurl,/* url */
					
					nextTitle="",novelText,viewState,lineHeight,fysz,blankLineHTML;
					"1"==bool_blankLine?blankLineHTML="</p><br><p>":blankLineHTML="</p><p>";
					function setFontSize(e){
						$("body").style.fontSize=e+"px";
						fontSize=e;
						lineHeight=e*1+lineSpace;
						fysz=ksqy-lineHeight;
						$("body").style.lineHeight=lineHeight+"px"
					};
					setFontSize(fontSize);
					getNovelHTML(thisurl);
					
					function getNovelHTML(e){
						thisurl=e;
						var t=new XMLHttpRequest;
						t.open("get",e,true);
						t.overrideMimeType("text/html;charset=${wybm}");
						t.onreadystatechange=function(){
							if(4==t.readyState&&200==t.status){
								var html=t.responseText;
								html=html.replace(/^\\s+|\\s+$/g,"").replace(/<!--.*?-->/g,"").replace(/>\\s+?</g,"><");
								html=html.replace(/<style[\\s\\S]*?<\\/style>/ig,"").replace(/<script[\\s\\S]*?<\\/script>/ig,"").replace(/<iframe[\\s\\S]*?<\\/iframe>/ig,"");
								html=html.match(/<body[\\s\\S]*<\\/body>/i);
								$("#novelHTMLBox").innerHTML=html;
								nextTitle=t.responseText.match(/<title>([\\s\\S]*)<\\/title>/i)[1];
								nexturl=getNextUrl();
								upUrl=getUpUrl();
								formatNovelText();
							}
						};
						t.send();
					}
					function getNextUrl(){
						var nexturl;
						var s=$("#novelHTMLBox");
						var u=s.querySelectorAll("a"),
						l=u.length,
						x=/\u4e0b\u4e00\u9875|\u4e0b\u9875|\u4e0b\u8282|\u4e0b\u4e00\u9801|\u4e0b\u9801|\u4e0b\u4e00\u7ae0|\u4e0b\u7ae0/;
						if(l>0)for(var c=l-1;c>=0;c--){
							var i=u[c],a=i.innerText,f=i.href;
							if(x.test(a)&&-1==f.indexOf("#")){
								nexturl=f;
								break
							}
							nexturl=""
						}
						return nexturl;
					}
					function getUpUrl(){
						var upUrl;
						var s=$("#novelHTMLBox");
						var u=s.querySelectorAll("a"),
						l=u.length,
						x=/\u4e0a\u4e00\u9875|\u4e0a\u9875|\u4e0a\u8282|\u4e0a\u4e00\u9801|\u4e0a\u9801|\u4e0a\u4e00\u7ae0|\u4e0a\u7ae0/;
						if(l>0)for(var c=l-1;c>=0;c--){
							var i=u[c],a=i.innerText,f=i.href;
							if(x.test(a)&&-1==f.indexOf("#")){
								upUrl=f;
								break
							}
							upUrl=""
						}
						return upUrl;
					}
					function formatNovelText(){
						function hide(e){
							e.style.display="none";
						}
						function n(){
							var n=["div","span","p"];
							for(var i=0;i<n.length;i++){
								var r=s.querySelectorAll(n[i]);
								if(r.length>0){
									for(var i2=0;i2<r.length;i2++){
										r[i2].innerText.replace(/\\s+/g,"").length<8&&hide(r[i2]);
									}
								}
							}
						}
						function t(n){
							var t=s.querySelectorAll(n);
							if(t.length>0){
								for(var r=0;r<t.length;r++){
									hide(t[r]);
								}
							}
						}
						function r(n){
							s.querySelector(n)&&hide(s.querySelector(n))
						}
						var s=$("#novelHTMLBox");
						!function(){
							r("#foot"),t("footer"),r("#footer"),r(".footer"),
							t("iframe"),t("form"),t("input"),t("table"),t("tbody"),t("tr"),t("td"),t("ul"),t("li"),t("img"),t("font"),t("b"),t("a")
						}();
						if($("#novelHTMLBox #chaptercontent")){
							r("#cambrian0"),novelText=$("#novelHTMLBox #chaptercontent").innerText;
						}else if($("#novelHTMLBox #nr")){
							novelText=$("#novelHTMLBox #nr").innerText;
						}else if($("#novelHTMLBox #content")){
							novelText=$("#novelHTMLBox #content").innerText;
						}else if($("#novelHTMLBox #novelcontent")){
							novelText=$("#novelHTMLBox #novelcontent").innerText;
						}else{
							n(),novelText=s.innerText;
						};
						novelText=("\\n\\n"+novelText).replace(/\\r|\\n/g,"\\n\\n").replace(/\\n\\s+/g,blankLineHTML);
						/* if(window.screen.width==$("#novelTextBox").scrollWidth&&window.screen.height==$("#novelTextBox").scrollHeight)insertNovelText(); */
						if($("#novelTextBox").innerHTML=="")insertNovelText();
						/* window.screen.height>=document.documentElement.scrollHeight&&insertNovelText(); */
					}
					function insertNovelText(){
						thisurl!=location.href&&history.pushState(null,nextTitle,thisurl);
						document.title=nextTitle;
						var text="<br><br><div class=\'wbt\'>END</div><br>";
						$("#novelTextBox").innerHTML+=text.replace(/END/,nextTitle)+"<p>"+novelText+"</p>";
						if(nexturl){
							setTimeout("getNovelHTML(nexturl)",2e3)
						}else{
							$("#novelTextBox").innerHTML+=text;
							thisurl="";
						}
					}
					document.addEventListener("scroll",function(){
						var e=document.documentElement.scrollTop||$("body").scrollTop;
						if(window.screen.height<document.documentElement.scrollHeight&&e+2*window.screen.height>document.documentElement.scrollHeight){
							thisurl!=nexturl&&insertNovelText();
						}
					});
					
					!function(){
						var obj=$("#novelTextBox");
						/* var count = Math.ceil(parseInt(obj.scrollWidth) / parseInt(obj.offsetWidth)) */
						UI={
							"onShowUp":function(){
								var h = window.innerHeight;
								var w = window.innerWidth;/* window.getComputedStyle(obj).width */
								var left=obj.scrollLeft-w;
								if (left>=0) {
									/* 上一页 */
									/* obj.scrollLeft=index*parseInt(obj.offsetWidth); */
									obj.scrollLeft=left;
								} else {
									/* 上一章 */
									obj.innerHTML="";
									getNovelHTML(upUrl);
								}
								var index=Math.ceil(parseInt(left) / parseInt(w))+1;
								var count = Math.ceil(parseInt(obj.scrollWidth) / parseInt(obj.offsetWidth));
								mess.innerHTML = index + "/" + count ;
								
								
							},
							/* 下一页 */
							"onShowNext":function(){
								var h = window.innerHeight;
								var w = window.innerWidth;
								var left=obj.scrollLeft+w;
								if (left<=(obj.scrollWidth-w)) {
									/* 下一页 */
									obj.scrollLeft=left
								} else {
									/* 下一章 */
									obj.innerHTML="";
									obj.scrollLeft=0;
									insertNovelText();
								}
								if(left==(obj.scrollWidth-2*w)){
									
								}
								var index=Math.ceil(parseInt(left) / parseInt(w))+1;
								var count = Math.ceil(parseInt(obj.scrollWidth) / parseInt(obj.offsetWidth));
								mess.innerHTML = index + "/" + count ;
							},
							"onShowSetting":function(){
								if(0==viewState){
									$("#settingBox").style.display="block";
									viewState=1;
								}else{
									$("#settingBox").style.display="none";
									viewState=0;
								}
							}
						}
					}();
					
					
				</script>
				
				<style type="text/css">
					#settingBox{
						color:rgb(0,0,0);
						font-size:24px;
						line-height:24px;
						opacity:1;
						background:rgb(255,255,255);
						cursor:pointer;
						position:fixed;
						bottom:5%;
						left:5%;
						right:5%;
						margin-top:auto;
						z-index:9999;
						border:1px solid rgb(197,197,197);
						border-radius:5px;
						-webkit-tap-highlight-color:rgba(0,0,0,0);
						display:none;
					}
					#setBox{
						margin:8px;padding:8px;text-align:center;
					}
					#setBox span{
						display:inline-block;
						margin:4px;
						padding:4px;
						border:1px solid #c5c5c5;
						border-radius:5px;
					}
					#setBox p{margin:4px;}
					img{display:none!important;}
					#enterButton{${ydcss}}
				</style>
			</body>
		</html>
		` ;
		var newy = window.open('', '_self');
		newy.opener = null;
		newy.document.write(wyt);
		newy.document.close();
		
		var cpfy = document.createElement("script");
		cpfy.innerHTML =
			`$("#novelTextBox").addEventListener("click",function(e){
				e.clientY<window.screen.availHeight/2?window.scrollBy(0,-fysz):(window.scrollBy(0,fysz),yctcd())
			});
			document.addEventListener("touchstart",function(e){
				startY=e.changedTouches[0].clientY
			});
			document.addEventListener("touchmove",function(e){
				endY=e.changedTouches[0].clientY;
				if(endY-startY>0){
					$("#enterButton").style.display="block";
					viewState=1;
				}else{
					yctcd()
				}
			});
			function yctcd(){
				if("1"==viewState){
					$("#enterButton").style.display="none";
					$("#settingBox").style.display="none";
					viewState=0;
				}
			};
			$("#enterButton").addEventListener("click",function(){
				$("#settingBox").style.display="block";
				viewState=1;
			});
			$("#fontSmallButton").addEventListener("click",function(){
				var size=fontSize-1;
				size>9&&setFontSize(size)
			});
			$("#fontBigButton").addEventListener("click",function(){
				var size=1*fontSize+1;
				size<41&&setFontSize(size)
			});
			inertBgOption();
			setTheme(originTheme);
			function inertBgOption(){
				var t=Themes.split(";");
				for(var e=0;e<t.length;e++){
					var n=document.createElement("span");
					n.innerHTML="\u3000",
					n.style.backgroundColor=t[e].split("-")[0],
					n.setAttribute("ysz",t[e]),
					n.onclick=function(){
						var t=this.getAttribute("ysz");
						setTheme(t)
					},
					$("#bgBox").appendChild(n)
				}
			}
			function setTheme(o){
				var t=o.split("-");
				$("body").style.backgroundColor=t[0];
				$("body").style.color=0==t[1]?"#000":t[1];
			}
		`;
		$("body").appendChild(cpfy)
	};
	jryd();
}();