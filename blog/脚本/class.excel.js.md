1. 自动化程序壳
var excelApp = new ActiveXObject("Excel.Application");//自动化excel程序
excelApp.Visible = true
excelApp.DisplayAlerts = false
excelApp.Workbooks(1)
excelApp.quit
2. 打开工作簿
excelWorkBook = excelApp.Workbooks.open(path);//打开文件.xls
excelWorkBook.Saved = True
excelWorkBook.Close
excelWorkBook.Worksheets.count;
3. 工作表操作
excelSheet = excelWorkBook.ActiveSheet; //活动的工作表
excelSheet = excelWorkBook.WorkSheets("sheet1") ;//选择工作表
excelSheet.Cells(100,1).end(3).row
excelSheet.Range("a1:b2")
excelSheet.usedrange.rows.count;
var value=excelWorkBook.Worksheets.count;//得到sheet的个数
4. 单元格 数据操作
value=excelSheet.Cells(a,b).value;//获取单元格值
var value=excelSheet.usedrange.rows.count;//获取使用的行数

5. 关闭
excelWorkBook.close();  
excelApp.Application.Quit();  
excelApp=null;  



#代码
```
var Excel=(function(){
	var excelApp = new ActiveXObject("Excel.Application");
	var excelWorkBook;  
	var excelSheet; 
	var fun=function(){
		
	}
	fun.prototype.open=function(path){
		try{   
			excelWorkBook = excelApp.Workbooks.open(path); 
			excelSheet = excelWorkBook.ActiveSheet; //WorkSheets("sheet1") ;
		}catch(e){   
			this.close();
		}
	}
	fun.prototype.WorkSheets=function(Sheets){
		try{   
			if(Sheets){
				excelSheet = excelWorkBook.WorkSheets(Sheets) ;
			}else{
				excelSheet = excelWorkBook.ActiveSheet; //WorkSheets("sheet1") ;
			}
		}catch(e){   
			this.close();
		}
	}
	fun.prototype.cells=function(a,b){
		try{   
			var value=excelSheet.Cells(a,b).value;//cell
			return value;
		}catch(e){   
			this.close();
		}
	
	}
	fun.prototype.rows=function(){
		try{   
			var value=excelSheet.usedrange.rows.count;//使用的行数
			return value;
		}catch(e){   
			this.close();
		}
	}
	fun.prototype.count=function(){
		try{   
			var value=excelWorkBook.Worksheets.count;//得到sheet的个数
			return value;
		}catch(e){   
			this.close();
		}
	}
	fun.prototype.close=function(){
		if(excelSheet !=null || excelSheet!=undefined){  
			excelSheet =null;  
		}   
		if(excelWorkBook != null || excelWorkBook!=undefined){  
			excelWorkBook.close();  
		}   
		if(excelApp != null || excelApp!=undefined){  
			excelApp.Application.Quit();  
			excelApp=null;  
		}  
	}
	return fun;
})()
```

# 脚本上使用
```
excel=new Excel();
var path="1.xls";
var arg = WScript.Arguments;//大写
if(arg.length!= 0 ){
	path=arg.Item(0);
}else{
	path=new ActiveXObject("Scripting.FileSystemObject").GetFile(WScript.ScriptFullName).ParentFolder.Path
	path+="/1.xls";
}
excel.open(path) 
WSH.Echo(excel.cells(3,3));
WSH.Echo(excel.cells(3,4));
excel.close()
```