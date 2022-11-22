#（1）php判断系统函数或自己写的函数是否存在
bool function_exists ( string $function_name ) 判断函数是否已经定义，例如：
```
if(function_exists('curl_init')){
    curl_init();

}else{
    echo 'not function curl_init';
}
```
#（2）php判断类是否存在
bool class_exists ( string $class_name [, bool $autoload = true ] ) 检查一个类是否已经定义，一定以返回true，否则返回false，例如：
```
if(class_exists('MySQL')){
    $myclass=new MySQL();
}
```
#（3）php判断类里面的某个方法是否已经定义
bool method_exists ( mixed $object , string $method_name ) 检查类的方法是否存在，例如：
```
$directory=new Directory;
if(!method_exists($directory,'read')){
    echo '未定义read方法！';
}
```
is_bool();//判断是否为布尔型
   is_float(); //判断是否为浮点型
   is_int(); //判断是否为整型
   is_numeric(); //判断是否为数值型
   is_string(); //判断是否为字符串
   is_array(); //判断是否为数组
   is_object(); //判断是否为对象