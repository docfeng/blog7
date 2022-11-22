#用vbs实现可以查找指定扩展名的文件，方便大家搜索
```
On Error Resume Next '忽略所有错误 
Dim filename '声明变量 
Dim re 
Set re=New RegExp '建立正则表达式对象实例 
re.Pattern="^([a-z]|[A-Z])+\:\\\w+\.vbs$" 
If re.Test(WScript.ScriptFullName)=False Then 
 MsgBox "请在磁盘根目录下运行本程序，否则搜索结果可能会不正确！",,"MessageBox" 
 WScript.Quit 
End If 
re.Pattern="^([A-Za-z0-9_]|[^\x00-\xff])+\.[a-zA-Z]{1,4}$"  '声明正则表达式的匹配模式，主要用来检验用户输入的文件名是否正确 
Do  
 filename=InputBox("请输入你要搜索的文件名：","MessageBox") 
 If filename="" Then WScript.Quit  '如果输入为空则退出脚本 
 If re.Test(filename)=False Then 
  MsgBox "请输入合法的文件名！",,"MessageBox" 
 End If 
Loop While re.Test(filename)=False   '直到用户输入正确的文件名时才跳出循环。 
Set re=Nothing 
Dim ie 
Set ie=WScript.CreateObject("internetexplorer.application")   '建立IE对象，用来显示搜索状态 
ie.menubar=0   '不显示IE对象菜单栏 
ie.AddressBar=0   '不显示IE对象地址栏 
ie.ToolBar=0   '不显示IE对象工具栏 
ie.StatusBar=0   '不显示IE对象状态栏 
ie.FullScreen=1   '全屏化IE对象 
ie.Width=640   '设置IE对象宽度 
ie.Height=120   '设置IE对象高度 
ie.Resizable=0   '设置IE对象大小是否可以被改动 
ie.Navigate "about:blank" '设置IE对象默认指向的页面 
ie.Left=Fix((ie.Document.parentwindow.screen.availwidth-ie.Width)/2)  '设置IE对象左边距 
ie.top=Fix((ie.document.parentwindow.screen.availheight-ie.height)/2)  '设置IE对象右边距 
ie.visible=1  '设置IE对象是否可视 
With ie.Document '以下为在IE对象中写入页面，跟一般的HTML没有区别 
 .write "<html>" 
 .write "<head>" 
 .write "<title>文件扫描状态</title>" 
 .write "<meta http-equiv=""content-type"" content=""text/html;charset=gb2312"">" 
 .write "<style><!--" 
 .write "body { background:#000000;text-align:center;margin:0px auto; }" 
 .write "* { font-family:Arial;font-size:9pt;color:#00cc00;line-height:140%; }" 
 .write "a:link,ahover,a:visited { text-decoration:none; }" 
 .write "#scanstatus { text-align:left;margin:15px; }" 
 .write "#header { width:100%;height:20px; }" 
 .write "#middle { width:100%;height:50px; }" 
 .write "#footer { width:100%;height:20px;text-align:right; }" 
 .write "--></style>" 
 .write "</head>" 
 .write "<body scroll=no>" 
 .write "<div id=""scanstatus"">" 
 .write "<div id=""header"">正在启动搜索程序。。。</div>" 
 .write "<div id=""middle""></div>" 
 .write "<div id=""footer""><a href=""#"" onclick=""window.close()"">退出程序</a></div>" 
 .write "</div>" 
 .write "</body>" 
 .write "</html>" 
End With 
'定义文件系统对象变量 
Dim fso  
Dim objfolder 
Dim objsubfolders 
Dim objsubfolder 
Dim objfiles 
Dim objfile 
Dim objdrives 
Dim objdrive 
Dim objtextfile 
Dim str:str="" 
Dim i:i=0 '计数器变量 
Dim result 
result="C:\搜索结果.html" '搜索结果保存文件变量 
'一个过程，用来遍历硬盘文件 
Function search(path) 
 Set objfolder=fso.getfolder(path) '获得当前路径 
 Set objfiles=objfolder.Files  '获得当前路径下的所有文件集合 
 For Each objfile In objfiles  '开始遍历文件集合 
  ie.Document.getElementById("middle").innerHTML=objfile.Path  '用到IE对象的文档对象模型，将当前搜索的文件路径写入ID为middle的DIV中 
  If objfile.Name=filename Then '如果当前文件名与用户输入的文件名一致 
   i=i+1      '计数器加一 
   str=str & objfile.Path & "<br>" 
   Set objtextfile=fso.OpenTextFile(result,2,True)  '创建文本流对象，文件名为变量result所存储的字符串 
   objtextfile.Write(str)  '将变量str中的文件路径写入html文件中 
   objtextfile.Close   '关闭文本流对象 
   Set objtextfile=Nothing  '销毁对象 
  End If 
  If i>0 Then 
   ie.Document.getElementById("header").innerHTML="找到 " & i & " 个匹配，详细信息已保存在 """ & result & """ 文件中。。。" 
  Else 
   ie.Document.getElementById("header").innerHTML="正在执行文件搜索。。。" 
  End If 
  WScript.Sleep(20) 
 Next 
 Set objsubfolders=objfolder.SubFolders  '得到当前路径下的所有文件夹的集合 
 For Each objsubfolder In objsubfolders  '遍历文件夹 
  nowpath=path & "\" & objsubfolder.Name '得到新的文件路径 
  search nowpath  '调用函数自身，从新的路径开始搜索 
 Next 
End Function  
Set fso=CreateObject("scripting.filesystemobject") 
Set objdrives=fso.Drives '取得当前计算机的所有磁盘驱动器 
For Each objdrive In objdrives  '遍历磁盘 
 search objdrive  '调用函数 
Next 
'结束时显示的信息 
ie.Document.getElementById("header").innerHTML="扫描已结束。。。" 
If i>0 Then 
 ie.Document.getElementById("middle").innerHTML="请打开 """ & result & """ 查看详细搜索结果！" 
Else 
 ie.Document.getElementById("middle").innerHTML="没有找到要搜索的文件！" 
End If 
'销毁对象变量，释放内存空间 
Set objdrives=Nothing 
Set objfiles=Nothing 
Set objfile=Nothing 
Set objdrive=Nothing 
Set objfolders=Nothing 

On Error Resume Next '忽略所有错误 
Dim filename '声明变量 
Dim re 
Set re=New RegExp '建立正则表达式对象实例 
re.Pattern="^([a-z]|[A-Z])+\:\\\w+\.vbs$" 
If re.Test(WScript.ScriptFullName)=False Then 
 MsgBox "请在磁盘根目录下运行本程序，否则搜索结果可能会不正确！",,"MessageBox" 
 WScript.Quit 
End If 
re.Pattern="^([A-Za-z0-9_]|[^\x00-\xff])+\.[a-zA-Z]{1,4}$"  '声明正则表达式的匹配模式，主要用来检验用户输入的文件名是否正确 
Do  
 filename=InputBox("请输入你要搜索的文件名：","MessageBox") 
 If filename="" Then WScript.Quit  '如果输入为空则退出脚本 
 If re.Test(filename)=False Then 
  MsgBox "请输入合法的文件名！",,"MessageBox" 
 End If 
Loop While re.Test(filename)=False   '直到用户输入正确的文件名时才跳出循环。 
Set re=Nothing 
Dim ie 
Set ie=WScript.CreateObject("internetexplorer.application")   '建立IE对象，用来显示搜索状态 
ie.menubar=0   '不显示IE对象菜单栏 
ie.AddressBar=0   '不显示IE对象地址栏 
ie.ToolBar=0   '不显示IE对象工具栏 
ie.StatusBar=0   '不显示IE对象状态栏 
ie.FullScreen=1   '全屏化IE对象 
ie.Width=640   '设置IE对象宽度 
ie.Height=120   '设置IE对象高度 
ie.Resizable=0   '设置IE对象大小是否可以被改动 
ie.Navigate "about:blank" '设置IE对象默认指向的页面 
ie.Left=Fix((ie.Document.parentwindow.screen.availwidth-ie.Width)/2)  '设置IE对象左边距 
ie.top=Fix((ie.document.parentwindow.screen.availheight-ie.height)/2)  '设置IE对象右边距 
ie.visible=1  '设置IE对象是否可视 
With ie.Document '以下为在IE对象中写入页面，跟一般的HTML没有区别 
 .write "<html>" 
 .write "<head>" 
 .write "<title>文件扫描状态</title>" 
 .write "<meta http-equiv=""content-type"" content=""text/html;charset=gb2312"">" 
 .write "<style><!--" 
 .write "body { background:#000000;text-align:center;margin:0px auto; }" 
 .write "* { font-family:Arial;font-size:9pt;color:#00cc00;line-height:140%; }" 
 .write "a:link,ahover,a:visited { text-decoration:none; }" 
 .write "#scanstatus { text-align:left;margin:15px; }" 
 .write "#header { width:100%;height:20px; }" 
 .write "#middle { width:100%;height:50px; }" 
 .write "#footer { width:100%;height:20px;text-align:right; }" 
 .write "--></style>" 
 .write "</head>" 
 .write "<body scroll=no>" 
 .write "<div id=""scanstatus"">" 
 .write "<div id=""header"">正在启动搜索程序。。。</div>" 
 .write "<div id=""middle""></div>" 
 .write "<div id=""footer""><a href=""#"" onclick=""window.close()"">退出程序</a></div>" 
 .write "</div>" 
 .write "</body>" 
 .write "</html>" 
End With 
'定义文件系统对象变量 
Dim fso  
Dim objfolder 
Dim objsubfolders 
Dim objsubfolder 
Dim objfiles 
Dim objfile 
Dim objdrives 
Dim objdrive 
Dim objtextfile 
Dim str:str="" 
Dim i:i=0 '计数器变量 
Dim result 
result="C:\搜索结果.html" '搜索结果保存文件变量 
'一个过程，用来遍历硬盘文件 
Function search(path) 
 Set objfolder=fso.getfolder(path) '获得当前路径 
 Set objfiles=objfolder.Files  '获得当前路径下的所有文件集合 
 For Each objfile In objfiles  '开始遍历文件集合 
  ie.Document.getElementById("middle").innerHTML=objfile.Path  '用到IE对象的文档对象模型，将当前搜索的文件路径写入ID为middle的DIV中 
  If objfile.Name=filename Then '如果当前文件名与用户输入的文件名一致 
   i=i+1      '计数器加一 
   str=str & objfile.Path & "<br>" 
   Set objtextfile=fso.OpenTextFile(result,2,True)  '创建文本流对象，文件名为变量result所存储的字符串 
   objtextfile.Write(str)  '将变量str中的文件路径写入html文件中 
   objtextfile.Close   '关闭文本流对象 
   Set objtextfile=Nothing  '销毁对象 
  End If 
  If i>0 Then 
   ie.Document.getElementById("header").innerHTML="找到 " & i & " 个匹配，详细信息已保存在 """ & result & """ 文件中。。。" 
  Else 
   ie.Document.getElementById("header").innerHTML="正在执行文件搜索。。。" 
  End If 
  WScript.Sleep(20) 
 Next 
 Set objsubfolders=objfolder.SubFolders  '得到当前路径下的所有文件夹的集合 
 For Each objsubfolder In objsubfolders  '遍历文件夹 
  nowpath=path & "\" & objsubfolder.Name '得到新的文件路径 
  search nowpath  '调用函数自身，从新的路径开始搜索 
 Next 
End Function  
Set fso=CreateObject("scripting.filesystemobject") 
Set objdrives=fso.Drives '取得当前计算机的所有磁盘驱动器 
For Each objdrive In objdrives  '遍历磁盘 
 search objdrive  '调用函数 
Next 
'结束时显示的信息 
ie.Document.getElementById("header").innerHTML="扫描已结束。。。" 
If i>0 Then 
 ie.Document.getElementById("middle").innerHTML="请打开 """ & result & """ 查看详细搜索结果！" 
Else 
 ie.Document.getElementById("middle").innerHTML="没有找到要搜索的文件！" 
End If 
'销毁对象变量，释放内存空间 
Set objdrives=Nothing 
Set objfiles=Nothing 
Set objfile=Nothing 
Set objdrive=Nothing 
Set objfolders=Nothing 
```
