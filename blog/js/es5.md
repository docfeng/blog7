#1.字面量
```
String.prototype.var=function(){
    var t=this;
    var i=0;
    var args=arguments;
    return this.replace(/\${(.*?)}/g,function(){
        var str=args[i]||"";
        i++;
        return str;
    });
}
```