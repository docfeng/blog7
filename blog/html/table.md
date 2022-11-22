#Table 对象
Table 对象代表一个 HTML 表格。

在 HTML 文档中 <table> 标签每出现一次，一个 Table 对象就会被创建。

Table 对象集合
集合	描述
cells[]	返回包含表格中所有单元格的一个数组。
rows[]	返回包含表格中所有行的一个数组。
tBodies[]	返回包含表格中所有 tbody 的一个数组。
Table 对象属性
属性	描述
align	表在文档中的水平对齐方式。（已废弃）
bgColor	表的背景颜色。（已废弃）
border	设置或返回表格边框的宽度。
caption	对表格的 <caption> 元素的引用。
cellPadding	设置或返回单元格内容和单元格边框之间的空白量。
cellSpacing	设置或返回在表格中的单元格之间的空白量。
frame	设置或返回表格的外部边框。
id	设置或返回表格的 id。
rules	设置或返回表格的内部边框（行线）。
summary	设置或返回对表格的描述（概述）。
tFoot	返回表格的 TFoot 对象。如果不存在该元素，则为 null。
tHead	返回表格的 THead 对象。如果不存在该元素，则为 null。
width	设置或返回表格的宽度。
标准属性
属性	描述
className	设置或返回元素的 class 属性。
dir	设置或返回文本的方向。
lang	设置或返回元素的语言代码。
title	设置或返回元素的 title 属性。
Table 对象方法
方法	描述
createCaption()	为表格创建一个 caption 元素。
createTFoot()	在表格中创建一个空的 tFoot 元素。
createTHead()	在表格中创建一个空的 tHead 元素。
deleteCaption()	从表格删除 caption 元素以及其内容。
deleteRow()	从表格删除一行。
deleteTFoot()	从表格删除 tFoot 元素及其内容。
deleteTHead()	从表格删除 tHead 元素及其内容。
insertRow()	在表格中插入一个新行。


#TableRow 对象
TableRow 对象代表一个 HTML 表格行。

在 HTML 文档中 <tr> 标签每出现一次，一个 TableRow 对象就会被创建。
TableRow 对象集合
集合	描述
cells[]	返回包含行中所有单元格的一个数组。
TableRow 对象属性
属性	描述
align	设置或返回在行中数据的水平排列。
ch	设置或返回在行中单元格的对齐字符。
chOff	设置或返回在行中单元格的对齐字符的偏移量。
id	设置或返回行的 id。
innerHTML	设置或返回行的开始标签和结束标签之间的 HTML。
rowIndex	返回该行在表中的位置。
sectionRowIndex	返回在 tBody 、tHead 或 tFoot 中，行的位置。
vAlign	设置或返回在行中的数据的垂直排列方式。
TableRow 对象方法
方法	描述
deleteCell()	删除行中的指定的单元格。
insertCell()	在一行中的指定位置插入一个空的 <td> 元素。


#TableCell 对象
TableCell 对象代表一个 HTML 表格单元格。

在一个 HTML 文档中 <td> 标签每出现一次，一个 TableCell 对象就会被创建。

##TableCell 对象属性
属性	描述
abbr	设置或返回单元格中内容的缩写版本。
align	设置或返回单元格内部数据的水平排列方式。
axis	设置或返回相关单元格的一个逗号分隔的列表。
cellIndex	返回单元格在某行的单元格集合中的位置。
ch	设置或返回单元格的对齐字符。
chOff	设置或返回单元格的对齐字符的偏移量。
colSpan	单元格横跨的列数。
headers	设置或返回 header-cell 的 id 值。
id	设置或返回单元格的 id。
innerHTML	设置或返回单元格的开始标签和结束标签之间的 HTML。
rowSpan	设置或返回单元格可横跨的行数。
scope	设置或返回此单元格是否可提供标签信息。
vAlign	设置或返回表格单元格内数据的垂直排列方式。
width	设置或返回单元格的宽度。
标准属性
属性	描述
className	设置或返回元素的 class 属性。
dir	设置或返回文本的方向。
lang	设置或返回元素的语言代码。
title	设置或返回元素的 title 属性。