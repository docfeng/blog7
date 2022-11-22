Set ExcelSheet = ExcelBook.Sheets.Add '插入工作表
ExcelSheet = ExcelBook.ActiveSheet '激活第一个表

### Sheets
```
Count
Add '插入工作表
```

### Sheet=Sheets(0)
```
Name
Delete '删除工作表
ExcelSheet.SaveAs("D:\Book2.xls") '另存为
```




ExcelSheet.Name = SheetName '重命名工作表
' *************** 对文字的操作 ***************
 ExcelSheet.Cells(1,2) = Text
 ExcelSheet.Range("B2","B20").Value = Text
 ExcelSheet.Cells(1,2).Font.Name = "Verdana" '设置字体
 ExcelSheet.Cells(1,2).Font.Size = 25 '设置字号
 ExcelSheet.Cells(1,2).Font.Color = RGB(0, 0, 255) '设置字体颜色
 ExcelSheet.Cells(2,2).Font.Bold = True '文字加粗
 ExcelSheet.Cells(3,2).Font.Italic = True '文字倾斜
 ExcelSheet.Cells(4,2).Font.Underline = True '文字加下划线
 ExcelSheet.Cells(5,2).Font.Strikethrough = True '文字加删除线
 ExcelSheet.Cells(6,2).Characters(2, 2).Font.Superscript = True '设定文字上标
 ExcelSheet.Cells(7,2).Characters(2, 2).Font.Subscript = True '设定文字下标
' *************** 对单元格的操作 ***************
 ExcelSheet.Columns("B").ColumnWidth = 40 '设置列宽
 'ExcelSheet.Columns("B").AutoFit '自动调整列宽
 ExcelSheet.Range("B11").RowHeight=40 '设置行高
 'ExcelSheet.Rows(11).Rows.AutoFit '自动调整行高
 ExcelSheet.Range("B8","D8").Merge '合并单元格，水平方向
 ExcelSheet.Range("B18","B19").Merge '合并单元格，垂直方向
 ExcelSheet.Range("B8","D8").Borders.Color = RGB(0,255,0) '设定单元格边框颜色
 ExcelSheet.Range("B12").Interior.Color = RGB(255,0,0) '设置单元格背景色
 ExcelSheet.Cells(9,2).WrapText = True '自动换行
 ExcelSheet.Cells(10,2).HorizontalAlignment = 3 '设置水平对齐，1常规，2靠左，3居中，4靠右
 ' 5填充，6两端对齐，7跨列居中，8分散对齐
 ExcelSheet.Cells(11,2).VerticalAlignment = 1 '设置垂直对齐，1靠上，2居中，3靠下
 ' 4两端对齐，5分散对齐
 ExcelSheet.Range("B14").Borders(1).LineStyle=1 '设置左边框样式
 ExcelSheet.Range("B14").Borders(2).LineStyle=2 '设置右边框样式
 ExcelSheet.Range("B14").Borders(3).LineStyle=3 '设置上边框样式
 ExcelSheet.Range("B14").Borders(4).LineStyle=4 '设置下边框样式
 ExcelSheet.Range("B15").ClearContents '清除单元格内容
 ExcelSheet.Range("B16").Formula="=1+10" '设置单元格公式
 ExcelSheet.Range("B17").AddComment("Hello" & vbLf & "QTP") '插入批注
 ExcelSheet.Range("B17").Comment.Visible=True '显示批注
 'ExcelSheet.Range("B17").ClearComments '清除批注，与删除批注效果相同
 'ExcelSheet.Range("B17").Comment.Delete '删除批注，与清除批注效果相同