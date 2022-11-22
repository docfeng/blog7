flex布局分为旧版本dispaly: box;，过渡版本dispaly: flex box;，以及现在的标准版本display: flex;。所以如果你只是写新版本的语法形式，是肯定存在兼容性问题的。

Android 
2.3 开始就支持旧版本 display:-webkit-box;
4.4 开始支持标准版本 display: flex;
IOS 
6.1 开始支持旧版本 display:-webkit-box;
7.1 开始支持标准版本display: flex;
PC 
ie10开始支持，但是IE10的是-ms形式的。
下面是各个浏览器的支持情况

 

how？
所以我们该如何进行兼容性的写法呢？

盒子的兼容性写法
.box{
display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
display: -moz-box; /* 老版本语法: Firefox (buggy) */
display: -ms-flexbox; /* 混合版本语法: IE 10 */
display: -webkit-flex; /* 新版本语法: Chrome 21+ */
display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
}

子元素的兼容性写法
.flex1 { 
-webkit-box-flex: 1 /* OLD - iOS 6-, Safari 3.1-6 */ 
-moz-box-flex: 1; /* OLD - Firefox 19- */ 
-webkit-flex: 1; /* Chrome */ 
-ms-flex: 1 /* IE 10 */ 
flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

这种兼容写法不一定起效的。尤其是在底版本安卓系统中。因为什么呢?因为所有都是向下兼容的，所以写法的顺序一定要写好了才起作用。就是把旧语法写在底下，个别不兼容的移动设置才会识别，哪些是旧的语法，你懂的。那些带box的一定要写在最下面即可。

所以上面的兼容写法应该是这样的才对:

.box{

display: -webkit-flex; /* 新版本语法: Chrome 21+ */
display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
display: -moz-box; /* 老版本语法: Firefox (buggy) */
display: -ms-flexbox; /* 混合版本语法: IE 10 */

}

.flex1 { 
-webkit-flex: 1; /* Chrome */ 
-ms-flex: 1 /* IE 10 */ 
flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
-webkit-box-flex: 1 /* OLD - iOS 6-, Safari 3.1-6 */ 
-moz-box-flex: 1; /* OLD - Firefox 19- */ 
}