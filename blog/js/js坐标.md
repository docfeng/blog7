clientX:相对于客户区域的x坐标位置，不包括滚动条，就是正文区域。 
offsetx：设置或者是得到鼠标相对于目标事件的父元素的内边界在x坐标上的位置
screenX:相对于用户屏幕。
1.PageX/PageX:鼠标在页面上的位置,从页面左上角开始,即是以页面为参考点,不随滑动条移动而变化
2.clientX/clientY:鼠标在页面上可视区域的位置,从浏览器可视区域左上角开始,即是以浏览器滑动条此刻的滑动到的位置为参考点,随滑动条移动 而变化.
可是悲剧的是,PageX只有FF特有,IE这个悲剧没有啊T_T,所以大牛们想出了一个办法
PageY=clientY+scrollTop-clientTop;(只讨论Y轴,X轴同理,下同)
3.screenX/screenY：鼠标在屏幕上的位置,从屏幕左上角开始（w3c标准）
4.offsetX/offsetY:IE特有,鼠标相比较于触发事件的元素的位置,以元素盒子模型的内容区域的左上角为参考点,如果有boder,可能出现负值
5.
layerX/layerY：FF特有,鼠标相比较于当前坐标系的位置,即如果触发元素没有设置绝对定位或相对定位,以页面为参考点,如果有,将改变参考坐标系,从触发元素盒子模型的border区域的左上角为参考点也就是当触发元素设置了相对或者绝对定位后,layerX和offsetX就幸福地生活在一起^-^,几乎相等,唯一不同就是一个从border为参考点,一个以内容为参考点
chrome和safari一条龙通杀!完全支持所有属性.其中(offsetX和layerX都是以border为参考点)
下面这个是获取相对于屏幕的坐标
document.onmousemove=function(e){e=e? e:window.event;document.writeln("X:"+e.screenX+"Y:"+e.screenY);}

var  dom =  document.elementFromPoint(3, 3) ;
alert(dom.tagName.toLowerCase())

function GetDomByPosition(x,y) {

    var sx =document.documentElement.scrollLeft;
    var sy =document.documentElement.scrollTop;
    var  dom =  document.elementFromPoint(x-sx, y-sy) ;

    if (dom == null) {
        return null;
    }

    var $dom =$(dom);
    var DomName = $dom[0].tagName.toLowerCase();

    if (DomName == 'html' || DomName == 'body') {
        return null;
    }

    while (DomName == 'iframe' || DomName == 'frame')
    {

        var FLeft = Math.ceil($dom.offset().left);
        var FTop  = Math.ceil($dom.offset().top);
        x = x - FLeft;
        y = y - FTop;
        // alert ('坐标:'+ x+'*'+y );
        var $dom=$($dom[0].contentWindow.document.elementFromPoint(x, y));

        if ($dom[0]== null) {
            return null;
        }

        DomName = $dom[0].tagName.toLowerCase();

        if (DomName == 'html' || DomName == 'body') {
            return null;
        }

    }

    return $dom;

}