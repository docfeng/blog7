运用hta或vba
1. 遍历shell.application对象下的windows，获取ie、explorer、webbrowser对象
2. 在脚本中定义数据，或者在excel，或txt文件中定义事件，用com读到脚本中
3. 遍历window、frame，获取form对象，获取form数据
4. 在脚本中定义填表逻辑
5. setInterval 自动检测ie对象，自动运行填表，或者在vba中绑定事件，触发运行hta方法

vba
1. 遍历shell.application对象下的windows，获取ie、explorer、webbrowser对象
2. 在脚本中定义数据，或者在excel，或txt文件中定义事件，用com读到脚本中
3. 遍历window、frame，获取form对象，获取form数据
4. 在脚本中定义填表逻辑
5. setInterval 自动检测ie对象，自动运行填表


obj{
	frame:[
		{
			name:"",
			id:"",
			index:"",
			url:"",
			pos:[
				{
					name:"",
					id:"",
					index:""
				}
			]//针对父窗口，length=0说明在顶层窗口
		}
	],
	forme:[
		{
			name:"",
			id::"",
			index:"",
			method:"",
			target:"",
			action:"",
			length:"",//
			pos:[
				{
					name:"",
					id:"",
					index:""
				}
			],//针对父窗口，length=0说明在顶层窗口
			data:[
				{
					name:"",
					id:"",
					index:"",
					type:"",
					//code:"",//true|false
					value:"",//type=text,password,data,time,textarea
					/* 
					 value:[
						 name:"",
						 id:"",
						 index:"",
						 value:"",
						 selected:"",//针对下拉列表，option
					 ]
					 */
					
					checked:""//type=
				}
			]
		}
		
	]
	
}

cell(a,b)
random
randomBoolen
