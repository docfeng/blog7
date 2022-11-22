document.onmouseover=function(event){
    var ele=event.srcElement
    document.title=ele.tagName.toLowerCase()
    ele.style.outline="red dotted thick";
    event.preventDefault();
    event.stopPropagation();
}
document.onmouseout=function(event){
    var ele=event.srcElement
    ele.style.outline=""
    event.preventDefault();
    event.stopPropagation();
}