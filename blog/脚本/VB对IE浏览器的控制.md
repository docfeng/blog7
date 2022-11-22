
While IE.busy Or IE.readystate<>4
        
Wend

#VB中对IE浏览器的控制
#相信现在绝大多数计算机上使用的是IE浏览器。如何通过编程控制IE的操作呢，本文将一步步介绍如何通过VB调用IE的对象库来对IE进行控制
。#
*本文使用的编程工具是VB6英文企业版，浏览器是IE5，以下的代码只能在IE4及以上版本下运行。另外为了能深入了解程序代码，最好能安装
MSDN。文中的所有对象、函数、事件在其中都可以查到。*
一、如何获得Windows中所有打开的浏览器窗口
首先打开VB，建立一个新工程，点击菜单 Projects | References 项，在Available References 列表中选择Microsoft Internet Controls项
将Internet对象引用介入到工程中。添加一个ListBox到Form1，然后在Form1中添加如下代码：
```
Dim dWinFolder As New ShellWindows
Private Sub Form_Load()
Dim objIE As Object
For Each objIE In dWinFolder
If InStr(1, objIE.FullName, "IEXPLORE.EXE", vbTextCompare) <> 0 Then
List1.AddItem objIE.LocationURL
End If
Next
End Sub
```
打开几个浏览器窗口，然后运行程序，可以看到所有浏览窗口中的URL地址都在List1中列了出来。
上面程序中的ShellWindows对象是描述当前所有打开的“浏览窗口”对象集合的对象，利用For...Each语句可以
获得其中所有的浏览窗口对象。这是一个WebBrowser对象，在MSDN索引中通过“WebBrowser Object”中可以找到该
对象的详细介绍
在ShellWindows中的浏览窗口对象不仅包含IE，还包含Explore窗口（向资源管理器或者“我的电脑”窗口就是
Explore）。只不过它们的宿主程序一个是IEXPLORE.EXE，一个是EXPLORE.EXE。所以对每一个对象首先根据其FulName
属性来判断窗口是IE浏览器，如果是，则将该窗口的URL地址列出来。
通过WebBrowser对象可以获得和设置浏览器窗口中的很多属性，例如窗口大小、工具栏、状态栏状态以及控制
窗口的浏览等，大家通过MSDN都可以查到。

二、如何得到每一个浏览窗口的内容
在上面程序的Form1中再添加一个TextBox控件，将MultiLine属性设置为True，然后在List1的Click事件中添加如
下代码：
```
Dim objDoc As Object
Dim objIE As Object

For Each objIE In dWinFolder
If objIE.LocationURL = List1.List(List1.ListIndex) Then
Set objDoc = objIE.Document

For i = 1 To objDoc.All.length - 1
If objDoc.All(i).tagname = "BODY" Then
Text1.Text = objDoc.All(i).innerText
End If
Next
Exit For
End If
Next
```
运行程序，点击ListBox中的一个列表，所对应的浏览器窗口中的文本内容就会显示在TextBox中。
在上面的程序中，首先根据ListBox中选择的URL获得Webrowser对象，然后根据Document属性获得文档对象。我们知道
一个页面中包括HEAD、TITLE、BODY部分，页面中还可能包括Applet、Script、连接、表单等，这些在文档中都是一个对象
在程序中就是循环文档对象下的所有对象，如果对象的名称是“BODY”，说明对象代表HTML文档的正文部分，那么访问对象
的innerText属性获得文档正文。关于Document对象更详细的信息，大家可以参考MSDN中Webbrowser object帮助中的
Document属性连接。
 
三、响应IE事件
上面的部分只是介绍了如何访问Webbrowser对象的属性，下面介绍如何监控IE事件。
在Form1中再添加一个CommandButton。在代码窗口的 [Gengeral]-[Declaration]添加下面的定义：
Dim WithEvents eventIE As WebBrowser_V1
这样就在Form1中新添加了一个对象，然后在Command1的Click事件中添加如下代码：
```
Dim objIE As Object

For Each objIE In dWinFolder
If objIE.LocationURL = List1.List(List1.ListIndex) Then
Set eventIE = objIE
Command1.Enabled = False
Text1.Text = ""
Exit For
End If
Next
```
在eventIE的NavigateComplete事件中添加如下代码：
```
Text1.Text = Text1.Text + Chr(13) + Chr(10) + URL
```
在Form的UnLoad事件中添加下面一句代码：
```
Set dWinFolder = Nothing
```
运行程序，在ListBox中选择一个URL后点击Command1，然后转到与所选项向对应的浏览窗口输入网站地址进行浏览，可以看到所浏览过的站点
地址在TextBox中一一列出。
上面的程序实现起来也很简单。首先定义一个可响应事件的Webbrowser对象，然后将它与在ListBox中选择的Webbrowser对象联系起来，当浏览
器发生变化时，eventIE对象就能响应相应的事件。
根据IE版本的不同，Webbrowser对象也不同，作者的浏览器是IE5.0，在上面将eventIE定义为WebBrowser_V1运行通过，如果你的浏览器版本为
4.0的话，可能在执行 Set eventIE = objIE 时，可能产生 Type mistake 错误，这时你可以尝试将eventIE定义为:
```
Dim WithEvents eventIE As WebBrowser
```

