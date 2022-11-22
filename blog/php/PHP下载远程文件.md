#file_get_contents,file_put_contents
```
<?php
$src="http://git.docfeng.top/1.mp3";
$path="3.mp3";
$file = file_get_contents(src);
file_put_contents($path,$file);
?>
```

#fopen
```
<?php
$src="http://git.docfeng.top/1.mp3";
$path="3.mp3";
$file = fopen($src,"r");
$file2 = fopen($path,"w");
while (!feof($file) && $i++ < 1000) {
    $contents = fread($file, 4096);
    fwrite($file2,$contents);
}
fclose($file);
fclose($file2);
?>
```



<?
/**
    获取远程文件内容
    @param $url 文件http地址
*/
function fopen_url($url)
{
    if (function_exists('file_get_contents')) {
        $file_content = @file_get_contents($url);
    } elseif (ini_get('allow_url_fopen') && ($file = @fopen($url, 'rb'))){
        $i = 0;
        while (!feof($file) && $i++ < 1000) {
            $file_content .= strtolower(fread($file, 4096));
        }
        fclose($file);
    } elseif (function_exists('curl_init')) {
        $curl_handle = curl_init();
        curl_setopt($curl_handle, CURLOPT_URL, $url);
        curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT,2);
        curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($curl_handle, CURLOPT_FAILONERROR,1);
        curl_setopt($curl_handle, CURLOPT_USERAGENT, 'Trackback Spam Check'); //引用垃圾邮件检查
        $file_content = curl_exec($curl_handle);
        curl_close($curl_handle);
    } else {
        $file_content = '';
    }
    return $file_content;
}
?>