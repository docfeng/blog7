vbs中获取脚本当前路径的2个方法
currentpath = createobject("Scripting.FileSystemObject").GetFolder(".").Path
currentpath = createobject("Scripting.FileSystemObject").GetFile(Wscript.ScriptFullName).ParentFolder.Path

VBS打开当前脚本所在文件夹
方法一：Wscript.ScriptFullName
'创建一个 Wscript.Shell 对象的实例,稍后会使用这个对象启动 Windows 资源管理器
Set objShell = CreateObject("Wscript.Shell")
'获取脚本的路径
strPath = Wscript.ScriptFullName
Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.GetFile(strPath)
'获取脚本当前所在文件夹的路径
strFolder = objFSO.GetParentFolderName(objFile) 
strPath = "explorer.exe /e," & strFolder
'启动 Windows 资源管理器,打开脚本所在的文件夹
objShell.Run strPath

方法二：objShell.CurrentDirectory
'脚本的当前目录
strPath = objShell.CurrentDirectory
strPath = "explorer.exe /e," & strPath
objShell.Run strPath


Const WINDOW_HANDLE = 0 
Const NO_OPTIONS = 0 
Set objShell = CreateObject("Shell.Application") 
Set objFolder = objShell.BrowseForFolder _ 
  (WINDOW_HANDLE, "Select a folder:", NO_OPTIONS)     
Set objFolderItem = objFolder.Self 
strPath = objFolderItem.Path 
objShell.Explore strPath