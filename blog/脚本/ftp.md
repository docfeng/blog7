# 1.使用外部配置
```
var ws= new ActiveXObject("WScript.Shell")
var oExec=ws.exec("ftp -s:E:\\ftp.txt")
oExec.StdIn.WriteLine("cd myapp001")
oExec.StdIn.WriteLine("get \"index.html\" \"e:\\22.txt\"")
oExec.StdIn.WriteLine("dir")

oExec.StdIn.WriteLine("status")
var strLine=""
var oStdOut = oExec.StdOut
for(var i=0;i<100;i++){
    var input = oExec.StdOut.ReadLine();
    strLine+=input +"\n"
    if (input.indexOf("invalid") != -1)break;
    if (input.indexOf("502") != -1)break;
    if (input.indexOf("哈希") != -1)break;
}
oExec.Terminate()
alert(strLine)
```
ftp.txt
```
open 192.168.123.17 2121
docfeng
123456
```
# 2.脚本内配置
```
var ws= new ActiveXObject("WScript.Shell")
var oExec=ws.exec("ftp")
oExec.StdIn.WriteLine("open 192.168.123.17 2121")
oExec.StdIn.WriteLine("")
oExec.StdIn.WriteLine("user docfeng 123456")
//oExec.StdIn.WriteLine("dir")
//oExec.StdIn.WriteLine("cd myapp001")
//oExec.StdIn.WriteLine("get \"index.html\" \"e:\\22.txt\"")
oExec.StdIn.WriteLine("get \"myapp001/index.html\" \"e:\\22.txt\"")

oExec.StdIn.WriteLine("status")
var strLine=""
var oStdOut = oExec.StdOut
for(var i=0;i<100;i++){
    var input = oExec.StdOut.ReadLine();
    strLine+=input +"\n"
    if (input.indexOf("rem 666") != -1)break;
    if (input.indexOf("502") != -1)break;
    if (input.indexOf("哈希") != -1)break;
}
oExec.Terminate()
alert(strLine)
ws=null
```
# ftp命令
## 0
```
FTP [-v] [-d] [-i] [-n] [-g] [-s:filename] [-a] [-A] [-x:sendbuffer] [-r:recvbuffer] [-b:asyncbuffers] [-w:windowsize] [host]

  -v              禁止显示远程服务器响应。
  -n              禁止在初始连接时自动登录。
  -i              关闭多文件传输过程中的
                  交互式提示。
  -d              启用调试。
  -g              禁用文件名通配(请参阅 GLOB 命令)。
  -s:filename     指定包含 FTP 命令的文本文件；命令
                  在 FTP 启动后自动运行。
  -a              在绑字数据连接时使用所有本地接口。
  -A              匿名登录。
  -x:send sockbuf 覆盖默认的 SO_SNDBUF 大小 8192。
  -r:recv sockbuf 覆盖默认的 SO_RCVBUF 大小 8192。
  -b:async count  覆盖默认的异步计数 3
  -w:windowsize   覆盖默认的传输缓冲区大小 65535。
  host            指定主机名称或要连接到的远程主机
                  的 IP 地址。

注意:
  - mget 和 mput 命令将 y/n/q 视为 yes/no/quit。
  - 使用 Ctrl-C 中止命令。
```
## 1
```
!               delete          literal         prompt          send
?               debug           ls              put             status
append          dir             mdelete         pwd             trace
ascii           disconnect      mdir            quit            type
bell            get             mget            quote           user
binary          glob            mkdir           recv            verbose
bye             hash            mls             remotehelp
cd              help            mput            rename
close           lcd             open            rmdir
```
## 2
```
1. 
open 192.168.123.17 2121
docfeng
123456
dir
2. 
ftp -s:e:/ftp.txt

404. 
user docfeng 123456
oExec.StdIn.WriteLine("cd myapp001")
oExec.StdIn.WriteLine("lcd e:\\zip")
```
# 文件列表
```
oExec.StdIn.WriteLine("cd myapp001")
oExec.StdIn.WriteLine("dir")


var arr=strLine.split("\n")
var f=[]
var d=[];
for(var i=0;i<arr.length;i++){
  if (arr[i].indexOf("owner") !=-1){
    var a1=arr[i].split(" ");
    if(a1[0].indexOf("drw") !=-1){
       f.push(a1.pop())
    }else{
        d.push(a1.pop())
    }
  }
}
alert(JSON.stringify(f,null,4))
alert(JSON.stringify(d,null,4))
```
# 读写
## 读
```
oExec.StdIn.WriteLine("get \"index.html\" \"e:\\22.txt\"")
oExec.StdIn.WriteLine("mget index.html iframe.html")
```
## 写
```
oExec.StdIn.WriteLine("put \"e:\\22.txt\" \"myapp001/12333.txt\"")
oExec.StdIn.WriteLine("mput 1.txt 2.txt")
```
