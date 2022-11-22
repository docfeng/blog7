var supportCSS=function(css){
    if( css in document.documentElement.style){
      return css+":support";
    }else{
      return css+":don't support";
    }
}
var supportJS=function(js){
    if(js in window){
      return js+":support";
    }else{
      return js+":don't support";
    }
}
alert(supportCSS("flex"))
alert(supportCSS("-webkit-box-flex"))
alert(supportCSS("-moz-box-flex"))
alert(supportCSS("-webkit-flex"))
alert(supportCSS("-ms-flex"))

/*alert(supportJS("indexedDB"))
alert(supportJS("localStorage"))
alert(supportJS("openDatabase"))
*/