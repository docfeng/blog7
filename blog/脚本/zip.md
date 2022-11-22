# vbs
## zip
```
Sub Zip(ByVal mySourceDir, ByVal myZipFile)
	Set fso = CreateObject("Scripting.FileSystemObject")
	If fso.GetExtensionName(myZipFile) <> "zip" Then
		Exit Sub
	ElseIf fso.FolderExists(mySourceDir) Then
		FType = "Folder"
	ElseIf fso.FileExists(mySourceDir) Then
		FType = "File"
		FileName = fso.GetFileName(mySourceDir)
		FolderPath = Left(mySourceDir, Len(mySourceDir) - Len(FileName))
	Else
		Exit Sub
	End If
	Set f = fso.CreateTextFile(myZipFile, True)
	f.Write "PK" & Chr(5) & Chr(6) & String(18, Chr(0))
	f.Close
	Set objShell = CreateObject("Shell.Application")
	Select Case Ftype
		Case "Folder"
			Set objSource = objShell.NameSpace(mySourceDir)
			Set objFolderItem = objSource.Items()
		Case "File"
			Set objSource = objShell.NameSpace(FolderPath)
			Set objFolderItem = objSource.ParseName(FileName)
	End Select
	Set objTarget = objShell.NameSpace(myZipFile)
	intOptions = 256
	objTarget.CopyHere objFolderItem, intOptions
	Do
		WScript.Sleep 1000
	Loop Until objTarget.Items.Count > 0
End Sub
'Zip "D:\test.iso", "D:\test.zip"
Zip "D:\test", "D:\test.zip"
Msgbox "OK"
```
## unzip
```
UnZip "D:\test.zip", "D:\test"
Msgbox "OK"

Sub UnZip(ByVal mySourceFile, ByVal myTargetDir)
	Set fso = CreateObject("Scripting.FileSystemObject")
	If NOT fso.FileExists(mySourceFile) Then
		Exit Sub
	ElseIf fso.GetExtensionName(mySourceFile) <> "zip" Then
		Exit Sub
	ElseIf NOT fso.FolderExists(myTargetDir) Then
		fso.CreateFolder(myTargetDir)
	End If
	FileName = fso.GetFileName(mySourceFile)
	FolderPath = Left(mySourceFile, Len(mySourceFile) - Len(FileName))

	Set objShell = CreateObject("Shell.Application")
	Set objSource = objShell.NameSpace(mySourceFile)
	Set objFolderItem = objSource.Items()
	Set objTarget = objShell.NameSpace(myTargetDir)
	intOptions = 256
	objTarget.CopyHere objFolderItem, intOptions
End Sub
```
# js
## zip
```
function Zip(mySourceDir, myZipFile){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var FType;
	if(fso.GetExtensionName(myZipFile) != "zip"){
		return 0;
	}else if(fso.FolderExists(mySourceDir)){
		FType = "Folder"
	}else if(fso.FileExists(mySourceDir)){
		FType = "File"
		FileName = fso.GetFileName(mySourceDir)
		var len=mySourceDir.length - FileName.length;
		FolderPath = mySourceDir.substring(0,len);
	}else{
		return 0;
	}
	var f = fso.CreateTextFile(myZipFile, true)
	f.Write("PK" + String.fromCharCode(5) + String.fromCharCode(6) + new Array(19).join(String.fromCharCode(0)))
	f.Close();
	var objShell = new ActiveXObject("Shell.Application")
	switch(FType){
		case "Folder":
		var objSource = objShell.NameSpace(mySourceDir)
		var objFolderItem = objSource.Items()
		break;
		case "File":
		var objSource = objShell.NameSpace(FolderPath)
		var objFolderItem = objSource.ParseName(FileName)
		break;
	}
	var objTarget = objShell.NameSpace(myZipFile)
	intOptions = 256
	objTarget.CopyHere(objFolderItem, intOptions)
}
//Zip "D:\test.iso", "D:\test.zip"
Zip ("D:\\test", "D:\\test1.zip")
WScript.Echo("OK")
```
## unzip
```
function UnZip(mySourceFile, myTargetDir){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var FType;
	if(!fso.FileExists(mySourceFile)){
		return 0;
	}else if(fso.GetExtensionName(mySourceFile) != "zip"){
		return 0;
	}else if(!fso.FolderExists(myTargetDir)){
		fso.CreateFolder(myTargetDir);
	}
	FileName = fso.GetFileName(mySourceFile)
	var len=mySourceFile.length - FileName.length;
	FolderPath = mySourceFile.substring(0,len);
	
	var objShell = new ActiveXObject("Shell.Application");
	var objSource = objShell.NameSpace(mySourceFile);
	var objFolderItem = objSource.Items()
	var objTarget = objShell.NameSpace(myTargetDir)
	var intOptions = 256//0 4
	objTarget.CopyHere(objFolderItem, intOptions)
}
//Zip "D:\test.iso", "D:\test.zip"
UnZip ("D:\\test1.zip", "D:\\test2")
WScript.Echo("OK")
```