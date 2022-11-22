#上传下载
>https://m.jb51.net/article/95026.htm

#zip
>

#mail
>

#sql
>

#不定参数
```
function uncertainParam() {
    $numargs = func_num_args();    //获得传入的所有参数的个数
    echo "参数个数: $numargs\n";  
    $args = func_get_args();       //获得传入的所有参数的数组 
    foreach($args as $key=>$value){
        echo '<BR><BR>'.func_get_arg($key);   //获取单个参数的值
        echo '<BR>'.$value;        //单个参数的值
    }
    var_export($args);  
}
```
#可选参数
```
function fun($var1, $var2, $var3='c', $var4='d'){
     return $var1+$var2+$var3+$var4;
}
```

