[fso](https://www.w3school.com.cn/asp/asp_ref_filesystem.asp)
# FSO
## 属性
属性|描述
--|--
Drives|返回盘符的集合 
## 方法
方法|描述 
--|--
BuildPath(路径,文件名) |生成一个文件路径,这个方法会对给定的路径加上文件,并自动加上分界符 
CopyFile(源文件, 目标文件, 覆盖) |复制源文件到目标文件,当覆盖值为true时,如果目标文件存在会把文件覆盖 
CopyFolder(对象目录,目标目录 ,覆盖) |复制对象目录到目标目录,当覆盖为true时,如果目标目录存在会把文件覆盖
CreateFolder(完整目录路径) |创建一个新的目录
CreateTextFile(完整文件路径, 覆盖) |创建一个新的文件,如果此文件已经存在,你需要把覆盖值定为true 
DeleteFile(文件名,只读?) |删除一个文件,如果文件的属性是只读的话,你需要把只读值设为true 
DeleteFolder(文件名, 只读?)|删除一个目录，如果目录的属性是只读的话，你需要把只读值设为true 
DriveExists(盘符:"d") |检查一个盘是否存在，如果存在就返会真，不存在就返回....... 
FileExists(文件名) |检查一个文件是否存在，如果存在就返会真，不存在就返回....... 
FolderExists(目录名) |检查一个目录是否存在，如果存在就返会真，不存在就返回.......  
GetAbsolutePathName(文件对象) |返回文件对象在系统的绝对路径 
GetBaseName(文件对象) |返回文件对象的文件名  
GetDrive()|取得盘符名 
GetDriveName()|取得盘符名 
GetExtensionName(文件对象) |文件的后缀 
GetFile()|生成文件对象 
GetFileName()|取得文件名 
GetFolder()|取得目录对象 
GetParentFolderName(文件对象) |取得文件或目录的父目录名 
GetSpecialFolder(目录代码) |取得系统中一些特别的目录的路径，目录代码有3个分别是 0:安装Window的目录 1:系统文件目录 2:临时文件目录
GetTempName() |生成一个随机的临时文件对象，会以rad带头后面跟着些随机数，就好象一些软件在安装时会生成*.tmp
MoveFile(源文件, 目标文件) |把源文件移到目标文件的位置 
MoveFolder()|移动目录 
OpenTextFile()|打开一个文件流

#Drive 对象的属性
属性	描述
AvailableSpace	向用户返回在指定的驱动器或网络共享驱动器上的可用空间容量。
DriveLetter	返回识别本地驱动器或网络共享驱动器的大写字母。
DriveType	返回指定驱动器的类型。
FileSystem	返回指定驱动器所使用的文件系统类型。
FreeSpace	向用户返回在指定的驱动器或网络共享驱动器上的剩余空间容量。
IsReady	如果指定驱动器已就绪，则返回 true。否则返回 false。
Path	返回其后有一个冒号的大写字母，用来指示指定驱动器的路径名。
RootFolder	返回一个文件夹对象，该文件夹代表指定驱动器的根文件夹。
SerialNumber	返回指定驱动器的序列号。
ShareName	返回指定驱动器的网络共享名。
TotalSize	返回指定的驱动器或网络共享驱动器的总容量
VolumeName	设置或者返回指定驱动器的卷标名
# File 对象的属性和方法
## 属性
属性	描述
Attributes	设置或返回指定文件的属性。
DateCreated	返回指定文件创建的日期和时间。
DateLastAccessed	返回指定文件最后被访问的日期和时间。
DateLastModified	返回指定文件最后被修改的日期和时间。
Drive	返回指定文件或文件夹所在的驱动器的驱动器字母。
Name	设置或返回指定文件的名称。
ParentFolder	返回指定文件或文件夹的父文件夹对象。
Path	返回指定文件的路径。
ShortName	返回指定文件的短名称（8.3 命名约定）。
ShortPath	返回指定文件的短路径（8.3 命名约定）。
Size	返回指定文件的尺寸（字节）。
Type	返回指定文件的类型。
方法
方法	描述
Copy	把指定文件从一个位置拷贝到另一个位置。
Delete	删除指定文件。
Move	把指定文件从一个位置移动到另一个位置。
OpenAsTextStream	打开指定文件，并返回一个 TextStream 对象以便访问此文件。


# folder
## 集合
集合|描述
--|--
Files|返回指定文件夹中所有文件夹的集合。
SubFolders|返回指定文件夹中所有子文件夹的集合。
## 属性
属性|描述
--|--
Attributes|设置或返回指定文件夹的属性。
DateCreated|返回指定文件夹被创建的日期和时间。
DateLastAccessed|返回指定文件夹最后被访问的日期和时间。
DateLastModified|返回指定文件夹最后被修改的日期和时间。
Drive|返回指定文件夹所在的驱动器的驱动器字母。
IsRootFolder|假如文件夹是根文件夹,则返回ture,否则返回false.
Name|设置或返回指定文件夹的名称。
ParentFolder|返回指定文件夹的父文件夹。
Path|返回指定文件的路径。
ShortName|返回指定文件夹的短名称.(8.3命名约定)
ShortPath|返回指定文件夹的短路径.(8.3命名约定)
Size|返回指定文件夹的大小。
Type|返回指定文件夹的类型。

## 方法
方法|描述
--|--
Copy|把指定的文件夹从一个位置拷贝到另一个位置。
Delete|删除指定文件夹。
Move|把指定的文件夹从一个位置移动到另一个位置。
CreateTextFile|在指定的文件夹创建一个新的文本文件，并返回一个TextStream对象以访问这个文件。

# TextStream
## 属性
AtEndOfLine 属性 如果文件指针恰好定位在 TextStream 文件中行尾标记的前面，则返回 True；如果没有，则返回 False。 
AtEndOfStream 属性 如果文件指针位于 TextStream 文件的末尾，则返回 True；如果不是，则返回 False。 
Column 属性 返回 TextStream 文件中当前字符位置的列号。 
Line 属性 返回TextStream文件中的当前行号。
## 方法
方法|描述
Close	关闭一个打开的 TextStream 文件。
Read	从一个 TextStream 文件中读取指定数量的字符并返回结果（得到的字符串）。
ReadAll	读取整个 TextStream 文件并返回结果。
ReadLine	从一个 TextStream 文件读取一整行（到换行符但不包括换行符）并返回结果。
Skip	当读一个 TextStream 文件时跳过指定数量的字符。
SkipLine	当读一个 TextStream 文件时跳过下一行。
Write	写一段指定的文本（字符串）到一个 TextStream 文件。
WriteLine	写入一段指定的文本（字符串）和换行符到一个 TextStream 文件中。
WriteBlankLines	写入指定数量的换行符到一个 TextStream 文件中。