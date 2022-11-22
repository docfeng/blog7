# 用最新IE
<!DOCTYPE>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" >

# hta坑:
1. localStora本地不支持,可以用fso代替;
2. TextDecoder不支持,用 xmlHttp.responseBody;adodb.stream
3. 