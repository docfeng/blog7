1. fso
var fso = new ActiveXObject("Scripting.FileSystemObject");
var shortPath = fso.GetFile(WScript.ScriptFullName).ParentFolder.Path;
fso.GetFolder(path);
fso.GetFile(path);
fso.CreateTextFile(path,model);//model:true;false
fso.openTextFile(path,1,true);//1:只读;8:追加;true:创建:false:不创建

2. folder
var folder= fso.GetFolder(path);
folder.Files;
folder.subfolders
folder.name
folder.path
3. file
var file= fso.GetFile(path);

4. files
var files=folder.Files;
5. folders
var subfolders=folder.subfolders
6. stream
var myfile=fso.CreateTextFile(shortPath+"/"+path,model)//model:true;false
myfile.Write(txt)
myfile.Close()

var myfile=fso.openTextFile(shortPath+"/"+path,1,true)//1:只读;8:追加;true:创建:false:不创建
myfile.readAll();

7. files&folders遍历
var fc = new Enumerator(subfolders);  
for (; !fc.atEnd(); fc.moveNext()) {
	var subfolder=fc.item();
}



