```
Set ExcelBook= ExcelApp.Workbooks.Open(FileName)
ExcelBook.Save
ExcelBook.Close
Set ExcelBook = Nothing

ExcelBook.SaveAs('D:\Book2.xls',FileFormat:=Excel.XLFileFormat.xlAddIn) ‘文件另存为
```






[XlFileFormat 枚举 (Excel)](https://docs.microsoft.com/zh-cn/office/vba/api/excel.xlfileformat?redirectedfrom=MSDN)
```
指定保存工作表时的文件格式。

XLFILEFORMAT 枚举 (EXCEL)
名称	值	说明	扩展名
xlAddIn	18	Microsoft Excel 97-2003 外接程序	*.xla
xlAddIn8	18	Microsoft Excel 97-2003 外接程序	*.xla
xlCSV	6	CSV	*.csv
xlCSVMac	22	Macintosh CSV	*.csv
xlCSVMSDOS	24	MSDOS CSV	*.csv
xlCSVUTF8	62	UTF8 CSV	*.csv
xlCSVWindows	23	Windows CSV	*.csv
xlCurrentPlatformText	-4158	当前平台文本	*.txt
xlDBF2	7	Dbase 2 格式	*.dbf
xlDBF3	8	Dbase 3 格式	*.dbf
xlDBF4	11	Dbase 4 格式	*.dbf
xlDIF	9	数据交换格式	*.dif
xlExcel12	50	Excel 二进制工作簿	*.xlsb
xlExcel2	16	Excel 版本 2.0 (1987)	*.xls
xlExcel2FarEast	27	Excel 版本 2.0 中文 (1987)	*.xls
xlExcel3	29	Excel 版本 3.0 (1990)	*.xls
xlExcel4	33	Excel 版本 4.0 (1992)	*.xls
xlExcel4Workbook	35	Excel 版本 4.0 工作簿格式 (1992)	*.xlw
xlExcel5	39	Excel 版本 5.0 (1994)	*.xls
xlExcel7	39	Excel 95（版本 7.0）	*.xls
xlExcel8	56	Excel 97-2003 工作簿	*.xls
xlExcel9795	43	Excel 版本 95 和 97	*.xls
xlHtml	44	HTML 格式	.htm；.html
xlIntlAddIn	26	国际外接程序	无文件扩展名
xlIntlMacro	25	国际宏	无文件扩展名
xlOpenDocumentSpreadsheet	60	OpenDocument 电子表格	*.ods
xlOpenXMLAddIn	55	Open XML 外接程序	*.xlam
xlOpenXMLStrictWorkbook	61 (&H3D)	Strict Open XML 文件	*.xlsx
xlOpenXMLTemplate	54	Open XML 模板	*.xltx
xlOpenXMLTemplateMacroEnabled	53	启用 Open XML 模板宏	*.xltm
xlOpenXMLWorkbook	51	Open XML 工作簿	*.xlsx
xlOpenXMLWorkbookMacroEnabled	52	启用 Open XML 工作簿宏	*.xlsm
xlSYLK	2	符号链接格式	*.slk
xlTemplate	17	Excel 模板格式	*.xlt
xlTemplate8	17	模板 8	*.xlt
xlTextMac	19	Macintosh 文本	*.txt
xlTextMSDOS	21	MSDOS 文本	*.txt
xlTextPrinter	36	打印机文本	*.prn
xlTextWindows	20	Windows 文本	*.txt
xlUnicodeText	42	Unicode 文本	无文件扩展名；*.txt
xlWebArchive	45	Web 档案	.mh；.mhtml
xlWJ2WD1	14	日语 1-2-3	*.wj2
xlWJ3	40	日语 1-2-3	*.wj3
xlWJ3FJ3	41	日语 1-2-3 格式	*.wj3
xlWK1	5	Lotus 1-2-3 格式	*.wk1
xlWK1ALL	31	Lotus 1-2-3 格式	*.wk1
xlWK1FMT	30	Lotus 1-2-3 格式	*.wk1
xlWK3	15	Lotus 1-2-3 格式	*.wk3
xlWK3FM3	32	Lotus 1-2-3 格式	*.wk3
xlWK4	38	Lotus 1-2-3 格式	*.wk4
xlWKS	4	Lotus 1-2-3 格式	*.wks
xlWorkbookDefault	51	默认工作簿	*.xlsx
xlWorkbookNormal	-4143	常规工作簿	*.xls
xlWorks2FarEast	28	Microsoft Works 2.0 两端对齐格式	*.wks
xlWQ1	34	Quattro Pro 格式	*.wq1
xlXMLSpreadsheet	46	XML 电子表格	*.xml
```