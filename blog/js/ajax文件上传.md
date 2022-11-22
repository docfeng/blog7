```php
function uploadFile(file, progressbar) 
{ 
var xhr = new XMLHttpRequest(); 
var upload = xhr.upload; 
 
var p = document.createElement('p'); 
p.textContent = "0%"; 
progressbar.appendChild(p); 
upload.progressbar = progressbar; 
// 设置上传文件相关的事件处理函数
upload.addEventListener("progress", uploadProgress, false); 
upload.addEventListener("load", uploadSucceed, false); 
upload.addEventListener("error", uploadError, false); 
// 上传文件
xhr.open("POST", "upload.jsp?fileName="+file.name); 
xhr.overrideMimeType("application/octet-stream"); 
xhr.sendAsBinary(file.getAsBinary()); 
} 
function uploadProgress(event) 
{ 
if (event.lengthComputable) 
{ 
   // 将进度换算成百分比
var percentage = Math.round((event.loaded * 100) / event.total); 
console.log("percentage:" + percentage); 
if (percentage < 100) 
{ 
event.target.progressbar.firstChild.style.width = (percentage*2) + "px"; 
event.target.progressbar.firstChild.textContent = percentage + "%"; 
} 
} 
} 
function uploadSucceed(event) 
{ 
event.target.progressbar.firstChild.style.width = "200px"; 
event.target.progressbar.firstChild.textContent = "100%"; 
} 
function uploadError(error) 
{ 
alert("error: " + error); 
}
```