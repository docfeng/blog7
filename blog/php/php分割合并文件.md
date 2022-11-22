<?php
ini_set("memory_limit", "50M");//必须的，根据你环境的实际情况尽量大，防止报错
ini_set("max_execution_time", "100");
//file_exists() 函数检查文件或目录是否存在，存在则返回 true，否则返回 false。
//fread() 函数读取文件（可安全用于二进制文件）。fread() 从文件指针 file 读取最多 length 个字节。
//filesize() 函数返回指定文件的大小（字节）。本函数的结果会被缓存。请使用 clearstatcache() 来清除缓存。
$orgFile = 'Fireworks8-chs.exe';//源文件
$cacheFileName = 'vbcache';//分割成的临时文件块
function cutFile($fileName,$block) {//分割
global $cacheFileName;
if (!file_exists($fileName)) return false;
$num = 1;
$file = fopen($fileName, 'rb');
while ($content = fread($file,$block)) {
$cacheFile = $cacheFileName . $num++ . '.dat';
$cfile = fopen($cacheFile, 'wb');
fwrite($cfile, $content);
fclose($cfile);
}
fclose($file);
}
function mergeFile($targetFile) {//合并
global $cacheFileName;
$num = 1;
$file = fopen($targetFile, 'wb');
while ($num > 0) {
$cacheFile = $cacheFileName . $num++ . '.dat';
if (file_exists($cacheFile)) {
$cfile = fopen($cacheFile, 'rb');
$content = fread($cfile, filesize($cacheFile));
fclose($cfile);
fwrite($file, $content);
}
else {
$num = -1;
}
}
fclose($file);
}
//调用
cutFile($orgFile, 10 * pow(2,20)); //10 * pow(2,20) 就等于 10M pow() 函数返回 x 的 y 次方
mergeFile('ok.exe');
?>