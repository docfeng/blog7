```
Set ExcelApp = CreateObject("Excel.Application")
ExcelApp.DisplayAlerts=False
ExcelApp.DisplayFullScreen = True
Set ExcelApp = Nothing
SystemUtil.CloseProcessByName "Excel.exe" '如果仍有Excel.exe进程，可使用这句关闭进程
```

```
ActiveCell
ActiveSheet
ActiveWindow
ActiveWorkbook
Columns
Cells
Range
Rows
Selection
Sheets
Workbooks
Worksheets
WorksheetFunction.Min
Caption 主窗口标题栏中显示的名称

```