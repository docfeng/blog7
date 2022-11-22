# vbs 
```
sub sendMail(Email_From,Password,Email_To,File_path,Email_obj)
	'打开计算机telent服务才能运行	
	Set CDO = CreateObject("CDO.Message") '创建CDO.Message对象 
	CDO.Subject = Email_obj'邮件主题 
	CDO.From = Email_From '发件人地址 
	CDO.To = Email_To '收件人地址 
	CDO.AddAttachment File_path  '邮件附件文件路径 
	Const schema = "http://schemas.microsoft.com/cdo/configuration/"
	With CDO.Configuration.Fields '用with关键字减少代码输入 
		.Item(schema & "sendusing") = 2 '使用网络上的SMTP服务器而不是本地的SMTP服务器 
		.Item(schema & "smtpserver") = "smtp.qq.com" 'SMTP服务器地址 
		.Item(schema & "smtpauthenticate") = 1 '服务器认证方式 
		.Item(schema & "sendusername") = Email_From '发件人邮箱 
		.Item(schema & "sendpassword") = Password '发件人邮箱密码 
		.Item(schema & "smtpserverport") = 25'465 'SMTP服务器端口 
		.Item(schema & "smtpusessl") = True '是否使用SSL 
		.Item(schema & "smtpconnectiontimeout") = 60 '连接服务器的超时时间 
		.Update '更新设置 
	End With 
	CDO.Send '发送邮件 
end Sub


Set objArgs = WScript.Arguments'将要发送的文件拖倒本文件上面获取文件路径
For I = 0 to objArgs.Count - 1
		File_path=objArgs(I)
Next
MsgBox File_path
Const Email_obj="test-"
Const Email_From = "2809808818@qq.com" '发件人邮箱 
Const Password = "" '发件人邮箱密码 
Const Email_To = "2809808818@qq.com" '收件人邮箱 
sendMail Email_From,Password,Email_To,File_path,Email_obj 
WScript.Echo "sucelfull"

```
# js
```
function sendMail(Email_From,Password,Email_To,File_path,Email_obj){
	//打开计算机telent服务才能运行	
	var CDO = new ActiveXObject("CDO.Message") //创建CDO.Message对象 
	CDO.Subject = Email_obj//邮件主题 
	CDO.From = Email_From //发件人地址 
	CDO.To = Email_To //收件人地址 
	CDO.AddAttachment (File_path)  //邮件附件文件路径 
	var schema = "http://schemas.microsoft.com/cdo/configuration/"
	with (CDO.Configuration.Fields) {
		//用with关键字减少代码输入 
		Item(schema + "sendusing") = 2 //使用网络上的SMTP服务器而不是本地的SMTP服务器 
		Item(schema + "smtpserver") = "smtp.qq.com" //SMTP服务器地址 
		Item(schema + "smtpauthenticate") = 1 //服务器认证方式 
		Item(schema + "sendusername") = Email_From //发件人邮箱 
		Item(schema + "sendpassword") = Password //发件人邮箱密码 
		Item(schema + "smtpserverport") = 25//465 //SMTP服务器端口 
		Item(schema + "smtpusessl") = true //是否使用SSL 
		Item(schema + "smtpconnectiontimeout") = 60 //连接服务器的超时时间 
		Update() //更新设置 
	}
	CDO.Send() //发送邮件 
}


var objArgs = WScript.Arguments//将要发送的文件拖倒本文件上面获取文件路径
for(var i = 0;i<objArgs.length;i++){
	File_path=objArgs(i)
}
var Email_obj="FPGA作业-test"
var Email_From = "2809808818@qq.com" //发件人邮箱 
var Password = "" //发件人邮箱密码 
var Email_To = "2809808818@qq.com" //收件人邮箱 
sendMail (Email_From,Password,Email_To,File_path,Email_obj )
WScript.Echo ("sucelfull")

```